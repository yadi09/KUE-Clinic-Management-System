import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { PatientProvider } from './context/PatientContext';
import { DoctorProvider } from './context/DoctorContext'; // Importing DoctorProvider
import { DiagnosticsProvider } from './context/DiagnosticsContext'; // Importing DiagnosticsProvider
import { MedicalHistoryProvider } from './context/MedicalHistoryContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DoctorProvider>
          <PatientProvider>
            <MedicalHistoryProvider>
              <DiagnosticsProvider>
                {/* Wrapping the entire application with AuthProvider */}
                <AppRoutes />
              </DiagnosticsProvider>
            </MedicalHistoryProvider>
          </PatientProvider>
        </DoctorProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
