import API from './auth';

// Create a new appointment
export const createAppointment = (data) => API.post('/appointments', data);

// Get all appointments
export const getAllAppointments = () => API.get('/appointments');

// Get a specific appointment by ID
export const getAppointmentById = (id) => API.get(`/appointments/${id}`);

// Update an appointment by ID
export const updateAppointment = (id, data) => API.put(`/appointments/${id}`, data);
