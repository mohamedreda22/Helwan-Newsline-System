import React from "react";
import SideBar from "../components/SideBar";
import Articles from "../components/Articles";
import "../styles/AllArticles.css";
 


function AllArticles() {
  return (

    <div className="container-fluid bg-gray" style={{backgroundColor:" rgb(247, 243, 243)"}}>
      <div className="row">
        <div className="col-lg-10">
          <br></br>
        <h1>جميع المقالات</h1>
          <div className="container-3">
           
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