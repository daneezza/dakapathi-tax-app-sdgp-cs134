import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Template from './components/template';
import NewsFeed from './components/NewsFeed';
import './styles/template.css';
import './styles/NewsFeed.css';


function App() {
  return (
    <Router>
      <Template>
        <Routes>
          <Route path="/" element={<NewsFeed />} />
        </Routes>
      </Template>
    </Router>
  );
}

export default App;
