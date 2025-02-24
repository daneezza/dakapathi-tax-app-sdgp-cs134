import React, { useState } from 'react';
import ResetPassword from './ResetPassword';
import axios from 'axios';
import Notification from '../components/auth/Notification.jsx';


const ForgotPassword = ({ onBack }) => {
const [email, setEmail] = useState('');
const [showResetForm, setShowResetForm] = useState(false);
const [notification, setNotification] = useState({ message: '', variant: 'info' });


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:3000/api/password/request-reset', { email });
        setNotification({ message: 'Password reset instructions have been sent to your email.', variant: 'success' });
        setTimeout(() => {
            setShowResetForm(true);
        }, 1500);
    } catch (error) {
        console.error('Error sending reset link:', error);
        setNotification({ message: 'Failed to send reset link. Please try again.', variant: 'error' });
    } 
};

if (showResetForm) {
    return <ResetPassword email={email} />;
}

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
        <div className="back-button" onClick={onBack}>
        <img 
            src="/previous.png" 
            alt="Back" 
            style={{
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            }}
        />
        </div>
        <div className="auth-header">
        <h2>Forgot Password</h2>
        <p>Please enter your registered email to reset your password.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
            <label>Email Address</label>
            <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            />
        </div>
        <button type="submit" className="auth-button">Send OTP</button>
        </form>
    </div>
    </div>
</>
);
};

export default ForgotPassword;
