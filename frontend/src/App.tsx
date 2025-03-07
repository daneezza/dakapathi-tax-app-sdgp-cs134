import FAQs from "./pages/FAQs";
import Template from './components/template';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Updated import

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Template>
            <div>
              <FAQs />
            </div>
        </Template>}/>  
      </Routes>
    </Router>
    
  );
};

export default App;

