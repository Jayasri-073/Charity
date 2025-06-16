// DonatePage.js
import React from 'react';
import { useParams } from 'react-router-dom';

function DonatePage() {
  const { id } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Donate to Patient</h2>
      <p>You are donating to patient ID: <strong>{id}</strong></p>

      
      <form style={{ marginTop: '20px', maxWidth: '400px' }}>
        <input type="number" placeholder="Amount (₹)" style={{ padding: '10px', width: '100%', marginBottom: '10px' }} required />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none' }}>
          Donate Now
        </button>
      </form>
    </div>
  );
}

export default DonatePage;
