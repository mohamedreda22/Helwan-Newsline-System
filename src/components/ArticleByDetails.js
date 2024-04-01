import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";

const ArticleByDetails = () => {
    const { article_id } = useParams();

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
        <div>
             <h2>مقال #{article_id}</h2>
      {/* أضف أي معلومات أخرى تريدها لعرضها عند فتح المقال */}
      {articles.map((article) => (
    
      <div>
        
          <img 
            src={article.article_image_path} 
            alt={article.article_address}
            style={{
              filter: "blur(2px)",
              opacity: "0.7",
              filter: "brightness(70%)",
              width: "100%",
              height:"300px"
            }}
          /> 
        
        <div>
          <p>{article.article_address}</p> 
          <p>{article.article_content}</p>
           
        </div>
      </div>
   
  ))}
        </div>
     );
}
 
export default ArticleByDetails;