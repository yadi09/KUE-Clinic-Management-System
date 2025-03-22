import React, { useContext } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import loading icon
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Information from '../components/Information';
import Support from '../components/Support';
import TableComponent from '../components/TableComponent';
import MockData from '../assets/patient.json';
import MockTdata from '../assets/total.json';

const AllPatient = () => {
    // const { tickets, loading, error } = useContext(TicketContext);
    const patients = MockData;
    const Tpatients = MockTdata;
    const loading = false;
    const error = null;

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <NavBar />
            <section className="w-[90%] mx-auto flex flex-col lg:flex-row p-4 gap-4 flex-grow">
                <div className="w-full lg:w-1/4 space-y-4">
                    <Information Tpatients={Tpatients} title="Totals" />
                    <Support />
                </div>
                <div className="w-full lg:w-3/4">
                    {loading ? (
                        <div className="flex items-center text-blue-600 text-lg justify-center">
                            <AiOutlineLoading3Quarters className="animate-spin mr-2 text-3xl" />
                            Loading tickets...
                        </div>
                    ) : (
                        <TableComponent patients={patients} title="All Patients" />
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default AllPatient