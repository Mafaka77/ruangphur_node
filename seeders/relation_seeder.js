const Relation=require('../models/relation_model');

const relations=[
    {
        name:"s/o",
    },
    {
        name:"d/o",
    },
    {
        name:"w/o",
    },
    {
        name:"h/o",
    },
    {
        name:"f/o",
    },
    {
        name:"m/o",
    },
    {
        name:"c/o",
    },
];

const seedRelation=async()=>{
    try{
        await Relation.deleteMany({});
        await Relation.insertMany(relations);
        console.log('Relations seeded successfully!');
    }catch(error){
        console.error('Error seeding relations:',error);
    }
}
module.exports=seedRelation;