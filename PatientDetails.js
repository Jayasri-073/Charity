import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PatientDetails() {
  const [patient, setPatient] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/patient/${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient details", error);
      }
    };
    fetchPatientDetails();
  }, [id]);

  return (
    patient ? (
      <div>
        <h2>{patient.name}</h2>
        <p>Age: {patient.age}</p>
        <p>Disease: {patient.disease}</p>
        <p>Amount Needed: ₹{patient.amount}</p>
        <p>Remaining Amount: ₹{patient.remainingAmount}</p>
        {/* Donation Form goes here */}
      </div>
    ) : (
      <p>Loading...</p>
    )
  );
}

export default PatientDetails;
