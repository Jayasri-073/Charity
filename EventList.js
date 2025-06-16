import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventList.css';

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className="event-list-container">
      <h2>Charity Events</h2>
      <div className="event-grid">
        {events.map((event) => (
          <div className="event-card" key={event._id}>
            <img src={event.imageUrl} alt={event.title} className="event-image" />
            <h3>{event.title}</h3>
            <p><strong>Charity:</strong> {event.charity?.name || 'Unknown'}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
