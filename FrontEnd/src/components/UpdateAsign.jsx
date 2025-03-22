import React, { useState } from "react";
import MOCK from "../assets/doctors.json";

const UpdateAsign = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [doctors, setDoctors] = useState(MOCK);
    const [assignedDoctor, setAssignedDoctor] = useState(null); // Track assigned doctor

    // Handle doctor assignment
    const handleAssignDoctor = async () => {
        if (!selectedDoctor) {
            setError("Please select a doctor.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");
        setAssignedDoctor(null);

        try {
            // Mock API call simulation
            setTimeout(() => {
                setSuccess(`Successfully assigned to ${selectedDoctor}`);
                setAssignedDoctor(selectedDoctor); // Update notification message
                setLoading(false);
            }, 1000);
        } catch (err) {
            setError("Failed to assign doctor.");
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 pt-5">
            {/* Notification (Status of the assignment) */}
            <div className={`p-4 rounded-lg ${assignedDoctor ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                <span className="font-semibold">
                    {assignedDoctor ? `Patient assigned to ${assignedDoctor}` : "Patient Not Assigned"}
                </span>
            </div>

            {/* Doctor Assignment Section */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="border-b pb-2">
                    <h1 className="text-2xl font-bold">Assign to Doctor</h1>
                </div>

                {/* Doctor Selection Dropdown */}
                <div className="mt-4">
                    <label className="block font-semibold pb-2">Choose Available Doctor</label>
                    <select
                        className="w-full p-2 border rounded-lg focus:outline-none"
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                    >
                        <option value="">Select</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.name}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    onClick={handleAssignDoctor}
                    disabled={loading}
                >
                    {loading ? "Assigning..." : "Assign"}
                </button>

                {/* Success/Error Messages */}
                {error && <p className="mt-2 text-red-500">{error}</p>}
                {success && <p className="mt-2 text-green-500">{success}</p>}
            </div>
        </div>
    );
};

export default UpdateAsign;
