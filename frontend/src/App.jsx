import Template from './components/template';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Template>
        <Switch>

          <Route path="/settings" component={Settings} />


        </Switch>
      </Template>
    </Router>
  );
}

export default App;
