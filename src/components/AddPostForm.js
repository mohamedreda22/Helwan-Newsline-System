// Import necessary components and styles
import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import "../styles/AddPostForm.css";

function AddPostForm() {
  // Define state variables
  const [postContent, setPostContent] = useState("");
  const [source, setSource] = useState("");
  const [sourceId, setSourceId] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [postImagePath, setPostImagePath] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch categories and sources on component mount
  useEffect(() => {
    fetchCategories();
    fetchSources();
  }, []);

  // Function to fetch categories from the server
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:9090/university/categories");
      setCategoryId(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to fetch sources from the server
  const fetchSources = async () => {
    try {
      const response = await axios.get("http://localhost:9090/university/sources");
      setSourceId(response.data);
    } catch (error) {
      console.error("Error fetching sources:", error);
    }
  };

  // Event handler for category selection
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Event handler for source selection
  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
  };

  // Event handler for file input change
// Event handler for file input change
const handleFileChange = (e, callback) => {
  const file = e ? e.target.files[0] : null;
  const reader = new FileReader();

  if (file) {
    reader.onloadend = () => {
      // Convert image file to base64 and pass it to the callback function
      if (callback) {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  } else {
    // Handle case where no file is selected
    if (callback) {
      callback(null);
    }
  }
};

// Event handler for combined file change
const handleCombinedFileChange = (e) => {
  handleFileChange(e, (imageData) => {
    setPostImagePath(imageData); // Store base64 image data in state
  });
};




  // Event handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
        // Form validation
        if (!postContent || !selectedCategory || !selectedSource) {
          throw new Error("Please fill out all required fields.");
        }
      // Prepare request body
      const formData = new FormData();
      formData.append("post_content", postContent);
      formData.append("post_image_path", imageFile);
      formData.append("category_id", selectedCategory);
      formData.append("source_id", selectedSource);
      formData.append("source_string", source);

      // Make POST request to add the post
      const response = await axios.post("http://localhost:9090/university/posts", formData);

      // Handle successful response
      if (response && response.status === 200) {
        console.log("Post added successfully:", response.data);
        alert("Added successfully!");
        resetForm();
      } else {
        throw new Error("An error occurred while adding the post");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Error: " + error.message);
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setPostContent("");
    setSource("");
    setSelectedCategory("");
    setSelectedSource("");
    setPostImagePath(null);
    setImageFile(null);
  };

  // Render the component
  return (
    <div>
      <h1 className="addpost" dir="rtl">إضافة منشور</h1>
      <div dir="rtl" className="form-container">
        <Form onSubmit={handleSubmit}>
          {/* Source Input */}
          <Form.Group as={Col} md="8" controlId="validationCustom01">
            <Form.Label>المصدر</Form.Label>
            <Form.Control
              required
              type="text"
              value={source}
              onChange={(event) => setSource(event.target.value)}
            />
          </Form.Group>

          {/* Category Select */}
          <Row className="mb-3 mt-4">
            <Form.Group as={Col} md="8" controlId="categorySelect">
              <Form.Label>اختر التصنيف</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="">اختر التصنيف</option>
                {categoryId.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          {/* Source Select */}
          <Row className="mb-3 mt-4">
            <Form.Group as={Col} md="8" controlId="sourceSelect">
              <Form.Label>اختر المصدر</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={handleSourceChange}
                value={selectedSource}
              >
                <option value="">اختر المصدر</option>
                {sourceId.map((source) => (
                  <option key={source.source_id} value={source.source_id}>
                    {source.full_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          {/* Post Content Textarea */}
          <Form.Group as={Col} md="8" controlId="validationCustom04">
            <Form.Label>كتابة منشور</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              required
              value={postContent}
              onChange={(event) => setPostContent(event.target.value)}
            />
          </Form.Group>

          {/* Image File Input */}
          <Form.Group as={Col} md="8" controlId="formFileMultiple" className="mb-4">
            <Form.Label>إضافة صورة (اختياري)</Form.Label>
            <Form.Control
              type="file"
              id="post_image_path"
              onChange={handleCombinedFileChange}
            />
          </Form.Group>

          {/* Submit Button */}
          <Button className="d-flex justify-content-center submitbtn" type="submit">
            إضافة منشور
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddPostForm;
