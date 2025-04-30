import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import MockPatientInfo from "../assets/patientInfo.json";
import { createPatient, updatePatient } from "../api/PatientAPI";
import { useParams } from "react-router-dom";
import { usePatient } from "../context/PatientContext"; // Importing the custom hook

const PatientForm = ({ title = "New Patient", isPatientProfile = false }) => {
    // State for form fields
    const { id } = useParams(); // Get patientId from the URL
    const { patient, fetchPatient, loading, error } = usePatient();
    const [dataLoaded, setDataLoaded] = useState(false);

    // Automatically fetch patient data when patientId changes
    useEffect(() => {
        if (id) {
            fetchPatient(id).then(() => setDataLoaded(true));
        }
    }, [id]); // Dependency array ensures it runs when patientId changes

    const [formData, setFormData] = useState({
        name: "",
        studentId: "",
        phoneNumber: "",
        gender: "",
        department: "",
        year: "",
        age: "",
        dormitoryNumber: "",
        region: "",
        wereda: "",
        kebele: "",
        houseNumber: "",
    });

    const updatedFields = { student_Id: patient?.studentId };
    Object.keys(formData).forEach(key => {
        if (formData?.[key] !== patient?.[key]) {
            if (formData?.[key] !== "") {
                updatedFields[key] = formData?.[key];
            }
        }
    });

    // State for messages
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value ? value : " " });
    };

    // Handle form submission
    const handlePatientCreation = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!formData.name || !formData.studentId || !formData.phoneNumber || !formData.department) {
            setMessage("Please fill in all required fields.");
            setIsError(true);
            return;
        }

        // handle form submission logic here
        try {
            console.log("Form data submitted:", formData);
            const response = await createPatient(formData)

            if (response.status === 201) {
                setMessage("Patient created successfully!");
                setIsError(false);
            }
        } catch (error) {
            console.error("Error creating patient:", error.response);
            setMessage(error.response.data.message || "An error occurred while creating the patient.");
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
            year: "",
            age: "",
            dormitoryNumber: "",
            region: "",
            wereda: "",
            kebele: "",
            houseNumber: "",
        });
    };

    // Handle Patient Update
    const handlePatientUpdate = async (e) => {
        e.preventDefault();
        // Logic to update patient data
        try {
            console.log("Updating patient data........:", updatedFields);
            const response = await updatePatient(id, updatedFields);

            if (response.status === 200) {
                setMessage("Patient updated successfully!");
                setIsError(false);
            }
        } catch (error) {
            console.error("Error updating patient:", error);
            setMessage(error.response.data.message || "An error occurred while updating the patient.");
            setIsError(true);
            return;
        }
    };


    // If data is not loaded yet, show loading message
    // if (!dataLoaded) {
    //     console.log("dataLoaded:", dataLoaded)
    //     return <p className="text-center text-gray-500">Loading...</p>;
    // }


    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="border-b pb-2 mb-4">
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            <form className="space-y-10">
                <input type="hidden" name="status" value="open" />

                {/* Name, Student ID, Phone Number */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange}
                            onFocus={(e) => e.target.select()}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your name" required />
                    </div>
                    <div>
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Student ID</label>
                        <input type="text" name="studentId" id="studentId" value={formData.studentId} onChange={handleChange}
                            onFocus={(e) => e.target.select()}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your Student ID (e.g Ugr/25042/14)" required />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                            onFocus={(e) => e.target.select()}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your Phone Number" required />
                    </div>
                </div>

                {/* Gender & Department */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                        <select name="gender" id="gender" value={formData.gender} onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                        <select name="department" id="department" value={formData.department} onChange={handleChange} required
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
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                        <input type="number" name="year" id="age" value={formData.year} onChange={handleChange} min={1} max={9}
                            onFocus={(e) => e.target.select()}
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your Year (e.g 1, 2, 3...)" />
                    </div>
                </div>

                {/* Age & Dorm Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                        <input type="number" name="age" id="age" value={formData.age} onChange={handleChange}
                            onFocus={(e) => e.target.select()}
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your Age" />
                    </div>
                    <div>
                        <label htmlFor="dormitoryNumber" className="block text-sm font-medium text-gray-700">Dorm Number</label>
                        <input type="text" name="dormitoryNumber" id="dormitoryNumber" value={formData.dormitoryNumber} onChange={handleChange}
                            onFocus={(e) => e.target.select()}
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
                            <input type="text" name={field} id={field} value={formData[field]} onChange={handleChange}
                                onFocus={(e) => e.target.select()}
                                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                placeholder={`Enter your ${field}`} />
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex space-x-4">
                    {isPatientProfile ? (
                        // If on Patient Profile, show "Medical Histories" link aligned left
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                            onClick={handlePatientUpdate}
                        >
                            Update
                        </button>
                    ) : (
                        // If on New Patient page, show "Create Patient" and "Reset" buttons
                        <>
                            <button type="submit"
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                                onClick={handlePatientCreation}
                            >
                                Create Patient
                            </button>
                            <button
                                type="reset"
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                                onClick={() => setFormData({ ...formData, name: "", studentId: "", phoneNumber: "" })}
                            >
                                Reset
                            </button>
                        </>
                    )}
                </div>

                {/* Success/Error Message */}
                {message && <p className={`mt-4 text-sm ${isError ? "text-red-500" : "text-green-500"}`}>{message}</p>}
            </form>
        </div>
    );
};

export default PatientForm;
