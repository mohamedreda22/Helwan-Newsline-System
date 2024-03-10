import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, Button } from "react-bootstrap";
import "../styles/ShowPosts.css";
import EditPostForm from "./EditPost";
import PostItem from "./postItem";

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedPost, setEditedPost] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/posts"
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:9090/university/posts/${postId}`
      );
      fetchPosts();
      setDeletePostId(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditPost = (postId) => {
    const postToEdit = posts.find((post) => post.post_id === postId);
    setEditedPost(postToEdit);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedPost(null);
  };

  const handleShowDeleteConfirmation = (postId) => {
    setDeletePostId(postId);
  };

  return (
    <div className="mt-2">
      <Table dir="rtl" responsive hover>
        <tbody>
          {posts.map((post) => (
            <PostItem
              key={post.post_id}
              post={post}
              onDelete={handleShowDeleteConfirmation}
              onEdit={handleEditPost}
            />
          ))}
        </tbody>
      </Table>
      <Modal dir="rtl" show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <div className="d-flex justify-content-between align-items-center w-100">
            <Modal.Title>تعديل المنشور</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          {editedPost && (
            <EditPostForm post={editedPost} onClose={handleCloseEditModal} />
          )}
        </Modal.Body>
      </Modal>
      <Modal
        show={!!deletePostId}
        onHide={() => setDeletePostId(null)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeletePostId(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDeletePost(deletePostId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowPosts;
