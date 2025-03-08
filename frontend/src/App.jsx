import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import OTPVerification from './components/auth/OTPVerification';
import './styles/login.css';
import './styles/Notification.css';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App
