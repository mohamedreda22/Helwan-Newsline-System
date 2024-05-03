import React, { useState, useEffect } from 'react';
import SideBar from '../layouts/SideBar';
import Form from "react-bootstrap/Form";
import axios from 'axios';
import '../styles/AddArticle.css';
import Cookies from "js-cookie";

function AddSports() {
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    sport_address:"",
    sport_content: "",
    sport_image: "",
    sport_source_id: "",
  });

  useEffect(() => {
     fetchCategories();
  }, []);

  const sourceId = Cookies.get('source_id'); 


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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      sport_source_id: sourceId,
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
          <div className="form-row">
          <div className="form-group" style={{marginTop:"10px",marginRight:"10px"}}>
            <Form.Label className='lable'>التصنيف</Form.Label>
            <Form.Control 
              as="select" 
              name="category_id" 
              value={formData.category_id} 
              onChange={handleChange} 
              required 
            >
              <option value="">اختر التصنيف</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </Form.Control>
          </div>
          </div>
          </Form.Group>
          <Form.Group controlId="sportImage" style={{marginTop:"10px"}}>
            <Form.Label className='label'>صورة الرياضة</Form.Label>
            <Form.Control 
              type="file" 
              name="sport_image" 
              onChange={handleFileChange} 
              required 
            />
          </Form.Group>
          <button 
            type="submit" 
            className="btn-submit"
            style={{width:"45%",marginRight:"80px",marginTop:"30px"}}
          >
            اضافة رياضة
          </button>
        </Form>
      </div>
    </div>
  );
}

export default AddSports;
