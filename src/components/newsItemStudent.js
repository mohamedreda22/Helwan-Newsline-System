import React from 'react';
import '../styles/EventItemStudent.css'; 
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from 'components/ExampleCarouselImage';
function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
    };
  
function NewsItemStudent({ news }) {
    // Function to format the date and time
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate();
        const month = dateTime.toLocaleString('default', { month: 'long' });
        return { day, month };
    };

    const { day, month } = formatDateTime(news.news_creation_date);

    return (
        <>
        
        </>
        // <div className="event-card-container">
        //     <div className="event-card-item">
        //         <img src={news.news_image} alt="News Thumbnail" className="event-card-image" />
        //         <div className="event-card-date1">
        //             <span className="day1">{day}</span>
        //             <span className="event-card-month1">{month}</span>
        //         </div>
        //         <div>
        //             <div className="news-item-content" >{news.news_content}</div>
        //         </div>

        //         </div>
        //     </div>
    );
}

export default NewsItemStudent;
