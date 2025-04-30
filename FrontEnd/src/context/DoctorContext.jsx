import { createContext, useContext, useState } from "react";
import { getDoctors } from "../api/DoctorAPI"; // API function to fetch doctors
import { useAuth } from "./AuthContext"; // Import useAuth to get user data
import { getAssignedPatientsToDoctor } from "../api/DoctorAPI"; // API function to fetch assigned patients

// Create Context
const DoctorContext = createContext();

// Create Provider
export const DoctorProvider = ({ children }) => {
    const [doctors, setDoctors] = useState([]);
    const [assignedPatients, setAssignedPatients] = useState([]); // State to hold assigned patients
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // c       torId = user?._id; // Get doctorId from user data


    // Fetch Doctors Data
    const fetchDoctors = async () => {
        setLoading(true);
        setError(null); // Reset error state

        try {
            const response = await getDoctors();
            console.log("Fetched Doctors Data:", response.data);
            if (!response.data) {
                throw new Error("No doctors data found.");
            }

            setDoctors(response.data);
        } catch (err) {
            setError(err.message);
            console.error("Fetch Doctors Error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch Assigned Patients to Doctor
    const fetchAssignedPatientsToDoctor = async (doctorId) => {
        setLoading(true);
        setError(null); // Reset error state

        try {
            const response = await getAssignedPatientsToDoctor(doctorId);
            console.log("Fetched Assigned Patients Data:", response.data);
            if (!response.data) {
                throw new Error("No assigned patients data found.");
            }
            setAssignedPatients(response.data);
        }
        catch (err) {
            setError(err.message);
            console.error("Fetch Assigned Patients Error:", err);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <DoctorContext.Provider value={{ doctors, fetchDoctors, fetchAssignedPatientsToDoctor, assignedPatients, loading, error }}>
            {children}
        </DoctorContext.Provider>
    );
};

// Custom Hook for easy access
export const useDoctor = () => {
    return useContext(DoctorContext);
};