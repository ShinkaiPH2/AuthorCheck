import { useState, useEffect } from 'react';
import { TextAnalysis } from '../types';
import { AnalysisDisplay } from '../components/analysis/AnalysisDisplay';
import { analyzeText } from '../utils/textAnalysis';
import { useDebounce } from '../hooks/useDebounce';
import { AnalysisSettings } from '../components/analysis/AnalysisSettings';
import { HelpModal } from '../components/analysis/HelpModal';
import { TextInputPanel } from '../components/analysis/TextInputPanel';
import { Navbar } from '../components/ui/Navbar';

export const AnalyzePage = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<TextAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [hasText, setHasText] = useState(false);
  const [autoAnalyze, setAutoAnalyze] = useState(false);
  const [debounceDelay, setDebounceDelay] = useState(1000);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Debounce the text input to avoid excessive API calls
  const debouncedText = useDebounce(text, autoAnalyze ? debounceDelay : 0);

  useEffect(() => {
    setIsTyping(text !== debouncedText);
  }, [text, debouncedText]);

  useEffect(() => {
    setHasText(text.trim().length > 0);
  }, [text]);

  useEffect(() => {
    if (autoAnalyze && debouncedText.trim() && debouncedText.trim().length > 10) {
      handleAnalyze(debouncedText);
    } else if (!debouncedText.trim()) {
      setAnalysis(null);
    }
  }, [debouncedText, autoAnalyze]);

  const handleAnalyze = async (textToAnalyze?: string) => {
    const content = textToAnalyze || text;
    if (!content.trim()) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeText(content);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setText('');
    setAnalysis(null);
    setIsTyping(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 relative overflow-hidden">
      <Navbar />
      {/* Help Modal */}
      <HelpModal open={showHelp} onClose={() => setShowHelp(false)} />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-gradient-to-tr from-futuristic-cyan/10 to-futuristic-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto p-2 sm:p-4">
        {/* Main Content - Responsive layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 lg:gap-8">
          {/* Left Panel - Input */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <TextInputPanel
              text={text}
              setText={setText}
              handleAnalyze={() => handleAnalyze()}
              handleClear={handleClear}
              handleFileUpload={handleFileUpload}
              isAnalyzing={isAnalyzing}
              isTyping={isTyping}
              hasText={hasText}
              analysis={analysis}
              onHelpClick={() => setShowHelp(true)}
            />
            <AnalysisSettings
              autoAnalyze={autoAnalyze}
              setAutoAnalyze={setAutoAnalyze}
              debounceDelay={debounceDelay}
              setDebounceDelay={setDebounceDelay}
              showSettings={showSettings}
              setShowSettings={setShowSettings}
            />
          </div>
          {/* Right Panel - Analysis Results */}
          <div className="lg:col-span-2 mt-4 lg:mt-0">
            <AnalysisDisplay
              analysis={analysis}
              isAnalyzing={isAnalyzing || isTyping}
              hasText={hasText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
