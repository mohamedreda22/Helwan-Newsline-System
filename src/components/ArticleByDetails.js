import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {  Card, Row, Col } from 'react-bootstrap';
import "./VideoDetails.css";
import axios from "axios";
import ArticleItemStudent from "./articleItemStudent";

const ArticleByDetails = () => {
    const { article_id } = useParams();
    const [articles, setArticles] = useState([]);
    const [article, setArticle] = useState(null);

    const [showFullContent, setShowFullContent] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [showCommentSection, setShowCommentSection] = useState(false);
    const [studentsMap, setStudentsMap] = useState({});
    const [isAuthorized, setIsAuthorized] = useState(false);





    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/comments/getAllComments/channelType/ARTICLE/channelId/${article_id}`);
                setComments(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching comments:", error);
                setError("An error occurred while fetching comments.");
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

        fetchComments();
        fetchStudents();
        checkAuthorization();
    }, [article_id]);

    const handleSubmitComment = async () => {
        try {
            const studentId = sessionStorage.getItem('student_id');
            if (!studentId) {
                console.error("Student ID not found in sessionStorage.");
                return;
            }

            const response = await axios.post('http://localhost:9090/university/comments', {
                student_id: parseInt(studentId),
                channel_id: article_id,
                channel_type: "ARTICLE",
                student_comment: comment
            });
            const newComment = response.data;
            setComments([...comments, newComment]);
            setComment("");
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    const handleAddComment = () => {
        setShowCommentSection(true);
    };
   
    useEffect(() => {
        fetchArticles();
    }, [article_id]); 
  
    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://localhost:9090/university/articles');
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    useEffect(() => {
        fetchArticle();
    }, [article_id]);
  
    const fetchArticle = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/university/articles/${article_id}`);
            setArticle(response.data);
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    };
    
    if (!article) {
        return <div>Loading...</div>;   
    }

    const filteredArticles = articles.filter(item => item.article_id !== article_id && (!article || item.article_id !== article.article_id)).slice(0, 3);
    

    const customStyle = {
        width: '49%', 
    };



    return ( 
            <div className="video-details-container">
            <h3 className="video-title" >مقال عن: {article.article_address}</h3>
            <div>
                <img 
                    src={article.article_image_path} 
                    alt={article.article_address}
                    style={{                         
                        width:"100%",
                        maxWidth:"90%",
                        marginLeft:"5%",
                        maxHeight:"600px",
                        height:"auto"

                    }}
                /> 
                <div className="video-info">
                    <p className="event-card-date1">تم النشر بواسطة: {article.source_string}</p> 
                    <p className="video-description">{article.article_content}</p>    
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
                            <img src={studentsMap[comment.student_id].avatar} alt="Avatar" className="avatar" />
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
                        <br />
                        <button onClick={handleSubmitComment} className='btn-submit' style={{width: "12%", padding: "10px", marginLeft: "15%"}}>أضافة التعليق </button>
                    </div>
                )}
                {!isAuthorized && (
                    <>
                        <p style={{color: "red"}}>لأضافة تعليقاََ يجب عليك تسجيل الدخول اولاََ </p>
                    </>
                )}
            </div>


            

    <div className="more-of-articles">
    <div className="heading" id="topArticles"> المزيد من المقالات</div>
    <div>
        {filteredArticles.map(article => (
            // <ArticleItemStudent key={article.article_id} article={article} />
            <Link key={article.article_id} to={`/articles/${article.article_id}`} style={customStyle}>
            <ArticleItemStudent article={article} />
        </Link>
        ))}
        </div>
                    
            </div>


        </div>
    );
}
 
export default ArticleByDetails;




//  Edit to go to the ArticleByDetails page
 

