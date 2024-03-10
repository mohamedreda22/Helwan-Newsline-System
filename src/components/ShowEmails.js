import axios from "axios";
import React, { useState } from "react";
import delete_icon from "../assets/icons/delete.svg";
import Simplert from "react-simplert";

const ShowEmails = () => {
  const [showSuccessAlert, setSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleDeleteEmail = () => {
    setShowErrorAlert(true); // Show error alert initially for demo purposes

    // Perform deletion logic here
    // axios.delete(...)
    // .then(() => {
    //    setSuccessAlert(true);
    // })
    // .catch(() => {
    //    setShowErrorAlert(true);
    // });
  };

  const renderDeleteIcon = () => {
    return (
      <div>
        <img
          src={delete_icon}
          alt="Delete email"
          className="delete-icon"
          onClick={handleDeleteEmail}
        />
      </div>
    );
  };

  return (
    <>
      <div className="mt-2">
        <div className="notifNum"> :عدد الإيميلات </div>
        <table className="table">
          <tbody>
            <tr>
              <td>{renderDeleteIcon()}</td>
              <td>التاريخ</td>

              <td dir="rtl">
                <div>
                  <strong>الإيميلات</strong>
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
        title="خطأ"
        message="حدث خطأ أثناء حذف الإيميل."
        onClose={() => setShowErrorAlert(false)}
        customCloseBtnText="إغلاق"
      />
      <Simplert
        showSimplert={showSuccessAlert}
        type="success"
        title="تم الحذف"
        message="تم حذف الإيميل بنجاح."
        onClose={() => setSuccessAlert(false)}
        customCloseBtnText="تم"
      />
    </>
  );
};

export default ShowEmails;
