import React, { useState, useEffect } from 'react';
import delete_icon from '../assets/icons/delete.svg';
import edit_icon from '../assets/icons/edit.svg';
import '../styles/EventItem.css';

function PostItem({ post, onDelete, onEdit, sources }) {
    const handleDelete = () => {
        onDelete(post.post_id);
    };

    const handleEdit = () => {
        onEdit(post.post_id);
    };

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate();
        const month = dateTime.toLocaleString('default', { month: 'long' });
        return { day, month };
    };

    const { day, month } = formatDateTime(post.post_creation_date);

    const getSourceFullName = (sourceId) => {
        const source = sources.find((source) => source.source_id === sourceId);
        return source ? source.full_name : '';
    };

    return (
        <tr>
            <td>
                <div className="event-item-container" dir="rtl">
                    <img
                        src={post.post_image_path}
                        className="event-item-image"
                        alt="Post Image"
                        style={{ height: '100px', width: '100px', maxWidth: '15%' }}
                    />
                     <div className="event-item-description" style={{width:"350px"}}>{post.post_content}</div>
                    <div className="event-source-content" >{post.source_string}</div>
                    <div className="event-card-date" >
                        <span className="day">{day}</span> {/* Display day */}
                        <span className="event-card-month">{month}</span> 
                    </div>
                    <div className="event-item-address" style={{textAlign:"center"}}>{getSourceFullName(post.source_id)}</div>

                    <img src={edit_icon} alt="Edit Post" className="edit-icon" onClick={handleEdit} />
                    <img src={delete_icon} alt="Delete Post" className="delete-icon" onClick={handleDelete} />
                </div>
            </td>
        </tr>
    );
}

export default PostItem;
