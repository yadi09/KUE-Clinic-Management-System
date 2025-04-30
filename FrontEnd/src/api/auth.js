import axios from "axios";

// Set default headers for axios
axios.defaults.withCredentials = true;

const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Set your backend API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create an Axios instance
const API = axios.create({ baseURL: API_BASE_URL });

// Automatically attach token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Attach token
    }
    return config;
}, (error) => Promise.reject(error));

// Function to handle login
export const loginUser = (credential) => API.post("/auth/login", credential)

export const getUser = () => API.get("/auth/user");

export default API;
