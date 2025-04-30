import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Setup Admin Controller
export const setupAdmin = async (req, res) => {
    try {
        const { name, email, password, setupKey } = req.body;

        // 🔹 Check if setup key is valid
        if (setupKey !== process.env.ADMIN_SETUP_KEY) {
            return res.status(403).json({ message: "Invalid setup key" });
        }

        // 🔹 Check if an admin already exists
        const adminExists = await User.findOne({ role: "admin" });
        if (adminExists) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // 🔹 Create new admin
        const admin = await User.create({
            name,
            email,
            password, // Auto-hashed by model
            role: "admin",
        });

        res.status(201).json({
            message: "Admin created successfully",
            admin: { id: admin._id, name: admin.name, email: admin.email },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
