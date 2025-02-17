import { useState } from 'react';
import icon1 from '../../assets/icons/google.png';
import { getErrorMessage } from '../../utils/validations.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';


const LoginForm = ({ handleSubmit, handleGoogleAuth, handleForgotPassword }) => {
  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleGoogleAuth: PropTypes.func.isRequired,
    handleForgotPassword: PropTypes.func.isRequired
  };

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    setErrors(prev => ({
      ...prev,
      [name]: getErrorMessage(name, value, true)
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        newErrors[key] = getErrorMessage(key, formData[key], true);
      }
    });

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      handleSubmit(e, formData);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>

      <button type="submit" className="auth-button">
        Login
      </button>

      <button 
        type="button" 
        style={{ textAlign: 'right', marginTop: '10px', marginBottom: '5px' }} 
        className="forgot-password-button" 
        onClick={handleForgotPassword}
      >
        Forgot Password?
      </button>

      <div className="divider">
        <span>OR</span>
      </div>

      <GoogleOAuthProvider clientId="679581367699-66o5c2qal7hebctt339eiatt1gqhmk26.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={(credentialResponse) => handleGoogleAuth(credentialResponse)}
          onFailure={(error) => console.error('Google login failed:', error)}
        />
      </GoogleOAuthProvider>

    </form>
  );
};

const SignupForm = ({ handleSubmit, handleGoogleAuth }) => {
  SignupForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleGoogleAuth: PropTypes.func.isRequired
  };

  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    address: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    setErrors(prev => ({
      ...prev,
      [name]: getErrorMessage(name, value)
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        newErrors[key] = getErrorMessage(key, formData[key], false);
      }
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      handleSubmit(e, formData);
    }
    if (Object.values(newErrors).every(error => !error)) {
      try {
        // Save form data to local storage for later signup
        localStorage.setItem('signupData', JSON.stringify(formData));
  
        // Send OTP request
        await axios.post('http://localhost:3000/api/otp/send-otp', { email: formData.email });
  
        alert('OTP sent to your email!');
      } catch (error) {
        console.error('Error sending OTP:', error);
        alert('Failed to send OTP. Please try again.');
      }
    }
  };

  return (
    <form className="auth-form" onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label>Full Name (on N.I.C.)</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>NIC Number</label>
        <input
          type="text"
          name="nic"
          value={formData.nic}
          onChange={handleChange}
          placeholder="Enter your NIC number"
          required
        />
        {errors.nic && <span className="error-message">{errors.nic}</span>}
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
          required
        />
        {errors.address && <span className="error-message">{errors.address}</span>}
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
        {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
      </div>

      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
        />
        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
      </div>

      <button type="submit" className="auth-button">
        Sign Up
      </button>

      <div className="divider">
        <span>OR</span>
      </div>

      <button type="button" className="google-auth-button" onClick={handleGoogleAuth}>
        <img 
          src={icon1} 
          alt="Google Icon" 
          style={{width: '20px', height: '20px', marginRight: '8px'}}
        />
        Continue with Google
      </button>
    </form>
  );
};

const AuthForm = ({ isLogin, handleSubmit, handleGoogleAuth, handleForgotPassword }) => {
  AuthForm.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleGoogleAuth: PropTypes.func.isRequired,
    handleForgotPassword: PropTypes.func.isRequired
  };

  return isLogin ? (
    <LoginForm 
      handleSubmit={handleSubmit}
      handleGoogleAuth={handleGoogleAuth}
      handleForgotPassword={handleForgotPassword}
    />
  ) : (
    <SignupForm
      handleSubmit={handleSubmit}
      handleGoogleAuth={handleGoogleAuth}
    />
  );
};

export default AuthForm;