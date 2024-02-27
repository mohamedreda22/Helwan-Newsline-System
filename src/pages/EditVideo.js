import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "../styles/EditVideo.css"


const EditVideo = () => {

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the video file, like upload it to a server
        console.log(acceptedFiles);
      }, []);

      const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'video/*' });
    return (  
        <div>
        <h1>تعديل  فيديو</h1>
        <Form dir='rtl'>
  <Form.Group className="mb3" controlId="exampleForm.ControlInput1">
    <Form.Label className='fl'>  العنوان</Form.Label>
    <Form.Control  className='fc' type="text"  />
  </Form.Group>
  <Form.Group  className="mb4" controlId="exampleForm.ControlInput1">
    <Form.Label className='fl' >  المصدر</Form.Label>
    <Form.Control  className='fc' type=" text"   />
  </Form.Group>

  <Form.Group  className="mb5" controlId="exampleForm.ControlInput1">
    <Form.Label className='fl' >   التصنيف</Form.Label>
    <Form.Control  className='fc2' type=" text"   />
  </Form.Group>


  <Form.Group  className="mb6" controlId="exampleForm.ControlInput1">
    <Form.Label className='fl' >   الوصف</Form.Label>
    <Form.Control  className='fc3' type=" text"   />
  </Form.Group>

  <div {...getRootProps()} style={{
                        
                        borderRadius: '4px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        height:'180px',
                        backgroundColor: 'rgb(218, 212, 212)',
                        width:'70%',
                        marginRight:'200px',


                    }}>
                      <input {...getInputProps()} />
                      <p className='v1'> 
                      <span className="material-icons-outlined">file_upload</span>
                        اختار الفيديو 
                      </p>
                    </div>
                 <div></div>
                 <Button className="b1" variant="primary"> حفظ</Button>{' '}
              <Button className="b2" variant="light"> الغاء الامر</Button>{' '}
  </Form>
  
    </div>
    );
}
 
export default EditVideo;