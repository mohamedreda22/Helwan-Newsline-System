import React, { useState, useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import  axios  from 'axios';
import "../styles/AddSource.css"
import NavbarSource from '../layouts/NavbarSource';


function AddSource  () {
  const [formData, setFormData] = useState({
    source_full_name: " ", 
    source_email: " ",
    source_password: " ",
    source_department_id: "",
    college_id: "",
});

const [colleges, setColleges] = useState([]);
const [departments , setDepartments] = useState([]);

useEffect(() => {
  fetchCollege();
  fetchDepartment();
}, []);


const fetchCollege = async () => {
  try {
      const response = await axios.get('http://localhost:9090/university/colleges');
      setColleges(response.data);
  } catch (error) {
      console.error('Error fetching colleges:', error);
  }
};

const fetchDepartment = async () => {
  try {
      const response = await axios.get('http://localhost:9090/university/departments');
      setDepartments(response.data);
  } catch (error) {
      console.error('Error fetching departments:', error);
  }
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
      ...formData,
      [name]: value,
  });
};

const handleSubmit = async (event) => {
  event.preventDefault();
  

  try {
     
    const response = await axios.post(
      'http://localhost:9090/university/sources', formData);

    if (response && (response.status === 200||response.status === 201)) {
      console.log(formData);
      alert("Added successfully!");
      resetForm();
    } else {
      alert("An error occurred while adding the  source");
    }
  } catch (error) {
    console.error("Error adding source:", error);
    alert("Error: " + error.message);
  }
};
const resetForm = () => {
  setFormData({
    source_full_name: " ", 
    source_email: " ",
    source_password: " ",
    source_department_id: "",
    college_id: "",
 
});
};


    return ( 
        <div className='AddSource'>
                <NavbarSource/>
             <Form   className='form' onSubmit={handleSubmit}>
                <h1 className='s'>اضافة  ناشر</h1>

                <Row>
                
                <Form.Group as={Col} md="6" controlId="validationCustom01" className='s1' dir='rtl'>
                  <Form.Label  className='s2'>الاسم</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={formData.source_full_name}
                    onChange={handleChange}
                    name="source_full_name"
                  />
                </Form.Group>
              </Row>
              <Row className="rr1">
              <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='s3'dir='rtl'>
                  <Form.Label className='s4' > كلمة المرور</Form.Label>
                  <Form.Control
                    className='s5'
                    required
                    type="text"
                    value={formData.source_password}
                    onChange={handleChange}
                    name="source_password"
                  />
                </Form.Group>
                </Col>
                <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='s6' dir='rtl'>
                  <Form.Label  className='s7'>البريد الالكتروني</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={formData.source_email}
                    onChange={handleChange}
                    name="source_email"
                  />
                </Form.Group>
                </Col>
                
              </Row>
               
          <Row className="rr1">
              <Col>
              <Form.Group controlId="departmentSelect"  dir='rtl' className='s9' as={Col} md="3"  >
                   <Form.Label>   قسم</Form.Label>
                     <Form.Select
                      aria-label="Default select example"
                      value={formData.source_department_id}
                     onChange={handleChange}
                    name="source_department_id"  
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
                
                 <Form.Group controlId="collegeName"  dir='rtl' className='s10' as={Col} md="3"  >
                   <Form.Label>اسم الكلية</Form.Label>
                     <Form.Select
                      aria-label="Default select example"
                      value={formData.college_id}
                      onChange={handleChange}
                      name="college_id"  
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
     );
}
 
export default AddSource;