import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import Form from "react-bootstrap/Form";
import axios from 'axios';
import '../styles/AddArticle.css';

function AddNews() {
    
  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    news_content: "",
    news_image: "",
    news_source_id: "",
    category_id: ""

  });

  useEffect(() => {
    fetchSources();
    fetchCategories();
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
      category_id: ""
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
          <div className="form-row">
          <div className="form-group" style={{marginTop:"10px"}}>
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
          </div>
          <div className="form-group" style={{marginTop:"10px"}}>
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
