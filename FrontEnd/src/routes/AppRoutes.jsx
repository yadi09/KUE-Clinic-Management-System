import React from 'react';
import HomePage from '../pages/HomePage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AllPatient from '../pages/AllPatient';
import NewPatient from '../pages/NewPatient';
import PatientManage from '../pages/PatientManage';
import AssignedPatient from '../pages/AssignedPatient';
import PatientProfile from '../pages/PatientProfile';
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

            {/* Redirect unknown routes to login */}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default AppRoutes;