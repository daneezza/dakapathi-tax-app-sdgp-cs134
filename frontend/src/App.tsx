import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Template from './components/template';
import './styles/template.css';
import UserGuides from './components/UserGuides';
import './styles/UserGuides.css';

function App() {
  return (
    <Router>
      <Template>
        <Routes>
          <Route path="/" element={<UserGuides />} />
        </Routes>
      </Template>
    </Router>
  );
}

export default App;
