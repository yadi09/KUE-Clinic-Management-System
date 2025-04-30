import { createContext, useContext, useState } from "react";
import { getAllDiagnostics } from "../api/DiagnosticsAPI"; // API function to fetch diagnostic details

// Create Context
const DiagnosticsContext = createContext();

// Create Provider
export const DiagnosticsProvider = ({ children }) => {
    const [diagnostics, setDiagnostics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch All Diagnostics
    const fetchAllDiagnostics = async () => {
        setLoading(true);
        setError(null); // Reset error state

        try {
            const response = await getAllDiagnostics();
            console.log("Fetched All Diagnostics:", response.data);
            if (!response.data) {
                throw new Error("No diagnostics found.");
            }

            setDiagnostics(response.data);
            console.log("Diagnostics data set in state:", diagnostics);
        } catch (err) {
            setError(err.message);
            console.error("Fetch All Diagnostics Error:", err);
        } finally {
            setLoading(false);
        }
    }
    // Context value
    const contextValue = {
        diagnostics,
        loading,
        error,
        fetchAllDiagnostics,
    };


    return (
        <DiagnosticsContext.Provider value={contextValue}>
            {children}
        </DiagnosticsContext.Provider>
    );
}
// Custom Hook
export const useDiagnostics = () => {
    const context = useContext(DiagnosticsContext);
    if (!context) {
        throw new Error("useDiagnostics must be used within a DiagnosticsProvider");
    }
    return context;
}