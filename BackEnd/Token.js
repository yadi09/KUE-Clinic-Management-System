// Importing required modules
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Load JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Default for testing

// Function to generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

// Example usage
const userId = "67ebc1b3c5e917894d48a7cf"; // Replace with an actual user ID
const token = generateToken(userId);

console.log("Generated Token:", token);
