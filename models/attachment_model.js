const mongoose = require("mongoose");

const AttachmentSchema = new mongoose.Schema({
    id_proof: { type: String, default: null }, // Store file path or URL
    receipt: { type: String, default: null }, // Store file path or URL
    death_certificate: { type: String, default: null }, // Store file path or URL
    additional_document: { type: String, default: null }, // Store file path or URL
}, { timestamps: true });

module.exports = mongoose.model("Attachment", AttachmentSchema);
