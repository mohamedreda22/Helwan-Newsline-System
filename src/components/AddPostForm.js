import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import "../styles/AddPostForm.css";

function AddPostForm() {
  const [PostContent, setPostContent] = useState("");
  const [image, setImage] = useState(null);
  const [sourceId, setSourceId] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSource, setSelectedSource] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchSources();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/categories"
      );
      setCategoryId(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSources = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/sources"
      );
      setSourceId(response.data);
    } catch (error) {
      console.error("Error fetching sources:", error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await axios.post(
        "http://localhost:9090/university/posts",
        {
          post_content: PostContent,
          post_image_path: image,
          category_id: selectedCategory,
          source_id: selectedSource,
        }
      );
      if (response && response.status === 200) {
        console.log("Post added successfully:", response.data);
        alert("Added successfuly!");
        resetForm();
      } else {
        alert("حدث خطأ أثناء إضافة المنشور");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      alert("error: ", error);
    }
  };

  const resetForm = () => {
    setPostContent("");
    setImage(null);
    setSourceId([]);
    setCategoryId([]);
    setSelectedCategory("");
    setSelectedSource("");
  };

  return (
    <div>
      <h1 className="addpost" dir="rtl">
        إضافة منشور
      </h1>
      <div dir="rtl" className="form-container">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 mt-4">
            <Form.Group as={Col} md="8" controlId="categorySelect">
              <Form.Select
                aria-label="Default select example"
                onChange={handleCategoryChange} // Handle category change
                value={selectedCategory} // Set the selected value
              >
                <option value="">اختر التصنيف</option>
                {categoryId.map((category) => (
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
            <Form.Group as={Col} md="8" controlId="sourceSelect">
              <Form.Select
                aria-label="Default select example"
                onChange={handleSourceChange} // Handle source change
                value={selectedSource} // Set the selected value
              >
                <option value="">اختر المصدر</option>
                {sourceId.map((source) => (
                  <option key={source.id} value={source.id}>
                    {source.full_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          <Form.Group as={Col} md="8" controlId="validationCustom04">
            <Form.Label>كتابة منشور</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              required
              value={PostContent}
              onChange={(event) => setPostContent(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a description.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="8"
            controlId="formFileMultiple"
            className="mb-4"
          >
            <Form.Label>إضافة صورة (اختياري)</Form.Label>
            <Form.Control
              type="file"
              onChange={(event) => setImage(event.target.files[0])}
            />
          </Form.Group>
          <Button
            className="d-flex justify-content-center submitbtn"
            type="submit"
          >
            إضافة منشور
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddPostForm;
