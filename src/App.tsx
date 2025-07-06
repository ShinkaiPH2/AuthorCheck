import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Homepage } from './pages/Homepage';
import { AnalyzePage } from './pages/AnalyzePage';
import { LearnMore } from './pages/LearnMore';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
