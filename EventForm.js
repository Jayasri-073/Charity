import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventForm.css';

function EventForm() {
  const [formData, setFormData] = useState({
    title: '',
    charity: '',   
    date: '',
    location: '',
    description: '',
    imageUrl: '',
  });

  const [charities, setCharities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/charity')
      .then(res => setCharities(res.data))
      .catch(err => console.error('Error fetching charities:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/events', formData);
      alert('✅ Event added successfully!');
      setFormData({
        title: '',
        charity: '',
        date: '',
        location: '',
        description: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error('❌ Error adding event:', error.response?.data || error.message);
      alert('Failed to add event.');
    }
  };

  return (
    <div className="event-form-container">
      <h2>Add Charity Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <select
          name="charity"
          value={formData.charity}
          onChange={handleChange}
          required
        >
          <option value="">Select Charity</option>
          {charities.map((charity) => (
            <option key={charity._id} value={charity._id}>
              {charity.name}
            </option>
          ))}
        </select>
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
}

export default EventForm;
