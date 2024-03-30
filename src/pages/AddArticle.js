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
    <div className='add-article-page'>
      <SideBar />
      <div className='add-article-container'>
        <h1 className='header'>اضافة مقال</h1>
        <Form className='article-form' onSubmit={handleSubmit} dir='rtl'>
          <Row className="article-form-row">
            <Col>
              <Form.Group as={Col} md="10" /* controlId="validationCustom01" */ className='article-form-group'>
                <Form.Label className='label'>العنوان</Form.Label>
                <Form.Control
                  className='article-form-control'
                  required
                  type="text"
                  value={formData.article_address}
                  onChange={handleChange}
                  name="article_address"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group as={Col} md="10" /* controlId="validationCustom01" */ className='article-form-group'>
                <Form.Label className='label'>المصدر</Form.Label>
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
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group as={Col} md="8" /* controlId="formFileMultiple" */ className="article-form-group">
              <Form.Label className='label'>اختر صورة</Form.Label>
              <Form.Control
                className='article-form-control-file'
                type="file"
                id="article_image_path"
                name="article_image_path"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6" /* controlId="validationCustom01" */ className="article-form-group">
              <Form.Label className='label'>المقال</Form.Label>
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
            </Form.Group>
          </Row>
          <Button
            className="btn-submit"
            type="submit"
            style={{backgroundColor:"#091160",padding:"10px",width:"200px",marginRight:"90px"}}
            >
            حفظ
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddArticle;
