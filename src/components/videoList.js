// VideoList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Player } from "react-html5video";
import "react-html5video/dist/styles.css";
import AddVideoForm from "./AddVideoForm";
import "./AddVideoForm.css";
import ReactPlayer from 'react-player';


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
{/*             <ReactPlayer 
              src={video.video_path}
              width="320px"
              height="240px"
              
            /> */}
            <video className="video-player" controls>
            <source src= {video.video_path} type="video/mp4"  />
            </video>
          </li>
        ))}
      </ul>
    </div>
  );
}
