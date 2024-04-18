import React, { useState, useEffect } from 'react';
import './Profile.css'; 
import axios from 'axios';
import CustomNavbar from "../layouts/Navbar"

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    student_full_name: '',
    student_email: '',
    password: '',
    student_phone: '',
    student_avatar: '',
    department_id: '',
    college_id: '',
    //student_brand: '',
   // student_academic_category: '',
  });

  const studentId = sessionStorage.getItem('student_id');

  useEffect(() => {
    if (studentId) {
      fetchProfileData();
      fetchColleges();
      //brandAndCategory();
    }
  }, [studentId]);

    useEffect(() => {   
        if (formData.college_id) {
            fetchDepartments(formData.college_id);
        }
    }
    , [formData.college_id]);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`http://localhost:9090/university/students/${studentId}`);
      const data = await response.json();
      setProfileData(data);
      setFormData(data); // Set form data for updating
    } catch (error) {
      console.error('Error:', error);
    }
  };

/*   const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }; */

  const handleChange = (e) => {
    const { name, value, type } = e.target;
  
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? e.target.files[0] : value
    }));
  };
  

/*   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const response = await fetch(`http://localhost:9090/university/students/${studentId}`, {
        method: 'PUT',
        body: formDataToSend
      });
      const data = await response.json();
      console.log(data); // Handle response as needed
      setProfileData(data); // Update profile data after successful update
    } catch (error) {
      console.error('Error:', error);
    }
  }; */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
  
      const response = await fetch(`http://localhost:9090/university/students/${studentId}`, {
        method: 'PUT',
        body: formDataToSend
      });
      const data = await response.json();
      console.log(data); // Handle response as needed
      setProfileData(data); // Update profile data after successful update
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

//const brandAndCategory = async (e) => {
    //try {
     // const { student_brand, student_academic_category } = formData;
     // const response = await fetch(`http://localhost:9090/university/students/${studentId}/${formData.college_id}/${formData.department_id}`, {
     //   method: 'PUT',
      //  headers: {
      //    'Content-Type': 'application/json',
      //    'accept': '*/*',
      //  },
      //  body: JSON.stringify({
       //   student_brand,
      //    student_academic_category,
      //  }),
    //  });
    //  const data = await response.json();
     // console.log(data); 
     // setProfileData(data); 
   // } catch (error) {
   //   console.error('Error:', error);
   // }
  //};

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

  return (
    <>
    <CustomNavbar />
    <div className="profile-container" dir='rtl'>
      <div className="sidebar" >
        <img src={profileData.student_avatar} alt="Student Image" className="avatar" />
        <h3>{profileData.student_full_name}</h3>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
      <div className="content">
        
        <form className="profile-form" onSubmit={handleSubmit}>
        <div className="heading1" style={{fontSize:"1.3rem",fontWeight:"bold",color:"red"}} > البيانات الاساسية :</div>
          <input type="text" name="student_full_name" value={formData.student_full_name} onChange={handleChange} />
          <input type="email" name="student_email" value={formData.student_email} onChange={handleChange} disabled/>
          <input type="password" name="student_password" value={formData.password} onChange={handleChange} />
          <input type="text" name="student_phone" value={formData.student_phone} onChange={handleChange} />
          <div className="heading1" style={{fontSize:"1.3rem",fontWeight:"bold",color:"red"}} > البيانات الدراسية :</div>
          <hr/>
            <div className="heading1">الكلية</div>
            <select name="college_id" value={formData.college_id} onChange={handleChange} disabled>
            <option value="">اختر الكلية</option>
            {colleges.map((college) => (
                <option key={college.college_id} value={college.college_id}>
                {college.college_name}
                </option>
            ))}
            </select>
            <div className="heading1">القسم</div>
            <select name="department_id" value={formData.department_id} onChange={handleChange} disabled>
            <option value="">اختر القسم</option>
            {departments.map((department) => (
                <option key={department.department_id} value={department.department_id}>
                {department.department_name}
                </option>
            ))}
            </select>
           {/*  <div className='heading1'>الفرقة</div>
            <input type="text" name="student_brand" value={formData.student_brand} onChange={handleChange} />
            <div className='heading1'>الفئة</div>
            <input type="text" name="student_academic_category" value={formData.student_academic_category} onChange={handleChange} /> */}
            <hr/>
          <input type="file" name="student_avatar" onChange={handleChange} />
          <button type="submit" onClick={handleSubmit}>Update</button>
        </form>
      </div>
    </div></>
  );
};

export default Profile;
