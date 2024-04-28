import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../styles/AddNotificationForm.css";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

function AddNotificationForm() {
  const [validated, setValidated] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button type="button" className="AddNotifbtn" onClick={handlePopupToggle}>
        إشعار جديد <FaPlus />
      </button>
      {showPopup && (
        <div dir="rtl" className="popupContainer">
          <div className="popupForm">
            <MdClose
              size={24}
              color="#091160"
              className="closeIcon"
              onClick={handleClosePopup}
            />
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3 mt-4">
                <h3 dir="إضافة إشعار جديد"></h3>
                <Form.Group as={Col} md="12" >
                  <Form.Label>العنوان</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="12" >
                  <Form.Label>الوصف</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    type="text"
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Form.Group>
              </Row>
              <Button
                className="d-flex justify-content-center submitbtn"
                type="submit"
              >
                إضافة إشعار
              </Button>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddNotificationForm;
