import API from "./auth";

// Get all doctors
export const getDoctors = () => API.get("/users/doctors");

// Get Assigned Patients To Doctor
export const getAssignedPatientsToDoctor = (doctorId) => API.get(`/assigned-patients/${doctorId}`);