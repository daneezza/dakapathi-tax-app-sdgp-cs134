import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Template from './components/template'; 
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import QnA from './pages/qna';
import LearningHub from './pages/LearningHub';

import OTPVerification from './components/auth/OTPVerification';
import './styles/login.css';
import './styles/Notification.css';
import './styles/LearningHub.css'; 


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Template><Dashboard /></Template>} />
        <Route path="/about" element={<Template><AboutUs /></Template>} />
        <Route path="/qna" element={<Template><QnA /></Template>}/>
        <Route path="/learning-hub" element={<Template><LearningHub /></Template>} />
      </Routes>
    </Router>
  );
}

export default App
