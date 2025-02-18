import Template from './components/template';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Template>
        <Switch>
          <Route path="/about" component={AboutUs} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Template>
    </Router>
  );
}

export default App;
