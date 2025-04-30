import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './config/db.js';
import setupAdminRoutes from './routes/setupAdminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js'
import assignedPatientRoutes from './routes/assignedPatientRoutes.js';
import diagnosticRoutes from './routes/DiagnosticRoutes.js';
import MedicalHistoryRoutes from './routes/MedicalHistoryRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import prescriptionRoutes from './routes/prescriptionRoutes.js';
import getUser from './routes/getUser.js';
import cookieParser from "cookie-parser";

// 
dotenv.config();
const app = express();

// Middleware
const corsOptions = {
    origin: process.env.PORT, // Replace with your frontend URL
    credentials: true, // Allow cookies & auth headers
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parse cookies from the request


// Routes
app.use('/api/setup-admin', setupAdminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes)
app.use("/api/assigned-patients", assignedPatientRoutes)
app.use("/api/auth", getUser)
app.use("/api/diagnostics", diagnosticRoutes)
app.use("/api/medical-history", MedicalHistoryRoutes)
app.use("/api/appointments", appointmentRoutes)
app.use("/api/prescriptions", prescriptionRoutes)

// Connect to MongoDB
connectDB();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))