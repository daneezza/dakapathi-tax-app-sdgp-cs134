import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Template from './components/template'; 
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';

import OTPVerification from './components/auth/OTPVerification';
import './styles/login.css';
import './styles/Notification.css';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Template><Dashboard /></Template>} />
        <Route path="/about" element={<Template><AboutUs /></Template>} />
      </Routes>
    </Router>
  );
}

export default App
