import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SignUp.css'; 
import logo from '../assets/images/logo.png';
import Simplert from 'react-simplert';
import useAlert from '../hooks/useAlert';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
        student_full_name: '',
        student_email: '',
        student_password: '',
        student_phone: '',
        student_image_path: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { showAlert, showAlertHandler, hideAlertHandler, alertType, alertTitle, alertMessage, customCloseBtnText } = useAlert();
    const [studentImagePath, setStudentImagePath] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.student_email || !formData.student_password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:9090/university/students', formData);
            console.log('Response:', response.data);

            if (response && (response.status === 200 || response.status === 201)) {
                showAlertHandler('success', 'Success', 'Account created successfully', 'Close');
                setFormData({
                    student_full_name: '',
                    student_email: '',
                    student_password: '',
                    student_phone: '',
                    student_image_path: ''
                });
                setStudentImagePath(null)

                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                showAlertHandler('error', 'Failed', 'Failed to create account', 'Close');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response) {
                showAlertHandler('error', 'Failed', error.response.data.message, 'Close');
            } else {
                showAlertHandler('error', 'Failed', 'An error occurred. Please try again later.', 'Close');
            }
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
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (file) {
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    student_image_path: reader.result,
                });
                }
                reader.readAsDataURL(file);

        }
        console.log(file)
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <h1 className="header">الانضمام إلينا</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="student_full_name"
                            placeholder="Full Name"
                            value={formData.student_full_name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="student_email"
                            placeholder="Email"
                            value={formData.student_email}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="student_password"
                            placeholder="Password"
                            value={formData.student_password}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <InputMask
                            mask="9999-999-9999"
                            maskChar=" "
                            type="tel"
                            name="student_phone"
                            placeholder="Phone (####-###-####)"
                            value={formData.student_phone}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                     <label className="lable" htmlFor="student_image_path">رفع الصورة</label>
                    <br/>
                    <input 
                     className="form-control"
                     type="file" 
                     id='student_image_path' 
                     name="student_image_path"
                     onChange={handleFileChange}
                     required /> 
                    </div>
{/*                     <table className="image-table">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <label className="image-label"> : عرض الصورة </label><br />
                                            {studentImagePath && <img src={studentImagePath} alt="Old Event" className="image-preview" />}
                                        </td>
                                    </tr>

                                    </tbody>
                                </table> */}
                    <button type="submit" disabled={isLoading} className="btn-submit">
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    {error && <div className="error">{error}</div>}
                    <div className="links-container">
                         <a href="/logIn" className="link register"> العودة الي تسجيل الدخول</a>
                     </div>
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

export default SignUp;
