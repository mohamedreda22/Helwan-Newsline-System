import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsItem from "./NewsItem";
import EditNews from "./EditNews";
import "../styles/Events.css";
import usePagination from '../hooks/usePagination';
import arrow_left from '../assets/icons/arrow_circle_left.svg';
import arrow_right from '../assets/icons/arrow_circle_right.svg';
import SideBar from '../layouts/SideBar';

function News() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newsIdToEdit, setNewsIdToEdit] = useState(null);
  const [editedNews, setEditedNews] = useState(null);
  const [totalNews, setTotalNews] = useState(0);

  const newsPerPage = 4;

  // Pagination hook
  const {
    currentPage,
    totalPages,
    goToPage,
    goToFirstPage,
    goToLastPage,
  } = usePagination(totalNews, newsPerPage);


  const renderNews = () => {
    return news.map((singleNews) => (
      <NewsItem key={singleNews.news_id} news={singleNews} onDelete={handleDeleteNews} onEdit={handleEditNews} />
    ));
  };

  useEffect(() => {
    fetchNews();
  }, [currentPage]);

  useEffect(() => {
    if (isEditing && newsIdToEdit) {
      const newsToEdit = news.find((singleNews) => singleNews.news_id === newsIdToEdit);
      setEditedNews(newsToEdit);
    }
  }, [isEditing, newsIdToEdit, news]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/university/news?page=${currentPage-1}&size=${newsPerPage}`);
      const response1=await axios.get(`http://localhost:9090/university/news`)
      setTotalNews(response1.data.length);
      setNews(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("An error occurred while fetching news.");
      setIsLoading(false);
    }
  };

  const handleDeleteNews = async (newsId) => {
    try {
      await axios.delete(`http://localhost:9090/university/news/${newsId}`);
      fetchNews();
    } catch (error) {
      console.error("Error deleting news:", error);
      setError("An error occurred while deleting the news.");
    }
  };

  const handleEditNews = (newsId) => {
    setIsEditing(true);
    setNewsIdToEdit(newsId);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewsIdToEdit(null);
  };

  const handleSave = async (updatedNewsData) => {
    try {
      await axios.put(`http://localhost:9090/university/news/${updatedNewsData.news_id}`, updatedNewsData);
      fetchNews();
      handleCancelEdit();
      // Update the news state with the updated data
      setNews(prevNews => prevNews.map(singleNews => singleNews.news_id === updatedNewsData.news_id ? updatedNewsData : singleNews));
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };
  
  return (
    <div className={`events-page ${isEditing && newsIdToEdit && editedNews ? 'blur-background' : ''}`}>
      <SideBar />
      {isEditing && newsIdToEdit && editedNews ? (
        <EditNews news={editedNews} onSave={handleSave} onCancel={handleCancelEdit} />
      ) : (
        <>
          <h2>جميع الأخبار</h2>
          {isLoading && <p className="loading-text">جاري تحميل الأخبار...</p>}
          {error && <p>{error}</p>}

          <div className="total-events">
            عدد الأخبار : <span>{totalNews}</span>
          </div>
          <div className="events-container">
            <table id="events-table" className="events-table">
            <thead>
                <tr>
                  <th>&emsp;&emsp;
                    صورة الخبر &emsp;&emsp;&emsp;&emsp;
                  عنوان الخبر    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  تاريخ النشر&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  مصدر الخبر&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 
                 تعديل&emsp;
                حذف
                 </th>
                </tr>
              </thead>
              <tbody>
                {renderNews()}
              </tbody>
            </table>

            {totalNews > newsPerPage && (
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

export default News;
