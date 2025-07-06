# AuthorCheck - AI-Powered Text Analysis Tool

A modern, desktop-first text analysis application with AI-powered insights, built with React, TypeScript, and TailwindCSS.

## Features

- **Advanced Text Analysis**: Word count, character count, readability scores, and sentiment analysis
- **AI-Powered Insights**: Custom AI integration for advanced sentiment analysis, topic detection, writing style analysis, and content quality assessment
- **Modern UI**: Dark mode support with futuristic design and smooth animations
- **Responsive Design**: Desktop-first layout with mobile responsiveness
- **Performance Optimized**: Built with performance best practices and Lighthouse optimizations

## AI Integration

This application supports **multiple LLM providers** for advanced AI-powered text analysis:

- **Google Gemini** - Fast and efficient analysis
- **OpenAI GPT** - Advanced reasoning and insights  
- **Anthropic Claude** - Balanced performance and safety
- **Custom APIs** - Your own LLM endpoints

The app is configured for production use with environment variables.

### 🚀 Quick Start

1. **Choose your LLM provider** and get your API key
2. **Set up environment variables** (see configuration below)
3. **Deploy the application** to your preferred platform
4. **Start analyzing** with advanced AI insights!

### Environment Configuration

The app uses environment variables for secure configuration:

```env
# Choose your LLM provider
VITE_AI_ENABLED=true
VITE_AI_TYPE=gemini  # or 'openai', 'claude', 'custom'

# Gemini Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_MODEL=gemini-2.5-flash

# OpenAI Configuration (optional)
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_OPENAI_MODEL=gpt-4

# Claude Configuration (optional)
VITE_CLAUDE_API_KEY=your_claude_api_key_here
VITE_CLAUDE_MODEL=claude-3-sonnet-20240229

# Custom API Configuration (optional)
VITE_CUSTOM_ENDPOINT=your_custom_api_endpoint
VITE_CUSTOM_API_KEY=your_custom_api_key
VITE_CUSTOM_MODEL=your_custom_model
```

### 1. Environment Variables Setup

Create a `.env` file in your project root:

```env
# AI Configuration
VITE_AI_ENABLED=true
VITE_AI_TYPE=gemini  # Choose: gemini, openai, claude, custom

# Gemini Configuration
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
VITE_GEMINI_MODEL=gemini-2.5-flash
VITE_GEMINI_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent

# OpenAI Configuration (optional)
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_OPENAI_MODEL=gpt-4
VITE_OPENAI_ENDPOINT=https://api.openai.com/v1/chat/completions

# Claude Configuration (optional)
VITE_CLAUDE_API_KEY=your_claude_api_key_here
VITE_CLAUDE_MODEL=claude-3-sonnet-20240229
VITE_CLAUDE_ENDPOINT=https://api.anthropic.com/v1/messages

# Custom API Configuration (optional)
VITE_CUSTOM_ENDPOINT=your_custom_api_endpoint
VITE_CUSTOM_API_KEY=your_custom_api_key
VITE_CUSTOM_MODEL=your_custom_model

# Performance Settings
VITE_AI_TIMEOUT=30000
VITE_AI_FALLBACK_ENABLED=true
```

### 2. Get Your API Keys

#### For Gemini (Google AI):
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key to your `.env` file

#### For OpenAI:
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in to your OpenAI account
3. Click "Create new secret key"
4. Copy the generated key to your `.env` file

#### For Claude (Anthropic):
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign in to your Anthropic account
3. Navigate to API Keys section
4. Create a new API key and copy it to your `.env` file

### 2. AI API Response Format

Your AI endpoint should return data in this format:

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
    "context": "The text conveys strong positive emotions..."
  },
  "topics": [
    {
      "topic": "Technology",
      "relevance": 0.95,
      "keywords": ["AI", "machine learning", "technology"]
    }
  ],
  "writingStyle": {
    "tone": "Professional",
    "formality": "formal",
    "complexity": "moderate",
    "style": ["academic", "technical"],
    "audience": "Professional"
  },
  "insights": [
    {
      "type": "strength",
      "title": "Clear Structure",
      "description": "Your text has excellent organization..."
    }
  ],
  "plagiarismRisk": {
    "score": 15,
    "level": "low",
    "details": "Content shows low similarity to common patterns..."
  },
  "contentQuality": {
    "overall": 85,
    "clarity": 90,
    "coherence": 88,
    "engagement": 82,
    "originality": 87
  }
}
```



## Performance Optimizations

This application includes several performance optimizations to address Lighthouse issues:

### Build Optimizations
- **Code Splitting**: Automatic chunk splitting for vendor libraries
- **Minification**: Terser minification with console.log removal
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Optimized file naming and compression

### Runtime Optimizations
- **Service Worker**: Caching for offline functionality and faster loading
- **Font Optimization**: Preconnect to Google Fonts
- **Animation Optimization**: Respects `prefers-reduced-motion`
- **Lazy Loading**: Components loaded on demand

### SEO Improvements
- **Meta Tags**: Comprehensive SEO meta tags
- **Open Graph**: Social media sharing optimization
- **robots.txt**: Search engine crawling configuration
- **Semantic HTML**: Proper heading structure and accessibility

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AuthorCheck
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see [DEPLOYMENT.md](./DEPLOYMENT.md))

4. Start the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Lighthouse Score Improvements

The following optimizations have been implemented to improve Lighthouse scores:

### Performance (67 → Target: 90+)
- ✅ Code splitting and lazy loading
- ✅ Service worker caching
- ✅ Font optimization with preconnect
- ✅ Minification and compression
- ✅ Tree shaking for unused code

### Accessibility (98 → Target: 100)
- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Color contrast compliance
- ⚠️ Heading order (manual check required)

### Best Practices (96 → Target: 100)
- ✅ HTTPS enforcement
- ✅ Content Security Policy
- ✅ Modern JavaScript usage
- ⚠️ Console errors (check for any remaining)

### SEO (82 → Target: 90+)
- ✅ Meta description added
- ✅ robots.txt configured
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Semantic HTML structure

## Development

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   └── AnalysisDisplay.tsx
├── pages/              # Page components
├── services/           # API and service layer
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── config/             # Configuration files
```

### Key Technologies
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **React Router** for navigation
- **Service Worker** for caching

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details. 