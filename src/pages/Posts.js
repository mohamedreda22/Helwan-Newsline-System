import React from "react";
import SideBar from "../components/SideBar";
import SearchBar from "../layouts/SearchBar";
import "../styles/Posts.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ShowPosts from "../components/ShowPosts";

function Posts() {
  return (
    <div className="container-fluid bg-gray">
      <div className="row">
        <div className="col-lg-10">
          <SearchBar />
          <h1 className="header" dir="rtl" style={{fontSize:"50px"}}>المنشورات</h1>
          <div className="container-2">
            <ShowPosts />
          </div>
        </div>
        <div className="col-lg-2">
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default Posts;
