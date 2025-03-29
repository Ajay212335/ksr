import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeRegistration from './components/doctorRegistration';
import UpdatePage from './components/UpdatePage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import PatientRegistration from './components/PatientRegistration';
import PatientLogin from './components/PatientLogin';
import PatientDashboard from './components/PatientDashboard';
import Labtest from './components/Labtest';
import HealthRecord from './components/HealthRecord';
import Doctor from './components/Doctor';
import DoctorDashboard from './components/doctordashboard';
import UploadMed from './components/UploadedMed';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/register" element={<EmployeeRegistration />} />
        <Route path='/patient' element={<PatientRegistration />} />
        <Route path="/update" element={<UpdatePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/patient/login' element={<PatientLogin />} />
        <Route path="/patient-dashboard/:uniqueId" element={<PatientDashboard />} />
        <Route path='/labtest' element={<Labtest />} />
        <Route path='/health' element={<HealthRecord />} />
        <Route path='/doctor' element={<Doctor />} />
        <Route path="/doctor-dashboard/:uniqueId" element={<DoctorDashboard /> } />
        <Route path="/uploadedmed/:uniqueId" element={<UploadMed />} />
      </Routes>
    </Router>
  );
};

export default App;

