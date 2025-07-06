import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { BrainIcon, ZapIcon, ShieldIcon, BarChartIcon } from '../components/ui/Icons';
import { Navbar } from '../components/ui/Navbar';

export const Homepage = () => {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 relative overflow-hidden">
      <Navbar />
      {/* Interactive Parallax Blobs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute w-[600px] h-[600px] bg-futuristic-cyan/30 dark:bg-futuristic-cyan/20 rounded-full blur-3xl"
        />
        <div
          className="absolute w-[400px] h-[400px] bg-futuristic-purple/30 dark:bg-futuristic-purple/20 rounded-full blur-2xl"
        />
        <div
          className="absolute w-[300px] h-[300px] bg-futuristic-pink/20 dark:bg-futuristic-pink/10 rounded-full blur-2xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-slide-up">
          <div className="relative mb-8">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-shimmer bg-gradient-to-r from-primary-600 via-secondary-600 to-futuristic-cyan bg-clip-text text-transparent">
              AI-Powered <span className="inline-block animate-parallax-x">Text Analysis</span>
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 via-secondary-600/20 to-futuristic-cyan/20 blur-3xl -z-10" />
          </div>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in">
            Advanced AI-powered text analysis tool for writers, researchers, and content creators. Analyze writing patterns, detect authorship, and get insights into text quality with cutting-edge technology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/analyze">
              <Button variant="primary" size="lg" className="group relative overflow-hidden animate-glow-pulse">
                <span className="relative z-10 flex items-center space-x-2">
                  <ZapIcon size={20} className="animate-pulse" />
                  <span>Start Analysis</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-futuristic-cyan to-futuristic-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
            <Link to="/learn-more">
              <Button variant="outline" size="lg" className="group animate-fade-in">
                <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  Learn More
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <Card className="group animate-fade-in bg-white dark:bg-gray-900">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto animate-pulse-slow">
                  <BrainIcon size={32} className="text-white animate-bounce-slow" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">AI Text Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Comprehensive analysis of word count, readability, sentence structure, and advanced linguistic patterns.
              </p>
            </div>
          </Card>
          <Card className="group animate-fade-in bg-white dark:bg-gray-900">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-futuristic-cyan to-futuristic-blue rounded-2xl flex items-center justify-center mx-auto animate-pulse-slow">
                  <ZapIcon size={32} className="text-white animate-spin-slow" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Sentiment Detection</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Advanced sentiment analysis to understand the emotional tone and context of your text content.
              </p>
            </div>
          </Card>
          <Card className="group animate-fade-in bg-white dark:bg-gray-900">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-futuristic-purple to-futuristic-pink rounded-2xl flex items-center justify-center mx-auto animate-pulse-slow">
                  <ShieldIcon size={32} className="text-white animate-wiggle-slow" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Authorship Features</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Analyze writing patterns and stylistic features for advanced authorship detection and analysis.
              </p>
            </div>
          </Card>
        </div>

        {/* Statistics Section */}
        <Card className="mb-20 relative overflow-hidden animate-fade-in bg-white dark:bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5" />
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 animate-fade-in">
              Trusted by Writers Worldwide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group animate-slide-up">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2 animate-shimmer">
                  10,000+
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-lg">Texts Analyzed</div>
              </div>
              <div className="group animate-slide-up">
                <div className="text-5xl font-bold bg-gradient-to-r from-futuristic-cyan to-futuristic-blue bg-clip-text text-transparent mb-2 animate-shimmer">
                  95%
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-lg">Accuracy Rate</div>
              </div>
              <div className="group animate-slide-up">
                <div className="text-5xl font-bold bg-gradient-to-r from-futuristic-purple to-futuristic-pink bg-clip-text text-transparent mb-2 animate-shimmer">
                  50+
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-lg">Analysis Features</div>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center relative animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-3xl blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
              Ready to Analyze Your Text?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto animate-fade-in">
              Get started with our powerful text analysis tools today and unlock the secrets hidden in your writing.
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
      {/* Custom CSS Animations (add to index.css or global styles) */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -500px 0; }
          100% { background-position: 500px 0; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2.5s linear infinite;
        }
        @keyframes parallaxX {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(12px); }
        }
        .animate-parallax-x {
          display: inline-block;
          animation: parallaxX 3s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: none; }
        }
        .animate-fade-in {
          animation: fadeIn 1s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(48px); }
          to { opacity: 1; transform: none; }
        }
        .animate-slide-up {
          animation: slideUp 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        .animate-float-slow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulseSlow 2.5s cubic-bezier(0.4,0,0.2,1) infinite;
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.2); }
          50% { box-shadow: 0 0 24px 8px rgba(99,102,241,0.25); }
        }
        .animate-glow-pulse {
          animation: glowPulse 2.5s cubic-bezier(0.4,0,0.2,1) infinite;
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2.2s cubic-bezier(0.4,0,0.2,1) infinite;
        }
        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 4s linear infinite;
        }
        @keyframes wiggleSlow {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(6deg); }
        }
        .animate-wiggle-slow {
          animation: wiggleSlow 2.5s ease-in-out infinite;
        }
        .animate-glow {
          box-shadow: 0 0 24px 4px rgba(99,102,241,0.18), 0 0 0 0 rgba(0,0,0,0.05);
        }
        .bg-futuristic-cyan\/30 { background-color: rgba(34,211,238,0.3); }
        .bg-futuristic-purple\/30 { background-color: rgba(168,85,247,0.3); }
        .bg-futuristic-pink\/20 { background-color: rgba(236,72,153,0.2); }
      `}</style>
    </div>
  );
};
