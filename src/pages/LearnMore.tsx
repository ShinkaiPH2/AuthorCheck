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
        <div className="text-center mb-12 sm:mb-16 md:mb-20 animate-slide-up overflow-visible">
          <div className="relative mb-6 sm:mb-8 overflow-visible">
            <h1 className="relative z-20 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-[1.2] pb-2 overflow-visible animate-shimmer bg-gradient-to-r from-primary-400 via-secondary-400 to-futuristic-cyan bg-clip-text text-transparent dark:from-primary-400 dark:via-secondary-400 dark:to-futuristic-cyan drop-shadow-[0_2px_6px_rgba(60,60,60,0.10)] dark:drop-shadow-[0_2px_12px_rgba(80,180,255,0.25)]">
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

        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mt-12 mb-8">
          <a href="https://discord.gg/your-invite" target="_blank" rel="noopener noreferrer" aria-label="Discord">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.07.07 0 0 0-.073.035c-.211.375-.444.864-.608 1.249a18.524 18.524 0 0 0-5.487 0 12.683 12.683 0 0 0-.617-1.25.07.07 0 0 0-.073-.035A19.736 19.736 0 0 0 3.677 4.369a.064.064 0 0 0-.03.027C.533 8.083-.32 11.635.099 15.142a.08.08 0 0 0 .028.056c2.052 1.507 4.042 2.422 5.992 3.029a.077.077 0 0 0 .084-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.041-.104c-.652-.247-1.27-.549-1.872-.892a.077.077 0 0 1-.008-.127c.126-.094.252-.192.371-.291a.07.07 0 0 1 .068-.01c3.927 1.793 8.18 1.793 12.061 0a.07.07 0 0 1 .069.009c.12.099.245.198.372.292a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.873.891.076.076 0 0 0-.04.105c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028c1.961-.607 3.951-1.522 6.003-3.029a.077.077 0 0 0 .028-.055c.5-4.073-.838-7.601-3.548-10.746a.061.061 0 0 0-.03-.028ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419Z" fill="#5865F2"/></svg>
          </a>
          <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.46 5.924c-.793.352-1.646.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.482 0-4.495 2.014-4.495 4.495 0 .352.04.695.116 1.022C7.728 9.37 4.1 7.555 1.67 4.965a4.48 4.48 0 0 0-.608 2.262c0 1.56.795 2.936 2.006 3.744a4.48 4.48 0 0 1-2.037-.563v.057c0 2.18 1.55 4.002 3.604 4.417a4.48 4.48 0 0 1-2.03.077c.573 1.788 2.24 3.09 4.213 3.126A8.98 8.98 0 0 1 2 19.54a12.68 12.68 0 0 0 6.88 2.017c8.253 0 12.77-6.837 12.77-12.77 0-.195-.004-.39-.013-.583A9.13 9.13 0 0 0 24 4.59a8.93 8.93 0 0 1-2.54.698Z" fill="#1DA1F2"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}; 