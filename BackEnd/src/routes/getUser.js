import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/user", async (req, res) => {
    try {
        console.log("Received request for user data"); // Log the request for debugging
        const token = req.cookies.token; // Read token from HTTP-only cookie
        console.log("Token from cookie:", token); // Log the token for debugging
        if (!token) return res.status(401).json({ message: "Not authenticated" });

        // Verify token and extract user data
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.json({ user: decoded }); // Send user data
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
});

export default router;