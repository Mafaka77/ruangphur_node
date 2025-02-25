const mongoose = require("mongoose");

const TransportSchema = new mongoose.Schema({
    source_district: { type: mongoose.Schema.Types.ObjectId, ref: "District", required: true },
    destination_district: { type: mongoose.Schema.Types.ObjectId, ref: "District", required: true },
    source_locality: { type: String, required: true },
    destination_locality: { type: String, required: true },
    vehicle_number: { type: String, required: true },
    driver_name: { type: String, required: true },
    driver_phone: { type: String, required: true },
    source_lat: { type: Number, required: true },
    source_lng: { type: Number, required: true },
    destination_lat: { type: Number, required: true },
    destination_lng: { type: Number, required: true },
    distance: { type: Number, required: true },
    transport_cost: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Transport", TransportSchema);
