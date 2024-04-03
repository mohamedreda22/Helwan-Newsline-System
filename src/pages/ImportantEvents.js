import React, { useState, useEffect } from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import "../styles/ImportantEvents.css";
import { Link } from "react-router-dom";
import axios from "axios";

function ImportantEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:9090/university/events");
      setEvents(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("An error occurred while fetching events.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Navbar />
      </div>
      <div className="container">
        <div className="row">
          {events.map((event) => (
            <div className="blog-card alt col-10" key={event.id}>
              <div className="meta">
                <div
                  className="photo"
                  style={{
                    backgroundImage: `url(${event.event_image_path})`,
                  }}
                ></div>
                <ul dir="rtl" className="details">
                  <li className="author">{event.event_place}</li>
                  <li className="date">{event.event_date}</li>
                  <li className="tags">
                    <ul>
                      <li>
                        <Link to="#">Learn</Link>
                      </li>
                      <li>
                        <Link to="#">Code</Link>
                      </li>
                      <li>
                        <Link to="#">JavaScript</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="impEvents-description">
                <h1>{event.event_address}</h1>
                <h2>{event.event_description}</h2>
                <p>{event.event_link_path}</p>
                <p className="read-more">
                  <Link to="#">Read More</Link>
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      <Footer />
    </div>
  );
}

export default ImportantEvents;
