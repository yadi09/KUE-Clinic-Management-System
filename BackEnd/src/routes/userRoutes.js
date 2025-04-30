import express from "express";
import { createUser, getAllDoctors, getAllUsers } from "../controllers/userController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin (/api/users) can create doctors & receptionists
router.post("/", protect, adminOnly, createUser);

// Get all users
router.get("/", protect, getAllUsers);

// Get all doctors
router.get("/doctors", protect, getAllDoctors);

export default router;
