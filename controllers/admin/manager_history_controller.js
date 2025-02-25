const Application =require('../../models/application_model');
const User=require('../../models/user_model')
const { listeners } = require('../../models/relation_model');
const { listenerCount } = require('../../models/transport_model');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getApplication = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", sortField = "name", sortOrder = "asc"} = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
  const authUser = await User.findById(req.user.user.id).populate("roles", "name").populate('district').select("-password -__v");
  console.log(authUser)
    // Sorting logic
    const sort = {};
    sort[sortField] = sortOrder === "asc" ? 1 : -1;
      // ✅ Extract role from authenticated user
    // const roleName = Array.isArray(authUser.roles) && authUser.roles.length > 0 ? authUser.roles[0].name : null;
  
    // // ✅ Ensure `district` is an array of ObjectIds
    // let districtIds = [];
    // if (authUser.district) {
    //   try {
    //     const parsedDistricts = typeof authUser.district === "string" ? JSON.parse(authUser.district) : authUser.district;
    //     districtIds = parsedDistricts.map(d => new ObjectId(d._id)); // Convert to ObjectId
    //   } catch (error) {
    //     console.error("Invalid district format:", error);
    //     return res.status(400).json({ error: "Invalid district format" });
    //   }
    // }
 const matchQuery = {
      ...(search ? { "deceased.name": new RegExp(search, "i") } : {}), // Search deceased by name
      $or:[
        { rejected_by: authUser._id }, // Match applications rejected by the current user
    { verified_by: authUser._id }, // Match applications verified by the current user
      ]
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