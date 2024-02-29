// import { createBrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import SideBar from "../components/SideBar";
//import AddArticle2 from "../pages/AddArticle2";
import Message from '../pages/Message';
 
 
 
 
import EditArticle from "../pages/EditArticle";
import EditVideo from "../pages/EditVideo";
//import Article from "../components/Article";
//import AddNotificationForm from "../pages/AddArticle";
import AddArticle4 from "../pages/AddArticle3";
//import ShowNotifications from "../pages/tgrba";
//import EventItem from "../components/eventItem";
import Events from "../components/events";
import AddVideo4 from "../pages/AddVideo4";
import AllArticles from "../pages/AllArticles";
 
 
 

export const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/"             element={<  AddArticle4 />} />
        <Route path="/sidebar"      element={<SideBar  />} />
        <Route path="/message"      element={< Message />} />
        <Route path="/addVideo"          element={< AddVideo4/>} />
        <Route path="/addarticle "  element={<AddArticle4/>} />
        <Route path="/editarticle"  element={<EditArticle/>} />
        <Route path="/editvideo"    element={<EditVideo/>} />
        <Route path="/allart"    element={< AllArticles/>} />
        {/* <Route path="/ed"    element={< AddNotificationForm/>} /> */}
       
        <Route path="/ee"    element={<  Events/>} />

        
        {/* <Route path="/article"      element={< Article />} /> */}
       
      </Routes>
    </Router>
  );
};
