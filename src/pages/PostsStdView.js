import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import "../styles/PostsStdView.css";
import { FaArrowRight } from 'react-icons/fa';

const PostsStdView = () => {
  const [posts, setPosts] = useState([]);
  const [errorAlert, setErrorAlert] = useState(false);

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

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container-fluid bg-gray">
      <div className="row">
        <Navbar />
        {posts.map((post) => (
          <div className="container mt-5" key={post.post_id}>
            <div className="row">
              <div className="col-12">
                <article className="blog-card">
                  <div className="blog-card__background">
                    <div className="card__background--wrapper">
                      <img
                        className="card__background--main"
                        src={post.post_image_path}
                        alt="Post Image"
                      />
                      <div className="card__background--layer"></div>
                    </div>
                  </div>
                  <div className="blog-card__head">
                    {/* <span className="date__box">
                      <span className="date__day">11</span>
                      <span className="date__month">JAN</span>
                    </span> */}
                  </div>
                  <div className="blog-card__info">
                    <h5>{post.post_content.slice(0, 20)}</h5>
                    <p>
                      <a href="#" className="icon-link mr-3">
                        <i className="fa fa-pencil-square-o"></i> Tony Jahson
                      </a>
                      <a href="#" className="icon-link">
                        <i className="fa fa-comments-o"></i> 150
                      </a>
                    </p>
                    <p>{post.source_string}</p>
                    <p>{post.category_id}</p>

                    <a href={`/posts/${post.post_id}`} className="btn btn--with-icon" target='blank'>
                    <div className="btn-icon-arrow"><FaArrowRight /> </div>

                                            تفاصيل اكتر
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PostsStdView;

{
  /* <div className="projcard-container">
<div className="projcard projcard-blue">
  <div className="projcard-innerbox">
    <img className="projcard-img" src="https://picsum.photos/800/600?image=1041" alt="Project" />
    <div className="projcard-textbox">
      <div className="projcard-title">Card Title</div>
      <div className="projcard-subtitle">This explains the card in more detail</div>
      <div className="projcard-bar"></div>
      <div className="projcard-description ellipsis">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
      <div className="projcard-tagbox">
        <span className="projcard-tag">HTML</span>
        <span className="projcard-tag">CSS</span>
      </div>
    </div>
  </div>
</div>
</div> 

{/* Repeat the same structure for other projcards */
}
