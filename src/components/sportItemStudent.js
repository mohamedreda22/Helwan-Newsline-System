import React from 'react';
import '../styles/EventItemStudent.css'; 

function SportItemStudent({ sport }) {

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);

        const day = dateTime.getDate();
        const month = dateTime.toLocaleString('default', { month: 'long' });

        return { day, month };
    };

    const { day, month } = formatDateTime(sport.sport_creation_date);

    return (
        <div className="event-card-container">
            <div className="event-card-item">
             <img src={sport.sport_image} className='event-card-image' alt='image_test'/>
                <div className="event-card-date1" >
                    <span className="day1" >{day}</span> {/* Display day */}
                    <span className="event-card-month1">{month}</span> 
                </div>
                <div className="event-card-address" style={{fontSize:"16px"}}>{sport.sport_address}</div>
                <span className="event-item-description">{sport.sport_content}</span>
            </div>
        </div>
    );
}

export default SportItemStudent;
