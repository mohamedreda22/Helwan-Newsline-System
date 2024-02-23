import { createBrowserRouter } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import SideBar from "../components/SideBar";
import AddArticle2 from "../pages/AddArticle2";
import Message from '../pages/Message';
 import EditArticle from '../pages/EditArticle'
 

export const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< AddArticle2 />} />
        <Route path="/sidebar" element={<SideBar  />} />
        <Route path="/message" element={< Message />} />
        <Route path="/editarticle" element={<EditArticle/>} />
       
      </Routes>
    </Router>
  );
};
