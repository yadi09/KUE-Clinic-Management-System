import AppointmentModel from "../models/AppointmentModel.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/User.js";
import MedicalHistory from "../models/MedicalHistory.js";

// create appointment
export const createAppointment = async (req, res) => {
    // Check if the request body contains the required fields
    if (!req?.body?.patientId || !req?.body?.doctorId || !req?.body?.medicalHistoryID) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const { patientId, doctorId, medicalHistoryID, note } = req?.body;

    // Check if the patient exists
    const patient = Patient.findById(patientId);
    if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
    }

    // Check if the doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if the medical history exists
    const medicalHistory = await MedicalHistory.findById(medicalHistoryID);
    if (!medicalHistory) {
        return res.status(404).json({ message: "Medical history not found" });
    }

    try {
        // Create a new appointment
        const appointment = await AppointmentModel.create({
            patientID: patientId,
            doctorID: doctorId,
            medicalHistoryID: medicalHistoryID,
            note: note,
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// Update appointment
export const updateAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const { status, note } = req.body;

    try {
        // Find the appointment by ID and update it
        const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
            appointmentId,
            { status, note },
            { new: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({
            message: "Appointment updated successfully",
            appointment: updatedAppointment,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// Get all appointments
export const getAllAppointments = async (req, res) => {
    try {
        // Fetch all appointments
        const appointments = await AppointmentModel.find()
            .populate("patientID") // Populate patient details
            .populate("doctorID") // Populate doctor details
            .populate("medicalHistoryID"); // Populate medical history details

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// Get appointment by ID
export const getAppointmentById = async (req, res) => {
    const { appointmentId } = req.params;

    try {
        // Find the appointment by ID
        const appointment = await AppointmentModel.findById(appointmentId)
            .populate("patientID") // Populate patient details
            .populate("doctorID") // Populate doctor details
            .populate("medicalHistoryID"); // Populate medical history details

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// Delete appointment
export const deleteAppointment = async (req, res) => {
    const { appointmentId } = req.params;

    try {
        // Find the appointment by ID and delete it
        const deletedAppointment = await AppointmentModel.findByIdAndDelete(appointmentId);

        if (!deletedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// Get appointments by patient ID
export const getAppointmentsByPatientId = async (req, res) => {
    const { patientId } = req.params;

    try {
        // Find appointments by patient ID
        const appointments = await AppointmentModel.find({ patientID: patientId })
            .populate("doctorID") // Populate doctor details
            .populate("medicalHistoryID"); // Populate medical history details

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// Get appointments by doctor ID
export const getAppointmentsByDoctorId = async (req, res) => {
    const { doctorId } = req.params;

    try {
        // Find appointments by doctor ID
        const appointments = await AppointmentModel.find({ doctorID: doctorId })
            .populate("patientID") // Populate patient details
            .populate("medicalHistoryID"); // Populate medical history details

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// Get appointments by medical history ID
export const getAppointmentsByMedicalHistoryId = async (req, res) => {
    const { medicalHistoryId } = req.params;

    try {
        // Find appointments by medical history ID
        const appointments = await AppointmentModel.find({ medicalHistoryID: medicalHistoryId })
            .populate("patientID") // Populate patient details
            .populate("doctorID"); // Populate doctor details

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// Get appointments by status
export const getAppointmentsByStatus = async (req, res) => {
    const { status } = req.params;

    try {
        // Find appointments by status
        const appointments = await AppointmentModel.find({ status })
            .populate("patientID") // Populate patient details
            .populate("doctorID") // Populate doctor details
            .populate("medicalHistoryID"); // Populate medical history details

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
