import React , { useState,useEffect } from 'react';
import Simplert from "react-simplert";
import '../styles/EditArticle2.css' ;
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";


const  EditArticle2 = ({ article, onClose }) => {  
    
  const [formData, setFormData] = useState({
    article_content : article ? article.article_content : "",
    // source_string: article ? article.source_string : "",
    article_address : article ? article.article_address : "",
    source_id: article ? article.source_id : "",
    article_image_path:article?article.article_image_path:"",
    url: article ? `http://localhost:9090/university/articles/${article.article_id}` : null,
  });
    
    
    
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [sources, setSources] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);


  
    useEffect(() => {
      if (!article) {
         
        fetchSources();
      } else {
        setFormData({
          ...formData,
          
          source_id: article.source_id,
        });
      }
    }, [article]);
  
    
    const fetchSources = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/university/sources"
        );
        setSources(response.data);
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
    };
    const handleSourceChange = (event) => {
      setFormData({
        ...formData,
        source_id: event.target.value,
      });
    };
    
    
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Data to be sent:", formData); 
      try {
        const response = await axios.put(formData.url, {
          article_content: formData.article_content,
          // source_string: formData.source_string,
          
          article_address: formData.article_address,
          article_image_path: formData.article_image_path,
          source_id: formData.source_id,

        });
        if ( response && response.status === 200) {
          setShowSuccessAlert(true);
        } else {
          setShowErrorAlert(true);
        }
      } catch (error) {
        console.error("Error updating article:", error);
        setShowErrorAlert(true);
      }
    };


    return (  
        
            
             <div className='EditArticle'>
            
             
             <Form onSubmit={handleSubmit} className='form'>
        {!article && (
          <div>
            
            <Row className="mb-3 mt-4">

            <Col>
               
               <Form.Group as={Col} md="3" controlId="address" className='fff2' dir='rtl'>
                   <Form.Label  className='lll2'>العنوان</Form.Label>
                   <Form.Control
                     required
                     type="text"
                     value={formData.article_address}
                     onChange={(e) =>
                       setFormData({ ...formData, article_address: e.target.value })
                     }
                   />
                 </Form.Group>
               </Col>


              <Col>
              <Form.Group as={Col} md="8" controlId="sourceSelect"  className='fff2'>
                <Form.Label>اختر المصدر</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleSourceChange}
                  value={formData.source_id}
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
          </div>
        )}
        <Form.Group controlId="articleContent"  as={Col} md="6" className="fff4" dir='rtl' >
          <Form.Label> المقال  </Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            required
            value={formData.article_content}
            onChange={(e) =>
              setFormData({ ...formData, article_content: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="image"  className="fff3" as={Col} md="6" dir='rtl'>
          <Form.Label>   اختر صورة </Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Row>
          <Col>
        <Button variant="primary" type="submit" className='btn7' >
          حفظ  
        </Button>{" "}
        </Col>
        <Col>
        
        <Button variant="secondary" onClick={onClose} className='btn8'>
          إلغاء
        </Button>
        </Col>
        </Row>
      </Form>
  

            <Simplert
        showSimplert={showErrorAlert}
        type="error"
        title="Failed"
        message="حدث خطأ ما يرجي اعادة المحاولة"
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
        
    );
}
 
export default  EditArticle2;