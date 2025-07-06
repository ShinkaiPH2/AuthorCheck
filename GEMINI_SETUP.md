# Gemini API Setup Guide for AuthorCheck

This guide will help you set up Google's Gemini API with your AuthorCheck application.

## 🚀 Quick Setup

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key (it starts with `AIza...`)

### 2. Configure AuthorCheck

1. Open the AuthorCheck application
2. Click the "AI Config" button in the top-right corner
3. Select "Gemini API" from the API Type dropdown
4. Paste your API key in the "API Key" field
5. Click "Test Connection" to verify everything works
6. Click "Save Configuration"

### 3. Start Analyzing

Your application is now ready to use Gemini API for advanced text analysis!

## 📋 Detailed Configuration

### API Configuration File

You can also configure Gemini directly in the code by editing `src/config/ai.ts`:

```typescript
export const AI_CONFIG = {
  endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
  apiKey: 'YOUR_GEMINI_API_KEY_HERE',
  model: 'gemini-2.5-flash',
  timeout: 30000,
  apiType: 'gemini',
  enabled: true,
  enableFallback: true,
};
```

### Environment Variables (Optional)

Create a `.env` file in your project root:

```env
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
VITE_GEMINI_MODEL=gemini-pro
```

## 🔧 Available Gemini Models

- **gemini-2.5-flash**: Latest fast and efficient model for text analysis (recommended)
- **gemini-2.5-pro**: Latest more capable model for complex analysis
- **gemini-2.5-pro-vision**: Latest model for text + image analysis (not used in this app)

## 💡 Features Powered by Gemini

When using Gemini API, you'll get:

### Advanced Sentiment Analysis
- Detailed emotion detection (joy, sadness, anger, fear, surprise, trust)
- Confidence scores and emotional context
- Intensity levels (low, medium, high)

### Topic Detection
- Automatic topic identification
- Relevance scoring
- Keyword extraction

### Writing Style Analysis
- Tone detection (Professional, Casual, Academic, Creative)
- Formality assessment
- Complexity analysis
- Target audience identification

### AI-Generated Insights
- Writing strengths and improvements
- Actionable suggestions
- Content observations

### Plagiarism Risk Assessment
- Similarity analysis
- Risk scoring
- Detailed explanations

### Content Quality Metrics
- Overall quality score
- Clarity, coherence, engagement, originality scores
- Comprehensive evaluation

## 🛠️ Troubleshooting

### Common Issues

1. **"API Key Invalid" Error**
   - Verify your API key is correct
   - Ensure you copied the full key from Google AI Studio
   - Check that your Google account has access to Gemini API

2. **"Quota Exceeded" Error**
   - Gemini API has rate limits
   - Check your usage in Google AI Studio
   - Consider upgrading your plan if needed

3. **"Network Error"**
   - Check your internet connection
   - Verify the endpoint URL is correct
   - Try again in a few minutes

4. **"JSON Parse Error"**
   - This usually means Gemini returned an unexpected response
   - The app will fall back to local analysis
   - Check the browser console for details

### Testing Your Setup

1. Use the "Test Connection" button in the AI Config panel
2. Try analyzing a simple text first
3. Check the browser console for any error messages
4. Verify your API key has the necessary permissions

## 🔒 Security Best Practices

1. **Never commit your API key to version control**
2. Use environment variables for production
3. Regularly rotate your API keys
4. Monitor your API usage
5. Set up billing alerts in Google Cloud Console

## 📊 API Usage and Costs

- **Free Tier**: 15 requests per minute, 1500 requests per day
- **Paid Tier**: $0.0005 per 1K characters input, $0.0015 per 1K characters output
- **Rate Limits**: 15 requests per minute for free tier

## 🎯 Example Analysis

Here's what Gemini will analyze in your text:

```json
{
  "advancedSentiment": {
    "emotions": [
      {
        "emotion": "joy",
        "score": 0.85,
        "intensity": "high"
      }
    ],
    "confidence": 0.92,
    "context": "The text conveys strong positive emotions with enthusiasm and excitement."
  },
  "topics": [
    {
      "topic": "Technology",
      "relevance": 0.95,
      "keywords": ["AI", "machine learning", "innovation"]
    }
  ],
  "writingStyle": {
    "tone": "Professional",
    "formality": "formal",
    "complexity": "moderate",
    "style": ["technical", "informative"],
    "audience": "Professional audience with technical background"
  },
  "insights": [
    {
      "type": "strength",
      "title": "Clear Technical Communication",
      "description": "The text effectively explains complex concepts in accessible language."
    }
  ],
  "plagiarismRisk": {
    "score": 12,
    "level": "low",
    "details": "Content shows low similarity to common patterns, indicating originality."
  },
  "contentQuality": {
    "overall": 87,
    "clarity": 92,
    "coherence": 89,
    "engagement": 85,
    "originality": 88
  }
}
```

## 🆘 Support

If you encounter issues:

1. Check the [Gemini API Documentation](https://ai.google.dev/docs)
2. Review the [Google AI Studio Help](https://ai.google.dev/studio/help)
3. Check your browser's developer console for error messages
4. Ensure your API key has the correct permissions

## 🎉 Next Steps

Once Gemini is configured:

1. **Test with different text types** to see the full range of analysis
2. **Explore the AI Insights tab** for detailed analysis results
3. **Try the file upload feature** for analyzing longer documents
4. **Share your analysis** with others using the export features

Happy analyzing! 🚀 