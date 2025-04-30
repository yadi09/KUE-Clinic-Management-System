import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Referral_Form = ({ title = "New Patient" }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        PresentHistory: "",
        PastPresentHistory: "",
        VitalSign: "",
        PhysicalExamination: "",
        Diagnostics: [],
        Plan: "",
        Treatment: "",
        Status: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDiagnosticsChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue && !formData.Diagnostics.includes(selectedValue)) {
            setFormData((prev) => ({
                ...prev,
                Diagnostics: [...prev.Diagnostics, selectedValue],
            }));
        }
    };

    const removeDiagnostic = (diagnostic) => {
        setFormData((prev) => ({
            ...prev,
            Diagnostics: prev.Diagnostics.filter((item) => item !== diagnostic),
        }));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="border-b pb-2 mb-4">
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>

            <form className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Card No:</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your name" required />
                    </div>
                    <div>
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Referral No:</label>
                        <input type="text" name="studentId" id="studentId" value={formData.studentId} onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your Student ID" required />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Referral Date:</label>
                        <input type="text" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your Phone Number" required />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Referred To:</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your name" required />
                    </div>
                    <div>
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Student Id:</label>
                        <input type="text" name="studentId" id="studentId" value={formData.studentId} onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your Student ID" required />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name of Patient:</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your name" required />
                    </div>
                    <div>
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Age:</label>
                        <input type="text" name="studentId" id="studentId" value={formData.studentId} onChange={handleChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Enter your Student ID" required />
                    </div>
                    <div>
                        <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">Gender:</label>
                        <select
                            name="Gender"
                            id="Gender"
                            onChange={handleDiagnosticsChange}
                            className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        >
                            <option value="">Select Gender</option>
                            <option value="Flu">Male</option>
                            <option value="Diabetes">Female</option>
                            <option value="Hypertension">Other</option>
                        </select>
                    </div>
                </div>

                <div key="Health Problems">
                    <label htmlFor="HealthProblems" className="block text-sm font-medium text-gray-700">
                        Health Problems:
                    </label>
                    <textarea
                        name="HealthProblems"
                        id="HealthProblems"
                        value={formData.HealthProblems}
                        onChange={handleChange}
                        required
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm p-2" // ✅ Added "p-2"
                    ></textarea>
                </div>

                {/* Vital Sign */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { label: "B/P:", name: "bp", placeholder: "Enter blood pressure" },
                        { label: "P/R:", name: "pr", placeholder: "Enter pulse rate" },
                        { label: "T/O:", name: "to", placeholder: "Enter temperature" },
                        { label: "R/R:", name: "rr", placeholder: "Enter respiratory rate" }
                    ].map((field) => (
                        <div key={field.name}>
                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                {field.label}
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={formData[field.name] || ""}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                placeholder={field.placeholder}
                                required
                            />
                        </div>
                    ))}
                </div>


                {["Tentative Diagnosis:", "Investigation Result:", "Action Taken (Treatment Given):", "Reason for Referral:"].map((field) => (
                    <div key={field}>
                        <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                            {field.replace(/([A-Z])/g, " $1").trim()}:
                        </label>
                        <textarea
                            name={field}
                            id={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm p-2" // ✅ Added "p-2"
                        ></textarea>
                    </div>
                ))}

                {/* Buttons */}
                <div className="flex space-x-4">
                    <Button
                        onClick={() => {
                            console.log("Add Referral button clicked");
                        }}
                        title="Add Referral"
                    />

                    <button
                        type="reset"
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Referral_Form;
