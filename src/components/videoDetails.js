import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './VideoDetails.css'; // Import the stylesheet
//i'm using https://dashboard.api.video/
//and my API KEY is "fK2rhlR5hTlMHZM1aMZchZbnmvz7gslXsb6DE4K2s37"
const VideoDetails = () => {
    const [videoData, setVideoData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/videos/${id}`);
                setVideoData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching video details:", error);
                setError("An error occurred while fetching video details.");
                setIsLoading(false);
            }
        };

        fetchVideoDetails();
    }, [id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Remove '/videos' from video_path
    const modifiedVideoPath = videoData?.video_path.replace('/videos', '');

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate();
        const month = dateTime.toLocaleString('default', { month: 'long' });
        return { day, month };
    };

    const { day, month } = formatDateTime(videoData?.createDate);
    return (
        <div className="video-details-container">
            <video className="video-player" controls>
                <source src={`http://localhost:3000/${modifiedVideoPath}`} type="video/mp4" />
                {/* Customize controls */}
                Your browser does not support the video tag or the file format of this video.
            </video>            
            <div className="video-info">
                <h3 className="video-title">{videoData?.video_title}</h3>
                <p className="video-description">{videoData?.video_description}</p>
            </div>
            <div className="event-card-date">
                <span className="day">{day}</span>
                <span className="month">{month}</span>
            </div>
        </div>
    );
};

export default VideoDetails;
