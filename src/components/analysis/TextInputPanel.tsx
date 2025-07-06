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
}) => (
  <Card>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-futuristic-cyan to-futuristic-blue rounded-lg flex items-center justify-center">
            <BrainIcon size={16} className="text-white" />
          </div>
          <span>Text Input</span>
        </h2>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept=".txt,.doc,.docx,.pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center space-x-1 transition-colors duration-200"
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
              className="w-full min-h-[200px] max-h-[700px] p-4 resize-y text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors transition-shadow duration-300 overflow-y-auto box-border bg-transparent border-none outline-none rounded-xl"
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