import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap"; 
import { FaYoutube, FaCalendarAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/impEventsNew.css";

function ImportantEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [initialEvents, setInitialEvents] = useState([]);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate();
    const month = dateTime.toLocaleString("default", { month: "long" });
    return { day, month };
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/events"
      );
      setEvents(response.data);
      setInitialEvents(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("An error occurred while fetching events.");
      setIsLoading(false);
    }
  };

  const handleDateClick = async (date) => {
    setSelectedDate(date);
    const formattedDate = formatDateTime(date);
    const filteredEvents = events.filter((event) => {
      const eventDate = formatDateTime(event.event_date);
      return (
        eventDate.day === formattedDate.day &&
        eventDate.month === formattedDate.month
      );
    });
    setInitialEvents(filteredEvents);
  };

  const tileClassName = ({ date }) => {
    const formattedDate = formatDateTime(date);
    const hasEvents = events.some((event) => {
      const eventDate = formatDateTime(event.event_date);
      return (
        eventDate.day === formattedDate.day &&
        eventDate.month === formattedDate.month
      );
    });
    return hasEvents ? "highlight" : null;
  };

  const handleReturnAllEvents = () => {
    setInitialEvents(events);
  };

  return (
    <div>
      <div className="mb-6">
        <Navbar />
      </div>
      <Container>
        <div className="event-mainImg">
          <div className="event-MainImg-overlay">
            <div className="bb">
              <h1 dir="rtl" className="mainImg-title">
                اهم الاحداث التي تقام بجامعه حلون لحظه بلحظه
              </h1>
            </div>
          </div>
        </div>
        <Row>
          {/* Calendar */}
          <Col className="col-md-4 col-xm-2">
            <Calendar
              onChange={handleDateClick}
              value={selectedDate}
              tileClassName={tileClassName}
              className="calendar2"
            />
            <Button onClick={handleReturnAllEvents} className="all-events-btn btn btn-danger m-4">
             كل الاحداث
            </Button>
          </Col>
          {/* Event cards */}
          <Col dir="rtl" className="mr-4 col-md-8 col-xm-10">
            {initialEvents.length > 0 ? (
              initialEvents.map((eventItem) => (
                <Card
                  dir="rtl"
                  key={eventItem.id}
                  className="mb-5"
                  style={{ maxWidth: "700px" }}
                >
                  <div className="row g-0">
                    <div className="col-md-4 col-sm-4 col-xs-12 mt-3">
                      <Card.Img
                        src={eventItem.event_image_path}
                        className="img-fluid rounded-start"
                        alt="Event"
                        style={{ height: "200px" }}
                      />
                    </div>
                    <div className="col-md-8 col-sm-8 col-xs-12">
                      <Card.Body>
                        <Card.Title>{eventItem.event_address}</Card.Title>
                        <Card.Text className="mb-3">
                          {eventItem.event_description}
                        </Card.Text>
                        <Card.Text
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div className="left">
                            <FaCalendarAlt
                              style={{ fontSize: "22px", marginRight: "5px" }}
                            />
                            <span className="day2">
                              {formatDateTime(eventItem.event_date).day}
                            </span>
                            <span className="event-card-month1">
                              {formatDateTime(eventItem.event_date).month}
                            </span>
                          </div>
                          <div className="right">
                            <IoLocation
                              style={{ fontSize: "22px", marginRight: "50px" }}
                            />
                            <span>{eventItem.event_place}</span>
                          </div>
                        </Card.Text>
                        <small className="text-muted">
                          <Link
                            to={eventItem.event_link_path}
                            style={{ color: "red", textDecoration: "none" }}
                          >
                            <FaYoutube className="mr-1"  style={{fontSize: "22px"}}/>
                            مشاهدة الحدث
                          </Link>
                        </small>
                      </Card.Body>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-8">
                <h1>There are no events on this day.</h1>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default ImportantEvents;
