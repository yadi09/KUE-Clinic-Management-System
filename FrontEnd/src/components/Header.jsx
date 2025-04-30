import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/KUE_logo.png";
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
// import { AuthContext } from '../context/AuthContext'; // Import the AuthContext
// import { TicketContext } from '../context/TicketContext'; // Import the TicketContext

const Header = () => {
    const { user, logout } = useAuth(); // Get user and logoutUser from context

    const handleLogout = () => {
        // Trigger logout when user clicks on the logout button
        logout();
    };

    return (
        <header className="flex justify-between items-center p-4 border-b">
            <Link to="/">
                <img src={Logo} alt="Company Logo" className="h-10" />
            </Link>
            <div className="flex space-x-4">
                {user ? (
                    // If user is logged in, show the logout button
                    <button
                        onClick={handleLogout}
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                    >
                        Logout
                    </button>
                ) : (
                    // If user is not logged in, show login/register links
                    <>
                        <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
                        {/* <Link to="/register" className="text-blue-600 hover:text-blue-800">Register</Link> */}
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
