import React from 'react';
import "../styles/ArticlePage.css"
import Footer from '../layouts/Footer';
import Navbar from '../layouts/Navbar';

const ArticlePage = () => {
    return ( 
        <div className="container-fluid bg-gray">
        <div className="row">
          <Navbar/>
          <div className="col-lg-2">
          </div>        
          <Footer/>
        </div>
      </div>
     );
}
 
export default ArticlePage;
