import React, { forwardRef } from "react";
import logo from "../assets/img/logo.png"; // Update if path differs

const PrescriptionFormat = forwardRef(({ patient, prescription }, ref) => {
    const currentDate = new Date().toLocaleDateString();

    console.log("Patient Data:", patient);
    console.log("Prescription Data:", prescription);
    return (
        <div
            ref={ref}
            className="w-[21cm] h-[14.85cm] mx-auto border border-black box-border p-[1cm] font-sans text-black bg-white"
        >
            {/* Header */}
            <div className="text-center mb-[1cm]">
                <img src={logo} alt="Clinic Logo" className="w-[50px] h-[50px] mx-auto mb-2" />
                <h2 className="text-lg font-bold">KOTEBE UNIVERSITY OF EDUCATION</h2>
                <h3 className="text-base font-semibold">MEDIUM CLINIC PRESCRIPTION FORM</h3>
            </div>

            {/* Date */}
            <div className="text-right mb-4">
                <p className="text-sm">Date: {currentDate}</p>
            </div>

            {/* Patient Type */}
            <div className="mb-4">
                <p className="flex flex-wrap gap-6">
                    <label className="inline-flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={prescription?.forWho === "student"}
                            readOnly
                            className="form-checkbox"
                        />
                        <span>Student</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={prescription?.forWho === "staff"}
                            readOnly
                            className="form-checkbox"
                        />
                        <span>Staff</span>
                    </label>
                    <label className="inline-flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={prescription?.forWho === "other"}
                            readOnly
                            className="form-checkbox"
                        />
                        <span>Other</span>
                    </label>
                </p>
            </div>

            {/* Patient Info */}
            <div className="mb-4 text-sm">
                <p className="mb-2">
                    <strong>Name:</strong> {patient?.name || "__________"} &nbsp;&nbsp;
                    <strong>Age:</strong> {patient?.age || "__________"} &nbsp;&nbsp;
                    <strong>Gender:</strong> {patient?.gender || "__________"}
                </p>
                <p>
                    <strong>ID No:</strong> {patient?.studentId || "__________"} &nbsp;&nbsp;
                    <strong>Card:</strong> {patient?.cardNumber || "__________"}
                </p>
            </div>

            {/* Prescription */}
            <div className="mb-4 text-sm">
                <p>
                    <strong>RX:</strong> {prescription?.RX || "________"}
                </p>
                {/* Optional RX Textarea View
                <textarea
                    value={prescription.RX || ""}
                    readOnly
                    className="w-full h-[3cm] border border-black p-4 box-border"
                />
                */}
            </div>

            {/* Footer */}
            <div className="text-center mt-6 text-sm">
                <p className="font-medium">PRESCRIBER'S/MD/HO/RN __________________</p>
            </div>
        </div>
    );
});

export default PrescriptionFormat;
