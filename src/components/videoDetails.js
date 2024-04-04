import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './VideoDetails.css';
import Navbar from '../layouts/Navbar';
import VideoItemStudent from './VideoItemStudent';

const VideoDetails = () => {
    const [videoData, setVideoData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [comment, setComment] = useState(""); 
    const [comments, setComments] = useState([]);
    const [showCommentSection, setShowCommentSection] = useState(false); 
    const [studentsMap, setStudentsMap] = useState({});
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [videos, setVideos] = useState([]);
    
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

        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/comments/getAllComments/channelType/VIDEO/channelId/${id}`);
                setComments(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching comments:", error);
                setError("An error occurred while fetching comments.");
                setIsLoading(false);
            }
        };
        
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:9090/university/videos');
                setVideos(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching videos:", error);
                setError("An error occurred while fetching videos.");
                setIsLoading(false);
            }
        };

        const fetchStudents = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/students`);
                const students = response.data;
                const studentsObj = {};
                students.forEach(student => {
                    studentsObj[student.student_id] = {
                        fullName: student.full_name,
                        avatar: student.student_avatar
                    };
                });
                setStudentsMap(studentsObj);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching students:", error);
                setError("An error occurred while fetching students.");
                setIsLoading(false);
            }
        };

        const checkAuthorization = () => {
            const studentId = sessionStorage.getItem('student_id');
            if (studentId) {
                setIsAuthorized(true);
            }
        };

        fetchVideoDetails();
        fetchComments();
        fetchStudents();
        checkAuthorization();
        fetchVideos();
    }, [id]);

    const handleSubmitComment = async () => {
        try {
            const studentId = sessionStorage.getItem('student_id');
            if (!studentId) {
                // Handle the case where student_id is not found in sessionStorage
                console.error("Student ID not found in sessionStorage.");
                return;
            }
    
            const response = await axios.post('http://localhost:9090/university/comments', {
                student_id: parseInt(studentId), // Parse to integer if needed
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
    
    const customStyle = {
        width: '31%', 
        backgroundColor: 'lightgray', 
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
                            <div key={index} className='single-comment'>
                                <div className="comment-header">
                                    {studentsMap[comment.student_id] && (
                                        <>
                                            <h4>{studentsMap[comment.student_id].fullName}</h4>
                                            <img src={studentsMap[comment.student_id].avatar} alt="Avatar" className="avatar" />
                                        </>
                                    )}
                                </div>
                                <li className='comment-content'>{comment.student_comment} ●</li>
                            </div>
                        ))}
                    </div>
 
                <button onClick={() => setShowCommentSection(!showCommentSection)} className='btn-submit' style={{width:"12%",padding:"10px",marginLeft:"1%"}}>
                    {showCommentSection ? "الغاء" : "أضف تعليقاََ"}
                </button>
                {showCommentSection && (
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
                        <button onClick={handleSubmitComment} className='btn-submit' style={{width:"12%",padding:"10px",marginLeft:"15%"}}>أضافة التعليق </button>
                    </div>
                )}
                    {!isAuthorized && (
                        <>
                            <p style={{color:"red"}}>لأضافة تعليقاََ يجب عليك تسجيل الدخول اولاََ </p>
                        </>
                    )}
                </div>
            </div>
            <div className="videos-section">
            <div className="heading" id="topVideos"> المزيد من الفيديوهات</div>
            <div>
                {videos.slice(0, 3).map(video => (
                    <VideoItemStudent key={video.video_id} video={video} style={customStyle}/>
                ))}
                </div>

          </div>
        </>
    );
};

export default VideoDetails;
