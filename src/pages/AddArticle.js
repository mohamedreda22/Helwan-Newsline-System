import React, { useState, useEffect } from 'react';
import SideBar from '../layouts/SideBar';
import Form from "react-bootstrap/Form";
import axios from 'axios';
import '../styles/AddArticle.css';
import Cookies from "js-cookie";

function AddArticle() {
  const [formData, setFormData] = useState({
    article_address: "",
    article_content: "",
    source_string: "",
    source_id: "",
    article_image_path: "",
    category_id: "",
  });

  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
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

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      source_id: sourceId,
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
      category_id: "",
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
              <div className="form-group" style={{marginTop:"10px"}}>
            <label className='lable'>التصنيف</label>
            <Form.Control 
              as="select" 
              name="category_id" 
              value={formData.category_id} 
              onChange={handleChange} 
              required 
              style={{height:"45px"}}
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
          <div className="form-row">
            <div className="form-group" >
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
                style={{ width: "350px" }} 

              />
            </div>
          <button            
            type="submit" 
            className='btn-submit'
            style={{width:"45%",marginRight:"120px",padding:"10px",marginTop:"10px"}}>
            اضافة مقال
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddArticle;
