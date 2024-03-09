import React from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import  axios  from 'axios';
import "../styles/AddSource.css"


const AddSource = () => {
    // const [ sourceName, setSourceName] = useState("");
    // const [sourceEmail,  setSourceEmail] = useState("");
    // const [sourcePassword,  setSourcePassword] = useState([]);
    // const [sourceDepartmentId, setSourceDepartmentId] = useState(false);
    // const [sourceCollegeId, setsourceCollegeId] = useState(false);
    // const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    // const [showErrorAlert, setShowErrorAlert] = useState(false);
   
  
    // useEffect(() => {
    //   fetchColleges();
    // }, []);
  
    // const fetchColleges = async () => {
    //   try {
    //     const response = await axios.get(
    //       "http://localhost:9090/university/colleges"
    //     );
    //     setsourceCollegeId(response.data);
    //   } catch (error) {
    //     console.error("Error fetching colleges:", error);
    //   }
    // };



    // useEffect(() => {
    //     fetchDepartment();
    //   }, []);
    
    //   const fetchDepartment = async () => {
    //     try {
    //       const response = await axios.get(
    //         "http://localhost:9090/university/departsments"
    //       );
    //       setsourceCollegeId(response.data);
    //     } catch (error) {
    //       console.error("Error fetching colleges:", error);
    //     }
    //   };
  
    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   const form = event.currentTarget;
    //   if (form.checkValidity() === false) {
    //     event.stopPropagation();
    //   } else {
    //     try {
    //       await axios.post("http://localhost:9090/university/departments", {
    //         department_name: departmentName,
    //         college_name: collegeName,
    //       });
    //       setShowSuccessAlert(true);
    //       // Reset form fields after successful submission
    //       setDepartmentName("");
    //       setCollegeName("");
    //       setValidated(false);
    //     } catch (error) {
    //       console.error("Error adding department:", error);
    //       setShowErrorAlert(true);
    //     }
    //   }
    //   setValidated(true);
    // };


     
    
    return ( 
        <div className='AddSource'>
                
             <Form   className='form'>
                <h1 className='h'>اضافة  ناشر</h1>

                <Row>
                
                <Form.Group as={Col} md="6" controlId="validationCustom01" className='ff7' dir='rtl'>
                  <Form.Label  className='ll2'>الاسم</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    // value={videoTitle}
                    // onChange={(event) => setVideoTitle(event.target.value)}
                    
                  />
                </Form.Group>
              </Row>
              <Row className="rr1">
              <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='ff1'dir='rtl'>
                  <Form.Label className='ll1' > كلمة المرور</Form.Label>
                  <Form.Control
                    className='cc1'
                    required
                    type="text"
                    // value={source}
                    // onChange={(event) => setSource(event.target.value)}
                  
                  />
                </Form.Group>
                </Col>
                <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='ff2' dir='rtl'>
                  <Form.Label  className='ll2'>البريد الالكتروني</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    // value={videoTitle}
                    // onChange={(event) => setVideoTitle(event.target.value)}
                    
                  />
                </Form.Group>
                </Col>
                
              </Row>
              <Row className="mb-3 mt-4 ">
            <Form.Group as={Col} md="8" controlId="categorySelect" dir='rtl'   className="ff3">
              <Form.Select
                aria-label="Default select example"
                // onChange={handleCategoryChange}
                // value={selectedCategory}
              >
                <option value="">اختر التصنيف</option>
                {/* {categoryId.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))} */}
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="rr1">
              <Col>
              <Form.Group controlId="collegeName"  dir='rtl' className='ff1' as={Col} md="3"  >
                   <Form.Label>   قسم</Form.Label>
                     <Form.Select
                      aria-label="Default select example"
                    //   value={collegeName}
                    //   onChange={(e) => setCollegeName(e.target.value)}
                      required
                    //  isInvalid={validated && collegeName.trim() === ""}
                        >
                   <option>اختر قسم</option>
                  {/* {colleges.map((college) => (
              <option key={college.college_name} value={college.college_name}>
                {college.college_name}
              </option>
            ))} */}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            الرجاء اختيار اسم القسم
          </Form.Control.Feedback>
        </Form.Group>
                </Col>
                <Col>
                
                 <Form.Group controlId="collegeName"  dir='rtl' className='ff2' as={Col} md="3"  >
                   <Form.Label>اسم الكلية</Form.Label>
                     <Form.Select
                      aria-label="Default select example"
                    //   value={collegeName}
                    //   onChange={(e) => setCollegeName(e.target.value)}
                      required
                    //  isInvalid={validated && collegeName.trim() === ""}
                        >
                   <option>اختر الكلية</option>
                  {/* {colleges.map((college) => (
              <option key={college.college_name} value={college.college_name}>
                {college.college_name}
              </option>
            ))} */}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            الرجاء اختيار اسم الكلية
          </Form.Control.Feedback>
        </Form.Group>
                </Col>
                
              </Row>
              
               
             
               
              
              <Button
                className="submitbtn1"
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