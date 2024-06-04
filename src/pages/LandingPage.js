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
import chatbot from "../assets/icons/robot_assistant.svg";


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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [sources, setSources] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [predefinedQuestions, setPredefinedQuestions] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === events.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(intervalId);
  }, [events]);

  const toggleChatbot = () => {
    setChatbotOpen(prevState => !prevState);
  };

  useEffect(() => {
    fetchData("events", setEvents);
    fetchData("articles", setArticles);
    fetchData("posts", setPosts);
    fetchData("sports", setSports);
    fetchData("news", setNews); 
    fetchSources();
  }, []);

  useEffect(() => {
    fetchFAQs()
    .then((questions) => setPredefinedQuestions(questions))
    .catch((error) => console.error("Error setting predefined questions:", error));
  }, []);


  const fetchSources = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/university/sources"
      );
      setSources(response.data);
    } catch (error) {
      console.error("Error fetching sources:", error);
    }
  };

const handleSelect = (selectedIndex) => {
  setIndex(selectedIndex);
};
   const fetchData = async (category, setData) => {
    try {
      const response = await axios.get(`http://localhost:9090/university/${category}/getForCategory/1`);
      setData(response.data);
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
    }
  }; 
  const fetchFAQs = async () => {
    try {
      const response = await axios.get("http://localhost:9090/university/faqs");
      return response.data;
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      return [];
    }
  };

  const handleEmailSend = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9090/university/Emails",
        {
          Notification_email: emailInput
        }
      );
  
      if (response && (response.status === 200 || response.status === 201 || response.status === 202)) {
        setEmailInput(response.data);
        alert('E-mail has been sent!');
        console.log("show data for email send :",response.data)
        return true;
      } else {
        console.error("Error sending email:", response.data);
        alert('E-mail has not been sent!');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert('Error sending email. Please try again later.');
    }
  }

  const handleAskChatbot = async (question) => {
    try {
      // Fetch FAQs
      const faqs = await fetchFAQs();
      // Match user's question with available questions in the data
      const matchedFAQ = faqs.find((faq) => faq.question.includes(question));
      // Set the response based on matched FAQ or default message
      setResponse(matchedFAQ ? matchedFAQ.answer : "Sorry, I couldn't understand your question.");
    } catch (error) {
      console.error("Error asking chatbot:", error);
      setResponse("Sorry, I couldn't understand your question.");
    }
  };
  
  const handleQuestionSelect = (selectedQuestion) => {
    console.log("Selected question:", selectedQuestion);
    setQuestion(selectedQuestion);
    console.log("Question state after setting:", question);
    handleAskChatbot(selectedQuestion);
  };
  
  
  const loadMoreSports = () => {
    setDisplayedSports(prevCount => prevCount + 3);
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
      <div className="chatbot-icon" onClick={toggleChatbot}>
  <img src={chatbot} alt="Chatbot" />
</div>

      <div className="row">
        <Navbar />
        <div className="page-section" >
        <div className="news-section" style={{marginTop:"-40px"}} >
          {/* Carousel for news section */}
<Container fluid>
  <Row>
    {/* First item (col-10, align to right) */}
    <Col xs={12} lg={8} className="order-lg-last">
      <Carousel style={{ height: '100%' }} activeIndex={index} onSelect={handleSelect}>
        {news.slice(0, 10).map((item, index) => (
          <Carousel.Item key={index}>
          <img src={item.news_image} alt={item.news_content} style={{ objectFit: 'fit', height: '100%', width: '100%', maxHeight: "360px" }} />
          <Carousel.Caption style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: '10px', borderRadius: '50px' }}>
            <h3 style={{ color: '#fff' }}>{item.news_content}</h3>
            <p style={{ color: '#fff' }}>{sources.find((source) => source.source_id === item.news_source_id)?.full_name}</p>

          </Carousel.Caption>
        </Carousel.Item>

        ))}
      </Carousel>
    </Col>
    {/* Second item (col-2, align to left) */}
    <Col xs={12} lg={4} className="order-lg-first">
      <div style={{ backgroundColor: 'white', height: '100%' }}>
        {/* Display the first 3 news items in the sidebar */}
        {news.slice(0, 3).map((item, index) => (
          <div key={index}>
            <NewsItemStudent news={item} />
          </div>
        ))}
      </div>
    </Col>
  </Row>
</Container>

{/* Display the rest of the news items in rows */}
<Container fluid style={{marginTop:"7px"}}>
  {news.slice(3).reduce((rows, item, index) => {
    if (index % 3 === 0) {
      rows.push([]);
    }
    rows[rows.length - 1].push(item);
    return rows;
    }, []).slice(0, 2).map((row, rowIndex) => (
    <Row key={rowIndex}>
      {row.map((item, colIndex) => (
      <Col xs={12} lg={4} key={colIndex}>
        <NewsItemStudent news={item} />
      </Col>
      ))}
    </Row>
    ))}
  </Container>
        </div>
          <div className="events-section" dir="rtl">
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
          <div className="articles-section" dir="rtl">
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
          <div className="posts-section" dir="rtl">
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
          <div className="sports-section" id="topSports" dir="rtl">
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
            <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            <button className="send-notification-button" onClick={handleEmailSend}>إرسال</button>
            </div>
          </div>

        </div>
            {/* Chatbot section */}
            {chatbotOpen && (
          <div className="chatbot-section">
            <div className="chatbot-icon" onClick={toggleChatbot}>
              <img src={chatbot} alt="Chatbot" />
            </div>
            <div className="card5"> 
            <div >
              <div className="chat-header" style={{display:"flex"}} >Chat               
              <div className="close-chatbot" onClick={toggleChatbot} style={{marginLeft:"230px"}}>❌</div>
              </div>
              </div>
              <div className="chat-window">
                  {/* Render chat messages here */}
                  <ul className="message-list" dir="rtl">
                    {predefinedQuestions.map((faq, index) => (
                      <li key={index} className="chatbot-question" onClick={() => handleQuestionSelect(faq.question)}>
                        {faq.question}
                      </li>
                    ))}
                    <h2></h2>
                    {question && (
                      <li  key={index} className="chatbot-question" onClick={() => handleQuestionSelect(question)}>
                        {question}
                      </li>
                    )}
                  </ul>
                  {/* Display the response */}
                  {response && (
                    <div className="chatbot-response" dir="rtl">
                      <p>{response}</p>
                    </div>
                  )}
                </div>
            </div>
          </div>
        )}        
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;
