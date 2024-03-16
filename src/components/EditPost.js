import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Simplert from "react-simplert";

const EditPost = ({ post, onClose }) => {
  const [formData, setFormData] = useState({
    post_content: post ? post.post_content : "",
    source_string: post ? post.source_string : "",
    category_id: post ? post.category_id : "",
    source_id: post ? post.source_id : "",
    post_image_path : post?.post_image_path || "",
    url: post ? `http://localhost:9090/university/posts/${post.post_id}` : null,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    if (!post) {
      fetchCategories();
      fetchSources();
    } else {
      setFormData({
        ...formData,
        category_id: post.category_id,
        source_id: post.source_id,
      });
    }
  }, [post]);

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

  const handleCategoryChange = (event) => {
    setFormData({
      ...formData,
      category_id: event.target.value,
    });
  };

  const handleSourceChange = (event) => {
    setFormData({
      ...formData,
      source_id: event.target.value,
    });
  };

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

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
    console.log("Data to be sent:", formData); // Log the data to be sent
    try {
      const response = await axios.put(formData.url, {
        post_content: formData.post_content,
        source_string: formData.source_string,
        category_id: formData.category_id,
        source_id: formData.source_id,
        post_image_path : formData.post_image_path,
      });
      if (response.status === 200) {
        setShowSuccessAlert(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);      } else {
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      setShowErrorAlert(true);
    }
  };

  // const resetForm = () => {
  //   setFormData({
  //     post_content: "",
  //     post_image_path: "",
  //     category_id: "",
  //     source_id: "",
  //     source_string: "",
  //   });
  // };
  return (
    <div dir="rtl" className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group /* controlId="sourceString" */>
          <Form.Label>المصدر</Form.Label>
          <Form.Control
            type="text"
            value={formData.source_string}
            onChange={(e) =>
              setFormData({ ...formData, source_string: e.target.value })
            }
          />
        </Form.Group>
        {!post && (
          <div>
            <Row>
              <Form.Group as={Col} md="8" /* controlId="categorySelect" */>
                <Form.Label>اختر التصنيف</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleCategoryChange}
                  value={formData.category_id}
                >
                  {categories.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-3 mt-4">
              <Form.Group as={Col} md="8" /* controlId="sourceSelect" */>
                <Form.Label>اختر المصدر</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleSourceChange}
                  value={formData.source_id}
                >
                  {sources.map((source) => (
                    <option key={source.source_id} value={source.source_id}>
                      {source.full_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
          </div>
        )}
        <Form.Group /* controlId="postContent" */>
          <Form.Label>محتوى المنشور</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            required
            value={formData.post_content}
            onChange={(e) =>
              setFormData({ ...formData, post_content: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group /* controlId="postImage" */>
          <Form.Label>صورة المنشور</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
          
        </Form.Group>
        <Button variant="primary" type="submit">
          حفظ التغييرات
        </Button>{" "}
        <Button variant="secondary" onClick={onClose}>
          إلغاء
        </Button>
      </Form>
      <Simplert
        showSimplert={showErrorAlert}
        type="error"
        title="فشل"
        message="حدث خطأ أثناء تحديث المنشور. يرجى المحاولة مرة أخرى."
        onClose={() => setShowErrorAlert(false)}
        customCloseBtnText="اغلاق"
      />
      <Simplert
        showSimplert={showSuccessAlert}
        type="success"
        title="نجاح"
        message="تم تحديث المنشور بنجاح."
        onClose={() => setShowSuccessAlert(false)}
        customCloseBtnText="تم"
      />
    </div>
  );
};

export default EditPost;

