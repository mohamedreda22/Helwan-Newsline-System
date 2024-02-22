import axios from "axios";
import React, { useState } from "react";
import delete_icon from "../assets/icons/delete.svg";
import "../styles/ShowNotifications.css";
import { FaPlus } from "react-icons/fa";
import AddNotificationForm from '../components/AddNotificationForm';

const ShowNotifications = () => {


  const handleDeleteNotification = async (notification_id) => {
    try {
      await axios.delete(
        `http://localhost:9090/university/events/${notification_id}`
      );
      // After deletion, fetch notifications again to update the list
      // fetchNotification_id();
    } catch (error) {
      // console.error('Error deleting notification:', error);
      // setError('An error occurred while deleting the notification.');
    }
  };

  const renderDeleteIcon = (notification_id) => {
    return (
      <img
        src={delete_icon}
        alt="Delete notification"
        className="delete-icon"
        onClick={() => handleDeleteNotification(notification_id)}
      />
    );
  };

  return (
    <>
      <div className="mt-2">
        <div className="notifNum"> :عدد الاشعارات </div>
        <button type="button" className="AddNotifbtn"  >
          إشعار جديد <FaPlus />
        </button>
        <table className="table">
          <tbody>
            <tr>
              <td>
                {/* <button className="ms-6">Delete</button> */}
                {renderDeleteIcon()}
              </td>
              <td>التاريخ</td>

              <td dir="rtl">
                <div>
                  <strong>الاشعارات</strong>
                </div>
                <div>التفاصيل التفاصيل التفاصيل التفاصيل </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShowNotifications;
