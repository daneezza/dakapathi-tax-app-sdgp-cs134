import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Template from './components/template'; 
import AboutUs from './Pages/AboutUs';
import Dashboard from './Pages/Dashboard';
import QnA from './Pages/qna';
import LearningHub from './Pages/LearningHub';
import UserGuides from './components/UserGuides';
import NewsFeed from './components/NewsFeed';
import NewsDetail from './components/NewsDetail';
import FAQs from "./Pages/FAQs";
import TaxCalculator from "./components/TaxCalculator";



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
        <Route path="/faq" element={<Template><FAQs /></Template>} />
        <Route path="/tax-cal" element={<Template><TaxCalculator /></Template>} />



      </Routes>
    </Router>
  );
}

export default App
