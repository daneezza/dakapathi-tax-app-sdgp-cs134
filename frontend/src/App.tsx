import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Template from './components/template';
import NewsFeed from './components/NewsFeed';
import NewsDetail from './components/NewsDetail';
import './styles/template.css';
import './styles/NewsFeed.css';
import './styles/NewsDetail.css';


function App() {
  return (
    <Router>
      <Template>
        <Routes>
          <Route path="/" element={<NewsFeed />} />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </Template>
    </Router>
  );
}

export default App;
