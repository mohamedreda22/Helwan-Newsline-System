import React, { useState, useEffect } from "react";
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import "../styles/landingPage.css";
import { Link } from "react-router-dom";
import EventItemStudent from '../components/eventItemStudent';
import ArticleItemStudent from "../components/articleItemStudent";
import axios from "axios";

function LandingPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [displayedEvents, setDisplayedEvents] = useState(3); // Initial number of events displayed
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState(3); // Initial number of articles displayed

  useEffect(() => {
    fetchEvents();
    fetchArticles();
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
            <div className="heading">المقالات</div>
            <div className="description">
              <div>يتم نشر المقالات الهامة والمفيدة للجامعة بانتظام <br></br>قم بزيارة الصفحة التالية لرؤية جميع المقالات</div>
              <Link className="links" to="/articles">رؤية جميع المقالات</Link>
            </div>
            <div>
              {articles.slice(0, displayedArticles).map(article => (
                <ArticleItemStudent key={article.id} article={article} />
              ))}
              {articles.length > displayedArticles && (
                <button className="load-more-button" onClick={loadMoreArticles}> عرض المزيد</button>
              )}
            </div>
          </div>
{/*           <div className="contact-section">
            <div className="heading">تواصل معنا</div>
            <div className="description">
              <div>للتواصل معنا يمكنك استخدام البريد الالكتروني او الهاتف <br></br> سوف نكون سعداء بالرد على استفساراتكم</div>
              <div className="contact-details">
                <div className="contact-email">البريد الالكتروني: helwan.info@hu.gov</div>
                <div className="contact-phone">الهاتف:
                  <a href="tel:+966 55 555 5555">+966 55 555 5555</a>
                </div>
              </div> */}
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
