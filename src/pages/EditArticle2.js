// import React , { useState,useEffect } from 'react';
// import Simplert from "react-simplert";
// import '../styles/EditArticle2.css' ;
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import axios from "axios";

// function EditArticle2({ article,onClose }) {
//   const [formData, setFormData] = useState({
//     article_address : article ?.article_address || "",
//     article_content : article ?.article_content || "",
//     source_string: article ?.source_string || "",
//     source_id: article ?.source_id || "",
//     article_image_path:article?.article_image_path||"",
//   });

//   const [sources, setSources] = useState([]);
//   const [showSuccessAlert, setShowSuccessAlert] = useState(false);
//   const [showErrorAlert, setShowErrorAlert] = useState(false);

//   useEffect(() => {
//     setFormData({
//         ...formData,
//         article_address : article ?.article_address || "",
//         article_content : article ?.article_content || "",
//         source_string: article ?.source_string || "",
//         source_id: article ?.source_id || "",
//         article_image_path:article?.article_image_path||"",

//     });
// }, [article]);

// useEffect(()=>{
//   fetchSources();
// },[]);

// const fetchSources = async () => {
//   try {
//       const response = await axios.get('http://localhost:9090/university/sources');
//       setSources(response.data);
//   } catch (error) {
//       console.error('Error fetching sources:', error);
//   }
// };

// const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({ ...formData, [name]: value });
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//       const response = await axios.put(`http://localhost:9090/university/articles/${article.article_id}`, formData);
//       if (response && (response.status === 200||response.status === 201||response.status === 202)) {

//       setShowSuccessAlert(true);
//       }
//       else{
//           setShowErrorAlert(true);
//       }
//   } catch (error) {
//       console.error('Error updating article:', error);
//       setShowErrorAlert(true);
//   }
// };

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({
//       ...formData,
//       [name]: value,
//   });
// };

// const handleFileChange = (event) => {
//   const file =  event.target.files[0];
//   const reader = new FileReader();
//   if (file) {
//     reader.onloadend = () => {
//        setFormData({
//         ...formData,
//         article_image_path:reader.result,
//        });
//     };
//     reader.readAsDataURL(file);

//   }
// };

//     return (

//              <div className='EditArticle'>
//              <Form onSubmit={handleSubmit} className='form'>
//         {!article && (
//           <div>
//             <Row className="mb-3 mt-4">
//             <Col>
//                <Form.Group as={Col} md="3" controlId="article_address" className='fff2' dir='rtl'>
//                    <Form.Label  className='lll2'>العنوان</Form.Label>
//                    <Form.Control
//                      required
//                      type="text"
//                      value={formData.article_address}
//                      onChange={handleInputChange}
//                      name="article_address"
//                    />
//                  </Form.Group>
//                </Col>
//                <Col>

//                <Form.Group as={Col} md="3" controlId="source_string" className='fff9' dir='rtl'>
//                    <Form.Label  className='lll9'> المصدر</Form.Label>
//                    <Form.Control
//                      required
//                      type="text"
//                      value={formData.source_string}
//                      onChange={handleInputChange}
//                      name="source_string"
//                    />
//                  </Form.Group>
//                </Col>

//               <Col>
//               <Form.Group as={Col} md="8" controlId="source_id"  className='fff2'>
//                 <Form.Label>اختر المصدر</Form.Label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   value={formData.source_id}
//                   onChange={handleChange}
//                   name="source_id"
//                 >
//                   {sources.map((source) => (
//                     <option key={source.source_id} value={source.source_id}>
//                       {source.full_name}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </Form.Group>
//               </Col>

//             </Row>
//           </div>
//         )}
//         <Form.Group controlId="article_content"  as={Col} md="6" className="fff4" dir='rtl' >
//           <Form.Label> المقال  </Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={10}
//             required
//             value={formData.article_content}
//             onChange={handleInputChange}
//             name="article_content"
//           />
//         </Form.Group>
//         <Form.Group controlId="formFileMultiple"  className="fff3" as={Col} md="6" dir='rtl'>
//           <Form.Label>   اختر صورة </Form.Label>
//           <Form.Control
//           type="file"
//           id="article_image_path"
//           name="article_image_path"
//           onChange={handleFileChange}
//           />
//         </Form.Group>
//         <Row>
//           <Col>
//         <Button variant="primary" type="submit" className='btn7' >
//           حفظ
//         </Button>{" "}
//         </Col>
//         <Col>

//         <Button variant="secondary" onClick={onClose} className='btn8'>
//           إلغاء
//         </Button>
//         </Col>
//         </Row>
//       </Form>

//             <Simplert
//         showSimplert={showErrorAlert}
//         type="error"
//         title="Failed"
//         message="حدث خطأ  حاول مرة اخري      "
//         onClose={() => setShowErrorAlert(false)}
//         customCloseBtnText="اغلاق"
//       />
//       <Simplert
//         showSimplert={showSuccessAlert}
//         type="success"
//         title="Success"
//         message="تم التعديل بنجاح"
//         onClose={() => setShowSuccessAlert(false)}
//         customCloseBtnText="تم"
//       />

//             </div>

//     );

// }

// export default  EditArticle2;

import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Simplert from "react-simplert";

const EditArticle2 = ({ articleId, onClose }) => {
  const [formData, setFormData] = useState({
    article_address: "",
    article_image_path: "",
    article_content: "",
    source_id: "",
    source_string: "",
    url: `http://localhost:9090/university/articles/${articleId}`,
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    fetchSources();
    fetchArticle();
  }, [articleId]);

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

  const fetchArticle = async () => {
    try {
      const response = await axios.get(formData.url);
      const articleData = response.data;
      setFormData({
        ...formData,
        article_address: articleData.article_address,
        article_image_path: articleData.article_image_path,
        article_content: articleData.article_content,
        source_id: articleData.source_id.toString(),
        source_string: articleData.source_string,
      });
    } catch (error) {
      console.error("Error fetching article:", error);
      setShowErrorAlert(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(formData.url, {
        article_address: formData.article_address,
        article_image_path: formData.article_image_path,
        article_content: formData.article_content,
        source_id: formData.source_id,
        source_string: formData.source_string,
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
      console.error("Error updating article:", error);
      setShowErrorAlert(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.onloadend = () => {
        setFormData({
          ...formData,
          article_image_path: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div dir="rtl" className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="sourceString">
          <Form.Label>المصدر</Form.Label>
          <Form.Control
            type="text"
            name="source_string"
            value={formData.source_string}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="articleAddress">
          <Form.Label>عنوان المقال</Form.Label>
          <Form.Control
            type="text"
            required
            name="article_address"
            value={formData.article_address}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="articleContent">
          <Form.Label>محتوى المقال</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            required
            name="article_content"
            value={formData.article_content}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="sourceId">
          <Form.Label>اختر المصدر</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="source_id"
            value={formData.source_id}
            onChange={handleInputChange}
          >
            {sources.map((source) => (
              <option key={source.source_id} value={source.source_id}>
                {source.full_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="articleImage">
          <Form.Label>صورة المقال</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          حفظ التغييرات
        </Button>{" "}
      </Form>
      <Simplert
        showSimplert={showErrorAlert}
        type="error"
        title="فشل"
        message="حدث خطأ أثناء تحديث المقال. يرجى المحاولة مرة أخرى."
        onClose={() => setShowErrorAlert(false)}
        customCloseBtnText="اغلاق"
      />
      <Simplert
        showSimplert={showSuccessAlert}
        type="success"
        title="نجاح"
        message="تم تحديث المقال بنجاح."
        onClose={() => setShowSuccessAlert(false)}
        customCloseBtnText="تم"
      />
    </div>
  );
};

export default EditArticle2;
