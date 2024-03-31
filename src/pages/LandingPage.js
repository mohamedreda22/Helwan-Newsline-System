import React, { useState, useEffect } from "react";
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import "../styles/landingPage.css";
import { Link } from "react-router-dom";
import EventItemStudent from '../components/eventItemStudent';
import ArticleItemStudent from "../components/articleItemStudent";
import PostItemStudent from "../components/postItemStudent.js";
import axios from "axios";

function LandingPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [displayedEvents, setDisplayedEvents] = useState(3); // Initial number of events displayed
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState(3); 
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState(3); 


  useEffect(() => {
    fetchEvents();
    fetchArticles();
    fetchPosts();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:9090/university/events");
      setEvents(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("An error occurred while fetching events.");
      setIsLoading(false);
    }
  };

  const loadMoreEvents = () => {
    setDisplayedEvents(prevCount => prevCount + 3);
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:9090/university/articles");
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const loadMoreArticles = () => {
    setDisplayedArticles(prevCount => prevCount + 3);
  };

  const fetchPosts =async ()=>{
    try {
      const response = await axios.get("http://localhost:9090/university/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  const loadMorePosts =()=>{
    setDisplayedPosts(prevCount => prevCount + 3);
  }


  return (
    <div className="container-fluid bg-gray">
      <div className="row">
        <Navbar />
        <div className="page-section">
          <div className="events-section">
            <div className="heading">اهم الاحداث</div>
            <div className="description">
              <div>تقام فعاليات الجامعة علي مدار العام، بدءا من <br></br>العروض التعليمية وحتى المحاضرات العامة</div>
              <Link className="links" to="/events">رؤية جميع الفعاليات</Link>
            </div>
            <div>
              {events.slice(0, displayedEvents).map(event => (
                <EventItemStudent key={event.event_id} event={event} />
              ))}
              {events.length > displayedEvents && (
                <button className="load-more-button" onClick={loadMoreEvents}>عرض المزيد</button>
              )}
              
            </div>
          </div>
          <div className="articles-section">
            <div className="heading">اهم المقالات</div>
            <div className="description">
              <div>يتم نشر المقالات الهامة والمفيدة للجامعة بانتظام <br></br>قم بزيارة الصفحة التالية لرؤية جميع المقالات</div>
              <Link className="links" to="/articles">رؤية جميع المقالات</Link>
            </div>
            <div>
              {articles.slice(0, displayedArticles).map(article => (
                <ArticleItemStudent key={article.article_id} article={article} />
              ))}
              {articles.length > displayedArticles && (
                <button className="load-more-button" onClick={loadMoreArticles}> عرض المزيد</button>
              )}
            </div>
          </div>
          <div className="posts-section">
            <div className="heading">آخر المنشورات </div>
            <div className="description">
              <div>تقوم الجامعة بنشر المنشورات الهامة والمفيدة للجميع <br></br>تابعنا للحصول على كل جديد</div>
              <Link className="links" to="/posts">رؤية جميع المنشورات</Link>
            </div>
            <div>
              {posts.slice(0, displayedPosts).map(post => (
                <PostItemStudent key={post.post_id} post={post} />
              ))}
              {posts.length > displayedPosts && (
                <button className="load-more-button" onClick={loadMorePosts}> عرض المزيد</button>
              )}
            </div>
          </div>
              <div className="send-notification-section">
                <div className="heading">إرسال إشعار</div>
                <div className="description">
                  <div>أدخل بريدك الإلكتروني لتلقي إشعارات حول الأحداث والمقالات الجديدة</div>
                </div>
                <div className="notification-form">
                  <input type="email" placeholder="أدخل بريدك الإلكتروني" />
                  <button className="send-notification-button">إرسال</button>
                </div>
                </div>

        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
