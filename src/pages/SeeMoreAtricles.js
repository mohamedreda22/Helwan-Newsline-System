import React from 'react';
import Footer from '../layouts/Footer';
import Navbar from '../layouts/Navbar';
import MoreArticlesForm from '../components/MoreArticlesForm';

const SeeMoreArticles = () => {
    return ( 
        <div className="container-fluid bg-gray">
        <div className="row">
          <Navbar/>
          <div className="container-3">
            <MoreArticlesForm />
          </div>
          <div className="col-lg-2">
          </div>        
          <Footer/>
        </div>
      </div>
     );
}
  
export default SeeMoreArticles;