import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createPrescription, getPrescriptions } from '../controllers/prescriptionController.js';

const router = express.Router();

// @desc Create a new prescription
// @route POST /api/prescriptions
// @access Private
router.post('/', protect, createPrescription);

// @desc Get all prescriptions
// @route GET /api/prescriptions
// @access Private
router.get('/', protect, getPrescriptions);

export default router;