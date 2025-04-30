import MedicalHistory from "../models/MedicalHistory.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/User.js";
import Diagnostic from "../models/Diagnostic.js";

// Create a new Medical History
export const createMedicalHistory = async (req, res) => {
    try {
        // Create new medical history
        console.log("Creating new medical history with data:", req.body);
        const medicalHistory = new MedicalHistory(req.body);

        // Check if the patient and doctor IDs are valid
        if (!medicalHistory.patientID || !medicalHistory.doctorID) {
            return res.status(400).json({ message: "Patient ID and Doctor ID are required" });
        }

        // Check if the patient and doctor exist in the database
        const patientExists = await Patient.findById(medicalHistory.patientID);
        if (!patientExists) {
            return res.status(404).json({ message: "Patient not found" });
        }
        const doctorExists = await Doctor.findById(medicalHistory.doctorID);
        if (!doctorExists) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Check if each Diagnostic exist in the database
        for (const diagnostic of medicalHistory.diagnostics) {
            const diagnosticExists = await Diagnostic.findById(diagnostic);
            if (!diagnosticExists) {
                return res.status(404).json({ message: `Diagnostic with ID ${diagnostic} not found` });
            }
        }

        // Save the medical history to the database
        await medicalHistory.save();
        res.status(201).json(medicalHistory);
    } catch (error) {
        console.error("Error creating medical history:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get all medical histories
export const getMedicalHistories = async (req, res) => {
    try {
        const medicalHistories = await MedicalHistory.find()
            .populate('patientID')
            .populate('doctorID')
            .populate('diagnostics');
        res.status(200).json(medicalHistories);
    } catch (error) {
        console.error("Error fetching medical histories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get a specific medical history by ID
export const getMedicalHistoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const medicalHistory = await MedicalHistory.findById(id)
            .populate('patientID')
            .populate('doctorID')
            .populate('diagnostics');
        if (!medicalHistory) {
            return res.status(404).json({ message: "Medical history not found" });
        }
        res.status(200).json(medicalHistory);
    } catch (error) {
        console.error("Error fetching medical history:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Update a medical history by ID
export const updateMedicalHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMedicalHistory = await MedicalHistory.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedMedicalHistory) {
            return res.status(404).json({ message: "Medical history not found" });
        }
        res.status(200).json(updatedMedicalHistory);
    } catch (error) {
        console.error("Error updating medical history:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Delete a medical history by ID
export const deleteMedicalHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMedicalHistory = await MedicalHistory.findByIdAndDelete(id);
        if (!deletedMedicalHistory) {
            return res.status(404).json({ message: "Medical history not found" });
        }
        res.status(200).json({ message: "Medical history deleted successfully" });
    } catch (error) {
        console.error("Error deleting medical history:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get medical histories for a specific patient
export const getMedicalHistoriesByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        const medicalHistories = await MedicalHistory.find({ patientID: patientId }).populate('patientID doctorID');
        if (!medicalHistories) {
            return res.status(404).json({ message: "Medical histories not found for this patient" });
        }
        res.status(200).json(medicalHistories);
    } catch (error) {
        console.error("Error fetching medical histories by patient ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get medical histories for a specific doctor
export const getMedicalHistoriesByDoctorId = async (req, res) => {
    try {
        const { doctorId } = req.params;
        const medicalHistories = await MedicalHistory.find({ doctorID: doctorId }).populate('patientID doctorID');
        if (!medicalHistories) {
            return res.status(404).json({ message: "Medical histories not found for this doctor" });
        }
        res.status(200).json(medicalHistories);
    } catch (error) {
        console.error("Error fetching medical histories by doctor ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get medical histories by status
export const getMedicalHistoriesByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const medicalHistories = await MedicalHistory.find({ status }).populate('patientID doctorID');
        if (!medicalHistories) {
            return res.status(404).json({ message: "Medical histories not found for this status" });
        }
        res.status(200).json(medicalHistories);
    } catch (error) {
        console.error("Error fetching medical histories by status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

