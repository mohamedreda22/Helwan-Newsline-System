import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../layouts/Navbar';
import VideoItemStudent from '../components/VideoItemStudent';
import Footer from '../layouts/Footer';

const StudentVideos = () => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [displayedVideos, setDisplayedVideos] = useState(3); // Initial number of videos displayed

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await axios.get("http://localhost:9090/university/videos");
            setVideos(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching videos:", error);
            setError("An error occurred while fetching videos.");
            setIsLoading(false);
        }
    };

    const loadMoreVideos = () => {
        setDisplayedVideos(prevCount => prevCount + 2);
    };

    return (
        <div>
            <Navbar />
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div>
                <div>
                    {videos.slice(0, 2).map(video => (
                        <VideoItemStudent key={video.video_id} video={video} />
                    ))}
                </div>
            </div>
            <div className="important-videos-section" >
                <div className="heading">أهم الفيديوهات</div>
                <div className="description">
                    <div>تقوم الجامعة بنشر الفيديوهات الهامة والمفيدة للجميع <br />تابعنا للحصول على كل جديد</div>
                </div>
            </div>
            <hr />
            <div>
                <div className='flex-container'>
                    {videos.slice(2).map(video => (
                        <VideoItemStudent key={video.video_id} video={video} />
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default StudentVideos;
