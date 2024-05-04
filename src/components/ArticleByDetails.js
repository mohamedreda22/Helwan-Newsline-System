import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/VideoDetails.css";
import axios from "axios";
import ArticleItemStudent from "./articleItemStudent";
import Cookies from "js-cookie";

const ArticleByDetails = () => {
  const { article_id } = useParams();
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [studentsMap, setStudentsMap] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/university/comments/getAllComments/channelType/ARTICLE/channelId/${article_id}`
        );
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
        const response = await axios.get(
          `http://localhost:9090/university/students`
        );
        const students = response.data;
        const studentsObj = {};
        students.forEach((student) => {
          studentsObj[student.student_id] = {
            fullName: student.full_name,
            avatar: student.student_image_path,
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

    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/university/likes/getAllLikes/channelType/ARTICLE/channelId/${article_id}`
        );
        setLikes(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching likes:", error);
        setError("An error occurred while fetching likes.");
        setIsLoading(false);
      }
    };

    const checkAuthorization = () => {
      const studentId = Cookies.get("student_id");
      if (studentId) {
        setIsAuthorized(true);
      }
    };

    fetchComments();
    fetchStudents();
    fetchLikes();
    checkAuthorization();
  }, [article_id]);

  const handleSubmitComment = async () => {
    try {
      const studentId = Cookies.get("student_id");
      if (!studentId) {
        console.error("Student ID not found in Cookies.");
        return;
      }

      const response = await axios.post(
        "http://localhost:9090/university/comments",
        {
          student_id: parseInt(studentId),
          channel_id: article_id,
          channel_type: "ARTICLE",
          student_comment: comment,
        }
      );
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
      const response = await axios.get(
        "http://localhost:9090/university/articles"
      );
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [article_id]);

  const fetchArticle = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/university/articles/${article_id}`
      );
      setArticle(response.data);
    } catch (error) {
      console.error("Error fetching article:", error);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  const filteredArticles = articles
    .filter(
      (item) =>
        item.article_id !== article_id &&
        (!article || item.article_id !== article.article_id)
    )
    .slice(0, 3);

  const customStyle = {
    width: "49%",
  };

  const handleAddLike = async () => {
    try {
      const studentId = Cookies.get("student_id");
      if (!studentId) {
        console.error("Student ID not found in Cookies.");
        return;
      }

      // Check if the user has already liked the article
      const hasLiked = likes.some(
        (like) => like.student_id === parseInt(studentId)
      );

      if (hasLiked) {
        console.log("You have already liked this article.");
        return;
      }

      const response = await axios.post(
        "http://localhost:9090/university/likes",
        {
          student_id: parseInt(studentId),
          channel_id: article_id,
          channel_type: "ARTICLE",
        }
      );
      const newLike = response.data;
      // Assuming there's a state variable for likes, add the new like to it
      setLikes([...likes, newLike]);
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `${day} ${month}`;
  };

  return (
    <div className="video-details-container">
      <h3 className="video-title">مقال عن: {article.article_address}</h3>
      <div>
        <img
          src={article.article_image_path}
          alt={article.article_address}
          style={{
            width: "100%",
            maxWidth: "90%",
            marginLeft: "5%",
            maxHeight: "600px",
            height: "auto",
            objectFit: "cover",
            borderRadius: "10px",
            scale: "100%",
          }}
        />
        <div className="video-info">
          <div className="event-card-date1" style={{ display: "flex" }}>
            <p className="day1">
              {" "}
              {formatDate(article.article_creation_date).split(" ")[0]}
            </p>
            <p className="month1">
              {formatDate(article.article_creation_date).split(" ")[1]}
            </p>
            &emsp;:تم النشر بتاريخ
          </div>
          {!isAuthorized && (
            <>
              <button className="Btn" style={{ width: "17%" }}>
                <span className="leftContainer" style={{ width: "100%" }}>
                  <svg
                    fill="white"
                    viewBox="0 0 512 512"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
                  </svg>
                  <span className="like">please login</span>
                </span>
                <span className="likeCount">{likes.length}</span>
              </button>
              <span style={{ display: "-webkit-flex" }}>
                {likes.map((like, index) => (
                  <div key={index} className="like" style={{ width: "35px" }}>
                    {studentsMap[like.student_id] && (
                      <>
                        <img
                          src={studentsMap[like.student_id].avatar}
                          alt="Avatar"
                          className="avatar1"
                          style={{ scale: "70%" }}
                        />
                      </>
                    )}
                  </div>
                ))}
              </span>
            </>
          )}
          {isAuthorized && (
            <>
              <button className="Btn" onClick={handleAddLike}>
                <span className="leftContainer">
                  <svg
                    fill="white"
                    viewBox="0 0 512 512"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
                  </svg>
                  <span className="like">Like</span>
                </span>
                <span className="likeCount">{likes.length}</span>
              </button>
              <span style={{ display: "-webkit-flex" }}>
                {likes.map((like, index) => (
                  <div key={index} className="like" style={{ width: "35px" }}>
                    {studentsMap[like.student_id] && (
                      <>
                        <img
                          src={studentsMap[like.student_id].avatar}
                          alt="Avatar"
                          className="avatar1"
                          style={{ scale: "70%" }}
                        />
                      </>
                    )}
                  </div>
                ))}
              </span>
            </>
          )}

          <p className="video-description">{article.article_content}</p>
        </div>
      </div>

      <div className="video-comments">
        <div className="heading">:التعليقات</div>
        <hr />
        <div className="comment">
          {comments.map((comment, index) => (
            <div key={index} className="single-comment">
              <div className="comment-header">
                {studentsMap[comment.student_id] && (
                  <>
                    <h4>{studentsMap[comment.student_id].fullName}</h4>
                    <img
                      src={studentsMap[comment.student_id].avatar}
                      alt="Avatar"
                      className="avatar1"
                    />
                  </>
                )}
              </div>
              <li className="comment-content">{comment.student_comment} ●</li>
            </div>
          ))}
        </div>

        {isAuthorized && (
          <button
            onClick={() => setShowCommentSection(!showCommentSection)}
            className="btn-submit"
            style={{  width: "50%",
                padding: "10px",
                marginLeft: "1%",
                maxWidth: "150px" }}
          >
            {showCommentSection ? "الغاء" : "أضف تعليقاََ"}
          </button>
        )}
        {showCommentSection && (
          <div>
            <textarea
              rows="4"
              cols="50"
              placeholder=".......أضف تعليقاََ"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="comment-box"
            />
            <br />
            <button
              onClick={handleSubmitComment}
              className="btn-submit"
              style={{
                width: "50%",
                padding: "10px",
                marginLeft: "15%",
                maxWidth: "150px",
              }}
            >
              إضافة التعليق{" "}
            </button>
          </div>
        )}
        {!isAuthorized && (
          <>
            <p style={{ color: "red" }}>
              لأضافة تعليقاََ او اعجاباً يجب عليك تسجيل الدخول اولاََ{" "}
            </p>
          </>
        )}
      </div>
      <div className="more-of-articles">
        <div className="heading" id="topArticles">
          {" "}
          المزيد من المقالات
        </div>
        <div>
          {filteredArticles.map((article) => (
            <Link
              key={article.article_id}
              to={`/articles/${article.article_id}`}
              style={customStyle}
            >
              <ArticleItemStudent article={article} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleByDetails;
