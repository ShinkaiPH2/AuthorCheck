// import { useState } from 'react';
// import { Card } from './ui/Card';
// import { Button } from './ui/Button';
// import { aiService } from '../services/aiService';
// import { getAIConfig } from '../config/ai';
// import { SettingsIcon, TestTubeIcon, CheckCircleIcon, XCircleIcon } from './ui/Icons';

// interface AIConfigPanelProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const AIConfigPanel = ({ isOpen, onClose }: AIConfigPanelProps) => {
//   const [config, setConfig] = useState(getAIConfig());
//   const [isTesting, setIsTesting] = useState(false);
//   const [testResult, setTestResult] = useState<{
//     success: boolean;
//     message: string;
//   } | null>(null);

//   const handleConfigChange = (key: string, value: string | boolean | number) => {
//     setConfig(prev => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const handleSave = () => {
//     aiService.updateConfig(config);
//     // In a real app, you might want to save to localStorage or backend
//     console.log('AI config updated:', config);
//   };

//   const handleTest = async () => {
//     setIsTesting(true);
//     setTestResult(null);
    
//     try {
//       // Validate API key for Gemini
//       if (config.apiType === 'gemini' && !config.apiKey?.trim()) {
//         setTestResult({
//           success: false,
//           message: 'Please enter your Gemini API key first.',
//         });
//         return;
//       }

//       const success = await aiService.testConnection();
//       setTestResult({
//         success,
//         message: success 
//           ? 'AI connection successful! Your AI is ready to use.' 
//           : 'AI connection failed. Please check your endpoint and API key.',
//       });
//     } catch (error) {
//       setTestResult({
//         success: false,
//         message: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
//       });
//     } finally {
//       setIsTesting(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="space-y-6">
//           {/* Header */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-futuristic-cyan to-futuristic-blue rounded-xl flex items-center justify-center">
//                 <SettingsIcon size={20} className="text-white" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
//                   AI Configuration
//                 </h2>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   Configure your custom AI/LLM settings
//                 </p>
//               </div>
//             </div>
//             <Button
//               variant="outline"
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//             >
//               ✕
//             </Button>
//           </div>

//           {/* Configuration Form */}
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 API Type
//               </label>
//               <select
//                 value={config.apiType || 'custom'}
//                 onChange={(e) => {
//                   const apiType = e.target.value as 'gemini' | 'openai' | 'custom';
//                   handleConfigChange('apiType', apiType);
                  
//                   // Auto-set endpoint for Gemini
//                   if (apiType === 'gemini') {
//                     handleConfigChange('endpoint', 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent');
//                     handleConfigChange('model', 'gemini-2.5-flash');
//                   }
//                 }}
//                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//               >
//                 <option value="gemini">Gemini API</option>
//                 <option value="openai">OpenAI API</option>
//                 <option value="custom">Custom API</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 AI Endpoint URL
//               </label>
//               <input
//                 type="url"
//                 value={config.endpoint}
//                 onChange={(e) => handleConfigChange('endpoint', e.target.value)}
//                 placeholder={
//                   config.apiType === 'gemini' 
//                     ? 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
//                     : 'https://your-ai-endpoint.com/analyze'
//                 }
//                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//               />
//               {config.apiType === 'gemini' && (
//                 <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//                   This URL is automatically set for Gemini API
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 API Key (if required)
//               </label>
//               <input
//                 type="password"
//                 value={config.apiKey}
//                 onChange={(e) => handleConfigChange('apiKey', e.target.value)}
//                 placeholder="Enter your API key"
//                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//               />
//               {config.apiType === 'gemini' && (
//                 <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//                   Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">Google AI Studio</a>
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Model Name
//               </label>
//               <input
//                 type="text"
//                 value={config.model}
//                 onChange={(e) => handleConfigChange('model', e.target.value)}
//                 placeholder="your-model-name"
//                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Timeout (milliseconds)
//               </label>
//               <input
//                 type="number"
//                 value={config.timeout}
//                 onChange={(e) => handleConfigChange('timeout', parseInt(e.target.value) || 30000)}
//                 placeholder="30000"
//                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//               />
//             </div>

//             <div className="flex items-center space-x-4">
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={config.enabled}
//                   onChange={(e) => handleConfigChange('enabled', e.target.checked)}
//                   className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//                 />
//                 <span className="text-sm text-gray-700 dark:text-gray-300">Enable AI Analysis</span>
//               </label>

//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={config.enableFallback}
//                   onChange={(e) => handleConfigChange('enableFallback', e.target.checked)}
//                   className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//                 />
//                 <span className="text-sm text-gray-700 dark:text-gray-300">Enable Fallback</span>
//               </label>
//             </div>
//           </div>

//           {/* Test Result */}
//           {testResult && (
//             <div className={`p-4 rounded-xl border ${
//               testResult.success 
//                 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
//                 : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
//             }`}>
//               <div className="flex items-center space-x-2">
//                 {testResult.success ? (
//                   <CheckCircleIcon size={20} className="text-green-600 dark:text-green-400" />
//                 ) : (
//                   <XCircleIcon size={20} className="text-red-600 dark:text-red-400" />
//                 )}
//                 <span className={`text-sm font-medium ${
//                   testResult.success 
//                     ? 'text-green-800 dark:text-green-200' 
//                     : 'text-red-800 dark:text-red-200'
//                 }`}>
//                   {testResult.message}
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Actions */}
//           <div className="flex items-center justify-end space-x-3">
//             <Button
//               variant="outline"
//               onClick={onClose}
//               className="px-6"
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="outline"
//               onClick={handleTest}
//               disabled={isTesting || !config.enabled}
//               className="px-6 flex items-center space-x-2"
//             >
//               {isTesting ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-primary-600/30 border-t-primary-600 rounded-full animate-spin" />
//                   <span>Testing...</span>
//                 </>
//               ) : (
//                 <>
//                   <TestTubeIcon size={16} />
//                   <span>Test Connection</span>
//                 </>
//               )}
//             </Button>
//             <Button
//               variant="primary"
//               onClick={handleSave}
//               className="px-6"
//             >
//               Save Configuration
//             </Button>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }; 