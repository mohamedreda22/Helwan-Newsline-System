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
import FCAIH from "../assets/images/484.jpg"
import { Link } from "react-router-dom";
import './CollegeDetails.css';


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
                console.log("Events response:", response.data); // Log the response data
                const filterEvents = response.data.filter(event => event.college_id === parseInt(id));
                setEvents(filterEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        
        

        const fetchArticles = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/articles?college_id=${id}`);
                console.log("Articles response:", response.data); // Log the response data
                const filterArticles = response.data.filter(article => article.college_id === parseInt(id));
                setArticles(filterArticles);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/posts?college_id=${id}`);
                console.log("Posts response:", response.data); // Log the response data
                const filterPosts = response.data.filter(post => post.college_id === parseInt(id));
                setPosts(filterPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        const fetchSports = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/sports?college_id=${id}`);
                console.log("Sports response:", response.data); // Log the response data
                const filterSports = response.data.filter(sport => sport.college_id === parseInt(id));
                setSports(filterSports);
            } catch (error) {
                console.error("Error fetching sports:", error);
            }
        };

        const fetchNews = async () => {
            try {
                const response = await axios.get(`http://localhost:9090/university/news?college_id=${id}`);
                console.log("News response:", response.data); // Log the response data
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
      };
    return (
        <>
            <Navbar />
            <div className="college-details-container"> 
            <div className='banner'>
            <img src={collegeData?.college_back_ground} alt="Banner" />
            <div className="banner-content">
                <h1>{collegeData?.college_name}</h1>
                <img src={collegeData?.college_icon} alt="College Icon" className="college-banner" />
            </div>
        </div>
                <div className="videos-section">
                <div className="heading">الفيديوهات</div>
                <div className="description">
                <div>تقام الفعاليات الهامة بانتظام في الجامعة <br></br>تابعنا للحصول على كل جديد</div>
                <Link className="links" to="/videos">رؤية جميع الفيديوهات</Link>
                </div>
                {videos.slice(0, displayedVideos).map(video => (
                        <VideoItemStudent key={video.video_id} video={video} style={customStyle} />
                    ))}              

                </div>                    
                {videos.length > displayedVideos && (
                        <button className="load-more-button" onClick={loadMoreVideos}> عرض المزيد</button>
                      )}
                <div className="events-section">
                <div className="heading" id="topEvents">اهم الاحداث</div>
                <div className="description">
              <div>تقام فعاليات الجامعة علي مدار العام، بدءا من <br></br>العروض التعليمية وحتى المحاضرات العامة</div>
            </div>
            {events.slice(0, displayedEvents).map(event => (
                        <EventItemStudent key={event.event_id} event={event} />
                    ))}              
                    {events.length > displayedEvents && (
                        <button className="load-more-button" onClick={loadMoreEvents}>عرض المزيد</button>
                      )}
                </div>

                <div className="articles-section">
                <div className="heading" id="topArticals">اهم المقالات</div>
                <div className="description">
              <div>يتم نشر المقالات الهامة والمفيدة للجامعة بانتظام <br></br>قم بزيارة الصفحة التالية لرؤية جميع المقالات</div>
              <Link className="links" to="/articles">رؤية جميع المقالات</Link>
            </div>
            {articles.slice(0, displayedArticles).map(article => (
                        <ArticleItemStudent key={article.article_id} article={article} />
                    ))}
                    {articles.length > displayedArticles && (
                <button className="load-more-button" onClick={loadMoreArticles}> عرض المزيد</button>
              )}
                </div>

                <div className="posts-section">
                <div className="heading" id="topPosts">آخر المنشورات </div>
                <div className="description">
              <div>تقوم الجامعة بنشر المنشورات الهامة والمفيدة للجميع <br></br>تابعنا للحصول على كل جديد</div>
              <Link className="links" to="/posts">رؤية جميع المنشورات</Link>
            </div>
            {posts.slice(0, displayedPosts).map(post => (
                        <PostItemStudent key={post.post_id} post={post} />
                    ))}
                    {posts.length > displayedPosts && (
                <button className="load-more-button" onClick={loadMorePosts}> عرض المزيد</button>
              )}
                </div>

                <div className="sports-section">
                <div className="heading">الرياضة</div>
                <div className="description">
              <div>تقام الأنشطة الرياضية بانتظام في الجامعة <br></br>تابعنا للحصول على كل جديد</div>
            </div>
            {sports.slice(0, displayedSports).map(sport => (
                        <SportItemStudent key={sport.sport_id} sport={sport} />
                    ))}               
                    {sports.length > displayedSports && (
                        <button className="load-more-button" onClick={loadMoreSports}> عرض المزيد</button>
                      )}
                </div>

                <div className="news-section">
                <div className="heading" id="topNews">آخر الأخبار</div>
                <div className="description">
              <div>تقوم الجامعة بنشر الأخبار الهامة والمفيدة للجميع <br></br>تابعنا للحصول على كل جديد</div>
            </div>
            {news.slice(0, displayedNews).map(news => (
                        <NewsItemStudent key={news.news_id} news={news} />
                    ))}              
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
