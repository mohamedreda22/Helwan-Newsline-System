import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Simplert from 'react-simplert';
import '../styles/AddFaq.css';
import useAlert from '../hooks/useAlert';
import Cookies from "js-cookie";

function AddFaq() {
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        source_id: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [sources, setSources] = useState([]);
    const { showAlert, showAlertHandler, hideAlertHandler, alertType, alertTitle, alertMessage, customCloseBtnText } = useAlert();
    const sourceId = Cookies.get('source_id'); 


    useEffect(() => {
        setFormData({
            question: "",
            answer: "",
            source_id: "",
        });
    }, []);  

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.question || !formData.answer || !formData.source_id) {
            showAlertHandler('error', 'Failed', 'برجاء ملئ كل البيانات', 'اغلاق');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:9090/university/faqs', formData);

            if (response && response.status === 201) {
                showAlertHandler('success', 'Success', 'تم اضافة السؤال بنجاح', 'تم');
                resetForm();
            } else {
                showAlertHandler('error', 'Failed', 'للاسف فشل اضافة السؤال ', 'اغلاق');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('حدث خطأ أثناء إضافة السؤال');
            let errorMessage = 'حدث خطأ أثناء إضافة السؤال';
            if (error.response) {
                if (error.response.status === 400) {
                    errorMessage = 'Bad request: Please check your input data.';
                } else {
                    errorMessage = 'An error occurred while processing your request.';
                }
            } else if (error.request) {
                errorMessage = 'Could not connect to the server. Please try again later.';
            } else {
                errorMessage = 'An unexpected error occurred. Please try again later.';
            }
            showAlertHandler('error', 'Failed', errorMessage, 'اغلاق');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            question: "",
            answer: "",
            source_id: "",
        });
        setError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            source_id:sourceId,
            [name]: name === 'source_id' ? parseInt(value, 10) || '' : value
        });
    };

    return (
        <div className="add-faq-page" dir="rtl">
            <div className="add-faq-container">
                <h1 className="header"style={{marginTop:"0px"}}>إضافة سؤال شائع</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="lable" htmlFor="question">السؤال</label>
                        <input
                            type="text"
                            id="question"
                            name="question"
                            value={formData.question}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="lable" htmlFor="answer">الإجابة</label>
                        <textarea
                            id="answer"
                            name="answer"
                            value={formData.answer}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className="btn-submit" style={{width:"35%",marginRight:"160px",marginTop:"10px"}}>
                        {isLoading ? 'جاري إضافة السؤال' : 'إضافة السؤال'}
                    </button>

                    {error && <div className="error">{error}</div>}
                </form>
                <Simplert
                showSimplert={showAlert}
                type={alertType}
                title={alertTitle}
                message={alertMessage}
                onClose={hideAlertHandler}
                customCloseBtnText={customCloseBtnText}
            />                
            </div>
        </div>
    );
}

export default AddFaq;
