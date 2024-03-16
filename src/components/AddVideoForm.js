import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddVideoForm.css"; 
import SideBar from "./SideBar";
import useAlert from "../hooks/useAlert";
import Simplert from 'react-simplert';

const AddVideoForm = ({ onVideoAdded }) => {
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
  const [sources, setSources] = useState([]);
  const { showAlert, showAlertHandler, hideAlertHandler, alertType, alertTitle, alertMessage, customCloseBtnText } = useAlert();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchSources();
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

  const fetchSources = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/sources"
      );
      setSources(response.data);
    } catch (error) {
      console.error("Error fetching sources:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        source_id: source_id,
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
        //onVideoAdded(createResponse.data);
        console.log(formData)

        setVideoTitle("");
        setVideoDescription("");
        setVideoFile(null);
        setCategoryId("");
        setSourceId("")
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
          setIsLoading(false);
      }
  };

  return (
    <div className="add-video-page" dir="rtl">
      <SideBar />
      <h2 className="header">اضافة فيديو</h2>
      <div className="add-video-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-row">
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
            <div className="form-group">
              <label className="label" htmlFor="source_id">
                المصدر:
              </label>
              <select
                id="source_id"
                name="source_id"
                value={source_id}
                onChange={(e) => setSourceId(e.target.value)}
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
          <br />
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <label className="lable">ملف الفيديو:</label>
            <input
              className="form-control-video"
              type="file"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
            />
          </div>
          <br />
          <button className="btn-sub" type="submit" style={{ width: "65%" }}>
            اضافة الفيديو
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
    </div>
  );
};

export default AddVideoForm;
