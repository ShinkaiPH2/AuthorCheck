import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { BrainIcon, ZapIcon, ShieldIcon, BarChartIcon } from '../components/ui/Icons';
import { Navbar } from '../components/ui/Navbar';

export const LearnMore = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 relative overflow-hidden">
      <Navbar />
      {/* Interactive Parallax Blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] bg-futuristic-cyan/30 dark:bg-futuristic-cyan/20 rounded-full blur-3xl animate-pulse-slow left-[-20vw] top-[-10vh]" />
        <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] bg-futuristic-purple/30 dark:bg-futuristic-purple/20 rounded-full blur-2xl animate-pulse-slow right-[-10vw] top-[30vh]" />
        <div className="absolute w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] bg-futuristic-pink/20 dark:bg-futuristic-pink/10 rounded-full blur-2xl animate-pulse-slow left-[50vw] top-[70vh]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-12 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 animate-slide-up">
          <div className="relative mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 animate-shimmer bg-gradient-to-r from-primary-600 via-secondary-600 to-futuristic-cyan bg-clip-text text-transparent break-words">
              Discover the <span className="inline-block animate-parallax-x">Power of AI</span>
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 via-secondary-600/20 to-futuristic-cyan/20 blur-3xl -z-10" />
          </div>
          <p className="text-base sm:text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl sm:max-w-4xl mx-auto leading-relaxed animate-fade-in">
            AuthorCheck helps you unlock insights from your writing with advanced AI, beautiful reports, and multi-model support. Learn how it can help you become a better writer, researcher, or content creator.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-lg mx-auto">
            <Link to="/analyze" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto group relative overflow-hidden animate-glow-pulse">
                <span className="relative z-10 flex items-center space-x-2">
                  <ZapIcon size={20} className="animate-pulse" />
                  <span>Try It Now</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-futuristic-cyan to-futuristic-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
            <Link to="/" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto group animate-fade-in">
                <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  Back to Home
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 md:mb-20">
          <Card className="group animate-fade-in bg-white dark:bg-gray-900">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse-slow">
                  <BarChartIcon size={32} className="text-white animate-bounce-slow" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Comprehensive Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Get detailed statistics on word count, readability, sentiment, and more. Visualize your text with beautiful charts and graphs.
              </p>
            </div>
          </Card>
          <Card className="group animate-fade-in bg-white dark:bg-gray-900">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-futuristic-cyan to-futuristic-blue rounded-2xl flex items-center justify-center mx-auto animate-pulse-slow">
                  <ShieldIcon size={32} className="text-white animate-spin-slow" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Authorship & Style Insights</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Analyze writing style, detect authorship, and get AI-powered suggestions to improve your content.
              </p>
            </div>
          </Card>
          <Card className="group animate-fade-in bg-white dark:bg-gray-900">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-futuristic-purple to-futuristic-pink rounded-2xl flex items-center justify-center mx-auto animate-pulse-slow">
                  <ZapIcon size={32} className="text-white animate-wiggle-slow" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Multi-Model AI Support</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                AuthorCheck supports multiple AI models (Gemini, OpenAI, Claude, and more), but only the app owner or developer team can add or change which models are available.
              </p>
            </div>
          </Card>
          <Card className="group animate-fade-in bg-white dark:bg-gray-900">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-futuristic-green to-futuristic-orange rounded-2xl flex items-center justify-center mx-auto animate-pulse-slow">
                  <BrainIcon size={32} className="text-white animate-bounce-slow" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Beautiful, Accessible Reports</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Enjoy a modern, accessible UI with dark mode, responsive design, and exportable results.
              </p>
            </div>
          </Card>
        </div>

        {/* Advanced Features Section */}
        <Card className="mb-20 relative overflow-hidden animate-fade-in bg-white dark:bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5" />
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 animate-fade-in">
              Advanced AI Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group animate-slide-up">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2 animate-shimmer">
                  Emotion
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-lg">Analysis</div>
              </div>
              <div className="group animate-slide-up">
                <div className="text-5xl font-bold bg-gradient-to-r from-futuristic-cyan to-futuristic-blue bg-clip-text text-transparent mb-2 animate-shimmer">
                  AI
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-lg">Insights</div>
              </div>
              <div className="group animate-slide-up">
                <div className="text-5xl font-bold bg-gradient-to-r from-futuristic-purple to-futuristic-pink bg-clip-text text-transparent mb-2 animate-shimmer">
                  Style
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-lg">Detection</div>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="mb-20 relative overflow-hidden animate-fade-in bg-white dark:bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-r from-futuristic-cyan/5 to-futuristic-purple/5" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center animate-fade-in">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="group">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Is my data secure?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Yes! AuthorCheck never stores your text. All analysis is performed securely and privately.
                  </p>
                </div>
                <div className="group">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Can I use my own AI model?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    No, only the app owner or developer team can add or change which AI models are supported. AuthorCheck is not a user-configurable app for adding custom models.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="group">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Is it free?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    AuthorCheck is free to use for basic analysis. Some advanced features may require an API key or subscription.
                  </p>
                </div>
                <div className="group">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    What file types are supported?
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    We support common text formats including .txt, .md, .csv, .json, .xml, .log, .html, .rtf, .doc, .docx, and .pdf files.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center relative animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-3xl blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in">
              Experience the power of AI-driven text analysis and unlock insights from your writing today.
            </p>
            <Link to="/analyze">
              <Button variant="primary" size="lg" className="group relative overflow-hidden animate-glow-pulse">
                <span className="relative z-10 flex items-center space-x-2">
                  <BarChartIcon size={20} />
                  <span>Start Free Analysis</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-futuristic-cyan via-futuristic-purple to-futuristic-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 