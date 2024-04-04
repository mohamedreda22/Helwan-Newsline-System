import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import "../styles/ArticleByDetails.css"
import axios from "axios";

const ArticleByDetails = () => {
    const { article_id } = useParams();
    const [articles, setArticles] = useState([]);
    const [article, setArticle] = useState(null);
   
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

    const filteredArticles = articles.filter(item => item.article_id !== article_id && (!article || item.article_id !== article.article_id)).slice(0, 3);

    return ( 
        <div>
            <h2 className="share" style={{textAlign:"center"}}>مقال عن: {article.article_address}</h2>
            <div>
                <img 
                    src={article.article_image_path} 
                    alt={article.article_address}
                    style={{                         
                        width: "100%",
                        height:"800px"
                    }}
                /> 
                <div>                   
                    <p className="share">تم النشر بواسطة: {article.source_string}</p> 
                    <p className="content" style={{textAlign:"center"}}>{article.article_content}</p>    
                </div>
            </div>

            <div className="more-of-articles">
                <Row dir="rtl">
                    <h2 className="more">المزيد من المقالات</h2>
                    {filteredArticles.map((article) => (
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
                                    <p className="share">تم النشر بواسطة: {article.source_string}</p>  
                                    <p>{article.date}</p> 
                                    <p className="contant" style={{textAlign:"center"}}>{article.article_content}</p>  
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}
 
export default ArticleByDetails;
