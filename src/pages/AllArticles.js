import React from "react";
import SideBar from "../components/SideBar";
import Articles from "../components/Articles";
//import SearchBar from "../layouts/SearchBar";
import "../styles/AllArticles.css";
 


function AllArticles() {
  return (
    <div className="container-fluid bg-gray">
      <div className="row">
        <div className="col-lg-10">
        <h1 dir="rtl">المقالات</h1>
          <div className="container-2">
            
            <Articles />
          </div>
        </div>
        <div className="col-lg-2">
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default AllArticles;
