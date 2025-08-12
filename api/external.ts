import { VercelRequest, VercelResponse } from "@vercel/node";

interface ExternalAPIRequest {
  text: string;
  timeout?: number;
}

// Security configuration
const MAX_TEXT_LENGTH = 10000; // Maximum text length (10KB)
const MAX_REQUESTS_PER_MINUTE = 60; // Rate limiting
const ALLOWED_ORIGINS = [
  "https://author-check-7ghtfiynu-shinkais-projects.vercel.app",
  "http://localhost:3000", // For development
  "http://localhost:5173", // For Vite dev server
  "https://author-check-one.vercel.app",
];

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Get environment variables
const API_KEY = process.env.API_KEY || "";
const MODEL = process.env.MODEL || "gemini-2.0-flash";
const ENDPOINT =
  process.env.ENDPOINT ||
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const AI_TIMEOUT = parseInt(process.env.AI_TIMEOUT || "30000");

/**
 * Security: Rate limiting
 */
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window

  const userLimit = rateLimitMap.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    // Reset or create new limit window
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (userLimit.count >= MAX_REQUESTS_PER_MINUTE) {
    return false; // Rate limit exceeded
  }

  userLimit.count++;
  return true;
}

/**
 * Security: Input validation and sanitization
 */
function validateAndSanitizeInput(text: string): string {
  if (!text || typeof text !== "string") {
    throw new Error("Invalid text input");
  }

  // Check length
  if (text.length > MAX_TEXT_LENGTH) {
    throw new Error(
      `Text too long. Maximum ${MAX_TEXT_LENGTH} characters allowed`
    );
  }

  // Remove potential malicious content
  const sanitized = text
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // Remove control characters
    .trim();

  if (sanitized.length === 0) {
    throw new Error("Text cannot be empty after sanitization");
  }

  return sanitized;
}

/**
 * Security: CORS validation
 */
function validateOrigin(req: VercelRequest): boolean {
  const origin = req.headers.origin;
  const referer = req.headers.referer;

  // Allow requests without origin/referer for testing (but log them)
  if (!origin && !referer) {
    console.warn("Request without origin or referer header");
    return true; // Allow for API testing, but you might want to restrict this
  }

  const requestOrigin = origin || (referer ? new URL(referer).origin : "");

  return ALLOWED_ORIGINS.some(
    (allowedOrigin) =>
      requestOrigin === allowedOrigin ||
      (allowedOrigin.includes("localhost") &&
        requestOrigin.includes("localhost"))
  );
}

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
  // Security: Set security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  // Security: CORS validation
  if (!validateOrigin(req)) {
    console.warn(
      `Blocked request from unauthorized origin: ${
        req.headers.origin || req.headers.referer
      }`
    );
    return res.status(403).json({ error: "Forbidden: Invalid origin" });
  }

  // Security: Rate limiting (apply to all requests including GET)
  const clientIP =
    req.headers["x-forwarded-for"] || req.headers["x-real-ip"] || "unknown";
  const identifier = Array.isArray(clientIP) ? clientIP[0] : clientIP;

  if (!checkRateLimit(identifier)) {
    console.warn(
      `Rate limit exceeded for IP: ${identifier} on ${req.method} request`
    );
    return res.status(429).json({
      error: "Too many requests",
      details: `Maximum ${MAX_REQUESTS_PER_MINUTE} requests per minute allowed`,
    });
  }

  // Handle GET requests - redirect to home page (after rate limit check)
  if (req.method === "GET") {
    console.log(`GET request redirected for IP: ${identifier}`);
    return res.redirect(302, "/");
  }

  // Only allow POST requests for API functionality
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Security: Check Content-Type
  const contentType = req.headers["content-type"];
  if (!contentType || !contentType.includes("application/json")) {
    return res
      .status(400)
      .json({ error: "Invalid Content-Type. Expected application/json" });
  }

  try {
    const { text, timeout = AI_TIMEOUT }: ExternalAPIRequest = req.body;

    // Security: Input validation
    let sanitizedText: string;
    try {
      sanitizedText = validateAndSanitizeInput(text);
    } catch (validationError) {
      return res.status(400).json({
        error: "Invalid input",
        details:
          validationError instanceof Error
            ? validationError.message
            : "Validation failed",
      });
    }

    // Security: Validate timeout
    const validTimeout = Math.min(Math.max(timeout, 5000), 60000); // Between 5s and 60s

    if (!API_KEY) {
      console.error("API key not configured");
      return res.status(500).json({ error: "Service temporarily unavailable" });
    }

    // Build the analysis prompt with sanitized input
    const prompt = buildAnalysisPrompt(sanitizedText);

    // Create the Gemini request
    const geminiRequest = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    };

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), validTimeout);

    // Make the external API request to Gemini with security headers
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY,
        "User-Agent": "AuthorCheck/1.0.0",
      },
      body: JSON.stringify(geminiRequest),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Gemini API error: ${response.status} ${response.statusText}`,
        errorText
      );

      // Don't expose internal API errors to client
      return res.status(500).json({
        error: "External service error",
        details: "The analysis service is temporarily unavailable",
      });
    }

    const result = await response.json();

    if (result.error) {
      console.error("Gemini API returned error:", result.error);
      return res.status(500).json({
        error: "Analysis failed",
        details: "Unable to process the text analysis",
      });
    }

    // Parse the Gemini response
    const responseText =
      result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!responseText) {
      console.error("Empty response from Gemini API");
      return res.status(500).json({
        error: "Analysis failed",
        details: "No analysis data received",
      });
    }

    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in Gemini response");
      }

      const analysisData = JSON.parse(jsonMatch[0]);

      // Security: Validate response data structure
      if (!analysisData || typeof analysisData !== "object") {
        throw new Error("Invalid analysis data structure");
      }

      // Log successful request (without sensitive data)
      console.log(
        `Analysis completed for IP: ${identifier}, text length: ${sanitizedText.length}`
      );

      // Return the result with success status
      return res.status(200).json({
        success: true,
        data: analysisData,
        model: MODEL, // Include model info for debugging
        timestamp: new Date().toISOString(),
      });
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", parseError);
      return res.status(500).json({
        error: "Analysis processing failed",
        details: "Unable to parse the analysis results",
      });
    }
  } catch (error) {
    // Security: Log errors without exposing sensitive information
    const errorId =
      Date.now().toString(36) + Math.random().toString(36).substr(2);
    console.error(`Error ID ${errorId}:`, error);

    if (error instanceof Error && error.name === "AbortError") {
      return res.status(408).json({
        error: "Request timeout",
        errorId,
      });
    }

    // Generic error response - don't expose internal details
    return res.status(500).json({
      error: "Internal server error",
      details: "An unexpected error occurred while processing your request",
      errorId,
    });
  }
}
