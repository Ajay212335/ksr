import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './doctorRegsitration.css';

const EmployeeRegistration = () => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const response = await axios.get(`https://2factor.in/API/V1/8aa7da3b-c5ff-11ef-8b17-0200cd936042/SMS/${phone}/AUTOGEN`);
      if (response.data.Status === 'Success') {
        setSessionId(response.data.Details);
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error sending OTP. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !dob || !phone || !otp) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const verificationResponse = await axios.get(`https://2factor.in/API/V1/8aa7da3b-c5ff-11ef-8b17-0200cd936042/SMS/VERIFY/${sessionId}/${otp}`);
      if (verificationResponse.data.Status === 'Success') {
        const registerResponse = await axios.post('http://localhost:5001/register', {
          full_name: fullName,
          dob,
          phone,
        });

        if (registerResponse.data.message === "Registration successful!") {
          alert('Registration successful!');
          setFullName('');
          setDob('');
          setPhone('');
          setOtp('');
          setSessionId('');
          navigate('/update');
        } else {
          setErrorMessage('Error registering user. Please try again later.');
        }
      } else {
        setErrorMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error verifying OTP. Please try again.');
    }
  };

  return (
    <div className="registration-container">
      <h2 className="title">Doctor Registration</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
          <button type="button" className="otp-btn" onClick={sendOtp}>
            Send OTP
          </button>
        </div>
        <div className="form-group">
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Register
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default EmployeeRegistration;