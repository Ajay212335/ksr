import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PatientDashboard = () => {
  const { uniqueId } = useParams(); // Get the uniqueId from the URL
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    // Fetch patient data using the uniqueId from the URL
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/patient/${uniqueId}`);
        setPatientData(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [uniqueId]); // The effect will rerun if uniqueId changes

  if (!patientData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="header">
        <div className="logo">HealthPortal</div>
        <nav className="menu">
          <Link to={`/patient-dashboard/${uniqueId}`} className="menu-btn">Profile</Link>
          <Link to="/doctor" className="menu-btn">Chat Bot</Link>
        </nav>
      </header>
      <h3>Welcome, {patientData.name}!</h3>
      <p><strong>Unique ID:</strong> {patientData.unique_id}</p>
      <p><strong>MongoDB ID:</strong> {patientData._id}</p>
      <p><strong>Name:</strong> {patientData.name}</p>
      <p><strong>Age:</strong> {patientData.age}</p>
      <p><strong>Height:</strong> {patientData.height} cm</p>
      <p><strong>Weight:</strong> {patientData.weight} kg</p>
      <p><strong>Blood Group:</strong> {patientData.bloodGroup}</p>
      <p><strong>Date of Birth:</strong> {patientData.dob}</p>
      <p><strong>Address:</strong> {patientData.address}</p>
      <p><strong>Phone:</strong> {patientData.phone}</p>
      <p><strong>Disease:</strong> {patientData.disease}</p>
      <p><strong>Medication:</strong> {patientData.medication}</p>
      <p><strong>Allergy:</strong> {patientData.allergy}</p>
      <p><strong>Aadhaar Number:</strong> {patientData.aadhaarNumber}</p>
    </div>
  );
};

export default PatientDashboard;
