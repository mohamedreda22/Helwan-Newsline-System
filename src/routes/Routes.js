// import { createBrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import SideBar from "../components/SideBar";
import AddArticle2 from "../pages/AddArticle2";
import Message from '../pages/Message';
 import EditArticle from '../pages/EditArticle'
//import AddVideo2 from "../pages/AddVideo2";
import AddVideo3 from "../pages/AddVideo3";
import Edit from "../pages/Edit";
 
//import AddVideo2 from "../pages/AddVideo2"
 

export const RouterComponent = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={< SideBar/>} />
        {/* <Route path="/" element={< SideBar >} /> */}
        {/* <Route path="/sidebar" element={<SideBar  />} /> */}
        <Route path="/message" element={< Message />} />
        <Route path="/editarticle" element={<EditArticle/>} />
        <Route path="/addarticle " element={<AddArticle2/>} />
        <Route path="/edit" element={<Edit/>} />

        {/* <Route path="/add" element={< AddVideo2  />} /> */}
       
      </Routes>
    </Router>
  );
};
