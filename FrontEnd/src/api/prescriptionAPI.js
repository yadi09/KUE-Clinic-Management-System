import API from "./auth";

// Create a new prescription
export const createPrescription = (prescriptionData) => API.post("/prescriptions", prescriptionData);

// Get all prescriptions
export const getAllPrescriptions = () => API.get(`/prescriptions`);
