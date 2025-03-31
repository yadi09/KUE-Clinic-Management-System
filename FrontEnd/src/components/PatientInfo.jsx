import React, { useState } from "react";
import { Link } from "react-router-dom";
import MockPatientInfo from "../assets/patientInfo.json";

const PatientInfo = ({ title = "Patient Information", isPatientProfile = flase }) => {
    // State for form fields
    const [formData, setFormData] = useState({
        name: MockPatientInfo.name,
        studentId: MockPatientInfo.studentId,
        phoneNumber: MockPatientInfo.phoneNumber,
        gender: MockPatientInfo.gender,
        department: MockPatientInfo.department,
        age: MockPatientInfo.age,
        dormNumber: MockPatientInfo.dormNumber,
        region: MockPatientInfo.region,
        wereda: MockPatientInfo.wereda,
        kebele: MockPatientInfo.kebele,
        houseNumber: MockPatientInfo.houseNumber,
    });

    // State for messages
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        if (!formData.name || !formData.studentId || !formData.phoneNumber || !formData.department) {
            setMessage("Please fill in all required fields.");
            setIsError(true);
            return;
        }

        // Simulate success
        setMessage("Patient created successfully!");
        setIsError(false);

        // Clear the form
        setFormData({
            name: "",
            studentId: "",
            phoneNumber: "",
            gender: "",
            department: "",
            age: "",
            dormNumber: "",
            region: "",
            wereda: "",
            kebele: "",
            houseNumber: "",
        });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="border-b pb-2 mb-4">
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            <form className="space-y-10" onSubmit={handleSubmit}>
                <input type="hidden" name="status" value="open" />

                {/* Name, Student ID, Phone Number */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" id="name" value={formData.name} disabled
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your name" required />
                    </div>
                    <div>
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Student ID</label>
                        <input type="text" name="studentId" id="studentId" value={formData.studentId} disabled
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your Student ID" required />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} disabled
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your Phone Number" required />
                    </div>
                </div>

                {/* Gender & Department */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                        <select name="gender" id="gender" value={formData.gender} disabled
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                        <select name="department" id="department" value={formData.department} disabled
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
                            <option value="">Select Department</option>
                            <option value="computer-science">Computer Science</option>
                            <option value="business-admin">Business Administration</option>
                            <option value="mechanical-engineering">Mechanical Engineering</option>
                            <option value="electrical-engineering">Electrical Engineering</option>
                            <option value="civil-engineering">Civil Engineering</option>
                            <option value="architecture">Architecture</option>
                        </select>
                    </div>
                </div>

                {/* Age & Dorm Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                        <input type="number" name="age" id="age" value={formData.age} disabled
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your Age" />
                    </div>
                    <div>
                        <label htmlFor="dormNumber" className="block text-sm font-medium text-gray-700">Dorm Number</label>
                        <input type="text" name="dormNumber" id="dormNumber" value={formData.dormNumber} disabled
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your Dorm Number" />
                    </div>
                </div>

                {/* Address Fields */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {["region", "wereda", "kebele", "houseNumber"].map((field) => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input type="text" name={field} id={field} value={formData[field]} disabled
                                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                placeholder={`Enter your ${field}`} />
                        </div>
                    ))}
                </div>

                {/* Buttons & Link Wrapper */}
                <div className="flex items-center w-full">
                    {/* Left Side: Buttons */}
                    {!isPatientProfile && (
                        <div className="flex space-x-4">
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                                Create Patient
                            </button>
                            <button
                                type="reset"
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                                onClick={() => setFormData({ ...formData, name: "", studentId: "", phoneNumber: "" })}
                            >
                                Reset
                            </button>
                        </div>
                    )}

                    {/* Push "Medical Histories" link to the right */}
                    {isPatientProfile && (
                        <div className="ml-auto">
                            <Link
                                to={`/patients/2/medical-history`}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                            >
                                Medical Histories
                            </Link>
                        </div>
                    )}
                </div>

                {/* Success/Error Message */}
                {message && <p className={`mt-4 text-sm ${isError ? "text-red-500" : "text-green-500"}`}>{message}</p>}
            </form>
        </div>
    );
};

export default PatientInfo;
