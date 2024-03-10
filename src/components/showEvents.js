/* import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Events.css'; 
import arrow_left from '../assets/icons/arrow_circle_left.svg'
import arrow_right from '../assets/icons/arrow_circle_right.svg'
import delete_icon from '../assets/icons/delete.svg';
import edit_icon from '../assets/icons/edit.svg';
import watch from '../assets/icons/watch.png';
import location from '../assets/icons/location.svg';
export default function Events() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortByDate, setSortByDate] = useState(false); 
    const [sortOrder, setSortOrder] = useState('newToOld'); 

    const eventsPerPage = 9; */

/*     useEffect(() => {
        fetchEvents();
    }, []); */

/*     const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:9090/university/events');
            let fetchedEvents = response.data;
            if (sortByDate){
                fetchedEvents = sortEventsByDate(fetchedEvents);
            }
            setEvents(fetchedEvents); 
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('An error occurred while fetching events.');
            setIsLoading(false);
        }
    }; */

/*     const sortEventsByDate = (eventsArray) => {
        return eventsArray.sort((a, b) => {
            if (sortOrder === 'newToOld') {
                return new Date(b.event_date) - new Date(a.event_date);
            } else {
                return new Date(a.event_date) - new Date(b.event_date);
            }
        });
    }; */

   /*  const toggleSortByDate = () => {
        setSortByDate(!sortByDate);
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'newToOld' ? 'oldToNew' : 'newToOld');
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }; */
/* 
    const handleDeleteEvent = async (event_id) => {
        try {
            await axios.delete(`http://localhost:9090/university/events/${event_id}`);
            // After deletion, fetch events again to update the list
            fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
            setError('An error occurred while deleting the event.');
        }
    }; */
/*     const handleEditEvent = async (event_id) =>{
        try {
            await axios.put(`http://localhost:9090/university/events/${event_id}`);
            fetchEvents();
        } catch (error) {
            console.error('Error editing event:', error);
            setError('An error occurred while editing the event.');
        }
    } */
/*     const formatDateTime = (event_date, event_time) => {
        if (!event_date  || !event_time) {
            return 'Date/Time Not Available';
        }

        const formattedDate = new Date(event_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
        const formattedTime = new Date(`1970-01-01T${event_time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
        return `${formattedTime}, ${formattedDate}`;
    }; */
/*     const renderPaginationButtons = () => {
        const totalPages = Math.ceil(events.length / eventsPerPage);
        const paginationButtons = [];
        for (let i = 1; i <= totalPages; i++) {
            paginationButtons.push(
                <button
                    key={i}
                    className={`page-btn ${currentPage === i ? 'active' : ''}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return paginationButtons;
    }; */

    // Logic to get current events to display
/*     const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber); */
/* 
    const renderDeleteIcon = (event_id) => {
        return (
            <img
                src={delete_icon}
                alt="Delete Event"
                className="delete-icon"
                onClick={() => handleDeleteEvent(event_id)}
            />
        );
    }; */
/*      const renderEditIcon =(event_id) =>{
        return (
            <img 
            src={edit_icon}
            alt="Edit Event"
            className="edit-icon"
            onClick={() => handleEditEvent(event_id)}
            />
        )
     }   */
/*      const renderWatchIcon=(event_link_path)=>{
            return(
                <a href={event_link_path} target="_blank" rel="noreferrer">
                    <img src={watch}
                    alt="Watch Event"
                    className="watch-icon"                    
                    />
                </a>
            )
     } */
/*         const renderLocationIcon=(event_place)=>{
            return(
                event_place && event_place !== "N/A" ?
                <div class="location-container">
                    <img src={location} alt="Location" className="location-icon" />
                    <span>{event_place}</span>
                    </div>: null
            )
        } */
/*              
    if (!isLoading && !error) {
          return (
        <div className="events-container">
            <h2>جميع الاحداث</h2>

            {isLoading && <p className="loading-text">جاري تحميل الاحداث...</p>}
            {error && <p>{error}</p>}
            <div>
                عدد الاحداث : {events.length}
            </div>
            <button onClick={toggleSortByDate}>ترتيب حسب التاريخ</button>            
            <button onClick={toggleSortOrder}>
            {sortOrder === 'newToOld' ? 'الأحداث الجديدة إلى القديمة' : 'الأحداث القديمة إلى الجديدة'}
            </button> */
{/*                 <thead>
                    <tr>
                        <th>العنوان</th>
                        <th>الوصف</th>
                        <th>اللينك</th>
                        <th>التاريخ/الوقت</th>
                        <th>المكان</th>
                        <th>حذف</th>
                        <th>تعديل</th>
                    </tr>
                </thead> */}
{/*                 <tbody>
                    {currentEvents.map(event => (                         
                    <tr key={event.event_id}>
                             <td>{event.event_address}</td>
                              <td>{event.description}</td>
                       <td >مشاهدة اللقاء{renderWatchIcon(event.event_link_path)}</td> 
                            <td>{formatDateTime(event.event_date, event.event_time)}</td>
                             <td>{renderLocationIcon(event.event_place)}</td>
                            <td>{renderDeleteIcon(event.event_id)}</td>
                            <td>{renderEditIcon(event.event_id)}</td> 
                        </tr>
                    ))}
                </tbody> */} 
{/* Pagination */}
{/* {events.length > eventsPerPage && (
    <div className="pagination">
        <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
        >
           <img src={arrow_left} alt="Left Arrow" className="arrow-icon" />
        </button>
        {renderPaginationButtons()}
        <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(events.length / eventsPerPage)}
        >

        <img src={arrow_right} alt="Right Arrow" className="arrow-icon" />
        </button>
    </div>
)} */}


