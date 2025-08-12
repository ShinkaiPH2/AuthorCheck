import { TextAnalysis } from "../types";
import { getAIConfig } from "../config/ai";

interface AIConfig {
  enabled: boolean;
  timeout: number;
  enableFallback: boolean;
}
interface AIAnalysisResponse {
  success: boolean;
  data?: {
    advancedSentiment: {
      emotions: Array<{
        emotion: string;
        score: number;
        intensity: "low" | "medium" | "high";
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
      formality: "casual" | "neutral" | "formal";
      complexity: "simple" | "moderate" | "complex";
      style: string[];
      audience: string;
    };
    insights: Array<{
      type: "strength" | "improvement" | "observation";
      title: string;
      description: string;
      suggestion?: string;
    }>;
    plagiarismRisk: {
      score: number;
      level: "low" | "medium" | "high";
      details: string;
    };
    contentQuality: {
      overall: number;
      clarity: number;
      coherence: number;
      engagement: number;
      originality: number;
    };
    aiOrHuman?: "ai" | "human" | "unknown";
    aiOrHumanConfidence?: number;
    aiOrHumanExplanation?: string;
  };
  error?: string;
}
const DEFAULT_AI_CONFIG: AIConfig = getAIConfig();
class AIService {
  private config: AIConfig;
  constructor(config?: Partial<AIConfig>) {
    this.config = { ...DEFAULT_AI_CONFIG, ...config };
  }
  async analyzeTextWithAI(text: string): Promise<AIAnalysisResponse> {
    try {
      const response = await fetch("/api/external", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          timeout: this.config.timeout,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "External API request failed");
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || "AI analysis failed");
      }
      return { success: true, data: result.data };
    } catch (error) {
      console.error("AI analysis failed:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
  async getAIAnalysis(text: string): Promise<TextAnalysis["aiAnalysis"]> {
    if (!this.config.enabled) {
      return this.getDefaultAIAnalysis();
    }
    const aiResponse = await this.analyzeTextWithAI(text);
    if (aiResponse.success && aiResponse.data) {
      return aiResponse.data;
    }
    if (this.config.enableFallback) {
      console.warn(
        "AI analysis failed, using default analysis:",
        aiResponse.error
      );
      return this.getDefaultAIAnalysis();
    }
    return this.getDefaultAIAnalysis();
  }
  private getDefaultAIAnalysis(): TextAnalysis["aiAnalysis"] {
    return {
      advancedSentiment: {
        emotions: [],
        confidence: 0,
        context: "Analysis not available",
      },
      topics: [],
      writingStyle: {
        tone: "Neutral",
        formality: "neutral",
        complexity: "moderate",
        style: [],
        audience: "General",
      },
      insights: [],
      plagiarismRisk: {
        score: 0,
        level: "low",
        details: "Analysis not available",
      },
      contentQuality: {
        overall: 0,
        clarity: 0,
        coherence: 0,
        engagement: 0,
        originality: 0,
      },
      aiOrHuman: "unknown",
      aiOrHumanConfidence: 0,
      aiOrHumanExplanation: "Analysis not available",
    };
  }
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.analyzeTextWithAI("Test connection");
      return response.success;
    } catch {
      return false;
    }
  }
  updateConfig(newConfig: Partial<AIConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
  getConfig(): AIConfig {
    return { ...this.config };
  }
}
export const aiService = new AIService();
export { AIService, type AIConfig, type AIAnalysisResponse };
