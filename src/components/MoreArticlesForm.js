import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import "../styles/MoreArticlesForm.css"
// imports




const MoreArticlesForm = () => {

    const [articles, setArticles] = useState([]);

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
    return ( 
        <div dir="rtl">
         <h1>قائمة المقالات</h1>
     <Row>
     {articles.map((article) => (
        <Col>
        <div key={article.article_id}  xs={12} md={9}>
          <Link to={`/article/${article.article_id}`}> {/* رابط للانتقال إلى صفحة المقال الفردي */}
            <img 
            src={article.article_image_path} 
            alt={article.article_address}
            style={{
                filter: "blur(2px)",
                opacity: "0.7",
                filter: "brightness(70%)",
                width: "80%"
                }}
            
            /> 
          </Link>
          <div>
          <p>{article.article_address}</p> 
          <p>تم النشر بواسطه:{article.source_string}</p>  
          <p>{article.date}</p> 
          </div>
        </div>
        </Col>
      ))}
     </Row>
        </div>
    
 
    
     );
}
 
export default MoreArticlesForm;