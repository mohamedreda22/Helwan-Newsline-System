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
  

  const [video,setVideo] =useState({
    video_title: "",
    video_path: "",
    video_description: "",
    category_id: "",
    source_id: "",
    error:"",
    succesMessage:null
  })

  const  video_path=useRef(null);

    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);

    
//console.log(formData)

  // axios
  //  .post{
  //   'http://localhost:9090/university/videos',
  //  }
    useEffect(() => {
      fetchCategories();
  }, []);

  useEffect(()=>{
      fetchSources();
  },[]);

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
    const  createVideo =async (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.stopPropagation();
      }
      setValidated(true);
      setVideo({...video,loading:true});
      setIsLoading(true);
      const formData =new FormData();
    formData.append("video_title",video.video_title);
    formData.append("source_id",video.source_id);
    formData.append("video_description",video.video_description);
    formData.append("category_id",video.category_id);

    if(video_path.current.files && video_path.current.files[0]){
      formData.append("video_path",video_path.current.files[0] );

    }

    axios
     .post(
      'http://localhost:9090/university/videos',formData,{
        headers:{
          "Content-Type":"multipart/form-data",
        },
      })
     .then((resp) =>{
      setVideo({
        video_title: "",
        video_description: "",
        category_id: "",
        source_id: "",
        error:"",
        succesMessage:"creatna"
      });
      video_path.current.files=null;
     })
     .catch((error ) =>{
      setVideo({
        ...video,
        error:"XX",
        succesMessage:null
      });
     });
    //   try {
    //     const response = await axios.post(
    //         'http://localhost:9090/university/video',video

    //     );

    //     if (response && response.status === 200) {
            
    //         resetForm();
    //         console.log(formData)

    //     } else {
             
    //         setError('حدث خطأ أثناء إضافة الحدث');
           
    //     }
    // } catch (error) {
    //     console.error('Error:', error);
    //     setError('حدث خطأ أثناء إضافة الحدث');
         
    // } finally {
    //     setIsLoading(false);
    // }
    // };
    // const resetForm = () => { 
    //   setVideo({
    //     video_title: "",
    //     video_path: "",
    //     video_description: "",
    //     category_id: "",
    //     source_id: ""
    //   });
    //   setError('');
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
             <Form noValidate validated={validated} onSubmit={createVideo} className='form'>
                <h1 className='hh1'>اضافة  فيديو</h1>
              <Row className="rr1">
              <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='ff1'dir='rtl'>
                  <Form.Label className='ll1' > المصدر</Form.Label>
                  <Form.Control
                    className='cc1'
                    required
                    type="text"
                    value={video.source_id}
                    onChange={(e) => setVideo({...video,source_id:e.target.value})}
                    // onChange={(e) => setSource(e.target.value)}

                  />
                </Form.Group>
                </Col>
                <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='ff2' dir='rtl'>
                  <Form.Label  className='ll2'>العنوان</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={video.video_title}
                    onChange={(e) =>setVideo({...video,video_title:e.target.value})}
                    //onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                </Col>
                
              </Row>
              <Row>
                 <Form.Group  as={Col} md="6"  controlId="exampleForm.SelectCustom"className="ff3" dir='rtl'>
                    <Form.Label>   التصنيف</Form.Label>
                     
                    <Form.Select 
                    
                    required
                   // type="text"
                    value={video.category_id}
                    onChange={(e) =>setVideo({...video,category_id:e.target.value})}
                    
                    
                    custom>
                      <option value="1">Option 1</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                      <option value="4">Option 4</option>
                      <option value="5">Option 5</option>
                      
                    </Form.Select>
                    
                    {/* <select
                       id="category_id"
                       name="category_id"
                       value={video.category_id}
                       className="form-control"
                       required
                        >
                       <option value="">اختر التصنيف</option>
                          {categories.map(category => (
                           <option key={category.category_id} 
                           value={category.category_id}>
                           {category.category_name}
                       </option>
                       
                                ))}
                     </select> */}
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
                    value={video.video_description}
                    onChange={(e) => setVideo({...video,video_description:e.target.value})}
                    // onChange={(e) => setClassification(e.target.value)}
                  />
                </Form.Group>
              </Row>
               
              {/* <Row>
              <div {...getRootProps()} style={{
                        
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
                      <input {...getInputProps()} ref={video_path} />
                      <p> 
                      <span className="material-icons-outlined">file_upload</span>
                        اختار الفيديو 
                      </p>
                    </div>
              </Row> */}
               <Row>
              <Form.Group controlId="formFileLg" className="f3" as={Col} md="6" dir='rtl'>
                <Form.Label  className='l3'> اختار فيديو  </Form.Label>
                <Form.Control type="file" size="lg" ref={video_path} />
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