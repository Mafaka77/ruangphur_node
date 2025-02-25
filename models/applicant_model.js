const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    district: { type: mongoose.Schema.Types.ObjectId, ref: "District", required: true },
    locality: { type: String, required: true },
    bank_name: { type: String, required: true },
    account_no: { type: String, required: true },
    ifsc_code: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Applicant", ApplicantSchema);
