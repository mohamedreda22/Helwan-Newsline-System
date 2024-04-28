import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Simplert from 'react-simplert';
import '../styles/EditVideo.css';

function EditVideo({ video, onSave, onCancel }) {
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
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  const fetchVideoDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/university/videos/${video.video_id}`);
      const videoData = response.data;
      setFormData({
        video_title: videoData.video_title,
        video_description: videoData.video_description,
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
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setIsLoading(true);
    let videoPath = formData.video_path; // Keep the old video_path
    if (videoFile) {
      // If a new video file is uploaded, update the video path
      const videoFormData = new FormData();
      videoFormData.append("video", videoFile);
      const uploadResponse = await axios.post(
        "http://localhost:5000/upload",
        videoFormData
      );
      videoPath = uploadResponse.data.filePath;
    }

    const updatedFormData = {
      ...formData,
      video_title: formData.video_title,
      video_description: formData.video_description,
      video_path: videoPath, // Use the updated video path
      category_id: formData.category_id,
      source_id: formData.source_id,
    };

    const response = await axios.put(
      `http://localhost:9090/university/videos/${video.video_id}`,
      updatedFormData
    );

    if (response && (response.status === 200 || response.status === 201 || response.status === 202)) {
      setShowSuccessAlert(true);
      onSave(updatedFormData);
      console.log(updatedFormData);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setShowErrorAlert('error', 'Failed', 'للاسف فشل تعديل الفيديو ', 'اغلاق');
      setError('حدث خطأ أثناء تعديل الفيديو');
    }
  } catch (error) {
    console.error('Error updating video:', error);
    setShowErrorAlert(true);
  }
};

  return (
    <div className="add-event-page" style={{padding:"70px",marginRight:"80px"}}>
      <div className="edit-video-container" style={{padding:"70px",marginRight:"80px"}}>      
      <h2 className="header" style={{padding:"0"}}>تعديل الفيديو</h2>

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
          <div className="form-group" style={{marginTop:"10px"}}>
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
            <div className="form-group" style={{marginTop:"10px"}}>
            <label className="lable">ملف الفيديو:</label>
            <input
              className="form-control-video"
              type="file"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
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

export default EditVideo;
