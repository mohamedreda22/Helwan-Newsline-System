import {React,useState} from 'react';

const ArticleItemStudent = ({ article }) => {
    const [showFullContent, setShowFullContent] = useState(false);
    
  return (
    <div className="event-card-container"> 
      <div className="event-card-item">
      <img src={article.article_image_path} className='event-card-image' alt='image_test'/>
        <div className="event-card-header">
          <div className="event-card-date">
            <span className="day"> {article.article_date} </span>
          </div>
        </div>          
        <h3 className="event-card-title">{article.article_address}</h3>
        <span className="source-name"> نشر بواسطة: {article.source_string}</span>
          <p className="event-card-content">
                {showFullContent ? article.article_content : (article.article_content.length > 100 ? `${article.article_content.slice(0, 100)}...` : article.article_content)}
            </p>
            {article.article_content.length > 100 && (
                <button onClick={() => setShowFullContent(!showFullContent)} className="load-more-button1">
                    {showFullContent ? "عرض اقل " : " عرض المزيد"}
                </button>
            )}
        <a href={`/articles/${article.article_id}`} className="links">عرض المزيد</a>
          <div className="event-card-source">

        </div>
      </div>
    </div>
  );
};

export default ArticleItemStudent;
