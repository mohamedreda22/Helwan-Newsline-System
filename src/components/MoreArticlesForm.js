// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import ArticleItemStudent from './articleItemStudent';
// import "../styles/MoreArticlesForm.css";
// import "../styles/ArticleByDetails.css";

// const MoreArticlesForm = () => {
 
//     const [articles, setArticles] = useState([]);

//     useEffect(() => {
//         fetchArticles();
//     }, []); 

//     const fetchArticles = async () => {
//         try {
//             const response = await axios.get('http://localhost:9090/university/articles');
//             setArticles(response.data);
//         } catch (error) {
//             console.error('Error fetching articles:', error);
//         }
//     };
//     const customStyle = {
//         width: '49%', 
//       };
//     return ( 
//         <div>
//             <h1>قائمة المقالات</h1>
//                 {articles.map((article) => (
//                     <ArticleItemStudent key={article.article_id} article={article} style={customStyle}/>
//                 ))}
//         </div>
//     );
// }
 
// export default MoreArticlesForm;





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
            setArticles(response.data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    const customStyle = {
        width: '49%', 
    };

    return ( 
        <div>
            <h1>قائمة المقالات</h1>
            {articles.map((article) => (
                // استخدام Link بدلاً من div حول عنصر الـ ArticleItemStudent
                <Link key={article.article_id} to={`/articles/${article.article_id}`} style={customStyle}>
                    <ArticleItemStudent article={article} />
                </Link>
            ))}
        </div>
    );
}

export default MoreArticlesForm;

//  Edit to go to the ArticleByDetails page