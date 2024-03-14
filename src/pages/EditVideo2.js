import React , { useState, useCallback, useEffect } from 'react';
import axios from "axios";
import '../styles/EditVideo2.css' ;
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
//import { useDropzone } from 'react-dropzone';
import Simplert from "react-simplert";



function EditVideo2 ({ videoId,onClose }) {
  const [formData, setFormData] = useState({
    video_title :  "",
    video_description :   "",
    source_string:   "",
    source_id:  "",
    video_path: "",
    category_id: "",
    url: `http://localhost:9090/university/videos/${videoId}`
  });



  const [sources, setSources] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    fetchCategories();
    fetchSources();
    fetchVideos();
  }, [videoId]);
  
  const fetchCategories = async () => {
  try {
      const response = await axios.get('http://localhost:9090/university/categories');
      setCategories(response.data);
  } catch (error) {
      console.error('Error fetching categories:', error);
  }
  };
  
  const fetchSources = async () =>{
  try {
      const response = await axios.get('http://localhost:9090/university/sources');
      setSources(response.data)
  }
  catch(error){
      console.error('Error fetching sources:', error);
  }
  };

 

const fetchVideos = async () => {
  try {
    const response = await axios.get(formData.url);
    const videoData = response.data;
    setFormData({
      ...formData,
      video_title: videoData.video_title,
      video_description: videoData.video_description,
      video_path: videoData.video_path,
      source_id: videoData.source_id.toString(),
      source_string: videoData.source_string,
      category_id: videoData.category_id,
    });
  } catch (error) {
    console.error("Error fetching video:", error);
    setShowErrorAlert(true);
  }
};




 

const handleFileChange = (event) => {
    const file =  event.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
         setFormData({
          ...formData,
          video_path:reader.result,
         });
      };
      reader.readAsDataURL(file);
    
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(formData.url, {
        video_title: formData.video_title,
        video_description: formData.video_description,
        video_path: formData.video_path,
        source_id: formData.source_id.toString(),
        source_string: formData.source_string,
        category_id: formData.category_id,
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
      console.error("Error updating video:", error);
      setShowErrorAlert(true);
    }
  };


  
    return (  
        <div >
              
             <div className='EditVideo'>
             
             <Form  onSubmit={handleSubmit} className='form'>
                
               
               


              <Row className="mb-3 mt-4">
            <Col>
               <Form.Group as={Col} md="3" controlId="videoAddress" className='ffff1' dir='rtl'>
                   <Form.Label  className='llll1'>العنوان</Form.Label>
                   <Form.Control
                     required
                     type="text"
                     value={formData.article_address}
                     onChange={handleInputChange}
                     name="article_address"
                   />
                 </Form.Group>
               </Col>
               <Col>

               <Form.Group as={Col} md="3" controlId="sourceString" className='ffff2' dir='rtl'>
                   <Form.Label  className='llll2'> المصدر</Form.Label>
                   <Form.Control
                     required
                     type="text"
                     value={formData.source_string}
                     onChange={handleInputChange}
                     name="source_string"
                   />
                 </Form.Group>
               </Col>


              <Col>
              <Form.Group as={Col} md="8" controlId="sourceId"  className='ffff9'>
                <Form.Label>اختر المصدر</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={formData.source_id}
                  onChange={handleInputChange}
                  name="source_id"  
                >
                  {sources.map((source) => (
                    <option key={source.source_id} value={source.source_id}>
                      {source.full_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              </Col>
            
            </Row>
              <Form.Group md="8" controlId="categorySelect" className="ffff9" dir='rtl'>
            <Form.Select
              aria-label="Default select example"
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
            >
              <option value="">اختر التصنيف</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
              <Row>
                <Form.Group as={Col} md="6" controlId="videoDescription" className="ffff4" dir='rtl'>
                  <Form.Label  className='llll4'>   الوصف</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    name="video_description"
                    value={formData.video_description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Row>
               
              <Row>
              
                 <Form.Group controlId="formFileLg" className="ffff3" as={Col} md="6" dir='rtl'>
                <Form.Label  className='l3'> اختار فيديو  </Form.Label>
                <Form.Control
                 type="file"
                 id="video_path "
                 name="video_path "   
                 onChange={handleFileChange}
                  
                   />
                 
             </Form.Group>
              </Row> 
              
              <Button className="btnn1"   type="submit">  حفظ  </Button>
              <Button variant="secondary" onClick={onClose}className="btnn2" >إلغاء</Button>
              
            </Form>

            
            <Simplert
        showSimplert={showErrorAlert}
        type="error"
        title="Failed"
        message="حدث خطأ  حاول مرة اخري      "
        onClose={() => setShowErrorAlert(false)}
        customCloseBtnText="اغلاق"
      />
      <Simplert
        showSimplert={showSuccessAlert}
        type="success"
        title="Success"
        message="تم التعديل بنجاح"
        onClose={() => setShowSuccessAlert(false)}
        customCloseBtnText="تم"
      />
            </div>
        </div>
    );

}
export default  EditVideo2;