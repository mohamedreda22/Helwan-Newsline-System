import React from 'react';

const ArticleItemStudent = ({ article }) => {
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
          <p className="event-card-content">{article.article_content}</p>
        <a href={`/articles/${article.article_id}`} className="links">عرض المزيد</a>
          <div className="event-card-source">

        </div>
      </div>
    </div>
  );
};

export default ArticleItemStudent;
