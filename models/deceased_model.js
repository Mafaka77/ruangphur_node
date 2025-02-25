const mongoose = require("mongoose");

const DeceasedSchema = new mongoose.Schema({
    name: { type: String, required: true },
    relation: { type: mongoose.Schema.Types.ObjectId, ref: "Relation", required: true },
    relative_name: { type: String, required: true },
    dob: { type: String, required: true }, // Consider using Date type if storing actual date
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    district: { type: mongoose.Schema.Types.ObjectId, ref: "District", required: true },
    locality: { type: String, required: true },
    constituency: { type: mongoose.Schema.Types.ObjectId, ref: "Constituency", required: true },
    time_of_death: { type: String, default: null }, // Consider Date type if storing actual timestamp
    place_of_death: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("Deceased", DeceasedSchema);
