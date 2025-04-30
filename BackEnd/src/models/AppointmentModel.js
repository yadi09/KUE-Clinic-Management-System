import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
    {
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
        medicalHistoryID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MedicalHistory',
            required: false,
        },
        status: {
            type: String,
            enum: ['InProcess', 'Completed', 'Canceled'],
            default: 'InProcess',
            required: true,
        },
        note: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
);

export default mongoose.model('Appointment', appointmentSchema);
