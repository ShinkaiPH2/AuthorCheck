import { useState, KeyboardEvent } from 'react';
import { TextAnalysis } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { BarChartIcon, FileTextIcon, RobotIcon, LightbulbIcon, TargetIcon, TrendingUpIcon, AlertTriangleIcon, CheckCircleIcon, ShieldIcon, BrainIcon } from '../ui/Icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

interface AnalysisDisplayProps {
  analysis: TextAnalysis | null;
  isAnalyzing: boolean;
  hasText: boolean;
}

export const AnalysisDisplay = ({ analysis, isAnalyzing, hasText }: AnalysisDisplayProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'ai-insights'>('overview');
  const { theme } = useTheme();

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const tabs = ['overview', 'analysis', 'ai-insights'] as const;
    const currentIndex = tabs.indexOf(activeTab);
    
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex]);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
      setActiveTab(tabs[prevIndex]);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="space-y-6">
        <Card>
          <div className="text-center py-12">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center mx-auto">
                <BrainIcon size={32} className="text-white" />
              </div>
            </div>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              {hasText ? 'Analyzing your text...' : 'Processing...'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {hasText ? 'Our AI is analyzing your content for insights' : 'Please wait while we prepare the analysis'}
            </p>
            <div className="mt-6 space-y-3">
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mx-auto"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="space-y-6">
        <Card>
          <div className="text-center text-gray-500 dark:text-gray-400 py-12">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-2xl flex items-center justify-center mx-auto">
                <FileTextIcon size={32} className="text-gray-400 dark:text-gray-500" />
              </div>
            </div>
            <p className="text-lg font-medium">Enter text to see analysis results</p>
            <p className="text-sm mt-2">
              {hasText 
                ? 'Type at least 10 characters for automatic analysis' 
                : 'Paste your content and start typing to get started'
              }
            </p>
          </div>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: FileTextIcon },
    { id: 'analysis' as const, label: 'Detailed Analysis', icon: BarChartIcon },
    { id: 'ai-insights' as const, label: 'AI Insights', icon: RobotIcon },
  ];

  const chartData = [
    { name: 'Words', value: analysis.wordCount },
    { name: 'Sentences', value: analysis.sentenceCount },
    { name: 'Paragraphs', value: analysis.paragraphCount },
  ];

  const topWordsData = analysis.topWords.map(item => ({
    word: item.word,
    count: item.count,
  }));

  const COLORS_LIGHT = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
  const COLORS_DARK = ['#818cf8', '#a78bfa', '#22d3ee', '#34d399', '#fbbf24'];
  const COLORS = theme === 'dark' ? COLORS_DARK : COLORS_LIGHT;

  // AI Analysis Data
  const contentQualityData = [
    { metric: 'Clarity', value: analysis.aiAnalysis.contentQuality.clarity },
    { metric: 'Coherence', value: analysis.aiAnalysis.contentQuality.coherence },
    { metric: 'Engagement', value: analysis.aiAnalysis.contentQuality.engagement },
    { metric: 'Originality', value: analysis.aiAnalysis.contentQuality.originality },
  ];

  // Simple label renderer for PieChart (light/dark mode only)
  const renderSimpleLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    word
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    outerRadius: number;
    percent: number;
    word: string;
  }) => {
    const RADIAN = Math.PI / 180;
    const labelRadius = outerRadius + 24;
    const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
    const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);
    const fill = theme === 'dark' ? '#fff' : '#111';
    return (
      <text
        x={x}
        y={y}
        fill={fill}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontWeight={600}
        fontSize={14}
      >
        {`${word} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div 
        className="flex overflow-x-auto no-scrollbar space-x-2 sm:space-x-3 p-1 sm:p-3 bg-white/90 dark:bg-gray-900/80 rounded-2xl border-2 border-primary-300 dark:border-gray-700/70 shadow-2xl dark:shadow-lg transition-all duration-300 max-w-full"
        role="tablist" 
        aria-label="Analysis tabs"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            id={`${tab.id}-tab`}
            onClick={() => setActiveTab(tab.id)}
            className={`min-w-[100px] sm:min-w-[120px] flex-1 px-2 sm:px-4 py-2 rounded-xl border border-primary-400 transition-colors duration-200 flex items-center space-x-2 group text-sm sm:text-base
              ${activeTab === tab.id
                ? 'bg-gradient-to-r from-futuristic-cyan to-futuristic-purple text-white dark:bg-gradient-to-r dark:from-futuristic-darkblue dark:to-futuristic-darkpurple dark:text-white'
                : 'bg-transparent text-primary-300 dark:text-primary-200'
              }`
            }
            aria-selected={activeTab === tab.id}
            role="tab"
            aria-controls={`${tab.id}-panel`}
            style={{ touchAction: 'manipulation' }}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* Tab Content */}

      {activeTab === 'overview' && (
        <div className="space-y-6" role="tabpanel" id="overview-panel" aria-labelledby="overview-tab">
          {/* AI vs Human Classification Card */}
          <Card>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-800 dark:text-gray-200 flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-futuristic-cyan to-futuristic-purple rounded-lg flex items-center justify-center">
                <RobotIcon size={14} className="text-white" />
              </div>
              <span>AI vs Human</span>
            </h3>
            <div className="flex items-center space-x-4">
              <span className={`text-xl font-bold capitalize ${
                analysis.aiAnalysis?.aiOrHuman === 'ai'
                  ? 'text-blue-600 dark:text-blue-400'
                  : analysis.aiAnalysis?.aiOrHuman === 'human'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {analysis.aiAnalysis?.aiOrHuman === 'ai'
                  ? 'AI-Generated'
                  : analysis.aiAnalysis?.aiOrHuman === 'human'
                  ? 'Human-Generated'
                  : 'Unknown'}
              </span>
              {typeof analysis.aiAnalysis?.aiOrHumanConfidence === 'number' && (
                <span className="text-sm text-gray-500">
                  {analysis.aiAnalysis.aiOrHumanConfidence}% confidence
                </span>
              )}
            </div>
            {analysis.aiAnalysis?.aiOrHumanExplanation && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {analysis.aiAnalysis.aiOrHumanExplanation}
              </p>
            )}
          </Card>

          {/* Text Statistics Card */}
          <Card>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-800 dark:text-gray-200 flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <BarChartIcon size={14} className="text-white" />
              </div>
              <span>Text Statistics</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center group">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">{analysis.wordCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl font-bold bg-gradient-to-r from-futuristic-cyan to-futuristic-blue bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">{analysis.sentenceCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Sentences</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl font-bold bg-gradient-to-r from-futuristic-purple to-futuristic-pink bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">{analysis.paragraphCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Paragraphs</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl font-bold bg-gradient-to-r from-futuristic-green to-futuristic-orange bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">{analysis.estimatedReadingTime}min</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Read Time</div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Readability & Sentiment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Readability Score</span>
                  <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{analysis.readabilityScore}/100</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${analysis.readabilityScore}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sentiment</span>
                  <span className={`text-sm font-bold capitalize ${
                    analysis.sentiment.label === 'positive' ? 'text-green-600 dark:text-green-400' :
                    analysis.sentiment.label === 'negative' ? 'text-red-600 dark:text-red-400' :
                    'text-gray-600 dark:text-gray-400'
                  }`}>
                    {analysis.sentiment.label}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Score: {analysis.sentiment.score}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Top Words</h3>
            {analysis.topWords.length > 0 ? (
              <div className="space-y-3">
                {analysis.topWords.map(word => (
                  <div key={word.word} className="flex items-center justify-between group/item">
                    <span className="font-medium text-gray-700 dark:text-gray-300 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 transition-colors">{word.word}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-futuristic-cyan to-futuristic-purple h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(word.count / analysis.topWords[0].count) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-6 text-right">{word.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-4">No significant words found</p>
            )}
          </Card>
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="space-y-6" role="tabpanel" id="analysis-panel" aria-labelledby="analysis-tab">
          <Card>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Text Structure</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                  />
                  <Bar dataKey="value" fill="url(#gradient)" />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Authorship Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg Words/Sentence</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{analysis.authorshipFeatures.avgWordsPerSentence}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg Sentences/Paragraph</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{analysis.authorshipFeatures.avgSentencesPerParagraph}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Complexity Score</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{analysis.authorshipFeatures.complexityScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Vocabulary Richness</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{analysis.authorshipFeatures.vocabularyRichness}%</span>
                </div>
              </div>
            </div>
          </Card>

          {analysis.topWords.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Word Frequency Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topWordsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderSimpleLabel}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {topWordsData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme === 'dark' ? '#1e293b' : '#f9fafb',
                        border: `1px solid ${theme === 'dark' ? '#818cf8' : '#6366f1'}`,
                        borderRadius: '8px',
                        color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
                        fontWeight: 500,
                        fontSize: 16,
                      }}
                      itemStyle={{
                        color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
                        fontWeight: 500,
                        fontSize: 16,
                      }}
                      labelStyle={{
                        color: theme === 'dark' ? '#a78bfa' : '#6366f1',
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'ai-insights' && (
        <div className="space-y-6" role="tabpanel" id="ai-insights-panel" aria-labelledby="ai-insights-tab">
          {/* Advanced Sentiment Analysis */}
          <Card>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-futuristic-cyan to-futuristic-blue rounded-lg flex items-center justify-center">
                <LightbulbIcon size={14} className="text-white" />
              </div>
              <span>Emotion Analysis</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Confidence</span>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{analysis.aiAnalysis.advancedSentiment.confidence}%</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{analysis.aiAnalysis.advancedSentiment.context}</p>
              {analysis.aiAnalysis.advancedSentiment.emotions.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {analysis.aiAnalysis.advancedSentiment.emotions.map(emotion => (
                    <div key={emotion.emotion} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{emotion.emotion}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-futuristic-cyan to-futuristic-purple h-1.5 rounded-full"
                            style={{ width: `${emotion.score * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{Math.round(emotion.score * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {/* Topics Detection */}
          {analysis.aiAnalysis.topics.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-futuristic-purple to-futuristic-pink rounded-lg flex items-center justify-center">
                  <TargetIcon size={14} className="text-white" />
                </div>
                <span>Detected Topics</span>
              </h3>
              <div className="space-y-3">
                {analysis.aiAnalysis.topics.map(topic => (
                  <div key={topic.topic} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{topic.topic}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {topic.keywords.slice(0, 3).map((keyword, idx) => (
                          <span key={idx} className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{Math.round(topic.relevance * 100)}%</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Writing Style Analysis */}
          <Card>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-futuristic-green to-futuristic-orange rounded-lg flex items-center justify-center">
                <TrendingUpIcon size={14} className="text-white" />
              </div>
              <span>Writing Style</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tone</span>
                  <div className="font-medium text-gray-800 dark:text-gray-200">{analysis.aiAnalysis.writingStyle.tone}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Formality</span>
                  <div className="font-medium text-gray-800 dark:text-gray-200 capitalize">{analysis.aiAnalysis.writingStyle.formality}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Complexity</span>
                  <div className="font-medium text-gray-800 dark:text-gray-200 capitalize">{analysis.aiAnalysis.writingStyle.complexity}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Target Audience</span>
                  <div className="font-medium text-gray-800 dark:text-gray-200">{analysis.aiAnalysis.writingStyle.audience}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Content Quality Radar Chart */}
          <Card>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Content Quality Analysis</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={contentQualityData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
                  <PolarRadiusAxis stroke="#6b7280" />
                  <Radar
                    name="Quality Score"
                    dataKey="value"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.3}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* AI Insights */}
          {analysis.aiAnalysis.insights.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-futuristic-cyan to-futuristic-purple rounded-lg flex items-center justify-center">
                  <RobotIcon size={14} className="text-white" />
                </div>
                <span>AI Insights</span>
              </h3>
              <div className="space-y-4">
                {analysis.aiAnalysis.insights.map((insight, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-start sm:space-x-3 space-y-2 sm:space-y-0 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex-shrink-0 mt-1">
                      {insight.type === 'strength' ? (
                        <CheckCircleIcon size={16} className="text-green-500" />
                      ) : insight.type === 'improvement' ? (
                        <AlertTriangleIcon size={16} className="text-yellow-500" />
                      ) : (
                        <LightbulbIcon size={16} className="text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">{insight.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{insight.description}</p>
                      {insight.suggestion && (
                        <p className="text-sm text-primary-600 dark:text-primary-400 mt-2 font-medium">
                          💡 {insight.suggestion}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Plagiarism Risk */}
          <Card>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200 flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-futuristic-red to-futuristic-orange rounded-lg flex items-center justify-center">
                <ShieldIcon size={14} className="text-white" />
              </div>
              <span>Plagiarism Risk</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Risk Level</span>
                <span className={`text-sm font-bold capitalize ${
                  analysis.aiAnalysis.plagiarismRisk.level === 'low' ? 'text-green-600 dark:text-green-400' :
                  analysis.aiAnalysis.plagiarismRisk.level === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  {analysis.aiAnalysis.plagiarismRisk.level}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    analysis.aiAnalysis.plagiarismRisk.level === 'low' ? 'bg-green-500' :
                    analysis.aiAnalysis.plagiarismRisk.level === 'medium' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${analysis.aiAnalysis.plagiarismRisk.score}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{analysis.aiAnalysis.plagiarismRisk.details}</p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
