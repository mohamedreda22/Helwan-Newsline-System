import React, { useState, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import Simplert from "react-simplert";

const EditDepartmentForm = ({ departmentId }) => {
  const [departmentName, setDepartmentName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [showSuccessAlert, setSuccessAlert] = useState(false);
  const [showErrorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDepartment();
  }, [departmentId]);

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/university/departments/${departmentId}`
      );
      const departmentData = response.data;
      setDepartmentName(departmentData.department_name);
      setCollegeId(departmentData.college_id);
    } catch (error) {
      console.error("Error fetching department:", error);
      setErrorAlert(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:9090/university/departments/${departmentId}`,
        {
          department_name: departmentName,
          college_id: collegeId,
        }
      );
      if (
        response &&
        (response.status === 200 ||
          response.status === 201 ||
          response.status === 202)
      ) {
        console.log("Department updated successfully:", response.data);
        setSuccessAlert(true);
      } else {
        setErrorAlert(true);
      }
    } catch (error) {
      console.error("Error updating department:", error);
      setErrorAlert({
        title: `حدث خطأ أثناء تعديل القسم ${departmentName}`,
        type: "error",
      });
      setErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl">
      <Form onSubmit={handleSubmit}>
        <Form.Group >
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

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "تحديث القسم"
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
        message="تم تحديث القسم بنجاح"
        onClose={() => setSuccessAlert(false)}
        customCloseBtnText="تم"
      />
    </div>
  );
};

export default EditDepartmentForm;
