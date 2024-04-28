import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import "../styles/PostsStdView.css";
import comment from "../assets/icons/comment.svg";
import date from "../assets/icons/time.svg";

const PostsStdView = () => {
  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlePostClick = async (postId) => {
    try {
      // Open the post details in a new tab
      window.open(`/posts/${postId}`, "_blank");
    } catch (error) {
      console.error("Error opening post details:", error);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate();
    const month = dateTime.toLocaleString("default", { month: "long" });
    return { day, month };
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/posts"
      );
      // Fetch likes and comments for each post separately
      const postsWithData = await Promise.all(
        response.data.map(async (post) => {
          const [likesResponse, commentsResponse] = await Promise.all([
            axios.get(`http://localhost:9090/university/likes/getAllLikes/channelType/POST/channelId/${post.post_id}`),
            axios.get(`http://localhost:9090/university/comments/getAllComments/channelType/POST/channelId/${post.post_id}`)
          ]);
          return {
            ...post,
            likesCount: likesResponse.data.length,
            commentsCount: commentsResponse.data.length
          };
        })
      );
      setPosts(postsWithData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Handle error
      setError("An error occurred while fetching posts.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <Navbar />
      </div>
      <div className="container">
        <div className="row">
          {/* Mapping through posts */}
          {posts.map((postItem) => (
            <div className="col-12" key={postItem.post_id}>
              <article className="card mb-4">
                {postItem.post_image_path ? (
                  <div className="card-img">
                    <img
                      src={postItem.post_image_path}
                      alt="post-image"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div className="card-img-placeholder">
                    <p>Image not available</p>
                  </div>
                )}

                <div className="project-info">
                  <div dir="rtl" className="card-content">
                    <div className="flex">
                      <div className="project-title">
                        {showMore
                          ? postItem.post_content
                          : `${postItem.post_content.substring(0, 100)}`}
                        {postItem.post_content.length > 50 && (
                          <button
                            className="see-more-btn1"
                            onClick={() => setShowMore(!showMore)}
                          >
                            {showMore ? "عرض أقل" : "...عرض المزيد"}
                          </button>
                        )}
                      </div>
                    </div>
                    <span className="lighter">
                      {" "}
                      المصدر : {postItem.source_string}
                    </span>
                  </div>
                  <div className="card-footer">
                    <div className="card-meta card-meta--date post-icons">
                      <img
                        src={date}
                        alt="date-icon"
                        width={20}
                        height={18}
                        className="post-icon"
                      />
                      <div className="event-card-date1">
                        <span className="day1">
                          {formatDateTime(postItem.post_creation_date).day}
                        </span>{" "}
                        {/* Display day */}
                        <span className="event-card-month1">
                          {formatDateTime(postItem.post_creation_date).month}
                        </span>
                      </div>
                    </div>
                    <div className="card-meta card-meta--date post-icons">
                    <div className="comment-react" style={{scale:"100%"}}>
                      <button >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"
                            stroke="#707277"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="#707277"
                          ></path>
                        </svg>
                      </button>
                      <span>{postItem.likesCount}</span>
                    </div>
                    </div>
                    <div className="comment-card-meta card-meta--date post-icons">
                    <div className="comment-react" style={{scale:"100%"}}>
                    <button >
                    <img
                      src={comment}
                      alt="comment-icon"
                      width={20}
                      height={22}
                      className="post-icon"
                    />
                  </button>
                      <span>{postItem.commentsCount}</span>
                    </div>
                    </div>
                    <a className="btn btn--with-icon" target="blank">
                      <button
                        className="postDetailsBtn"
                        onClick={() => handlePostClick(postItem.post_id)}
                      >
                        تفاصيل اكثر
                        <span className="arrow">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 320 512"
                            fill="rgb(183, 128, 255)"
                          >
                            <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path>
                          </svg>
                        </span>
                      </button>
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostsStdView;
