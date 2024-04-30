import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import "../styles/notificationsWindow.css"

const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const day = dateTime.getDate();
  const month = dateTime.toLocaleString("default", { month: "long" });
  return { day, month };
};
const NotificationWindow = ({ notifications, onClick }) => (
  <div className="notification-window">
    <ul>
      {notifications.map(notification => (
        <li key={notification.notification_id} onClick={() => onClick(notification)}>
          <div className="notification-message">{notification.notification_message}</div>
          <div className="notification-date">
                      <span className="day1">
                        {formatDateTime (notification.notification_date).day}
                      </span>
                      <span className="event-card-month1">
                        {formatDateTime( notification.notification_date).month}
                      </span>
                      <span className="event-card-month1">
                        {formatDateTime( notification.notification_date).hour}
                      </span>
           </div>
        </li>
      ))}
    </ul>
  </div>
);

const ShowNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const sourceId = Cookies.get('source_id');

  useEffect(() => {
    console.log("Source ID:", sourceId);
    if (sourceId) {
      fetchNotifications();
      const intervalId = setInterval(fetchNotifications, 120000);

      return () => clearInterval(intervalId);
    }
  }, [sourceId]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/university/notifications/source/${sourceId}`);
      //console.log("Response:", response.data);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleNotificationClick = (notification) => {
    console.log("Notification:", notification);
    console.log("Post ID:", notification.postId);
    console.log("Notification Type:", notification.notification_type);
    switch (notification.notification_type) {
      case 'POST':
        navigateTo(`/posts/${notification.post_id}`);
        break;
      case 'ARTICLE':
        navigateTo(`/articles/${notification.article_id}`);
        break;
      case 'VIDEO':
        navigateTo(`videos/${notification.video_id}`);
        break;
      default:
        console.log('Unknown notification type');
    }
  };

  const navigateTo = (path) => {
    console.log(`Navigating to ${path}`);
    window.location.href = path;
  };

  
  return (
    <NotificationWindow notifications={notifications} onClick={handleNotificationClick} />
  );
};

export default ShowNotifications;
