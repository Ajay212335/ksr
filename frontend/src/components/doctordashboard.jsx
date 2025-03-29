import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './doctordashboard.css'; // Import your CSS file for styling
// Import Link from react-router-dom
const DoctorDashboard = () => {
  const { uniqueId } = useParams();
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  const fetchPatientInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/dashboard/update/${uniqueId}`);
      setPatients(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching patient data:", error);
      setError("Failed to load patient data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchPatientInfo();
  }, [uniqueId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (patients.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="header">
        <div className="logo">HealthPortal</div>
        <nav className="menu">
            <Link to={`/uploadedmed/${uniqueId}`} className="menu-btn">Add/Update Profile</Link>
        </nav>
      </header>

      <h3>Patient Details</h3>
      
      <table>
        <thead>
          <tr>
            <th>Unique ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Blood Group</th>
            <th>Disease</th>
            <th>Medication</th>
            <th>Allergy</th>
            <th>Phone</th>
            <th>Aadhaar Number</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.unique_id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.height}</td>
              <td>{patient.weight}</td>
              <td>{patient.bloodGroup}</td>
              <td>{patient.disease}</td>
              <td>{patient.medication}</td>
              <td>{patient.allergy}</td>
              <td>{patient.phone}</td>
              <td>{patient.aadhaarNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorDashboard;
