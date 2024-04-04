 

import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Simplert from "react-simplert";

const EditArticle2 = ({ articleId, onClose }) => {
  const [formData, setFormData] = useState({
    article_address: "", 
    article_image_path: "",
    article_content: "",
    source_id: "",
    source_string: "",
    url: `http://localhost:9090/university/articles/${articleId}`,
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    fetchSources();
    fetchArticle();
  }, [articleId]);

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

  const fetchArticle = async () => {
    try {
      const response = await axios.get(formData.url);
      const articleData = response.data;
      setFormData({
        ...formData,
        article_address: articleData.article_address,
        article_image_path: articleData.article_image_path,
        article_content: articleData.article_content,
        source_id: articleData.source_id.toString(),
        source_string: articleData.source_string,
      });
    } catch (error) {
      console.error("Error fetching article:", error);
      setShowErrorAlert(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(formData.url, {
        article_address: formData.article_address,
        article_image_path: formData.article_image_path,
        article_content: formData.article_content,
        source_id: formData.source_id,
        source_string: formData.source_string,
      });
      if (
        response &&
        (response.status === 200 ||
          response.status === 201 ||
          response.status === 202)
      ) {
        setShowSuccessAlert(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error updating article:", error);
      setShowErrorAlert(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  return (
    <div dir="rtl" className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group /* controlId="sourceString" */>
          <Form.Label>المصدر</Form.Label>
          <Form.Control
              className='rounded-0'
              style={{backgroundColor:"rgb(247, 243, 243)"}}
            type="text"
            name="source_string"
            value={formData.source_string}
            onChange={handleInputChange}
           
          />
        </Form.Group>
        <Form.Group /* controlId="articleAddress" */>
          <Form.Label>عنوان المقال</Form.Label>
          <Form.Control
           className='rounded-0'
           style={{backgroundColor:"rgb(247, 243, 243)"}}
            type="text"
            required
            name="article_address"
            value={formData.article_address}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group /* controlId="articleContent" */>
          <Form.Label>محتوى المقال</Form.Label>
          <Form.Control
           className='rounded-0'
           style={{backgroundColor:"rgb(247, 243, 243)"}}
            as="textarea"
            rows={10}
            required
            name="article_content"
            value={formData.article_content}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group /* controlId="sourceId" */>
          <Form.Label>اختر المصدر</Form.Label>
          <Form.Select
           className='rounded-0'
           style={{backgroundColor:"rgb(247, 243, 243)"}}
            aria-label="Default select example"
            name="source_id"
            value={formData.source_id}
            onChange={handleInputChange}
          >
            {sources.map((source) => (
              <option key={source.source_id} value={source.source_id}>
                {source.full_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group /* controlId="articleImage" */>
          <Form.Label>صورة المقال</Form.Label>
          <Form.Control
           className='rounded-0'
           style={{backgroundColor:"rgb(247, 243, 243)",marginBottom:"50px"}}
           type="file" 
           onChange={handleFileChange} />
        </Form.Group>
        <Button 
         
        type="submit"
        className="button2"
        style={{backgroundColor:"rgb(8, 8, 24)",marginRight:"130px",width:"200px"}}
        >
          حفظ التغييرات
        </Button>
      </Form>
      <Simplert
        showSimplert={showErrorAlert}
        type="error"
        title="فشل"
        message="حدث خطأ أثناء تحديث المقال. يرجى المحاولة مرة أخرى."
        onClose={() => setShowErrorAlert(false)}
        customCloseBtnText="اغلاق"
      />
      <Simplert
        showSimplert={showSuccessAlert}
        type="success"
        title="نجاح"
        message="تم تحديث المقال بنجاح."
        onClose={() => setShowSuccessAlert(false)}
        customCloseBtnText="تم"
      />
    </div>
  );
};

export default EditArticle2;
