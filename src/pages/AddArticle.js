import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from 'axios';
import '../styles/AddArticle.css';

function AddArticle() {
  const [formData, setFormData] = useState({
    article_address: "",
    article_content: "",
    source_string: "",
    source_id: "",
    article_image_path: "",
  });

  const [sources, setSources] = useState([]);

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    try {
      const response = await axios.get('http://localhost:9090/university/sources');
      setSources(response.data);
    } catch (error) {
      console.error('Error fetching sources:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        setFormData({
          ...formData,
          article_image_path: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:9090/university/articles', formData);

      if (response && (response.status === 200 || response.status === 201)) {
        console.log(formData);
        alert("Added successfully!");
        resetForm();
      } else {
        alert("An error occurred while adding the article");
      }
    } catch (error) {
      console.error("Error adding article:", error);
      alert("Error: " + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      article_address: "",
      source_string: "",
      article_content: "",
      article_image_path: "",
      source_id: "",
    });
  };

  return (
    <div className='add-event-page'>
      <SideBar />
      <div className='add-event-container'>
        <h1 className='header'>اضافة مقال</h1>
        <form className='event-form' onSubmit={handleSubmit} dir='rtl'>
        <div className="form-row">
            <div className="form-group">
                <label className='label'>العنوان</label>
                <Form.Control
                  className='article-form-control'
                  required
                  type="text"
                  value={formData.article_address}
                  onChange={handleChange}
                  name="article_address"
                />
              </div>
            <div className="form-group">
                <lable className='label'>المصدر</lable>
                <Form.Select
                    aria-label="Default select example"
                    onChange={handleChange}
                    value={formData.source_id}
                    name="source_id"
                  >
                  <option value="">اختر المصدر</option>
                  {sources.map((source) => (
                    <option key={source.source_id} value={source.source_id}>
                      {source.full_name}
                    </option>
                  ))}
                </Form.Select>
              </div>
          </div>
            <div className="form-group">
            <label className='label'> مصدر المقال</label>
              <Form.Control
                className='article-form-control'
                required
                type="text"
                value={formData.source_string}
                onChange={handleChange}
                name="source_string"
              />
            </div>
            <div className="form-group">
               <label className='label'>اختر صورة</label>
              <Form.Control
                className='article-form-control-file'
                type="file"
                name="article_image_path"
                onChange={handleFileChange}
                required
              />
            </div>
          <div className="form-group">
              <label className='label' >نص المقال</label>
              <Form.Control
                className='article-form-control'
                as="textarea"
                rows={5}
                required
                value={formData.article_content}
                onChange={handleChange}
                name="article_content"
                style={{ width: "350px" }} // Set the width inline

              />
            </div>
          <button            
            type="submit" 
            className='btn-submit'
            style={{width:"45%",marginRight:"120px"}}>
            اضافة مقال
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddArticle;
