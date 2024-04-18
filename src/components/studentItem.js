import React from 'react';
import '../styles/StudentItem.css'

function StudentItem({ student }) {
    return (
        <div className="student-item-container">
            <h2>Name:{student.student_full_name}</h2>
            <p>Email: {student.student_email}</p>
            <p>Phone: {student.student_phone}</p>
            <img src={student.student_avatar} alt={student.student_full_name} className='student-item-image'/>
        </div>
    );
}

export default StudentItem;
