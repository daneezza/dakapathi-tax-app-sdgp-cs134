import { useState } from 'react';
import AuthHeader from '../components/auth/AuthHeader';
import AuthForm from '../components/auth/AuthForm';
import OTPVerification from '../components/auth/OTPVerification';
import axios from 'axios';
import ForgotPassword from '../components/auth/ForgotPassword.jsx';
import Notification from '../components/auth/Notification.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [notification, setNotification] = useState({ message: '', variant: 'info' });

  const navigate = useNavigate();

  const handleGoogleAuth = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const response = await axios.post('http://localhost:3000/api/auth/google-signin', { token: credential });
      setNotification({ message: response.data.message, variant: 'success' });
      console.log('Google Sign-In successful:', response.data);

      
      
      setTimeout(() => {
        navigate('/dashboard'); 
      }, 1500);
    } catch (error) {
      console.error('Google Sign-In failed:',error.response?.data || error.message );
      setNotification({ message: 'Google Sign-In failed. Please try again.', variant: 'error' });
    }
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
      setNotification({ message: 'Login Succesful', variant: 'success' });
      setErrorMessage('');

      setTimeout(() => {
        navigate('/dashboard'); 
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message.includes('Google Sign-In')) {
      setNotification({
        message: 'This account was created using Google Sign-In. Please use Google to log in.',
        variant: 'info',
      });
      } else {
        console.error('Login failed:', error);
        setNotification({ message: 'Login Failed. Please check your credentials.', variant: 'error' });
      }
      
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    console.log('OTP submitted:', otp.join(''));
  };

  const handleOTPChange = (index, value) => {
    if (value.length === 6) {
      
      const otpArray = value.split('').slice(0, 6);
      setOTP(otpArray);
    }
    else if (value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);
      
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };
  const clearOTP = () => {
  setOTP(['', '', '', '', '', '']);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  let content;
  if (showOTP) {
    content = (
      <OTPVerification 
        otp={otp}
        handleOTPChange={handleOTPChange}
        handleOTPSubmit={handleOTPSubmit}
        setShowOTP={setShowOTP}
        setIsLogin={setIsLogin}
        clearOTP={clearOTP}
      />
    );
  } else if (showForgotPassword) {
    content = <ForgotPassword onBack={() => setShowForgotPassword(false)} setIsLogin={setIsLogin} />;
  } else {
    content = (
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
    {content}
  </>
  );
};

export default Login;