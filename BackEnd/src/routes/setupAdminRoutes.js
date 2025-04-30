import express from "express";
import { setupAdmin } from "../controllers/setupAdminController.js";

const router = express.Router();

// POST /api/setup-admin - Create admin only if none exists
router.post("/", setupAdmin);

export default router;
