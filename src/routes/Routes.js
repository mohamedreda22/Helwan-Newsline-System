// import { createBrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import React from "react";

import SideBar from "../components/SideBar";
//import AddArticle2 from "../pages/AddArticle2";
import Message from '../pages/Message'; 
// import EditArticle from "../pages/EditArticle";
import EditVideo from "../pages/EditVideo";
//import Article from "../components/Article";
//import AddNotificationForm from "../pages/AddArticle";
import AddArticle4 from "../pages/AddArticle3";
//import ShowNotifications from "../pages/tgrba";
//import EventItem from "../components/eventItem";
//import Events from "../components/events";
import AddVideo4 from "../pages/AddVideo4";
import AllArticles from "../pages/AllArticles";
import EditArticle2 from "../pages/EditArticle2";
import EditVideo2 from "../pages/EditVideo2";
 
 
 

export const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/"             element={<  AddArticle4 />} />
        <Route path="/sidebar"      element={<SideBar  />} />
        <Route path="/message"      element={< Message />} />
        <Route path="/addVideo"          element={< AddVideo4/>} />
        <Route path="/addarticle "  element={<AddArticle4/>} />
        
        <Route path="/editarticle2"  element={<EditArticle2/>} />
        <Route path="/editvideo2"    element={<EditVideo2/>} />
        <Route path="/allart"    element={< AllArticles/>} />
        {/* <Route path="/ed"    element={< Outlet/>} /> */}
       {/* ع لو عايزه صفحتين بينهم مسافات */}
        {/* <Route path="/ee"    element={<  Events/>} /> */}

        
        {/* <Route path="/article"      element={< Article />} /> */}
       
      </Routes>
    </Router>
  );
};
