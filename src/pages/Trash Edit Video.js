import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoItem from "./VideoItem"; 
import usePagination from '../hooks/usePagination'; 
import arrow_left from '../assets/icons/arrow_circle_left.svg';
import arrow_right from '../assets/icons/arrow_circle_right.svg';
import SideBar from '../layouts/SideBar';
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



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Simplert from 'react-simplert';
import SideBar from './SideBar';
import './EditVideo.css';

function EditVideo({ video, onSave, onCancel,onFileChange }) {
  const [formData, setFormData] = useState({
    video_title: video?.video_title || "",
    category_id: video?.category_id || "",
    video_description: video?.video_description || "",
    video_path: video?.video_path || "",
    source_id:video?.source_id || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);


 

  useEffect(()=>{
    setFormData({
      ...formData,
      video_title: video?.video_title || "",
      category_id: video?.category_id || "",
      video_description: video?.video_description || "",
      video_path: video?.video_path || "",
      source_id:video?.source_id || "",
    })
  }, [video, videoFile]); 

  const fetchVideoDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/university/videos/${video.video_id}`);
      const videoData = response.data;
      setFormData({
        video_title: videoData.video_title,
        video_description: videoData.video_description,
        video_path: videoData.video_path,
        category_id: videoData.category_id,
        source_id: videoData.source_id,
      });
    } catch (error) {
      console.error('Error fetching video details:', error);
      setError('An error occurred while fetching video details.');
    }
  };


  useEffect(() => {
    fetchCategories();
    fetchSources();
    fetchVideoDetails();
  }, []);

  const fetchCategories = async () => {
    try {
        const response = await axios.get('http://localhost:9090/university/categories');
        setCategories(response.data);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};    
const fetchSources = async () => {
  try {
      const response = await axios.get('http://localhost:9090/university/sources');
      setSources(response.data);
  } catch (error) {
      console.error('Error fetching sources:', error);
  }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

/*   const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    if (onFileChange) {
      onFileChange(file);
    }

  }; */
/*   const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
    if (onFileChange) {
      onFileChange(e.target.files[0]);
    }
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
        const videoFormData = new FormData();
        videoFormData.append('video', videoFile);
        const uploadResponse = await axios.post('http://localhost:5000/upload', videoFormData);
        const videoPath = uploadResponse.data.filePath;
        //updatedFormData = uploadResponse.data.filePath;
        console.log("path",videoPath)
        const updatedFormData = {
          ...formData,
          video_path: videoPath,
        };
      
      const response = await axios.put(`http://localhost:9090/university/videos/${video.video_id}`, updatedFormData);
      if (response && (response.status === 200 || response.status === 201 || response.status === 202)) {
        setShowSuccessAlert(true);
        onSave(updatedFormData);
        console.log(updatedFormData)
      }
      else{
        setShowErrorAlert('error', 'Failed', 'للاسف فشل تعديل الفيديو ', 'اغلاق');
        setError('حدث خطأ أثناء تعديل الفيديو');
      }
    } catch (error) {
      console.error('Error updating video:', error);
      if (error.response) {
        setShowErrorAlert('error', 'Failed', error.response.data.message, 'اغلاق');
    } else {
        setShowErrorAlert('error', 'Failed', 'حدث خطأ. يرجى المحاولة مرة أخرى في وقت لاحق.', 'اغلاق');
    }
    } finally {
      setIsLoading(false);
    }
  };

/*   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const updatedFormData = { ...formData };
      if (videoFile) {
        const videoFormData = new FormData();
        videoFormData.append('video', videoFile);
        const uploadResponse = await axios.post('http://localhost:5000/upload', videoFormData);
        //updatedFormData.video_path = uploadResponse.data.filePath;
        updatedFormData = {
          ...updatedFormData,
          video_path: uploadResponse.data.filePath,
        };
      }
      const response = await axios.put(`http://localhost:9090/university/videos/${video.video_id}`, updatedFormData);
      if (response && (response.status === 200 ||response.status === 201 || response.status === 202)) {
        setShowSuccessAlert(true);
        onSave(updatedFormData);
      }
    } catch (error) {
      console.error('Error updating video:', error);
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  }; */
/*   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.put(`http://localhost:9090/university/videos/${video.video_id}`, formData);
      if (response.status === 200) {
      setShowSuccessAlert(true);
      onSave(formData);}
    } catch (error) {
      console.error('Error updating video:', error);
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  }; */

  return (
    <div className="edit-video-page">
      <SideBar />
      <div className="edit-video-container">      
      <h2 className="header"  >تعديل الفيديو</h2>

        <form className="form-container" onSubmit={handleSubmit} dir='rtl'>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="video_title" className="label">عنوان الفيديو</label>
              <input
                type="text"
                id="video_title"
                name="video_title"
                value={formData.video_title}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="source_id" className="label">المصدر</label>
              <select
              id="source_id"
              name="source_id"
              value={formData.source_id}
              onChange={handleInputChange}
              className="form-control"
              required
              >
                <option value="">اختر مصدرا</option>
              {sources.map((source) => (
                <option key={source.source_id} value={source.source_id}>
                  {source.full_name}
                </option>
              ))}
            </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="category_id" className="label">الفئة</label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              className="form-control"
              required
            >
              <option value="">اختر تصنيف</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="video_description" className="label">وصف الفيديو</label>
            <textarea
              id="video_description"
              name="video_description"
              value={formData.video_description}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="video_path" className="lable">تعديل الفيديو:</label>
            <input
              className="form-control-video"
              type="file"
              accept="video/*"
              id='video_path'
              name='video_path'
              onChange={(e) => setVideoFile(e.target.files[0])}
              //onChange={(e) => setVideoFile(e.target.files[0])}
              />
          </div>
          <div className="btn-container2">
                <button type="submit" className="btn-submit" style={{ width: "30%" }}>
                    حفظ التغييرات
                </button>
                <button type="button" className="btn-submit" onClick={onCancel} style={{width:"30%"}}>
                    إلغاء
                </button>
                </div>
        </form>
        {/* Success and error alerts */}
        <Simplert
          showSimplert={showErrorAlert}
          type="error"
          title="فشلت العملية"
          message="حدث خطأ ما أثناء تحديث الفيديو. يرجى المحاولة مرة أخرى."
          onClose={() => setShowErrorAlert(false)}
          customCloseBtnText="إغلاق"
        />
        <Simplert
          showSimplert={showSuccessAlert}
          type="success"
          title="تم بنجاح"
          message="تم تحديث الفيديو بنجاح."
          onClose={() => setShowSuccessAlert(false)}
          customCloseBtnText="تم"
        />
      </div>
    </div>
  );
}
