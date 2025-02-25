const Application =require('../../models/application_model');
const User=require('../../models/user_model')
const { listeners } = require('../../models/relation_model');
const { listenerCount } = require('../../models/transport_model');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
exports.index=async(req,res)=>{
    try{
        const pending=(await Application.find({status:'Pending'})).length;
        const verified=(await Application.find({status:'Verified'})).length;
        const approved=(await Application.find({status:'Approved'})).length;
        const processing=(await Application.find({status:'Processing'})).length;
        const rejected=(await Application.find({status:'Rejected'})).length;


        return res.status(200).json({data:{pending:pending,verified:verified,approved:approved,processing:processing,rejected:rejected},staus:200})
    }catch(ex){
        return res.status(200).json({message:ex.message,status:500});
    }
}
exports.getApplication = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", sortField = "name", sortOrder = "asc"} = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
  const authUser = await User.findById(req.user.user.id).populate("roles", "name").populate('district').select("-password -__v");
    // Sorting logic
    const sort = {};
    sort[sortField] = sortOrder === "asc" ? 1 : -1;
      // ✅ Extract role from authenticated user
    const roleName = Array.isArray(authUser.roles) && authUser.roles.length > 0 ? authUser.roles[0].name : null;
  
    // ✅ Ensure `district` is an array of ObjectIds
    let districtIds = [];
    if (authUser.district) {
      try {
        const parsedDistricts = typeof authUser.district === "string" ? JSON.parse(authUser.district) : authUser.district;
        districtIds = parsedDistricts.map(d => new ObjectId(d._id)); // Convert to ObjectId
      } catch (error) {
        console.error("Invalid district format:", error);
        return res.status(400).json({ error: "Invalid district format" });
      }
    }
 const matchQuery = {
      ...(search ? { "deceased.name": new RegExp(search, "i") } : {}), // Search deceased by name
      ...(districtIds.length ? { "deceased.district": { $in: districtIds } } : {}), // Filter by district IDs
      ...(roleName === "Manager" ? { status: "Pending" } : {}), // 🔹 Filter by status if Manager
    };
    const applications = await Application.aggregate([
      // 1️⃣ Populate Deceased Model & Filter by Name & District
      {
        $lookup: {
          from: "deceaseds",
          localField: "deceased",
          foreignField: "_id",
          as: "deceased",
        },
      },
      { $unwind: { path: "$deceased", preserveNullAndEmptyArrays: true } },
      {
        $match: matchQuery
      },

      // 2️⃣ Populate Applicant Model
      {
        $lookup: {
          from: "applicants",
          localField: "applicant",
          foreignField: "_id",
          as: "applicant",
        },
      },
      { $unwind: { path: "$applicant", preserveNullAndEmptyArrays: true } },

      // 3️⃣ Populate Transport Model
      {
        $lookup: {
          from: "transports",
          localField: "transport",
          foreignField: "_id",
          as: "transport",
        },
      },
      { $unwind: { path: "$transport", preserveNullAndEmptyArrays: true } },

      // 4️⃣ Populate Attachments Model
      {
        $lookup: {
          from: "attachments",
          localField: "attachment",
          foreignField: "_id",
          as: "attachment",
        },
      },

      // 5️⃣ Sorting & Pagination
      { $sort: sort },
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);

    // ✅ Correct way to count filtered documents
    const totalResults = await Application.aggregate([
      {
        $lookup: {
          from: "deceaseds",
          localField: "deceased",
          foreignField: "_id",
          as: "deceased",
        },
      },
      { $unwind: { path: "$deceased", preserveNullAndEmptyArrays: true } },
      {
        $match: matchQuery
      },
      { $count: "total" },
    ]);

    const total = totalResults.length > 0 ? totalResults[0].total : 0;
    res.json({ applications, total });
  } catch (error) {
    console.error("Error in getApplication:", error);
    return res.status(500).json({ message: error.message, status: 500 });
  }
};

exports.getApplicationById=async(req,res)=>{
  const {id}=req.params;
  console.log('id')
 try{
  
         const data = await Application.findById(id)
     .populate({path:'applicant',populate:{
         path:'district'
     }})
     .populate('attachment')
     .populate({
         path:'transport',
         populate:[
         {
             path:'source_district',
         },{
             path:'destination_district'
         }
     ]})
     .populate({
         path: 'deceased',
         populate: [
             { path: 'relation' },
             { path: 'district' },
             { path: 'constituency' }
         ]
     });
         if(!data){
             return res.status(200).json({message:'Application not found',status:404});
         }
         return res.status(200).json({message:'Application found',status:200,data:data});
     }catch(ex){
         return res.status(200).json({message:ex.message,status:500});
     }
}
exports.verifyApplication = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the application exists before updating
        const application = await Application.findById(id);
        if (!application) {
            return res.status(200).json({ message: "Application not found", status: 404 });
        }

        // Update application status
        await Application.findByIdAndUpdate(
            id,
            {
                status: "Verified",
                verified_at: new Date(),
                verified_by: req.user.user.id, // Ensure this is the correct user ID
            },
            { new: true }
        );

        return res.status(200).json({ message: "Form Verified", status: 200 });
    } catch (error) {
        console.error("Error verifying application:", error);
        return res.status(500).json({ message: error.message, status: 500 });
    }
};
exports.rejectApplication = async (req, res) => {
    const { id } = req.params;
    const {rejection_note}=req.body;
    try {
        // Check if the application exists before updating
        const application = await Application.findById(id);
        if (!application) {
            return res.status(200).json({ message: "Application not found", status: 404 });
        }
        if(rejection_note===''){
            return res.status(200).json({ message: "Rejection Note is required", status: 402 });
        }
        // Update application status
        await Application.findByIdAndUpdate(
            id,
            {
                status: "Rejected",
                rejection_note:rejection_note,
                rejected_at: new Date(),
                rejected_by: req.user.user.id, // Ensure this is the correct user ID
            },
            { new: true }
        );

        return res.status(200).json({ message: "Form Rejected", status: 200 });
    } catch (error) {
        console.error("Error verifying application:", error);
        return res.status(500).json({ message: error.message, status: 500 });
    }
};