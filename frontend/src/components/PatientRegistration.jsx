import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import './patientRegister.css';

const PatientRegistration = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [disease, setDisease] = useState('');
  const [medication, setMedication] = useState('');
  const [allergy, setAllergy] = useState('');
  const [otp, setOtp] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [qrCode, setQrCode] = useState('');
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

    if (!name || !age || !height || !weight || !bloodGroup || !dob || !address || !phone || !disease || !medication || !allergy || !otp || !aadhaarNumber) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const verificationResponse = await axios.get(`https://2factor.in/API/V1/8aa7da3b-c5ff-11ef-8b17-0200cd936042/SMS/VERIFY/${sessionId}/${otp}`);
      if (verificationResponse.data.Status === 'Success') {
        const registerResponse = await axios.post('http://localhost:5001/patient', {
          name,
          age,
          height,
          weight,
          bloodGroup,
          dob,
          address,
          phone,
          disease,
          medication,
          allergy,
          aadhaarNumber,
        });

        if (registerResponse.data.message === "Registration successful!") {
          alert('Registration successful!');
          const generatedUniqueId = registerResponse.data.unique_id;

          QRCode.toDataURL(generatedUniqueId, { errorCorrectionLevel: 'H' }, (err, url) => {
            if (err) {
              setErrorMessage('Error generating QR code.');
            } else {
              setQrCode(url);
              setUniqueId(generatedUniqueId);
            }
          });

          setName('');
          setAge('');
          setHeight('');
          setWeight('');
          setBloodGroup('');
          setDob('');
          setAddress('');
          setPhone('');
          setDisease('');
          setMedication('');
          setAllergy('');
          setOtp('');
          setSessionId('');
          setAadhaarNumber('');
        } else {
          setErrorMessage('Error registering patient. Please try again later.');
        }
      } else {
        setErrorMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error verifying OTP. Please try again.');
    }
  };

  const handleGoToLogin = () => {
    navigate('/patient/login');
  };

  return (
    <div className="registration-container">
      <h2 className="title">Patient Registration</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Blood Group:</label>
          <input
            type="text"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
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
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Disease:</label>
          <input
            type="text"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Medication:</label>
          <input
            type="text"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Allergy:</label>
          <input
            type="text"
            value={allergy}
            onChange={(e) => setAllergy(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Aadhaar Number:</label>
          <input
            type="text"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="button" className="otp-btn" onClick={sendOtp}>Send OTP</button>
        </div>
        <div className="form-group">
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Register</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

      {qrCode && (
        <div className="qr-section">
          <h3>Your Unique ID: {uniqueId}</h3>
          <img src={qrCode} alt="QR Code" />
          <button className="login-btn" onClick={handleGoToLogin}>Go to Login</button>
        </div>
      )}
    </div>
  );
};

export default PatientRegistration;