import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';  // Use useNavigate instead of useHistory

const PatientLogin = () => {
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
        navigate(`/patient-dashboard/${uniqueId}`);
      } else {
        setErrorMessage('Invalid phone number or unique ID.');
      }
    } catch (error) {
      setErrorMessage('Error during login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Patient-Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="form-group">
          <label>Unique ID:</label>
          <input
            type="text"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            placeholder="Enter your unique ID"
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default PatientLogin;
