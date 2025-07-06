import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Homepage } from './pages/Homepage';
import { AnalyzePage } from './pages/AnalyzePage';
import { LearnMore } from './pages/LearnMore';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
