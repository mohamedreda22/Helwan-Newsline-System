import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleItem from "./ArticleItem";
import EditArticle from "./EditArticle";
import "../styles/Events.css"; 
import usePagination from '../hooks/usePagination';
import arrow_left from '../assets/icons/arrow_circle_left.svg';
import arrow_right from '../assets/icons/arrow_circle_right.svg';
import SideBar from "../layouts/SideBar";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [articleIdToEdit, setArticleIdToEdit] = useState(null);
  const [editedArticle, setEditedArticle] = useState(null);
  const [totalArticles, setTotalArticles] = useState(0);

  const articlesPerPage = 4;

  // Pagination hook
  const {
    currentPage,
    totalPages,
    goToPage,
    goToFirstPage,
    goToLastPage,
  } = usePagination(totalArticles, articlesPerPage);


  const renderArticles = () => {
    return articles.map((article) => (
      <ArticleItem key={article.article_id} article={article} onDelete={handleDeleteArticle} onEdit={handleEditArticle} />
    ));
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPage]);

  useEffect(() => {
    if (isEditing && articleIdToEdit) {
      const articleToEdit = articles.find((article) => article.article_id === articleIdToEdit);
      setEditedArticle(articleToEdit);
    }
  }, [isEditing, articleIdToEdit, articles]);
  

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/university/articles?page=${currentPage-1}&size=${articlesPerPage}`);
      const response1 = await axios.get (`http://localhost:9090/university/articles`)
      setTotalArticles(response1.data.length);
      setArticles(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError("An error occurred while fetching articles.");
      setIsLoading(false);
    }
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      await axios.delete(`http://localhost:9090/university/articles/${articleId}`);
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
      setError("An error occurred while deleting the article.");
    }
  };

  const handleEditArticle = (articleId) => {
    setIsEditing(true);
    setArticleIdToEdit(articleId);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setArticleIdToEdit(null);
  };

  const handleSave = async (updatedArticleData) => {
    try {
      await axios.put(`http://localhost:9090/university/articles/${updatedArticleData.article_id}`, updatedArticleData);
      fetchArticles();
      handleCancelEdit();
      // Update the articles state with the updated data
      setArticles(prevArticles => prevArticles.map(article => article.article_id === updatedArticleData.article_id ? updatedArticleData : article));
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <div className={`events-page ${isEditing && articleIdToEdit && editedArticle ? 'blur-background' : ''}`}>
      <SideBar />
      {isEditing && articleIdToEdit && editedArticle ? (
        <EditArticle article={editedArticle} onSave={handleSave} onCancel={handleCancelEdit} />
      ) : (
        <>
          <h2>جميع المقالات</h2>
          {isLoading && <p className="loading-text">جاري تحميل المقالات...</p>}
          {error && <p>{error}</p>}

          <div className="total-events">
            عدد المقالات : <span>{totalArticles}</span>
          </div>
          <div className="events-container">
            <table id="events-table" className="events-table">
            <thead>
                <tr>
                  <th>&emsp;
                    صورة المقال &emsp;&emsp;&emsp;
                  عنوان المقال    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                   نص المقال&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                   مصدر المقال&emsp;
                  تاريخ النشر&emsp;
                 تعديل&emsp;
                حذف
                 </th>
                </tr>
              </thead>
              <tbody>
                {renderArticles()}
              </tbody>
            </table>

            {totalArticles > articlesPerPage && (
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

export default Articles;
