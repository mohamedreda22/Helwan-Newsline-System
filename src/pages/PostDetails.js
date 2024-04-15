import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostDetails = () => {
  const [postData, setPostData] = useState(null);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [comment, setComment] = useState("");
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [studentsMap, setStudentsMap] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const { post_id } = useParams();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/university/posts/${post_id}`
        );
        setPostData(response.data);
        setIsLoadingPost(false);
      } catch (error) {
        console.error("Error fetching post details:", error);
        setError("An error occurred while fetching post details.");
        setIsLoadingPost(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/university/comments/getAllComments/channelType/POST/channelId/${post_id}`
        );
        setComments(response.data);
        setIsLoadingComments(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("An error occurred while fetching comments.");
        setIsLoadingComments(false);
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
            avatar: student.student_avatar,
          };
        });
        setStudentsMap(studentsObj);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("An error occurred while fetching students.");
      }
    };

    const checkAuthorization = () => {
      const studentId = sessionStorage.getItem("student_id");
      if (studentId) {
        setIsAuthorized(true);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/university/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("An error occurred while fetching posts.");
      }
    };

    fetchPostDetails();
    fetchComments();
    fetchStudents();
    fetchPosts();
    checkAuthorization();
  }, [post_id]);

  const handleSubmitComment = async () => {
    // Implement comment submission logic here
  };

  if (isLoadingPost || isLoadingComments) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="mb-4">
        <Navbar />
      </div>
      <div className="container">
        <div className="row">
          <div className="post-details-container col-12">
            <img
              className="postImg img-fluid"
              src={postData?.post_image_path}
              alt="post-image"
              style={{ width: '100%', maxHeight: '450px', objectFit: 'cover' }}
            />
            <div className="post-info">
              <div className="event-card-date1">
                <span className="day1">
                  {new Date(postData.post_creation_date).getDate()}
                </span>
                <span className="month1">
                  {new Date(postData.post_creation_date).toLocaleString(
                    'default',
                    { month: 'long' }
                  )}
                </span>{' '}
                :نشر بتاريخ
              </div>
              <h3 dir="rtl" className="postD-content">{postData?.post_content}</h3>
              <p dir="rtl" className="postD-sourceSt">
              المصدر : {postData?.source_string}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Start Comment Section */}
      <div className="post-comments">
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
                      className="avatar"
                    />
                  </>
                )}
              </div>
              <li className="comment-content">
                {comment.student_comment} ●
              </li>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowCommentSection(!showCommentSection)}
          className="btn-submit"
          style={{ width: "12%", padding: "10px", marginLeft: "1%" }}
        >
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
              className="comment-box"
            />
            <br />
            <button
              onClick={handleSubmitComment}
              className="btn-submit"
              style={{ width: "12%", padding: "10px", marginLeft: "15%" }}
            >
              أضافة التعليق{" "}
            </button>
          </div>
        )}
        {!isAuthorized && (
          <>
            <p style={{ color: "red" }}>
              لأضافة تعليقاََ يجب عليك تسجيل الدخول اولاََ{" "}
            </p>
          </>
        )}
      </div>
      <div className="row" style={{ flexDirection: 'row-reverse' }}>
        {posts.map((postItem) => (
          <div className="col-lg-4 col-md-6 col-sm-12  mb-4" key={postItem.post_id}>
            <Link
              to={`/posts/${postItem.post_id}`}
              className="card-link"
              style={{ textDecoration: 'none' }}
            >
              <CardGroup>
                <Card key={postItem.post_id} className="postCards">
                  {postItem.post_image_path && (
                    <Card.Img
                      variant="top"
                      src={postItem.post_image_path}
                      className="postImage"
                    />
                  )}
                  <Card.Body>
                    <Card.Text dir="rtl" className="postContent">
                      {postItem.post_content}
                    </Card.Text>
                    <Card.Text dir="rtl" className="sourceText">
                      المصدر : {postItem.source_string}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      <span className="day1">
                        {new Date(postItem.post_creation_date).getDate()}
                      </span>
                      <span className="month1">
                        {new Date(
                          postItem.post_creation_date
                        ).toLocaleString("default", { month: "long" })}
                      </span>
                      : نشر بتاريخ
                    </small>
                  </Card.Footer>
                </Card>
              </CardGroup>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;
