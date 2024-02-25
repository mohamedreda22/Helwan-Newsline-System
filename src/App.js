import React, { useState, useEffect } from "react";

import "./App.css";
//import HomePage from "./components/homePage";
//import Loading from "./components/loading";
import Collages from "./pages/Collages";
import Notifications from "./pages/Notifications";
import Emails from "./pages/Emails";

function App() {
  return (
    <>
      {/*       <HomePage />
      <Loading /> */}
      {/* <Collages /> */}
      <Notifications />
      <Emails />
    </>
  );
}

export default App;
