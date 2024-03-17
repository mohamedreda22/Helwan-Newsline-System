import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from 'axios';
import "../styles/AddSource.css";
import NavbarSource from '../layouts/NavbarSource';

function AddSource() {
  const [sourceFullName, setSourceFullName] = useState("");
  const [responsible, setResponsible] = useState("");
  const [sourceEmail, setSourceEmail] = useState("");
  const [sourcePassword, setSourcePassword] = useState("");
  const [sourceDepartmentId, setSourceDepartmentId] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchColleges();
    fetchDepartments();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await axios.get('http://localhost:9090/university/colleges');
      setColleges(response.data);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:9090/university/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "source_full_name":
        setSourceFullName(value.trim());
        break;
        case "source_responsible":
          setResponsible(value.trim());
          break;
      case "source_email":
        setSourceEmail(value.trim());
        break;
      case "source_password":
        setSourcePassword(value.trim());
        break;
      case "source_department_id":
        setSourceDepartmentId(value);
        break;
      case "college_id":
        setCollegeId(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:9090/university/sources', {
        source_full_name: sourceFullName,
        source_email: sourceEmail,
        source_password: sourcePassword,
        source_department_id: sourceDepartmentId,
        college_id: collegeId,
        source_responsible:responsible,
      });

      if (response && (response.status === 200 || response.status === 201)) {
        alert("Added successfully!");
        resetForm();
      } else {
        alert("An error occurred while adding the source");
      }
    } catch (error) {
      console.error("Error adding source:", error);
      alert("Error: " + error.message);
    }
  };

  const resetForm = () => {
    setSourceFullName("");
    setSourceEmail("");
    setSourcePassword("");
    setSourceDepartmentId("");
    setCollegeId("");
    setResponsible("");
  };

  return (
    <div className='AddSource'>
     <NavbarSource/>
      <div className='page'>
      <Form className='form' onSubmit={handleSubmit}>
        <h1 className='s'>اضافة ناشر</h1>
        <Row >
          <Form.Group as={Col} md="3" /* controlId="validationCustom01" */ className='s0' dir='rtl' style={{marginLeft:"620px"}}>
            <Form.Label className='lable'>الاسم</Form.Label>
            <Form.Control
              required
              className='rounded-0'
              type="text"
              value={sourceFullName}
              onChange={handleChange}
              name="source_full_name"
              style={{ backgroundColor: "rgb(247, 243, 243)" }}
            />
          </Form.Group>
        </Row>
        <Row className="rr1">
          <Col>
            <Form.Group as={Col} md="5" /* controlId="validationCustom01" */ className='s3' dir='rtl' /* style={{marginLeft:"50px"}} */>
              <Form.Label className='lable'> كلمة المرور</Form.Label>
              <Form.Control
                className='rounded-0'
                style={{ backgroundColor: "rgb(247, 243, 243)" }}
                required
                type="password"
                value={sourcePassword}
                onChange={handleChange}
                name="source_password"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group as={Col} md="5" /* controlId="validationCustom01" */ className='s2' dir='rtl' style={{marginLeft:"15px"}}>
              <Form.Label className='lable'>البريد الالكتروني</Form.Label>
              <Form.Control
                required
                className='rounded-0'
                type="email"
                value={sourceEmail}
                onChange={handleChange}
                name="source_email"
                style={{ backgroundColor: "rgb(247, 243, 243)" }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Form.Group as={Col} md="3" /* controlId="validationCustom01" */ className='s0' dir='rtl' style={{marginLeft:"620px"}}>
            <Form.Label className='lable'>مسئول عن</Form.Label>
            <Form.Control
              required
              className='rounded-0'
              type="text"
              value={responsible}
              onChange={handleChange}
              name="source_responsible"
              style={{ backgroundColor: "rgb(247, 243, 243)" }}
            />
          </Form.Group>
        </Row>
        <Row className="rr1">
          <Col>
            <Form.Group /* controlId="departmentSelect" */ dir='rtl' className='s9' as={Col} md="3">
              <Form.Label className='lable'> قسم</Form.Label>
              <Form.Select
                className='rounded-0'
                aria-label="Default select example"
                value={sourceDepartmentId}
                onChange={handleChange}
                name="source_department_id"
                style={{ backgroundColor: "rgb(247, 243, 243)" }}
                required
              >
                <option>اختر قسم</option>
                {departments.map((department) => (
                  <option key={department.department_id} value={department.department_id}>
                    {department.department_name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                الرجاء اختيار اسم القسم
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group /* controlId="collegeName" */ dir='rtl' className='s10' as={Col} md="3">
              <Form.Label className='lable'>اسم الكلية</Form.Label>
              <Form.Select
                className='rounded-0'
                aria-label="Default select example"
                value={collegeId}
                onChange={handleChange}
                name="college_id"
                style={{ backgroundColor: "rgb(247, 243, 243)" }}
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
          </Col>
        </Row>
        <Button
          className="btn1"
          type="submit"
          variant='primary'
        >
          تسجيل
        </Button>
      </Form>
      </div>
    </div>
  );
}

export default AddSource;