import React from "react";
import SideBar from "../components/SideBar";
import AllNotifications from "../components/ShowNotifications";
import SearchBar from "../layouts/SearchBar";
import "../styles/Notifications.css";
import Button from "react-bootstrap/Button";


function Notifications() {
  return (
    <div className="container-fluid bg-gray">
      <div className="row">
        <div className="col-lg-10">
          <SearchBar />
          <h1 dir="rtl">الإشعارات</h1>
          <div dir="rtl" className="links ">
            <Button variant="link">الإشعارات</Button>
            <Button variant="link">الإيميلات</Button>
          </div>
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
