import axios from "axios";
import React from "react";
import "../styles/AllVideos.css"; 
import SideBar from "../components/SideBar";
import Videos from "../components/Videos";
 
 


     


const AllVideos = () => {
   
  return (
    <>
      <div className="container-fluid bg-gray">
      <div className="row">
        <div className="col-lg-10">
        <h1>الفيديوهات</h1>
          <div className="container-2">
            
            <Videos/>
          </div>
        </div>
        <div className="col-lg-2">
          <SideBar />
        </div>
      </div>
    </div>
    </>
  );
};

export default  AllVideos;