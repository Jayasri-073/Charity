import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './Auth.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      window.location.href = '/home';
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed. Please try again.';
      alert(message);
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1518609878373-06d740f60d8b)`,
      }}
    >
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Login</button>

        
        <p className="auth-switch">
          Don't have an account? <Link to="/">Sign up here</Link>
        </p>
      </form>
    </div>
  );
}
