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

    return (
        <tr> 
            <td >
                <div className="event-item-container" >
                    <img src={edit_icon} alt="Edit Sport" className="edit-icon" onClick={handleEdit} />
                    <img src={delete_icon} alt="Delete Sport" className="delete-icon" onClick={handleDelete} />
                    <div className="event-item-date">{sport.sport_date}</div>
                    <div>
                        <div className="event-item-address" >{sport.sport_address}</div>
                        <div className="event-item-description">{sport.sport_content}</div> 
                    </div> 
                    <img src={sport.sport_image} className='event-item-image' alt='image_test'/>                    
                </div>
            </td>
        </tr>
    );
}

export default SportItem;
