import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import EventItemStudent from '../components/eventItemStudent';
import ArticleItemStudent from "../components/articleItemStudent";
import PostItemStudent from "../components/postItemStudent";
import SportItemStudent from "../components/sportItemStudent";
import NewsItemStudent from "../components/newsItemStudent";
import VideoItemStudent from "../components/VideoItemStudent";
import Footer from '../layouts/Footer';
import { Link } from "react-router-dom";
import '../styles/CollegeDetails.css';


const CollegeDetails = () => {
    const [collegeData, setCollegeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [events, setEvents] = useState([]);
    const [articles, setArticles] = useState([]);
    const [posts, setPosts] = useState([]);
    const [sports, setSports] = useState([]);
    const [news, setNews] = useState([]);
    const [videos, setVideos] = useState([]);
    const [displayedPosts, setDisplayedPosts] = useState(3); 
    const [displayedEvents, setDisplayedEvents] = useState(3);
    const [displayedArticles, setDisplayedArticles] = useState(3);
    const [displayedSports, setDisplayedSports] = useState(3);
    const [displayedNews, setDisplayedNews] = useState(3);
    const [displayedVideos, setDisplayedVideos] = useState(4);
    
    const { id } = useParams();
    const loadMorePosts =()=>{
        setDisplayedPosts(prevCount => prevCount + 3);
      }
    const loadMoreArticles=()=>{
        setDisplayedArticles(prevCount => prevCount + 3);
    }
    const loadMoreEvents=()=>{
        setDisplayedEvents(prevCount => prevCount + 3);
    }
    const loadMoreSports=()=>{
        setDisplayedSports(prevCount => prevCount + 3);
    }
    const loadMoreNews=()=>{
        setDisplayedNews(prevCount => prevCount + 3);
    }
    const loadMoreVideos=()=>{
        setDisplayedVideos(prevCount => prevCount + 3);

    }
    
    useEffect(() => {
        const fetchCollegeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/colleges/${id}`);
                setCollegeData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching college details:", error);
                setError("An error occurred while fetching college details.");
                setIsLoading(false);
            }
        };
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/videos?college_id=${id}`);
                console.log("Videos response:", response.data); // Log the response data
                const filterVideos = response.data.filter(video => video.college_id === parseInt(id));
                setVideos(filterVideos);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/events?college_id=${id}`);
                console.log("Events response:", response.data); 
                const filterEvents = response.data.filter(event => event.college_id === parseInt(id));
                setEvents(filterEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        
        

        const fetchArticles = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/articles?college_id=${id}`);
                console.log("Articles response:", response.data); 
                const filterArticles = response.data.filter(article => article.college_id === parseInt(id));
                setArticles(filterArticles);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/posts?college_id=${id}`);
                console.log("Posts response:", response.data); 
                const filterPosts = response.data.filter(post => post.college_id === parseInt(id));
                setPosts(filterPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        const fetchSports = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/sports?college_id=${id}`);
                console.log("Sports response:", response.data); 
                const filterSports = response.data.filter(sport => sport.college_id === parseInt(id));
                setSports(filterSports);
            } catch (error) {
                console.error("Error fetching sports:", error);
            }
        };

        const fetchNews = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/news?college_id=${id}`);
                console.log("News response:", response.data); 
                const filterNews = response.data.filter(news => news.college_id === parseInt(id));
                setNews(filterNews);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchCollegeDetails();
        fetchEvents();
        fetchArticles();
        fetchPosts();
        fetchSports();
        fetchNews();
        fetchVideos();
    }, [id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const customStyle = {
        width: '23%', 
        backgroundColor: 'lightgray', 
        minWidth:"150px"
      };

      const customStyle1 = {
        backgroundColor: 'white',
        padding: "10px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        maxWidth: "400px",  
        height: "100px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        margin: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        minWidth:"400px"
    };
    
    
    
    return (
        <>
            <Navbar />
            <div className="college-details-container" style={{marginTop:"-40px"}} > 
            <div className='banner' >
            <img src={collegeData?.college_back_ground} alt="Banner" />
            <div className="banner-content" >
                <h1>{collegeData?.college_name}</h1>
                <img src={collegeData?.college_icon} alt="College Icon" className="college-banner" />
            </div>
        </div>
            <div className="videos-section" dir='rtl'>
            <div className="heading">الفيديوهات</div>
            <div className="description">
            <div>تقام الفعاليات الهامة بانتظام في الجامعة <br></br>تابعنا للحصول على كل جديد</div>
            <Link className="links" to="/videos">رؤية جميع الفيديوهات</Link>
            </div>
            <div className="video-items-container">
                {videos.slice(0, displayedVideos).map(video => (
                    <VideoItemStudent key={video.video_id} video={video} style={customStyle} />
                ))}
            </div>
            {videos.length > displayedVideos && (
                <button className="load-more-button" onClick={loadMoreVideos}> عرض المزيد</button>
            )}
            </div>                    
            <div className="events-section" dir='rtl'>
            <div className="heading" id="topEvents">اهم الاحداث</div>
            <div className="description">
            <div>تقام فعاليات الجامعة علي مدار العام، بدءا من <br></br>العروض التعليمية وحتى المحاضرات العامة</div>
            <Link className="links" to="/importantEvents">رؤية جميع الأحداث</Link>
            </div>
            <div className="event-items-container">
                {events.slice(0, displayedEvents).map(event => (
                    <EventItemStudent key={event.event_id} event={event} />
                ))}
            </div>
            {events.length > displayedEvents && (
                <button className="load-more-button" onClick={loadMoreEvents}>عرض المزيد</button>
            )}
            </div>

            <div className="articles-section" dir='rtl'>
            <div className="heading" id="topArticals">اهم المقالات</div>
            <div className="description">
            <div>يتم نشر المقالات الهامة والمفيدة للجامعة بانتظام <br></br>قم بزيارة الصفحة التالية لرؤية جميع المقالات</div>
            <Link className="links" to="/articles">رؤية جميع المقالات</Link>
            </div>
            <div className="article-items-container">
                {articles.slice(0, displayedArticles).map(article => (
                    <ArticleItemStudent key={article.article_id} article={article} />
                ))}
            </div>
            {articles.length > displayedArticles && (
                <button className="load-more-button" onClick={loadMoreArticles}> عرض المزيد</button>
            )}
            </div>

            <div className="posts-section" dir='rtl'>
            <div className="heading" id="topPosts">آخر المنشورات </div>
            <div className="description">
            <div>تقوم الجامعة بنشر المنشورات الهامة والمفيدة للجميع <br></br>تابعنا للحصول على كل جديد</div>
            <Link className="links" to="/posts">رؤية جميع المنشورات</Link>
            </div>
            <div className="post-items-container">
                {posts.slice(0, displayedPosts).map(post => (
                    <PostItemStudent key={post.post_id} post={post} />
                ))}
            </div>
            {posts.length > displayedPosts && (
                <button className="load-more-button" onClick={loadMorePosts}> عرض المزيد</button>
            )}
            </div>

            <div className="sports-section" dir='rtl'>
            <div className="heading">الرياضة</div>
            <div className="description">
            <div>تقام الأنشطة الرياضية بانتظام في الجامعة <br></br>تابعنا للحصول على كل جديد</div>
            </div>
            <div className="sport-items-container">
                {sports.slice(0, displayedSports).map(sport => (
                    <SportItemStudent key={sport.sport_id} sport={sport} />
                ))}
            </div>
            {sports.length > displayedSports && (
                <button className="load-more-button" onClick={loadMoreSports}> عرض المزيد</button>
            )}
            </div>

            <div className="news-section" dir='rtl'>
            <div className="heading" id="topNews">آخر الأخبار</div>
            <div className="description">
            <div>تقوم الجامعة بنشر الأخبار الهامة والمفيدة للجميع <br></br>تابعنا للحصول على كل جديد</div>
            </div>
            <div className="news-items-container">
                {news.slice(0, displayedNews).map(news => (
                    <div style={{display:"inline-flex"}}>
                        <NewsItemStudent key={news.news_id} news={news} style={customStyle1} />
                    </div>
                ))}
            </div>
            {news.length > displayedNews && (
                <button className="load-more-button" onClick={loadMoreNews}> عرض المزيد</button>
            )}
            </div>
        </div>
        <Footer />
    </>
    );
};

export default CollegeDetails;
