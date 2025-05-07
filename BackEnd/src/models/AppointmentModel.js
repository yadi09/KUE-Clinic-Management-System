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
            required: true,
        },
        status: {
            type: String,
            enum: ['InProcess', 'Completed', 'Canceled'],
            default: 'InProcess',
            required: true,
        },
        appointmentDate: {
            type: Date,
            required: [true, 'Appointment date is required'],
            validate: {
                validator: function (v) {
                    return v > new Date(); // Ensure future date
                },
                message: 'Appointment date must be in the future'
            }
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
