import {createBrowserRouter } from "react-router-dom";
import React from "react";
import Collages from "../pages/Collages";
import SideBar from "../components/SideBar";
import AddEvent from "../components/addEvent";
import ShowEvents from "../components/showEvents";

export const router =createBrowserRouter ([
  {
    path: "/",
    element: <ShowEvents />,
    children:[
      {
        path: "/logInTop",
        element: <AddEvent />,
      },
      {
        path: "/collages",
        element: <Collages />,
      },
      {
        path: "/sideBar",
        element: <SideBar />,
      },
      {
        path: "/addEvent",
        element: <AddEvent />,
      }
      
    ]
  }

  

]

)