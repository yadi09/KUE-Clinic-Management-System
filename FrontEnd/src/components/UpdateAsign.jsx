import React, { useState, useEffect } from "react";
import { useDoctor } from "../context/DoctorContext";
import { useParams } from "react-router-dom";
import { assignPatientToDoctor } from "../api/PatientAPI"; // API function to assign patient to doctor

const UpdateAsign = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const { id } = useParams();
    const [assignedDoctor, setAssignedDoctor] = useState(null);
    const { doctors, fetchDoctors } = useDoctor();

    useEffect(() => {
        fetchDoctors();
    }, []);

    const [pendingAssignment, setPendingAssignment] = useState(false); // Track if an assignment is pending

    const handleAssignDoctor = () => {
        if (!selectedDoctor || !selectedDoctor.id) {
            setError("Please select a doctor.");
            return;
        }

        setPendingAssignment(true); // Mark that we want to assign the doctor
    };

    useEffect(() => {
        if (pendingAssignment && selectedDoctor) {
            setLoading(true);
            setError("");
            setSuccess("");
            setAssignedDoctor(null);

            try {
                console.log("Assigning patient to doctor:", selectedDoctor.name, "patient ID:", id);

                assignPatientToDoctor({ patientId: id, doctorId: selectedDoctor.id })
                    .then((response) => {
                        console.log("Assignment Response:", response.data);
                        if (!response.data) {
                            throw new Error("No response data found.");
                        }

                        // Assuming the API returns the assigned doctor in the response
                        setSuccess(`Successfully assigned to ${selectedDoctor.name}`);
                        setAssignedDoctor(selectedDoctor.name);
                    })
                    .catch((err) => {
                        console.error("Assignment Error:", err);
                        setError(err.response?.data?.message || "Failed to assign doctor.");
                        setSuccess("");
                    });


                // setSuccess(`Successfully assigned to ${selectedDoctor.name}`);
                // setAssignedDoctor(selectedDoctor.name);
            } catch (err) {
                setError("Failed to assign doctor.");
            } finally {
                setLoading(false);
                setPendingAssignment(false); // Reset pending assignment
            }
        }
    }, [selectedDoctor, pendingAssignment]); // Executes when `selectedDoctor` updates **after** selection

    return (
        <div className="space-y-6 pt-5">
            <div className={`p-4 rounded-lg ${assignedDoctor ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                <span className="font-semibold">
                    {assignedDoctor ? `Patient assigned to Dr ${assignedDoctor}` : "Patient Not Assigned"}
                </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="border-b pb-2">
                    <h1 className="text-2xl font-bold">Assign to Doctor</h1>
                </div>

                <div className="mt-4">
                    <label className="block font-semibold pb-2">Choose Available Doctor</label>
                    <select
                        className="w-full p-2 border rounded-lg focus:outline-none"
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            const selectedName = e.target.options[e.target.selectedIndex].getAttribute("data-name");

                            setSelectedDoctor({ id: selectedValue, name: selectedName });
                            console.log("Selected doctor:", selectedValue, selectedName);
                        }}
                    >
                        <option value="">Select</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor._id} data-name={doctor.name}>
                                Dr {doctor.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    onClick={handleAssignDoctor}
                >
                    {loading ? "Assigning..." : "Assign"}
                </button>

                {error && <p className="mt-2 text-red-500">{error}</p>}
                {success && <p className="mt-2 text-green-500">{success}</p>}
            </div>
        </div>
    );
};

export default UpdateAsign;
