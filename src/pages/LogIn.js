//it's ready to go live but we need to apply API when they finsh it
import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import '../styles/LogIn.css';
import axios from 'axios';

function LogIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError('برجاء ملئ كل البيانات');
            return;
        }
        setIsLoading(true);

        try {
            const response = await axios.post(`http://localhost:9090/university/api/modernhome/auth/login?email=${formData.email}&password=${formData.password}`);
            console.log('Response:', response);
            if (response && response.status === 202) {
                alert('تم تسجيل الدخول بنجاح');
                console.log('Form data submitted:', response.data);
                setFormData({
                    email: '',
                    password: '',
                });
            } else {
                alert('فشل تسجيل الدخول بنجاح');
                console.log('Response data:', response.data);
            }
        } catch (error) {
            console.error('Error:', error);
            console.log('Response data:', error.response ? error.response.data : '');
            alert('An error occurred. Please try again later.');
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
                        />
                    </div>
                    <div className="form-group">
                        <label  htmlFor="rememberMe">تذكرني دائما</label>
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
            </div>
        </div>
    );
}

export default LogIn;
