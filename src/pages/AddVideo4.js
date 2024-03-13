import React , { useState, useCallback, useRef, useEffect } from 'react';
import SideBar from '../components/SideBar';
import '../styles/AddVideo4.css' ;
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDropzone } from 'react-dropzone';
import  axios  from 'axios';

// const AddVideo4 = () => {  
//   const   [ videoTitle  , setVideoTitle  ] = useState("");
//   const   [ videoDescription,setVideoDescription     ] = useState("");
//   const   [video, setVideo] = useState(null);
//  // const   [source, setSource] = useState("");
//   const   [sourceId, setSourceId] = useState([]);
//   const   [selectedSource, setSelectedSource] = useState("");
//   const   [categoryId, setCategoryId] = useState([]);
//   const   [selectedCategory, setSelectedCategory] = useState("");
//   const [sources, setSources] = useState([]);
//   useEffect(() => {
//     fetchCategories();
//     fetchSources();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:9090/university/categories"
//       );
//       setCategoryId(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };


//   const fetchSources = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:9090/university/sources"
//       );
//       setSourceId(response.data);
//     } catch (error) {
//       console.error("Error fetching sources:", error);
//     }
//   };

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const handleSourceChange = (event) => {
//     setSelectedSource(event.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     event.stopPropagation();

//     try {
       
//       const data =  {
//           video_title:videoTitle,
//           video_description:videoDescription,
//           //source_string: source,
//           category_id: selectedCategory,
//           video_path : video ? video.name : null,
//           source_id: selectedSource,
//         }
//         console.log("Data to be sent to backend:", data);

//         const response = await axios.post(
//           'http://localhost:9090/university/videos', data);
  
//         if (response && (response.status === 200||response.status === 201)) {
//           console.log(" video added successfully:", response.data);
//           alert("Added successfully!");
//           resetForm();
//         } else {
//           alert("An error occurred while adding the  video");
//         }
//       } catch (error) {
//         console.error("Error adding video:", error);
//         alert("Error: " + error.message);
//       }
//     };
       
//   const resetForm = () => {
//      setVideoTitle("");
//      setVideoDescription("");
//      setVideo(null);
//      setSelectedCategory("");
//      setSelectedSource("");
      
//   };
     

// ///video
//     const onDrop = useCallback(acceptedFiles => {
//         // Do something with the video file, like upload it to a server
//         console.log(acceptedFiles);
//       }, []);
    
//       const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'video/*' });
    


//     return (  
//         <div >
//              <SideBar/>
//              <div className='AddVideo'>
//              <p className='pp1'> الفيديوهات</p>
//              <hr className='hhr1'/>
//              <Form  onSubmit={ handleSubmit} className='form'>
//                 <h1 className='hh1'>اضافة  فيديو</h1>
//               <Row className="rr1">
//               <Col>
                
//               <Form.Group as={Col} md="3" controlId="validationCustom01" className='ff1' dir='rtl'>
//               <Form.Label className='ll1'>المصدر</Form.Label>
//               <Form.Select
//                 className='c1'
//                 required
//                 value={selectedSource}
//                 onChange={handleSourceChange}
//               >
//                 <option value="">اختر المصدر</option>
//                 {sources.map((source) => (
//                   <option key={source.source_id} value={source.source_id}>
//                     {source.full_name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//                 </Col>
//                 <Col>
                
//                 <Form.Group as={Col} md="3" controlId="validationCustom01" className='ff2' dir='rtl'>
//                   <Form.Label  className='ll2'>العنوان</Form.Label>
//                   <Form.Control
//                     required
//                     type="text"
//                     value={videoTitle}
//                     onChange={(event) => setVideoTitle(event.target.value)}
                    
//                   />
//                 </Form.Group>
//                 </Col>
                
//               </Row>
//               <Row className="mb-3 mt-4 ">
//             <Form.Group as={Col} md="8" controlId="categorySelect" dir='rtl'   className="ff3">
//               <Form.Select
//                 aria-label="Default select example"
//                 onChange={handleCategoryChange}
//                 value={selectedCategory}
//               >
//                 <option value="">اختر التصنيف</option>
//                 {categoryId.map((category) => (
//                   <option
//                     key={category.category_id}
//                     value={category.category_id}
//                   >
//                     {category.category_name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Row>
//               <Row>
//                 <Form.Group as={Col} md="6" controlId="validationCustom02" className="ff4" dir='rtl'>
//                   <Form.Label  className='ll4'>   الوصف</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     required
//                     type="text"
//                     value={videoDescription}
//                     onChange={(event) => setVideoDescription(event.target.value)}
                    
//                   />
//                 </Form.Group>
//               </Row>
               
             
//                <Row>
//               <Form.Group controlId="formFileLg" className="f3" as={Col} md="6" dir='rtl'>
//                 <Form.Label  className='l3'> اختار فيديو  </Form.Label>
//                 <Form.Control
//                  type="file"
//                   size="lg" 
//                   onChange={(event) => setVideo(event.target.files[0])}
//                    />
//                 {/* <input  type="file" className='form.control'/> */}
//              </Form.Group>
//               </Row>
              
//               <Button
//                 className="d-flex justify-content-center submitbtnn1"
//                 type="submit"
//                 variant='primary'
//               >
//                  حفظ  
//               </Button>
              
//             </Form>
//             </div>
//         </div>
//     );
// }
 
// export default AddVideo4;


function AddVideo4 () {
  const [formData, setFormData] = useState({
    video_title:"",
    video_description:"",
    source_string: "",
    category_id:"",
   video_path :"",
  source_id:"",
  });

  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchSources();
}, []);

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
            video_path:reader.result,
           });
        };
        reader.readAsDataURL(file);
      
      }
    };


      const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
        const response = await axios.post(
          'http://localhost:9090/university/videos', formData);
  
        if (response && (response.status === 200||response.status === 201)) {
          console.log( formData);
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
      setFormData({
        video_title:"",
        video_description:"",
        source_string: "",
        category_id:"",
       video_path :"",
      source_id:"",
    });
  };
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
                
             

          <Form.Group as={Col} md="3" controlId="validationCustom01" className='ff1' dir='rtl'>
                <Form.Label className='ll1'>المصدر</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={formData.source_string}
                  onChange={handleChange}
                  name="source_string"
                />
              </Form.Group>

                </Col>
                <Col>
                
                <Form.Group as={Col} md="3" controlId="validationCustom01" className='ff2' dir='rtl'>
                  <Form.Label  className='ll2'>العنوان</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={formData.article_address}
                    onChange={handleChange}
                    name="article_address"
                    
                  />
                </Form.Group>
                </Col>
                
              </Row>

              <Row>
         < Form.Group as={Col} md="3" controlId="sourceSelect" className='ff9' dir='rtl'>
              <Form.Select
              aria-label='Default select example'
                className='c9'
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
              <Row className="mb-3 mt-4 ">
            <Form.Group as={Col} md="8" controlId="category_id" dir='rtl'   className="ff3">
              <Form.Select
              required
                aria-label="Default select example"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
              >
                <option value="">اختر التصنيف</option>
                {categories.map((category) => (
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
                    name="video_description"
                    value={formData.video_description}
                    onChange={handleChange}
                    
                  />
                </Form.Group>
              </Row>
               
             
               <Row>
              <Form.Group controlId="formFileMultiple" className="f3" as={Col} md="6" dir='rtl'>
                <Form.Label  className='l3'> اختار فيديو  </Form.Label>
                <Form.Control
                 type="file"
                  size="lg" 
                  id="video_path "
                  name="video_path "   
                  onChange={handleFileChange}
                  />
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
