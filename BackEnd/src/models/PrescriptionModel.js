import mongoose from 'mongoose';

// Define the Prescription schema
const prescriptionSchema = new mongoose.Schema(
    {
        medicalHistoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MedicalHistory',
            required: true,
        },
        forWho: {
            type: String,
            required: true,
            trim: true,
        },
        RX: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

export default mongoose.model('Prescription', prescriptionSchema);