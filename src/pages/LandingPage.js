import React, { useState, useEffect } from "react";
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import "../styles/landingPage.css";
import { Link } from "react-router-dom";
import EventItemStudent from '../components/eventItemStudent';
import ArticleItemStudent from "../components/articleItemStudent";
import PostItemStudent from "../components/postItemStudent";
import SportItemStudent from "../components/sportItemStudent";
import NewsItemStudent from "../components/newsItemStudent"; 

import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col } from 'react-bootstrap';
import HUImage from '../assets/images/HU.png';


import axios from "axios";

function LandingPage() {
  const [events, setEvents] = useState([]);
  const [displayedEvents, setDisplayedEvents] = useState(3); 
  const [articles, setArticles] = useState([]);
  const [displayedArticles, setDisplayedArticles] = useState(3); 
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState(3); 
  const [sports, setSports] = useState([]);
  const [displayedSports, setDisplayedSports] = useState(3);
  const [news, setNews] = useState([]);
  const [displayedNews, setDisplayedNews] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === events.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(intervalId);
  }, [events]);


  useEffect(() => {
    fetchData("events", setEvents);
    fetchData("articles", setArticles);
    fetchData("posts", setPosts);
    fetchData("sports", setSports);
    fetchData("news", setNews); 
  }, []);

  const SlideShow = ({ items }) => {
    return (
      <div>
        {items.map((item, index) => (
          <div key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
            {/* Render your item component here */}
            {/* For example: <EventItemStudent event={item} /> */}
            <EventItemStudent event={item} /> 
          </div>
        ))}
      </div>
    );
  };


// test the carousele //
const [index, setIndex] = useState(0);
const handleSelect = (selectedIndex) => {
  setIndex(selectedIndex);
};
// //////////////////////////////////
   const fetchData = async (category, setData) => {
    try {
      const response = await axios.get(`http://localhost:9090/university/${category}/getForCategory/1`);
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
    }
  }; 


  const loadMoreSports = () => {
    setDisplayedSports(prevCount => prevCount + 3);
  };
  const loadMoreNews = () => {
    setDisplayedNews(prevCount => prevCount + 3);
  };
  const loadMoreArticles = () => {
    setDisplayedArticles(prevCount => prevCount + 3);
  };
  const loadMorePosts =()=>{
    setDisplayedPosts(prevCount => prevCount + 3);
  };
  const loadMoreEvents = () => {
    setDisplayedEvents(prevCount => prevCount + 3);
  };
  return (
    <div className="container-fluid bg-gray">
      
      <div className="row">
        <Navbar />
        <div className="page-section">
          <div className="news-section">
            <div className="heading" id="topNews" style={{marginTop:"0px"}}>آخر الأخبار</div>
            <div className="description">
              <div>تقوم الجامعة بنشر الأخبار الهامة والمفيدة للجميع <br></br>تابعنا للحصول على كل جديد</div>
            </div>

            {/* just testing the carousel for news section */}
            <Container fluid>
              <Row>
                {/* First item (col-10, align to right) */}
                <Col xs={12} lg={8} className="order-lg-last">
                  <Carousel style={{ height: '100%' }} activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                      <img src={HUImage} alt="First slide" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                      <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src={HUImage} alt="Second slide" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                      <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img src={HUImage} alt="Third slide" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
                      <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  </Carousel>
                </Col>

                {/* Second item (col-2, align to left) */}
                <Col xs={12} lg={4} className="order-lg-first">
                  <div style={{ backgroundColor: 'lightgreen', height: '100%' }}>
                    Content for second item
                  </div>
                </Col>
              </Row>
              <Row>

              </Row>
            </Container>
            {/* end of news sectionn */}
            <div>
              {news.slice(0, displayedNews).map(news => (
                <NewsItemStudent key={news.news_id} news={news} />
              ))}
              {news.length > displayedNews && (
                <button className="load-more-button" onClick={loadMoreNews}> عرض المزيد</button>
              )}
            </div>
          </div>
          <div className="events-section">
            <div className="heading" id="topEvents">اهم الاحداث</div>
            <div className="description">
              <div>تقام فعاليات الجامعة علي مدار العام، بدءا من <br></br>العروض التعليمية وحتى المحاضرات العامة</div>
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
            <div className="heading" id="topArticals">اهم المقالات</div>
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
            <div className="heading" id="topPosts">آخر المنشورات </div>
            
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
          <div className="sports-section" id="topSports">
            <div className="heading">الرياضة</div>
            <div className="description">
              <div>تقام الأنشطة الرياضية بانتظام في الجامعة <br></br>تابعنا للحصول على كل جديد</div>
            </div>
            <div>
            {sports.slice(0, displayedSports).map(sport => (
              <SportItemStudent key={sport.sport_id} sport={sport} />
            ))}
                {sports.length > displayedSports && (
                <button className="load-more-button" onClick={loadMoreSports}> عرض المزيد</button>
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
