import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddVideoForm.css"; 
import SideBar from "../layouts/SideBar";
import useAlert from "../hooks/useAlert";
import Simplert from 'react-simplert';
import Cookies from "js-cookie";

const AddVideoForm = () => {
  const [formData, setFormData] = useState({
    video_title: "",
    video_description: "",
    video_path: "",
    category_id: "",
    source_id: "",
  });
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [category_id, setCategoryId] = useState("");
  const [source_id, setSourceId] = useState("");
  const [categories, setCategories] = useState([]);
  const { showAlert, showAlertHandler, hideAlertHandler, alertType, alertTitle, alertMessage, customCloseBtnText } = useAlert();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const sourceId = Cookies.get('source_id'); 

  useEffect(() => {
    fetchCategories();
   }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    try {
      // First, upload the video file to get the video path
      const videoFormData = new FormData();
      videoFormData.append("video", videoFile);
      const uploadResponse = await axios.post(
        "http://localhost:5000/upload",
        videoFormData
      );
      const videoPath = uploadResponse.data.filePath;

      // Update formData state with the form data
      setFormData({
        ...formData,
        video_title: videoTitle,
        video_description: videoDescription,
        video_path: videoPath,
        category_id: category_id,
        source_id: sourceId,
      });

      // Submit the form data to the second endpoint
      const createResponse = await axios.post(
        "http://localhost:9090/university/videos",
        formData
      );

      // If successful, notify and reset the form
      if (
        createResponse &&
        (createResponse.status === 200 ||
          createResponse.status === 201 ||
          createResponse.status === 202)
      ) {
        showAlertHandler('success', 'Success', 'تم اضافة الفيديو بنجاح', 'تم');
        setVideoTitle("");
        setVideoDescription("");
        setVideoFile(null);
        setCategoryId("");
        setSourceId("");
        setError(""); 
      } else {
        showAlertHandler('error', 'Failed', 'للاسف فشل اضافة الفيديو ', 'اغلاق');
        setError('حدث خطأ أثناء إضافة الفيديو');
      }
    } catch (error) {
      console.error("Error adding video:", error);
      if (error.response) {
        showAlertHandler('error', 'Failed', error.response.data.message, 'اغلاق');
      } else {
        showAlertHandler('error', 'Failed', 'حدث خطأ. يرجى المحاولة مرة أخرى في وقت لاحق.', 'اغلاق');
      }
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="add-video-page" dir="rtl">
      <SideBar />
      <form className="form-container5" onSubmit={handleSubmit}>
        <h1 className="header" dir="rtl">
          إضافة فيديو
        </h1>
        <div className="form-row" style={{marginTop:"10px"}}>
          <div className="form-group">
            <label className="lable" htmlFor="videoTitle">
              عنوان الفيديو:
            </label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{marginTop:"-10px"}}>
            <label className="label" htmlFor="category_id">
              التصنيف:
            </label>
            <select
              id="category_id"
              name="category_id"
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
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
        </div>
        <div className="form-group" style={{marginTop:"10px"}}>
          <label className="lable" htmlFor="videoDescription">
            الوصف:
          </label>
          <textarea
            id="videoDescription"
            name="videoDescription"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
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
        <br />
        <button            
          type="submit" 
          className='btn-submit'
          style={{width:"45%",marginRight:"110px"}}
          disabled={isLoading} // Disable the button when loading
        >
          {isLoading ? "جاري الإرسال..." : "أضافة فيديو"}
        </button>
      </form>
      <Simplert
        showSimplert={showAlert}
        type={alertType}
        title={alertTitle}
        message={alertMessage}
        onClose={hideAlertHandler}
        customCloseBtnText={customCloseBtnText}
      />  
    </div>
  );
};

export default AddVideoForm;
