import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EditFaq.css";
import Simplert from 'react-simplert'
import SideBar from "../layouts/SideBar";

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
    <div className="edit-faq-container" dir="rtl" style={{padding:"50px",marginRight:"30px",marginLeft:"30px",marginTop:"30px"}}>    <SideBar/>
      <h2 className="header" style={{marginRight:"-70px"}}>تعديل السؤال الشائع</h2>
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
        <div className="btn-container5" style={{padding:"0px",marginTop:"15px"}}>
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
