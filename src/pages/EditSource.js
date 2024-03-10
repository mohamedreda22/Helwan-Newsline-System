import React from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import  axios  from 'axios';
import "../styles/EditSource.css"
import delete_icon from "../assets/icons/delete.svg";
import Swal from "sweetalert2";


const EditSource = () => {
    const handleDeleteSource = async (articleId) => {
        Swal.fire({
          title: "هل أنت متأكد من حذف هذا   الناشر؟",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonText: "إلغاء",
          cancelButtonColor: "#d33",
          confirmButtonText: "حذف",
        })}
    return (  

        <div className='EditSource'>
            <Form   className='form'>
               <Row>
                <Col>
                <h1 className='ss' dir='rtl'>تعديل  ناشر</h1>
                <td>
                   <img
                     src={delete_icon}
                     alt="Delete post"
                    className="icon"
                    color="red"
                    onClick={() =>  handleDeleteSource()}
                    />
                </td>
                </Col>
               </Row>

                <Row>
                
                <Form.Group as={Col} md="6" controlId="validationCustom01" className='ss1' dir='rtl'>
                  <Form.Label  className='ss2'>الاسم</Form.Label>
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
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='ss3'dir='rtl'>
                  <Form.Label className='s4' > كلمة المرور</Form.Label>
                  <Form.Control
                    className='ss5'
                    required
                    type="text"
                    // value={source}
                    // onChange={(event) => setSource(event.target.value)}
                  
                  />
                </Form.Group>
                </Col>
                <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='ss6' dir='rtl'>
                  <Form.Label  className='ss7'>البريد الالكتروني</Form.Label>
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
            <Form.Group as={Col} md="8" controlId="categorySelect" dir='rtl'   className="ss8">
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
              <Form.Group controlId="collegeName"  dir='rtl' className='ss9' as={Col} md="3"  >
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
                
                 <Form.Group controlId="collegeName"  dir='rtl' className='ss10' as={Col} md="3"  >
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
                className="btn2"
                type="submit"
                variant='primary'
              >
                  حفظ  
              </Button>
              
            </Form>
        </div>
    );
}
 
export default EditSource;