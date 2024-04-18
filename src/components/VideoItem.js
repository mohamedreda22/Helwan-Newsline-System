import React from 'react';
import '../styles/VideoItem.css'; 

function VideoItem({ video, onDelete,onEdit }) {
  const handleDelete = () => {
    onDelete(video.video_id);
  };
  const handleEdit=()=>{
    onEdit(video.video_id)
  }
  const showControls=()=>{
    document.querySelector('.video-player1').controls = true;
  }

  return (
    <div className="video-card" >
      <div className="video-item-container" dir='rtl'>
        <video className="video-player1" onClick={showControls}>
          <source src={video.video_path} type="video/mp4" />
        </video>
        <div className="video-info">
          <h3 className="video-title">{video.video_title}</h3>
          <p className="video-description">{video.video_description}</p>
        </div>
        <div className='btns'>
        <button className='edit-btn1' onClick={handleEdit}>
          تعديل
        </button> 
        <button className='delete-btn1' onClick={handleDelete}>
          حذف
        </button>

        </div>
      </div>
    </div>
  );
}

export default VideoItem;
