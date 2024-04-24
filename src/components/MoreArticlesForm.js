import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";  
import ArticleItemStudent from './articleItemStudent';
import "../styles/MoreArticlesForm.css";
import "../styles/ArticleByDetails.css";

const MoreArticlesForm = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://localhost:9090/university/articles');
            // Sort articles based on category_id
            const sortedArticles = response.data.sort((a, b) => a.category_id - b.category_id);
            setArticles(sortedArticles);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const customStyle = {
        width: '49%', 
    };

    return ( 
        <div dir="rtl">
            <h1>قائمة المقالات</h1>
            {articles.map((article) => (
                <Link key={article.article_id} to={`/articles/${article.article_id}`} style={customStyle}>
                    <ArticleItemStudent article={article} />
                </Link>
            ))}
        </div>
    );
}

export default MoreArticlesForm;
