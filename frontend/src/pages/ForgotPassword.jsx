import React, { useState } from 'react';

const ForgotPassword = () => {
const [email, setEmail] = useState('');

const handleSubmit = (e) => {
e.preventDefault();
alert('Password reset instructions have been sent to your email.');
};

return (
    <div className="auth-container">
    <div className="auth-box">
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
            <button type="submit" className="auth-button">Submit</button>
        </form>
    </div>
    </div>
);
};

export default ForgotPassword;
