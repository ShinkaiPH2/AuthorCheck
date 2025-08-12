import { VercelRequest, VercelResponse } from '@vercel/node';

interface ExternalAPIRequest {
  text: string;
  timeout?: number;
}

// Get environment variables
const API_KEY = process.env.API_KEY || '';
const MODEL = process.env.MODEL || 'gemini-2.0-flash';
const ENDPOINT = process.env.ENDPOINT || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const AI_TIMEOUT = parseInt(process.env.AI_TIMEOUT || '30000');

/**
 * Build analysis prompt for Gemini
 */
function buildAnalysisPrompt(text: string): string {
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
  },
  "aiOrHuman": "ai|human|unknown",
  "aiOrHumanConfidence": 92,
  "aiOrHumanExplanation": "This text is likely AI-generated because of its consistent tone, lack of personal anecdotes, and formal structure."
}

Focus on providing accurate, detailed analysis. Ensure all scores are between 0-100 and relevance scores are between 0-1. For aiOrHuman, classify as 'ai' if the text is likely AI-generated, 'human' if likely human-written, or 'unknown' if unsure.`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, timeout = AI_TIMEOUT }: ExternalAPIRequest = req.body;

    // Validate required fields
    if (!text) {
      return res.status(400).json({ error: 'Missing required field: text' });
    }

    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Build the analysis prompt
    const prompt = buildAnalysisPrompt(text);

    // Create the Gemini request
    const geminiRequest = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Make the external API request to Gemini
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY,
      },
      body: JSON.stringify(geminiRequest),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: `Gemini API error: ${response.status} ${response.statusText}`,
        details: errorText,
      });
    }

    const result = await response.json();
    
    if (result.error) {
      return res.status(400).json({
        error: `Gemini API error: ${result.error.message}`,
        details: result.error,
      });
    }

    // Parse the Gemini response
    const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in Gemini response');
      }

      const analysisData = JSON.parse(jsonMatch[0]);
      
      // Return the result with success status
      return res.status(200).json({
        success: true,
        data: analysisData,
        model: MODEL, // Include model info for debugging
      });
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError);
      return res.status(500).json({
        error: 'Failed to parse AI response',
        details: parseError instanceof Error ? parseError.message : 'Unknown parsing error',
      });
    }

  } catch (error) {
    console.error('External API request failed:', error);
    
    if (error instanceof Error && error.name === 'AbortError') {
      return res.status(408).json({ error: 'Request timeout' });
    }

    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}