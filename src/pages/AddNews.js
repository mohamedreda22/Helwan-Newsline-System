import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import '../styles/AddArticle.css';

function AddNews() {
    
  const [sources, setSources] = useState([]);
  const [formData, setFormData] = useState({
    news_content: "",
    news_image: "",
    news_source_id: "",
  });

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
          news_image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:9090/university/news', formData);

      if (response && (response.status === 200 || response.status === 201)) {
        console.log(formData);
        alert("Added successfully!");
        resetForm();
      } else {
        alert("An error occurred while adding the news");
      }
    } catch (error) {
      console.error("Error adding news:", error);
      alert("Error: " + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      news_content: "",
      news_image: "",
      news_source_id: "",
    });
  };

  return (
    <div className='add-article-page' >
      <SideBar />
      <div className='add-article-container' style={{scale:"110%"}}>
        <h1 className='header'>اضافة خبر</h1>
        <Form className='article-form' onSubmit={handleSubmit} dir='rtl'>
          <Form.Group controlId="newsContent" style={{marginTop:"10px"}}>
            <Form.Label className='lable'>محتوى الخبر</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={4} 
              name="news_content" 
              value={formData.news_content} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="newsImage" style={{marginTop:"10px"}}>
            <Form.Label className='lable'>صورة الخبر</Form.Label>
            <Form.Control 
              type="file" 
              name="news_image" 
              onChange={handleFileChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="newsSource" style={{marginTop:"10px"}}>
            <Form.Label className='lable'>مصدر الخبر</Form.Label>
            <Form.Control 
              as="select" 
              name="news_source_id" 
              value={formData.news_source_id} 
              onChange={handleChange} 
              required 
            >
              <option value="">اختر المصدر</option>
                {sources.map((source) => (
                    <option key={source.source_id} value={source.source_id}>
                    {source.full_name}
                    </option>
                ))}
            </Form.Control>
          </Form.Group>
          <button 
            type="submit" 
            className="btn-submit"
            style={{width:"45%",marginRight:"80px",marginTop:"20px"}}>
            حفظ
          </button>
        </Form>
      </div>
    </div>
  );
}

export default AddNews;
