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
import Dashboard from '../pages/Dashboard';
import { Route, Routes, Navigate } from 'react-router-dom';

function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/patients" element={<AllPatient />} />
            <Route path="/patients/new" element={<NewPatient />} />
            <Route path="/patients/:id/manage" element={<PatientManage />} />
            <Route path="/doctor/patients" element={<AssignedPatient />} />
            <Route path="/patients/:id" element={<PatientProfile />} />
            <Route path='/patients/:id/medical-history' element={<PatientMH />} />
            <Route path='/patients/:id/medical-history/new' element={<New_MedicalHistory />} />
            <Route path="/patients/:id/referrals/new" element={<New_Referral />} />
            <Route path="/patients/:id/prescriptions/new" element={<NewPrescription />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />

            {/* Redirect unknown routes to login */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default AppRoutes;