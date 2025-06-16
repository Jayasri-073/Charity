import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://images.pexels.com/photos/1164531/pexels-photo-1164531.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/5996702/pexels-photo-5996702.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/14052564/pexels-photo-14052564.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const slide = (direction) => {
    setCurrentIndex((prev) => (prev + direction + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      slide(1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1 className="hero-title">Together, We Can Save Lives</h1>
        <p className="hero-subtitle">
          Your donations help fund medical treatments and save lives. Join us in making a difference.
        </p>
        <Link to="/donate" className="donate-btn">Donate Now</Link>
        <Link to="/patient" className="donate-btn">Add Patient</Link>
        <Link to="/patientlist" className="donate-btn">Patients List</Link>
        <Link to="/charity" className="donate-btn">Charity</Link>       
      </header>
      <section className="impact-section">
        <h2>How Your Donation Helps</h2>
        <div className="impact-grid">
          <div className="impact-card">
            <img src="https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Medical Care" />
            <h3>Medical Treatments</h3>
            <p>Your contributions fund critical surgeries and treatments for those in need.</p>
          </div>
          <div className="impact-card">
            <img src="https://media.istockphoto.com/id/1312706504/photo/modern-hospital-building.jpg?b=1&s=612x612&w=0&k=20&c=Oo5REUlhTj1EAtli5LXq4FIrQN3KfZ2V6M3tV-uWK64=" alt="Hospitals" />
            <h3>Hospital Support</h3>
            <p>We collaborate with trusted hospitals to provide the best care for patients.</p>
          </div>
          <div className="impact-card">
            <img src="https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Success Stories" />
            <h3>Success Stories</h3>
            <p>Meet the people whose lives have changed thanks to your generosity.</p>
          </div>
        </div>
      </section>

     
      <section className="get-involved">
        <h2>Get Involved</h2>
        <h3>
  Join our mission to make a meaningful difference in the lives of those in need. Whether you choose to donate, volunteer your time, or help spread the word, your involvement plays a vital role in bringing hope and support to communities facing hardship.
</h3>
<h3>
  Together, we can build a more caring and connected world. Be the reason someone believes in the kindness of humanity.
</h3>
        <Link to="/events" className="get-involved-btn">View Charity Events</Link>
        <Link to="/eventform" className="get-involved-btn">Event Form</Link>
      </section>

      <section className="about-section">
        <h2>About Us</h2>
        <p>
          We are a non-profit organization committed to helping those in need of medical support.
          Our mission is to bridge the gap between donors and patients by offering a transparent and impactful platform.
        </p>
        <div className="slider">
          <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((img, i) => (
              <img key={i} src={img} alt={`Slide ${i}`} />
            ))}
          </div>
          <button className="prev" onClick={() => slide(-1)}>&#10094;</button>
          <button className="next" onClick={() => slide(1)}>&#10095;</button>
          <div className="dots">
            {images.map((_, i) => (
              <span key={i} onClick={() => goToSlide(i)} className={i === currentIndex ? 'active' : ''}></span>
            ))}
          </div>
        </div>
      </section>
      <div className="contactus">
        <section className="contact-section">
          <h2>Contact Us</h2>
          <p>Email: support@charityhealth.org</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: 123 Care Avenue, Chennai, India</p>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              🌐 Facebook
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              🐦 Twitter
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              💼 LinkedIn
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              📸 Instagram
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
