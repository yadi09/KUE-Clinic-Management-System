import React, { use } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../assets/KUE_logo.png";
// import { AuthContext } from '../context/AuthContext'; // Import the AuthContext
// import { TicketContext } from '../context/TicketContext'; // Import the TicketContext

const Header = () => {
    const user = null;
    // const { user, logoutUser } = useContext(AuthContext); // Get user and logoutUser from context
    // const { setTickets } = useContext(TicketContext); // Get setTickets from context

    // const handleLogout = () => {
    //     // Trigger logout when user clicks on the logout button
    //     logoutUser(setTickets);
    // };

    return (
        <header className="flex justify-between items-center p-4 border-b">
            <Link to="/">
                <img src={Logo} alt="Company Logo" className="h-10" />
            </Link>
            <div className="flex space-x-4">
                {user ? (
                    // If user is logged in, show the logout button
                    <button
                        // onClick={handleLogout}
                        className="text-blue-600 cursor-pointer hover:text-blue-800"
                    >
                        Logout
                    </button>
                ) : (
                    // If user is not logged in, show login/register links
                    <>
                        <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
                        <Link to="/register" className="text-blue-600 hover:text-blue-800">Register</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
