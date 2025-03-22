import React, { useContext } from "react";
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import NewPatientForm from '../components/NewPatientForm';
import Footer from '../components/Footer';
import Information from '../components/Information';
import Support from '../components/Support';
import MockData from '../assets/patient.json'
import MockTdata from '../assets/total.json'
// import { TicketContext } from '../context/TicketContext';
// import { AuthContext } from "../context/AuthContext";


const Ticket = () => {
    const patients = MockData;
    const Tpatients = MockTdata;
    // const { tickets } = useContext(TicketContext);
    // const { currentUser } = useContext(AuthContext);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <NavBar />
            <section className="w-[90%] mx-auto flex flex-col lg:flex-row p-4 gap-4 flex-grow">
                {/* Left Side: Recent Tickets and Support */}
                <div className="w-full lg:w-1/4 space-y-4">
                    <Information Tpatients={Tpatients} title="Totals" />
                    <Support />
                </div>

                {/* Right Side: Open Ticket Form */}
                <div className="w-full lg:w-3/4">
                    <NewPatientForm />
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Ticket;