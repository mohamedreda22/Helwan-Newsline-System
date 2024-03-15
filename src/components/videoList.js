// VideoList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddVideoForm from "./AddVideoForm";
import "./AddVideoForm.css"; 

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:9090/university/videos");
      setVideos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("An error occurred while fetching videos.");
      setLoading(false);
    }
  };

  const handleVideoAdded = (newVideo) => {
    setVideos([...videos, newVideo]); // Add the new video to the list
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="video-list-container">
      <h2>Video List</h2>
      <AddVideoForm onVideoAdded={handleVideoAdded} /> {/* Render the form */}
      <ul className="video-items">
        {videos.map((video) => (
          <li key={video.video_id} className="video-item">
            <h3 className="video-title">{video.video_title}</h3>
            <p className="video-description">{video.video_description}</p>
            <p className="video-path">{video.video_path}</p>
            <video className="video-player" controls>
              <source src={"../uploads/1710427435162.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
}
