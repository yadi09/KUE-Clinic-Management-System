import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence"; // Import the AutoIncrement plugin

const patientSchema = new mongoose.Schema(
    {
        studentId: { type: String, unique: true, required: true },
        cardNumber: { type: Number, unique: true }, // Auto-incremented
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        region: { type: String, required: false },
        wereda: { type: String, required: false },
        kebele: { type: String, required: false },
        phoneNumber: { type: String, required: true },
        department: { type: String, required: false, default: "--" },
        year: { type: String, required: false, default: "--" },
        dormitoryNumber: { type: String, required: false },
        houseNumber: { type: String, required: false },
    },
    { timestamps: true }
);

// Auto-increment cardNumber
patientSchema.plugin(AutoIncrement(mongoose), { inc_field: "cardNumber", start_seq: 1 });

export default mongoose.model("Patient", patientSchema);
