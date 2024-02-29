import React , { useState } from 'react';
import SideBar from '../components/SideBar';
import '../styles/AddArticle3.css' ;
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";


const AddArticle4 = () => {  
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState("");
    const [source , setSource] = useState("");
    const [article , setArticle] = useState("");
    // const [showPopup, setShowPopup] = useState(false);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }
      setValidated(true);
    };
  
    // const handlePopupToggle = () => {
    //   setShowPopup(!showPopup);
    // };
  
    // const handleClosePopup = () => {
    //   setShowPopup(false);
    // };





    return (  
        <div >
             <SideBar/>
             <div className='AddArticle'>
             <p className='p1'>المقالات</p>
             <Form noValidate validated={validated} onSubmit={handleSubmit} className='form'>
                <h1 className='h1'>اضافة مقال</h1>
              <Row className="r1">
              <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='f1'dir='rtl'>
                  <Form.Label className='l1' > المصدر</Form.Label>
                  <Form.Control
                    className='c1'
                    required
                    type="text"
                    onChange={(event) => setSource(event.target.value)}

                  />
                </Form.Group>
                </Col>
                <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='f2' dir='rtl'>
                  <Form.Label  className='l2'>العنوان</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </Form.Group>
                </Col>
                
              </Row>
              <Row>
              <Form.Group controlId="formFileLg" className="f3" as={Col} md="6" dir='rtl'>
                <Form.Label  className='l3'>رفع الصورة</Form.Label>
                <Form.Control type="file" size="lg" />
             </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="6" controlId="validationCustom02" className="f4" dir='rtl'>
                  <Form.Label  className='l4'> المقال</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    type="text"
                    onChange={(event) => setArticle(event.target.value)}
                  />
                </Form.Group>
              </Row>
              <Button
                className="d-flex justify-content-center submitbtn"
                type="submit"
              >
                 حفظ  
              </Button>
            </Form>
            </div>
        </div>
    );
}
 
export default AddArticle4;