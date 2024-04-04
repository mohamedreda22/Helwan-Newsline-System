import VideoItemStudent from '../components/VideoItemStudent'
import axios from 'axios';
import { useState, useEffect } from 'react';

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
        setDisplayedVideos(prevCount => prevCount + 3);
    };

    
    return (
        <div>
            <h1>Student Videos</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div >
                {videos.slice(0, displayedVideos).map((video) => (
                    <VideoItemStudent key={video.video_id} video={video} />
                ))}
            </div>
            {videos.length > displayedVideos && (
                <button onClick={loadMoreVideos}>Load More</button>
            )}
        </div>
    );
}
export default StudentVideos;