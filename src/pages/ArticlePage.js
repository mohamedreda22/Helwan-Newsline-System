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


 
