import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Collages from "../pages/Collages";
import SideBar from "../components/SideBar";
import AddEvent from "../components/addEvent";
import Events from "../components/events";
import LogIn from "../pages/LogIn";
import Faq from "../components/faq";

export const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/logInTop" element={<LogIn />} />
        <Route path="/collages" element={<Collages />} />
        <Route path="/sideBar" element={<SideBar />} />
        <Route path="/addEvent" element={<AddEvent />} />
        <Route path="/showEvents" element={<Events />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </Router>
  );
};
