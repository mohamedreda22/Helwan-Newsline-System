import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import axios from "axios";

const ArticleByDetails = () => {
    const { article_id } = useParams();

    const [article, setArticle] = useState(null);

    useEffect(() => {
      fetchArticle();
    }, [article_id]);
  
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/university/articles/${article_id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    if (!article) {
        return <div>Loading...</div>;   
    }

    return ( 
        <div>
             <h2 style={{textAlign:"rigth"}}>مقال #{article_id}</h2>
             <div>
                <img 
                    src={article.article_image_path} 
                    alt={article.article_address}
                    style={{
                         
                        width: "100%",
                        height:"400px"
                    }}
                /> 
                <div>
                    
                    <p  style={{textAlign:"center"}}> {article.article_address}</p> 
                   <p>تم النشر بواسطه:{article.source_string}</p> 
                    <p style={{textAlign:"center"}}>{article.article_content}</p>    
                </div>
            </div>
        </div>
     );
}
 
export default ArticleByDetails;
