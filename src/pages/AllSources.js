import React from "react";
import "../styles/AllArticles.css";
import Sources from "../components/Sources";
import NavbarSource from "../layouts/NavbarSource";
 


function AllSources() {
  return (
    <div className="container-fluid bg-gray">
      <div className="row">
        
          <NavbarSource />
       
        <h1 className="art" dir="rtl">الناشرين</h1>
      
          <div className="container-2">
            
            <Sources />
          </div>
       
        
      </div>
    </div>
  );
}

export default AllSources;