const Faq = require('../models/faq_model');
const Relation=require('../models/relation_model');
const District=require('../models/district_model');
const Constituency=require('../models/constituency_model');
exports.getFaq = async (req, res) => {
    const limit=req.params;
    try {
        const faq = await Faq.find().limit(limit);
       return  res.status(200).json({data: faq, status: 200});
    } catch (err) {
       return  res.json({message: err});
    }
};

exports.getRelation = async (req, res) => {
    try{
        const relation=await Relation.find();
       return  res.status(200).json({data:relation,status:200});
    }catch(ex){
       return  res.status(200).json({message:ex.message,status:500})
    }

}
exports.getDistrict = async (req, res) => {
    try{
        const district=await District.find();
       return  res.status(200).json({data:district,status:200});
    }catch(ex){
       return res.status(200).json({message:ex.message,status:500})
    }

}

exports.getConstituencyById=async(req,res)=>{
    const {id}=req.params;
    console.log(id);
    const constituency=await Constituency.find({districts:id});
   return  res.status(200).json({data:constituency,status:200});
}


