import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { BrainIcon, ZapIcon, ShieldIcon, BarChartIcon } from '../components/ui/Icons';
import { Navbar } from '../components/ui/Navbar';

export const LearnMore = () => {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 relative overflow-hidden">
      <Navbar />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Discover the Power of AI Text Analysis
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            AuthorCheck helps you unlock insights from your writing with advanced AI, beautiful reports, and multi-model support. Learn how it can help you become a better writer, researcher, or content creator.
          </p>
          <Link to="/analyze">
            <Button variant="primary" size="lg">
              <span className="flex items-center gap-2">
                <ZapIcon size={20} />
                <span>Try It Now</span>
              </span>
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <div className="flex items-center space-x-4 mb-3">
              <BarChartIcon size={28} className="text-primary-500" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Comprehensive Analysis</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Get detailed statistics on word count, readability, sentiment, and more. Visualize your text with beautiful charts and graphs.
            </p>
          </Card>
          <Card>
            <div className="flex items-center space-x-4 mb-3">
              <ShieldIcon size={28} className="text-futuristic-purple" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Authorship & Style Insights</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Analyze writing style, detect authorship, and get AI-powered suggestions to improve your content.
            </p>
          </Card>
          <Card>
            <div className="flex items-center space-x-4 mb-3">
              <ZapIcon size={28} className="text-futuristic-cyan" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Multi-Model AI Support</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              AuthorCheck supports multiple AI models (Gemini, OpenAI, Claude, and more), but only the app owner or developer team can add or change which models are available. Users cannot configure or add their own models.
            </p>
          </Card>
          <Card>
            <div className="flex items-center space-x-4 mb-3">
              <BrainIcon size={28} className="text-futuristic-pink" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Beautiful, Accessible Reports</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Enjoy a modern, accessible UI with dark mode, responsive design, and exportable results.
            </p>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Is my data secure?</h4>
              <p className="text-gray-600 dark:text-gray-400">Yes! AuthorCheck never stores your text. All analysis is performed securely and privately.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Can I use my own AI model?</h4>
              <p className="text-gray-600 dark:text-gray-400">No, only the app owner or developer team can add or change which AI models are supported. AuthorCheck is not a user-configurable app for adding custom models.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Is it free?</h4>
              <p className="text-gray-600 dark:text-gray-400">AuthorCheck is free to use for basic analysis. Some advanced features may require an API key or subscription.</p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/">
            <Button variant="outline" size="md">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}; 