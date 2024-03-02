import React , { useState, useCallback } from 'react';
import SideBar from '../components/SideBar';
import '../styles/EditVideo2.css' ;
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDropzone } from 'react-dropzone';


const  EditVideo2 = () => {  
    const [validated, setValidated] = useState(false);
    const [title, setTitle] = useState("");
    const [source , setSource] = useState("");
    const [ description, setDescription] = useState("");
    const [classification, setClassification] = useState("");
    const [ video , setVideo] = useState("");
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


    const onDrop = useCallback(acceptedFiles => {
        // Do something with the video file, like upload it to a server
        console.log(acceptedFiles);
      }, []);
    
      const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'video/*' });
    


    return (  
        <div >
             <SideBar/>
             <div className='EditVideo'>
             
             <Form noValidate validated={validated} onSubmit={handleSubmit} className='form'>
                <h1 className='hhhh1'> تعديل  فيديو</h1>
              <Row className="rrrr1">
              <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='ffff1'dir='rtl'>
                  <Form.Label className='llll1' > المصدر</Form.Label>
                  <Form.Control
                    className='cccc1'
                    required
                    type="text"
                    onChange={(event) => setSource(event.target.value)}

                  />
                </Form.Group>
                </Col>
                <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='ffff2' dir='rtl'>
                  <Form.Label  className='llll2'>العنوان</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </Form.Group>
                </Col>
                
              </Row>
              <Row>
                 <Form.Group  as={Col} md="6"  controlId="exampleForm.SelectCustom"className="ffff3" dir='rtl'>
                    <Form.Label>   التصنيف</Form.Label>
                    <Form.Select custom>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                      <option value="4">Option 4</option>
                      <option value="5">Option 5</option>
                    </Form.Select>
                  </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="6" controlId="validationCustom02" className="ffff4" dir='rtl'>
                  <Form.Label  className='llll4'>   الوصف</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    type="text"
                    onChange={(event) => setClassification(event.target.value)}
                  />
                </Form.Group>
              </Row>
               
              <Row>
              <div {...getRootProps()} style={{
                        
                        borderRadius: '4px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        height:'180px',
                        backgroundColor:'white',
                        width:'660px',
                        marginLeft:'300px',
                        marginBottom:'50px'


                    }}>
                      <input {...getInputProps()} />
                      <p> 
                      <span className="material-icons-outlined">file_upload</span>
                        اختار الفيديو 
                      </p>
                    </div>
              </Row>
              
              <Button
                className="d-flex justify-content-center submitbtnn4"
                type="submit"
              >
                 حفظ  
              </Button>
              
            </Form>
            </div>
        </div>
    );
}
 
export default  EditVideo2;