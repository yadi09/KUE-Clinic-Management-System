import express from "express";
import { protect, receptionistOnly } from "../middlewares/authMiddleware.js";
import { createPatient, updatePatient, getAllPatients, getPatientById, assignPatientToDoctor } from "../controllers/patientController.js";

const router = express.Router();

// create a new patient
router.post("/", protect, createPatient);

// get all patients
router.get("/", protect, getAllPatients);

// Get a patient by ID
router.get("/:id", protect, getPatientById);

// Update a patient
router.put("/:id", protect, updatePatient);

// Assign a patient to a doctor
router.post("/assign", protect, receptionistOnly, assignPatientToDoctor);


export default router;
