import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Simplert from "react-simplert";

const EditDepartment = ({ department, onClose }) => {
  const [formData, setFormData] = useState({
    department_name: department ? department.department_name : "",
    college_id: department ? department.college_id : 0,
    url: department ? `http://localhost:9090/university/departments/${department.department_id}` : null,
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    // Log the data being sent
    console.log("Data to be sent:", formData);

    try {
      const response = await axios.put(formData.url, {
        department_name: formData.department_name,
        college_id: formData.college_id,
      });
      if (response && (response.status === 201 || response.status === 200)) {
        setShowSuccessAlert(true);
      } else {
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error updating department:", error);
      setShowErrorAlert(true);
    }
  };

  return (
    <div className="container" dir="rtl">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="department_name">
          <Form.Label>اسم القسم</Form.Label>
          <Form.Control
            type="text"
            name="department_name"
            value={formData.department_name}
            onChange={(e) =>
              setFormData({ ...formData, department_name: e.target.value })
            }
            required
          />
          <Form.Control.Feedback type="invalid">
            الرجاء إدخال اسم القسم
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          حفظ التغييرات
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
