import React from "react";
import SideBar from "../components/SideBar";
 
//import SearchBar from "../layouts/SearchBar";
import "../styles/AllArticles.css";
import Sources from "../components/Sources";
 


function AllSources() {
  return (
    <div className="container-fluid bg-gray">
      <div className="row">
        <div className="col-lg-10">
        <h1 className="art" dir="rtl">الناشرين</h1>
          <div className="container-2">
            
            <Sources />
          </div>
        </div>
        <div className="col-lg-2">
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default AllSources;