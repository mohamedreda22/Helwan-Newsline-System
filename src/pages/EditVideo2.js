import React , { useState, useCallback, useEffect } from 'react';
import axios from "axios";
import SideBar from '../components/SideBar';
import '../styles/EditVideo2.css' ;
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
//import { useDropzone } from 'react-dropzone';
import Simplert from "react-simplert";

const  EditVideo2 = ({onClose }) => {  
    // const [validated, setValidated] = useState(false);
    // const [title, setTitle] = useState("");
    // const [source , setSource] = useState("");
    // const [ description, setDescription] = useState("");
    // const [classification, setClassification] = useState("");
    // const [ video , setVideo] = useState("");
    // const [showPopup, setShowPopup] = useState(false);
  
    // const handleSubmit = (event) => {
    //   event.preventDefault();
    //   const form = event.currentTarget;
    //   if (form.checkValidity() === false) {
    //     event.stopPropagation();
    //   }
    //   setValidated(true);      
    // };
   

    // const onDrop = useCallback(acceptedFiles => {
    //     // Do something with the video file, like upload it to a server
    //     console.log(acceptedFiles);
    //   }, []);
    
    //   const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'video/*' });
    



    const   [ videoTitle  , setVideoTitle  ] = useState("");
    const   [ videoDescription,setVideoDescription     ] = useState("");
    const   [video, setVideo] = useState(null);
    const   [source, setSource] = useState("");
    const   [sourceId, setSourceId] = useState([]);
    const   [selectedSource, setSelectedSource] = useState("");
    const   [categoryId, setCategoryId] = useState([]);
    const   [selectedCategory, setSelectedCategory] = useState("");
    const   [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const   [showErrorAlert, setShowErrorAlert] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    
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
    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append(" video_title", videoTitle);
      formData.append("video_description ", videoDescription);
      formData.append("source_string", source);
      formData.append("source_id", selectedSource);
      formData.append("category_id", selectedCategory);
      if (selectedFile) {
        formData.append("video_path", selectedFile);
      }
      try {
        await axios.put(
          `http://localhost:9090/university/videos/${video.video_id}`,
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
        console.error("Error updating video:", error);
        setShowErrorAlert(true);
      }
    };

    return (  
        <div >
              
             <div className='EditVideo'>
             
             <Form  onSubmit={handleSubmit} className='form'>
                <h1 className='hhhh1'> تعديل  فيديو</h1>
              <Row className="rrrr1">
              <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='ffff1'dir='rtl'>
                  <Form.Label className='llll1' > المصدر</Form.Label>
                  <Form.Control
                    className='cccc1'
                    required
                    type="text"
                    value={source}
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
                    value={videoTitle}
                    onChange={(event) => setVideoTitle(event.target.value)}
                  />
                </Form.Group>
                </Col>
                
              </Row>
              <Form.Group md="8" controlId="categorySelect" className="ffff3" dir='rtl'>
            <Form.Select
              aria-label="Default select example"
              onChange={handleCategoryChange}
              value={selectedCategory}
            >
              <option value="">اختر التصنيف</option>
              {categoryId.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
              <Row>
                <Form.Group as={Col} md="6" controlId="validationCustom02" className="ffff4" dir='rtl'>
                  <Form.Label  className='llll4'>   الوصف</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    type="text"
                    onChange={(event) => setVideoDescription(event.target.value)}
                  />
                </Form.Group>
              </Row>
               
              <Row>
              {/* <div {...getRootProps()} style={{
                        
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
                    </div> */}

                 <Form.Group controlId="formFileLg" className="f3" as={Col} md="6" dir='rtl'>
                <Form.Label  className='l3'> اختار فيديو  </Form.Label>
                <Form.Control
                 type="file"
                  size="lg" 
                  onChange={handleFileChange}
                  
                   />
                {/* <input  type="file" className='form.control'/> */}
             </Form.Group>
              </Row>
              
              <Button
                className="d-flex justify-content-center submitbtnn4"
                type="submit"
              >
                 حفظ  
              </Button>
              <Button variant="secondary" onClick={onClose}>
          إلغاء
        </Button>
              
            </Form>
            </div>
        </div>
    );
}
 
export default  EditVideo2;