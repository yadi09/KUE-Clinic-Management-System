import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes
export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] // || req.cookies.token;

        if (!token) return res.status(401).json({ message: "Not authorized" });

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

// Middleware to allow only admins
export const adminOnly = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};

// Middleware to allow only receptionists
export const receptionistOnly = (req, res, next) => {
    if (req.user && req.user.role === "receptionist") {
        next();
    } else {
        res.status(403).json({ message: "Access Denied! Receptionist only" });
    }
};

// Middleware to allow only doctors
export const doctorOnly = (req, res, next) => {
    if (req.user && req.user.role === "doctor") {
        next();
    } else {
        res.status(403).json({ message: "Access Denied! Doctor only" });
    }
};
