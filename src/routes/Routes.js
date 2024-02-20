import {createBrowserRouter } from "react-router-dom";
import React from "react";
import Collages from "../pages/Collages";
import SideBar from "../components/SideBar";
import LogIn from "../pages/LogIn";

export const router =createBrowserRouter ([
  {
    path: "/",
    element: <LogIn />,
    children:[
      {
        path: "/logInTop",
        element: <LogIn />,
      },
      {
        path: "/collages",
        element: <Collages />,
      },
      {
        path: "/sideBar",
        element: <SideBar />,
      },
      
    ]
  }

  

]

)