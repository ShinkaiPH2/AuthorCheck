// AI Configuration - Uses environment variables for easy deployment
const getEnvVar = (key: string, defaultValue: string): string => {
  // @ts-ignore - Vite environment variables
  return import.meta.env[key] || defaultValue;
};

const getEnvBool = (key: string, defaultValue: boolean): boolean => {
  // @ts-ignore - Vite environment variables
  const value = import.meta.env[key];
  return value === undefined ? defaultValue : value === 'true';
};

export const AI_CONFIG = {
  // API type for different integrations
  apiType: getEnvVar('VITE_AI_TYPE', 'gemini') as 'gemini' | 'openai' | 'claude' | 'custom',
  
  // Enable AI analysis (set to false to use only local analysis)
  enabled: getEnvBool('VITE_AI_ENABLED', true),
  
  // Request timeout in milliseconds
  timeout: parseInt(getEnvVar('VITE_AI_TIMEOUT', '30000')),
  
  // Analysis types to request
  analysisTypes: ['sentiment', 'topics', 'style', 'insights', 'plagiarism', 'quality'],
  
  // Fallback to local analysis if AI fails
  enableFallback: getEnvBool('VITE_AI_FALLBACK_ENABLED', true),
  
  // Provider-specific configurations
  providers: {
    gemini: {
      endpoint: getEnvVar('VITE_GEMINI_ENDPOINT', 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'),
      apiKey: getEnvVar('VITE_GEMINI_API_KEY', ''),
      model: getEnvVar('VITE_GEMINI_MODEL', 'gemini-2.0-flash'),
    },
    openai: {
      endpoint: getEnvVar('VITE_OPENAI_ENDPOINT', 'https://api.openai.com/v1/chat/completions'),
      apiKey: getEnvVar('VITE_OPENAI_API_KEY', ''),
      model: getEnvVar('VITE_OPENAI_MODEL', 'gpt-4'),
    },
    claude: {
      endpoint: getEnvVar('VITE_CLAUDE_ENDPOINT', 'https://api.anthropic.com/v1/messages'),
      apiKey: getEnvVar('VITE_CLAUDE_API_KEY', ''),
      model: getEnvVar('VITE_CLAUDE_MODEL', 'claude-3-sonnet-20240229'),
    },
    custom: {
      endpoint: getEnvVar('VITE_CUSTOM_ENDPOINT', ''),
      apiKey: getEnvVar('VITE_CUSTOM_API_KEY', ''),
      model: getEnvVar('VITE_CUSTOM_MODEL', ''),
    },
  },
};

// Environment-specific overrides
export const getAIConfig = () => {
  // For now, return the base config
  // You can add environment detection logic here if needed
  return AI_CONFIG;
};

// LLM Provider Configurations
export const LLM_CONFIGS = {
  gemini: {
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
    models: {
      'gemini-2.5-flash': 'gemini-2.5-flash',
      'gemini-2.5-pro': 'gemini-2.5-pro',
      'gemini-2.5-pro-vision': 'gemini-2.5-pro-vision',
    },
    defaultParams: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
  },
  openai: {
    baseUrl: 'https://api.openai.com/v1',
    models: {
      'gpt-4': 'gpt-4',
      'gpt-4-turbo': 'gpt-4-turbo-preview',
      'gpt-3.5-turbo': 'gpt-3.5-turbo',
    },
    defaultParams: {
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 0.95,
    },
  },
  claude: {
    baseUrl: 'https://api.anthropic.com/v1',
    models: {
      'claude-3-opus': 'claude-3-opus-20240229',
      'claude-3-sonnet': 'claude-3-sonnet-20240229',
      'claude-3-haiku': 'claude-3-haiku-20240307',
    },
    defaultParams: {
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 0.95,
    },
  },
}; 