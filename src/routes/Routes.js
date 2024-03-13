// import { createBrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import React from "react";

import SideBar from "../components/SideBar";
 
import Message from '../pages/Message'; 

import AddArticle4 from "../pages/AddArticle3";
 
import AddVideo4 from "../pages/AddVideo4";
 
import EditArticle2 from "../pages/EditArticle2";
import EditVideo2 from "../pages/EditVideo2";
 
import AllVideos from "../pages/AllVideos";
 
import AllArticles from "../pages/AllArticles";
import AddSource from "../pages/AddSource";
import EditSource from "../pages/EditSource";
import NavbarSource from "../layouts/NavbarSource";
import Navbar from "../layouts/Navbar";
import AllSources from "../pages/AllSources";
 
 
 
 

export const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/"             element={<  AllSources />} />
        <Route path="/sidebar"      element={<SideBar  />} />
        <Route path="/message"      element={< Message />} />
        <Route path="/addVideo"          element={< AddVideo4/>} />
        <Route path="/addarticle "  element={<AddArticle4/>} />
        <Route path="/editarticle2"  element={<EditArticle2/>} />
        <Route path="/editvideo2"    element={<EditVideo2/>} />
        <Route path="/articles"    element={<AllArticles/>} />
        <Route path="/source"    element={< AddSource/>} />
        <Route path="/allvids"    element={< AllVideos/>} />
        <Route path="/editsource"    element={<  EditSource/>} />
        {/* <Route path="/allsources  "  element={< AllSources/>} /> */}

        {/* <Route path="/ed"    element={< Outlet/>} /> */}
       {/* ع لو عايزه صفحتين بينهم مسافات */}
        {/* <Route path="/ee"    element={<  Events/>} /> */}

        
         
       
      </Routes>
    </Router>
  );
};
