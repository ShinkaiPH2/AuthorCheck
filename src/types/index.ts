import { ReactNode, ButtonHTMLAttributes } from 'react';

export interface TextAnalysis {
  wordCount: number;
  characterCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readabilityScore: number;
  sentiment: {
    score: number;
    label: 'positive' | 'negative' | 'neutral';
  };
  authorshipFeatures: {
    avgWordsPerSentence: number;
    avgSentencesPerParagraph: number;
    complexityScore: number;
    vocabularyRichness: number;
  };
  topWords: Array<{
    word: string;
    count: number;
  }>;
  estimatedReadingTime: number;
  // AI Analysis Features
  aiAnalysis: {
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
    aiOrHuman?: 'ai' | 'human' | 'unknown';
    aiOrHumanConfidence?: number; // 0-100
    aiOrHumanExplanation?: string;
  };
}

export interface AnalysisTab {
  id: 'overview' | 'analysis' | 'ai-insights';
  label: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export interface IconProps {
  size?: number;
  className?: string;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
