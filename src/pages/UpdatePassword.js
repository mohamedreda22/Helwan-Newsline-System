import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAlert from '../hooks/useAlert';
import Simplert from 'react-simplert';
import '../styles/UpdatePassword.css';
import logo from '../assets/images/logo.png';

function UpdatePassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { showAlert, showAlertHandler, hideAlertHandler, alertType, alertTitle, alertMessage, customCloseBtnText } = useAlert();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword || !otp) {
            setError('يرجى ملء جميع الحقول');
            return;
        }

        if (password !== confirmPassword) {
            showAlertHandler('error', 'Failed', 'يجب أن تتطابق كلمة المرور وتأكيد كلمة المرور', 'اغلاق');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:9090/university/auth/updatePassword', {
                email,
                password,
                confirmPassword,
                otp
            });

            if (response && response.status === 202) {
                showAlertHandler('success', 'Success', 'تم تحديث كلمة المرور بنجاح', 'تم');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setOtp('');
                setTimeout(() => {
                    window.location.href = '/login'; 
                }, 2000);            
            } else {
                showAlertHandler('error', 'Failed', 'فشل في تحديث كلمة المرور', 'اغلاق');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.status === 400 && error.response.data.message === 'Otp Not Matched') {
                showAlertHandler('error', 'Failed', 'رمز التحقق غير صحيح. يرجى التحقق والمحاولة مرة أخرى.', 'اغلاق');
            } else {
                showAlertHandler('error', 'Failed', 'حدث خطأ. يرجى المحاولة مرة أخرى في وقت لاحق.', 'اغلاق');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
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
        <div className="update-password-page">
            <div className="update-password-container">               
                 <div className="logo">
                    <img src={logo} alt="logo" />
                 </div>
                <h1 className="header">تحديث كلمة المرور</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="البريد الإلكتروني"
                            value={email}
                            onChange={handleEmailChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="كلمة المرور الجديدة"
                            value={password}
                            onChange={handlePasswordChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="تأكيد كلمة المرور"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            placeholder="رمز التحقق"
                            value={otp}
                            onChange={handleOtpChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className="btn-submit">
                        {isLoading ? 'جاري تحديث كلمة المرور' : 'تحديث كلمة المرور'}
                    </button>
                    {error && <div className="error">{error}</div>}
                    <a
                        href="/login"
                        className="link login"
                    >
                        العودة إلى تسجيل الدخول
                    </a>
                </form>
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

export default UpdatePassword;
