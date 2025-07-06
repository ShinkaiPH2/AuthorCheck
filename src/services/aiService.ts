import { TextAnalysis } from '../types';
import { getAIConfig, LLM_CONFIGS } from '../config/ai';

// Configuration for your custom AI/LLM
interface AIConfig {
  apiType: 'gemini' | 'openai' | 'claude' | 'custom';
  enabled: boolean;
  timeout: number;
  analysisTypes: string[];
  enableFallback: boolean;
  providers: {
    gemini: { endpoint: string; apiKey: string; model: string };
    openai: { endpoint: string; apiKey: string; model: string };
    claude: { endpoint: string; apiKey: string; model: string };
    custom: { endpoint: string; apiKey: string; model: string };
  };
}

// AI Analysis Request/Response interfaces
interface AIAnalysisRequest {
  text: string;
  analysisTypes: string[];
  config?: AIConfig;
}

interface AIAnalysisResponse {
  success: boolean;
  data?: {
    advancedSentiment: {
      emotions: Array<{
        emotion: string;
        score: number;
        intensity: 'low' | 'medium' | 'high';
      }>;
      confidence: number;
      context: string;
    };
    topics: Array<{
      topic: string;
      relevance: number;
      keywords: string[];
    }>;
    writingStyle: {
      tone: string;
      formality: 'casual' | 'neutral' | 'formal';
      complexity: 'simple' | 'moderate' | 'complex';
      style: string[];
      audience: string;
    };
    insights: Array<{
      type: 'strength' | 'improvement' | 'observation';
      title: string;
      description: string;
      suggestion?: string;
    }>;
    plagiarismRisk: {
      score: number;
      level: 'low' | 'medium' | 'high';
      details: string;
    };
    contentQuality: {
      overall: number;
      clarity: number;
      coherence: number;
      engagement: number;
      originality: number;
    };
  };
  error?: string;
}

// Default configuration - uses config from ai.ts
const DEFAULT_AI_CONFIG: AIConfig = getAIConfig();

class AIService {
  private config: AIConfig;

  constructor(config?: Partial<AIConfig>) {
    this.config = { ...DEFAULT_AI_CONFIG, ...config };
  }

  /**
   * Analyze text using your custom AI/LLM
   */
  async analyzeTextWithAI(text: string, analysisTypes: string[] = ['all']): Promise<AIAnalysisResponse> {
    try {
      const provider = this.config.providers[this.config.apiType];
      
      if (!provider.apiKey) {
        throw new Error(`API key not configured for ${this.config.apiType}`);
      }

      switch (this.config.apiType) {
        case 'gemini':
          return await this.analyzeWithGemini(text, analysisTypes);
        case 'openai':
          return await this.analyzeWithOpenAI(text, analysisTypes);
        case 'claude':
          return await this.analyzeWithClaude(text, analysisTypes);
        case 'custom':
          return await this.analyzeWithCustom(text, analysisTypes);
        default:
          throw new Error(`Unsupported AI provider: ${this.config.apiType}`);
      }
    } catch (error) {
      console.error('AI analysis failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Analyze text using Gemini API
   */
  private async analyzeWithGemini(text: string, analysisTypes: string[] = ['all']): Promise<AIAnalysisResponse> {
    try {
      const provider = this.config.providers.gemini;
      const prompt = this.buildAnalysisPrompt(text, analysisTypes);
      
      const geminiRequest = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: LLM_CONFIGS.gemini.defaultParams.temperature,
          topK: LLM_CONFIGS.gemini.defaultParams.topK,
          topP: LLM_CONFIGS.gemini.defaultParams.topP,
          maxOutputTokens: LLM_CONFIGS.gemini.defaultParams.maxOutputTokens,
        }
      };

      const response = await fetch(provider.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': provider.apiKey,
        },
        body: JSON.stringify(geminiRequest),
        signal: AbortSignal.timeout(this.config.timeout),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(`Gemini API error: ${result.error.message}`);
      }

      // Parse Gemini response and convert to our format
      const aiAnalysis = this.parseGeminiResponse(result, text);
      
      return { success: true, data: aiAnalysis };
    } catch (error) {
      console.error('Gemini analysis failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Analyze text using OpenAI API
   */
  private async analyzeWithOpenAI(text: string, analysisTypes: string[] = ['all']): Promise<AIAnalysisResponse> {
    try {
      const provider = this.config.providers.openai;
      const prompt = this.buildAnalysisPrompt(text, analysisTypes);
      
      const openaiRequest = {
        model: provider.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert text analyst. Provide analysis in the specified JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: LLM_CONFIGS.openai.defaultParams.temperature,
        max_tokens: LLM_CONFIGS.openai.defaultParams.max_tokens,
        top_p: LLM_CONFIGS.openai.defaultParams.top_p,
      };

      const response = await fetch(provider.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${provider.apiKey}`,
        },
        body: JSON.stringify(openaiRequest),
        signal: AbortSignal.timeout(this.config.timeout),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(`OpenAI API error: ${result.error.message}`);
      }

      // Parse OpenAI response and convert to our format
      const aiAnalysis = this.parseOpenAIResponse(result, text);
      
      return { success: true, data: aiAnalysis };
    } catch (error) {
      console.error('OpenAI analysis failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Analyze text using Claude API
   */
  private async analyzeWithClaude(text: string, analysisTypes: string[] = ['all']): Promise<AIAnalysisResponse> {
    try {
      const provider = this.config.providers.claude;
      const prompt = this.buildAnalysisPrompt(text, analysisTypes);
      
      const claudeRequest = {
        model: provider.model,
        max_tokens: LLM_CONFIGS.claude.defaultParams.max_tokens,
        temperature: LLM_CONFIGS.claude.defaultParams.temperature,
        top_p: LLM_CONFIGS.claude.defaultParams.top_p,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
      };

      const response = await fetch(provider.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': provider.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify(claudeRequest),
        signal: AbortSignal.timeout(this.config.timeout),
      });

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(`Claude API error: ${result.error.message}`);
      }

      // Parse Claude response and convert to our format
      const aiAnalysis = this.parseClaudeResponse(result, text);
      
      return { success: true, data: aiAnalysis };
    } catch (error) {
      console.error('Claude analysis failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Analyze text using Custom API
   */
  private async analyzeWithCustom(text: string, analysisTypes: string[] = ['all']): Promise<AIAnalysisResponse> {
    try {
      const provider = this.config.providers.custom;
      
      if (!provider.endpoint) {
        throw new Error('Custom API endpoint not configured');
      }

      const request = {
        text,
        analysisTypes,
        model: provider.model,
      };

      const response = await fetch(provider.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(provider.apiKey && { 'Authorization': `Bearer ${provider.apiKey}` }),
        },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(this.config.timeout),
      });

      if (!response.ok) {
        throw new Error(`Custom API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error('Custom API analysis failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Build analysis prompt for all LLM providers
   */
  private buildAnalysisPrompt(text: string, analysisTypes: string[]): string {
    return `Analyze the following text and provide a comprehensive analysis in JSON format. 

Text to analyze:
"${text}"

Please provide analysis in the following JSON format:
{
  "advancedSentiment": {
    "emotions": [
      {
        "emotion": "emotion_name",
        "score": 0.85,
        "intensity": "high|medium|low"
      }
    ],
    "confidence": 0.92,
    "context": "Brief description of the overall emotional context"
  },
  "topics": [
    {
      "topic": "topic_name",
      "relevance": 0.95,
      "keywords": ["keyword1", "keyword2"]
    }
  ],
  "writingStyle": {
    "tone": "Professional|Casual|Academic|Creative",
    "formality": "formal|neutral|casual",
    "complexity": "simple|moderate|complex",
    "style": ["style1", "style2"],
    "audience": "target audience description"
  },
  "insights": [
    {
      "type": "strength|improvement|observation",
      "title": "Insight title",
      "description": "Detailed description",
      "suggestion": "Optional suggestion"
    }
  ],
  "plagiarismRisk": {
    "score": 15,
    "level": "low|medium|high",
    "details": "Risk assessment details"
  },
  "contentQuality": {
    "overall": 85,
    "clarity": 90,
    "coherence": 88,
    "engagement": 82,
    "originality": 87
  }
}

Focus on providing accurate, detailed analysis. Ensure all scores are between 0-100 and relevance scores are between 0-1.`;
  }

  /**
   * Parse Gemini API response
   */
  private parseGeminiResponse(geminiResponse: any, originalText: string): TextAnalysis['aiAnalysis'] {
    try {
      const responseText = geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return this.parseLLMResponse(responseText);
    } catch (error) {
      console.error('Failed to parse Gemini response:', error);
      return this.getDefaultAIAnalysis();
    }
  }

  /**
   * Parse OpenAI API response
   */
  private parseOpenAIResponse(openaiResponse: any, originalText: string): TextAnalysis['aiAnalysis'] {
    try {
      const responseText = openaiResponse.choices?.[0]?.message?.content || '';
      return this.parseLLMResponse(responseText);
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error);
      return this.getDefaultAIAnalysis();
    }
  }

  /**
   * Parse Claude API response
   */
  private parseClaudeResponse(claudeResponse: any, originalText: string): TextAnalysis['aiAnalysis'] {
    try {
      const responseText = claudeResponse.content?.[0]?.text || '';
      return this.parseLLMResponse(responseText);
    } catch (error) {
      console.error('Failed to parse Claude response:', error);
      return this.getDefaultAIAnalysis();
    }
  }

  /**
   * Parse LLM response (common parsing logic)
   */
  private parseLLMResponse(responseText: string): TextAnalysis['aiAnalysis'] {
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in LLM response');
      }

      const parsedData = JSON.parse(jsonMatch[0]);
      
      // Validate and return the parsed data
      return {
        advancedSentiment: parsedData.advancedSentiment || {
          emotions: [],
          confidence: 0,
          context: 'Analysis not available',
        },
        topics: parsedData.topics || [],
        writingStyle: parsedData.writingStyle || {
          tone: 'Neutral',
          formality: 'neutral',
          complexity: 'moderate',
          style: [],
          audience: 'General',
        },
        insights: parsedData.insights || [],
        plagiarismRisk: parsedData.plagiarismRisk || {
          score: 0,
          level: 'low',
          details: 'Analysis not available',
        },
        contentQuality: parsedData.contentQuality || {
          overall: 0,
          clarity: 0,
          coherence: 0,
          engagement: 0,
          originality: 0,
        },
      };
    } catch (error) {
      console.error('Failed to parse LLM response:', error);
      return this.getDefaultAIAnalysis();
    }
  }

  /**
   * Get AI analysis with fallback to local analysis
   */
  async getAIAnalysis(text: string): Promise<TextAnalysis['aiAnalysis']> {
    // Check if AI is enabled
    if (!this.config.enabled) {
      return this.getLocalAIAnalysis(text);
    }

    // Try AI analysis first
    const aiResponse = await this.analyzeTextWithAI(text);
    
    if (aiResponse.success && aiResponse.data) {
      return aiResponse.data;
    }

    // Fallback to local analysis if AI fails and fallback is enabled
    if (this.config.enableFallback) {
      console.warn('AI analysis failed, using local analysis:', aiResponse.error);
      return this.getLocalAIAnalysis(text);
    }

    // Return default analysis if no fallback
    return this.getDefaultAIAnalysis();
  }

  /**
   * Local AI analysis as fallback
   */
  private getLocalAIAnalysis(text: string): TextAnalysis['aiAnalysis'] {
    // For now, return default analysis
    // You can implement local analysis logic here if needed
    return this.getDefaultAIAnalysis();
  }

  /**
   * Default AI analysis when local analysis fails
   */
  private getDefaultAIAnalysis(): TextAnalysis['aiAnalysis'] {
    return {
      advancedSentiment: {
        emotions: [],
        confidence: 0,
        context: 'Analysis not available',
      },
      topics: [],
      writingStyle: {
        tone: 'Neutral',
        formality: 'neutral',
        complexity: 'moderate',
        style: [],
        audience: 'General',
      },
      insights: [],
      plagiarismRisk: {
        score: 0,
        level: 'low',
        details: 'Analysis not available',
      },
      contentQuality: {
        overall: 0,
        clarity: 0,
        coherence: 0,
        engagement: 0,
        originality: 0,
      },
    };
  }

  /**
   * Test AI connection
   */
  async testConnection(): Promise<boolean> {
    try {
      // For Gemini, test with a simple prompt
      if (this.config.apiType === 'gemini') {
        return await this.testGeminiConnection();
      }
      
      const response = await this.analyzeTextWithAI('Test connection', ['sentiment']);
      return response.success;
    } catch {
      return false;
    }
  }

  /**
   * Test Gemini API connection specifically
   */
  private async testGeminiConnection(): Promise<boolean> {
    try {
      const provider = this.config.providers.gemini;
      
      if (!provider.apiKey) {
        throw new Error('API key is required for Gemini');
      }

      const testRequest = {
        contents: [{
          parts: [{
            text: 'Hello, this is a test message. Please respond with "Test successful" if you can read this.'
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 50,
        }
      };

      const response = await fetch(provider.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': provider.apiKey,
        },
        body: JSON.stringify(testRequest),
        signal: AbortSignal.timeout(10000), // 10 second timeout for test
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(`Gemini API error: ${result.error.message}`);
      }

      return true;
    } catch (error) {
      console.error('Gemini connection test failed:', error);
      return false;
    }
  }

  /**
   * Update AI configuration
   */
  updateConfig(newConfig: Partial<AIConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get current configuration
   */
  getConfig(): AIConfig {
    return { ...this.config };
  }
}

// Export singleton instance
export const aiService = new AIService();

// Export for testing or custom instances
export { AIService, type AIConfig, type AIAnalysisRequest, type AIAnalysisResponse }; 