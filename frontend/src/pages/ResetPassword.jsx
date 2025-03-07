import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../components/auth/Notification.jsx';
import { getErrorMessage } from '../utils/validations.jsx';


const ResetPassword = ({ email }) => {
const [otp, setOtp] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [notification, setNotification] = useState({ message: '', variant: 'info' });
const [errors, setErrors] = useState({});

const handleOtpChange = (e) => {
    const value = e.target.value;
    setOtp(value);
    setErrors((prev) => ({ ...prev, otp: getErrorMessage('otp', value) }));
};

const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setErrors((prev) => ({ ...prev, password: getErrorMessage('password', value, false) }));
};

const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setErrors((prev) => ({
        ...prev,
        confirmPassword: value !== newPassword ? 'Passwords do not match' : ''
    }));
};

const handleSubmit = async (e) => {
e.preventDefault();

if (errors.otp || errors.password || errors.confirmPassword) return;

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
            onChange={handleOtpChange}
            placeholder="Enter OTP"
            required
            />
            {errors.otp && <span className="error-message">{errors.otp}</span>}
        </div>
        <div className="form-group">
            <label>New Password</label>
            <input
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter new password"
            required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <div className="form-group">
            <label>Confirm New Password</label>
            <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm new password"
            required
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>
        <button type="submit" className="auth-button">Reset Password</button>
        </form>
    </div>
    </div>
</>
);
};

export default ResetPassword;
