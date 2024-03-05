//it's ready to go live but we need to apply API when they finsh it
import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import '../styles/LogIn.css';
import axios from 'axios';
import useAlert from '../hooks/useAlert';
import Simplert from 'react-simplert';
import { useNavigate } from 'react-router-dom';



function LogIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { showAlert, showAlertHandler, hideAlertHandler, alertType, alertTitle, alertMessage, customCloseBtnText } = useAlert();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError('برجاء ملئ كل البيانات');
            return;
        }
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:9090/university/auth/login', formData);
            console.log('Response:', response);
            if (response && (response.status === 200 ||response.status === 201 || response.status === 202)) {
                showAlertHandler('success', 'Success', 'تم تسجيل الدخول بنجاح', 'تم');
                console.log('Form data submitted:', response.data);
                setFormData({
                    email: '',
                    password: '',
                });
                navigate('/showEvents');
                localStorage.setItem('token', response.data.token);
            } else {
                showAlertHandler('error', 'Failed', 'للاسف فشل تسجيل الدخول ', 'اغلاق');
                console.log('Response data:', response.data);
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                showAlertHandler('error', 'Failed', error.response.data.message, 'اغلاق');
            } else {
                showAlertHandler('error', 'Failed', 'حدث خطأ. يرجى المحاولة مرة أخرى في وقت لاحق.', 'اغلاق');
            }
                showAlertHandler('error', 'Failed', error.response.data.message, 'اغلاق');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <h1 className="header">تسجيل الدخول</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="البريد الالكتروني"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="كلمة المرور"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className='remember-me'  htmlFor="remember-me">تذكرني دائما</label>
                        <input
                            type="checkbox"
                            id="rememberMe"
                            name="rememberMe"
                            value="rememberMe"
                            className="checkbox"
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className="btn-submit">
                        {isLoading ? 'جاري تسجيل الدخول' : 'تسجيل الدخول'}
                    </button>
                    {error && <div className="error">{error}</div>}
                </form>
                <div className="links-container">
                         <a href="/forgotPassword" className="link forgot-password">نسيت كلمة المرور؟</a>
                         <a href="/signUp" className="link register">ليس لديك حساب؟ سجل الان</a>
                     </div>
            </div>
            <Simplert
                showSimplert={showAlert}
                type={alertType}
                title={alertTitle}
                message={alertMessage}
                onClose={hideAlertHandler}
                customCloseBtnText={customCloseBtnText}
            />
        </div>
    );
}

export default LogIn;
