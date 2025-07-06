import React from 'react';
import { HelpCircleIcon } from '../ui/Icons';

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 focus:outline-none"
          aria-label="Close help dialog"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100 flex items-center space-x-2">
          <HelpCircleIcon size={22} className="text-primary-500" />
          <span>Need Help?</span>
        </h2>
        <div className="text-gray-700 dark:text-gray-300 space-y-3 text-sm">
          <p>Welcome to <b>AuthorCheck</b>! Here's how to get started:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Paste or type your text in the left panel.</li>
            <li>Enable or disable <b>Automatic Analysis</b> in settings below the input.</li>
            <li>Click <b>Analyze Text</b> for manual analysis, or let it run automatically.</li>
            <li>View results and insights in the right panel, including <b>AI Insights</b> and <b>Emotion Analysis</b>.</li>
          </ul>
          <p><b>AI Insights</b> provide strengths, improvement suggestions, and writing tips based on your text. <b>Emotion Analysis</b> shows detected emotions and their intensity.</p>
          <p>For more details, see the <a href="https://author-check-one.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">documentation</a>.</p>
        </div>
      </div>
    </div>
  );
}; 