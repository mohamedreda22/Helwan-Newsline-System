import React, { useState, useEffect } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import axios from "axios";
import Simplert from "react-simplert";

const EditDepartment = ({ onClose }) => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showSuccessAlert, setSuccessAlert] = useState(false);
  const [showErrorAlert, setErrorAlert] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:9090/university/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
  
    if (!selectedDepartment) {
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:9090/university/departments/${selectedDepartment.department_id}`,
        {
          department_name: selectedDepartment.department_name,
          college_id: selectedDepartment.college_id,
        }
      );
      if (response &&  (response.status === 201 ||response.status === 202)) {
        setSuccessAlert(true);
        fetchDepartments();
      } else {
        setErrorAlert(true);
      }
    } catch (error) {
      console.error("Error updating department:", error);
      setErrorAlert(true);
    }
  };
  

  return (
    <div className="container" dir="rtl">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Dropdown>
          <Dropdown.Toggle variant="primary">
            اختر القسم للتعديل
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {departments.map((department) => (
              <Dropdown.Item
                key={department.department_id}
                onClick={() => handleDepartmentChange(department)}
              >
                {department.department_name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        {selectedDepartment && (
          <>
            <Form.Group controlId="department_name">
              <Form.Label>اسم القسم</Form.Label>
              <Form.Control
                type="text"
                name="department_name"
                value={selectedDepartment.department_name}
                onChange={(e) =>
                  setSelectedDepartment({
                    ...selectedDepartment,
                    department_name: e.target.value
                  })
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

          </>
        )}
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
        message="تم التعديل بنجاح"
        onClose={() => setSuccessAlert(false)}
        customCloseBtnText="تم"
      />
    </div>
  );
};

export default EditDepartment;
