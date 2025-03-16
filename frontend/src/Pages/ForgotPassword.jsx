import React, { useState } from 'react';
import ResetPassword from './ResetPassword';
import axios from 'axios';
import Notification from '../components/auth/Notification.jsx';
import { getErrorMessage } from '../utils/validations.jsx';



const ForgotPassword = ({ onBack, setIsLogin  }) => {
const [email, setEmail] = useState('');
const [showResetForm, setShowResetForm] = useState(false);
const [notification, setNotification] = useState({ message: '', variant: 'info' });
const [errors, setErrors] = useState({});

const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: getErrorMessage('email', value, true) }));
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:3000/api/password/request-reset', { email });
        setNotification({ message: 'Password reset instructions have been sent to your email.', variant: 'success' });
        setTimeout(() => {
            setShowResetForm(true);
        }, 1500);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            setNotification({ message: 'No account found with this email address. Please try again or sign up.', variant: 'error' });
        } else {
            setNotification({ message: 'Something went wrong. Please try again later.', variant: 'error' });
        }
    } 
};

const handleResetComplete = () => {
        setShowResetForm(false);
        setIsLogin(true); // Switch back to login
        onBack();
    };

if (showResetForm) {
    return <ResetPassword email={email} onResetComplete={handleResetComplete} />;
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
            onChange={handleChange}
            placeholder="Enter your email"
            required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}

        </div>
        <button type="submit" className="auth-button">Send OTP</button>
        </form>
    </div>
    </div>
</>
);
};

export default ForgotPassword;
