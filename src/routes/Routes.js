import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Collages from "../pages/Collages";
import Notifications from "../pages/Notifications";
import Emails from "../pages/Emails"; // Import your Emails component

export const router = createBrowserRouter([
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/emails", // Add a new path for emails
    element: <Emails />, // Specify the component for the emails page
  },
]);
