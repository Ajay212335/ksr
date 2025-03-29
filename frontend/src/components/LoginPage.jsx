import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Assuming you have a CSS file for styling

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phone || !uniqueId) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/login', {
        phone,
        unique_id: uniqueId, // Ensure the field names are correct
      });

      if (response.data.message === 'Login successful!') {
        setErrorMessage('');
        // Clear form fields after successful login
        setPhone('');
        setUniqueId('');
        
        // Redirect to the patient's dashboard page with uniqueId
        if (uniqueId) {
          navigate(`/doctor-dashboard/${uniqueId}`);
        } else {
          setErrorMessage('Invalid unique ID.');
        }
      } else {
        setErrorMessage('Invalid phone number or unique ID.');
      }
    } catch (error) {
      setErrorMessage('Error during login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Patient Login</h2>
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

export default LoginPage;
