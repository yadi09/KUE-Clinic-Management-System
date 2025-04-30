import React, { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMedicalHistory } from "../context/MedicalHistoryContext"
import Button from "./Button";
import { useDiagnostics } from "../context/DiagnosticsContext"; // Import the custom hook

import { useAuth } from "../context/AuthContext"; // Import the custom hook

import { createDiagnostic } from "../api/DiagnosticsAPI"; // Import the API function
import { createAppointment } from "../api/Appointment"; // Import the API function
import { createMedicalHistory } from "../api/MedicalHistoryAPI"; // Import the API function

const MH_Form = ({ title = "New Patient" }) => {
    const navigate = useNavigate();
    const patientId = useParams()?.id; // Get the patient ID from the URL
    const mhId = useParams()?.mhId; // Get the medical history ID from the URL

    const { user, fetchPatient } = useAuth();

    const [AppointMessage, setAppointMessage] = useState("");
    const [isAppointed, setIsAppointed] = useState(false);
    // const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentSuccess, setAppointmentSuccess] = useState(false);
    const [appointmentError, setAppointmentError] = useState(false);
    const [appointmentMessage, setAppointmentMessage] = useState("");
    // 
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    // 
    const [showAddDisease, setShowAddDisease] = useState(false);
    const [addDiseaseSuccess, setAddDiseaseSuccess] = useState(false);
    const [addDiseaseError, setAddDiseaseError] = useState(false);
    const [DiseaseMessage, setDiseaseMessage] = useState("");
    const [selectedDiagnosticNames, setSelectedDiagnosticNames] = useState([]);

    const [medicalHistoryID, setMedicalHistoryID] = useState(useParams().mhId);

    const { medicalHistory, fetchMedicalHistoryById } = useMedicalHistory();

    const { diagnostics, fetchAllDiagnostics } = useDiagnostics(); // Use the custom hook to get diagnostics

    useEffect(() => {
        console.log("Medical History ID 2:", medicalHistoryID);
        // console.log("Patient ID:", patientId);
        if (medicalHistoryID) {
            fetchMedicalHistoryById(medicalHistoryID);
            console.log("Fetched Medical History:", medicalHistory);
        }
    }, []);


    const [formData, setFormData] = useState({
        presentHistory: medicalHistory?.presentHistory || "",
        pastPresentHistory: medicalHistory?.pastPresentHistory || "",
        vitalSign: {
            bp: "",
            pr: "",
            to: "",
            rr: "",
        },
        physicalExamination: medicalHistory?.physicalExamination || "",
        diagnostics: medicalHistory?.diagnostics || [],
        plan: medicalHistory?.plan || "",
        treatment: medicalHistory?.treatment || "",
        patientID: patientId,
        doctorID: user.id,
        status: "",
    });

    // to add new disease
    const [newDisease, setNewDisease] = useState({
        name: "",
        description: "",
    });

    // to add appointment
    const [appointment, setAppointment] = useState({
        PatientId: 2,
        DoctorId: 1,
        medicalHistoryID: 1,
        AppointmentDate: "",
        note: "",
    });

    useEffect(() => {

        fetchAllDiagnostics()
            .then((response) => {
                console.log("Fetched diagnostics:", diagnostics);
            })
            .catch((error) => {
                console.error("Error fetching diagnostics:", error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data: ", formData);
        try {
            const { status, ...dataWithoutStatus } = formData;
            const response = await createMedicalHistory(dataWithoutStatus);
            console.log("Response from API:", response);
            if (response.status === 201) {
                const medicalHistoryID = response.data._id; // Get the ID of the created medical history
                navigate(`/patients/${patientId}/medical-history/${medicalHistoryID}`); // Navigate to the medical history page

                setSuccess(true);
                setError(false);
                setMessage("✅ Medical history created successfully!");
            }
        } catch (error) {
            setError(true);
            setSuccess(false);
            setMessage(`❌ ${error.response.data.message}`);
            console.log(error);
        }
    }

    const handleAddNewDisease = async () => {
        if (newDisease.name.trim() === "") {
            setAddDiseaseError(true);
            setDiseaseMessage("❌ Disease name is required!");
            return;
        }
        // list of all diseases name
        const diseaseNames = diagnostics.map((disease) => disease.name);
        if (diseaseNames.includes(newDisease.name)) {
            setAddDiseaseError(true);
            setDiseaseMessage("❌ Disease already exists!");
            return;
        }

        try {
            // Add new disease to database
            const response = await createDiagnostic(newDisease);
            console.log("Response from API:", response);
            if (response.status === 201) {
                setAddDiseaseSuccess(true);
                setAddDiseaseError(false);
                setDiseaseMessage("✅ Disease added successfully!");
                fetchAllDiagnostics(); // Refresh the diagnostics list
            } else {
                setAddDiseaseError(true);
                setDiseaseMessage("❌ Failed to add disease!");
                return;
            }

            // Add new disease to the form data
            setFormData((prev) => ({
                ...prev,
                Diagnostics: [...prev.Diagnostics, newDisease.name],
            }));
        } catch (error) {
            setAddDiseaseError(true);
            setDiseaseMessage("❌ Failed to add disease!");
        }

        // Reset new disease state
        setNewDisease({ name: "", description: "" });

        // setShowAddDisease(false);
    };

    // Handle Appointment Submission
    const handleAppointmentSubmit = (e) => {
        e.preventDefault();
        console.log("Appointment: ", appointment);

        if (appointment.AppointmentDate === "") {
            setAppointmentError(true);
            setAppointmentMessage("❌ Appointment date is required!");
            return;
        }

        try {
            // Add appointment to database
            const response = createAppointment(appointment);
            if (response) {
                setAppointmentSuccess(true);
                setAppointmentError(false);
                setAppointmentMessage("✅ Appointment added successfully!");
            } else {
                setAppointmentError(true);
                setAppointmentMessage("❌ Failed to add appointment!");
                return;
            }
        } catch (error) {
            setAppointmentError(true);
            setAppointmentMessage("❌ Failed to add appointment!");
            return;
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "bp" || name === "pr" || name === "to" || name === "rr") {
            setFormData((prev) => ({
                ...prev,
                vitalSign: {
                    ...prev.vitalSign,
                    [name]: value ? value : " ",
                },
            }));
            return;
        }
        setFormData({ ...formData, [name]: value ? value : " " });

        if (name === "status") {
            setIsAppointed(value === "Appointed");
        } else {
            setIsAppointed(false);
        }
    };

    const handleDiagnosticsChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedDiagnosticNames(
            (prev) => [...prev, selectedValue]
        );
        console.log("Selected Diagnostic:", selectedValue.split(',')[1]);
        if (selectedValue.split(',')[1] && !formData.diagnostics.includes(selectedValue.split(',')[1])) {
            setFormData((prev) => ({
                ...prev,
                diagnostics: [...prev.diagnostics, selectedValue.split(',')[1]],
            }));
        }
    };


    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const removeDiagnostic = (diagnostic) => {
        console.log("Removing diagnostic:", diagnostic);
        setFormData((prev) => ({
            ...prev,
            diagnostics: prev.diagnostics.filter((item) => item !== diagnostic.split(',')[1]),
        }));
        setSelectedDiagnosticNames((prev) => prev.filter((item) => item !== diagnostic));
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="border-b pb-2 mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold flex items-center gap-3">
                    {title}
                    {formData.status || medicalHistory?.status && (
                        <span
                            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold 
                        ${formData.status || medicalHistory?.status === 'Appointed' ? 'bg-green-400 text-green-1000' :
                                    formData.status || medicalHistory?.status === 'Pending' ? 'bg-yellow-400 text-yellow-900' :
                                        formData.status || medicalHistory?.status === 'Referred' ? 'bg-blue-400 text-blue-1000' :
                                            formData.status || medicalHistory?.status === 'Completed' ? 'bg-gray-400 text-gray-900' :
                                                formData.status || medicalHistory?.status === 'Cancelled' ? 'bg-red-400 text-yellow-1000' :
                                                    formData.status || medicalHistory?.status === '' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-200 text-gray-800'}
                      `}
                        >
                            {formData.status ? formData?.status
                                : medicalHistory?.status}
                        </span>
                    )}
                </h1>
            </div>

            {mhId && (
                <div className="mb-4 flex justify-end space-x-4">
                    <Button
                        onClick={() => navigate(`/patients/${patientId}/medical-history/${mhId}/prescriptions/new`)}
                        title="Generate Prescription"
                    />
                    <Button
                        onClick={() => navigate(`/patients/${patientId}/medical-history/${mhId}/referrals/new`)}
                        title="Generate Referral"
                    />
                </div>
            )}

            <form className="space-y-6">
                {["presentHistory", "pastPresentHistory"].map((field) => (
                    <div key={field}>
                        <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                            {capitalizeFirst(field.replace(/([A-Z])/g, " $1")).trim()}:
                        </label>
                        <textarea
                            name={field}
                            id={field}
                            value={formData[field] || medicalHistory?.[field]}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm p-2" // ✅ Added "p-2"
                        ></textarea>
                    </div>
                ))}

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
                                value={formData.vitalSign[field.name] || medicalHistory?.vitalSign?.[field.name]}
                                onChange={handleChange}
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                placeholder={field.placeholder}
                                required
                            />
                        </div>
                    ))}
                </div>

                {/* Physical Examination */}
                <div>
                    <label htmlFor="physicalExamination" className="block text-sm font-medium text-gray-700">Physical Examination:</label>
                    <textarea
                        name="physicalExamination"
                        id="physicalExamination"
                        value={formData.physicalExamination || medicalHistory?.physicalExamination}
                        onChange={handleChange}
                        required
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm p-2" // ✅ Added "p-2"
                    ></textarea>
                </div>

                {/* Diagnostics */}
                <div>
                    <label htmlFor="diagnostics" className="block text-sm font-medium text-gray-700">Diagnostics:</label>
                    <select
                        name="diagnostics"
                        id="diagnostics"
                        onChange={handleDiagnosticsChange}
                        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    >
                        {console.log(selectedDiagnosticNames)}
                        <option value="">Select Diagnostics</option>
                        {diagnostics.map((diagnostic, index) => (
                            <option key={index} value={[diagnostic.name, diagnostic._id]}>{diagnostic.name}</option>
                        ))}
                    </select>

                    {/* Selected Items */}
                    <div className="mt-2 flex flex-wrap gap-2">
                        {(selectedDiagnosticNames).map((diagnostic, index) => (
                            <span
                                key={index}
                                className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-lg border border-blue-400 shadow-md hover:bg-blue-200 transition"
                            >
                                {diagnostic.split(',')[0]}
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

                    {medicalHistory?.diagnostics && (
                        <div className="mt-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Previously Diagnosed</h3>

                            <div className="flex flex-wrap gap-2">
                                {medicalHistory?.diagnostics.map((diagnostic, index) => (
                                    <div
                                        key={index}
                                        className="inline-flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full border border-green-300 shadow-sm"
                                        title={diagnostic.description || 'No description available'}
                                    >
                                        🩺 {diagnostic.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add New Disease Toggle */}
                    <div className="mt-3">
                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:underline"
                            onClick={() => setShowAddDisease(true)}
                        >
                            + Can’t find it? Add a new disease
                        </button>
                    </div>

                    {/* Add New Disease Form */}
                    {showAddDisease && (
                        <div className="mt-4 border rounded-lg bg-gray-50 p-4 shadow-inner">
                            <h3 className="text-md font-semibold text-gray-800 mb-2">Add New Disease</h3>

                            <input
                                type="text"
                                placeholder="Disease Name"
                                className="mb-2 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                value={newDisease.name}
                                onChange={(e) => setNewDisease({ ...newDisease, name: e.target.value })}
                            />

                            <textarea
                                placeholder="Description (optional)"
                                className="mb-2 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                value={newDisease.description}
                                onChange={(e) => setNewDisease({ ...newDisease, description: e.target.value })}
                            />

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md shadow"
                                    onClick={handleAddNewDisease}
                                >
                                    Add Disease
                                </button>
                                <button
                                    type="button"
                                    className="text-sm text-gray-500 hover:underline"
                                    onClick={() => {
                                        setShowAddDisease(false);
                                        setNewDisease({ name: "", description: "" });
                                        setAddDiseaseSuccess(false);
                                        setAddDiseaseError(false);
                                        setDiseaseMessage("");
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                            {/* Success/Error Message */}
                            {DiseaseMessage && <p className={`mt-4 text-sm ${addDiseaseError ? "text-red-500" : "text-green-500"}`}>{DiseaseMessage}</p>}
                        </div>
                    )}
                </div>


                {/* Plan & Treatment */}
                {["plan", "treatment"].map((field) => (
                    <div key={field}>
                        <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                            {capitalizeFirst(field.replace(/([A-Z])/g, " $1")).trim()}:
                        </label>
                        <textarea
                            name={field}
                            id={field}
                            value={medicalHistory?.[field] || formData[field] || ""}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm p-2" // ✅ Added "p-2"
                        ></textarea>
                    </div>
                ))}

                {/* Status */}
                <div
                    className={`mt-4 border rounded-lg p-4 shadow-inner transition-all duration-300 
    ${!medicalHistory ? "opacity-50 pointer-events-none" : ""}`}
                >
                    <label htmlFor="Status" className="block text-sm font-medium text-gray-700">
                        Status:
                    </label>
                    <select
                        name="status"
                        id="status"
                        value={formData?.status || medicalHistory?.status}
                        onChange={handleChange}
                        disabled={!medicalHistory} // 👈 disable if medicalHistory is null/undefined
                        className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Appointed">Appointed</option>
                        <option value="Referred">Referred</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>


                {isAppointed && (
                    <div className="mt-4 border rounded-lg bg-gray-50 p-4 shadow-inner">
                        <div className="mt-4 transition-all duration-300">
                            <label
                                htmlFor="AppointmentDate"
                                className="block text-sm font-medium text-blue-700"
                            >
                                📅 Appointment Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="AppointmentDate"
                                id="AppointmentDate"
                                value={appointment.AppointmentDate}
                                onChange={(e) => setAppointment({ ...appointment, AppointmentDate: e.target.value })}
                                required
                                className="mt-1 w-full rounded-lg border-2 border-blue-400 bg-blue-50 px-4 py-2 text-gray-900 shadow-md focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <p className="mt-1 text-xs text-blue-600">
                                Please select a date for the appointment.
                            </p>

                            <div className="mt-4 mb-4">
                                <h3 className="text-md font-semibold text-gray-800 mb-2">Note:</h3>
                                <textarea
                                    placeholder="Note (optional)"
                                    className="mb-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    value={appointment.note}
                                    onChange={(e) => setAppointment({ ...appointment, note: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md shadow"
                                onClick={handleAppointmentSubmit}
                            >
                                Appoint
                            </button>
                            <button
                                type="button"
                                className="text-sm text-gray-500 hover:underline"
                                onClick={() => {
                                    setIsAppointed(false);
                                    setAppointment({ AppointmentDate: "", note: "" });
                                    setAppointmentSuccess(false);
                                    setAppointmentError(false);
                                    setAppointmentMessage("");
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}



                {/* Buttons */}
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                        onClick={handleSubmit}
                    >
                        Create Medical History
                    </button>
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
    );
};

export default MH_Form;
