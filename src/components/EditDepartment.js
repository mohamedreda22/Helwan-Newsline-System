// // import React, { useState, useEffect } from "react";
// // import { Button, Form } from "react-bootstrap";
// // import axios from "axios";
// // import Simplert from "react-simplert";

// // const EditDepartment = ({ department, onClose }) => {
// //   const [departmentName, setDepartmentName] = useState("");
// //   const [collegeName, setCollegeName] = useState("");
// //   const [selectedcollege, setSelectedcollege] = useState("");
// //   const [showSuccessAlert, setShowSuccessAlert] = useState(false);
// //   const [showErrorAlert, setShowErrorAlert] = useState(false);
// //   const [validated, setValidated] = useState(false);

// //   useEffect(() => {
// //     if (department) {
// //       setDepartmentName(department?.department_name || "");
// //       setCollegeName(department?.college_name || "");
// //     }
// //   }, [department]);

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();
// //     const form = event.currentTarget;
// //     if (form.checkValidity() === false) {
// //       event.stopPropagation();
// //     } else {
// //       console.log("Data to be sent to backend:", {
// //         department_name: departmentName,
// //         college_id: selectedcollege,
// //       });
// //       try {
// //         const response = await axios.put(
// //           `http://localhost:9090/university/departments/${department?.department_id}`,
// //           {
// //             department_name: departmentName,
// //             college_id: selectedcollege,
// //           }
// //         );
// //         if (response && response.status === 200) {
// //           console.log("department added successfully:", response.data);
// //           alert("تم التعديل");
// //           setShowSuccessAlert(true);
// //           onClose();
// //         } else {
// //           alert("حدث خطأ اثناء إضافة القسم");
// //         }
// //       } catch (error) {
// //         console.error("Error adding department:", error);
// //         alert("Error: " + error.message);
// //         setShowErrorAlert(true);
// //       }
// //     }
// //     setValidated(true);
// //   };
// //   const handleCollegeChange = (event) => {
// //     setSelectedcollege(event.target.value);
// //   };
// //   return (
// //     <div dir="rtl">
// //       <Form noValidate validated={validated} onSubmit={handleSubmit}>
// //         <Form.Group controlId="departmentName">
// //           <Form.Label>اسم القسم</Form.Label>
// //           <Form.Control
// //             type="text"
// //             value={departmentName}
// //             onChange={(e) => setDepartmentName(e.target.value)}
// //             required
// //             isInvalid={validated && departmentName.trim() === ""}
// //           />
// //           <Form.Control.Feedback type="invalid">
// //             الرجاء إدخال اسم القسم
// //           </Form.Control.Feedback>
// //         </Form.Group>
// //         <Form.Group controlId="collegeName">
// //           {/* <Form.Label>اسم الكلية</Form.Label>
// //           <Form.Control
// //             type="text"
// //             placeholder="Enter college name"
// //             value={collegeName}
// //             onChange={(e) => setCollegeName(e.target.value)}
// //             required
// //             isInvalid={validated && collegeName.trim() === ""}
// //           /> */}
// //           <Form.Select
// //             aria-label="Default select example"
// //             value={selectedcollege}
// //             onChange={handleCollegeChange}
// //             required
// //             // isInvalid={validated && collegeName.trim() === ""}
// //           >
// //             <option>اختر الكلية</option>
// //             {collegeName.map((college) => (
// //               <option key={college.college_id} value={college.college_id}>
// //                 {college.college_name}
// //               </option>
// //             ))}
// //           </Form.Select>
// //           <Form.Control.Feedback type="invalid">
// //             الرجاء إدخال اسم الكلية
// //           </Form.Control.Feedback>
// //         </Form.Group>
// //         <Button variant="primary" type="submit">
// //           حفظ التغييرات
// //         </Button>
// //         <Button variant="secondary" onClick={onClose}>
// //           إلغاء
// //         </Button>
// //       </Form>
// //       <Simplert
// //         showSimplert={showErrorAlert}
// //         type="error"
// //         title="Failed"
// //         message="حدث خطأ ما يرجي اعادة المحاولة"
// //         onClose={() => setShowErrorAlert(false)}
// //         customCloseBtnText="اغلاق"
// //       />
// //       <Simplert
// //         showSimplert={showSuccessAlert}
// //         type="success"
// //         title="Success"
// //         message="تم التعديل بنجاح"
// //         onClose={() => setShowSuccessAlert(false)}
// //         customCloseBtnText="تم"
// //       />
// //     </div>
// //   );
// // };

// // export default EditDepartment;
// //////////////////////////////////////////
// // import React, { useState, useEffect } from "react";
// // import { Button, Form } from "react-bootstrap";
// // import axios from "axios";
// // import Simplert from "react-simplert";

// // const EditDepartment = ({ department, onClose }) => {
// //   const [formData, setFormData] = useState({
// //     department_name: department?.department_name || "",
// //     college_id: department?.college_id || "",
// //   });
// //   const [showSuccessAlert, setShowSuccessAlert] = useState(false);
// //   const [showErrorAlert, setShowErrorAlert] = useState(false);
// //   const [validated, setValidated] = useState(false);
// //   const [colleges, setColleges] = useState([]);

// //   useEffect(() => {
// //     setFormData({
// //       ...formData,
// //       department_name: department?.department_name || "",
// //       college_id: department?.college_id || "",
// //     });
// //   }, [department]);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!formData.department_name || !formData.college_id) {
// //       setShowErrorAlert(true);
// //       return;
// //     }
// //     try {
// //       const response = await axios.put(
// //         `http://localhost:9090/university/departments/${department.department_id}`,
// //         formData
// //       );
// //       if (response && response.status === 200) {
// //         setShowSuccessAlert(true);
// //         onClose();
// //       } else {
// //         setShowErrorAlert(true);
// //       }
// //     } catch (error) {
// //       console.error("Error updating department:", error);
// //       alert("Error: " + error.message);
// //       setShowErrorAlert(true);
// //     }
// //   };
// //   const fetchColleges = async () => {
// //     try {
// //       const response = await axios.get(
// //         "http://localhost:9090/university/colleges"
// //       );
// //       setColleges(response.data);
// //     } catch (error) {
// //       console.error("Error fetching colleges:", error);
// //     }
// //   };
// //   useEffect(() => {
// //     fetchColleges();
// //   }, []);

// //   return (
// //     <div className="container" dir="rtl">
// //       <Form noValidate validated={validated} onSubmit={handleSubmit}>
// //         <Form.Group controlId="department_Name">
// //           <Form.Label>اسم القسم</Form.Label>
// //           <Form.Control
// //             type="text"
// //             name="department_name"
// //             value={formData.department_name}
// //             onChange={handleInputChange}
// //             required
// //           />
// //           <Form.Control.Feedback type="invalid">
// //             الرجاء إدخال اسم القسم
// //           </Form.Control.Feedback>
// //         </Form.Group>
// //         <Form.Group controlId="college_id">
// //           <Form.Label>اسم الكلية</Form.Label>
// //           <Form.Control
// //             as="select"
// //             name="college_id"
// //             value={formData.college_id}
// //             onChange={handleInputChange}
// //             required
// //           >
// //             <option value="">اختر الكلية</option>
// //             {/* Assuming college data is provided separately */}
// //             {colleges.map((college) => (
// //               <option key={college.college_id} value={college.college_id}>
// //                 {college.college_name}
// //               </option>
// //             ))}
// //           </Form.Control>
// //           <Form.Control.Feedback type="invalid">
// //             الرجاء اختيار اسم الكلية
// //           </Form.Control.Feedback>
// //         </Form.Group>
// //         <Button variant="primary" type="submit">
// //           حفظ التغييرات
// //         </Button>
// //         <Button variant="secondary" onClick={onClose}>
// //           إلغاء
// //         </Button>
// //       </Form>
// //       <Simplert
// //         showSimplert={showErrorAlert}
// //         type="error"
// //         title="Failed"
// //         message="حدث خطأ ما يرجي اعادة المحاولة"
// //         onClose={() => setShowErrorAlert(false)}
// //         customCloseBtnText="اغلاق"
// //       />
// //       <Simplert
// //         showSimplert={showSuccessAlert}
// //         type="success"
// //         title="Success"
// //         message="تم التعديل بنجاح"
// //         onClose={() => setShowSuccessAlert(false)}
// //         customCloseBtnText="تم"
// //       />
// //     </div>
// //   );
// // };

// // export default EditDepartment;
// ///////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import { Button, Form } from "react-bootstrap";
// import axios from "axios";
// import Simplert from "react-simplert";
// import { useParams } from "react-router-dom";

// const EditDepartment = () => {
//   const { id } = useParams();
//   const [values, setValues] = useState({
//     department_name: '',
//   });
//   const [showSuccessAlert, setShowSuccessAlert] = useState(false);
//   const [showErrorAlert, setShowErrorAlert] = useState(false);
//   const [validated, setValidated] = useState(false);
//   const [colleges, setColleges] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(
//         `http://localhost:9090/university/departments/${id}`,
//         { department_name: values.department_name }
//       );
//       if (response && response.status === 200) {
//         setShowSuccessAlert(true);
//       } else {
//         setShowErrorAlert(true);
//       }
//     } catch (error) {
//       console.error("Error updating department:", error);
//       setShowErrorAlert(true);
//     }
//   };

//   const fetchColleges = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:9090/university/colleges"
//       );
//       setColleges(response.data);
//     } catch (error) {
//       console.error("Error fetching colleges:", error);
//     }
//   };

//   useEffect(() => {
//     fetchColleges();
//   }, []);

//   useEffect(() => {
//     const fetchDepartment = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:9090/university/departments/${id}`
//         );
//         setValues({ department_name: response.data.department_name });
//       } catch (error) {
//         console.error("Error fetching department:", error);
//       }
//     };
//     fetchDepartment();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: value });
//   };

//   return (
//     <div className="container" dir="rtl">
//       <Form noValidate validated={validated} onSubmit={handleSubmit}>
//         <Form.Group controlId="department_name">
//           <Form.Label>اسم القسم</Form.Label>
//           <Form.Control
//             type="text"
//             name="department_name"
//             value={values.department_name}
//             onChange={handleInputChange}
//             required
//           />
//           <Form.Control.Feedback type="invalid">
//             الرجاء إدخال اسم القسم
//           </Form.Control.Feedback>
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           حفظ التغييرات
//         </Button>
//       </Form>
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
// };

// export default EditDepartment;

