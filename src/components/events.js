import React, { useState, useEffect } from "react";
import axios from "axios";
import EventItem from "./eventItem";
import EditEvent from "./editEvent";
import "../styles/Events.css";
import arrow_left from "../assets/icons/arrow_circle_left.svg";
import arrow_right from "../assets/icons/arrow_circle_right.svg";
import SideBar from "./SideBar";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [eventIdToEdit, setEventIdToEdit] = useState(null);
  const [editedEvent, setEditedEvent] = useState(null);

  const eventsPerPage = 9;

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (isEditing && eventIdToEdit) {
      const eventToEdit = events.find((event) => event.event_id === eventIdToEdit);
      setEditedEvent(eventToEdit);
    }
  }, [isEditing, eventIdToEdit, events]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:9091/university/events");
      setEvents(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("An error occurred while fetching events.");
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:9091/university/events/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("An error occurred while deleting the event.");
    }
  };

  const handleEditEvent = (eventId) => {
    setIsEditing(true);
    setEventIdToEdit(eventId);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEventIdToEdit(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(events.length / eventsPerPage);
    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(
        <button
          key={i}
          className={`page-btn ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return paginationButtons;
  };

  // Logic to get current events to display
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSave = async () => {
    try {
      const updatedEvent = {
        event_id: editedEvent.event_id,
        category_id: editedEvent.category_id,
        event_place: editedEvent.event_place,
        event_time: editedEvent.event_time,
        event_date: editedEvent.event_date,
        event_link_path: editedEvent.event_link_path,
        event_address: editedEvent.event_address,
      };

      await axios.put(`http://localhost:9091/university/events/${editedEvent.event_id}`, updatedEvent);
      fetchEvents();
      handleCancelEdit();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  if (!isLoading && !error) {
    return (
      <div className="events-page" >
        <SideBar />
          <h2>جميع الاحداث</h2>
          {isLoading && <p className="loading-text">جاري تحميل الاحداث...</p>}
          {error && <p>{error}</p>}
          <div className="total-events">
            عدد الاحداث : <span>{events.length}</span>
          </div>
        <div className="events-container">

          <table id="events-table" className="events-table" >
            <tbody>
              {currentEvents.map((event) => (
                <EventItem key={event.event_id} event={event} onDelete={handleDeleteEvent} onEdit={handleEditEvent} />
              ))}
            </tbody>
          </table>

          {events.length > eventsPerPage && (
            <div className="pagination">
              <button className="page-btn" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                <img src={arrow_left} alt="Left Arrow" className="arrow-icon" />
              </button>
              {renderPaginationButtons()}
              <button
                className="page-btn"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(events.length / eventsPerPage)}
              >
                <img src={arrow_right} alt="Right Arrow" className="arrow-icon" />
              </button>
            </div>
          )}
        </div>

        {isEditing && eventIdToEdit && editedEvent && (
          <EditEvent event={editedEvent} onSave={handleSave} onCancel={handleCancelEdit} />
        )}
      </div>
    );
  }
}
