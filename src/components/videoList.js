import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoItem from "./VideoItem"; 
import usePagination from '../hooks/usePagination'; 
import arrow_left from '../assets/icons/arrow_circle_left.svg';
import arrow_right from '../assets/icons/arrow_circle_right.svg';
import SideBar from "./SideBar";
import EditVideo from "./EditVideo"

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalVideos, setTotalVideos] = useState(0);
  const [editedVideo, setEditedVideo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [videoIdToEdit, setVideoIdToEdit] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const videosPerPage = 9;

  // Pagination hook
  const {
    currentPage,
    totalPages,
    goToPage,
    goToFirstPage,
    goToLastPage,
  } = usePagination(totalVideos, videosPerPage);

  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage - 1;

  useEffect(() => {
    fetchVideos();
  }, []);


  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:9090/university/videos");
      setTotalVideos(response.data.length); 
      setVideos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("An error occurred while fetching videos.");
      setIsLoading(false);
    }
  };
/*   const handleEdit = async (videoId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:9090/university/videos/${videoId}`);
      const videoData = response.data;
      setEditedVideo(videoData);
    } catch (error) {
      console.error("Error fetching video for editing:", error);
      setError("An error occurred while fetching the video for editing.");
      setIsLoading(false);
    }
  }; */
  
  const handleEditVideo = (eventId) => {
    setIsEditing(true);
    setVideoIdToEdit(eventId);
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedVideo(null);
    setVideoFile(null); 

  };

  useEffect(() => {
    if (isEditing && videoIdToEdit) {
      const videoToEdit = videos.find((video) => video.video_id === videoIdToEdit);
      setEditedVideo(videoToEdit);
    }
  }, [isEditing, videoIdToEdit, videos]);

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`http://localhost:9090/university/videos/${videoId}`);
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
      setError("An error occurred while deleting the video.");
    }
  }
/*   const handleSave = async () => {
    try {
      const updatedVideo = {
        video_title: editedVideo.video_title, 
        video_description: editedVideo.video_description,
        category_id: editedVideo.category_id,
        source_id: editedVideo.source_id,
        video_path: editedVideo.video_path,
      };
        

      await axios.put(`http://localhost:9090/university/videos/${editedVideo.video_id}`,updatedVideo);
      fetchVideos();
      handleCancelEdit();
    } catch (error) {
      console.error("Error updating video:", error);
      setError("An error occurred while updating the video.");
    }
  } */

  const handleSave = async () => {
    try {
      let updatedVideoCopy = { ...editedVideo }; // Copy the editedVideo object
  
      // If videoFile exists, upload the file and update the video_path
      if (videoFile) {
        const videoFormData = new FormData();
        videoFormData.append('video', videoFile);
        const uploadResponse = await axios.post('http://localhost:5000/upload', videoFormData);
        const videoPath = uploadResponse.data.filePath;
        updatedVideoCopy = {
          ...updatedVideoCopy,
          video_path: videoPath,
        };
      }
  
/*       // Update the video with edited data
      updatedVideoCopy = {
        ...updatedVideoCopy,
        video_title: formData.video_title,
        video_description: formData.video_description,
        category_id: formData.category_id,
        source_id: formData.source_id,
      }; */
  
      // Send the updated video data to the server
      await axios.put(`http://localhost:9090/university/videos/${editedVideo.video_id}`, updatedVideoCopy);
      fetchVideos();
      handleCancelEdit();
      console.log("updatedVideoCopy",updatedVideoCopy)
    } catch (error) {
      console.error("Error updating video:", error);
      setError("An error occurred while updating the video.");
    }
  };
  
  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]); // Update videoFile state when a new file is selected
  };

  const renderVideos = () => {
    return videos.slice(startIndex, endIndex + 1).map((video) => (
      <VideoItem 
      key={video.video_id} 
      video={video} 
      onDelete={handleDelete}      
      onEdit={handleEditVideo} 
/>
    ));
  };

  return (
    <div className="events-page">
      <SideBar />
      {editedVideo && videoIdToEdit && isEditing ?(
        <EditVideo
          video={editedVideo}
          onCancel={handleCancelEdit}
          onSave={handleSave}
          onFileChange={handleFileChange} 
        />
      ):
      <>
      <h2>جميع الفيديوهات</h2>
      {isLoading && <p className="loading-text">جاري تحميل الفيديوهات...</p>}
      {error && <p>{error}</p>}
      <div className="total-events">
        عدد الفيديوهات : <span>{videos.length}</span>
      </div>
      <div className="events-container">
        <table id="events-table" className="events-table">
          <tbody>
            {renderVideos()}
          </tbody>
        </table>
        {totalVideos > videosPerPage && (
          <div className="pagination">
            <img src={arrow_left} onClick={goToFirstPage} alt="Left Arrow" className="arrow-icon" />
            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, index) => (
                <span
                  key={index + 1}
                  className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => goToPage(index + 1)}
                  disabled={currentPage === index + 1}
                >
                  {index + 1}
                </span>
              ))}
            </div>
            <img src={arrow_right} onClick={goToLastPage} alt="Right Arrow" className="arrow-icon" />
          </div>
        )}
      </div>
      </>
      }
    </div>
  );
}

export default VideoList;
