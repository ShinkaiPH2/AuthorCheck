# AuthorCheck Deployment Guide

This guide covers deploying AuthorCheck with support for multiple LLM providers.

## Environment Configuration

### 1. Create Environment File

Create a `.env` file in your project root with the following variables:

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

# App Configuration
VITE_APP_NAME=AuthorCheck
VITE_APP_DESCRIPTION=AI-Powered Text Analysis Tool
VITE_APP_VERSION=1.0.0

# Performance Settings
VITE_AI_TIMEOUT=30000
VITE_AI_FALLBACK_ENABLED=true
```

### 2. Get API Keys

#### Google Gemini
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key to `VITE_GEMINI_API_KEY`

#### OpenAI
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in to your OpenAI account
3. Click "Create new secret key"
4. Copy the generated key to `VITE_OPENAI_API_KEY`

#### Anthropic Claude
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign in to your Anthropic account
3. Navigate to API Keys section
4. Create a new API key and copy it to `VITE_CLAUDE_API_KEY`

## Deployment Options

### 1. Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set Environment Variables** in Vercel dashboard:
   - Go to your project settings
   - Add all environment variables from your `.env` file

### 2. Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - Drag the `dist` folder to Netlify
   - Or use Netlify CLI: `netlify deploy --prod`

3. **Set Environment Variables** in Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add all variables from your `.env` file

### 3. GitHub Pages

1. **Add GitHub Actions workflow** (`.github/workflows/deploy.yml`):
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: npm ci
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

2. **Set Environment Variables** as GitHub Secrets:
   - Go to repository Settings > Secrets and variables > Actions
   - Add all environment variables

### 4. Docker

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine as builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=builder /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create nginx.conf**:
   ```nginx
   events {
       worker_connections 1024;
   }
   http {
       include /etc/nginx/mime.types;
       default_type application/octet-stream;
       
       server {
           listen 80;
           server_name localhost;
           root /usr/share/nginx/html;
           index index.html;
           
           location / {
               try_files $uri $uri/ /index.html;
           }
       }
   }
   ```

3. **Build and run**:
   ```bash
   docker build -t authorcheck .
   docker run -p 80:80 -e VITE_AI_TYPE=gemini -e VITE_GEMINI_API_KEY=your_key authorcheck
   ```

## Security Best Practices

### 1. API Key Security
- ✅ Use environment variables (never commit API keys)
- ✅ Rotate API keys regularly
- ✅ Use least-privilege API keys
- ✅ Monitor API usage and costs

### 2. CORS Configuration
- ✅ Configure CORS for your domain
- ✅ Use HTTPS in production
- ✅ Implement rate limiting

### 3. Content Security Policy
The app includes a CSP header. Update it for your domain:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;">
```

## Performance Optimization

### 1. Build Optimization
```bash
# Production build with optimizations
npm run build

# Analyze bundle size
npm run build -- --analyze
```

### 2. Caching Strategy
- ✅ Service worker for offline functionality
- ✅ Static asset caching
- ✅ API response caching (implement in your backend)

### 3. CDN Configuration
- ✅ Use a CDN for static assets
- ✅ Enable gzip compression
- ✅ Set appropriate cache headers

## Monitoring and Analytics

### 1. Error Tracking
Consider adding error tracking:
- Sentry for error monitoring
- Google Analytics for usage tracking
- Custom logging for API calls

### 2. Performance Monitoring
- Lighthouse CI for performance tracking
- Web Vitals monitoring
- API response time tracking

## Troubleshooting

### Common Issues

1. **API Key Errors**:
   - Verify API key is correct
   - Check API key permissions
   - Ensure proper environment variable format

2. **CORS Errors**:
   - Configure CORS on your API endpoints
   - Use HTTPS in production
   - Check domain whitelist

3. **Build Errors**:
   - Clear node_modules and reinstall
   - Check Node.js version (requires 16+)
   - Verify all dependencies are installed

### Support

For issues specific to LLM providers:
- **Gemini**: [Google AI Studio Support](https://ai.google.dev/support)
- **OpenAI**: [OpenAI Help Center](https://help.openai.com/)
- **Claude**: [Anthropic Support](https://support.anthropic.com/)

## Cost Optimization

### API Usage Tips
1. **Monitor usage** with provider dashboards
2. **Set usage limits** to prevent unexpected charges
3. **Use appropriate models** for your use case
4. **Implement caching** to reduce API calls
5. **Consider fallback** to local analysis for basic features

### Estimated Costs (per 1M tokens)
- **Gemini**: ~$0.50-2.00
- **OpenAI GPT-4**: ~$30-60
- **Claude**: ~$15-25

*Prices may vary. Check current pricing on provider websites.* 