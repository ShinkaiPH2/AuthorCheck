import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { UploadIcon, BrainIcon } from '../ui/Icons';

interface TextInputPanelProps {
  text: string;
  setText: (v: string) => void;
  handleAnalyze: () => void;
  handleClear: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAnalyzing: boolean;
  isTyping: boolean;
  hasText: boolean;
  analysis: any;
  onHelpClick: () => void;
}

export const TextInputPanel: React.FC<TextInputPanelProps> = ({
  text,
  setText,
  handleAnalyze,
  handleClear,
  handleFileUpload,
  isAnalyzing,
  isTyping,
  hasText,
  analysis,
  onHelpClick,
}) => (
  <Card>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-futuristic-cyan to-futuristic-blue rounded-lg flex items-center justify-center">
            <BrainIcon size={16} className="text-white" />
          </div>
          <span>Text Input</span>
          <button
            type="button"
            onClick={onHelpClick}
            aria-label="Help"
            className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors duration-200 relative group"
            title="Get help with text analysis features"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary-500">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              Get help with text analysis features
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
            </div>
          </button>
        </h2>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept=".txt,.md,.csv,.json,.xml,.log,.html,.rtf,.doc,.docx,.pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center space-x-2 px-3 py-2 rounded-lg border-2 border-primary-200 dark:border-primary-700/50 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <UploadIcon size={16} />
            <span>Upload file</span>
          </label>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Enter or paste your text here
          </label>
          <div className="rounded-2xl overflow-hidden border-2 border-primary-300 dark:border-gray-700/70 bg-white/90 dark:bg-gray-900/80 shadow-2xl dark:shadow-lg transition-all duration-300">
            <textarea
              id="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here for analysis..."
              className="w-full min-h-[350px] max-h-[700px] p-4 resize-y text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors transition-shadow duration-300 overflow-y-auto box-border bg-transparent border-none outline-none rounded-xl"
              aria-describedby="text-input-help"
            />
          </div>
          <div id="text-input-help" className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-4">
            <span>{text.length} characters</span>
            <span>•</span>
            <span>{text.trim().split(/\s+/).filter(w => w.length > 0).length} words</span>
            {isTyping && (
              <>
                <span>•</span>
                <span className="text-primary-600 dark:text-primary-400 flex items-center space-x-1">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                  <span>Typing...</span>
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="primary"
            onClick={handleAnalyze}
            disabled={!hasText || isAnalyzing}
            className="flex-1 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-2">
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <BrainIcon size={16} className="animate-pulse" />
                  <span>Analyze Text</span>
                </>
              )}
            </span>
            {!isAnalyzing && (
              <div className="absolute inset-0 bg-gradient-to-r from-futuristic-cyan to-futuristic-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={!hasText && !analysis}
            className="group"
          >
            <span className="group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
              Clear
            </span>
          </Button>
        </div>
      </div>
    </div>
  </Card>
); 