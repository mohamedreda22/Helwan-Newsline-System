import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './VideoDetails.css';
import Navbar from '../layouts/Navbar';

const VideoDetails = () => {
    const [videoData, setVideoData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [showCommentSection, setShowCommentSection] = useState(false); 
    const [studentsMap, setStudentsMap] = useState({});
    
    const { id } = useParams();

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/videos/${id}`);
                setVideoData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching video details:", error);
                setError("An error occurred while fetching video details.");
                setIsLoading(false);
            }
        };

/*         const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/comments`);
                setComments(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching comments:", error);
                setError("An error occurred while fetching comments.");
                setIsLoading(false);
            }
        }; */

        const fetchStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/students`);
                const students = response.data;
                const studentsObj = {};
                students.forEach(student => {
                    studentsObj[student.student_id] = student.student_name;
                });
                setStudentsMap(studentsObj);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching students:", error);
                setError("An error occurred while fetching students.");
                setIsLoading(false);
            }
        };

        fetchVideoDetails();
        //fetchComments();
        fetchStudents();
    }, [id]);

    const handleSubmitComment = async () => {
        try {
            const response = await axios.post('http://localhost:9090/university/comments', {
                student_id: 21,
                channel_id: id, // Assuming channel_id is equivalent to video_id
                channel_type: "VIDEO",
                student_comment: comment
            });
            const newComment = response.data;
            setComments([...comments, newComment]);
            setComment(""); // Clear comment input after submission
        } catch (error) {
            console.error("Error submitting comment:", error);
            // Handle error submission
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const modifiedVideoPath = videoData?.video_path.replace('/videos', '');

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate();
        const month = dateTime.toLocaleString('default', { month: 'long' });
        return { day, month };
    };

    const { day, month } = formatDateTime(videoData?.createDate);

    const handleAddComment = () => {
        setShowCommentSection(true);
    };

    return (
                    <>
              <Navbar />
            <div className="video-details-container">
            <video className="video-player" controls style={{ width: "90%", marginLeft: "5%" }}>
                <source src={`http://localhost:3000/${modifiedVideoPath}`} type="video/mp4" zoom="50%"/>
                Your browser does not support the video tag or the file format of this video.
            </video>
            <div className="video-info">
            <div className="event-card-date1" >
                <span className="day1">{day}</span>
                <span className="month1">{month}</span> :نشر بتاريخ
            </div>
                <h3 className="video-title">{videoData?.video_title} </h3>
                <p className="video-description">{videoData?.video_description}</p>
            </div>
            <div className='video-comments'>
                <div className="heading">:التعليقات</div>
                <hr />
                <div className='comment'>
                    {comments.map((comment, index) => (
                        <div key={index}>
                            <h4>{studentsMap[comment.student_id]}</h4>
                            <p>{comment.student_comment}</p>
                        </div>
                    ))}
                </div>
                {showCommentSection ? (
                    <div>
                        <textarea
                            rows="4"
                            cols="50"
                            placeholder=".......أضف تعليقاََ"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className='comment-box'
                        />
                        <br></br>
                        <button onClick={handleSubmitComment} className='btn-submit' style={{width:"12%",padding:"10px",marginLeft:"18%"}}>أضافة التعليق </button>
                    </div>
                ) : (
                    <button onClick={handleAddComment} className='btn-submit' style={{width:"12%",padding:"10px"}}>أضف تعليقاََ </button>
                )}
            </div>
        </div>
        </>
    );
};

export default VideoDetails;
