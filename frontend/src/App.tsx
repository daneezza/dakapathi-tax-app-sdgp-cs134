import React from "react";
import TaxCalculator from "./components/TaxCalculator";
import "./styles/TaxCalculator.css";
import Template from './components/template';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Template>
        <TaxCalculator />
      </Template>
    </Router>
  );
};

export default App;
