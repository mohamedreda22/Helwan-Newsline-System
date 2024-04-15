import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import axios from 'axios';
import '../styles/AddArticle.css';
import NavbarSource from '../layouts/NavbarSource';

function AddCollege() {
    
  const [formData, setFormData] = useState({
    college_name: "",
    college_icon: "",
    college_back_ground: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.onloadend = () => {
        setFormData({
          ...formData,
          college_icon: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.onloadend = () => {
        setFormData({
          ...formData,
          college_back_ground: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:9090/university/colleges', formData);

      if (response && (response.status === 200 || response.status === 201)) {
        console.log(formData);
        alert("Added successfully!");
        resetForm();
      } else {
        alert("An error occurred while adding the college");
      }
    } catch (error) {
      console.error("Error adding college:", error);
      alert("Error: " + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      college_name: "",
      college_icon: "",
    });
  };

  return (
    <div className='add-article-page'>
        <NavbarSource/>
      <div className='add-article-container'>
        <h1 className='header'>اضافة كلية</h1>
        <Form className='article-form' onSubmit={handleSubmit} dir='rtl'>
          <Form.Group controlId="collegeName">
            <Form.Label className='lable'>اسم الكلية</Form.Label>
            <Form.Control 
              type="text" 
              name="college_name" 
              value={formData.college_name} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="collegeIcon">
            <Form.Label className='lable'>ايقونة الكلية</Form.Label>
            <Form.Control 
              type="file" 
              name="college_icon" 
              onChange={handleFileChange1} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="collegeBackGround">
            <Form.Label className='lable'>خلفية الكلية</Form.Label>
            <Form.Control 
              type="file" 
              name="college_back_ground" 
              onChange={handleFileChange2} 
              required 
            />
          </Form.Group>
          <button            
            type="submit" 
            className='btn-submit'
            style={{width:"45%",marginRight:"80px",marginTop:"15px" }}>
            أضافة كلية
          </button>

        </Form>
      </div>
    </div>
  );
}

export default AddCollege;
