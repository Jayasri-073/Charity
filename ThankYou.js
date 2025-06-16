// ThankYou.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ThankYou.css';

function ThankYou() {
  return (
    <div className="thankyou-container">
      <h1>🙏 Thank you for your Donation!</h1>
      <p>Your help brings a smile to someone in need. ❤️</p>
      <Link to="/home">
        <button className="home-button">Back to Home</button>
      </Link>
    </div>
  );
}

export default ThankYou;
