import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Button from "./Button";
import { usePatient } from "../context/PatientContext";
import { createPrescription } from "../api/prescriptionAPI";
import PrescriptionFormat from "./PrescriptionPrintFormat";

const Prescription_Form = ({ title = "New Patient" }) => {
    const navigate = useNavigate();
    const componentRef = useRef(null);

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const { id, mhId } = useParams();
    console.log("Patient ID from URL:", id);
    console.log("Medical History ID from URL:", mhId);
    const { fetchPatient, patient } = usePatient();


    useEffect(() => {
        // Fetch patient data if needed
        fetchPatient(id);
    }, [id]);

    const [formData, setFormData] = useState({
        forWho: "",
        RX: "",
        medicalHistoryId: mhId
    });

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await createPrescription(formData)
            console.log("Prescription response:", response);
            if (response.status === 201) {
                setMessage("Prescription created successfully!");
                setError(false);
                // Printing Logic
                handlePrint();
                navigate(`/patients/${id}/medical-history/${mhId}`);
            }
        } catch (error) {
            console.error(error.response.data.message);
            setError(true);
            setMessage(error.response.data.message);
        }
    }

    // const handleDiagnosticsChange = (e) => {
    //     const selectedValue = e.target.value;
    //     if (selectedValue && !formData.Diagnostics.includes(selectedValue)) {
    //         setFormData((prev) => ({
    //             ...prev,
    //             Diagnostics: [...prev.Diagnostics, selectedValue],
    //         }));
    //     }
    // };

    // const removeDiagnostic = (diagnostic) => {
    //     setFormData((prev) => ({
    //         ...prev,
    //         Diagnostics: prev.Diagnostics.filter((item) => item !== diagnostic),
    //     }));
    // };

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="border-b pb-2 mb-4">
                    <h1 className="text-2xl font-bold">{title}</h1>
                </div>

                <form className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                            <input type="text" name="name" id="name" value={patient?.name} disabled
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm opacity-50 cursor-not-allowed"
                                placeholder="Enter your name" required />
                        </div>
                        <div>
                            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Student Id:</label>
                            <input type="text" name="studentId" id="studentId" value={patient?.studentId} disabled
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm opacity-50 cursor-not-allowed"
                                placeholder="Enter your Student ID" required />
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Card Number:</label>
                            <input type="text" name="phoneNumber" id="phoneNumber" value={patient?.phoneNumber} disabled
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm opacity-50 cursor-not-allowed"
                                placeholder="Enter your Phone Number" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Age:</label>
                            <input type="text" name="studentId" id="studentId" value={patient?.age} disabled
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm opacity-50 cursor-not-allowed"
                                placeholder="Enter your Student ID" required />
                        </div>
                        <div>
                            <label htmlFor="Gender" className="block text-sm font-medium text-gray-700">Gender:</label>
                            <select
                                name="Gender"
                                id="Gender"
                                disabled
                                value={patient?.gender}
                                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm opacity-50 cursor-not-allowed"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="forWho" className="block text-sm font-medium text-gray-700">For Who:</label>
                            <select
                                name="forWho"
                                id="forWho"
                                value={formData.forWho}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            >
                                <option value="">Select</option>
                                <option value="Student">Student</option>
                                <option value="Staff">Staff</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>


                    <div key="RX" className="mb-4">
                        <label htmlFor="RX" className="block text-sm font-medium text-gray-700">
                            RX:
                        </label>
                        <textarea
                            name="RX"
                            id="RX"
                            value={formData.RX}
                            onChange={handleChange}
                            rows="4"
                            required
                            placeholder="Enter Prescription Details"
                            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm p-2" // ✅ Added "p-2"
                        ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-4">
                        <Button
                            onClick={handleSubmit}
                            title="Add Prescription"
                        />

                        <button
                            type="reset"
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                        >
                            Reset
                        </button>
                    </div>

                    {/* Success/Error Message */}
                    {message && <p className={`mt-4 text-sm ${error ? "text-red-500" : "text-green-500"}`}>{message}</p>}
                </form>
            </div>

            {/* Prescription Format */}
            <div style={{ display: "none" }}>
                <PrescriptionFormat ref={componentRef} patient={patient} prescription={formData} />
            </div>
        </>
    );
};

export default Prescription_Form;
