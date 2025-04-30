import API from './auth';

// Create a new medical history entry
export const createMedicalHistory = (data) => API.post('/medical-history', data);

// Get all medical history entries
export const getAllMedicalHistory = () => API.get('/medical-history');

// Get a specific medical history entry by ID
export const getMedicalHistoryById = (id) => API.get(`/medical-history/${id}`);
