import PropTypes from 'prop-types';
import { getErrorMessage } from '../../utils/validations.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Notification from '../auth/Notification.jsx'; // Adjust path if needed
import { useNavigate } from 'react-router-dom';



const OTPVerification = ({ otp, handleOTPChange, handleOTPSubmit, setShowOTP, setIsLogin, clearOTP   }) => {
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ message: '', variant: 'info' });
  const navigate = useNavigate();


  useEffect(() => {
    
    setNotification({ message: 'Please check your email for the OTP code.', variant: 'info' });
  }, []);


  OTPVerification.propTypes = {
    otp: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleOTPChange: PropTypes.func.isRequired,
    handleOTPSubmit: PropTypes.func.isRequired
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');

  try {
    
    await axios.post('https://dakapathi-tax-app-sdgp-cs134.onrender.com/api/otp/verify-otp', {
      email: JSON.parse(localStorage.getItem('signupData')).email,
      otp: otpCode
    });
      setNotification({ message: 'OTP Valid! Signing up User.....', variant: 'success' });
      await new Promise(resolve => setTimeout(resolve, 2000));
  
    const storedData = JSON.parse(localStorage.getItem('signupData'));

    
    const finalSignupData = {
      fullname: storedData.name,              
      nic: storedData.nic,
      address: storedData.address,
      birthdate: storedData.birthDate,       
      email: storedData.email,
      password: storedData.password,         
      type: 'User'                           
    };
    try{
      await axios.post('https://dakapathi-tax-app-sdgp-cs134.onrender.com/api/auth/signup', finalSignupData);

      setNotification({ message: 'Signup successful!', variant: 'success' });
      localStorage.removeItem('signupData'); 
      setTimeout(() => {
          setShowOTP(false);
          setIsLogin(true); 
          navigate('/');
      }, 1500); 
      clearOTP();
    }
    catch(error){
      setNotification({ message: 'An account with this email already exists. Try logging in instead.', variant: 'error' });
      clearOTP();
      setTimeout(() => {
          setShowOTP(false);
          setIsLogin(true); 
          navigate('/'); 
      }, 2000); 
    }
    
  } catch (error) {
    clearOTP();
    console.error('Error verifying OTP or signing up:', error);
    setNotification({ message: 'OTP verification failed. Please try again.', variant: 'error' });
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
            <h2>Email Verification</h2>
            <p>Enter the 6-digit code sent to your email</p>
          </div>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="otp-container">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pasted = e.clipboardData.getData('text');
                    handleOTPChange(index, pasted);
                  }}
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
    </>
  );
};

export default OTPVerification;