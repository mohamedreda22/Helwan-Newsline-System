import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EditFaq.css"; // Add your CSS file for styling
import Simplert from 'react-simplert'

function EditFaq({ faq, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    question: faq.question || "",
    answer: faq.answer || "",
  });

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) {
      setShowErrorAlert(true);
      return;
    }

    try {
      const response = await axios.put(`http://localhost:9090/university/faqs/${faq.id}`, formData);
      if (response.status === 200) {
        setShowSuccessAlert(true);
        onSave(formData);
      } else {
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Error updating FAQ:', error);
      setShowErrorAlert(true);
    }
  };

  return (
    <div className="edit-faq-container" dir="rtl">
      <h2 className="header">تعديل السؤال الشائع</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">السؤال</label>
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
          <label htmlFor="answer">الإجابة</label>
          <textarea
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          حفظ التغييرات
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          إلغاء
        </button>
      </form>
      {/* Success and error alerts */}
      <div>
        <p className={showSuccessAlert ? "success-message" : "hidden"}>تم التعديل بنجاح</p>
        <p className={showErrorAlert ? "error-message" : "hidden"}>حدث خطأ ما يرجي اعادة المحاولة</p>
      </div>
      <Simplert
                showSimplert={showErrorAlert}
                type="error"
                title="Failed"
                message="حدث خطأ ما يرجي اعادة المحاولة"
                onClose={() => setShowErrorAlert(false)}
                customCloseBtnText= 'اغلاق'
            />
            <Simplert
                showSimplert={showSuccessAlert}
                type="success"
                title="Success"
                message="تم التعديل بنجاح"
                onClose={() => setShowSuccessAlert(false)}
                customCloseBtnText= 'تم '
            />
    </div>
  );
}

export default EditFaq;
