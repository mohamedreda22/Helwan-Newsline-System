import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import SideBar from "../components/SideBar";

function AddPostForm() {
  const [formData, setFormData] = useState({
    post_content: "",
    post_image_path: "",
    category_id: "",
    source_id: "",
    source_string: "",
  });
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);

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
          post_image_path: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9090/university/posts",
        formData
      );

      if (response && response.status === 200) {
        console.log(formData);
        alert("Added successfully!");
        resetForm();
      } else {
        alert("An error occurred while adding the post");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Error: " + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      post_content: "",
      post_image_path: "",
      category_id: "",
      source_id: "",
      source_string: "",
    });
  };

  return (
    <div className="add-event-page" style={{ padding:"30px",marginRight:"100px",marginTop:"20px"}}>
      <SideBar/>
      <div dir="rtl" className="form-container">
      <h1 className="header" dir="rtl">
        إضافة منشور
      </h1>
        <Form onSubmit={handleSubmit}>
        <div className="form-row">
        <div className="form-group">
                  <Form.Label className="lable" >التصنيف</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={handleChange}
                    value={formData.category_id}
                    name="category_id"
                  >
                    <option value="">اختر التصنيف</option>
                    {categories.map((category) => (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category_name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
  
                <div className="form-group" >
                  <Form.Label className="lable" >المصدر</Form.Label>
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
                </div></div>
                <div className="form-row">
                <div className="form-group" >
                <label className="lable" style={{marginTop:"15px"}}> مصدر المنشور</label>
                <Form.Control
                  required
                  type="text"
                  name="source_string"
                  value={formData.source_string}
                  onChange={handleChange}
                  style={{width:"180px"}}
                />
              </div>
          </div>
              <div className="form-group">
            <label className="lable">كتابة منشور</label>
            <Form.Control
              as="textarea"
              rows={6}
              required
              name="post_content"
              value={formData.post_content}
              onChange={handleChange}
              style={{ width: "400px" }}
              />
          </div>
          <div className="form-group">
            <label className="lable">إضافة صورة (اختياري)</label>
            <Form.Control
              type="file"
              id="post_image_path"
              name="post_image_path"
              onChange={handleFileChange}
            />
          </div>
          <button            
            type="submit" 
            className='btn-submit'
            style={{width:"45%",marginRight:"120px",marginTop:"10px" }}>
            أضافة خبر
          </button>
        </Form>
      </div>
    </div>
  );
}

export default AddPostForm;
