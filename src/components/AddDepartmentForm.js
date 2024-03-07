import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Simplert from "react-simplert";

const AddDepartmentForm = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [colleges, setColleges] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/colleges"
      );
      setColleges(response.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        await axios.post("http://localhost:9090/university/departments", {
          department_name: departmentName,
          college_name: collegeName,
        });
        setShowSuccessAlert(true);
        // Reset form fields after successful submission
        setDepartmentName("");
        setCollegeName("");
        setValidated(false);
      } catch (error) {
        console.error("Error adding department:", error);
        setShowErrorAlert(true);
      }
    }
    setValidated(true);
  };

  return (
    <div dir="rtl">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="departmentName">
          <Form.Label>اسم القسم</Form.Label>
          <Form.Control
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
            isInvalid={validated && departmentName.trim() === ""}
          />
          <Form.Control.Feedback type="invalid">
            الرجاء إدخال اسم القسم
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="collegeName">
          <Form.Label>اسم الكلية</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            required
            isInvalid={validated && collegeName.trim() === ""}
          >
            <option>اختر الكلية</option>
            {colleges.map((college) => (
              <option key={college.college_name} value={college.college_name}>
                {college.college_name}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            الرجاء اختيار اسم الكلية
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          إضافة القسم
        </Button>
      </Form>
      <Simplert
        showSimplert={showErrorAlert}
        type="error"
        title="Failed"
        message="حدث خطأ ما يرجي اعادة المحاولة"
        onClose={() => setShowErrorAlert(false)}
        customCloseBtnText="اغلاق"
      />
      <Simplert
        showSimplert={showSuccessAlert}
        type="success"
        title="Success"
        message="تمت إضافة القسم بنجاح"
        onClose={() => setShowSuccessAlert(false)}
        customCloseBtnText="تم"
      />
    </div>
  );
};

export default AddDepartmentForm;
