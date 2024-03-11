import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import '../styles/AddArticle3.css';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from 'axios';

const AddArticle4 = () => {
  const [articleContent, setArticleContent] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  //const [source, setSource] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [sources, setSources] = useState([]);
  
  useEffect(() => {
    fetchSources();
  }, []);

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

  const handleFileChange = (event, dataSetter) => {
    const file = event ? event.target.files[0] : null;
    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        dataSetter(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      dataSetter(null);
    }
  };

  const handleCombinedFileChange = (event) => {
    handleFileChange(event, setImage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const data = {
        article_address: address,
        source_string: selectedSource,
        article_content: articleContent,
        article_image_path: image ? image.name : null,
        source_id: selectedSource,
      };

      console.log("Data to be sent to backend:", data);

      const response = await axios.post(
        'http://localhost:9090/university/articles', data);

      if (response && (response.status === 200||response.status === 201)) {
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

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
  };

  const resetForm = () => {
    setArticleContent("");
    setImage(null);
    setAddress("");
    setSelectedSource("");
  };

  return (
    <div>
      <SideBar />
      <div className='AddArticle'>
        <p className='p1'>المقالات</p>
        <hr className='hr1' />
        <h1 className='h1'>اضافة مقال</h1>
        <Form className='form' onSubmit={handleSubmit}>
          <Row className="r1">
            <Col>
            <Form.Group as={Col} md="3" controlId="validationCustom01" className='f1' dir='rtl'>
              <Form.Label className='l1'>المصدر</Form.Label>
              <Form.Select
                className='c1'
                required
                value={selectedSource}
                onChange={handleSourceChange}
              >
                <option value="">اختر المصدر</option>
                {sources.map((source) => (
                  <option key={source.source_id} value={source.source_id}>
                    {source.full_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            </Col>
            <Col>
              <Form.Group as={Col} md="3" controlId="validationCustom01" className='f2' dir='rtl'>
                <Form.Label className='l2'>العنوان</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group as={Col} md="6" controlId="formFileMultiple" className="f3" dir='rtl'>
              <Form.Label> اختر صورة </Form.Label>
              <Form.Control
                type="file"
                onChange={handleCombinedFileChange}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="6" controlId="validationCustom02" className="f4" dir='rtl'>
              <Form.Label className='l4'> المقال</Form.Label>
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
          <Button
            className="btn1"
            type="submit">
            حفظ
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddArticle4;
