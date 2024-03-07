import React from 'react';

function StudentItem({ student }) {
    return (
        <div className="student-item">
            <h2>Name:{student.student_full_name}</h2>
            <p>Email: {student.student_email}</p>
            <p>Phone: {student.student_phone}</p>
            <img src={student.student_image_path} alt={student.student_full_name} />
        </div>
    );
}

export default StudentItem;
