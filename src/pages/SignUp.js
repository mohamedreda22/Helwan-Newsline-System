import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SignUp.css'; 
import logo from '../assets/images/logo.png';
import Simplert from 'react-simplert';
import useAlert from '../hooks/useAlert';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        student_phone: '',
        student_image_path: '',
        department_id:'',
        college_id:'',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { showAlert, showAlertHandler, hideAlertHandler, alertType, alertTitle, alertMessage, customCloseBtnText } = useAlert();
    const [studentImagePath, setStudentImagePath] = useState(null);
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [colleges, setColleges] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:9090/university/students', formData);

            if (response && (response.status === 200 || response.status === 201)) {
                showAlertHandler('success', 'Success', 'Account created successfully', 'Close');
                setFormData({
                    full_name: '',
                    email: '',
                    password: '',
                    student_phone: '',
                    student_image_path: '',
                    department_id:'',
                    college_id:'',
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

    const fetchDepartments = async (collegeId) => {
        try {
            const response = await axios.get(`http://localhost:9090/university/colleges/getAllDepartments/${collegeId}`);
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const fetchColleges = async () => {
        try {
          const response = await axios.get(
            "http://localhost:9090/university/colleges"
          );
          setColleges(response.data);
        } catch (error) {
          console.error("Error fetching colleges:", error);
      };
    }

    useEffect(() => {
        fetchColleges()
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
           if (name === 'college_id') {
              fetchDepartments(value);
          }
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
        console.log(file);
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
        <div className="signup-page" dir='rtl'>
            <div className="signup-container">
                <div className="logo">
                    <img src={logo} alt="logo" style={{marginBottom:"0px",marginTop:"0px",margin:"0px auto",paddingBottom:"0px"}}/>
                </div>
                <h1 className="header" style={{marginBottom:"5px",marginTop:"5px"}}>الانضمام إلينا</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group" >
                            <input
                                type="text"
                                name="full_name"
                                placeholder="Full Name"
                                value={formData.full_name}
                                onChange={handleChange}
                                className="form-control"
                                required
                                style={{marginBottom:"0px"}}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                required
                                style={{marginBottom:"0px"}}
                            />
                        </div>
                    </div>
                    <div className="form-row" style={{marginTop:"15px"}}>
                        <div className="form-group">
                            
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control"
                                required
                                style={{marginBottom:"0px"}}

                            />
                        </div>
                        <div className="form-group" style={{marginTop:"0px"}}>
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
                                style={{padding: "10px 20px",borderBottom:" 2px solid #000000"}}

                            />
                        </div>
                    </div>
                    <div className="form-row" style={{marginTop:"15px"}}>
                    <div className="form-group">
                       <select
                            name="college_id"
                            value={formData.college_id}
                            onChange={handleChange}
                            className="form-control"
                            required
                            style={{padding: "10px 20px",borderBottom:" 2px solid #000000"}}
                            >
                            <option value="">اختر الكلية</option>
                            {colleges.map((college) => (
                                <option key={college.college_id} value={college.college_id}>
                                    {college.college_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <select
                            name="department_id"
                            value={formData.department_id}
                            onChange={handleChange}
                            className="form-control"
                            required
                            style={{padding: "10px 20px",borderBottom:" 2px solid #000000"}}
                            >
                            <option value="">اختر القسم</option>
                                {departments.map((department) => (
                                    <option key={department.department_id} value={department.department_id}>
                                        {department.department_name}
                                    </option>
                            ))}
                        </select>
                    </div>
                    </div>
                    <div className="form-group" style={{marginTop:"20px"}}>
                        <input
                            type="file"
                            id="student_image_path"
                            name="student_image_path"
                            onChange={handleFileChange}
                            required
                            style={{padding:"0",marginBottom:'5px'}}
                        />
                    </div>
                    <button type="submit" disabled={isLoading} className="btn-submit" style={{width:"170px",marginLeft:"35px"}}>
                        {isLoading ? 'جاري أنشاء الحساب...' : 'أنشاء حساب'}
                    </button>
                    {error && <div className="error">{error}</div>}
                    <div className="links-container" style={{paddingRight:"35px"}}>
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
