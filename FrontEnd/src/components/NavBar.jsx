import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-blue-500 p-4">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                {/* Left side - Navigation links */}
                <div className="hidden md:flex space-x-4">
                    <Link to="/patients" className="text-white hover:text-gray-200">
                        Patient
                    </Link>
                    <Link to="/medical-history" className="text-white hover:text-gray-200">
                        Medical History
                    </Link>
                    <Link to="/appointment" className="text-white hover:text-gray-200">
                        Appointment
                    </Link>
                    <Link to="/prescription" className="text-white hover:text-gray-200">
                        Prescription
                    </Link>
                    <Link to="/referrals" className="text-white hover:text-gray-200">
                        Referrals
                    </Link>
                </div>

                {/* Right side - Welcome text */}
                <div className="text-white hidden md:block">Welcome</div>

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

            {/* Mobile Menu */}
            {
                isMenuOpen && (
                    <div className="md:hidden bg-blue-500 text-white">
                        <a href="/patients" className="block px-4 py-2 hover:bg-blue-400">
                            Patient
                        </a>
                        <a
                            href="/medical-history"
                            className="block px-4 py-2 hover:bg-blue-400"
                        >
                            Medical History
                        </a>
                        <a href="/appointment" className="block px-4 py-2 hover:bg-blue-400">
                            Appointment
                        </a>
                        <a
                            href="/prescription"
                            className="block px-4 py-2 hover:bg-blue-400"
                        >
                            Prescription
                        </a>
                        <a href="/referrals" className="block px-4 py-2 hover:bg-blue-400">
                            Referrals
                        </a>
                    </div>
                )
            }
        </nav >
    );
};

export default NavBar