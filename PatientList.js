import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PatientList.css';
import { Link } from 'react-router-dom';

function PatientListPage() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3001/patient');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  // Group patients by charity name
  const groupedByCharity = patients.reduce((acc, patient) => {
    const charity = patient.charityId?.name || 'Unknown Charity';
    if (!acc[charity]) acc[charity] = [];
    acc[charity].push(patient);
    return acc;
  }, {});

  return (
    <div className="patient-list-container">
      <h2>All Patients Grouped by Charity</h2>
      {Object.entries(groupedByCharity).map(([charityName, patients]) => (
        <div key={charityName}>
          <h3>{charityName}</h3>
          <div className="patient-list-grid">
            {patients.map((p) => (
              <div key={p._id} className="patient-card">
                <Link to={`/donate/${p._id}`}>
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="patient-image clickable-image"
                  />
                </Link>
                <h4>Patient Name: {p.name}</h4>
                <p><b>Charity:</b> {p.charityId?.name || 'Unknown Charity'}</p>
                <p>Age: {p.age ?? 'N/A'}</p>
                <p>Disease: {p.disease || 'N/A'}</p>
                <p>Phone: {p.phone || 'N/A'}</p>
                <p>Amount Needed: ₹{p.amount ?? 'N/A'}</p>
                <p>Address: {p.address || 'N/A'}</p>
                <Link to={`/donate/${p._id}`}>
                  <button className="donate-button">Donate</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PatientListPage;
