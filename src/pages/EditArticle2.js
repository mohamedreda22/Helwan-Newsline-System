import React , { useState } from 'react';
 
import '../styles/EditArticle2.css' ;
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";


const  EditArticle2 = () => {  
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
            
             <div className='EditArticle'>
            
             
             <Form noValidate validated={validated} onSubmit={handleSubmit} className='form'>
                <h1 className='hhh1'> تعديل مقال</h1>
              <Row className="rrr1">
              <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='fff1'dir='rtl'>
                  <Form.Label className='lll1' > المصدر</Form.Label>
                  <Form.Control
                    className='ccc1'
                    required
                    type="text"
                    onChange={(event) => setSource(event.target.value)}

                  />
                </Form.Group>
                </Col>
                <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='fff2' dir='rtl'>
                  <Form.Label  className='lll2'>العنوان</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </Form.Group>
                </Col>
                
              </Row>
              <Row>
              <Form.Group controlId="formFileLg" className="fff3" as={Col} md="6" dir='rtl'>
                <Form.Label  className='lll3'>رفع الصورة</Form.Label>
                <Form.Control type="file" size="lg" />
             </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="6" controlId="validationCustom02" className="fff4" dir='rtl'>
                  <Form.Label  className='lll4'> المقال</Form.Label>
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
                className="d-flex justify-content-center submitbtn3"
                type="submit"
              >
                 حفظ  
              </Button>
            </Form>
            </div>
        </div>
    );
}
 
export default  EditArticle2;