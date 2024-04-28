import {React,useState} from 'react';
import '../styles/EventItemStudent.css'; 
import axios from 'axios';

function VideoItemStudent({ video ,style}) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");


    const handleVideoClick = async () => {
        setIsLoading(true);
        try {
            // Fetch the video details by ID
            const response = await axios.get(`http://localhost:9090/university/videos/${video.video_id}`);
            const videoData = response.data;

            // Open the video details in a new tab
            window.open(`/videos/${videoData.video_id}`, '_blank');
        } catch (error) {
            console.error("Error fetching video details:", error);
            setError("An error occurred while fetching video details.");
        }
        setIsLoading(false);
    };
    // Function to format the date
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate();
        const month = dateTime.toLocaleString('default', { month: 'long' });
        return { day, month };
    };

    const { day, month } = formatDateTime(video.video_creation_date);

    const showControls = (event) => {
        const videoPlayer = event.target;
        videoPlayer.controls = true;
    }

    return (
       <div className="video-card" style={style}>
      <div className="video-item-container" dir='rtl'>
        <video className="video-player1" onClick={showControls} >
        <source src={`http://localhost:3000/${video.video_path}`} type="video/mp4" />
        </video>
        <div className="video-info">
          <h3 className="event-card-address">{video.video_title} </h3>
          <p className="event-item-description">{video.video_description}</p>
        </div>
        </div>
        <button
            className="btn-submit"
            onClick={handleVideoClick}
            href={`/videos/${video.video_id}`}
            target='blank'
            style={{float:"right",paddingRight:"5px",width:"125px",paddingBottom:"10px",fontSize:"14px",fontWeight:"bold",marginRight:"10px",marginTop:"-10px",marginBottom:"5px"}}
        >
            عرض بتفاصيل اكتر
        </button>
        <div className="event-card-date1">
            <span className="day1">{day}</span>
            <span className="event-card-month1">{month}</span>
        </div>
    </div>
    );
}

export default VideoItemStudent;
