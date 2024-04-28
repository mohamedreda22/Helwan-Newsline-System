import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/VideoDetails.css';
import Navbar from '../layouts/Navbar';
import VideoItemStudent from './VideoItemStudent';
import Cookies from 'js-cookie';
import Footer from '../layouts/Footer';


const VideoDetails = () => {
    const [videoData, setVideoData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
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

        const fetchLikes = async ()=>{
            try {
                const response = await axios.get(`http://localhost:9090/university/likes/getAllLikes/channelType/VIDEO/channelId/${id}`);
                setLikes(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching likes:", error);
                setError("An error occurred while fetching likes.");
                setIsLoading(false);
            }
        
        }
        
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
                        avatar: student.student_image_path
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
            const studentId = Cookies.get('student_id');
            if (studentId) {
                setIsAuthorized(true);
            }
        };

        fetchVideoDetails();
        fetchComments();
        fetchStudents();
        checkAuthorization();
        fetchVideos();
        fetchLikes();
    }, [id]);

    const handleSubmitComment = async () => {
        try {
            const studentId = Cookies.get('student_id');
            if (!studentId) {
                // Handle the case where student_id is not found in Cookies
                console.error("Student ID not found in Cookies.");
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
            setComment(""); 
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };
    const handleAddLike = async () => {
        try {
            const studentId = Cookies.get('student_id');
            if (!studentId) {
                console.error("Student ID not found in Cookies.");
                return;
            }
          // Check if the user has already liked the video
          const hasLiked = likes.some(like => like.student_id === parseInt(studentId));

          if (hasLiked) {
              console.log("You have already liked this video.");
              return;
          }
    
            const response = await axios.post('http://localhost:9090/university/likes', {
                student_id: parseInt(studentId),
                channel_id: id,
                channel_type: "VIDEO"
            });                
            const newLike = response.data;
            // Assuming there's a state variable for likes, add the new like to it
            setLikes([...likes, newLike]);
        } catch (error) {
            console.error("Error adding like:", error);
        }
    };
    
    

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const modifiedVideoPath = videoData?.video_path?.replace('/videos', '');


    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate();
        const month = dateTime.toLocaleString('default', { month: 'long' });
        return { day, month };
    };

    const { day, month } = formatDateTime(videoData?.video_creation_date);

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
                    <div className="event-card-date1">
                        <span className="day1">{day}</span>
                        <span className="month1">{month}</span> :نشر بتاريخ
                        {!isAuthorized && (<>
                        <button className="Btn" style={{width:"17%"}}>
                            <span className="leftContainer" style={{width:"100%"}}>
                            <svg fill="white" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
                                </svg>
                                <span className="like">please login</span>
                            </span>
                            <span className="likeCount">
                                {likes.length}
                            </span>
                            
                        </button>
                        <span style={{display:"-webkit-flex"}}> 
                        {likes.map((like, index) => (
                            <div key={index} className="like" style={{width:"35px"}}>
                                {studentsMap[like.student_id] && (
                                    <>
                                        <img src={studentsMap[like.student_id].avatar} alt="Avatar" className="avatar1" style={{scale:"70%"}} />
                                    </>
                                )}
                            </div>
                        ))}</span></>
                    )}  
                        {isAuthorized && (<>
                        <button className="Btn" onClick={handleAddLike}>
                            <span className="leftContainer">
                                <svg fill="white" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
                                </svg>
                                <span className="like">Like</span>
                            </span>
                            <span className="likeCount">
                                {likes.length}
                            </span>
                        </button>
                        <span style={{display:"-webkit-flex"}}> 
                        {likes.map((like, index) => (
                            <div key={index} className="like" style={{width:"35px"}}>
                                {studentsMap[like.student_id] && (
                                    <>
                                        <img src={studentsMap[like.student_id].avatar} alt="Avatar" className="avatar1" style={{scale:"75%"}} />
                                    </>
                                )}
                            </div>
                        ))}</span>
                        
                        </>

                        
                    )}
                    </div>
                    
                    <h3 className="video-title">{videoData?.video_title} </h3>
                    <p className="video-description">{videoData?.video_description}</p>
                </div>
                <div className="video-likes">
                    <div className="likes">

                    </div>

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
                                            <img src={studentsMap[comment.student_id].avatar} alt="Avatar" className="avatar1"  />
                                        </>
                                    )}
                                </div>
                                <li className='comment-content'>{comment.student_comment} ●</li>
                            </div>
                        ))}
                    </div>
 
                {isAuthorized &&(<button onClick={() => setShowCommentSection(!showCommentSection)} className='btn-submit' style={{width:"12%",padding:"10px",marginLeft:"1%"}}>
                    {showCommentSection ? "الغاء" : "أضف تعليقاََ"}
                </button>)}
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
                            <p style={{color:"red"}}>لأضافة تعليقاََ او إعجاباََ يجب عليك تسجيل الدخول اولاََ </p>
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
          <Footer/>
        </>
    );
};

export default VideoDetails;
