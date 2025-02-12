import { useState } from 'react';
import AuthHeader from '../components/auth/AuthHeader';
import AuthForm from '../components/auth/AuthForm';
import OTPVerification from '../components/auth/OTPVerification';
import axios from 'axios';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleAuth = () => {
    console.log('Google auth clicked');
  };

  const handleSubmit = async(e,formData) => {
    e.preventDefault();
    if (!isLogin) {
      setShowOTP(true);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      console.log('Login successful:', response.data);
      alert('Login Successful!'); // Replace with actual session handling logic
      setErrorMessage('');
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    console.log('OTP submitted:', otp.join(''));
  };

  const handleOTPChange = (index, value) => {
    if (value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  if (showOTP) {
    return (
      <OTPVerification 
        otp={otp}
        handleOTPChange={handleOTPChange}
        handleOTPSubmit={handleOTPSubmit}
      />
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <AuthHeader isLogin={isLogin} setIsLogin={setIsLogin} />
        <AuthForm 
          isLogin={isLogin}
          handleSubmit={handleSubmit}
          handleGoogleAuth={handleGoogleAuth}
          handleForgotPassword={handleForgotPassword}
        />
      </div>
    </div>
  );
};

export default Login;