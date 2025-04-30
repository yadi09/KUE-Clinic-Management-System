import { Link } from "react-router-dom";
import Img from "../assets/img/Unahtorized.png"; // Import the image for unauthorized access

const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
            <img
                src={Img}
                alt="Unauthorized Access"
                className="w-80 mb-6"
            />
            <h1 className="text-5xl font-bold text-red-500">403 - Unauthorized</h1>
            <p className="text-lg text-gray-600 mt-2">
                Oops! You don’t have permission to access this page.
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
                Go to Home
            </Link>
        </div>
    );
};

export default Unauthorized;
