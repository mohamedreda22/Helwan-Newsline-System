import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Simplert from 'react-simplert';
import Sidebar from './SideBar';
import '../styles/AddFaq.css';

function AddFaq() {
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        source_id: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [sources, setSources] = useState([]);
    

    useEffect(() => {
        setFormData({
            question: "",
            answer: "",
            source_id: "",
        });
    }, []);

    useEffect(()=>{
        fetchSources();
    },[]);    
    
    const fetchSources = async () =>{
        try {
            const response = await axios.get('http://localhost:9090/university/sources');
            setSources(response.data)
        }
        catch(error){
            console.error('Error fetching sources:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.question || !formData.answer || !formData.source_id) {
            setError('برجاء ملئ كل البيانات');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:9090/university/faqs', formData);

            if (response && response.status === 201) {
                setShowSuccessAlert(true);
                resetForm();
            } else {
                throw new Error('حدث خطأ أثناء إضافة السؤال');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('حدث خطأ أثناء إضافة السؤال');
            setShowErrorAlert(true);
            let errorMessage = 'حدث خطأ أثناء إضافة السؤال';
            if (error.response) {
                if (error.response.status === 400) {
                    // Handle specific error codes if needed
                    errorMessage = 'Bad request: Please check your input data.';
                } else {
                    // Handle other status codes
                    errorMessage = 'An error occurred while processing your request.';
                }
            } else if (error.request) {
                // The request was made but no response was received
                errorMessage = 'Could not connect to the server. Please try again later.';
            } else {
                // Something happened in setting up the request that triggered an Error
                errorMessage = 'An unexpected error occurred. Please try again later.';
            }
            setError(errorMessage);
            setShowErrorAlert(true)

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
            [name]: name === 'source_id' ? parseInt(value, 10) || '' : value
        });
    };

    return (
        <div className="add-faq-page" dir="rtl">
            <div className="add-faq-container">
                <h1 className="header">إضافة سؤال شائع</h1>
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
                        <label className="lable" htmlFor="source_id">المصدر</label>
                        <select
                                id="source_id"
                                name="source_id"
                                value={formData.source_id}
                                onChange={handleChange}
                                className="form-control"
                                required
                        >
                                <option value="">اختر المصدر</option>
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
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className="btn-submit" style={{width:"65%"}}>
                        {isLoading ? 'جاري إضافة السؤال' : 'إضافة السؤال'}
                    </button>

                    {error && <div className="error">{error}</div>}
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
                        message="تمت الاضافة بنجاح"
                        onClose={() => setShowSuccessAlert(false)}
                        customCloseBtnText="تم "
                    />
                </form>
            </div>
        </div>
    );
}

export default AddFaq;
