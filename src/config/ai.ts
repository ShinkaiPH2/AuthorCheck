export const AI_CONFIG = {
  enabled: true,  // Enable AI analysis (set to false to use only local analysis)
  timeout: 30000,  // Request timeout in milliseconds
  enableFallback: true,  // Fallback to local analysis if AI fails
};

export const getAIConfig = () => {
  return AI_CONFIG;
};

 