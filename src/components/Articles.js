import axios from "axios";
import React , { useState, useEffect } from "react";
import edit_icon from "../assets/icons/edit.svg";
import delete_icon from "../assets/icons/delete.svg";
import "../styles/Articles.css";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { Table, Modal, CloseButton } from "react-bootstrap";
import EditArticle2 from "../pages/EditArticle2"
//import AddNotificationForm from "../components/AddNotificationForm";

// const handleDeleteNotification = (notification) => {
//   Swal.fire({
//     title: "هل أنت متأكد من حذف هذا الإشعار؟",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     cancelButtonText: "إلغاء",
//     confirmButtonText: "حذف",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // try {
//       //     await axios.delete(
//       //       `http://localhost:9090/university/notifications/${notification_id}`
//       //     );
//       //     // After deletion, fetch notifications again to update the list
//       //     // fetchNotification_id();
//       //   } catch (error) {
//       //     // console.error('Error deleting notification:', error);
//       //     // setError('An error occurred while deleting the notification.');
//       //   }
//       Swal.fire({
//         title: "تم الحذف",
//         icon: "success",
//       });
//     }
//   });
// };
// const renderDeleteIcon = () => {
//   return (
//     <div>
//       <img
//         src={delete_icon}
//         alt="Delete notification"
//         className="delete-icon"
//         onClick={handleDeleteNotification} 
//       />
//     </div>
//   );
// };




const Articles = () => {
const [articles, setArticles] = useState([]);
const [showEditModal, setShowEditModal] = useState(false);
const [editArticle, setEditArticle] = useState(null);

const fetchArticles = async () => {
  try {
    const response = await axios.get(  
      "http://localhost:9090/university/articles"
    );
    setArticles(response.data);
  } catch (error) {
    console.error("Error fetching articles:", error);
    Swal.fire({
      title: "Error",
      text: "An error occurred while fetching  articles.",
      icon: "error",
    });
  }
};

useEffect(() => {
  fetchArticles();
}, []);

const handleDeleteArticle = async (articleId) => {
  Swal.fire({
    title: "هل أنت متأكد من حذف هذا  المقال؟",
     
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
          `http://localhost:9090/university/articles/${articleId}`
        );
        fetchArticles();
        if (response && response.status === 200) {
          Swal.fire({
            title: "تم الحذف",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the article.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting article:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while deleting the article.",
          icon: "error",
        });
      }
    }
  });
};

const handleEditArticle = (articleId) => {
  const ArticleToEdit = articles.find((article) => article.article_id === articleId);
  setEditArticle(ArticleToEdit);
  setShowEditModal(true);
};

const handleCloseEditModal = () => {
  setShowEditModal(false);
  setEditArticle(null);
};
  return (
    <>
      <div className="mt-2">
        <div className="notifNum"> :عدد المقالات </div>
        
        <Table  responsive hover>
        <tbody>
        {articles.map((article) => (
          <tr key={article.article_id}>
            {/* <td>{article.article_content.slice(0, 20)}...</td>  */}
            
             <td>{article.date}</td>
             <td>{article.source_string}</td>

              <td>
                <img
                  src={delete_icon}
                  alt="Delete article"
                  className="icon"
                  onClick={() => handleDeleteArticle(article.article_id)}
                />
              </td>

              <td>
                <img
                  src={edit_icon}
                  alt="Edit article"
                  className="icon"
                  onClick={() => handleEditArticle(article.article_id)}
                />
              </td>
          </tr>
        
        
          ))}
        </tbody>
      </Table>

      <Modal dir="rtl" show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <div className="d-flex justify-content-between align-items-center w-100">
            <Modal.Title>تعديل المقال</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>
          {editArticle && (
            <EditArticle2 post={editArticle} onClose={handleCloseEditModal} />
          )}
        </Modal.Body>
      </Modal>
      </div>
    </>
  );
};

export default Articles;


   



  