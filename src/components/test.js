// import React, { useState, useEffect } from 'react';

// const UpdateItemPage = ({ itemId }) => {
//   const [item, setItem] = useState({});
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     // Fetch item data from the server using itemId
//     // Update state with fetched item data
//   }, [itemId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Send formData to the server to update the item
//     // Provide feedback to the user
//   };

//   return (
//     <div>
//       <h2>Update Item</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={formData.name || item.name || ''}
//             onChange={handleChange}
//           />
//         </label>
//         {/* Other input fields for item properties */}
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateItemPage;
// ////////////////
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UpdateItemPage = ({ itemId }) => {
//   const [department, setDepartment] = useState({});
//   const [formData, setFormData] = useState({ department_name: '' });
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     // Fetch department data from the server using itemId
//     const fetchDepartment = async () => {
//       try {
//         const response = await axios.get(`http://localhost:9090/university/departments/${itemId}`);
//         setDepartment(response.data);
//         setFormData({ department_name: response.data.department_name });
//       } catch (error) {
//         setError(error.message);
//       }
//     };
//     fetchDepartment();
//   }, [itemId]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Update only department name
//       await axios.put(`http://localhost:9090/university/departments/${itemId}`, {
//         department_name: formData.department_name
//       });
//       setSuccess(true);
//       setError(null);
//     } catch (error) {
//       setError(error.message);
//       setSuccess(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Update Department Name</h2>
//       {error && <p>Error: {error}</p>}
//       {success && <p>Department name updated successfully!</p>}
//       <form onSubmit={handleSubmit}>
//         <label>
//           Department Name:
//           <input
//             type="text"
//             name="department_name"
//             value={formData.department_name}
//             onChange={handleChange}
//           />
//         </label>
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateItemPage;
// 
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EditFaq.css"; // Add your CSS file for styling
import Simplert from 'react-simplert'
import SideBar from "./SideBar";

function EditFaq({ faq, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    question: faq?.question || "",
    answer: faq?.answer || "",
    source_id: faq?.source_id || "",

  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sources, setSources] = useState([]);



  useEffect(() => {
    setFormData({
      ...formData,
      question: faq?.question || "",
      answer: faq?.answer || "",
      source_id: faq?.source_id || "",

    });
  }, [faq]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};


const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question || !formData.answer || !formData.source_id) {
      setShowErrorAlert(true);
        return;
    }

    try {
        setIsLoading(true);
        await axios.put(`http://localhost:9090/university/faqs/${faq.id}`, formData);
         setShowSuccessAlert(true);
    } catch (error) {
        console.error('Error updating FAQ:', error);
        setShowErrorAlert(true);
    }finally{
      setIsLoading(false)
    }

};


const handleCancel = () => {
  onCancel();
};

useEffect(()=>{
  fetchSources();
},[]);

const fetchSources = async () => {
  try {
      const response = await axios.get('http://localhost:9090/university/sources');
      setSources(response.data);
  } catch (error) {
      console.error('Error fetching sources:', error);
      setShowErrorAlert(true);
  }
};


  return (

    <div className="edit-faq-container" dir="rtl">    <SideBar/>
      <h2 className="header">تعديل السؤال الشائع</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="lable" htmlFor="question">السؤال</label>
          <input
            type="text"
            id="question"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
                    <label className="lable" htmlFor="source_id">المصدر</label>
                    <select
                            id="source_id"
                            name="source_id"
                            value={formData.source_id}
                            onChange={handleInputChange}
                            className="form-control"
                        >
                            <option key="default" value="">اختر المصدر</option>
                            {sources.map(source => (
                                <option key={source.source_id} value={source.source_id}>
                                    {source.full_name}
                                </option>
                            ))}
                        </select>
                </div>
        <div className="form-group">
          <label className="lable" htmlFor="answer">الإجابة</label>
          <textarea
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="btn-container">
        <button type="submit" className="btn-submit" disabled={isLoading} style={{width:"30%"}} >
        {isLoading ? 'جاري التحديث...' : 'حفظ التغييرات'}
        </button>
        <button type="button" className="btn-submit" onClick={handleCancel} disabled={isLoading} style={{width:"30%"}}> 
          إلغاء
        </button>
        </div>
      </form>
      {/* Success and error alerts */}
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
        customCloseBtnText="تم "
      />
    </div>
  );
}

export default EditFaq;