import React, { useState, useEffect } from "react";
import axios from "axios";
import EventItem from "./eventItem";
import EditEvent from "./editEvent";
import "../styles/Events.css";
import usePagination from '../hooks/usePagination';
import arrow_left from '../assets/icons/arrow_circle_left.svg';
import arrow_right from '../assets/icons/arrow_circle_right.svg';
import SideBar from "./SideBar";


function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [eventIdToEdit, setEventIdToEdit] = useState(null);
  const [editedEvent, setEditedEvent] = useState(null);
  const [totalEvents, setTotalEvents] = useState(0);

  const eventsPerPage = 9;

    // Pagination hook
    const {
      currentPage,
      totalPages,
      goToPage,
      goToFirstPage,
      goToLastPage,
    } = usePagination(totalEvents, eventsPerPage);
  
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage - 1;

    const renderEvents = () => {
      return events.slice(startIndex, endIndex + 1).map((event) => (
        <EventItem key={event.event_id} event={event} onDelete={handleDeleteEvent} onEdit={handleEditEvent} />
      ));
    };

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
      const response = await axios.get("http://localhost:9090/university/events");
      setTotalEvents(response.data.length); 
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
      await axios.delete(`http://localhost:9090/university/events/${eventId}`);
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

  const handleSave = async () => {
    try {
      const updatedEvent = {
        event_id: editedEvent.event_id,
        category_id: editedEvent.category_id,
        event_place: editedEvent.event_place,
        event_date: editedEvent.event_date,
        event_link_path: editedEvent.event_link_path,
        event_address: editedEvent.event_address,
        event_description: editedEvent.event_description,
        event_image_path: editedEvent.event_image_path,
      };

      await axios.put(`http://localhost:9090/university/events/${editedEvent.event_id}`, updatedEvent);
      fetchEvents();
      handleCancelEdit();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className={`events-page ${isEditing && eventIdToEdit && editedEvent ? 'blur-background' : ''}`}>
    <SideBar />
      {isEditing && eventIdToEdit && editedEvent ? (
      <EditEvent event={editedEvent} onSave={handleSave} onCancel={handleCancelEdit} />
      ):(
        <>
      
      <h2>جميع الاحداث</h2>
      {isLoading && <p className="loading-text">جاري تحميل الاحداث...</p>}
      {error && <p>{error}</p>}      

      <div className="total-events">
        عدد الاحداث : <span>{events.length}</span>
      </div>
      <div className="events-container">
        <table id="events-table" className="events-table">
          <tbody>
            {renderEvents()}
          </tbody>
        </table>

        {totalEvents > eventsPerPage && (
              <div className="pagination">
                  <img src={arrow_left} onClick={goToFirstPage} alt="Left Arrow" className="arrow-icon" />
                  <div className="page-numbers">
                      {Array.from({ length: totalPages }, (_, index) => (
                          <span
                              key={index + 1}
                              className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                              onClick={() => goToPage(index + 1)}
                              disabled={currentPage === index + 1}

                          >
                              {index + 1}
                          </span>
                      ))}
                     </div>
              <img src={arrow_right} onClick={goToLastPage} alt="Right Arrow" className="arrow-icon" />
                            </div>

                                     )}
      </div>
      </>
      )}
    </div>
  );
}

export default Events;
