import { createContext, useState, useContext, useEffect } from "react";
import { loginUser } from "../api/auth"; // Import the login and getUser functions
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// Create authentication context
const AuthContext = createContext();

// Create AuthProvider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to store user data
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // State to manage loading state
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        loading && setLoading(true); // Set loading to true when component mounts
        const storedUser = localStorage.getItem("user"); // Get user from localStorage
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse and set user
            loading && setLoading(false); // Set loading to false after user is set
        }
    }, []);

    // console.log("User in AuthProvider: ", user);

    // Function to handle login
    const login = async (credentials) => {
        try {
            setError(null);

            console.log("Sending login request...");
            const response = await loginUser(credentials);
            console.log("Login response:", response.data); // Log the response for debugging

            // Destructure token and user from response
            const { token, user } = response.data;

            if (token && user) {
                // Store token and user in localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                // Update state
                setUser(user);
                console.log("User stored successfully:", user);
            } else {
                throw new Error("Invalid login response. Token or user missing.");
            }

            if (user) {
                switch (user?.role) {
                    case "admin":
                        navigate("/admin/dashboard");
                        break;
                    case "doctor":
                        navigate("/doctor/patients");
                        break;
                    case "receptionist":
                        navigate("/patients");
                        break;
                    default:
                        navigate("/");
                }
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Login failed"); // Set error message if login fails
        }
    };

    // Function to handle logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login"); // Redirect to login page after logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);
