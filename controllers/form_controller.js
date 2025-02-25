const NodeCache = require("node-cache");
const mongoose=require('mongoose');
const axios = require('axios');
const Deceased=require('../models/deceased_model')
const Transport=require('../models/transport_model');
const Applicant=require('../models/applicant_model');
const Attachment=require('../models/attachment_model');
const Application=require('../models/application_model');
// Initialize cache with a 5-minute expiration time
const otpCache = new NodeCache({ stdTTL: 300 }); // 300 seconds = 5 minutes

exports.uploadFile=async(req,res)=>{
    // try{}catch(ex){}
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }
      // Get uploaded file details
      const fileUrl = `/uploads/${req.file.filename}`;
     return  res.json({
        success: true,
        message: "File uploaded successfully",
        url: fileUrl,
      });
}

exports.sendOtp=async(req,res)=>{
    const {mobile}=req.body;
    const otp=generateOTP(mobile);

    const templateId = "1007093779326924573";
    const message = `OTP for Ruangphur is ${otp}. DoICT`;
    try {
        const response = await axios.post('https://sms.mizoram.gov.in/api', null, {
            params: {
                api_key: 'b53366c91585c976e6173e69f6916b2d',
                number: mobile,
                message: message,
                template_id: templateId
            }
        });

      return res.status(200).json({message:'OTP Sent',status:200,otp:otp})
    } catch (error) {
    
       return  res.status(200).json({message:'Failed to send OTP',status:500})
    }


}
const generateOTP = (phone) => {
    // Generate a 4-digit random OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Store OTP in cache with a 5-minute expiration
    otpCache.set(`otp_${phone}`, otp);

    return otp;
};

exports.verifyOtp=async(req,res)=>{
    const { mobile, otp } = req.body;
    console.log(`Mobile: ${mobile}, Entered OTP: ${otp}`);

    try {
        const storedOtp = otpCache.get(`otp_${mobile}`);
        console.log(`Stored OTP: ${storedOtp}`);

        if (!storedOtp) {
            return res.status(200).json({ message: 'OTP has expired or does not exist.', status: 400 });
        }

        if (storedOtp != otp) {
            return res.status(200).json({ message: 'Invalid OTP.', status: 400 });
        }

        // OTP is valid, remove it from cache to prevent reuse
        otpCache.del(`otp_${mobile}`);

        return res.status(200).json({ message: 'OTP is verified', status: 200 });
    } catch (ex) {
        return res.status(200).json({ message: ex.message, status: 500 });
    }
}
exports.submitForm=async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {deceased,transport,applicant}=req.body;
     // Explicitly generate _id for references before saving
     const deceasedId = new mongoose.Types.ObjectId();
     const transportId = new mongoose.Types.ObjectId();
     const applicantId = new mongoose.Types.ObjectId();
     const attachmentId = new mongoose.Types.ObjectId();
     const applicationId = new mongoose.Types.ObjectId();

    try{
        const deceaseds=new Deceased({
            _id:deceasedId,
            name:deceased.name,
            relation:deceased.relation_id,
            relative_name:deceased.relative_name,
            dob:deceased.dob,
            gender:deceased.gender,
            district:deceased.district_id,
            locality:deceased.locality,
            constituency:deceased.constituency_id,
            time_of_death:deceased.death_time,
            place_of_death:deceased.place_of_death,
    
        });
        const transports=new Transport({
            _id:transportId,
            source_district:transport.source_district,
            destination_district:transport.destination_district,
            source_locality:transport.source_locality,
            destination_locality:transport.destination_locality,
            source_lat:transport.source_lat,
            source_lng:transport.source_lng,
            destination_lat:transport.destination_lat,
            destination_lng:transport.destination_lng,
            vehicle_number:transport.vehicle_no,
            driver_name:transport.driver_name,
            driver_phone:transport.driver_phone,
            distance:transport.distance,
            transport_cost:transport.transport_cost,
        });
    
        const applicants=new Applicant({
            _id:applicantId,
            name:applicant.name,
            mobile:applicant.mobile,
            district:applicant.district_id,
            locality:applicant.locality,
            bank_name:applicant.bank_name,
            account_no:applicant.account_no,
            ifsc_code:applicant.ifsc_code,
        });
    
        const attachments=new Attachment({
            _id:attachmentId,
            id_proof:applicant.id_proof,
            receipt:applicant.receipt,
            death_certificate:applicant.death_certificate,
            additional_document:applicant.additional_document,
        });
        const de=await deceaseds.save({session});
        const tr=await transports.save({session});
        const app=await applicants.save({session});
        const att=await attachments.save({session});
        // Create application with foreign keys

    
        const application = new Application({
            _id:applicationId,
            applicant: app._id,
            deceased: de._id,
            transport: tr._id,
            attachment: att._id,
            status:'Pending',
            createdAt: Date.now(), // Manually set createdAt
            updatedAt: Date.now(), // Ensure updatedAt is also set
        }, { session });
        await application.save();
        console.log(applicants);
        await session.commitTransaction(); // Commit transaction
        session.endSession();
       return res.status(200).json({ message: "Application Created", data: application.application_no,status:201 });
    }catch(ex){
        console.log(ex);
        await session.abortTransaction(); // Rollback transaction if an error occurs
        session.endSession();
        res.status(500).json({ message: "Transaction Failed", error: ex.message });
    }
    

}


