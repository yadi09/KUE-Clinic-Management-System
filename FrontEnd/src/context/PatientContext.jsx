import { createContext, useContext, useState } from "react";
import { getAllPatients, getPatientById } from "../api/PatientAPI"; // API function to fetch patient details

// Create Context
const PatientContext = createContext();

// Create Provider
export const PatientProvider = ({ children }) => {
    const [patient, setPatient] = useState(null);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPatientId, setCurrentPatientId] = useState(null); // To track current patientId

    // Fetch All Patients
    const fetchAllPatients = async () => {
        setLoading(true);
        setError(null); // Reset error state

        try {
            const response = await getAllPatients();
            console.log("Fetched All Patients:", response.data);
            if (!response.data) {
                throw new Error("No patients found.");
            }

            setPatients(response.data);
            console.log("Patients data set in state:", patients);
        } catch (err) {
            setError(err.message);
            console.error("Fetch All Patients Error:", err);
        } finally {
            setLoading(false);
        }
    }


    // Fetch Patient Data
    const fetchPatient = async (patientId) => {
        console.log("Fetching patient data for ID:", patientId, currentPatientId);
        if (patientId === currentPatientId) {
            console.log("Patient ID hasn't changed, skipping fetch.");
            return; // Don't refetch if the patientId hasn't changed
        }

        setLoading(true);
        setError(null); // Reset error state
        setCurrentPatientId(patientId); // Update current patientId

        try {
            const response = await getPatientById(patientId);
            console.log("Fetched Patient Data:", response.data);
            if (!response.data) {
                throw new Error("No patient data found.");
            }

            setPatient(response.data);
            console.log("Patient data set in state:", patient);
        } catch (err) {
            setError(err.message);
            console.error("Fetch Patient Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PatientContext.Provider value={{ patient, patients, fetchAllPatients, fetchPatient, loading, error }}>
            {children}
        </PatientContext.Provider>
    );
};

// Custom Hook for easy access
export const usePatient = () => {
    return useContext(PatientContext);
};
