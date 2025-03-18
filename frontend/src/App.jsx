import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Template from './components/template'; 
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import QnA from './pages/qna';
import LearningHub from './pages/LearningHub';
import UserGuides from './Pages/UserGuides';
import NewsFeed from './Pages/NewsFeed';
import NewsDetail from './components/NewsDetail';
import Game from './pages/game';
import FAQs from "./pages/FAQs";
import TaxCalculator from "./pages/TaxCalculator";
import Pricing from "./pages/Pricing";



import './styles/login.css';
import './styles/Notification.css';
import './styles/LearningHub.css'; 
import './styles/UserGuides.css';
import './styles/NewsFeed.css';
import './styles/NewsDetail.css';
import "./styles/TaxCalculator.css";


function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Template><Dashboard /></Template>} />
        <Route path="/about" element={<Template><AboutUs /></Template>} />
        <Route path="/qna" element={<Template><QnA /></Template>}/>
        <Route path="/learning-hub" element={<Template><LearningHub /></Template>} />
        <Route path="/user-guide" element={<Template><UserGuides /></Template>} />
        <Route path="/news-feed" element={<Template><NewsFeed /></Template>} />
        <Route path="/news/:id" element={<Template><NewsDetail /></Template>} />
        <Route path="/gamefied" element={<Template><Game /></Template>}/>
        <Route path="/faq" element={<Template><FAQs /></Template>} />
        <Route path="/tax-cal" element={<Template><TaxCalculator /></Template>} />
        <Route path="/pricing" element={<Template><Pricing /></Template>} />



      </Routes>
    </Router>
  );
}

export default App
