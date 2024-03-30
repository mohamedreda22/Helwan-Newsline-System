import React from "react";
import Navbar from '../layouts/Navbar'
import Footer from '../layouts/Footer'
function LandingPage() {
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

export default LandingPage;