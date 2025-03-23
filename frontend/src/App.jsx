import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Template from './components/template.jsx'; 
import AboutUs from './pages/AboutUs.jsx';
import Dashboard from './pages/Dashboard.jsx';
import QnA from './pages/qna.jsx';
import LearningHub from './pages/LearningHub.jsx';
import UserGuides from './pages/UserGuides.jsx';
import NewsFeed from './pages/NewsFeed.jsx';
import NewsDetail from './components/NewsDetail.jsx';
import Game from './pages/game.jsx';
import FAQs from './pages/FAQs.jsx';
import PricingComingSoon from './pages/Pricing.jsx';
import Settings from './pages/Settings.jsx';
import TaxCalculator from './pages/TaxCalculator.jsx'
import TaxGuide from './pages/TaxGuide.jsx';
import Pricing from './pages/NotificationCenter.jsx';

import './styles/login.css';
import './styles/Notification.css';
import './styles/LearningHub.css'; 
import './styles/UserGuides.css';
import './styles/NewsFeed.css';
import './styles/NewsDetail.css';
import "./styles/TaxCalculator.css";
import "./styles/TaxGuide.css";


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
        <Route path="/notifications" element={<Template><Pricing/></Template>} />
        <Route path="/settings" element={<Template><Settings/></Template>} />
        <Route path="/tax-guide" element={<Template><TaxGuide/></Template>} />
      </Routes>
    </Router>
  );
}

export default App;
