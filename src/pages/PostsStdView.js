import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import "../styles/PostsStdView.css";
import comment from "../assets/icons/comment-regular.svg";
import like from "../assets/icons/like.svg";
import date from "../assets/icons/time.svg";

const PostsStdView = (post) => {
  const [posts, setPosts] = useState([]);
  const [errorAlert, setErrorAlert] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate();
    const month = dateTime.toLocaleString("default", { month: "long" });
    return { day, month };
  };

  const { day, month } = formatDateTime(post.post_creation_date);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/posts"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setErrorAlert(true);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/categories/getAllPosts/{categoryId}"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
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
          {posts.map((post) => (
            <div className="col-12" key={post.post_id}>
              <article className="card mb-4">
                {/* <div className="card-img">
                  <img
                    src={post.post_image_path}
                    alt={post.post_title}
                    style={{ objectFit: "cover" }} // Ensure image covers the space
                  />
                </div> */}
                {post.post_image_path ? (
                  <div className="card-img">
                    <img
                      src={post.post_image_path}
                      alt="post-image"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div className="card-img-placeholder">
                    {/* Placeholder content for card without image */}
                  </div>
                )}

                <div className="project-info">
                  <div dir="rtl" className="card-content">
                    <div className="flex">
                      <div className="project-title"> {showMore ? post.post_content : `${post.post_content.substring(0, 100)}`}
                      {post.post_content.length > 50 && (
                        <button className="see-more-btn1" onClick={() => setShowMore(!showMore)}>
                          {showMore ? "عرض أقل" : "...عرض المزيد"}
                        </button>
                      )}</div>
                      
                      {/* <span className="tag">type</span> */}
                    </div>
                    <span className="lighter">
                      {" "}
                      المصدر : {post.source_string}
                    </span>
                    ,
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
                      <div>
                        <span className="day1">{day}</span> {/* Display day */}
                        <span className="event-card-month1">{month}</span>
                      </div>
                    </div>
                    <div className="card-meta card-meta--date post-icons">
                      <img
                        src={like}
                        alt="like-icon"
                        width={20}
                        height={18}
                        className="post-icon"
                      />
                      2,465
                    </div>
                    <div className="comment-card-meta card-meta--date post-icons">
                      <img
                        src={comment}
                        alt="comment-icon"
                        width={20}
                        height={18}
                        className="post-icon"
                      />
                      5555
                    </div>
                    <a
                      href={`/posts/${post.post_id}`}
                      className="btn btn--with-icon"
                      target="blank"
                    >
                      <button class="postDetailsBtn">
                        تفاصيل اكثر
                        <span class="arrow">
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
