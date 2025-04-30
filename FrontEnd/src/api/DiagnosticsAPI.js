import API from "./auth";

// Create a new diagnostic
export const createDiagnostic = (data) => API.post("/diagnostics", data);

// Get all diagnostics
export const getAllDiagnostics = () => API.get("/diagnostics");

