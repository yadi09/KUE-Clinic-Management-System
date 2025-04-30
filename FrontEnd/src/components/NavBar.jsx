import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook

const NavBar = () => {
    const { user } = useAuth(); // Get user from context
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const role = user?.role;

    const renderLinks = () => {
        switch (role) {
            case 'receptionist':
                return (
                    <>
                        <Link to="/patients" className="text-white hover:text-gray-200">Patients</Link>
                        <Link to="/patients/new" className="text-white hover:text-gray-200">New Patient</Link>
                        <Link to="#" className="text-white hover:text-gray-200">Appointment</Link>
                    </>
                );
            case 'doctor':
            case 'admin':
                return (
                    <>
                        <Link to="/patients" className="text-white hover:text-gray-200">Patient</Link>
                        <Link to="#" className="text-white hover:text-gray-200">Medical History</Link>
                        <Link to="#" className="text-white hover:text-gray-200">Appointment</Link>
                        <Link to="#" className="text-white hover:text-gray-200">Prescription</Link>
                        <Link to="#" className="text-white hover:text-gray-200">Referrals</Link>
                    </>
                );
            default:
                <>
                    <Link to="#" className="text-white hover:text-gray-200">
                        Kotebe University Clinic Managment System</Link>
                </>
        }
    };

    const renderMobileLinks = () => {
        switch (role) {
            case 'receptionist':
                return (
                    <>
                        <a href="/patients" className="block px-4 py-2 hover:bg-blue-400">Patients</a>
                        <a href="/patients/new" className="block px-4 py-2 hover:bg-blue-400">New Patient</a>
                        <a href="/appointment" className="block px-4 py-2 hover:bg-blue-400">Appointment</a>
                    </>
                );
            case 'doctor':
            case 'admin':
            default:
                return (
                    <>
                        <a href="/patients" className="block px-4 py-2 hover:bg-blue-400">Patient</a>
                        <a href="#" className="block px-4 py-2 hover:bg-blue-400">Medical History</a>
                        <a href="#" className="block px-4 py-2 hover:bg-blue-400">Appointment</a>
                        <a href="#" className="block px-4 py-2 hover:bg-blue-400">Prescription</a>
                        <a href="#" className="block px-4 py-2 hover:bg-blue-400">Referrals</a>
                    </>
                );
        }
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                {/* Desktop Links */}
                <div className="hidden md:flex space-x-4">
                    {renderLinks()}
                </div>

                {/* Welcome Message */}
                <div className="text-white hidden md:block">
                    Welcome {user?.name || ""}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Mobile Links */}
            {isMenuOpen && (
                <div className="md:hidden bg-blue-500 text-white">
                    {renderMobileLinks()}
                </div>
            )}
        </nav>
    );
};

export default NavBar;
