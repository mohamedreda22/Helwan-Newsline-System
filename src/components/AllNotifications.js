import axios from "axios";
import React, { useState, useEffect } from "react";

function AllNotifications() {
  //   const [notifications, setNotifications] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:9090/university")
  //       .then((res) => setNotifications(res.data))
  //       .catch((err) => console.log(err));
  //   }, []);

  return (
    <div className="layout mt-5 ">
      <table className="table">
        <tbody>
          <tr>
            <td>
              <button className="ms-6">Delete</button>
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
  );
}

export default AllNotifications;
