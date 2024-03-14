import React , { useState, useEffect }from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import  axios  from 'axios';
import "../styles/EditSource.css"
 
import Simplert from "react-simplert";


const EditSource = ({ sourceId, onClose }) => {
  const [formData, setFormData] = useState({
    source_full_name: "",
    source_email: "",
    source_password: "",
    source_department_id: "",
    college_id: "",
    url: `http://localhost:9090/university/sources/${sourceId}`,
  });

  const [colleges, setColleges] = useState([]);
  const [departments , setDepartments] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    fetchCollege();
    fetchDepartment();
    fetchSources();
  }, [sourceId]);
  
  
  const fetchCollege = async () => {
    try {
        const response = await axios.get
        ('http://localhost:9090/university/colleges');
        setColleges(response.data);
    } catch (error) {
        console.error('Error fetching colleges:', error);
    }
  };
  
  const fetchDepartment = async () => {
    try {
        const response = await axios.get
        ('http://localhost:9090/university/departments');
        setDepartments(response.data);
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
  };
  const fetchSources = async () => {
    try {
      const response = await axios.get(formData.url);
      const sourceData = response.data;
      setFormData({
        ...formData,
        source_full_name: sourceData.source_full_name,
        source_email: sourceData.source_email,
        source_password: sourceData.source_password,
        source_department_id: sourceData.source_department_id.toString(),
        college_id: sourceData.college_id.toString(),
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
        source_department_id: formData.source_department_id.toString(),
        college_id: formData.college_id.toString(),
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

        <div className='EditSource'>
            <Form   className='form' onSubmit={handleSubmit}>
                <Row>
                  <Form.Group as={Col} md="10" controlId="sourcefullname" className='ss1' dir='rtl'>
                  <Form.Label  className='ss2'>الاسم</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="source_full_name"
                    value={formData.source_full_name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Row>
              <Row className="rr1">
              <Col>
                
                <Form.Group as={Col} md="6" controlId="sourcepassword" className='ss3'dir='rtl'>
                  <Form.Label className='s4' > كلمة المرور</Form.Label>
                  <Form.Control
                    className='ss5'
                    required
                    type="text"
                    name="source_password"
                    value={formData.source_password}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                </Col>
                <Col>
                
                <Form.Group as={Col} md="6" controlId="sourceemail" className='ss6' dir='rtl'>
                  <Form.Label  className='ss7'>البريد الالكتروني</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="source_email"
                    value={formData.source_email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                </Col>
                
              </Row>
              
          <Row className="rr1">
              <Col>
              <Form.Group controlId="sourcedepartmentid"  dir='rtl' className='ss9' as={Col} md="6"  >
                   <Form.Label>   قسم</Form.Label>
                     <Form.Select
                      aria-label="Default select example"
                      name="source_department_id"
                      value={formData.source_department_id}
                      onChange={handleInputChange}
                      required
                        >
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
                
                 <Form.Group controlId="collegeid"  dir='rtl' className='ss10' as={Col} md="6"  >
                   <Form.Label>اسم الكلية</Form.Label>
                     <Form.Select
                      aria-label="Default select example"
                      name="college_id"
                      value={formData.college_id}
                      onChange={handleInputChange}
                      required
                    
                        >
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
                className="btn2"
                type="submit"
                variant='primary'
              >
                  حفظ  
              </Button>
              
            </Form>


            <Simplert
        showSimplert={showErrorAlert}
        type="error"
        title="فشل"
        message="حدث خطأ أثناء تحديث الناشر. يرجى المحاولة مرة أخرى."
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
}
 
export default EditSource;