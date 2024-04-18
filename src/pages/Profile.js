import React, { useState, useEffect } from 'react';
import './Profile.css'; 

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    student_full_name: '',
    student_email: '',
    student_password: '',
    student_phone: '',
    student_image_path: '',
    department_id: '',
    college_id: ''
  });

  const studentId = sessionStorage.getItem('student_id');

  useEffect(() => {
    if (studentId) {
      fetchProfileData();
    }
  }, [studentId]);

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

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

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

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Student Profile</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <input type="text" name="student_full_name" value={formData.student_full_name} onChange={handleChange} />
        <input type="email" name="student_email" value={formData.student_email} onChange={handleChange} />
        <input type="password" name="student_password" value={formData.student_password} onChange={handleChange} />
        <input type="text" name="student_phone" value={formData.student_phone} onChange={handleChange} />
        <input type="file" name="student_image_path" onChange={handleChange} />
        <img src={profileData.student_image_path} alt="Student Image" className="image-preview" />
        <button type="submit" onClick={handleSubmit}>Update</button>
      </form>
    </div>
  );
};

export default Profile;
