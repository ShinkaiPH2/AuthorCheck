import React from 'react';
import { SettingsIcon } from '../ui/Icons';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface AnalysisSettingsProps {
  autoAnalyze: boolean;
  setAutoAnalyze: (v: boolean) => void;
  debounceDelay: number;
  setDebounceDelay: (v: number) => void;
  showSettings: boolean;
  setShowSettings: (v: boolean) => void;
}

export const AnalysisSettings: React.FC<AnalysisSettingsProps> = ({
  autoAnalyze,
  setAutoAnalyze,
  debounceDelay,
  setDebounceDelay,
  showSettings,
  setShowSettings,
}) => (
  <Card>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-futuristic-purple to-futuristic-pink rounded-lg flex items-center justify-center">
            <SettingsIcon size={14} className="text-white" />
          </div>
          <span>Analysis Settings</span>
        </h3>
        <Button
          variant="outline"
          onClick={() => setShowSettings(!showSettings)}
          className="text-sm"
        >
          {showSettings ? 'Hide' : 'Show'} Settings
        </Button>
      </div>
      {showSettings && (
        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700/70">
          {/* Auto-Analyze Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Automatic Analysis
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Automatically analyze text after you stop typing
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none w-11 h-6">
              <input
                type="checkbox"
                checked={autoAnalyze}
                onChange={e => setAutoAnalyze(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 transition-colors duration-200 bg-gray-200 dark:bg-gray-700 peer-checked:bg-green-500 dark:peer-checked:bg-green-400 rounded-full border-2 border-gray-300 dark:border-gray-600 peer-focus:ring-2 peer-focus:ring-primary-400 flex items-center" />
              <span className="absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 rounded-full shadow-md transition-transform duration-200 peer-checked:translate-x-5 peer-checked:border-green-500 dark:peer-checked:border-green-400 peer-focus:ring-2 peer-focus:ring-primary-400"></span>
            </label>
          </div>
          {/* Debounce Delay Slider */}
          {autoAnalyze && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Analysis Delay
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {debounceDelay}ms
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={debounceDelay}
                onChange={e => setDebounceDelay(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Fast (500ms)</span>
                <span>Slow (3000ms)</span>
              </div>
            </div>
          )}
          {/* Status Indicator */}
          <div className="flex items-center space-x-2 text-sm mt-2">
            <div className={`w-2 h-2 rounded-full ${autoAnalyze ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="text-gray-700 dark:text-gray-300">
              {autoAnalyze
                ? `Auto-analysis enabled (${debounceDelay}ms delay)`
                : 'Manual analysis only - click "Analyze Text" to analyze'}
            </span>
          </div>
        </div>
      )}
    </div>
  </Card>
); 