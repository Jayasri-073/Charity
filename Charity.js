
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CharityPage.css';

function Charity() {
  const [charities, setCharities] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchCharities();
    fetchPatients();
  }, []);

  const fetchCharities = async () => {
    try {
      const response = await axios.get('http://localhost:3001/charity/');
      setCharities(response.data);
    } catch (error) {
      console.error('Error fetching charities:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:3001/patient/');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const getPatientsByCharity = (charityId) => {
    return patients.filter((p) => p.charityId === charityId || p.charityId?._id === charityId);
  };

  return (
    <div className="charity-page">
      <h2>Charity Events</h2>
      {charities.map((charity) => (
        <div key={charity._id} className="charity-card">
          <img src={charity.logo} alt={charity.name} className="charity-image" />
          <h3>{charity.name}</h3>
          <p><strong>Date:</strong> {new Date(charity.date).toLocaleDateString()}</p>
          <p><strong>Location:</strong> {charity.location}</p>
          <p><strong>Description:</strong> {charity.description}</p>

          <div className="patient-list-inside-charity">
            <h4>Patients under this Charity</h4>
            <div className="patient-grid">
              {getPatientsByCharity(charity._id).length > 0 ? (
                getPatientsByCharity(charity._id).map((patient) => (
                  <div key={patient._id} className="patient-card">
                    <img src={patient.imageUrl} alt={patient.name} className="patient-image" />
                    <h5>{patient.name}</h5>
                    <p>Age: {patient.age}</p>
                    <p>Disease: {patient.disease}</p>
                    <p>Phone: {patient.phone}</p>
                    <p><strong>Charity:</strong> {charity.name}</p>
                    <p><strong>Amount Needed:</strong> ₹{patient.amount}</p>
                    <p>Address: {patient.address}</p>
                  </div>
                ))
              ) : (
                <p>No patients registered under this charity yet.</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Charity;
