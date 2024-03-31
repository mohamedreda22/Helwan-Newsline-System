import React from 'react';
import watch from '../assets/icons/watch.png';
import location from '../assets/icons/location.svg';
import '../styles/EventItemStudent.css'; 

function EventItemStudent({ event }) {

    // Function to format the date and time
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);

        const day = dateTime.getDate();
        const month = dateTime.toLocaleString('default', { month: 'long' });

        return { day, month };
    };

    const { day, month } = formatDateTime(event.event_date);

    return (
                <div className="event-card-container">
                <div className="event-card-item">
                    <div>
                    <div className="event-card-address">{event.event_address}</div>
                    </div>   
                    <div className="event-card-date">
                        <span className="day">{day}</span> {/* Display day */}
                        <span className="event-card-month">{month}</span> 
                    </div>
                    <div className="location-card-container">
                        <span>{event.event_place}</span>
                        <img src={location} alt="Location" className="location-card-icon" />
                    </div>
                    <a href={event.event_link_path} target="_blank" rel="noreferrer" className="event-card-link">
                        <span>مشاهدة اللقاء</span>
                        <img src={watch} alt="Watch Event" className="watch-icon" />
                    </a>
                    <img src={event.event_image_path} className='event-card-image' alt='image_test'/>
                </div>
                </div>
    );
}

export default EventItemStudent;
