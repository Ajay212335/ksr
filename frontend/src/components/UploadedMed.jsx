import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './pokj.css';  // For extracting URL params

const UploadedMed = () => {
  const { uniqueId } = useParams();  // Extract uniqueId from URL
  const [disease, setDisease] = useState('');
  const [allergy, setAllergy] = useState('');
  const [medication, setMedication] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5001/dashboard/add-info/${uniqueId}`, {
        disease,
        allergy,
        medication
      });

      console.log('Patient information added:', response.data);
    } catch (error) {
      console.error('Error adding new information:', error);
    }
  };

  return (
    <div className='container'>
      <h3>Add New Information for Patient {uniqueId}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Disease: </label>
          <input 
            type="text" 
            value={disease} 
            onChange={(e) => setDisease(e.target.value)} 
          />
        </div>
        <div>
          <label>Allergy: </label>
          <input 
            type="text" 
            value={allergy} 
            onChange={(e) => setAllergy(e.target.value)} 
          />
        </div>
        <div>
          <label>Medication: </label>
          <input 
            type="text" 
            value={medication} 
            onChange={(e) => setMedication(e.target.value)} 
          />
        </div>
        <button type="submit">Add Information</button>
      </form>
    </div>
  );
};

export default UploadedMed;
