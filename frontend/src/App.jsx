import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Template from './components/template'; 
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import QnA from './pages/qna';
import LearningHub from './pages/LearningHub';
import UserGuides from './components/UserGuides';
import NewsFeed from './components/NewsFeed';
import NewsDetail from './components/NewsDetail';
import Game from './Pages/game';


import './styles/login.css';
import './styles/Notification.css';
import './styles/LearningHub.css'; 
import './styles/UserGuides.css';
import './styles/NewsFeed.css';
import './styles/NewsDetail.css';


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

      </Routes>
    </Router>
  );
}

export default App
