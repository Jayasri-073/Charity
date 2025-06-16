import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './Auth.css';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/auth/signup', formData);
      alert('Signup successful! Please login.');
      window.location.href = '/login';
    } catch (error) {
      alert(error.response.data.error || 'Signup failed');
    }
  };

  return (
    <div
      className="auth-container"
      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1521791136064-7986c2920216)` }}
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          required
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={e => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Register</button>
        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">Login</Link>
        </p>
      </form>
    </div>
  );
}
