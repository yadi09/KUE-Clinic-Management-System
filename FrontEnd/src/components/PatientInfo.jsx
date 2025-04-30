import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import MockPatientInfo from "../assets/patientInfo.json";
import { useParams } from "react-router-dom";
import { getPatientById } from "../api/PatientAPI"; // Adjust the import based on your API structure

const PatientInfo = ({ title = "Patient Information" }) => {
    const { id } = useParams();
    // State for form fields
    const [formData, setFormData] = useState({});

    // Fetch patient data by ID (if needed)
    useEffect(() => {
        getPatientById(id)
            .then((response) => {
                console.log("Fetched Patient Data: ", response.data);
                setFormData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching patient data: ", error);
            });
    }, [id]);


    // // State for messages
    // const [message, setMessage] = useState("");
    // const [isError, setIsError] = useState(false);

    // // Handle input changes
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // // Handle form submission
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     // Simple validation
    //     if (!formData.name || !formData.studentId || !formData.phoneNumber || !formData.department) {
    //         setMessage("Please fill in all required fields.");
    //         setIsError(true);
    //         return;
    //     }

    //     // Simulate success
    //     setMessage("Patient created successfully!");
    //     setIsError(false);

    //     // Clear the form
    //     setFormData({
    //         name: "",
    //         studentId: "",
    //         phoneNumber: "",
    //         gender: "",
    //         department: "",
    //         age: "",
    //         dormNumber: "",
    //         region: "",
    //         wereda: "",
    //         kebele: "",
    //         houseNumber: "",
    //     });
    // };

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
                            <option value="Computer Science">Computer Science</option>
                            <option value="Business Administration">Business Administration</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Electrical Engineering">Electrical Engineering</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Architecture">Architecture</option>
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
                        <input type="text" name="dormNumber" id="dormNumber" value={formData.dormitoryNumber} disabled
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
            </form>
        </div>
    );
};

export default PatientInfo;
