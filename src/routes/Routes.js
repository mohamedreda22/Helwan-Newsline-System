import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Collages from "../pages/Collages";
import Notifications from "../pages/Notifications";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Notifications />,

    // path: "/",
    // element: <Collages />,
    // children: [
    //   {
    //     path: "/ryadyaBanat",
    //     element: <Collages />,
    //   },
    // ],
  },
]);
