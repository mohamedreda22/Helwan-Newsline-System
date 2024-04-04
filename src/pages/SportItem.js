import React from 'react';
import delete_icon from '../assets/icons/delete.svg';
import edit_icon from '../assets/icons/edit.svg';
import '../styles/EventItem.css'; 

function SportItem({ sport, onDelete, onEdit }) {
    const handleDelete = () => {
        onDelete(sport.sport_id);
    };

    const handleEdit = () => {
        onEdit(sport.sport_id);
    };
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);

        const day = dateTime.getDate();
        const month = dateTime.toLocaleString('default', { month: 'long' });
        return { day, month };
    };

    const { day, month} = formatDateTime(sport.sport_creation_date);

    return (
        <tr> 
            
            <td >
                
                <div className="event-item-container" dir='rtl'>
                    <img src={sport.sport_image} className='event-item-image' alt='image_test' style={{height:"100px",width:"100px",maxWidth:"15%"}}/>                    
                    <div className="event-item-address" >{sport.sport_address}</div>
                    <div className="event-item-description">{sport.sport_content}</div> 
                    <div className="event-card-date" >
                        <span className="day">{day}</span> {/* Display day */}
                        <span className="event-card-month">{month}</span> 
                    </div> 
                    <img src={edit_icon} alt="Edit Sport" className="edit-icon" onClick={handleEdit} />
                    <img src={delete_icon} alt="Delete Sport" className="delete-icon" onClick={handleDelete}/>

                </div>
            </td>
        </tr>
    );
}

export default SportItem;
