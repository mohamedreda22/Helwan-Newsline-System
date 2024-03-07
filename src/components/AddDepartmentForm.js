import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Simplert from "react-simplert";

const AddDepartmentForm = () => {
  const [departmentName, setDepartmentName] = useState("");
  // const [collegeName, setCollegeName] = useState("");
  const [colleges, setColleges] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  // const [validated, setValidated] = useState(false);
  const [selectedcollege, setSelectedcollege] = useState("");
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
  const handleCollegeChange = (event) => {
    setSelectedcollege(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.stopPropagation();
    // }
    // else {
    try {
      // Log the data being sent to the backend
      console.log("Data to be sent to backend:", {
        department_name: departmentName,
        college_id: selectedcollege,
      });
      const response = await axios.post(
        "http://localhost:9090/university/departments",
        {
          department_name: departmentName,
          college_id: selectedcollege,
        }
      );
      if (response && response.status === 200) {
        console.log("department added successfully:", response.data);
        alert("Added successfully!");
        resetForm();
      } else {
        alert("حدث خطأ اثناء إضافة القسم");
      }
    } catch (error) {
      console.error("Error adding department:", error);
      alert("Error: " + error.message);
    }

    // setValidated(true);
  };
  const resetForm = () => {
    setDepartmentName("");
    setSelectedcollege("");
  };
  return (
    <div dir="rtl">
      {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
      {/* <Form.Group as={Col} md="8" controlId="validationCustom01">
            <Form.Label>المصدر</Form.Label>
            <Form.Control
              required
              type="text"
              value={source}
              onChange={(event) => setSource(event.target.value)}
            />
          </Form.Group> */}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="departmentName">
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
        <Form.Group controlId="collegeName">
          <Form.Label>اسم الكلية</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={selectedcollege}
            onChange={handleCollegeChange}
            required
            // isInvalid={validated && collegeName.trim() === ""}
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
