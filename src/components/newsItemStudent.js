import React, { useState, useEffect } from 'react';
import '../styles/EventItemStudent.css';
import axios from 'axios';
import  "../styles/NewsItemStudent.css"

function NewsItemStudent({ news,style }) {
    const [sources, setSources] = useState([]);

    useEffect(() => {
        fetchSources();
    }, []);

    // Function to format the date and time
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate();
        const month = dateTime.toLocaleString('default', { month: 'long' });
        return { day, month };
    };

    const { day, month } = formatDateTime(news.news_creation_date);

    const fetchSources = async () => {
        try {
            const response = await axios.get("http://localhost:9090/university/sources");
            setSources(response.data);
        } catch (error) {
            console.error("Error fetching sources:", error);
        }
    };

    return (
        <div className="news-item-container" style={style}>
            <img src={news.news_image} alt="News Thumbnail" className="news-item-image" />
            <div className="news-item-details">
            <div className="news-item-content" dir='rtl'>{news.news_content.length > 70 ? `${news.news_content.slice(0, 66)}...` : news.news_content}</div>
                <div className="news-item-source" dir='rtl' style={{display:"flex",justifyContent:"space-between"}}> 
                    <span>{sources.find((source) => source.source_id === news.news_source_id)?.full_name}</span>              
                    <div className="event-card-date1" style={{display:"flex"}}>
                    <span className="day1">{day}</span>
                    <span className="month1">{month}</span>
                </div>
                </div>
            </div>
        </div>
    );
}

export default NewsItemStudent;
