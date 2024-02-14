import React from 'react';
import '../styles/homePage.css'

function HomePage() {
  return (
  
    <div className="home-page">  
      <h1>Welcome to the University Newsline System</h1>
      <p className="description">
        The University Newsline System is a cutting-edge platform designed to keep the university community informed and engaged.
      </p>
      <h2>Latest News</h2>
      <div className="news-section">
        <div className="news-item">
          <h3>Exciting Events Coming Up!</h3>
          <p>Stay tuned for exciting events happening on campus next week. Check out the Events section for more details.</p>
        </div>
        <div className="news-item">
          <h3>New Features Added!</h3>
          <p>We're thrilled to announce new features added to the Newsline System, including enhanced user profiles and interactive notifications.</p>
        </div>
      </div>
      <h2>Upcoming Events</h2>
      <div className="events-section">
        <div className="event">
          <h3>Student Orientation</h3>
          <p>Date: March 1st, 2024</p>
          <p>Time: 10:00 AM - 2:00 PM</p>
          <p>Venue: Auditorium Hall</p>
        </div>
        <div className="event">
          <h3>Faculty Seminar on Artificial Intelligence</h3>
          <p>Date: March 5th, 2024</p>
          <p>Time: 2:00 PM - 4:00 PM</p>
          <p>Venue: Conference Room B</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
