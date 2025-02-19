require("dotenv").config();
const mongoose = require("mongoose");
const seedRoles = require("./role_seeder");
const connectDB = require("../config/db");

const seedData=async()=>{
    try {
        // Connect to MongoDB
        await connectDB();
        console.log('Connected to MongoDB');
        await seedRoles();
        console.log('All data seeded successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    }finally {
        // Close the connection
        await mongoose.connection.close();
    }

};
seedData();
