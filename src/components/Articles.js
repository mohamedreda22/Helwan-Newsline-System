// import axios from "axios";
// import React , { useState, useEffect } from "react";
// import edit_icon from "../assets/icons/edit.svg";
// import delete_icon from "../assets/icons/delete.svg";
// import "../styles/Articles.css";
// import { FaPlus } from "react-icons/fa";
// import Swal from "sweetalert2";
// import { Table, Modal, CloseButton } from "react-bootstrap";
// import EditArticle2 from "../pages/EditArticle2"
 

// const Articles = () => {
// const [articles, setArticles] = useState([]);
// const [showEditModal, setShowEditModal] = useState(false);
// const [editArticle, setEditArticle] = useState(null);

// const fetchArticles = async () => {
//   try {
//     const response = await axios.get(  
//       "http://localhost:9090/university/articles"
//     );
//     setArticles(response.data);
//   } catch (error) {
//     console.error("Error fetching articles:", error);
//     Swal.fire({
//       title: "Error",
//       text: "An error occurred while fetching  articles.",
//       icon: "error",
//     });
//   }
// };

// useEffect(() => {
//   fetchArticles();
// }, []);

 
// const handleDeleteArticle = async (articleId) => {
//   try {
//     // Optimistically remove the article from the UI
//     setArticles(articles.filter(article => article.article_id !== articleId));

//     const response = await axios.delete(
//       `http://localhost:9090/university/articles/${articleId}`
//     );

//     if (response && (response.status === 202||response.status === 200)) {
//       Swal.fire({
//         title: "تم الحذف",
//         icon: "success",
//       });
//     } else {
//       throw new Error("An error occurred while deleting the article.");
//     }
//   } catch (error) {
//     console.error("Error deleting article:", error);
//     Swal.fire({
//       title: "Error",
//       text: "An error occurred while deleting the article.",
//       icon: "error",
//     });

//     // Restore the article if the deletion fails
//     fetchArticles();
//   }
// };


// const handleEditArticle = (articleId) => {
//   const ArticleToEdit = articles.find((article) => article.article_id === articleId);
//   setEditArticle(ArticleToEdit);
//   setShowEditModal(true);
// };

// const handleCloseEditModal = () => {
//   setShowEditModal(false);
//   setEditArticle(null);
// };
//   return (
//     <>
//       <div className="mt-2">
//         <div className="notifNum"> عدد المقالات :{articles.length} </div>
        
//         <Table  responsive hover dir="rtl">
//         <tbody>
//         {articles.map((article) => (
//           <tr key={article.article_id}>
//               <td>{article.article_address}</td> 
//               <td>{article.source_string}</td> 
//               <td>{article.article_content}</td> 
//               <td>{article.article_image_path}</td> 
//               <td>{article.article_id}</td>


//               <td>
//                 <img
//                   src={delete_icon}
//                   alt="Delete article"
//                   className="icon"
//                   onClick={() => handleDeleteArticle(article.article_id)}
//                 />
//               </td>

//               <td>
//                 <img
//                   src={edit_icon}
//                   alt="Edit article"
//                   className="icon"
//                   onClick={() => handleEditArticle(article.article_id)}
//                 />
//               </td>
//           </tr>
        
        
//           ))}
//         </tbody>
//       </Table>

//       <Modal dir="rtl" show={showEditModal} onHide={handleCloseEditModal}>
//         <Modal.Header closeButton>
//           <div className="d-flex justify-content-between align-items-center w-100">
//             <Modal.Title>تعديل المقال</Modal.Title>
//           </div>
//         </Modal.Header>
//         <Modal.Body>
//           {editArticle && (
//             <EditArticle2 post={editArticle} onClose={handleCloseEditModal} />
//           )}
//         </Modal.Body>
//       </Modal>
//       </div>
//     </>
//   );
// };

// export default Articles;


   



import axios from "axios";
import React, { useState, useEffect } from "react";
import edit_icon from "../assets/icons/edit.svg";
import delete_icon from "../assets/icons/delete.svg";
import "../styles/Articles.css";
import Simplert from "react-simplert";
import { Table, Modal } from "react-bootstrap";
import EditArticle2 from "../pages/EditArticle2";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editArticle, setEditArticle] = useState(null);
  const [errorAlert, setErrorAlert] = useState(false); // State for error alert

  const fetchArticles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/articles"
      );
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setErrorAlert(true); // Set error alert to true if fetching fails
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDeleteArticle = async (articleId) => {
    try {
      // Optimistically remove the article from the UI
      setArticles(articles.filter((article) => article.article_id !== articleId));

      const response = await axios.delete(
        `http://localhost:9090/university/articles/${articleId}`
      );

      if (response && (response.status === 202 || response.status === 200)) {
        setShowEditModal(false); // Close modal after successful deletion
      } else {
        throw new Error("An error occurred while deleting the article.");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      setErrorAlert(true); // Set error alert to true if deletion fails
      fetchArticles(); // Restore articles if deletion fails
    }
  };

  const handleEditArticle = (articleId) => {
    const articleToEdit = articles.find((article) => article.article_id === articleId);
    setEditArticle(articleToEdit);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditArticle(null);
  };

  return (
    <>
      <div className="mt-2">
        <div className="notifNum"> عدد المقالات :{articles.length} </div>

        <Table responsive hover dir="rtl">
          <tbody>
            {articles.map((article) => (
              <tr key={article.article_id}>
                <td>{article.article_address}</td>
                <td>{article.source_string}</td>
                <td>{article.article_content}</td>
                <td>{article.article_image_path}</td>
                <td>{article.article_id}</td>

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
              <EditArticle2 articleId={editArticle.article_id} onClose={handleCloseEditModal} />
            )}
          </Modal.Body>
        </Modal>

        {/* Error Simplert */}
        <Simplert
          showSimplert={errorAlert}
          type="error"
          title="Error"
          message="An error occurred while fetching or deleting articles."
          onClose={() => setErrorAlert(false)}
          customCloseBtnText="Close"
        />
      </div>
    </>
  );
};

export default Articles;
