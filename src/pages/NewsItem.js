import React, { useEffect, useState } from 'react';
import axios from 'axios';
import delete_icon from '../assets/icons/delete.svg';
import edit_icon from '../assets/icons/edit.svg';
import '../styles/EventItem.css';

function NewsItem({ news, onDelete, onEdit }) {
    const [sources, setSources] = useState([]);
    const [sourceFullName, setSourceFullName] = useState('');

    const handleDelete = () => {
        onDelete(news.news_id);
    };

    const handleEdit = () => {
        onEdit(news.news_id);
    };

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);

        const day = dateTime.getDate();
        const month = dateTime.toLocaleString('default', { month: 'long' });
        return { day, month };
    };

    const { day, month } = formatDateTime(news.news_creation_date);

    useEffect(() => {
        const fetchSources = async () => {
            try {
                const response = await axios.get("http://localhost:9090/university/sources");
                setSources(response.data);
            } catch (error) {
                console.error("Error fetching sources:", error);
            }
        };
        fetchSources();
    }, []);

    useEffect(() => {
        // Find the source with the matching ID and set the full name
        const source = sources.find(source => source.source_id === news.news_source_id);
        if (source) {
            setSourceFullName(source.full_name);
        }
    }, [sources, news.news_source_id]);

    return (
        <tr>
            <td>
                <div className="event-item-container" dir='rtl'>
                    <img src={news.news_image} className='event-item-image' alt='image_test' />
                    <div className="event-item-description" style={{width:"300px",fontSize:"20px"}}>{news.news_content}</div>
                    <div className="event-card-date" >
                        <span className="day">{day}</span> {/* Display day */}
                        <span className="event-card-month">{month}</span>
                    </div>
                    <div className="event-item-address" style={{textAlign:"center"}} >{sourceFullName}</div>
                    <img src={edit_icon} alt="Edit News" className="edit-icon" onClick={handleEdit} />
                    <img src={delete_icon} alt="Delete News" className="delete-icon" onClick={handleDelete} />
                </div>
            </td>
        </tr>
    );
}

export default NewsItem;
