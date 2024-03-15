import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoItem from "./VideoItem"; 
import usePagination from '../hooks/usePagination'; 
import arrow_left from '../assets/icons/arrow_circle_left.svg';
import arrow_right from '../assets/icons/arrow_circle_right.svg';
import SideBar from "./SideBar";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalVideos, setTotalVideos] = useState(0);

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

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`http://localhost:9090/university/videos/${videoId}`);
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
      setError("An error occurred while deleting the video.");
    }
  }
  const renderVideos = () => {
    return videos.slice(startIndex, endIndex + 1).map((video) => (
      <VideoItem key={video.video_id} video={video} onDelete={handleDelete}/>
    ));
  };

  return (
    <div className="events-page">
      <SideBar />
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
    </div>
  );
}

export default VideoList;
