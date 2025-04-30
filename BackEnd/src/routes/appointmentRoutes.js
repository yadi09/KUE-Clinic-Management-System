import express from "express";
import {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    getAppointmentsByPatientId,
    getAppointmentsByDoctorId,
    getAppointmentsByMedicalHistoryId,
    getAppointmentsByStatus,
} from "../controllers/appointmentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a new appointment
router.post("/", protect, createAppointment);

// Get all appointments
router.get("/", protect, getAllAppointments);

// Get appointment by ID
router.get("/:appointmentId", protect, getAppointmentById);

// Update appointment by ID
router.put("/:appointmentId", protect, updateAppointment);

// Delete appointment by ID
router.delete("/:appointmentId", protect, deleteAppointment);

// Get appointments by patient ID
router.get("/patient/:patientId", protect, getAppointmentsByPatientId);

// Get appointments by doctor ID
router.get("/doctor/:doctorId", protect, getAppointmentsByDoctorId);

// Get appointments by medical history ID
router.get("/medical-history/:medicalHistoryId", protect, getAppointmentsByMedicalHistoryId);

// Get appointments by status
router.get("/status/:status", protect, getAppointmentsByStatus);

export default router;