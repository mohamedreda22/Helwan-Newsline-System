import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import '../styles/AddArticle.css';

function AddSports() {
  const [sources, setSources] = useState([]);
  const [formData, setFormData] = useState({
    sport_address:"",
    sport_content: "",
    sport_image: "",
    sport_source_id: "",
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
          sport_image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:9090/university/sports', formData);

      if (response && (response.status === 200 || response.status === 201)) {
        console.log(formData);
        alert("Added successfully!");
        resetForm();
      } else {
        alert("An error occurred while adding the sport");
      }
    } catch (error) {
      console.error("Error adding sport:", error);
      alert("Error: " + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      sport_content: "",
      sport_image: "",
      sport_source_id: "",
      sport_address:"",
    });
  };

  return (
    <div className='add-article-page'>
      <SideBar />
      <div className='add-article-container'>
        <h1 className='header'>اضافة رياضة</h1>
        <Form className='article-form' onSubmit={handleSubmit} dir='rtl'>
          <Form.Group controlId="sportAddress">
            <Form.Label className='label'>عنوان الرياضة</Form.Label>
            <Form.Control
              type="text"
              name="sport_address"
              value={formData.sport_address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="sportContent">
            <Form.Label className='label'>محتوى الرياضة</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={4} 
              name="sport_content" 
              value={formData.sport_content} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="sportImage">
            <Form.Label className='label'>صورة الرياضة</Form.Label>
            <Form.Control 
              type="file" 
              name="sport_image" 
              onChange={handleFileChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="sportSource">
            <Form.Label className='label'>مصدر الرياضة</Form.Label>
            <Form.Control 
              as="select" 
              name="sport_source_id" 
              value={formData.sport_source_id} 
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
            style={{width:"45%",marginRight:"80px",marginTop:"10px"}}
          >
            حفظ
          </button>
        </Form>
      </div>
    </div>
  );
}

export default AddSports;
