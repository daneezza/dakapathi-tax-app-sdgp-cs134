import React from "react";
import TaxCalculator from "./components/TaxCalculator";
import "./styles/App.css";
import Template from './components/template';
import { BrowserRouter as Router} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Template>
        <div className="cal-container">
        <div className="heading-and-calculator">
          <h1 className="cal-topic">Calculate Your Taxes with Ease*😌</h1>
          <TaxCalculator />
        </div>
      </div>
      </Template>
    </Router>
    
  );
};

export default App;
