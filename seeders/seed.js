require("dotenv").config();
const mongoose = require("mongoose");
const seedRoles = require("./role_seeder");
const districtSeeder = require("./district_seeder");
const relationSeeder=require('./relation_seeder');
const faqSeeder=require('./faq_seeder');
const connectDB = require("../config/db");
const counterSeeder = require("./counter_seeder");

const seedData=async()=>{
    try {
        // Connect to MongoDB
        await connectDB();
        console.log('Connected to MongoDB');
        await counterSeeder();
        await faqSeeder();
        await seedRoles();
        await districtSeeder();
        await relationSeeder();
        console.log('All data seeded successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    }finally {
        // Close the connection
        await mongoose.connection.close();
    }

};
seedData();
