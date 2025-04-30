import AssignedPatient from "../models/assignedPatientModel.js";

// @desc Get assigned patients for the logged-in doctor (Only Pending & In Progress)
// @route GET /api/assigned-patients
// @access Private (Doctor Only)
export const getAssignedPatients = async (req, res) => {
    try {
        // Find patients assigned to this doctor with "Pending" or "In Progress" status
        const assignedPatients = await AssignedPatient.find().populate([
            { path: "patientId" },
            { path: "doctorId" }
        ]);

        res.status(200).json(assignedPatients);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


/**
 * @desc Get assigned patients for the logged-in doctor (Only Pending & In Progress)
 * @route GET /api/assigned-patients
 * @access Private (Doctor Only)
 */
export const getAssignedPatientsToDoctor = async (req, res) => {
    try {
        console.log("Fetching assigned patients for doctor:", req);
        const doctorId = req.params.id; // Extract doctor ID from logged-in user

        // Find patients assigned to this doctor with "Pending" or "In Progress" status
        const assignedPatients = await AssignedPatient.find({
            doctorId,
        }).populate([
            { path: "patientId" },
            { path: "doctorId" }
        ]);

        res.status(200).json(assignedPatients);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


/**
 * @desc Update assigned patient status (Doctor Only)
 * @route PATCH /api/assigned-patients/:id
 * @access Private (Doctor Only)
 */
export const updateAssignedPatientStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        const doctorId = req.user.id;

        // Validate status input
        const validStatuses = ["Pending", "In Progress", "Done", "Cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value." });
        }

        // Find the assigned patient and ensure the logged-in doctor is assigned to them
        const assignedPatient = await AssignedPatient.findById(id);
        if (!assignedPatient) {
            return res.status(404).json({ message: "Assigned patient not found." });
        }

        if (assignedPatient.doctorId.toString() !== doctorId) {
            return res.status(403).json({ message: "You are not authorized to update this patient's status." });
        }

        // Update the status
        assignedPatient.status = status;
        await assignedPatient.save();

        res.status(200).json({ message: "Assigned patient status updated successfully.", assignedPatient });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
