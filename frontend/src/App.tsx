import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Game from './pages/game';

const App: React.FC = () => {
  return (
    <Router>
      <Game />
    </Router>
  );
};

export default App;