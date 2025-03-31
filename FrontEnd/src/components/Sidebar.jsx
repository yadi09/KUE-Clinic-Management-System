import React, { useState, useEffect } from "react";
import { FaBars, FaUserMd, FaUser, FaNotesMedical, FaCalendarAlt, FaPrescriptionBottle, FaSignOutAlt } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import Logo from "../assets/KUE_logo.png"; // Assuming you have a logo image
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true); // Controls sidebar state (expanded/collapsed)
    const [isMobileOpen, setIsMobileOpen] = useState(false); // Controls mobile sidebar visibility
    const [isSmallScreen, setIsSmallScreen] = useState(false); // Checks if screen size is small

    const menuItems = [
        { name: "Dashboard", icon: <FaBars /> },
        { name: "Doctors", icon: <FaUserMd /> },
        { name: "Patients", icon: <FaUser /> },
        { name: "Medical History", icon: <MdHistory /> },
        { name: "Appointments", icon: <FaCalendarAlt /> },
        { name: "Prescriptions", icon: <FaPrescriptionBottle /> },
        { name: "Logout", icon: <FaSignOutAlt /> },
    ];

    // Track screen size for responsive behavior
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSmallScreen(true);
                setIsOpen(false); // Automatically collapse on small screens
            } else {
                setIsSmallScreen(false);
                setIsOpen(true); // Expand on large screens
            }
        };

        handleResize(); // Check on initial load
        window.addEventListener("resize", handleResize);

        // Clean up the event listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 text-black ${isOpen ? 'hidden' : 'block'}"
                onClick={toggleMobileSidebar}
            >
                <FaBars size={24} />
            </button>

            {/* Sidebar Container */}
            <div
                className={`fixed lg:relative top-0 left-0 h-screen bg-blue-900 text-white p-4 transition-all duration-300 
        ${isOpen ? "w-64" : "w-20"} 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
            >
                {/* Logo and Hamburger Button (Desktop) */}
                <div className="flex items-center justify-between">
                    <h1 className={`text-xl font-bold transition-all `}>
                        <img src={Logo} alt="Logo" className={`w-10 h-10 bg-white border-2 rounded-full`} />
                        {isOpen ? "KUE Clinic" : "KUE"}
                    </h1>
                    <button onClick={toggleSidebar} className="lg:block text-white ${isOpen ? hidden : block}">
                        {isOpen ? <BsArrowLeftShort size={24} className="hover:bg-blue-950" /> : <BsArrowRightShort size={24} className="hover:bg-blue-950" />}
                    </button>
                </div>

                {/* Sidebar Menu */}
                <nav className="mt-10">
                    {menuItems.map((item, index) => (
                        <div key={index} className="relative group">
                            <a
                                href="#"
                                className="flex items-center gap-4 p-3 hover:bg-blue-950 rounded transition-all"
                            >
                                {item.icon}
                                {/* Show label when expanded */}
                                <span className={`transition-all ${isOpen ? "block" : "hidden"}`}>{item.name}</span>
                            </a>

                            {/* Tooltip (When Collapsed) */}
                            {!isOpen && (
                                <span className="absolute left-16 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {item.name}
                                </span>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
