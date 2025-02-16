import React, { useState } from 'react';
import ResetPassword from './ResetPassword';
import axios from 'axios';

const ForgotPassword = ({ onBack }) => {
const [email, setEmail] = useState('');
const [showResetForm, setShowResetForm] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:3000/api/password/request-reset', { email });
        alert('Password reset instructions have been sent to your email.');
        setShowResetForm(true);
    } catch (error) {
        console.error('Error sending reset link:', error);
        alert('Failed to send reset link. Please try again.');
    } 
};

if (showResetForm) {
    return <ResetPassword email={email} />;
}

return (
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
);
};

export default ForgotPassword;
