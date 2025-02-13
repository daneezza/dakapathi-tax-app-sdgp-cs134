import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AskQuestion from './components/askQ';
import Questions from './components/question';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Questions />} />
                <Route path="/ask" element={<AskQuestion />} />
            </Routes>
        </Router>
    );
}

export default App;
