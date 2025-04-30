import mongoose from "mongoose";

const assignedPatientSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "In Progress", "Done", "Cancelled"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

const AssignedPatient = mongoose.model("AssignedPatient", assignedPatientSchema);
export default AssignedPatient;
