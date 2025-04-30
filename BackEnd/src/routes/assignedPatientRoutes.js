import express from "express";
import { getAssignedPatients, updateAssignedPatientStatus, getAssignedPatientsToDoctor } from "../controllers/assignedPatientController.js";
import { protect, doctorOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get assigned patients (Doctor Only)
router.get("/", protect, doctorOnly, getAssignedPatients);

// Get assigned patients to doctor (Doctor Only)
router.get("/:id", protect, doctorOnly, getAssignedPatientsToDoctor);

// Update assigned patient status (Doctor Only)
router.patch("/:id", protect, doctorOnly, updateAssignedPatientStatus);

export default router;
