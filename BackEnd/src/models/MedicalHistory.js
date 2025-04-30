import mongoose from 'mongoose';

const medicalHistorySchema = new mongoose.Schema(
    {
        presentHistory: {
            type: String,
            required: false,
        },
        pastPresentHistory: {
            type: String,
            required: false,
        },
        vitalSign: {
            bp: { type: String },  // e.g., "120/80"
            pr: { type: String },  // Pulse Rate
            to: { type: String },  // Temperature Oral
            rr: { type: String },  // Respiration Rate
        },
        physicalExamination: {
            type: String,
            required: false,
        },
        diagnostics: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Diagnostic',
            },
        ],
        plan: {
            type: String,
        },
        treatment: {
            type: String,
        },
        status: {
            type: String,
            enum: ['Pending', 'Appointed', 'Referred', 'Completed', 'Canceled'],
            default: 'Pending',
        },
        patientID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: true,
        },
        doctorID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

export default mongoose.model('MedicalHistory', medicalHistorySchema);
