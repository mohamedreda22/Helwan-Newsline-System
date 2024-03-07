import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Simplert from "react-simplert";

const EditDepartment = ({ department, onClose }) => {
  const [departmentName, setDepartmentName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (department) {
      setDepartmentName(department?.department_name || "");
      setCollegeName(department?.college_name || "");
    }
  }, [department]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        await axios.put(
          `http://localhost:9090/university/departments/${department?.department_id}`,
          {
            department_name: departmentName,
            college_name: collegeName,
          }
        );
        setShowSuccessAlert(true);
        onClose();
      } catch (error) {
        console.error("Error updating department:", error);
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
            placeholder="Enter department name"
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
          <Form.Control
            type="text"
            placeholder="Enter college name"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            required
            isInvalid={validated && collegeName.trim() === ""}
          />
          <Form.Control.Feedback type="invalid">
            الرجاء إدخال اسم الكلية
          </Form.Control.Feedback>
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
        title="Failed"
        message="حدث خطأ ما يرجي اعادة المحاولة"
        onClose={() => setShowErrorAlert(false)}
        customCloseBtnText="اغلاق"
      />
      <Simplert
        showSimplert={showSuccessAlert}
        type="success"
        title="Success"
        message="تم التعديل بنجاح"
        onClose={() => setShowSuccessAlert(false)}
        customCloseBtnText="تم"
      />
    </div>
  );
};

export default EditDepartment;
