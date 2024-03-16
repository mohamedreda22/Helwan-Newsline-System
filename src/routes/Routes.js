import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import SideBar from "../components/SideBar";
import Message from '../pages/Message'; 
import AddArticle from "../pages/AddArticle";
import EditArticle from "../pages/EditArticle";
import AllArticles from "../pages/AllArticles";
import AddSource from "../pages/AddSource";
import EditSource from "../pages/EditSource";
import AllSources from "../pages/AllSources";
 
export const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"             element={<AddArticle />} />
        <Route path="/sidebar"      element={<SideBar  />} />
        <Route path="/message"      element={<Message />} />
        <Route path="/addarticle"  element={<AddArticle/>} />
        <Route path="/editarticle"  element={<EditArticle/>} />
        <Route path="/articles"    element={<AllArticles/>} />
        <Route path="/source"    element={< AddSource/>} />
        <Route path="/editsource"    element={<  EditSource/>} />
        <Route path="/allsources"  element={< AllSources/>} /> 
      </Routes>
    </Router>
  );
};
