import React, { useContext } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import loading icon
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Information from '../components/Information';
import Support from '../components/Support';
import PatientInfo from '../components/PatientInfo';
import TableComponent from '../components/TableComponent';
import MockData from '../assets/patient.json';
import MockTdata from '../assets/total.json';
import MockMHdata from '../assets/recentMH.json';

const PatientProfile = () => {
    // const { tickets, loading, error } = useContext(TicketContext);
    const patients = MockData;
    const Tpatients = MockTdata;
    const loading = false;
    const error = null;
    const jsonData = MockMHdata;
    jsonData.forEach(record => {
        const formattedDate = new Date(record.Date).toLocaleString();
        console.log(`${record.Patient_Name}: ${formattedDate} - ${record.Status}`);
    });

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <NavBar />
            <section className="w-[90%] mx-auto flex flex-col lg:flex-row p-4 gap-4 flex-grow">
                <div className="w-full lg:w-1/4 space-y-4">
                    <Information Tpatients={jsonData} title="Recent Medical History" />
                    <Support />
                </div>
                <div className="w-full lg:w-3/4 space-y-4">
                    <PatientInfo />
                    {loading ? (
                        <div className="flex items-center text-blue-600 text-lg justify-center">
                            <AiOutlineLoading3Quarters className="animate-spin mr-2 text-3xl" />
                            Loading tickets...
                        </div>
                    ) : (
                        <TableComponent patients={patients} title="Assigned Patients" />
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default PatientProfile