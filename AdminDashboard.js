import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [patients, setPatients] = useState([]);
  const [donations, setDonations] = useState([]);
  const [patientAmount, setPatientAmount] = useState('');

  useEffect(() => {
    fetchPatients();
    fetchDonations();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3001/patient');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://localhost:3001/donation');
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const handleUpdatePatient = async (id) => {
    try {
      const updatedAmount = Number(patientAmount);
      const response = await axios.put(`http://localhost:3001/patient/${id}`, { amount: updatedAmount });
      alert('Patient amount updated successfully');
      fetchPatients(); // Refresh the patient list
    } catch (error) {
      console.error('Error updating patient:', error);
      alert('Error updating patient');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <h2>Patients</h2>
      <table className="patients-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Update Amount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.name}</td>
              <td>₹{patient.amount}</td>
              <td>
                <input
                  type="number"
                  placeholder="New amount"
                  value={patientAmount}
                  onChange={(e) => setPatientAmount(e.target.value)}
                />
                <button onClick={() => handleUpdatePatient(patient._id)}>Update</button>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Donations</h2>
      <table className="donations-table">
        <thead>
          <tr>
            <th>Donor Name</th>
            <th>Amount</th>
            <th>Patient</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation._id}>
              <td>{donation.donorName}</td>
              <td>₹{donation.amount}</td>
              <td>{donation.patientId.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
