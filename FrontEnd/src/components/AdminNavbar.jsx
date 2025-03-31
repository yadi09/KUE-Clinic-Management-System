import { FiMenu, FiUser } from "react-icons/fi";

const Navbar = ({ toggleSidebar }) => {
    return (
        <div className="bg-gray-100 flex justify-between items-center p-4 shadow-md">
            {/* on right side Profile */}
            <div className="flex items-center space-x-2 cursor-pointer ml-auto">
                <FiUser className="text-2xl" />
                <span className="font-semibold hidden md:block">Admin</span>
            </div>
        </div>
    );
};

export default Navbar;
