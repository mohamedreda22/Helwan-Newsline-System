import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../styles/AddNotificationForm.css";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import "../styles/AddPostForm.css"
function AddNotificationForm() {
  const [validated, setValidated] = useState(false);
  const [source, setSource] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Submit data (source, description, and image) to the backend
      submitDataToBackend({ source, description, image });
    }
    setValidated(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const submitDataToBackend = ({ source, description, image }) => {
    // Here, you can make your API call to send data to the backend
    // For example, you can use Fetch API or Axios to make the POST request
    const formData = new FormData();
    formData.append("source", source);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    fetch("", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // Handle response
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
        <h1 className="addpost" dir="rtl">إضافة منشور</h1>
      <div dir="rtl" className="form-container">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3 mt-4">
            <Form.Group as={Col} md="8" controlId="validationCustom01">
              <Form.Label>المصدر</Form.Label>
              <Form.Control
                required
                type="text"
                onChange={(event) => setSource(event.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="8" controlId="validationCustom02">
              <Form.Label>كتابة منشور</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                required
                type="text"
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>
          </Row>
          <Form.Group
            as={Col}
            md="8"
            controlId="formFileMultiple"
            className="mb-4"
          >
            <Form.Label>إضافة صورة (اختياري)</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
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

export default AddNotificationForm;
