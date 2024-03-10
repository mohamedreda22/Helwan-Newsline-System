import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentItem from '../components/studentItem'; // Import the StudentItem component

function StudentDashboard() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:9090/university/students');
                setStudents(response.data);
            } catch (error) {
                setError('Failed to fetch student information');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="student-dashboard">
            <h2>Welcome to the Student Dashboard!</h2>
            <div className="student-list">
                {students.map((student) => (
                    <StudentItem key={student.student_id} student={student} />
                ))}
            </div>
        </div>
    );
}

export default StudentDashboard;
