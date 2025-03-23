import React from 'react';
import '../../styles/NotificationCenter.css';

const NotificationItem = ({ notification }) => {
    return (
        <div className={`notification-item ${!notification.read ? 'unread' : ''}`}>
            <div className="icon">!</div> {/* Optional: Add an icon */}
            <div>
                <p>{notification.message}</p>
                <small>{new Date(notification.createdAt).toLocaleString()}</small>
            </div>
        </div>
    );
};

export default NotificationItem;