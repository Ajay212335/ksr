import React, { useState } from 'react';
import axios from 'axios';
import { QRCode } from 'react-qrcode-logo'; // Import the QRCode component
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UpdatePage = () => {
  const [phone, setPhone] = useState('');
  const [yearOfQuality, setYearOfQuality] = useState('');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [certificatePhoto, setCertificatePhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [aadharNumber, setAadharNumber] = useState('');
  const [message, setMessage] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');

  const navigate = useNavigate(); // Initialize navigate

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate that required fields are filled
    if (!phone || !yearOfQuality || !certificateNumber || !certificatePhoto || !profilePhoto || !aadharNumber) {
      setMessage('Please fill in all required fields!');
      return;
    }

    const formData = new FormData();
    formData.append('phone', phone);
    formData.append('year_of_quality', yearOfQuality);
    formData.append('certificate_number', certificateNumber);
    formData.append('certificate_photo', certificatePhoto);
    formData.append('profile_photo', profilePhoto);
    formData.append('aadhar_number', aadharNumber);

    try {
      const response = await axios.post(`http://localhost:5001/update/${phone}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message || 'Update successful!');
      setUniqueId(response.data.unique_id);
      setQrCodeData(response.data.qr_code); // Set the QR code data from the response

    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'An error occurred!');
      } else {
        setMessage('Network error, please try again!');
      }
    }
  };

  // Navigate to the login page
  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <h2>Update User Information</h2>
      <form onSubmit={handleFormSubmit}>
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
          <label>Year of Quality:</label>
          <input
            type="text"
            value={yearOfQuality}
            onChange={(e) => setYearOfQuality(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Certificate Number:</label>
          <input
            type="text"
            value={certificateNumber}
            onChange={(e) => setCertificateNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Certificate Photo:</label>
          <input
            type="file"
            onChange={(e) => setCertificatePhoto(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Profile Photo:</label>
          <input
            type="file"
            onChange={(e) => setProfilePhoto(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Aadhar Number:</label>
          <input
            type="text"
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>

      {message && <p>{message}</p>}

      {uniqueId && (
        <div>
          <h3>Your Unique ID: {uniqueId}</h3>
          <QRCode value={qrCodeData} />
          {/* Display the QR code */}
          
          {/* Go to Login button */}
          <button onClick={handleGoToLogin}>Go to Login</button>
        </div>
      )}
    </div>
  );
};

export default UpdatePage;
