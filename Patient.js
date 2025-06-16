import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Patient.css';

function PatientForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    amount: '',
    phone: '',
    disease: '',
    imageUrl: '',
    description: '',
    charityId: ''  
  });

  const [charities, setCharities] = useState([]);

  useEffect(() => {
    fetchCharities();
  }, []);

  const fetchCharities = async () => {
    try {
      const response = await axios.get('http://localhost:3001/charity');
      setCharities(response.data);
    } catch (error) {
      console.error('Error fetching charities:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/patient', formData);
      alert('Patient added successfully');
      setFormData({
        name: '',
        age: '',
        address: '',
        amount: '',
        phone: '',
        disease: '',
        imageUrl: '',
        description: '',
        charityId: ''
      });
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Error adding patient');
    }
  };

  return (
    <div className="patient-container">
      <h2 className="form-title">Add Patient</h2>
      <form onSubmit={handleSubmit} className="add-patient-form">
        <label><b>Name of the Patient:</b></label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label><b>Age:</b></label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />

        <label><b>Address:</b></label>
        <input name="address" value={formData.address} onChange={handleChange} required />

        <label><b>Amount:</b></label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />

        <label><b>Phone No:</b></label>
        <input name="phone" value={formData.phone} onChange={handleChange} required />

        <label><b>Disease:</b></label>
        <input name="disease" value={formData.disease} onChange={handleChange} required />

        <label><b>Image URL:</b></label>
        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />

        <label><b>Description:</b></label>
        <input name="description" value={formData.description} onChange={handleChange} />

        <label><b>Select Charity:</b></label>
        <select name="charityId" value={formData.charityId} onChange={handleChange} required>
          <option value="">-- Select Charity --</option>
          {charities.map((charity) => (
            <option key={charity._id} value={charity._id}>
              {charity.name}
            </option>
          ))}
        </select>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default PatientForm;
