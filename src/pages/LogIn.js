import React, { useState, useContext, useEffect } from 'react';
import logo from '../assets/images/logo.png';
import '../styles/LogIn.css';
import axios from 'axios';
import useAlert from '../hooks/useAlert';
import Simplert from 'react-simplert';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import UserRoleContext from '../hooks/UserRoleContext';

function LogIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { setUserRole } = useContext(UserRoleContext);
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
            //console.log('Response:', response);
            if (response && response.status === 202) {
                showAlertHandler('success', 'Success', 'تم تسجيل الدخول بنجاح', 'تم');
                // Store token in cookie
                Cookies.set('userRole', response.data.userRole, { expires: 1 }); 
                // Store student_id in cookie if user role is STUDENT
                if (response.data.userRole === "STUDENT") {
                    Cookies.set('student_id', response.data.id);
                }
                if (response.data.userRole === "SOURCE") {
                    Cookies.set('source_id', response.data.id);
                }
                setFormData({
                    email: '',
                    password: '',
                });
                const userRole = response.data.userRole;
                setUserRole(userRole);
                // Set appropriate route based on user role
                let route = '/';
                switch (userRole) {
                    case 'ADMIN':
                        route = '/showDepartments';
                        break;
                    case 'SOURCE':
                        route = '/showEvents';
                        break;
                    case 'STUDENT':
                        route = '/landingPage';
                        break;
                    default:
                        break;
                }
                // Navigate to the determined route
                navigate(route);
                setTimeout(function () {
                    window.location.reload();
                }, 10);
            } else {
                showAlertHandler('error', 'Failed', 'للاسف فشل تسجيل الدخول ', 'اغلاق');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                showAlertHandler('error', 'Failed', error.response.data.message, 'اغلاق');
            } else {
                showAlertHandler('error', 'Failed', 'حدث خطأ. يرجى المحاولة مرة أخرى في وقت لاحق.', 'اغلاق');
            }
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Add a class to the body element when the component mounts
        document.body.classList.add('login-page-body');
        // Remove the class when the component unmounts
        return () => {
            document.body.classList.remove('login-page-body');
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="login-page" style={{display:"block"}}> 
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
                    <button type="submit" disabled={isLoading} className="btn-submit" >
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
