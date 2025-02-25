const mongoose = require("mongoose");
const Counter = require("./counter_model"); // Import the Counter model

const ApplicationSchema = new mongoose.Schema({
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "Applicant", required: true },
    deceased: { type: mongoose.Schema.Types.ObjectId, ref: "Deceased", required: true },
    transport: { type: mongoose.Schema.Types.ObjectId, ref: "Transport", required: true },
    attachment: { type: mongoose.Schema.Types.ObjectId, ref: "Attachment", required: true },
    status: {
        type: String,
        enum: ["Pending", "Rejected", "Verified", "Approved", "Processing"],
        default: "Pending" // Default status
    },
    rejection_note:{type:String,default:null},
    feedback: { type: String, default: null },
    application_no: { type: String, unique: true, required: true },
    verified_by:{type:mongoose.Schema.Types.ObjectId,ref:'User',default:null},
    verified_at: { type: Date, default: null },
    rejected_at:{type:Date,default:null},
    rejected_by:{type:mongoose.Schema.Types.ObjectId,ref:'User',default:null},
    approved_at: { type: Date, default: null },
    approved_by:{type:mongoose.Schema.Types.ObjectId,ref:'User',default:null},
    processed_at: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Generate incremental application_no before saving
ApplicationSchema.pre("save", async function (next) {
    if (!this.application_no) {
        try {
            // Find and update the counter document
            const counter = await Counter.findOneAndUpdate(
                { name: "application_no" },
                { $inc: { value: 1 } },
                { new: true, upsert: true }
            );

            // Format application number (e.g., SW-RP001234)
            this.application_no = `SW-RP${String(counter.value).padStart(6, "0")}`;
            next();
        } catch (error) {
            next(error);
        }
    } else {
          this.updatedAt = new Date(); // Ensure updatedAt updates
        next();
    }
});

module.exports = mongoose.model("Application", ApplicationSchema);
