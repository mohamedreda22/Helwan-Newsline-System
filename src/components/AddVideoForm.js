import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddVideoForm.css"; // Import the CSS file

const AddVideoForm = ({ onVideoAdded }) => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [video_path, setVideoPath] = useState("");
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
      const formData = new FormData();
      formData.append("video", videoFile);
      const response = await axios.post("http://localhost:5000/upload", formData);
      const videoPath = response.data.filePath;
      const videoData = {
        video_title: videoTitle,
        video_description: videoDescription,
        video_path: videoPath,
        category_id: category_id,
        source_id: source_id
      };
      const createResponse = await axios.post("http://localhost:9090/university/videos", videoData);

      onVideoAdded(createResponse.data);
      setVideoTitle("");
      setVideoDescription("");
      setVideoFile(null);
    } catch (error) {
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
          required
        />
      </label>
      <br />
      <button type="submit">Add Video</button>
    </form>
  );
};

export default AddVideoForm;
