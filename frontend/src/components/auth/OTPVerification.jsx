import PropTypes from 'prop-types';
import { getErrorMessage } from '../../utils/validations.jsx';
import { useState } from 'react';
import axios from 'axios';

const OTPVerification = ({ otp, handleOTPChange, handleOTPSubmit }) => {
  const [errors, setErrors] = useState({});

  OTPVerification.propTypes = {
    otp: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleOTPChange: PropTypes.func.isRequired,
    handleOTPSubmit: PropTypes.func.isRequired
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');

  try {
    // Verify OTP
    await axios.post('http://localhost:3000/api/otp/verify-otp', {
      email: JSON.parse(localStorage.getItem('signupData')).email,
      otp: otpCode
    });

    // If OTP is valid, complete the signup
    const signupData = JSON.parse(localStorage.getItem('signupData'));
    await axios.post('http://localhost:3000/api/auth/signup', signupData);

    alert('Signup successful!');
    localStorage.removeItem('signupData'); // Clear data
    window.location.href = '/login'; // Redirect to login
  } catch (error) {
    console.error('Error verifying OTP or signing up:', error);
    alert('OTP verification failed. Please try again.');
  }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h2>Email Verification</h2>
          <p>Enter the 6-digit code sent to your email</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className='otp-container'>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                style={{
                  width: '40px',
                  height: '40px',
                  textAlign: 'center',
                  fontSize: '20px',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0'
                }}
                maxLength={1}
              />
            ))}
          </div>
          {errors.otp && <span className="error-message">{errors.otp}</span>}
          <button type="submit" className="auth-button">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;