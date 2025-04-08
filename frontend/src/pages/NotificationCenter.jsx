import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NotificationItem from '../components/NotificationCenter/NotificationItem';
import '../../styles/NotificationCenter.css';

const API_URL = 'http://localhost:3000/api/notifications';

export const getNotifications = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};

// Function to create a notification
export const createNotification = async (message) => {
    const response = await axios.post(API_URL, { message });
    return response.data;
};

const NotificationCenter = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const data = await getNotifications();
                setNotifications(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setError('Failed to fetch notifications. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    // Function to add a new notification
    const handleAddNotification = async () => {
        const message = prompt('Enter notification message:'); // Get message from user
        if (message) {
            try {
                const newNotification = await createNotification(message);
                setNotifications([newNotification, ...notifications]); // Add new notification to the list
            } catch (error) {
                console.error('Error creating notification:', error);
                setError('Failed to create notification. Please try again.');
            }
        }
    };

    if (loading) {
        return <div className="notification-center">Loading notifications...</div>;
    }

    if (error) {
        return <div className="notification-center error">{error}</div>;
    }

    return (
        <div className="notification-page">
            <div className="notification-center">
                <h2>Notifications</h2>
                <button onClick={handleAddNotification} style={{ marginBottom: '16px' }}>
                    Add Notification 
                </button>
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <NotificationItem key={notification._id} notification={notification} />
                    ))
                ) : (
                    <p className="no-notifications">No notifications found.</p>
                )}
            </div>
        </div>
    );
};

export default NotificationCenter;