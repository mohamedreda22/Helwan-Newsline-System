import React , { useState, useEffect, useRef } from 'react';
import SideBar from '../components/SideBar';
import '../styles/AddArticle3.css' ;
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import  axios  from 'axios';

const AddArticle4 = () => {  
  
  
 
  // const article_image_path=useRef(null);


  



//////////
  const   [ArticleContent, setArticleContent ] = useState("");
  const   [ Address,   setAddress ] = useState("");
  const   [image, setImage] = useState(null);
  const   [source, setSource] = useState("");
  const   [sourceId, setSourceId] = useState([]);
  const   [selectedSource, setSelectedSource] = useState("");

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





  const handleFileChange = (event, data) => {
    const file = event ? event.target.files[0] : null; 
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        setImage(reader.result);
        if (data) {
          data(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else if (data) {
      data(null);
    }
};
  const handleCombinedFileChange = (event) => {
    handleFileChange(event, (imageData) => {
      setImage(imageData); 
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      console.log("Data to be sent to backend:", {
          article_address:Address,
          source_string: source,
          article_content:  ArticleContent,
          article_image_path: image ? image.name : null,
          source_id: selectedSource,
      });

      const response = await axios.post(
        'http://localhost:9090/university/articles',
        {
          article_address:Address,
          source_string: source,
          article_content:  ArticleContent,
          article_image_path: image ?  image.article_image_path : null,
          source_id: selectedSource,
      });


      
      if (response && response.status === 200) {
        console.log(" Article added successfully:", response.data);
        alert("Added successfully!");
        resetForm();
      } else {
        alert("An error occurred while adding the  article");
      }
    } catch (error) {
      console.error("Error adding article:", error);
      alert("Error: " + error.message);
    }
  };

  const resetForm = () => {
    setArticleContent("");
    setImage(null);
    setAddress("");
    //setSource("");
    setSelectedSource("");
  };
    return (  
        <div >
             <SideBar/>
             <div className='AddArticle'>
             <p className='p1'>المقالات</p>
             <hr className='hr1'/>
             <h1 className='h1'>اضافة مقال</h1>
             <Form   className='form' onSubmit={handleSubmit}>
                
              <Row className="r1">
              <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='f1'dir='rtl'>
                  <Form.Label className='l1' > المصدر</Form.Label>
                  <Form.Control
                    className='c1'
                    required
                    type="text"
                    value={ source }
                    onChange={(event) => setSource (event.target.value)}

                  />
                </Form.Group>
                </Col>
                <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='f2' dir='rtl'>
                  <Form.Label  className='l2'>العنوان</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={Address }
                    onChange={(event) => setAddress (event.target.value)}
                     
                  />
                </Form.Group>
                </Col>
                
              </Row>
              <Row>
              
             <Form.Group  as={Col} md="6" controlId="formFileMultiple" className="f3"  dir='rtl' >
            <Form.Label> اختر صورة </Form.Label>
            <Form.Control
              type="file"
              onChange={(event) => handleCombinedFileChange(event)}
            />
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
                    value={ArticleContent}
                    onChange={(event) => setArticleContent(event.target.value)}
                  />
                </Form.Group>
              </Row>
              <Button
                className="btn1"
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