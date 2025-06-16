import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Donation.css';

function Donate() {
  const [donorName, setDonorName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [charityId, setCharityId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [charities, setCharities] = useState([]);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCharities();
    fetchPatients();
  }, []);

  const fetchCharities = async () => {
    try {
      const res = await axios.get('http://localhost:3001/charity');
      setCharities(res.data);
    } catch (err) {
      console.error('Failed to load charities', err);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await axios.get('http://localhost:3001/patient');
      setPatients(res.data);
    } catch (err) {
      console.error('Failed to load patients', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/donation', {
        donorName,
        email,
        amount,
        charityId,
        patientId,
      });

      alert('Donation successful! 🎉');
      navigate('/thankyou'); 
    } catch (err) {
      console.error('Donation failed:', err);
      alert('Donation failed. Please try again.');
    }
  };

  return (
    <div className="donate-container">
      <h1>Make a Donation</h1>
      <form onSubmit={handleSubmit} className="donate-form">
        <input
          type="text"
          placeholder="Donor Name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Donor Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select value={charityId} onChange={(e) => setCharityId(e.target.value)} required>
          <option value="">Select Charity</option>
          {charities.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <button type="submit">Donate Now</button>
      </form>
    </div>
  );
}

export default Donate;
