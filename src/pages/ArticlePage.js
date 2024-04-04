import React from 'react';
import "../styles/ArticlePage.css"
import Footer from '../layouts/Footer';
import Navbar from '../layouts/Navbar';
import ArticleByDetails from '../components/ArticleByDetails';

const ArticlePage = () => {
    return ( 
        <div className="container-fluid bg-gray">
        <div className="row">
          <Navbar/>
          <div className="container-3">
            <ArticleByDetails/>
          </div>     
          <div className="col-lg-2">
          </div>     
          <Footer/>
        </div>
      </div>
     );
}
 
export default ArticlePage;




// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ArticlePage = ({ match }) => {
//   const [article, setArticle] = useState(null);

//   useEffect(() => {
//     const fetchArticle = async () => {
//       try {
//         const response = await axios.get(`http://localhost:9090/university/articles/${match.params.articleId}`);
//         setArticle(response.data);
//       } catch (error) {
//         console.error('Error fetching article:', error);
//       }
//     };

//     fetchArticle();
//   }, [match.params.articleId]);

//   if (!article) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{article.article_address}</h1>
//       <img src={article.article_image_path} alt={article.article_address} />
      
//       <p>{article.date}</p>
//       <p>{article.articlel_content}</p>
//     </div>
//   );
// };

// export default ArticlePage;


 
