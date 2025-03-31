import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const MH_Form = ({ title = "New Patient" }) => {
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

            <div className="mb-4 flex justify-end space-x-4">
                <Button
                    onClick={() => navigate('/patients/2/prescriptions/new')}
                    title="Generate Prescription"
                />
                <Button
                    onClick={() => navigate('/patients/2/referrals/new')}
                    title="Generate Referral"
                />
            </div>



            <form className="space-y-6">
                {["PresentHistory", "PastPresentHistory", "VitalSign", "PhysicalExamination"].map((field) => (
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

                {/* Diagnostics */}
                <div>
                    <label htmlFor="Diagnostics" className="block text-sm font-medium text-gray-700">Diagnostics:</label>
                    <select
                        name="Diagnostics"
                        id="Diagnostics"
                        onChange={handleDiagnosticsChange}
                        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    >
                        <option value="">Select Diagnostics</option>
                        <option value="Flu">Flu</option>
                        <option value="Diabetes">Diabetes</option>
                        <option value="Hypertension">Hypertension</option>
                    </select>

                    <div className="mt-2 flex flex-wrap gap-2">
                        {formData.Diagnostics.map((diagnostic, index) => (
                            <span
                                key={index}
                                className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-lg border border-blue-400 shadow-md hover:bg-blue-200 transition"
                            >
                                {diagnostic}
                                <button
                                    type="button"
                                    className="ml-2 text-blue-700 hover:text-blue-900"
                                    onClick={() => removeDiagnostic(diagnostic)}
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Plan & Treatment */}
                {["Plan", "Treatment"].map((field) => (
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

                {/* Status */}
                <div>
                    <label htmlFor="Status" className="block text-sm font-medium text-gray-700">Status:</label>
                    <select
                        name="Status"
                        id="Status"
                        value={formData.Status}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    >
                        <option value="">Select Status</option>
                        <option value="Appointed">Appointed</option>
                        <option value="Referred">Referred</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex space-x-4">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                        Create Medical History
                    </button>
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

export default MH_Form;
