const Counter = require("../models/counter_model");

// Run this only once to initialize the counter
const counterSeeder=async()=> {
    const existingCounter = await Counter.findOne({ name: "application_no" });
    if (!existingCounter) {
        await Counter.create({ name: "application_no", value: 0 });
        console.log("Counter initialized.");
    }
}

module.exports=counterSeeder;
