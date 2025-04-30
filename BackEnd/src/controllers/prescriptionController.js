import PrescriptionModel from "../models/PrescriptionModel.js";
import MedicalHistory from "../models/MedicalHistory.js";

// create a new prescription
export const createPrescription = async (req, res) => {
    try {
        // Create new prescription
        console.log("Creating new prescription with data:", req.body);
        // Check if the request body contains the required fields
        if (!req.body.medicalHistoryId || !req.body.forWho || !req.body.RX) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const prescription = new PrescriptionModel(req.body);

        // Check if the patient and doctor IDs are valid
        if (!prescription.medicalHistoryId) {
            return res.status(400).json({ message: "Medical History ID is required" });
        }

        // Check if the medical history exists in the database
        const medicalHistoryExists = await MedicalHistory.findById(prescription.medicalHistoryId);
        if (!medicalHistoryExists) {
            return res.status(404).json({ message: "Medical History not found" });
        }

        // Save the prescription to the database
        await prescription.save();
        res.status(201).json(prescription);
    } catch (error) {
        console.error("Error creating prescription:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// get all prescriptions
export const getPrescriptions = async (req, res) => {
    try {
        const prescriptions = await PrescriptionModel.find()
            .populate({
                path: 'medicalHistoryId',
                populate: [
                    { path: 'patientID' },
                    { path: 'doctorID' }
                ]
            });

        res.status(200).json(prescriptions);
    } catch (error) {
        console.error("Error fetching prescriptions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}