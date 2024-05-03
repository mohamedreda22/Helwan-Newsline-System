import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import '../styles/AddArticle.css';
import { Row,Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

import NavbarSource from '../layouts/NavbarSource'

function AddSource() {
  const [sources, setSources] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);
  
  const [formData, setFormData] = useState({
    source_full_name: "",
    source_responsible: "",
    source_email: "",
    source_password: "",
    source_department_id: "",
    college_id: "",
  });

  useEffect(() => {
    fetchColleges();
    fetchSources();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await axios.get('http://localhost:9090/university/colleges');
      setColleges(response.data);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const fetchDepartments = async (collegeId) => {
    try {
      const response = await axios.get(`http://localhost:9090/university/departments?college_id=${collegeId}`);
      const filterDepartments =
      response.data.filter((department) => department.college_id === parseInt(collegeId));
          setDepartments(filterDepartments);
      console.log(filterDepartments)
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchSources = async () => {
    try {
      const response = await axios.get('http://localhost:9090/university/sources');
      setSources(response.data);
    } catch (error) {
      console.error('Error fetching sources:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // If the changed field is college_id, fetch departments for the selected college
    if (name === 'college_id') {
      fetchDepartments(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:9090/university/sources', formData);

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
    setFormData({
      source_full_name: "",
      source_responsible: "",
      source_email: "",
      source_password: "",
      source_department_id: "",
      college_id: "",
    });
  };

  return (
    <div className='add-article-page' style={{marginLeft:"150px"}}>
                 <NavbarSource/>
      <div className='add-article-container' style={{maxWidth:"600px"}}>
        <h1 className='header'>اضافة ناشر</h1>
        <Form className='article-form' onSubmit={handleSubmit} dir='rtl'>
          <Row>
            <Form.Group as={Col} md="5" controlId="sourceFullName" className='form-group'>
              <Form.Label className='lable'>الاسم</Form.Label>
              <Form.Control 
                type="text" 
                name="source_full_name" 
                value={formData.source_full_name} 
                onChange={handleChange} 
                required 
                style={{height:"50px"}}
              />
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="sourceResponsible" className='form-group'>
              <Form.Label className='lable'>مسؤول عن</Form.Label>
              <Form.Control 
                type="text" 
                name="source_responsible" 
                value={formData.source_responsible} 
                onChange={handleChange} 
                required 
                style={{height:"50px"}}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="5" controlId="sourceEmail" className='form-group' >
              <Form.Label className='lable'>البريد الإلكتروني</Form.Label>
              <Form.Control 
                type="email" 
                name="source_email" 
                value={formData.source_email} 
                onChange={handleChange} 
                required 
                style={{borderBottom:"none"}}
              />
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="sourcePassword" className='form-group'>
              <Form.Label className='lable'>كلمة المرور</Form.Label>
              <Form.Control 
                type="password" 
                name="source_password" 
                value={formData.source_password} 
                onChange={handleChange} 
                required 
                style={{borderBottom:"none"}}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="5"controlId="collegeName" className='form-group'>
              <Form.Label className='lable'>اسم الكلية</Form.Label>
              <Form.Control 
                as="select" 
                name="college_id" 
                value={formData.college_id} 
                onChange={handleChange} 
                required 
                style={{height:"50px"}}
              >
                <option value="">اختر الكلية</option>
                {colleges.map((college) => (
                  <option key={college.college_id} value={college.college_id}>
                    {college.college_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="sourceDepartment" className='form-group'>
              <Form.Label className='lable'>القسم</Form.Label>
              <Form.Control 
                as="select" 
                name="source_department_id" 
                value={formData.source_department_id} 
                onChange={handleChange} 
                required 
                style={{height:"50px"}}
              >
                <option value="" >اختر القسم</option>
                {departments.map((department) => (
                  <option key={department.department_id} value={department.department_id} >
                    {department.department_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>
          <Button 
            type="submit" 
            className="btn-submit" 
            style={{backgroundColor:"#091160",width:"35%",marginRight:"170px",marginTop:"20px",padding:"15px",fontWeight:"bold",borderRadius:"18px" }}         >
            تسجيل
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddSource;
