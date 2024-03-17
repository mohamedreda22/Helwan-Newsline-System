import React, { useState, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import Simplert from "react-simplert";

const AddDepartmentForm = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [colleges, setColleges] = useState([]);
  const [showSuccessAlert, setSuccessAlert] = useState(false);
  const [showErrorAlert, setErrorAlert] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:9090/university/colleges"
      );
      setColleges(response.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
      setErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:9090/university/departments",
        {
          department_name: departmentName,
          college_id: selectedCollege,
        }
      );
      if (response && (response.status === 201 || response.status === 200)) {
        console.log("Department added successfully:", response.data);
        setSuccessAlert(true);
        resetForm();
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }      
    } catch (error) {
      console.error("Error adding department:", error);
      setErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDepartmentName("");
    setSelectedCollege("");
  };

  return (
    <div dir="rtl">
      <Form onSubmit={handleSubmit}>
        <Form.Group /* controlId="departmentName" */>
          <Form.Label>اسم القسم</Form.Label>
          <Form.Control
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            الرجاء إدخال اسم القسم
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group /* controlId="collegeName" */>
          <Form.Label>اسم الكلية</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={selectedCollege}
            onChange={handleCollegeChange}
            required
          >
            <option>اختر الكلية</option>
            {colleges.map((college) => (
              <option key={college.college_id} value={college.college_id}>
                {college.college_name}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            الرجاء اختيار اسم الكلية
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "إضافة القسم"
          )}
        </Button>
      </Form>
      <Simplert
        showSimplert={showErrorAlert}
        type="error"
        title="Failed"
        message="حدث خطأ ما يرجي اعادة المحاولة"
        onClose={() => setErrorAlert(false)}
        customCloseBtnText="اغلاق"
      />
      <Simplert
        showSimplert={showSuccessAlert}
        type="success"
        title="Success"
        message="تمت إضافة القسم بنجاح"
        onClose={() => setSuccessAlert(false)}
        customCloseBtnText="تم"
      />
    </div>
  );
};

export default AddDepartmentForm;
