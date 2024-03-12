// import React, { useState, useEffect } from "react";
// import { Button, Form, Spinner } from "react-bootstrap";
// import axios from "axios";
// import Simplert from "react-simplert";

// const EditDepartment = ({ departmentId }) => {
//   const [departmentName, setDepartmentName] = useState("");
//   const [colleges, setColleges] = useState([]);
//   const [showSuccessAlert, setSuccessAlert] = useState(false);
//   const [showErrorAlert, setErrorAlert] = useState(false);
//   const [selectedCollege, setSelectedCollege] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchDepartment();
//     fetchColleges();
//   }, [departmentId]);

//   const fetchDepartment = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:9090/university/departments/${departmentId}`
//       );
//       const departmentData = response.data;
//       setDepartmentName(departmentData.department_name);
//       setSelectedCollege(departmentData.college_id);
//     } catch (error) {
//       console.error("Error fetching department:", error);
//       setErrorAlert(true);
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
//       setErrorAlert(true);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       setLoading(true);
//       const response = await axios.put(
//         `http://localhost:9090/university/departments/${departmentId}`,
//         {
//           department_name: departmentName,
//           college_id: selectedCollege,
//         }
//       );
//       if (response.status === 200 || response.status === 201) {
//         setSuccessAlert(true);
//         console.log("Data sent to backend:", {
//           department_name: departmentName,
//           college_id: selectedCollege,
//         });
//         console.log("Department updated successfully:", response.data);
//         setTimeout(() => {
//           setSuccessAlert(false);
//         }, 2000);
//       } else {
//         // Handle other status codes
//         const errorMessage = response.data.message || "حدث خطأ أثناء تعديل القسم";
//         alert(errorMessage);
//       }
//     } catch (error) {
//       console.error("Error updating department:", error);
//       setErrorAlert(true);
//       setTimeout(() => {
//         setErrorAlert(false);
//       }, 2000);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <div dir="rtl">
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="departmentName">
//           <Form.Label>اسم القسم</Form.Label>
//           <Form.Control
//             type="text"
//             value={departmentName}
//             onChange={(e) => setDepartmentName(e.target.value)}
//             required
//           />
//           <Form.Control.Feedback type="invalid">
//             الرجاء إدخال اسم القسم
//           </Form.Control.Feedback>
//         </Form.Group>
//         <Button variant="primary" type="submit" disabled={loading}>
//           {loading ? (
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           ) : (
//             "تحديث القسم"
//           )}
//         </Button>
//       </Form>
//       <Simplert
//       showSimplert={showErrorAlert}
//       type="error"
//       title="Failed"
//       message="حدث خطأ ما يرجي اعادة المحاولة"
//       onClose={() => setErrorAlert(false)}
//       customCloseBtnText="اغلاق"
//     />
//     <Simplert
//       showSimplert={showSuccessAlert}
//       type="success"
//       title="Success"
//       message="تم تحديث القسم بنجاح"
//       onClose={() => setSuccessAlert(false)}
//       customCloseBtnText="تم"
//     />
//     </div>
//   );
// };

// export default EditDepartment;

////MOHAMED
// import React, { useState, useEffect } from "react";
// import { Button, Form, Dropdown } from "react-bootstrap";
// import axios from "axios";
// import Simplert from "react-simplert";

// const EditDepartment = ({ onClose }) => {
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [showSuccessAlert, setSuccessAlert] = useState(false);
//   const [showErrorAlert, setErrorAlert] = useState(false);
//   const [validated, setValidated] = useState(false);

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       const response = await axios.get("http://localhost:9090/university/departments");
//       setDepartments(response.data);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//     }
//   };

//   const handleDepartmentChange = (department) => {
//     setSelectedDepartment(department);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.stopPropagation();
//       setValidated(true);
//       return;
//     }
  
//     if (!selectedDepartment) {
//       return;
//     }
  
//     try {
//       const response = await axios.put(
//         `http://localhost:9090/university/departments/${selectedDepartment.department_id}`,
//         {
//           department_name: selectedDepartment.department_name,
//           college_id: selectedDepartment.college_id,
//         }
//       );
//       if (response &&  (response.status === 201 ||response.status === 202)) {
//         setSuccessAlert(true);
//         fetchDepartments();
//       } else {
//         setErrorAlert(true);
//       }
//     } catch (error) {
//       console.error("Error updating department:", error);
//       setErrorAlert(true);
//     }
//   };
  

//   return (
//     <div className="container" dir="rtl">
//       <Form noValidate validated={validated} onSubmit={handleSubmit}>
//         <Dropdown>
//           <Dropdown.Toggle variant="primary">
//             اختر القسم للتعديل
//           </Dropdown.Toggle>
//           <Dropdown.Menu>
//             {departments.map((department) => (
//               <Dropdown.Item
//                 key={department.department_id}
//                 onClick={() => handleDepartmentChange(department)}
//               >
//                 {department.department_name}
//               </Dropdown.Item>
//             ))}
//           </Dropdown.Menu>
//         </Dropdown>
//         {selectedDepartment && (
//           <>
//             <Form.Group controlId="department_name">
//               <Form.Label>اسم القسم</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="department_name"
//                 value={selectedDepartment.department_name}
//                 onChange={(e) =>
//                   setSelectedDepartment({
//                     ...selectedDepartment,
//                     department_name: e.target.value
//                   })
//                 }
//                 required
//               />
//               <Form.Control.Feedback type="invalid">
//                 الرجاء إدخال اسم القسم
//               </Form.Control.Feedback>
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               حفظ التغييرات
//             </Button>            

//           </>
//         )}
//       </Form>
//       <Simplert
//         showSimplert={showErrorAlert}
//         type="error"
//         title="Failed"
//         message="حدث خطأ ما يرجي اعادة المحاولة"
//         onClose={() => setErrorAlert(false)}
//         customCloseBtnText="اغلاق"
//       />
//       <Simplert
//         showSimplert={showSuccessAlert}
//         type="success"
//         title="Success"
//         message="تم التعديل بنجاح"
//         onClose={() => setSuccessAlert(false)}
//         customCloseBtnText="تم"
//       />
//     </div>
//   );
// };

// export default EditDepartment;
import React, { useState, useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import Simplert from "react-simplert";

const EditDepartmentForm = ({ departmentId }) => {
  const [departmentName, setDepartmentName] = useState("");
  const [colleges, setColleges] = useState([]);
  const [showSuccessAlert, setSuccessAlert] = useState(false);
  const [showErrorAlert, setErrorAlert] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDepartment();
    fetchColleges();
  }, [departmentId]);

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/university/departments/${departmentId}`
      );
      const departmentData = response.data;
      setDepartmentName(departmentData.department_name);
      setSelectedCollege(departmentData.college_id);
    } catch (error) {
      console.error("Error fetching department:", error);
      setErrorAlert(true);
    }
  };

  const fetchColleges = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/colleges"
      );
      setColleges(response.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
      setErrorAlert(true);
    }
  };

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:9090/university/departments/${departmentId}`,
        {
          department_name: departmentName,
          college_id: selectedCollege,
        }
      );
      if (response && (response.status === 200 || response.status === 201||response.status === 202)) {
        console.log("Department updated successfully:", response.data);
        setSuccessAlert(true);
        // setTimeout(() => {
        //   setSuccessAlert(false);
        // }, 2000);
      } else {
        setErrorAlert(true);
      }
    } catch (error) {
      console.error("Error updating department:", error);
      setErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div dir="rtl">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="departmentName">
          <Form.Label>اسم القسم</Form.Label>
          <Form.Control
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
          <Form.Control.Feedback type="invalid">
            الرجاء إدخال اسم القسم
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="collegeName">
  <div dir="rtl">اسم الكلية</div>
  <Form.Select
    aria-label="Default select example"
    value={selectedCollege}
    onChange={handleCollegeChange}
    required
    disabled 
  >
    <option value={selectedCollege}>
      {colleges.find(college => college.college_id === selectedCollege)?.college_name}
    </option>
  </Form.Select>
  <Form.Control.Feedback type="invalid">
    الرجاء اختيار اسم الكلية
  </Form.Control.Feedback>
</Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            "تحديث القسم"
          )}
        </Button>
      </Form>
      <Simplert
        showSimplert={showErrorAlert}
        type="error"
        title="Failed"
        message="حدث خطأ ما يرجي اعادة المحاولة"
        onClose={() => setErrorAlert(false)}
        customCloseBtnText="اغلاق"
      />
      <Simplert
        showSimplert={showSuccessAlert}
        type="success"
        title="Success"
        message="تم تحديث القسم بنجاح"
        onClose={() => setSuccessAlert(false)}
        customCloseBtnText="تم"
      />
    </div>
  );
};

export default EditDepartmentForm;
