import React from 'react';

export default function Pay() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Proceed to Payment</h2>
      <p>Your donation was recorded. Please complete your payment below.</p>

      
      <button
        onClick={() => alert("Payment processed (mock)")}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Pay Now
      </button>
    </div>
  );
}