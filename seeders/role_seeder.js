const Role = require("../models/role_model");
// Define role data
const roles = [
    { name: "Admin"},
    { name: "User"},
    { name: "Manager" }
];

// Seed roles into the database
const seedRoles = async () => {
    try {

        await Role.deleteMany();
        await Role.insertMany(roles);
        console.log("Roles seeded successfully!");
    } catch (error) {
        console.error("Seeding failed:", error);
    }
};
module.exports = seedRoles;
