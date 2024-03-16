import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import '../styles/AddArticle3.css';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from 'axios';

 
  

function AddArticle3 () {
  const [formData, setFormData] = useState({
      article_address : "",
      article_content : "",
      source_string:"",
      source_id: "",
      article_image_path : "",
  });

  const [sources, setSources] = useState([]);

  useEffect(()=>{
      fetchSources();
  },[]);

  const fetchSources = async () =>{
    try {
        const response = await axios.get
        ('http://localhost:9090/university/sources');
        setSources(response.data)
    }
    catch(error){
        console.error('Error fetching sources:', error);
    }
};


const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
      ...formData,
      [name]: value,
  });
};

const handleFileChange = (event) => {
      const file =  event.target.files[0];
      const reader = new FileReader();
      if (file) {
        reader.onloadend = () => {
           setFormData({
            ...formData,
            article_image_path:reader.result,
           });
        };
        reader.readAsDataURL(file);
      
      }
    };

    const handleSubmit = async (event) => {
    event.preventDefault();
    

    try {
       
      const response = await axios.post(
        'http://localhost:9090/university/articles', formData);

      if (response && (response.status === 200||response.status === 201)) {
        console.log(formData);
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
      setFormData({
        article_address: "",
        source_string: "",
        article_content: "",
        article_image_path: "",
        source_id: "",
     
    });
  };

  return (
    <div className='allpage'>
      <SideBar /> 
      <div className='AddArticle'>
        <p className='pp1'>المقالات</p>
        <hr className='hr1' />
        <h1 className='h1'>اضافة مقال</h1>
        <Form className='form' onSubmit={handleSubmit}>
          <Row className="r1">
            <Col>
            
             <Form.Group as={Col} md="3" controlId="validationCustom01" className='f1' dir='rtl'>
                <Form.Label className='a'>المصدر</Form.Label>
                <Form.Control
                className='rounded-0'
                  required
                  type="text"
                  value={formData.source_string}
                  onChange={handleChange}
                  name="source_string"
                />
              </Form.Group>

            </Col>
            <Col>
              <Form.Group as={Col} md="3" controlId="validationCustom01" className='f2' dir='rtl'>
                <Form.Label className='a'>العنوان</Form.Label>
                <Form.Control
                className='rounded-0'
                  required
                  type="text"
                  value={formData.article_address}
                  onChange={handleChange}
                  name="article_address"
                  style={{width:"200px"}}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
         < Form.Group as={Col} md="3" controlId="sourceSelect" className='f9' dir='rtl'>
              <Form.Select
              aria-label='Default select example'
              className='rounded-0'
                value={formData.source_id}
                onChange={handleChange}
                name="source_id"   
              >
                <option value="">اختر المصدر</option>
                {sources.map((source) => (
                  <option key={source.source_id} value={source.source_id}>
                    {source.full_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6" controlId="formFileMultiple" className="f3" dir='rtl' >
              <Form.Label  className='a' > اختر صورة </Form.Label>
              <Form.Control
              className='rounded-0'
                type="file"
                id="article_image_path"
                name="article_image_path"   
                onChange={handleFileChange}
                
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6" controlId="validationCustom01" className="f4" dir='rtl' >
              <Form.Label className='a'> المقال</Form.Label>
              <Form.Control
              className='rounded-0'
                as="textarea"
                rows={3}
                required
                value={formData.article_content}
                onChange={handleChange}
                name="article_content"   
                style={{  height: '300px'}}
              />
            </Form.Group>
          </Row>
          <Button
            className="button"
            type="submit">
            حفظ
          </Button>
        </Form>
      </div>
    </div>
  );
}


export default AddArticle3;