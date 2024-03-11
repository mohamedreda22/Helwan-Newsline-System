import axios from "axios";
import React , { useState, useEffect } from "react";
import edit_icon from "../assets/icons/edit.svg";
import delete_icon from "../assets/icons/delete.svg";
import "../styles/Articles.css";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { Table, Modal, CloseButton } from "react-bootstrap";
import EditVideo2 from "../pages/EditVideo2"




const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editVideo, setEditVideo] = useState(null);
    
    const fetchVideos = async () => {
      try {
        const response = await axios.get(  
          "http://localhost:9090/university/videos"
        );
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while fetching  videos.",
          icon: "error",
        });
      }
    };
    
    useEffect(() => {
      fetchVideos();
    }, []);
    
    const handleDeleteVideo = async (videoId) => {
      try {
        // Optimistically remove the article from the UI
        setVideos(videos.filter(video => video.video_id !== videoId ));
    
        const response = await axios.delete(
          `http://localhost:9090/university/videos/${videoId }`
        );
        if (response && (response.status === 202||response.status === 200)) {
          Swal.fire({
            title: "تم الحذف",
            icon: "success",
          });
        } else {
          throw new Error("An error occurred while deleting the video.");
        }
      } catch (error) {
        console.error("Error deleting video:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while deleting the video.",
          icon: "error",
        });
    
        // Restore the article if the deletion fails
        fetchVideos();
      }
    };
    
    const handleEditVideo = (videoId) => {
      const VideoToEdit = videos.find((video) => video.video_id ===videoId  );
      setEditVideo(VideoToEdit );
      setShowEditModal(true);
    };
    
    const handleCloseEditModal = () => {
      setShowEditModal(false);
      setEditVideo(null);
    };
      return (
        <>
          <div className="mt-2">
            <div className="notifNum"> عدد الفيديوهات :{videos.length}</div>
            
            <Table  responsive hover dir="rtl">
            <tbody>
            {videos.map((video) => (
              <tr key={video.video_id }>
                  <td>{video.video_title}</td> 
                 <td>{video.video_description}</td> 
                 <td>{video.video_path}</td> 
                 <td>{video.category_id}</td> 
                 <td>{video.source_id}</td> 
                 <td>{video.video_id }</td> 
    
                    <td>
                    <img
                      src={delete_icon}
                      alt="Delete video"
                      className="icon"
                      onClick={() => handleDeleteVideo(video.video_id)}
                    />
                  </td> 
    
                  <td>
                    <img
                      src={edit_icon}
                      alt="Edit video"
                      className="icon"
                      onClick={() => handleEditVideo(video.video_id )}
                    />
                  </td>


 
              </tr>
            
            
               ))}
            </tbody>
          </Table>
    
          <Modal dir="rtl" show={showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
              <div className="d-flex justify-content-between align-items-center w-100">
                <Modal.Title>تعديل المقال</Modal.Title>
              </div>
            </Modal.Header>
            <Modal.Body>
              { editVideo && (
                <EditVideo2 post={editVideo} onClose={handleCloseEditModal} />
              )}
            </Modal.Body>
          </Modal>
          </div>
        </>
      );
    };
    
    export default Videos;
    