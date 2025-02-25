const Application=require('../models/application_model');

exports.viewApplication=async(req,res)=>{
    const {trackingId}=req.params;
    try{
        const data = await Application.find({ application_no: trackingId })
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
exports.trackApplication=async(req,res)=>{
    const {trackingId}=req.params;
    try{
        const data=await Application.find({application_no:trackingId});
        console.log(data);
        if(!data){
            return res.status(200).json({message:'Application not found',status:404});
        }
        return res.status(200).json({message:'Application found',status:200,data:data});
    }catch(ex){
        return res.status(200).json({message:ex.message,status:500});
    }
}