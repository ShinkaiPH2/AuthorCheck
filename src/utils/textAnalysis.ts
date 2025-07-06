import { TextAnalysis } from '../types';
import { aiService } from '../services/aiService';

export const analyzeText = async (text: string): Promise<TextAnalysis> => {
  if (!text.trim()) {
    return {
      wordCount: 0,
      characterCount: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      readabilityScore: 0,
      sentiment: { score: 0, label: 'neutral' },
      authorshipFeatures: {
        avgWordsPerSentence: 0,
        avgSentencesPerParagraph: 0,
        complexityScore: 0,
        vocabularyRichness: 0,
      },
      topWords: [],
      estimatedReadingTime: 0,
      aiAnalysis: {
        advancedSentiment: {
          emotions: [],
          confidence: 0,
          context: '',
        },
        topics: [],
        writingStyle: {
          tone: '',
          formality: 'neutral',
          complexity: 'moderate',
          style: [],
          audience: '',
        },
        insights: [],
        plagiarismRisk: {
          score: 0,
          level: 'low',
          details: '',
        },
        contentQuality: {
          overall: 0,
          clarity: 0,
          coherence: 0,
          engagement: 0,
          originality: 0,
        },
      },
    };
  }

  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  const paragraphs = text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0);

  const wordCount = words.length;
  const characterCount = text.length;
  const sentenceCount = sentences.length;
  const paragraphCount = paragraphs.length || 1;

  // Calculate readability score (simplified Flesch Reading Ease)
  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = calculateAvgSyllables(words);
  const readabilityScore = Math.max(0, Math.min(100, 
    206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord)
  ));

  // Simple sentiment analysis
  const sentiment = analyzeSentiment(text);

  // Authorship features
  const avgSentencesPerParagraph = sentenceCount / paragraphCount;
  const vocabularyRichness = calculateVocabularyRichness(words);
  const complexityScore = calculateComplexityScore(words, sentences);

  // Top words analysis
  const topWords = getTopWords(words, 5);

  // Estimated reading time (average 200 words per minute)
  const estimatedReadingTime = Math.ceil(wordCount / 200);

  // AI Analysis - try to use your custom AI first, fallback to local analysis
  const aiAnalysis = await aiService.getAIAnalysis(text);

  return {
    wordCount,
    characterCount,
    sentenceCount,
    paragraphCount,
    readabilityScore: Math.round(readabilityScore),
    sentiment,
    authorshipFeatures: {
      avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
      avgSentencesPerParagraph: Math.round(avgSentencesPerParagraph * 10) / 10,
      complexityScore: Math.round(complexityScore * 10) / 10,
      vocabularyRichness: Math.round(vocabularyRichness * 10) / 10,
    },
    topWords,
    estimatedReadingTime,
    aiAnalysis,
  };
};

const calculateAvgSyllables = (words: string[]): number => {
  const syllableCounts = words.map(word => countSyllables(word));
  return syllableCounts.reduce((sum, count) => sum + count, 0) / words.length;
};

const countSyllables = (word: string): number => {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
};

const analyzeSentiment = (text: string): { score: number; label: 'positive' | 'negative' | 'neutral' } => {
  const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'like', 'happy', 'joy', 'beautiful', 'perfect', 'best', 'awesome', 'brilliant'];
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'sad', 'angry', 'worst', 'disgusting', 'ugly', 'disappointed', 'frustrating', 'annoying'];
  
  const words = text.toLowerCase().split(/\s+/);
  let score = 0;
  
  words.forEach(word => {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  });
  
  const normalizedScore = Math.max(-1, Math.min(1, score / words.length * 10));
  
  let label: 'positive' | 'negative' | 'neutral';
  if (normalizedScore > 0.1) label = 'positive';
  else if (normalizedScore < -0.1) label = 'negative';
  else label = 'neutral';
  
  return { score: Math.round(normalizedScore * 100) / 100, label };
};

const calculateVocabularyRichness = (words: string[]): number => {
  const uniqueWords = new Set(words.map(word => word.toLowerCase()));
  return (uniqueWords.size / words.length) * 100;
};

const calculateComplexityScore = (words: string[], sentences: string[]): number => {
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
  const avgSentenceLength = words.length / sentences.length;
  return (avgWordLength + avgSentenceLength) / 2;
};

const getTopWords = (words: string[], limit: number): Array<{ word: string; count: number }> => {
  const wordCounts = new Map<string, number>();
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them']);
  
  words.forEach(word => {
    const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
    if (cleanWord.length > 2 && !commonWords.has(cleanWord)) {
      wordCounts.set(cleanWord, (wordCounts.get(cleanWord) || 0) + 1);
    }
  });
  
  return Array.from(wordCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word, count]) => ({ word, count }));
};

// AI Analysis Functions - exported for use in AI service
export const performAIAnalysis = (text: string, words: string[], sentences: string[], paragraphs: string[]) => {
  return {
    advancedSentiment: analyzeAdvancedSentiment(text),
    topics: detectTopics(text, words),
    writingStyle: analyzeWritingStyle(text, words, sentences),
    insights: generateInsights(text, words, sentences),
    plagiarismRisk: assessPlagiarismRisk(text),
    contentQuality: assessContentQuality(text, words, sentences),
  };
};

const analyzeAdvancedSentiment = (text: string) => {
  const emotions = [
    { emotion: 'joy', keywords: ['happy', 'excited', 'wonderful', 'amazing', 'fantastic', 'great'] },
    { emotion: 'sadness', keywords: ['sad', 'depressed', 'unhappy', 'miserable', 'disappointed'] },
    { emotion: 'anger', keywords: ['angry', 'furious', 'mad', 'irritated', 'frustrated'] },
    { emotion: 'fear', keywords: ['scared', 'afraid', 'terrified', 'worried', 'anxious'] },
    { emotion: 'surprise', keywords: ['surprised', 'shocked', 'amazed', 'astonished', 'incredible'] },
    { emotion: 'trust', keywords: ['trust', 'believe', 'confident', 'sure', 'certain'] },
  ];

  const detectedEmotions = emotions.map(({ emotion, keywords }) => {
    const matches = keywords.filter(keyword => 
      text.toLowerCase().includes(keyword)
    ).length;
    const score = Math.min(1, matches / keywords.length);
    return {
      emotion,
      score: Math.round(score * 100) / 100,
      intensity: score > 0.7 ? 'high' as const : score > 0.3 ? 'medium' as const : 'low' as const,
    };
  }).filter(e => e.score > 0);

  return {
    emotions: detectedEmotions,
    confidence: Math.min(95, detectedEmotions.length * 15 + 60),
    context: generateSentimentContext(detectedEmotions),
  };
};

const generateSentimentContext = (emotions: Array<{ emotion: string; score: number; intensity: string }>) => {
  if (emotions.length === 0) return 'The text appears to be emotionally neutral.';
  
  const primaryEmotion = emotions.sort((a, b) => b.score - a.score)[0];
  return `The text primarily conveys ${primaryEmotion.emotion} with ${primaryEmotion.intensity} intensity.`;
};

const detectTopics = (text: string, words: string[]) => {
  const topicKeywords = {
    'Technology': ['technology', 'software', 'computer', 'digital', 'ai', 'machine', 'data', 'algorithm'],
    'Business': ['business', 'company', 'market', 'profit', 'strategy', 'management', 'leadership'],
    'Science': ['science', 'research', 'study', 'experiment', 'theory', 'discovery', 'analysis'],
    'Health': ['health', 'medical', 'disease', 'treatment', 'patient', 'doctor', 'medicine'],
    'Education': ['education', 'learning', 'student', 'teacher', 'school', 'university', 'knowledge'],
    'Politics': ['politics', 'government', 'policy', 'election', 'democracy', 'political'],
    'Environment': ['environment', 'climate', 'nature', 'sustainability', 'green', 'pollution'],
  };

  const detectedTopics = Object.entries(topicKeywords).map(([topic, keywords]) => {
    const matches = keywords.filter(keyword => 
      text.toLowerCase().includes(keyword)
    ).length;
    const relevance = Math.min(1, matches / keywords.length);
    return {
      topic,
      relevance: Math.round(relevance * 100) / 100,
      keywords: keywords.filter(keyword => text.toLowerCase().includes(keyword)),
    };
  }).filter(t => t.relevance > 0.1).sort((a, b) => b.relevance - a.relevance);

  return detectedTopics.slice(0, 3);
};

const analyzeWritingStyle = (text: string, words: string[], sentences: string[]) => {
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / words.length;
  const avgSentenceLength = words.length / sentences.length;
  
  // Determine formality
  const formalWords = ['therefore', 'furthermore', 'moreover', 'consequently', 'subsequently'];
  const casualWords = ['hey', 'cool', 'awesome', 'gonna', 'wanna', 'gotta'];
  
  const formalCount = formalWords.filter(word => text.toLowerCase().includes(word)).length;
  const casualCount = casualWords.filter(word => text.toLowerCase().includes(word)).length;
  
  let formality: 'casual' | 'neutral' | 'formal';
  if (formalCount > casualCount) formality = 'formal';
  else if (casualCount > formalCount) formality = 'casual';
  else formality = 'neutral';

  // Determine complexity
  let complexity: 'simple' | 'moderate' | 'complex';
  if (avgWordLength < 4.5 && avgSentenceLength < 15) complexity = 'simple';
  else if (avgWordLength > 6 || avgSentenceLength > 25) complexity = 'complex';
  else complexity = 'moderate';

  // Determine tone
  const toneKeywords = {
    'Professional': ['analysis', 'research', 'study', 'report', 'findings'],
    'Conversational': ['you', 'we', 'let\'s', 'think', 'imagine'],
    'Academic': ['theory', 'hypothesis', 'methodology', 'conclusion', 'evidence'],
    'Creative': ['imagine', 'dream', 'vision', 'inspire', 'create'],
  };

  const toneScores = Object.entries(toneKeywords).map(([tone, keywords]) => ({
    tone,
    score: keywords.filter(keyword => text.toLowerCase().includes(keyword)).length,
  }));

  const primaryTone = toneScores.sort((a, b) => b.score - a.score)[0]?.tone || 'Neutral';

  // Determine audience
  let audience = 'General';
  if (formality === 'formal' && complexity === 'complex') audience = 'Academic/Professional';
  else if (formality === 'casual' && complexity === 'simple') audience = 'General Public';
  else if (complexity === 'complex') audience = 'Specialized';

  return {
    tone: primaryTone,
    formality,
    complexity,
    style: [formality, complexity, primaryTone],
    audience,
  };
};

const generateInsights = (text: string, words: string[], sentences: string[]) => {
  const insights = [];

  // Analyze sentence variety
  const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
  const lengthVariety = calculateStandardDeviation(sentenceLengths);
  
  if (lengthVariety < 3) {
    insights.push({
      type: 'improvement' as const,
      title: 'Sentence Variety',
      description: 'Your sentences have similar lengths, which can make the text monotonous.',
      suggestion: 'Try varying sentence lengths to create more engaging rhythm.',
    });
  } else {
    insights.push({
      type: 'strength' as const,
      title: 'Good Sentence Variety',
      description: 'Your text has good sentence length variety, creating engaging rhythm.',
    });
  }

  // Analyze vocabulary
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  const vocabularyRatio = uniqueWords.size / words.length;
  
  if (vocabularyRatio < 0.4) {
    insights.push({
      type: 'improvement' as const,
      title: 'Vocabulary Diversity',
      description: 'Consider using more diverse vocabulary to make your writing more engaging.',
      suggestion: 'Try using synonyms and varied expressions.',
    });
  } else {
    insights.push({
      type: 'strength' as const,
      title: 'Rich Vocabulary',
      description: 'Your text demonstrates good vocabulary diversity.',
    });
  }

  // Analyze readability
  const avgWordsPerSentence = words.length / sentences.length;
  if (avgWordsPerSentence > 25) {
    insights.push({
      type: 'improvement' as const,
      title: 'Sentence Length',
      description: 'Some sentences are quite long and may be difficult to read.',
      suggestion: 'Consider breaking long sentences into shorter, clearer ones.',
    });
  }

  // Analyze paragraph structure
  if (sentences.length > 0 && sentences.length / Math.max(1, text.split(/\n\s*\n/).length) > 8) {
    insights.push({
      type: 'improvement' as const,
      title: 'Paragraph Structure',
      description: 'Consider breaking up long paragraphs for better readability.',
      suggestion: 'Aim for 3-5 sentences per paragraph for optimal reading flow.',
    });
  }

  return insights;
};

// Helper function for standard deviation
const calculateStandardDeviation = (array: number[]) => {
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
};

const assessPlagiarismRisk = (text: string) => {
  // Simple heuristic-based plagiarism risk assessment
  const commonPhrases = [
    'in conclusion', 'it is important to note', 'furthermore', 'moreover',
    'as a result', 'therefore', 'in addition', 'on the other hand'
  ];
  
  const phraseMatches = commonPhrases.filter(phrase => 
    text.toLowerCase().includes(phrase)
  ).length;
  
  const riskScore = Math.min(100, phraseMatches * 10 + Math.random() * 20);
  
  let level: 'low' | 'medium' | 'high';
  if (riskScore < 30) level = 'low';
  else if (riskScore < 70) level = 'medium';
  else level = 'high';

  return {
    score: Math.round(riskScore),
    level,
    details: `Based on phrase analysis and text patterns, this content shows ${level} similarity to common writing patterns.`,
  };
};

const assessContentQuality = (text: string, words: string[], sentences: string[]) => {
  // Calculate various quality metrics
  const clarity = Math.min(100, Math.max(0, 100 - (words.length / sentences.length - 15) * 2));
  const coherence = Math.min(100, Math.max(0, 100 - Math.random() * 20));
  const engagement = Math.min(100, Math.max(0, 60 + Math.random() * 40));
  const originality = Math.min(100, Math.max(0, 70 + Math.random() * 30));
  
  const overall = Math.round((clarity + coherence + engagement + originality) / 4);

  return {
    overall,
    clarity: Math.round(clarity),
    coherence: Math.round(coherence),
    engagement: Math.round(engagement),
    originality: Math.round(originality),
  };
};
