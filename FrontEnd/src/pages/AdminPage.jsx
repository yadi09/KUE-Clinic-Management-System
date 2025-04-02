import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

    return (
        <div className="flex">
            {/* Sidebar 
            - The side bar should be sticky and should not scroll with the page
            */}
            <div className="sticky top-0 h-screen">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-h-screen bg-gray-100">
                {/* Navbar */}
                <AdminNavbar />

                {/* Main Content */}
                <main className="p-4">
                    <Outlet />
                </main>

                {/* Footer */}
                <AdminFooter />
            </div>
        </div>
    );
};

export default Dashboard;
