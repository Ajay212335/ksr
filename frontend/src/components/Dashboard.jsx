import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory

const Dashboard = () => {
  const [phone, setPhone] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();  // Initialize navigate for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phone || !uniqueId) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/patient/login', {
        phone,
        unique_id: uniqueId,
      });

      if (response.data.message === 'Login successful!') {
        setErrorMessage('');
        // Use navigate to redirect to the PatientDashboard with unique_id as a route parameter
        navigate(`patient/update/${uniqueId}`);
      } else {
        setErrorMessage('Invalid phone number or unique ID.');
      }
    } catch (error) {
      setErrorMessage('Error during login. Please try again.');
    }
  };

  return (
    <div>
      <h2>Patient Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Unique ID:</label>
          <input
            type="text"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Dashboard;
