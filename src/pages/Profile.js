import React, { useState, useEffect } from 'react';
import './Profile.css'; 
import axios from 'axios';
import CustomNavbar from "../layouts/Navbar"
import Footer from "../layouts/Footer"
import InputMask from 'react-input-mask';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    student_phone: '',
    student_image_path: '',
    student_department_id: '',
    college_id: '',
    student_brand: '',
    student_academic_category: '',
    student_team:'',
    notify_me:'',
  });

  const studentId = sessionStorage.getItem('student_id');

  useEffect(() => {
    if (studentId) {
      fetchProfileData();
      fetchColleges();
    }
  }, [studentId]);

    useEffect(() => {   
        if (formData.student_college_id) {
            fetchDepartments(formData.student_college_id);
        }
    }
    , [formData.college_id]);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`http://localhost:9090/university/students/${studentId}`);
      const data = await response.json();
      setProfileData(data);
      setFormData(data); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};
const handleToogleChange = (e) => {
  const { name, checked } = e.target;
  setFormData({
    ...formData,
    [name]: checked, 
  });
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const collegeId = formData.student_college_id;
      const departmentId = formData.student_department_id;
      const response = await axios.put(`http://localhost:9090/university/students/${studentId}/${collegeId}/${departmentId}`,formData );
      if (response && (response.status === 200 || response.status === 202)) {
        alert('تم تحديث البيانات بنجاح');
        window.location.reload();
      } else {
        alert('حدث خطأ أثناء تحديث البيانات');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    // Implement logout functionality
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('student_id');
    window.location.href = '/';

  };

  const handleDeleteAccount = () => {
    // Implement delete account functionality
    fetch(`http://localhost:9090/university/students/${studentId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Handle response as needed
        localStorage.removeItem('token');
        sessionStorage.removeItem('student_id');
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Error:', error);
      });

  };

  const fetchDepartments = async (collegeId) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/university/colleges/getAllDepartments/${collegeId}`
      );
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
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
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0] ;
    const reader = new FileReader();
    
    if (file) {
        reader.onloadend = () => {
            setFormData({
                ...formData,
                student_image_path: reader.result,
            })
        };
        reader.readAsDataURL(file);
    }
};

  return (
    <>
    <CustomNavbar />
    <div className="profile-container" dir='rtl'>
      <div className="sidebar" >
        <div style={{marginRight:"45px"}}>
        <img src={profileData.student_image_path} alt="Student Image" className="avatar" style={{marginRight:"10px",borderRadius:"20px"}} />
        <h3>{profileData.full_name}</h3></div>
        <div  style={{paddingLeft:"60px",marginTop:"10px",marginRight:"-60px"}}>
        <button className='btn-submit' style={{backgroundColor:"red"}} onClick={handleLogout}>تسجيل الخروج</button>
        <button className='btn-submit' style={{backgroundColor:"black"}}  onClick={handleDeleteAccount}> حذف الحساب</button>
        </div>
      </div>
      <div className="content" >
        <form className="profile-form" onSubmit={handleSubmit}>
        <div className="heading1" style={{fontSize:"1.3rem",fontWeight:"bold",color:"red"}} > البيانات الاساسية :</div>
        <div className="form-row" style={{marginTop:"10px"}}>
          <div className="form-group">
          <div className="heading1">الاسم الكامل</div>
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} /></div>
          <div className="form-group">
          <div className="heading1">البريد الالكتروني</div>
          <input type="email" name="student_email" value={formData.email} onChange={handleChange} disabled/></div></div>
          <div className="form-row" style={{marginTop:"20px"}}>
          <div className="form-group">
          <div className="heading1">كلمة المرور</div>
          <input type="password" name="student_password" value={formData.password} onChange={handleChange} /></div>
          <div className="form-group">
          <div className="heading1">رقم الهاتف</div>
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
          </div></div>
          <hr/>
          <div className="heading1" style={{fontSize:"1.3rem",fontWeight:"bold",color:"red"}} >  الاشعارات :</div>
          <div className="toggle-switch">
            <input 
              className="toggle-input" 
              id="toggle" 
              type="checkbox" 
              name="notify_me" 
              checked={formData.notify_me} 
              onChange={handleToogleChange} 
            />
            <label className="toggle-label" htmlFor="toggle"></label>

          </div>

          <hr/>
          <div className="heading1" style={{fontSize:"1.3rem",fontWeight:"bold",color:"red"}} > البيانات الدراسية :</div>
          <div className="form-row" >
          <div className="form-group" style={{marginTop:"10px"}}>
            <div className="heading1">الكلية</div>
            <select name="college_id" value={formData.student_college_id} onChange={handleChange} disabled>
            <option value="">اختر الكلية</option>
            {colleges.map((college) => (
                <option key={college.college_id} value={college.college_id}>
                {college.college_name}
                </option>
            ))}
            </select></div>
            <div className="form-group" style={{marginTop:"10px"}}>
            <div className="heading1">القسم</div>
            <select name="department_id" value={formData.student_department_id} onChange={handleChange} disabled>
            <option value="">اختر القسم</option>
            {departments.map((department) => (
                <option key={department.department_id} value={department.department_id}>
                {department.department_name}
                </option>
            ))}
            </select>
            </div>
            </div>
            <div className="form-row" style={{marginTop:"20px"}}>
            <div className="form-group" >
            <div className='heading1'>الفرقة</div>
            <input type="text" name="student_brand" value={formData.student_brand} onChange={handleChange} disabled/></div>
            <div className="form-group" >
            <div className='heading1'>الفئة</div>
            <input type="text" name="student_academic_category" value={formData.student_academic_category} onChange={handleChange} disabled/></div>
            <div className="form-group" >
            <div className="heading1">فريق العمل</div>
           <input type="text" name="student_team" value={formData.student_team} onChange={handleChange} /></div>
           </div>
            <hr/>
         <div className="form-group" style={{marginTop:"10px"}}>
                    <label className="lable">تعديل الصورة</label>
                    <br/>
                    <input 
                        className="form-control"
                        type="file" 
                        id="student_image_path" 
                        name="student_image_path"
                        onChange={handleFileChange}
                        style={{width:"50%",fontWeight:"bold",alignSelf:"center",marginRight:"30px"}}
                    /> 
                </div>
          <button type="submit" className='btn-submit' style={{backgroundColor:"#091160",width:"50%",fontWeight:"bold",alignSelf:"center",marginLeft:"30px"}} onClick={handleSubmit}>حفظ التغيرات</button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Profile;
