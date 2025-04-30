import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { createDiagnostic, getDiagnostics } from '../controllers/DiagnosticController.js';

const router = express.Router();

// Create a new diagnostic
router.post('/', protect, createDiagnostic);

// Get all diagnostics
router.get('/', protect, getDiagnostics);

export default router
