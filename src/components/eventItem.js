// EventItem component
import React from 'react';
import delete_icon from '../assets/icons/delete.svg';
import edit_icon from '../assets/icons/edit.svg';
import watch from '../assets/icons/watch.png';
import location from '../assets/icons/location.svg';
import '../styles/EventItem.css'; 
import imageTest from "../assets/images/imageTest.jpeg";
//import ImageComponent from './imageComponent';

function EventItem({ event, onDelete, onEdit }) {
    const handleDelete = () => {
        onDelete(event.event_id);
    };

    const handleEdit = () => {
        onEdit(event.event_id);
    };
        // Function to format the date and time
        const formatDateTime = (dateTimeString) => {
            const dateTime = new Date(dateTimeString);
    
            const hours = dateTime.getHours() % 12 || 12;
            const minutes = dateTime.getMinutes();
            const amPm = dateTime.getHours() >= 12 ? 'pm' : 'am';
            const day = dateTime.getDate();
            const month = dateTime.toLocaleString('default', { month: 'short' });
            const year = dateTime.getFullYear();
    
            return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${amPm}, ${day} ${month} ${year}`;
        };

    return (
        <tr> 
            <td >
                <div className="event-item-container" >
                    <img src={edit_icon} alt="Edit Event" className="edit-icon" onClick={handleEdit} />
                    <img src={delete_icon} alt="Delete Event" className="delete-icon" onClick={handleDelete} />
                    <div className="location-container">
                        <span>{event.event_place}</span>
                        <img src={location} alt="Location" className="location-icon" />
                    </div>
                    <div className="event-item-date">{formatDateTime(event.event_date)}</div>
                    <a href={event.event_link_path} target="_blank" rel="noreferrer" className="event-item-link">
                        <span>مشاهدة اللقاء</span>
                        <img src={watch} alt="Watch Event" className="watch-icon" />
                    </a>
                 <div>
                    <div className="event-item-address" >{event.event_address}</div>
                    <div className="event-item-description">{event.event_description}</div> 
                    </div> 
                    <img src={imageTest} className='event-item-image' alt='image_test'/>                    
                </div>
            </td>
        </tr>
    );
}

export default EventItem;
