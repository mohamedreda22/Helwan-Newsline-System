
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "../styles/MoreArticlesForm.css"
import "../styles/ArticleByDetails.css"
// imports

 

const MoreArticlesForm = (article) => {

    const [articles, setArticles] = useState([]);
    const [showFullContent, setShowFullContent] = useState(false);
    const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []); 

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:9090/university/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };
  const handleVideo=()=>{
     
    window.location.href = '/';
}

const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const day = dateTime.getDate();
  const month = dateTime.toLocaleString('default', { month: 'long' });
  return { day, month };
};

const { day, month} = formatDateTime(article.article_creation_date);

    return ( 
 
    <div>
       <h1>قائمة المقالات</h1>
       <button  
          className='rounded-0'
            style={{ color:"white", 
                    backgroundColor:"rgb(16, 16, 39)",
                   borderRadius:"15px",
                   borderBlock:"white",
                   width:"150px",
                   height:"50px",
                   marginBottom:"50px"

                   }}
                   onClick={() => handleVideo()}
                   
                   > 
               بعض مقاطع الفيديو </button>

               <Row dir="rtl">
                  {articles.map((article) => (
                  
                 <Card style={{ width: '18rem' ,marginRight:"90px" ,marginBottom:"100px"}}>
                   <Link to={`/article/${article.article_id}`}>
                 <Card.Img    
                       src={article.article_image_path} 
                       alt={article.article_address}
                       style={{
                           filter: "blur(2px)",
                           opacity: "0.7",
                           filter: "brightness(70%)",
                           width: "100%",  
                           height: " 300px",   
                            
                       }}
                        />
                   </Link>
                 <Card.Body>
                   <div className="event-card-date1">
                        <span className="day1">{day}</span> {/* Display day */}
                        <span className="event-card-month1">{month}</span> 
                    </div>    
                   <Card.Title className="address">{article.article_address} </Card.Title>
                   <p className="share">تم النشر بواسطه:{article.source_string}</p>
                   
                  
                    
                 </Card.Body>
               </Card>
     
                         ))}
  
                </Row>

    </div>


    
     );
}
 
export default MoreArticlesForm;







 
 

 




 

 