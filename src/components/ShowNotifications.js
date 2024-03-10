import axios from "axios";
import React, { useState } from "react";
import delete_icon from "../assets/icons/delete.svg";
import "../styles/ShowNotifications.css";
import { FaPlus } from "react-icons/fa";
import AddNotificationForm from "./AddNotificationForm";
import Simplert from "react-simplert";

const ShowNotifications = () => {
  const [showSuccessAlert, setSuccessAlert] = useState(false);
  const [showErrorAlert, setErrorAlert] = useState(false);

  const handleDeleteNotification = (notification) => {
    setErrorAlert(true); // Show error alert initially for demo purposes

    // Perform deletion logic here
    // axios.delete(...)
    // .then(() => {
    //    setSuccessAlert(true);
    // })
    // .catch(() => {
    //    setErrorAlert(true);
    // });
  };

  const renderDeleteIcon = () => {
    return (
      <div>
        <img
          src={delete_icon}
          alt="Delete notification"
          className="delete-icon"
          onClick={handleDeleteNotification}
        />
      </div>
    );
  };

  return (
    <>
      <div className="mt-2">
        <div className="notifNum"> :عدد الاشعارات </div>
        <table className="table">
          <tbody>
            <tr>
              <td>{renderDeleteIcon()}</td>
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
      <Simplert
        showSimplert={showErrorAlert}
        type="error"
        title="Failed"
        message="حدث خطأ ما يرجي اعادة المحاولة"
        onClose={() => setErrorAlert(false)}
        customCloseBtnText="اغلاق"
      />
      <Simplert
        showSimplert={showSuccessAlert}
        type="success"
        title="Success"
        message="تم الحذف بنجاح"
        onClose={() => setSuccessAlert(false)}
        customCloseBtnText="تم"
      />
    </>
  );
};

export default ShowNotifications;
