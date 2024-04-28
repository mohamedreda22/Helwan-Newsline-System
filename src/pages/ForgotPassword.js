import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';
import '../styles/ForgotPassword.css'; 
import axios from 'axios';
import useAlert from '../hooks/useAlert';
import Simplert from 'react-simplert';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { showAlert, showAlertHandler, hideAlertHandler, alertType, alertTitle, alertMessage, customCloseBtnText } = useAlert();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('برجاء إدخال عنوان البريد الإلكتروني');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`http://localhost:9090/university/auth/sendOtp?email=${email}`);
            if (response && (response.status === 200 || response.status === 201)) {
                showAlertHandler('success', 'Success', 'تم إرسال تعليمات إعادة تعيين كلمة المرور إلى بريدك الإلكتروني', 'تم');
                setEmail('');
                setTimeout(() => {
                    window.location.href = '/updatePassword'; 
                }, 2000);
            } else {
                showAlertHandler('error', 'Failed', 'فشل في إرسال رابط إعادة تعيين كلمة المرور', 'اغلاق');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.status === 404) {
                showAlertHandler('error', 'Failed', 'البريد الإلكتروني غير مسجل في النظام. الرجاء التحقق من البريد الإلكتروني المدخل.', 'اغلاق');
            } else {
                showAlertHandler('error', 'Failed', 'حدث خطأ. يرجى المحاولة مرة أخرى في وقت لاحق.', 'اغلاق');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    useEffect(() => {
        // Add a class to the body element when the component mounts
        document.body.classList.add('login-page-body');
        // Remove the class when the component unmounts
        return () => {
            document.body.classList.remove('login-page-body');
        };
    }, []);

    return (
        <div className="forgot-password-page">
            <div className="forgot-password-container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <h1 className="header">استعادة كلمة المرور</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="البريد الإلكتروني"
                                value={email}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" disabled={isLoading} className="btn-submit">
                            {isLoading ? 'جاري إرسال البريد الإلكتروني' : ' إرسال الرابط'}
                        </button>
                        {error && <div className="error">{error}</div>}
                    </form>
                <div className="links-container">
                    <a href="/login" className="link login">العودة إلى تسجيل الدخول</a>
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

export default ForgotPassword;
