 
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "../styles/EditArticle.css"
const EditArticle = () => {

    // const [file, setFile] = useState(null);
      
    // const handleFileChange = (e) => {
    //   setFile(e.target.files[0]);
    // };
  
    // const handleUpload = () => {
    //   // قم بتنفيذ رمز الرفع هنا، يمكنك استخدام مكتبة axios أو fetch للقيام بذلك
    //   console.log('تم رفع الصورة:', file);
    // };
    const onDrop = useCallback(acceptedFiles => {
        // هنا يمكنك التعامل مع الملفات المقبولة (acceptedFiles)
        // مثلاً، يمكنك إجراء إرسال الصورة إلى الخادم أو عرضها مباشرة في التطبيق
        console.log(acceptedFiles);
      }, []);
    
      const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    
    
    return ( 
        <div>
            <h1>تعديل المقال</h1>
            <Form dir='rtl'>
      <Form.Group className="mb3" controlId="exampleForm.ControlInput1">
        <Form.Label className='fl'>  العنوان</Form.Label>
        <Form.Control  className='fc' type="text"  />
      </Form.Group>
      <Form.Group  className="mb4" controlId="exampleForm.ControlInput1">
        <Form.Label className='fl' >  المصدر</Form.Label>
        <Form.Control  className='fc' type=" text"   />
      </Form.Group>
      <Form>
      {/* <Form.Group controlId="formImage">
        <Form.File 
          id="custom-file"
          label="اختر صورة"
          onChange={handleFileChange}
          custom
        />
      </Form.Group> */}
      {/* <Button variant="primary" onClick={handleUpload}>
        رفع الصورة
      </Button> */}
    </Form>

    <div className="fp">
                        <label className="lable3" htmlFor="event_image_path" ></label>
                              {/* <br></br>  <span style={{color: 'red'}}>
                                    disabled cause of backend API handle
                                </span> */}
                    <div {...getRootProps()} style={ {
                                border: 'none',
                                borderRadius: '4px',
                                padding: '20px',
                                 textAlign: 'center',
                                  cursor: 'pointer',
                                  width:'750px',
                                  height:'79px',
                                  marginRight:'-220px',
                                  backgroundColor:' rgb(218, 212, 212)'

                                  }}>
                          <input {...getInputProps()} />
                                {isDragActive ? (
                        <p>قم بإسقاط الملف هنا...</p>
                                     ) : (
                                    <p className='fl2'>       
                                        <span className="material-icons-outlined">file_upload</span>    
                                        رفع الصورة  
                                        
                                            </p>
                         )}
                                     </div>

     
                                          

 
 
                 </div>
       
      <Form.Group className="mb5" controlId="exampleForm.ControlTextarea1">
        <Form.Label className='fl'>   المقال</Form.Label>
        <Form.Control  className='fcc' as="textarea" rows={3} />

      </Form.Group>
      <Button className="b1" variant="primary"> حفظ</Button>{' '}
      <Button className="b2" variant="light"> الغاء الامر</Button>{' '}
    </Form>
        </div>
     );
}
 
export default EditArticle;