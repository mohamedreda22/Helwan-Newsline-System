import React , { useState,useEffect } from 'react';
import Simplert from "react-simplert";
import '../styles/EditArticle2.css' ;
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";


const  EditArticle2 = ({ article, onClose }) => {  
    
    const [articleAddress,  setArticleAddress] = useState("");
    const [sourceString, setSourceString] = useState("");
    const [articleContent, setArticleContent] = useState("" );
    const [source, setSource] = useState("");
    const [sourceId, setSourceId] = useState([]);
    const [selectedSource, setSelectedSource] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [sources, setSources] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);


  
    useEffect(() => {
      
      fetchSources();
    }, []);
  
    
    const fetchSources = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/university/sources"
        );
        setSourceId(response.data);
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
    };
  
    
    const handleSourceChange = (event) => {
      setSelectedSource(event.target.value);
    };
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("article_address", articleAddress);
      formData.append("source_string", sourceString);
      formData.append("article_content", articleContent);
      formData.append("source_id", selectedSource);
     
      if (selectedFile) {
        formData.append("article_image_path", selectedFile);
      }
      try {
        await axios.put(
          `http://localhost:9090/university/articles/${article.article_id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setShowSuccessAlert(true);
        onClose();
      } catch (error) {
        console.error("Error updating article:", error);
        setShowErrorAlert(true);
      }
    };
     




    return (  
        
            
             <div className='EditArticle'>
            
             
             <Form onSubmit={handleSubmit} className='form'>
              
              <Row className="rrr1">
              <Col>
                
                <Form.Group as={Col} md="3" controlId="sourceString " className='fff1'dir='rtl'>
                  <Form.Label className='lll1' > المصدر</Form.Label>
                  <Form.Control
                    className='ccc1'
                    required
                    type="text"
                    value={sourceString}
                    onChange={(event) => setSourceString(event.target.value)}

                  />
                </Form.Group>
                </Col>
                <Col>
                
                <Form.Group as={Col} md="3" controlId="articleAddress" className='fff2' dir='rtl'>
                  <Form.Label  className='lll2'>العنوان</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={articleAddress}
                    onChange={(event) => setArticleAddress(event.target.value)}
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
                <Form.Group as={Col} md="6" controlId="articleContent" className="fff4" dir='rtl'>
                  <Form.Label  className='lll4'> المقال</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    type="text"
                    value={articleContent}
                    onChange={(event) => setArticleContent(event.target.value)}
                  />
                </Form.Group>
              </Row>
              <Button variant="primary" type="submit">   حفظ التغييرات </Button>{" "}
             <Button variant="secondary" onClick={onClose}> إلغاء   </Button>
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