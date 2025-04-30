import API from "./auth";

// Create a new patient
export const createPatient = (patientData) => API.post("/patients", patientData);

// Get all patients
export const getAllPatients = () => API.get(`/patients`);

// Get Patient by ID
export const getPatientById = (patientId) => API.get(`/patients/${patientId}`);

// Update Patient by ID
export const updatePatient = (patientId, patientData) => API.put(`/patients/${patientId}`, patientData);

// Assign patient to doctor
export const assignPatientToDoctor = (Ids) => API.post(`/patients/assign`, Ids);