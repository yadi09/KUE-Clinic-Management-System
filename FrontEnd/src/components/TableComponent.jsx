import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineErrorOutline } from 'react-icons/md'; // You can use any icon library
import { usePatient } from '../context/PatientContext'; // Adjust the import based on your API structure
import { useAuth } from '../context/AuthContext'; // Adjust the import based on your API structure
import { useDoctor } from '../context/DoctorContext'; // Adjust the import based on your API structure

const TableComponent = ({ title = "NO Title" }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const patientsPerPage = 10;
    const navigate = useNavigate();
    const { patients, fetchAllPatients } = usePatient();
    const { user } = useAuth(); // Get user from AuthContext
    const { fetchAssignedPatientsToDoctor, assignedPatients } = useDoctor(); // Get fetchAssignPatientToDoctor from DoctorContext

    // Fetch All Patients
    useEffect(() => {
        console.log("User in TableComponent: ", user);
        if (user?.role === "receptionist" || user?.role === "admin") {
            fetchAllPatients();
        } else {
            console.log("Fetching assigned patients for doctor:", user?.id);
            fetchAssignedPatientsToDoctor(user?.id);
        }
    }, [user]);

    // Global search: Filter patie(nts based on search term across all fields
    const filteredPatients = (user?.role === "doctor" ? assignedPatients.map(patient => patient.patientId) : patients).filter(patient =>
        Object.values(patient).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    console.log("Filtered Patients: ", filteredPatients);

    // Pagination logic
    const indexOfLastTicket = currentPage * patientsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - patientsPerPage;
    const currentPatients = filteredPatients.slice(indexOfFirstTicket, indexOfLastTicket);

    const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleRowClick = (id) => {
        user?.role === "receptionist" ? navigate(`/patients/${id}/manage`) :
            navigate(`/patients/${id}`);
    };

    const getBadgeColor = (value) => {
        switch (value) {
            case 'High': return 'bg-red-500';
            case 'Medium': return 'bg-yellow-500';
            case 'Low': return 'bg-green-500';
            case 'Open': return 'bg-blue-500';
            case 'Pending': return 'bg-yellow-500';
            case 'Closed': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
    };

    // Helper function to safely convert string to uppercase
    const safeToUpperCase = (value) => {
        return value && typeof value === 'string' ? value.toUpperCase() : value;
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="border-b pb-2 mb-4">
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>

            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="search"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Empty state when no tickets are available */}
            {filteredPatients.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                    <MdOutlineErrorOutline size={50} className="text-gray-400" />
                    <p className="text-lg text-gray-500 mt-2">No Patient found</p>
                </div>
            ) : (
                <>
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 border">Card Number</th>
                                    <th className="py-2 px-4 border">Name</th>
                                    <th className="py-2 px-4 border">Gender</th>
                                    <th className="py-2 px-4 border">Department</th>
                                    <th className="py-2 px-4 border">Year</th>
                                    <th className="py-2 px-4 border">R.Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPatients.map((patient) => (
                                    <tr
                                        key={patient._id}
                                        onClick={() => handleRowClick(patient._id)}
                                        className="hover:bg-gray-100 cursor-pointer"
                                    >
                                        <td className="py-2 px-4 border">{patient.cardNumber}</td>
                                        <td className="py-2 px-4 border">{patient.name}</td>
                                        <td className="py-2 px-4 border">{patient.gender}</td>
                                        <td className="py-2 px-4 border">{patient.department}</td>
                                        <td className="py-2 px-4 border">{patient.year}</td>

                                        {/* <td className="py-2 px-4 border">
                                            <span className={`px-2 py-1 rounded-full text-white ${getBadgeColor(patient.priority)}`}>
                                                {safeToUpperCase(patient.priority)}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 border">
                                            <span className={`px-2 py-1 rounded-full text-white ${getBadgeColor(patient.status)}`}>
                                                {safeToUpperCase(patient.status)}
                                            </span>
                                        </td> */}
                                        <td className="py-2 px-4 border">
                                            {patient.createdAt ?
                                                new Date(patient.createdAt).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                                : "N/A"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4">
                        <span>
                            Showing {indexOfFirstTicket + 1} to {Math.min(indexOfLastTicket, filteredPatients.length)} of {filteredPatients.length} patients
                        </span>
                        <div className="flex space-x-2">
                            <button
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TableComponent;
