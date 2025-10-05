'use client';
import React from 'react';
import Header from '../../../../components/header';
import Footer from '../../../../components/footer';

const AiAndData = () => {
  return (
    <div className="min-h-screen bg-emerald-50">
      <Header />
      
      {/* Hero Section - Fixed padding for mobile header overlap */}
      <section className="relative px-4 sm:px-6 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-8 lg:pb-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
              AI &amp; Data Policy
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              How we use artificial intelligence and manage data within our investment platform.
            </p>
          </div>
        </div>
      </section>

      {/* AI & Data Content */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-gray-100">
            
            {/* Document Header */}
            <div className="text-center mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-gray-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">GRO EQUITY LTD - AI AND DATA POLICY</h2>
              <p className="text-base sm:text-lg text-gray-600">Effective Date: 04/10/2025</p>
              <p className="text-base sm:text-lg text-gray-600">Version: 1.0</p>
            </div>

            {/* AI & Data Content */}
            <div className="prose prose-gray max-w-none space-y-8 sm:space-y-12">
              
              {/* SECTION 1 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">1. PURPOSE AND SCOPE</h3>
                
                <div className="space-y-6">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    This AI and Data Policy explains how Gro Equity Ltd (&quot;Gro,&quot; &quot;we,&quot; &quot;us&quot;) uses artificial intelligence and manages data within our investment platform.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">Scope:</h4>
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed">This policy applies to all AI systems, algorithms, and data processing activities used to provide our services.</p>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">Key Principles:</h4>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                        <li>• Transparency in AI decision-making</li>
                        <li>• Fairness and non-discrimination</li>
                        <li>• Data accuracy and quality</li>
                        <li>• User control and oversight</li>
                        <li>• Regulatory compliance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">2. AI SYSTEMS WE USE</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">2.1 Portfolio Optimization AI</h4>
                    
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6 mb-4">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Purpose:</p>
                      <p className="text-base sm:text-lg text-gray-700">Generate personalized investment portfolios based on user goals</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Technology:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Black-Scholes models for option pricing and risk analysis</li>
                          <li>• Modern Portfolio Theory for asset allocation</li>
                          <li>• Monte Carlo simulations for scenario testing</li>
                          <li>• Graham&apos;s value investing principles for stock selection</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">How it Works:</h5>
                        <ol className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 list-decimal">
                          <li>Analyzes your financial goals, timeline, and risk tolerance</li>
                          <li>Runs thousands of market scenarios</li>
                          <li>Optimizes asset allocation for your specific objectives</li>
                          <li>Generates 5 custom portfolio options</li>
                          <li>Continuously monitors and rebalances</li>
                        </ol>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Data Used:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Your stated financial goals</li>
                          <li>• Investment timeline</li>
                          <li>• Risk tolerance assessment</li>
                          <li>• Current portfolio holdings</li>
                          <li>• Market data and historical performance</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Human Oversight:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• You choose which portfolio to implement</li>
                          <li>• Investment advisors review AI recommendations</li>
                          <li>• Regular audits of AI performance</li>
                          <li>• Override mechanisms for unusual recommendations</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">2.2 Goal Matching AI (OpenAI Integration)</h4>
                    
                    <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6 mb-4">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Purpose:</p>
                      <p className="text-base sm:text-lg text-gray-700">Interpret your financial goals in natural language and translate them into investment strategies</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Technology:</h5>
                        <p className="text-base sm:text-lg text-gray-700">OpenAI GPT-4 API for natural language processing</p>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">How it Works:</h5>
                        <ol className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 list-decimal">
                          <li>You describe your goals in plain English (e.g., &quot;Save for house deposit in 5 years&quot;)</li>
                          <li>AI extracts key information (goal type, timeline, amount needed)</li>
                          <li>Converts into quantitative investment parameters</li>
                          <li>Suggests contribution amounts and portfolio strategy</li>
                        </ol>
                      </div>

                      <div className="bg-green-50 rounded-2xl p-4 sm:p-6">
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Data Sent to OpenAI:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                          <li>• Your goal descriptions (text only)</li>
                          <li>• Anonymized user ID (no personally identifiable information)</li>
                          <li>• Investment preferences</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Data NOT Sent to OpenAI:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                          <li>• Your name, address, or contact information</li>
                          <li>• Bank account details</li>
                          <li>• National Insurance number</li>
                          <li>• Specific portfolio holdings or amounts</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Third-Party Processing:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• OpenAI processes goal text on their servers</li>
                          <li>• Subject to OpenAI&apos;s data policies and security measures</li>
                          <li>• Data encrypted in transit (TLS 1.3)</li>
                          <li>• We do not use your data to train OpenAI&apos;s models</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                        <p className="text-base sm:text-lg text-gray-700">
                          <strong>OpenAI Privacy Policy:</strong> <a href="https://openai.com/policies/privacy-policy" className="text-blue-600 underline">https://openai.com/policies/privacy-policy</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">2.3 Goal Training Personalization AI</h4>
                    
                    <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6 mb-4">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Purpose:</p>
                      <p className="text-base sm:text-lg text-gray-700">Adapt educational content to your learning style and goals</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">How it Works:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Tracks which lessons you complete</li>
                          <li>• Identifies knowledge gaps</li>
                          <li>• Recommends relevant content</li>
                          <li>• Adjusts difficulty based on performance</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Data Used:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Lesson completion rates</li>
                          <li>• Quiz scores and answers</li>
                          <li>• Time spent on content</li>
                          <li>• Goal types and progress</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">3. AI LIMITATIONS AND RISKS</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">3.1 What AI Cannot Do</h4>
                    
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Our AI systems:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Cannot predict future market performance with certainty</li>
                        <li>• Cannot guarantee investment returns</li>
                        <li>• Cannot account for unprecedented market events</li>
                        <li>• Cannot replace human judgment in complex situations</li>
                        <li>• May misinterpret ambiguous goal descriptions</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">3.2 Known Limitations</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Model Risk:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• AI is trained on historical data that may not predict future conditions</li>
                          <li>• Unusual market events may exceed AI training data</li>
                          <li>• Models may contain inherent biases</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Data Quality:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• AI recommendations are only as good as the data provided</li>
                          <li>• Inaccurate goal information leads to poor recommendations</li>
                          <li>• Market data delays may affect real-time decisions</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Interpretation Risk:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Natural language processing may misunderstand complex goals</li>
                          <li>• Cultural or linguistic nuances may be missed</li>
                          <li>• Technical jargon may be misinterpreted</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">3.3 Risk Mitigation</h4>
                    
                    <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">We mitigate AI risks through:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Regular model validation and backtesting</li>
                        <li>• Human review of AI recommendations</li>
                        <li>• Clear disclosure of AI limitations</li>
                        <li>• User override and control mechanisms</li>
                        <li>• Continuous monitoring and improvement</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 4 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">4. TRANSPARENCY AND EXPLAINABILITY</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">4.1 Your Right to Explanation</h4>
                    
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6 mb-4">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">You have the right to:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Understand how AI recommendations are generated</li>
                        <li>• Request explanation of specific portfolio suggestions</li>
                        <li>• See which factors influenced AI decisions</li>
                        <li>• Challenge AI recommendations</li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-2">How to Request Explanation:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                        <li>• <strong>In-app:</strong> Tap &quot;Why this recommendation?&quot; on any AI suggestion</li>
                        <li>• <strong>Email:</strong> support@groequity.com with your query</li>
                        <li>• We will respond within 48 hours</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">4.2 AI Decision Factors</h4>
                    
                    <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Our AI considers:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• <strong>Your Goals:</strong> Timeline, target amount, priority</li>
                        <li>• <strong>Risk Profile:</strong> Tolerance for volatility and potential losses</li>
                        <li>• <strong>Market Conditions:</strong> Current valuations, economic indicators</li>
                        <li>• <strong>Historical Performance:</strong> Past returns and correlations</li>
                        <li>• <strong>Diversification:</strong> Sector, geography, asset class balance</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">4.3 Transparency Reports</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                      We publish quarterly AI transparency reports showing:
                    </p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• AI recommendation accuracy vs. actual performance</li>
                      <li>• Common AI suggestions and outcomes</li>
                      <li>• Model updates and improvements</li>
                      <li>• User feedback and satisfaction</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 5 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">5. FAIRNESS AND NON-DISCRIMINATION</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">5.1 Commitment to Fairness</h4>
                    
                    <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Our AI systems:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Do not discriminate based on protected characteristics</li>
                        <li>• Treat all users equally regardless of age, gender, ethnicity, religion, or location</li>
                        <li>• Focus solely on financial goals and risk tolerance</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">5.2 Bias Testing</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We regularly test AI for:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Unintentional bias in recommendations</li>
                      <li>• Disparate impact on different user groups</li>
                      <li>• Fairness across demographic categories</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">5.3 Prohibited Factors</h4>
                    
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6 mb-4">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Our AI NEVER uses:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Age (except for regulatory compliance)</li>
                        <li>• Gender or gender identity</li>
                        <li>• Race or ethnicity</li>
                        <li>• Religion or beliefs</li>
                        <li>• Sexual orientation</li>
                        <li>• Disability status</li>
                        <li>• Marital status</li>
                        <li>• Postcode or neighborhood as a proxy for wealth</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Only Permitted Factors:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Financial goals you provide</li>
                        <li>• Risk tolerance you select</li>
                        <li>• Investment timeline</li>
                        <li>• Current portfolio holdings</li>
                        <li>• Market data</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 6 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">6. DATA COLLECTION AND USAGE</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">6.1 Data We Collect for AI</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Financial Data:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Investment amounts and portfolio values</li>
                          <li>• Transaction history</li>
                          <li>• Goal progress and contributions</li>
                          <li>• Risk tolerance scores</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Behavioral Data:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• App usage patterns</li>
                          <li>• Goal Training engagement</li>
                          <li>• Feature interactions</li>
                          <li>• Session duration</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Market Data:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Stock prices and performance</li>
                          <li>• Economic indicators</li>
                          <li>• Market volatility metrics</li>
                          <li>• Sector performance</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">6.2 How Data is Used</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Portfolio Optimization:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Historical performance analysis</li>
                          <li>• Risk modeling and scenario testing</li>
                          <li>• Correlation calculations</li>
                          <li>• Rebalancing triggers</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Personalization:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Tailored content recommendations</li>
                          <li>• Custom notification timing</li>
                          <li>• Goal milestone predictions</li>
                          <li>• XP earning opportunities</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Platform Improvement:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Feature usage analytics</li>
                          <li>• Error detection and debugging</li>
                          <li>• A/B testing of new features</li>
                          <li>• Performance optimization</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">6.3 Data We Do NOT Use</h4>
                    
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">We do not use AI to:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Discriminate against users</li>
                        <li>• Sell data to third parties</li>
                        <li>• Target vulnerable individuals</li>
                        <li>• Encourage excessive trading</li>
                        <li>• Manipulate user behavior for profit</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 7 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">7. DATA QUALITY AND ACCURACY</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">7.1 Data Validation</h4>
                    
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">We ensure data quality through:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Automated validation checks</li>
                        <li>• Duplicate detection and removal</li>
                        <li>• Outlier identification and investigation</li>
                        <li>• Regular data audits</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">7.2 Your Responsibility</h4>
                    
                    <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">You must:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Provide accurate goal information</li>
                        <li>• Update your risk tolerance if circumstances change</li>
                        <li>• Review AI recommendations before accepting</li>
                        <li>• Report any errors or inconsistencies</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">7.3 Correction Rights</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                      If you believe our data about you is inaccurate:
                    </p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Email: privacy@groequity.com</li>
                      <li>• We will investigate within 5 business days</li>
                      <li>• Corrections will be applied immediately</li>
                      <li>• AI recommendations will be regenerated if needed</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 8 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">8. DATA SECURITY FOR AI SYSTEMS</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">8.1 AI-Specific Security Measures</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Model Security:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• AI models encrypted at rest</li>
                          <li>• Access controls limit who can modify models</li>
                          <li>• Version control and audit trails</li>
                          <li>• Secure model deployment pipelines</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Data Security:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Encryption in transit (TLS 1.3) and at rest (AES-256)</li>
                          <li>• Anonymization where possible</li>
                          <li>• Data minimization (only collect what&apos;s needed)</li>
                          <li>• Regular security audits</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Third-Party AI (OpenAI):</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Encrypted API connections</li>
                          <li>• Minimal data sharing (text only, no PII)</li>
                          <li>• No data used for third-party model training</li>
                          <li>• Contractual data protection agreements</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">8.2 AI System Monitoring</h4>
                    
                    <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">We monitor AI systems for:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Unusual recommendation patterns</li>
                        <li>• Performance degradation</li>
                        <li>• Security anomalies</li>
                        <li>• Data leakage or unauthorized access</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 9 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">9. AUTOMATED DECISION-MAKING</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.1 Fully Automated Decisions</h4>
                    
                    <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6 mb-4">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">The following are made by AI without human intervention:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Portfolio rebalancing triggers</li>
                        <li>• Goal Training content recommendations</li>
                        <li>• XP calculations and rewards</li>
                        <li>• Notification timing</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Your Rights:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Request human review of any decision</li>
                        <li>• Override automated recommendations</li>
                        <li>• Opt out of automated rebalancing (with manual mode)</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.2 Human-in-the-Loop Decisions</h4>
                    
                    <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">The following involve human oversight:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Initial portfolio creation (you choose from 5 AI options)</li>
                        <li>• Major portfolio changes (require your approval)</li>
                        <li>• Account closures or restrictions</li>
                        <li>• Complaints and disputes</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.3 Challenging Automated Decisions</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                      To challenge an automated decision:
                    </p>
                    <ol className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 list-decimal">
                      <li>Email: support@groequity.com with details</li>
                      <li>We will assign a human reviewer</li>
                      <li>Response within 48 hours</li>
                      <li>Decision reversal if appropriate</li>
                      <li>Compensation for any losses caused by AI error</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* SECTION 10 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">10. DATA RETENTION FOR AI</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">10.1 Active Learning Data</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                      While your account is active:
                    </p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• All goal and portfolio data retained</li>
                      <li>• AI continues learning from your behavior</li>
                      <li>• Historical performance tracked</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">10.2 After Account Closure</h4>
                    
                    <div className="space-y-4">
                      <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6">
                        <p className="text-base sm:text-lg font-bold text-black mb-3">Retained for 7 years (regulatory requirement):</p>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                          <li>• Transaction history</li>
                          <li>• Portfolio holdings and performance</li>
                          <li>• Goal information</li>
                          <li>• Risk assessments</li>
                        </ul>
                      </div>

                      <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                        <p className="text-base sm:text-lg font-bold text-black mb-3">Deleted after 7 years:</p>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                          <li>• Personal identifiers removed</li>
                          <li>• Data anonymized or deleted</li>
                          <li>• Only aggregated statistics retained for model improvement</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">10.3 Anonymized Data</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                      We may retain anonymized data indefinitely for:
                    </p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• AI model training and improvement</li>
                      <li>• Industry research and analysis</li>
                      <li>• Performance benchmarking</li>
                    </ul>

                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Anonymization Process:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Remove all personal identifiers</li>
                        <li>• Aggregate with other user data</li>
                        <li>• Ensure individual re-identification is impossible</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 11 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">11. THIRD-PARTY AI SERVICES</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">11.1 OpenAI (GPT-4)</h4>
                    
                    <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 overflow-x-auto">
                      <table className="w-full text-sm sm:text-base">
                        <tbody className="text-gray-700">
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-semibold text-black">Used For:</td>
                            <td className="py-2">Natural language goal interpretation</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-semibold text-black">Data Shared:</td>
                            <td className="py-2">Goal descriptions (text only), anonymized user ID</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-semibold text-black">Data NOT Shared:</td>
                            <td className="py-2">Name, email, address, financial details, specific amounts</td>
                          </tr>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 font-semibold text-black">Security:</td>
                            <td className="py-2">TLS 1.3 encryption, no data retention by OpenAI, contractual data protection</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-semibold text-black">Privacy Policy:</td>
                            <td className="py-2"><a href="https://openai.com/policies/privacy-policy" className="text-blue-600 underline">https://openai.com/policies/privacy-policy</a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">11.2 Future AI Integrations</h4>
                    
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Before integrating new AI services, we will:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Conduct privacy impact assessments</li>
                        <li>• Ensure contractual data protection</li>
                        <li>• Update this policy and notify users</li>
                        <li>• Provide opt-out options where appropriate</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 12 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">12. YOUR RIGHTS AND CONTROLS</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">12.1 Access and Portability</h4>
                    
                    <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">You can:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Download all your data in machine-readable format</li>
                        <li>• See which AI models use your data</li>
                        <li>• Request copies of AI recommendations and explanations</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">12.2 Correction and Deletion</h4>
                    
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">You can:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Correct inaccurate data</li>
                        <li>• Request deletion of data (subject to legal retention)</li>
                        <li>• Opt out of AI-driven features (with reduced functionality)</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">12.3 Object to Processing</h4>
                    
                    <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">You can object to:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Use of your data for AI model improvement</li>
                        <li>• Automated decision-making (with manual alternatives)</li>
                        <li>• Data sharing with third-party AI services</li>
                      </ul>
                    </div>

                    <div className="mt-4">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-2">How to Exercise Rights:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                        <li>• Email: privacy@groequity.com</li>
                        <li>• In-app: Settings &gt; Privacy &gt; Data Rights</li>
                        <li>• Response within 30 days</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 13 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">13. AI ETHICS PRINCIPLES</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.1 Our Commitments</h4>
                    
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• <strong>Transparency:</strong> Clear communication about AI use and limitations</li>
                        <li>• <strong>Fairness:</strong> Non-discriminatory, equitable treatment of all users</li>
                        <li>• <strong>Privacy:</strong> Minimal data collection, strong security, user control</li>
                        <li>• <strong>Safety:</strong> Rigorous testing, human oversight, error correction</li>
                        <li>• <strong>Accountability:</strong> Clear responsibility, complaint mechanisms, remedy for errors</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.2 Ethical Guidelines</h4>
                    
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">We will NOT use AI to:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Exploit user psychology or vulnerabilities</li>
                        <li>• Encourage excessive risk-taking</li>
                        <li>• Discriminate against protected groups</li>
                        <li>• Make decisions without explanation</li>
                        <li>• Override user preferences without consent</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 14 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">14. CHANGES TO AI SYSTEMS</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">14.1 Material Changes</h4>
                    
                    <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6 mb-4">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">We will notify you of:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• New AI systems or models</li>
                        <li>• Changes to data usage for AI</li>
                        <li>• New third-party AI integrations</li>
                        <li>• Significant changes to AI decision-making</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Notification Method:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Email to registered address</li>
                        <li>• In-app notification</li>
                        <li>• 30 days&apos; advance notice</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">14.2 Model Updates</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                      We regularly update AI models for:
                    </p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Performance improvement</li>
                      <li>• Bug fixes and error correction</li>
                      <li>• Regulatory compliance</li>
                      <li>• Security patches</li>
                    </ul>

                    <p className="text-base sm:text-lg font-bold text-black">
                      Minor updates do not require notification but are logged in our transparency reports.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 15 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">15. CONTACT AND COMPLAINTS</h3>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg font-semibold text-black mb-3">AI and Data Inquiries:</h4>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Address: Gro Equity Ltd, Abbey Farm Church Street, Higham, Rochester, England, ME3 7LS</li>
                      </ul>
                    </div>

                    <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg font-semibold text-black mb-3">Data Protection Officer:</h4>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Address: Gro Equity Ltd, Abbey Farm Church Street, Higham, Rochester, England, ME3 7LS</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg font-semibold text-black mb-3">Complaints:</h4>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Response time: 48 hours for AI-related issues</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg font-semibold text-black mb-3">Regulatory Authority:</h4>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Information Commissioner&apos;s Office (ICO)</li>
                        <li>• Website: www.ico.org.uk</li>
                        <li>• Phone: 0303 123 1113</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            
              {/* Document Footer */}
              <div className="text-center pt-8 sm:pt-12 border-t border-gray-200">
                <div className="space-y-2 mb-6">
                  <p className="text-base sm:text-lg text-gray-600">Approved by: Tommy Rowe, Technical Co-Founder</p>
                  <p className="text-base sm:text-lg text-gray-600">Date: 04/10/2025</p>
                  <p className="text-base sm:text-lg text-gray-600">Next Review: 04/10/2026</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-black mb-4">END OF AI AND DATA POLICY</p>
                <p className="text-sm text-gray-600">© 2025 Gro Equity Ltd. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AiAndData;