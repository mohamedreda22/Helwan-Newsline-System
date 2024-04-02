import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import "../styles/MoreArticlesForm.css"
import "../styles/ArticleByDetails.css"
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
  const handleVideo=()=>{
     
    window.location.href = '/';
}
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
    <Col key={article.article_id} xs={12} md={4}>
      <div>
        <Link to={`/article/${article.article_id}`}>
          <img 
            src={article.article_image_path} 
            alt={article.article_address}
            style={{
              filter: "blur(2px)",
              opacity: "0.7",
              filter: "brightness(70%)",
              width: "70%"
            }}
          /> 
        </Link>
        <div>
          <p className="address">{article.article_address}</p> 
          <p className="share">تم النشر بواسطه:{article.source_string}</p>  
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








 