// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Modal, CloseButton } from "react-bootstrap";
// import delete_icon from "../assets/icons/delete.svg";
// import edit_icon from "../assets/icons/edit.svg";
// import "../styles/ShowPosts.css";
// import EditPostForm from "./EditPost";
// import Simplert from "react-simplert";
// import Swal from "sweetalert2";

// const ShowPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editedPost, setEditedPost] = useState(null);
//   const [successAlert, setSuccessAlert] = useState(false);
//   const [errorAlert, setErrorAlert] = useState(false);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:9090/university/posts"
//       );
//       setPosts(response.data);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       setErrorAlert(true);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const handleDeletePost = async (postId) => {
//     Swal.fire({
//       title: "هل أنت متأكد من حذف هذا المنشور؟",
//       text: "لن تستطيع استرجاعه مرة أخرى",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonText: "إلغاء",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "حذف",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const response = await axios.delete(
//             `http://localhost:9090/university/posts/${postId}`
//           );
//           fetchPosts();
//           if (
//             response &&
//             (response.status === 200 || response.status === 201)
//           ) {
//             // Added closing parenthesis here
//             setSuccessAlert(true);
//           }
//         } catch (error) {
//           console.error("Error deleting post:", error);
//           setErrorAlert(true);
//         }
//       }
//     });
//   };

//   const handleEditPost = (postId) => {
//     const postToEdit = posts.find((post) => post.post_id === postId);
//     setEditedPost(postToEdit);
//     setShowEditModal(true);
//   };

//   const handleCloseEditModal = () => {
//     setShowEditModal(false);
//     setEditedPost(null);
//   };

//   return (
//     <div className="mt-2">
//       <div className="postsNum">عدد المنشورات : {posts.length}</div>
//       <Table dir="rtl" responsive hover>
//         <tbody>
//           {posts.map((post) => (
//             <tr key={post.post_id}>
//               <td className="post-image ">
//                 {post.post_image_path && (
//                   <img
//                     className="post-image"
//                     src={post.post_image_path}
//                     alt="Post Image"
//                   />
//                 )}
//               </td>
//               <td>{post.post_content.slice(0, 20)}...</td>
//               <td>{post.date}</td>
//               <td>{post.source_string}</td>
//               <td>
//                 <img
//                   src={delete_icon}
//                   alt="Delete post"
//                   className="icon"
//                   onClick={() => handleDeletePost(post.post_id)}
//                 />
//               </td>
//               <td>
//                 <img
//                   src={edit_icon}
//                   alt="Edit post"
//                   className="icon"
//                   onClick={() => handleEditPost(post.post_id)}
//                 />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <Modal dir="rtl" show={showEditModal} onHide={handleCloseEditModal}>
//         <Modal.Header closeButton>
//           <div className="d-flex justify-content-between align-items-center w-100">
//             <Modal.Title>تعديل المنشور</Modal.Title>
//           </div>
//         </Modal.Header>
//         <Modal.Body>
//           {editedPost && (
//             <EditPostForm post={editedPost} onClose={handleCloseEditModal} />
//           )}
//         </Modal.Body>
//       </Modal>
//       <Simplert
//         showSimplert={errorAlert}
//         type="error"
//         title="Error"
//         message="حدث خطأ ما يرجي اعادة المحاولة"
//         onClose={() => setErrorAlert(false)}
//         customCloseBtnText="اغلاق"
//       />
//       <Simplert
//         showSimplert={successAlert}
//         type="success"
//         title="Success"
//         onClose={() => setSuccessAlert(false)}
//         customCloseBtnText="تم "
//       />
//     </div>
//   );
// };

// export default ShowPosts;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal } from "react-bootstrap";
import delete_icon from "../assets/icons/delete.svg";
import edit_icon from "../assets/icons/edit.svg";
import "../styles/ShowPosts.css";
import EditPostForm from "./EditPost";
import Simplert from "react-simplert";
import Swal from "sweetalert2";
import arrow_left from "../assets/icons/arrow_circle_left.svg";
import arrow_right from "../assets/icons/arrow_circle_right.svg";
import usePagination from "../hooks/usePagination";

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedPost, setEditedPost] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  // Pagination hook
  const { currentPage, totalPages, goToPage, goToFirstPage, goToLastPage } =
    usePagination(posts.length, 6);

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

  const handleDeletePost = async (postId) => {
    Swal.fire({
      title: "هل أنت متأكد من حذف هذا المنشور؟",
      text: "لن تستطيع استرجاعه مرة أخرى",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "إلغاء",
      cancelButtonColor: "#d33",
      confirmButtonText: "حذف",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://localhost:9090/university/posts/${postId}`
          );
          fetchPosts();
          setSuccessAlert(true);
        } catch (error) {
          console.error("Error deleting post:", error);
          setErrorAlert(true);
        }
      }
    });
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

  // Calculate the index of the first and last posts to display on the current page
  const startIndex = (currentPage - 1) * 10;
  const endIndex = Math.min(startIndex + 10, posts.length);

  // Get the posts for the current page
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <div className="mt-2">
      <div className="postsNum">عدد المنشورات : {posts.length}</div>
      <Table dir="rtl" responsive hover>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.post_id}>
              <td className="post-image ">
                {post.post_image_path && (
                  <img
                    className="post-image"
                    src={post.post_image_path}
                    alt="Post Image"
                  />
                )}
              </td>
              <td>{post.post_content.slice(0, 20)}...</td>
              <td>{post.date}</td>
              <td>{post.source_string}</td>
              <td>
                <img
                  src={delete_icon}
                  alt="Delete post"
                  className="icon"
                  onClick={() => handleDeletePost(post.post_id)}
                />
              </td>
              <td>
                <img
                  src={edit_icon}
                  alt="Edit post"
                  className="icon"
                  onClick={() => handleEditPost(post.post_id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Render pagination controls */}
      <div className="pagination">
        <div className="pagination">
          <img
            src={arrow_left}
            onClick={goToFirstPage}
            alt="Left Arrow"
            className="arrow-icon"
          />
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, index) => (
              <span
                key={index + 1}
                className={`page-btn ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => goToPage(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </span>
            ))}
          </div>
          <img
            src={arrow_right}
            onClick={goToLastPage}
            alt="Right Arrow"
            className="arrow-icon"
          />
        </div>
      </div>
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
      <Simplert
        showSimplert={errorAlert}
        type="error"
        title="Error"
        message="حدث خطأ ما يرجي اعادة المحاولة"
        onClose={() => setErrorAlert(false)}
        customCloseBtnText="اغلاق"
      />
      <Simplert
        showSimplert={successAlert}
        type="success"
        title="Success"
        onClose={() => setSuccessAlert(false)}
        customCloseBtnText="تم "
      />
    </div>
  );
};

export default ShowPosts;
