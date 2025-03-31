import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";
import DiseaseTable from "../components/DiseaseTable";
import diseases from "../assets/diseases.json"; // Assuming you have a JSON file with disease data
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import mockData from "../assets/mockData"; // Assuming mock data is located here

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
    // Chart Data (Mock Data from `mockData`)
    const barChartData = {
        labels: mockData.months, // For example: ["January", "February", ...]
        datasets: [
            {
                label: "Monthly Registered Patients",
                data: mockData.monthlyRegisteredPatients, // Example data: [100, 150, 120, ...]
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const pieChartData = {
        labels: mockData.diseases, // Example data: ["Disease A", "Disease B", ...]
        datasets: [
            {
                label: "Top 10 Diseases",
                data: mockData.diseaseCounts, // Example data: [50, 80, 30, ...]
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

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
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="border-b pb-2 mb-4">
                            <h1 className="text-2xl font-bold">Dashboard</h1>
                        </div>

                        {/* Use grid system for responsiveness */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold">Total Patients</h2>
                                <p className="text-2xl">100</p>
                            </div>
                            <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold">Total Doctors</h2>
                                <p className="text-2xl">2</p>
                            </div>
                            <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold">Total Medical History</h2>
                                <p className="text-2xl">100</p>
                            </div>
                            <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold">Total Prescription</h2>
                                <p className="text-2xl">30</p>
                            </div>
                            <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold">Total Referrals</h2>
                                <p className="text-2xl">10</p>
                            </div>
                            <div className="bg-orange-500 text-white p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold">Total Appointments</h2>
                                <p className="text-2xl">70</p>
                            </div>
                        </div>

                        {/* Graphs Section */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Monthly Registered Patients (Bar Graph) */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold mb-4">Monthly Registered Patients</h2>
                                <Bar
                                    data={barChartData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            tooltip: {
                                                callbacks: {
                                                    label: function (tooltipItem) {
                                                        return `${tooltipItem.raw} patients`;
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>

                            {/* Top 10 Diseases (Pie Chart) */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold mb-4">Top 10 Diseases</h2>
                                <Pie
                                    data={pieChartData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            tooltip: {
                                                callbacks: {
                                                    label: function (tooltipItem) {
                                                        return `${tooltipItem.label}: ${tooltipItem.raw} patients`;
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        {/* Table Section */}
                        <div className="mt-6">
                            <DiseaseTable Diseases={diseases} title="Disease List with Total patient" />
                            {/* List of all disease with total patient */}
                        </div>
                    </div>




                </main>

                {/* Footer */}
                <AdminFooter />
            </div>
        </div>
    );
};

export default Dashboard;
