import React, { useState, useEffect } from "react";
import axios from "axios";
import PostItem from "./PostItem.js";
import EditPost from "./EditPost.js";
import "../styles/Events.css"; 
import usePagination from '../hooks/usePagination';
import arrow_left from '../assets/icons/arrow_circle_left.svg';
import arrow_right from '../assets/icons/arrow_circle_right.svg';
import SideBar from '../layouts/SideBar';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [postIdToEdit, setPostIdToEdit] = useState(null);
  const [editedPost, setEditedPost] = useState(null);
  const [totalPosts, setTotalPosts] = useState(0);
  const [sources, setSources] = useState([]);

  const postsPerPage = 4;

  // Pagination hook
  const {
    currentPage,
    totalPages,
    goToPage,
    goToFirstPage,
    goToLastPage,
  } = usePagination(totalPosts, postsPerPage);
 

  const fetchSources = async () => {
    try {
      const response = await axios.get('http://localhost:9090/university/sources');
      setSources(response.data);
    } catch (error) {
      console.error('Error fetching sources:', error);
    }
  };


  const renderPosts = () => {
    return posts.map((post) => (
      <PostItem key={post.post_id} post={post} sources={sources} onDelete={handleDeletePost} onEdit={handleEditPost} />
    ));
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);
  useEffect(()=>{
    fetchSources();
  })

  useEffect(() => {
    if (isEditing && postIdToEdit) {
      const postToEdit = posts.find((post) => post.post_id === postIdToEdit);
      setEditedPost(postToEdit);
    }
  }, [isEditing, postIdToEdit, posts]);
  

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/university/posts?page=${currentPage-1}&size=${postsPerPage}`);
      const response1 = await axios.get (`http://localhost:9090/university/posts`)
      setTotalPosts(response1.data.length);
      setPosts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("An error occurred while fetching posts.");
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:9090/university/posts/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("An error occurred while deleting the post.");
    }
  };

  const handleEditPost = (postId) => {
    setIsEditing(true);
    setPostIdToEdit(postId);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setPostIdToEdit(null);
  };

  const handleSave = async (updatedPostData) => {
    try {
      await axios.put(`http://localhost:9090/university/posts/${updatedPostData.post_id}`, updatedPostData);
      fetchPosts();
      handleCancelEdit();
      // Update the posts state with the updated data
      setPosts(prevPosts => prevPosts.map(post => post.post_id === updatedPostData.post_id ? updatedPostData : post));
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className={`events-page ${isEditing && postIdToEdit && editedPost ? 'blur-background' : ''}`}>
      <SideBar />
      {isEditing && postIdToEdit && editedPost ? (
        <EditPost post={editedPost} onSave={handleSave} onCancel={handleCancelEdit} />
      ) : (
        <>
          <h2>جميع المنشورات</h2>
          {isLoading && <p className="loading-text">جاري تحميل المنشورات...</p>}
          {error && <p>{error}</p>}

          <div className="total-events">
            عدد المنشورات : <span>{totalPosts}</span>
          </div>
          <div className="events-container">
            <table id="events-table" className="events-table">
            <thead>
                <tr>
                  <th>&emsp;&emsp;
                    صورة المنشور &emsp;
                   محتوي المشور    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    المصدر&emsp;&emsp;&emsp;&emsp;
                   تاريخ النشر&emsp;&emsp;&emsp;&emsp;&emsp;
                   مصدر المنشور&emsp;&emsp;&emsp;&emsp;
                 تعديل&emsp;
                حذف
                 </th>
                </tr>
              </thead>
              <tbody>
                {renderPosts()}
              </tbody>
            </table>

            {totalPosts > postsPerPage && (
              <div className="pagination">
                <img src={arrow_left} onClick={goToFirstPage} alt="Left Arrow" className="arrow-icon" />
                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <span
                      key={index + 1}
                      className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                      onClick={() => goToPage(index + 1)}
                      disabled={currentPage === index + 1}
                    >
                      {index + 1}
                    </span>
                  ))}
                </div>
                <img src={arrow_right} onClick={goToLastPage} alt="Right Arrow" className="arrow-icon" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Posts;
