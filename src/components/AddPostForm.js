// import React, { useState, useEffect } from "react";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import axios from "axios";
// import "../styles/AddPostForm.css";

// function AddPostForm() {
//   const [PostContent, setPostContent] = useState("");
//   const [image, setImage] = useState(null);
//   const [source, setSource] = useState("");
//   const [sourceId, setSourceId] = useState([]);
//   const [categoryId, setCategoryId] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSource, setSelectedSource] = useState("");

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
//   //   const handleFileChange = (event) => {
//   //     const file = event ? event.target.files[0] : null;
//   //     console.log (file,"file");
//   //     const reader = new FileReader();
//   //     reader.readAsDataURL(file);
//   //     reader.onload = function () {
//   //       setImage (reader.result);
//   //     };
//   //     // if (file) {
//   //     //   reader.onloadend = () => {
//   //     //     setImage(reader.result);
//   //     //     // if (data) {
//   //     //     //   data(reader.result);
//   //     //     // }
//   //     //   };
//   //     //   reader.readAsDataURL(file);
//   //     // // } else if (data) {
//   //     // //   data(null);
//   //     // // }
//   // };
//   //   const handleCombinedFileChange = (event) => {
//   //     handleFileChange(event, (imageData) => {
//   //       setImage(imageData); // Set the image state with the base64 encoded image data
//   //     });
//   //   };

//   const handleFileChange = (event, data) => {
//     const file = event ? event.target.files[0] : null;
//     const reader = new FileReader();

//     if (file) {
//       reader.onloadend = () => {
//         setImage(reader.result);
//         if (data) {
//           data(reader.result);
//         }
//       };
//       reader.readAsDataURL(file);
//     } else if (data) {
//       data(null);
//     }
//   };
//   const handleCombinedFileChange = (event) => {
//     handleFileChange(event, (imageData) => {
//       setImage(imageData); // Set the image state with the base64 encoded image data
//     });
//   };

//   // const handleCombinedFileChange = (e) => {
//   //     handleFileChange(event, (imageData) => {
//   //         setFormData({
//   //             ...formData,
//   //             post_image_path: imageData,
//   //         });
//   //     });
//   // };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     event.stopPropagation();

//     try {
//       // // Get the current date and time in Egyptian timezone
//       // const currentDate = new Date().toLocaleString("en-US", {
//       //   timeZone: "Africa/Cairo",
//       // });

//       const response = await axios.post(
//         "http://localhost:9090/university/posts",
//         {
//           post_content: PostContent,
//           post_image_path: image ? image : null,
//           category_id: selectedCategory,
//           source_string: source,
//           source_id: selectedSource,
//           // date: currentDate, // Include the current date and time
//         }
//       );
//       if (response && response.status === 200) {
//         console.log("Post added successfully:", response.data);
//         alert("Added successfully!");
//         resetForm();
//       } else {
//         alert("An error occurred while adding the post");
//       }
//     } catch (error) {
//       console.error("Error adding post:", error);
//       alert("Error: " + error.message);
//     }
//   };

//   const resetForm = () => {
//     setPostContent("");
//     setImage(null);
//     setSelectedCategory("");
//     setSelectedSource("");
//     setSource("");
//   };

//   return (
//     <div>
//       <h1 className="addpost" dir="rtl">
//         إضافة منشور
//       </h1>
//       <div dir="rtl" className="form-container">
//         <Form onSubmit={handleSubmit}>
//           <Form.Group as={Col} md="8" controlId="validationCustom01">
//             <Form.Label>المصدر</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               value={source}
//               onChange={(event) => setSource(event.target.value)}
//             />
//           </Form.Group>
//           <Row className="mb-3 mt-4">
//             <Form.Group as={Col} md="8" controlId="categorySelect">
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
//           <Row className="mb-3 mt-4">
//             <Form.Group as={Col} md="8" controlId="sourceSelect">
//               <Form.Select
//                 aria-label="Default select example"
//                 onChange={handleSourceChange}
//                 value={selectedSource}
//               >
//                 <option value="">اختر المصدر</option>
//                 {sourceId.map((source) => (
//                   <option key={source.source_id} value={source.source_id}>
//                     {source.full_name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Form.Group>
//           </Row>
//           <Form.Group as={Col} md="8" controlId="validationCustom04">
//             <Form.Label>كتابة منشور</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={10}
//               required
//               value={PostContent}
//               onChange={(event) => setPostContent(event.target.value)}
//             />
//           </Form.Group>
//           <Form.Group
//             as={Col}
//             md="8"
//             controlId="formFileMultiple"
//             className="mb-4"
//           >
//             <Form.Label>إضافة صورة (اختياري)</Form.Label>
//             <Form.Control
//               type="file"
//               id="post_image_path"
//               name="post_image_path"
//               // onChange={(event) => setImage(event.target.files[0])}
//               onChange={handleCombinedFileChange}
//             />
//           </Form.Group>
//           <Button
//             className="d-flex justify-content-center submitbtn"
//             type="submit"
//           >
//             إضافة المنشور
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default AddPostForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../styles/AddPostForm.css";

function AddPostForm() {
  const [formData, setFormData] = useState({
    post_content: "",
    post_image_path: "",
    category_id: "",
    source_id: "",
    source_string: "",
  });
  const [categories, setCategories] = useState([]);
  const [sources, setSources] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchSources();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.onloadend = () => {
        setFormData({
          ...formData,
          post_image_path: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9090/university/posts",
        formData
      );

      if (response && response.status === 200) {
        console.log(formData);
        alert("Added successfully!");
        resetForm();
      } else {
        alert("An error occurred while adding the post");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Error: " + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      post_content: "",
      post_image_path: "",
      category_id: "",
      source_id: "",
      source_string: "",
    });
  };

  return (
    <div>
      <h1 className="addpost" dir="rtl">
        إضافة منشور
      </h1>
      <div dir="rtl" className="form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Col} md="8" controlId="validationCustom01">
            <Form.Label>المصدر</Form.Label>
            <Form.Control
              required
              type="text"
              name="source_string"
              value={formData.source_string}
              onChange={handleChange}
            />
          </Form.Group>
          <Row className="mb-3 mt-4">
            <Form.Group as={Col} md="8" controlId="categorySelect">
              <Form.Select
                aria-label="Default select example"
                onChange={handleChange}
                value={formData.category_id}
                name="category_id"
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
          <Row className="mb-3 mt-4">
            <Form.Group as={Col} md="8" controlId="sourceSelect">
              <Form.Select
                aria-label="Default select example"
                onChange={handleChange}
                value={formData.source_id}
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
          <Form.Group as={Col} md="8" controlId="validationCustom04">
            <Form.Label>كتابة منشور</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              required
              name="post_content"
              value={formData.post_content}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            md="8"
            controlId="formFileMultiple"
            className="mb-4"
          >
            <Form.Label>إضافة صورة (اختياري)</Form.Label>
            <Form.Control
              type="file"
              id="post_image_path"
              name="post_image_path"
              onChange={handleFileChange}
            />
          </Form.Group>
          <Button
            className="d-flex justify-content-center submitbtn"
            type="submit"
          >
            إضافة المنشور
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddPostForm;
