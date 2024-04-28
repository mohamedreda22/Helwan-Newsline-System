import React, { useState, useEffect } from "react";
import { Button, Form, Row } from "react-bootstrap";
import axios from "axios";
import Simplert from "react-simplert";
import "../styles/EditSource.css"

const EditSource = ({ sourceId, onClose }) => {
  const [formData, setFormData] = useState({
    source_full_name: "",
    source_email: "",
    source_password: "",
    source_department_id: "",
    college_id: "",
    source_responsible:"",
    url: `http://localhost:9090/university/sources/${sourceId}`,
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);
  
  useEffect(() => {
    fetchColleges();
    fetchDepartments();
    fetchSource();
  }, [sourceId]);

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

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/departments"
      );
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchSource = async () => {
    try {
      const response = await axios.get(formData.url);
      const sourceData = response.data;
      setFormData({
        ...formData,
        source_full_name: sourceData.source_full_name,
        source_email: sourceData.source_email,
        source_password: sourceData.source_password,
        source_department_id: sourceData.source_department_id,
        college_id: sourceData.college_id,
         source_responsible: sourceData.source_responsible,
      });
    } catch (error) {
      console.error("Error fetching source:", error);
      setShowErrorAlert(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(formData.url, {
        source_full_name: formData.source_full_name,
        source_email: formData.source_email,
        source_password: formData.source_password,
        source_department_id: formData.source_department_id,
        college_id: formData.college_id,
        source_responsible: formData.source_responsible ,
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
      console.error("Error updating source:", error);
      setShowErrorAlert(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  

  return (
    <div dir="rtl" className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          
          <Form.Label>الاسم</Form.Label>
          <Form.Control
            className="rounded-0"
            style={{ backgroundColor: "rgb(247, 243, 243)", marginBottom: "40px" }}
            type="text"
            name="source_full_name"
            value={formData.source_full_name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Row>
        <Form.Group  className="email">
          <Form.Label> البريد الالكتروني </Form.Label>
          <Form.Control
            className="rounded-0"
            style={{ backgroundColor: "rgb(247, 243, 243)", marginBottom: "40px" }}
            type="text"
            required
            name="source_email"
            value={formData.source_email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group  className="pass">
          <Form.Label> كلمة المرور </Form.Label>
          <Form.Control
            className="rounded-0"
            style={{ backgroundColor: "rgb(247, 243, 243)", marginBottom: "40px" }}
            type="text"
            required
            name="source_password"
            value={formData.source_password}
            onChange={handleInputChange}
          />
        </Form.Group>
        </Row>

        <Form.Group >
          
          <Form.Label>مسئول عن</Form.Label>
          <Form.Control
            className="rounded-0"
            style={{ backgroundColor: "rgb(247, 243, 243)", marginBottom: "40px" }}
            type="text"
            name="source_responsible"
            value={formData.source_responsible}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Row>
        <Form.Group  className="college">
          <Form.Label> الكلية </Form.Label>
          <Form.Select
            className="rounded-0"
            style={{ backgroundColor: "rgb(247, 243, 243)", marginBottom: "40px" }}
            aria-label="Default select example"
            name="college_id"
            value={formData.college_id}
            onChange={handleInputChange}
          >
            {colleges.map((college) => (
              <option key={college.college_id} value={college.college_id}>
                {college.college_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group  className="dep">
          <Form.Label> القسم </Form.Label>
          <Form.Select
            className="rounded-0"
            style={{ backgroundColor: "rgb(247, 243, 243)", marginBottom: "40px" }}
            aria-label="Default select example"
            name="source_department_id"
            value={formData.source_department_id}
            onChange={handleInputChange}
          >
            {departments.map((department) => (
              <option key={department.department_id} value={department.department_id}>
                {department.department_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        </Row>
        <Button
          type="submit"
          className="button2"
          style={{ backgroundColor: "rgb(8, 8, 24)", marginRight: "130px", width: "200px", marginBottom:"70px"}}
        >
          حفظ التغييرات
        </Button>
      </Form>
      <Simplert
        showSimplert={showErrorAlert}
        type="error"
        title="فشل"
        message="حدث خطأ أثناء تحديث الناشر."
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

export default EditSource;