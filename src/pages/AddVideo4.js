import React , { useState, useCallback, useRef, useEffect } from 'react';
import SideBar from '../components/SideBar';
import '../styles/AddVideo4.css' ;
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDropzone } from 'react-dropzone';
import  axios  from 'axios';

const AddVideo4 = () => {  
  

  
    
  
  const   [ videoTitle  , setVideoTitle  ] = useState("");
  const   [ videoDescription,setVideoDescription     ] = useState("");
  const   [video, setVideo] = useState(null);
  const   [source, setSource] = useState("");
  const   [sourceId, setSourceId] = useState([]);
  const   [selectedSource, setSelectedSource] = useState("");
  const   [categoryId, setCategoryId] = useState([]);
  const   [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    fetchCategories();
    fetchSources();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/categories"
      );
      setCategoryId(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await axios.post(
        "http://localhost:9090/university/videos",
        {
          video_title:videoTitle,
          video_description:videoDescription,
          source_string: source,
          category_id: selectedCategory,
          video_path : video ? video.name : null,
          source_id: selectedSource,
        }
      );
      if (response && response.status === 200) {
        console.log(" Video added successfully:", response.data);
        alert("Added successfully!");
        resetForm();
      } else {
        alert("An error occurred while adding the  video");
      }
    } catch (error) {
      console.error("Error adding video:", error);
      alert("Error: " + error.message);
    }
  };

  const resetForm = () => {
     setVideoTitle("");
     setVideoDescription("");
    setVideo(null);
    setSelectedCategory("");
    setSource("");
  };
     

///video
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the video file, like upload it to a server
        console.log(acceptedFiles);
      }, []);
    
      const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'video/*' });
    


    return (  
        <div >
             <SideBar/>
             <div className='AddVideo'>
             <p className='pp1'> الفيديوهات</p>
             <hr className='hhr1'/>
             <Form  onSubmit={ handleSubmit} className='form'>
                <h1 className='hh1'>اضافة  فيديو</h1>
              <Row className="rr1">
              <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='ff1'dir='rtl'>
                  <Form.Label className='ll1' > المصدر</Form.Label>
                  <Form.Control
                    className='cc1'
                    required
                    type="text"
                    value={source}
                    onChange={(event) => setSource(event.target.value)}
                  
                  />
                </Form.Group>
                </Col>
                <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='ff2' dir='rtl'>
                  <Form.Label  className='ll2'>العنوان</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={videoTitle}
                    onChange={(event) => setVideoTitle(event.target.value)}
                    
                  />
                </Form.Group>
                </Col>
                
              </Row>
              <Row className="mb-3 mt-4 ">
            <Form.Group as={Col} md="8" controlId="categorySelect" dir='rtl'   className="ff3">
              <Form.Select
                aria-label="Default select example"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="">اختر التصنيف</option>
                {categoryId.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
              <Row>
                <Form.Group as={Col} md="6" controlId="validationCustom02" className="ff4" dir='rtl'>
                  <Form.Label  className='ll4'>   الوصف</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    type="text"
                    value={videoDescription}
                    onChange={(event) => setVideoDescription(event.target.value)}
                    
                  />
                </Form.Group>
              </Row>
               
             
               <Row>
              <Form.Group controlId="formFileLg" className="f3" as={Col} md="6" dir='rtl'>
                <Form.Label  className='l3'> اختار فيديو  </Form.Label>
                <Form.Control
                 type="file"
                  size="lg" 
                  
                  onChange={(event) => setVideo(event.target.files[0])}
                   />
                {/* <input  type="file" className='form.control'/> */}
             </Form.Group>
              </Row>
              
              <Button
                className="d-flex justify-content-center submitbtnn1"
                type="submit"
                variant='primary'
              >
                 حفظ  
              </Button>
              
            </Form>
            </div>
        </div>
    );
}
 
export default AddVideo4;