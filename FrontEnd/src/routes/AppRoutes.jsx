import React from 'react';
import HomePage from '../pages/HomePage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AllPatient from '../pages/AllPatient';
import NewPatient from '../pages/NewPatient';
import PatientManage from '../pages/PatientManage';
import AssignedPatient from '../pages/AssignedPatient';
import PatientProfile from '../pages/PatientProfile';
import PatientMH from '../pages/PatientMH';
import New_MedicalHistory from '../pages/New_MedicalHistory';
import New_Referral from '../pages/New_Referral';
import NewPrescription from '../pages/NewPrescription';
import Dashboard from '../components/AdminDashboard';
import AdminPage from '../pages/AdminPage';
import ErrorPageContainer from '../pages/ErrorPage';
import Unauthorized from '../pages/UnauthorizedPage';

import PrescriptionFormat from '../components/PrescriptionPrintFormat';

import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/patients" element={<AllPatient />} />
            <Route path="/patients/new" element={<NewPatient />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute allowedRoles={["receptionist", "admin"]} />}>
                <Route path="/patients/:id/manage" element={<PatientManage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["admin", "doctor"]} />}>
                <Route path="/patients/:id" element={<PatientProfile />} />
                <Route path='/patients/:id/medical-history' element={<PatientMH />} />
                <Route path='/patients/:id/medical-history/new' element={<New_MedicalHistory />} />
                <Route path="/patients/:id/medical-history/:mhId" element={<New_MedicalHistory />} />
                <Route path="/patients/:id/medical-history/:mhId/referrals/new" element={<New_Referral />} />
                <Route path="/patients/:id/medical-history/:mhId/prescriptions/new" element={<NewPrescription />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
                <Route path="/doctor/patients" element={<AssignedPatient />} />
            </Route>


            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<AdminPage />}>
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>
            </Route>

            {/* <Route path='/prescriptionFormat' element={<PrescriptionFormat />} /> */}

            {/* Redirect to login if not authenticated */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Redirect unknown routes to login */}
            <Route path="*" element={<ErrorPageContainer />} />


        </Routes >
    );
}

export default AppRoutes;