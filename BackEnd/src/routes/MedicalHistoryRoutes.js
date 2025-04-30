import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
    createMedicalHistory,
    getMedicalHistories,
    getMedicalHistoryById,
    updateMedicalHistory,
    deleteMedicalHistory,
    getMedicalHistoriesByPatientId,
    getMedicalHistoriesByDoctorId,
} from '../controllers/MedicalHistoryControllers.js';

const router = express.Router();

// Create a new medical history
router.post('/', protect, createMedicalHistory);

// Get all medical histories
router.get('/', protect, getMedicalHistories);

// Get a specific medical history by ID
router.get('/:id', protect, getMedicalHistoryById);

// Update a medical history by ID
router.put('/:id', protect, updateMedicalHistory);

// Delete a medical history by ID
router.delete('/:id', protect, deleteMedicalHistory);

// Get medical histories for a specific patient
router.get('/patient/:patientId', protect, getMedicalHistoriesByPatientId);

// Get medical histories for a specific doctor
router.get('/doctor/:doctorId', protect, getMedicalHistoriesByDoctorId);

export default router;