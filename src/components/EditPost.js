// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/EditPost.css";
// import Simplert from 'react-simplert';

// function EditPost({ post, onSave, onCancel }) {
//   const [formData, setFormData] = useState({
//     post_content: post?.post_content || "",
//     post_image_path: post?.post_image_path || "",
//     category_id: post?.category_id || "",
//     source_id: post?.source_id || "",
//     source_string: post?.source_string || ""
//   });

//   const [showSuccessAlert, setShowSuccessAlert] = useState(false);
//   const [showErrorAlert, setShowErrorAlert] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [sources, setSources] = useState([]);

//   useEffect(() => {
//     setFormData({
//       ...formData,
//       post_content: post?.post_content || "",
//       post_image_path: post?.post_image_path || "",
//       category_id: post?.category_id || "",
//       source_id: post?.source_id || "",
//       source_string: post?.source_string || ""
//     });
//   }, [post]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.post_content || !formData.source_id) {
//       setShowErrorAlert(true);
//       return;
//     }

//     try {
//       setIsLoading(true);
//       await axios.put(`http://localhost:9090/university/posts/${post.id}`, formData);
//       setShowSuccessAlert(true);
//       onSave(formData); // Optionally, you can pass the updated data to a callback function
//     } catch (error) {
//       console.error('Error updating post:', error);
//       setShowErrorAlert(true);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     onCancel();
//   };

//   useEffect(() => {
//     fetchSources();
//   }, []);

//   const fetchSources = async () => {
//     try {
//       const response = await axios.get('http://localhost:9090/university/sources');
//       setSources(response.data);
//     } catch (error) {
//       console.error('Error fetching sources:', error);
//       setShowErrorAlert(true);
//     }
//   };

//   return (
//     <div className="edit-post-container" dir="rtl">
//       <h2 className="header">تعديل المنشور</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label className="lable" htmlFor="post_content">محتوى المنشور</label>
//           <textarea
//             id="post_content"
//             name="post_content"
//             value={formData.post_content}
//             onChange={handleInputChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label className="lable" htmlFor="source_id">المصدر</label>
//           <select
//             id="source_id"
//             name="source_id"
//             value={formData.source_id}
//             onChange={handleInputChange}
//             className="form-control"
//             required
//           >
//             <option key="default" value="">اختر المصدر</option>
//             {sources.map(source => (
//               <option key={source.source_id} value={source.source_id}>
//                 {source.full_name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="btn-container">
//           <button type="submit" className="btn-submit" disabled={isLoading}>
//             {isLoading ? 'جاري التحديث...' : 'حفظ التغييرات'}
//           </button>
//           <button type="button" className="btn-submit" onClick={handleCancel} disabled={isLoading}>
//             إلغاء
//           </button>
//         </div>
//       </form>
//       {/* Success and error alerts */}
//       <Simplert
//         showSimplert={showErrorAlert}
//         type="error"
//         title="Failed"
//         message="حدث خطأ ما يرجي اعادة المحاولة"
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
//     </div>
//   );
// }

// export default EditPost;
// import React, { useState } from "react";
// import { Button, Form } from "react-bootstrap";
// import axios from "axios";

// const EditPost = ({ post, onClose }) => {
//   const [postContent, setPostContent] = useState(post.post_content);
//   const [sourceString, setSourceString] = useState(post.source_string);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await axios.put(`http://localhost:9090/university/posts/${post.post_id}`, {
//         post_content: postContent,
//         source_string: sourceString,
//       });
//       onClose();
//     } catch (error) {
//       console.error("Error updating post:", error);
//       alert("حدث خطأ أثناء تحديث المنشور");
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <Form.Group controlId="postContent">
//         <Form.Label>محتوى المنشور</Form.Label>
//         <Form.Control
//           type="text"
//           value={postContent}
//           onChange={(e) => setPostContent(e.target.value)}
//         />
//       </Form.Group>
//       <Form.Group controlId="sourceString">
//         <Form.Label>المصدر</Form.Label>
//         <Form.Control
//           type="text"
//           value={sourceString}
//           onChange={(e) => setSourceString(e.target.value)}
//         />
//       </Form.Group>
//       <Button variant="primary" type="submit">
//         حفظ التغييرات
//       </Button>{" "}
//       <Button variant="secondary" onClick={onClose}>
//         إلغاء
//       </Button>
//     </Form>
//   );
// };

// export default EditPost;
import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import Simplert from "react-simplert";

const EditPost = ({ post, onClose }) => {
  const [source, setSource] = useState("");
  const [sourceId, setSourceId] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSource, setSelectedSource] = useState("");

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [sources, setSources] = useState([]);
  const [postContent, setPostContent] = useState(post.post_content);
  const [sourceString, setSourceString] = useState(post.source_string);
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
    formData.append("post_content", postContent);
    formData.append("source_string", sourceString);
    formData.append("source_id", selectedSource);
    formData.append("category_id", selectedCategory);
    if (selectedFile) {
      formData.append("post_image", selectedFile);
    }
  
    // Log the data being sent to the backend
    console.log("Data to be sent to backend:", formData);
  
    try {
      await axios.put(
        `http://localhost:9090/university/posts/${post.post_id}`,
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
      console.error("Error updating post:", error);
      setShowErrorAlert(true);
    }
  };
  
  return (
    <div dir="rtl">
      <Form  onSubmit={handleSubmit}>
        <Form.Group controlId="sourceString">
          <Form.Label>المصدر</Form.Label>
          <Form.Control
            type="text"
            value={sourceString}
            onChange={(e) => setSourceString(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="sourceSelect">
          <Form.Label>المصدر</Form.Label>
        </Form.Group>
        <Row>
          <Form.Group md="8" controlId="categorySelect">
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
        </Row>
        <Row className="mb-3 mt-4">
          <Form.Group as={Col} md="8" controlId="sourceSelect">
            <Form.Select
              aria-label="Default select example"
              onChange={handleSourceChange}
              value={selectedSource}
            >
              <option value="">اختر المصدر</option>
              {sourceId.map((source) => (
                <option key={source.source_id} value={source.source_id}>
                  {source.full_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Form.Group controlId="postContent">
          <Form.Label>محتوى المنشور</Form.Label>
          <Form.Control
            type="text"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="postImage">
          <Form.Label>صورة المنشور</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          حفظ التغييرات
        </Button>{" "}
        <Button variant="secondary" onClick={onClose}>
          إلغاء
        </Button>
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
};

export default EditPost;
