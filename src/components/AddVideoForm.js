import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddVideoForm.css"; // Import the CSS file

const AddVideoForm = ({ onVideoAdded }) => {
  const [formData,setFormData]=useState({
    video_title:"",
    video_description:"",
    video_path:"",
    category_id:"",
    source_id:"",
  
  })
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [category_id, setCategoryId] = useState("");
  const [source_id, setSourceId] = useState("");
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchSources();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First, upload the video file to get the video path
      const videoFormData = new FormData();
      videoFormData.append("video", videoFile);
      const uploadResponse = await axios.post("http://localhost:5000/upload", videoFormData);
      const videoPath = uploadResponse.data.filePath;
  
      // Update formData state with the form data
      setFormData( {
        ...formData,
        video_title: videoTitle,
        video_description: videoDescription,
        video_path: videoPath,
        category_id: category_id,
        source_id: source_id
      });
      console.log(formData)
  
      // Submit the form data to the second endpoint
      const createResponse = await axios.post("http://localhost:9090/university/videos", formData);
  
      // If successful, notify and reset the form
      if (createResponse && (createResponse.status === 200 || createResponse.status === 201 || createResponse.status === 202)) {
      alert("The video was successfully added!");
      onVideoAdded(createResponse.data);
      setVideoTitle("");
      setVideoDescription("");
      setVideoFile(null);
    } 
    }
    catch (error) {
      console.error("Error adding video:", error);
    }
  };
  
  

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Add_Video</h2>
      <div className="form-group">
      <label className="lable" htmlFor="videoTitle">Title:</label>
        <input
          type="text"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          required
        />
      </div>
      <br />
      <div className="form-group">
      <label className="lable" htmlFor="videoDescription">Description:</label>
        <input
          type="text"
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
      <div className="form-group">
        <label className="label" htmlFor="category_id">Category</label>
        <select
          id="category_id"
          name="category_id"
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
          className="form-control"
          required
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label className="label" htmlFor="source_id">Source</label>
        <select
          id="source_id"
          name="source_id"
          value={source_id}
          onChange={(e) => setSourceId(e.target.value)}
          className="form-control"
          required
        >
          <option value="">Select Source</option>
          {sources.map(source => (
            <option key={source.source_id} value={source.source_id}>
              {source.full_name}
            </option>
          ))}
        </select>
      </div>
        </div>
      <label>
        Video File:
        <input
          type="file"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
      </label>
      <br />
      <button type="submit">Add Video</button>
    </form>
  );
};

export default AddVideoForm;
