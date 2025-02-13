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

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    const otpError = getErrorMessage('otp', otpString);
    if (!otpError) {
      handleOTPSubmit(e);
      setErrors({});
    } else {
      setErrors({ otp: otpError });
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