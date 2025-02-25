const Faq = require('../models/faq_model');
const faq=[
    {
        question: "What is the best way to contact you?",
        answer: "You can contact us by phone, email, or by visiting our office."
    },
    {
        question: "What are your office hours?",
        answer: "Our office hours are from 9:00 AM to 5:00 PM, Monday to Friday."
    },
    {
        question: "Do you offer free consultations?",
        answer: "Yes, we offer free consultations for all our services."
    },
    {
        question: "What are your payment options?",
        answer: "We accept cash, credit card, and bank transfer."
    }
];
const faqSeed=async ()=>{
    try{
        await Faq.deleteMany({});
        await Faq.insertMany(faq);
    }catch(err){
        console.log(err);
    }
}
module.exports=faqSeed;