import {React,useState} from 'react';

const ArticleItemStudent = ({ article ,style}) => {
    const [showFullContent, setShowFullContent] = useState(false);
    const formatDateTime = (dateTimeString) => {
      const dateTime = new Date(dateTimeString);

      const day = dateTime.getDate();
      const month = dateTime.toLocaleString('default', { month: 'long' });

      return { day, month };
  };

  const { day, month } = formatDateTime(article.article_creation_date);
    
  return (
    <div className="event-card-container" style={style}>  
      <div className="event-card-item">
      <img src={article.article_image_path} className='event-card-image' alt='image_test'/>
        <div className="event-card-header">
        <div className="event-card-date1" >
                    <span className="day1" >{day}</span> {/* Display day */}
                    <span className="event-card-month1">{month}</span> 
                </div>
        </div>          
        <h3 className="event-card-title" >{article.article_address}</h3>
        <span className="source-name"> نشر بواسطة: {article.source_string}</span>
          <p className="event-card-content" dir='rtl'>
                {showFullContent ? article.article_content : (article.article_content.length > 100 ? `${article.article_content.slice(0, 100)}...` : article.article_content)}
            </p>
        <a href={`/articles/${article.article_id}`} className="links" target='blank'>عرض المزيد</a>
          <div className="event-card-source">

        </div>
      </div>
    </div>
  );
};

export default ArticleItemStudent;
