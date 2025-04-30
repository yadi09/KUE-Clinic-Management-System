import { createContext, useContext, useState } from "react";
import { getAllMedicalHistory, getMedicalHistoryById } from "../api/MedicalHistoryAPI";

const MedicalHistoryContext = createContext();

export const MedicalHistoryProvider = ({ children }) => {
    const [medicalHistories, setMedicalHistories] = useState([]);
    const [medicalHistory, setMedicalHistory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 
    const fetchMedicalHistory = async () => {
        setLoading(true);
        try {
            const response = await getAllMedicalHistory();
            setMedicalHistories(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // 
    const fetchMedicalHistoryById = async (id) => {
        console.log("Fetching medical history for ID:", id);
        setLoading(true);
        try {
            const response = await getMedicalHistoryById(id);
            console.log("Fetched Medical History Data:", response.data);
            await setMedicalHistory(response.data);
            console.log("Medical History data set in state:", medicalHistory);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <MedicalHistoryContext.Provider value={{ medicalHistory, medicalHistories, fetchMedicalHistoryById, loading, error }}>
            {children}
        </MedicalHistoryContext.Provider>
    );
}

// Custom Hook for easy access
export const useMedicalHistory = () => {
    return useContext(MedicalHistoryContext);
}