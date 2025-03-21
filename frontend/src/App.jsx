import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Template from './components/template.jsx'; 
import AboutUs from './Pages/AboutUs.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import QnA from './Pages/qna.jsx';
import LearningHub from './Pages/LearningHub.jsx';
import UserGuides from './Pages/UserGuides.jsx';
import NewsFeed from './Pages/NewsFeed.jsx';
import NewsDetail from './components/NewsDetail.jsx';
import Game from './Pages/game.jsx';
import FAQs from './Pages/FAQs.jsx';
import PricingComingSoon from './Pages/Pricing.jsx';
import Settings from './Pages/Settings.jsx';
import TaxCalculator from './Pages/TaxCalculator.jsx'

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
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Template><Dashboard/></Template>} />
        <Route path="/about" element={<Template><AboutUs/></Template>} />
        <Route path="/qna" element={<Template><QnA/></Template>}/>
        <Route path="/learning-hub" element={<Template><LearningHub/></Template>} />
        <Route path="/user-guide" element={<Template><UserGuides/></Template>} />
        <Route path="/news-feed" element={<Template><NewsFeed/></Template>} />
        <Route path="/news/:id" element={<Template><NewsDetail/></Template>} />
        <Route path="/gamefied" element={<Template><Game/></Template>}/>
        <Route path="/faq" element={<Template><FAQs/></Template>} />
        <Route path="/tax-cal" element={<Template>< TaxCalculator/></Template>} />
        <Route path="/pricing" element={<Template><PricingComingSoon/></Template>} />
        <Route path="/settings" element={<Template><Settings/></Template>} />
      </Routes>
    </Router>
  );
}

export default App;
