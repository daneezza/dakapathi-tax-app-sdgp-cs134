import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../components/auth/Notification.jsx';


const ResetPassword = ({ email }) => {
const [otp, setOtp] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [notification, setNotification] = useState({ message: '', variant: 'info' });

const handleSubmit = async (e) => {
e.preventDefault();

if (newPassword !== confirmPassword) {
    setNotification({ message: 'Passwords do not match.', variant: 'error' });
    return;
}

try {
    const response = await axios.post('http://localhost:3000/api/password/reset-password', {
    email,
    otp,
    newPassword,
    });

    setNotification({ message: response.data.message, variant: 'success' });
    setTimeout(() => {
        window.location.href = '/login'; // Redirect to login after successful reset
    }, 1500);
} catch (error) {
    console.error('Error resetting password:', error);
    setNotification({ message: 'Failed to reset password. Please try again.', variant: 'error' });
}
};

return (
    <>
    {notification.message && (
    <Notification 
        message={notification.message}
        variant={notification.variant}
        onClose={() => setNotification({ message: '', variant: 'info' })}
    />
    )}
    <div className="auth-container">
    <div className="auth-box">
        <div className="auth-header">
        <h2>Reset Password</h2>
        <p>Please enter the OTP sent to your email and your new password.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
            <label>OTP</label>
            <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
            />
        </div>
        <div className="form-group">
            <label>New Password</label>
            <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
            />
        </div>
        <div className="form-group">
            <label>Confirm New Password</label>
            <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
            />
        </div>
        <button type="submit" className="auth-button">Reset Password</button>
        </form>
    </div>
    </div>
</>
);
};

export default ResetPassword;
