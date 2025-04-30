import User from "../models/User.js";

// Create a new doctor or receptionist (Admin Only)
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Ensure only doctors & receptionists can be created
        if (!["doctor", "receptionist"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        // Check if email is already taken
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Create the new user
        const newUser = await User.create({ name, email, password, role });

        res.status(201).json({
            message: "User created successfully",
            user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all doctors
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await User.getAllDoctors();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
