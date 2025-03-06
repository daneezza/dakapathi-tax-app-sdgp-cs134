import Template from './components/template';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import TaxCalculator from './pages/TaxCalculator';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Template>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/about" component={AboutUs} />
          <Route path="/taxcalculator" component={TaxCalculator} />
          <Route path="/settings" component={Settings} />
          <Route path="/" component={Dashboard} />

        </Switch>
      </Template>
    </Router>
  );
}

export default App;
