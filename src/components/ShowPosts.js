// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Table } from "react-bootstrap";
// import delete_icon from "../assets/icons/delete.svg";
// import edit_icon from "../assets/icons/edit.svg";
// import "../styles/ShowPosts.css";
// import Swal from "sweetalert2";
// import { Link } from 'react-router-dom';
// import EditPost from "./EditPost";

// const ShowPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [editedPost, setEditedPost] = useState(null);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:9090/university/posts"
//       );
//       setPosts(response.data);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//       Swal.fire({
//         title: "Error",
//         text: "An error occurred while fetching posts.",
//         icon: "error",
//       });
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
//           if (response && response.status === 200) {
//             Swal.fire({
//               title: "تم الحذف",
//               icon: "success",
//             });
//           } else {
//             Swal.fire({
//               title: "Error",
//               text: "An error occurred while deleting the post.",
//               icon: "error",
//             });
//           }
//         } catch (error) {
//           console.error("Error deleting post:", error);
//           Swal.fire({
//             title: "Error",
//             text: "An error occurred while deleting the post.",
//             icon: "error",
//           });
//         }
//       }
//     });
//   };

//   return (
//     <div className="mt-2">
//       <div className="postsNum">عدد المنشورات : {posts.length}</div>
//       <Table dir="rtl" responsive hover>
//         <tbody>
//           {posts.map((post) => (
//             <tr key={post.post_id}>
//               
//               <td>{post.post_content.slice(0, 20)}...</td>
//               <td>{post.date}</td>
//               <td> {post.source_string}</td>
//               <td>
//                 <img
//                   src={delete_icon}
//                   alt="Delete post"
//                   className="icon"
//                   onClick={() => handleDeletePost(post.post_id)} // Pass post.post_id to handleDeletePost
//                 />
//               </td>
//               <td>
//                 <Link to="/editpost/${post.post_id}">
//                   <img src={edit_icon} alt="Edit post" className="icon" />
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default ShowPosts;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal, CloseButton } from "react-bootstrap";
import delete_icon from "../assets/icons/delete.svg";
import edit_icon from "../assets/icons/edit.svg";
import "../styles/ShowPosts.css";
import Swal from "sweetalert2";
import EditPostForm from "./EditPost";

const ShowPosts = () => {
  const [posts, setPosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedPost, setEditedPost] = useState(null);

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
          const response = await axios.delete(
            `http://localhost:9090/university/posts/${postId}`
          );
          fetchPosts();
          if (response && response.status === 200) {
            Swal.fire({
              title: "تم الحذف",
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

  const handleEditPost = (postId) => {
    const postToEdit = posts.find((post) => post.post_id === postId);
    setEditedPost(postToEdit);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedPost(null);
  };

  return (
    <div className="mt-2">
      <div className="postsNum">عدد المنشورات : {posts.length}</div>
      <Table dir="rtl" responsive hover>
        <tbody>
          {posts.map((post) => (
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
    </div>
  );
};

export default ShowPosts;
