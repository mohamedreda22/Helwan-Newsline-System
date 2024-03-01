import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import delete_icon from "../assets/icons/delete.svg";
import edit_icon from "../assets/icons/edit.svg";
import "../styles/ShowPosts.css";
import Swal from "sweetalert2";

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/posts"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while fetching posts.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:9090/university/posts/${postId}`
          );
          fetchPosts();
          if (response && response.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your post has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the post.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting post:", error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the post.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className="mt-2">
      <div className="postsNum">عدد المنشورات : {posts.length}</div>
      <Table responsive hover>
        <tbody>
          {posts.map((post) => (
            <tr key={post.post_id}>
              <td>
                <img
                  src={delete_icon}
                  alt="Delete post"
                  className="icon"
                  onClick={() => handleDeletePost(post.post_id)} // Pass post.post_id to handleDeletePost
                />
              </td>
              <td>
                <img src={edit_icon} alt="Edit post" className="icon" />
              </td>
              <td>{post.date}</td>
              <td dir="rtl">
                <div className="post">
                  {post.post_image_path && (
                    <img
                      className="post-image"
                      src={post.post_image_path}
                      alt="Post Image"
                    />
                  )}
                  <div className="post-content">{post.post_content}</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ShowPosts;
