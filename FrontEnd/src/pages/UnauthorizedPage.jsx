import React from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Unauthorized from "../components/Unauthorized";

const UnauthorizedPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <NavBar />

            {/* Full-screen Unauthorized page in the middle */}
            <div className="flex justify-center ">
                <Unauthorized />
            </div>

            <Footer />
        </div>
    );
};

export default UnauthorizedPage;
