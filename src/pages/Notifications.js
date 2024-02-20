import React from "react";
import SideBar from "../components/SideBar";
import AllNotifications from "../components/AllNotifications";
import SearchBar from "../layouts/SearchBar";
import "../styles/Notifications.css";

function Notifications() {
  return (
    <div className="container-fluid bg-gray">
      <div className="row">
        <div className="col-lg-10">
          <SearchBar />
          <h1 dir="rtl">الإشعارات</h1>
          <div className="container-2">
            <AllNotifications />
          </div>
        </div>
        <div className="col-lg-2">
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default Notifications;
