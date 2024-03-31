import { React,useState } from 'react';
const PostItemStudent = ({ post }) => {
    const [showFullContent, setShowFullContent] = useState(false);
  return (
    <div className="event-card-container">
      <div className="event-card-item">
      <img src={post.post_image_path} className='event-card-image' alt='image_test'/>
        <div className="event-card-header">
          <div className="event-card-date">
            <span className="day"> {post.article_date} </span>
          </div>
        </div>          
        <h3 className="event-card-title">{post.article_address}</h3>
        <span className="source-name"> نشر بواسطة: {post.source_string}</span>
        <p className="event-card-content">
                {showFullContent ? post.post_content : (post.post_content.length > 100 ? `${post.post_content.slice(0, 100)}...` : post.post_content)}
            </p>
            {post.post_content.length > 100 && (
                <button onClick={() => setShowFullContent(!showFullContent)} className="load-more-button1">
                    {showFullContent ? "عرض اقل " : " عرض المزيد"}
                </button>
            )}        <a href={`/posts/${post.post_id}`} className="links" target='blank'>تفاصيل اكتر </a>
          <div className="event-card-source">

        </div>
      </div>
    </div>
  );
};

export default PostItemStudent;
