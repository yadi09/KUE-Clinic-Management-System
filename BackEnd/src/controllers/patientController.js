import Patient from "../models/Patient.js";
import User from "../models/User.js";
import AssignedPatient from "../models/assignedPatientModel.js";

// @desc Create a new patient
// @route POST /api/patients
export const createPatient = async (req, res) => {
    try {
        // Debugging: Log the request body
        console.log("Request Body:", req.body);
        const {
            studentId,
            name,
            age,
            gender,
            region,
            wereda,
            kebele,
            phoneNumber,
            department,
            dormitoryNumber,
        } = req.body;

        // Debugging: Log the received data
        console.log("Received Data:", {
            "studentId": studentId,
            "name": name,
            "age": age,
            "gender": gender,
            "region": region,
            "wereda": wereda,
            "kebele": kebele,
            "phoneNumber": phoneNumber,
            "department": department,
            "dormitoryNumber": dormitoryNumber,
        });

        // Check if studentId or cardNumber already exists
        const existingPatient = await Patient.findOne({ studentId });

        // Debugging: Log if a patient already exists
        console.log("Existing Patient:", existingPatient);


        if (existingPatient) {
            return res
                .status(400)
                .json({ message: "Student or Student ID already exists" });
        }

        // Create new patient
        const patient = new Patient({
            studentId,
            name,
            age,
            gender,
            region,
            wereda,
            kebele,
            phoneNumber,
            department,
            dormitoryNumber,
        });

        // Debugging: Log the new patient data
        console.log("New Patient Data:", patient);

        // Save to DB
        await patient.save()
            .then(() => {
                console.log("Patient saved successfully");
            })
            .catch((error) => {
                console.error("Error saving patient:", error);
                return res.status(500).json({ message: "Error saving patient" });
            });

        res.status(201).json({ message: "Patient created successfully", patient });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// @desc    Update patient data
// @route   PUT /api/patients/:id
// @access  Admin, Doctor, Receptionist (Requires studentId verification)
export const updatePatient = async (req, res) => {
    const { student_Id, ...updatedFields } = req.body;
    const { id } = req.params; // Patient ID from URL

    try {
        // Find patient by ID
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Verify studentId matches before updating
        if (patient.studentId !== student_Id) {
            return res.status(403).json({ message: "Invalid student ID. Update not allowed." });
        }

        // Prevent updating cardNumber
        if (updatedFields.cardNumber) {
            return res.status(400).json({ message: "Card number cannot be updated" });
        }

        // Update patient data
        const updatedPatient = await Patient.findByIdAndUpdate(id, updatedFields, { new: true });

        res.status(200).json({ message: "Patient updated successfully", patient: updatedPatient });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc Get all patients
// @route GET /api/patients
// @access Admin, Doctor, Receptionist
export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find(); // Fetch all patients
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: "Server error, try again later." });
    }
};

// @desc Get a patient by ID
// @route GET /api/patients/:id
// @access Admin, Doctor, Receptionist
export const getPatientById = async (req, res) => {
    const { id } = req.params; // Patient ID from URL

    try {
        // Find patient by ID
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc Assign patient to a doctor
// @route POST /api/patients/assign
// @access Receptionist
export const assignPatientToDoctor = async (req, res) => {
    try {
        const { patientId, doctorId } = req.body;

        // Check if Patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Check if Doctor exists and has role "doctor"
        const doctor = await User.findOne({ _id: doctorId, role: "doctor" });
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found or not a doctor" });
        }

        // Check if patient already has "Pending" or "In Progress" assignment
        const existingAssignment = await AssignedPatient.findOne({
            patientId,
            doctorId,
            status: { $in: ["Pending", "In Progress"] },
        });

        if (existingAssignment) {
            return res.status(400).json({ message: "Patient already assigned to a doctor" });
        }

        // Create new assignment
        const assignedPatient = new AssignedPatient({
            patientId,
            doctorId,
            status: "Pending", // Default status
        });

        await assignedPatient.save();

        res.status(201).json({ message: "Patient assigned successfully", assignedPatient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};