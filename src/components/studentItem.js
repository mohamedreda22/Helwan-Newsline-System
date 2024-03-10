import React from 'react';
import '../styles/StudentItem.css'

function StudentItem({ student }) {
    return (
        <div className="student-item-container">
            <h2>Name:{student.full_name}</h2>
            <p>Email: {student.email}</p>
            <p>Phone: {student.phone}</p>
            <img src={student.image_path} alt={student.full_name} className='student-item-image'/>
        </div>
    );
}

export default StudentItem;
