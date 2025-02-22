import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserGuides from './components/UserGuides';
import './styles/UserGuides.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserGuides />} />
      </Routes>
    </Router>
  );
}

export default App;
