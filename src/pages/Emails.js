import React from "react";
import SideBar from "../components/SideBar";
import "../styles/Notifications.css";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import ShowEmails from "../components/ShowEmails";

function Emails() {
    return (
        <div className="container-fluid bg-gray">
          <div className="row">
            <div className="col-lg-10">
              <h1 dir="rtl">الإشعارات</h1>
              <div dir="rtl" className="links ">
                <Link to="/notifications">
                  <Button variant="link">الإشعارات</Button>
                </Link>{" "}
                <Link to="/emails">
                  <Button variant="link">الإيميلات</Button>
                </Link>{" "}
              </div>
              <div className="container-2">
               <ShowEmails />
              </div>
            </div>
            <div className="col-lg-2">
              <SideBar />
            </div>
          </div>
        </div>
      );
}

export default Emails;
