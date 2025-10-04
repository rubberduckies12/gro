'use client';
import React from 'react';
import Header from '../../../components/header';
import Footer from '../../../components/footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-emerald-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 pt-6 sm:pt-8 lg:pt-12 pb-12 sm:pb-16 lg:pb-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
              Terms and Conditions
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              Please read these terms carefully before using the Gro platform.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-gray-100">
            
            {/* Document Header */}
            <div className="text-center mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-gray-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">GRO TERMS AND CONDITIONS</h2>
              <p className="text-base sm:text-lg text-gray-600">Last Updated: 04/10/2025</p>
              <p className="text-base sm:text-lg text-gray-600">Effective Date: 04/10/2025</p>
            </div>

            {/* Terms Content */}
            <div className="prose prose-gray max-w-none space-y-8 sm:space-y-12">
              
              {/* SECTION 1 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">1. INTRODUCTION AND ACCEPTANCE</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">1.1 About These Terms</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      These Terms and Conditions ("Terms") govern your use of the Gro mobile application and web platform (collectively, the "Platform") operated by Gro Equity Ltd ("Gro," "we," "us," or "our"), a company registered in England and Wales under company number 16762013, with registered office at [Address].
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">1.2 Acceptance of Terms</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      By creating an account, accessing, or using the Platform, you agree to be bound by these Terms. If you do not agree to these Terms, you must not use the Platform.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">1.3 Changes to Terms</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      We may modify these Terms at any time. We will notify you of material changes via email or in-app notification at least 30 days before they take effect. Your continued use of the Platform after changes become effective constitutes acceptance of the modified Terms.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">1.4 Regulatory Status</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                      Gro Equity Ltd is currently operating as a pre-authorized entity and is building our platform to meet Financial Conduct Authority (FCA) standards. We are in the process of obtaining full FCA authorization.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6">
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-3">Current Status:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                          <li>• Company registered in England and Wales under company number 16762013</li>
                          <li>• Registered office at [Address]</li>
                          <li>• Operating under FCA regulatory guidance for pre-authorized firms</li>
                          <li>• Building systems and processes to meet full FCA authorization requirements</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-3">What this means for you:</h5>
                        <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                          <li>• All investment services are provided through our regulated external broker partner</li>
                          <li>• We are committed to operating with full regulatory compliance</li>
                          <li>• Your investments are held in custody by our external broker and protected by applicable investor protection schemes</li>
                          <li>• We will notify you when we receive full FCA authorization</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6">
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                          <span className="font-semibold text-black">Important:</span> Until we receive full FCA authorization, certain services may be limited. We will update these Terms and notify you of any changes to our regulatory status.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">2. DEFINITIONS</h3>
                <div className="space-y-3">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-black">"Account"</span> means your Gro user account.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-black">"AI Services"</span> means our artificial intelligence-powered portfolio optimization, goal matching, and investment recommendation features.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-black">"External Broker"</span> means our third-party broker-dealer and custodian partner responsible for trade execution, custody, and regulatory compliance.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-black">"Goal Training"</span> means our gamified educational courses and lessons.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-black">"Investment Services"</span> means the investment advisory and portfolio management services we provide.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-black">"Just One Tree"</span> means Just One Tree (https://www.justonetree.life/), our environmental partner organization responsible for tree planting.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-black">"Platform"</span> means the Gro mobile applications (iOS and Android) and website.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-black">"Portfolio"</span> means your collection of investments managed through the Platform.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-black">"XP"</span> means experience points earned through Platform engagement.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    <span className="font-semibold text-black">"Tree Planting Program"</span> means our environmental initiative where one tree is planted for every £100 invested, executed through Just One Tree within 6 months of contribution.
                  </p>
                </div>
              </div>

              {/* SECTION 3 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">3. ELIGIBILITY AND ACCOUNT REGISTRATION</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">3.1 Eligibility Requirements</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">To use the Platform, you must:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Be at least 18 years of age</li>
                      <li>• Be a resident of the United Kingdom</li>
                      <li>• Have the legal capacity to enter into binding contracts</li>
                      <li>• Not be prohibited from using financial services under any applicable law</li>
                      <li>• Pass our identity verification and anti-money laundering (AML) checks</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">3.2 Account Registration</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You must provide accurate, complete, and current information during registration, including:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Full legal name</li>
                      <li>• Date of birth</li>
                      <li>• Residential address</li>
                      <li>• National Insurance number</li>
                      <li>• Valid email address and phone number</li>
                      <li>• Bank account details for funding</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">3.3 Account Verification</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We use third-party services to verify your identity and comply with AML regulations. You authorize us to:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Verify your identity using government databases</li>
                      <li>• Conduct credit checks if necessary</li>
                      <li>• Request additional documentation (passport, driver's license, utility bills)</li>
                      <li>• Reject your application if verification fails</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">3.4 Account Security</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You are responsible for:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Maintaining the confidentiality of your login credentials</li>
                      <li>• All activities that occur under your account</li>
                      <li>• Notifying us immediately of any unauthorized access</li>
                      <li>• Using strong passwords and enabling two-factor authentication</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      We are not liable for losses resulting from unauthorized account access due to your failure to maintain security.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">3.5 Account Suspension or Termination</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We reserve the right to suspend or terminate your account if:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• You breach these Terms</li>
                      <li>• We suspect fraudulent or illegal activity</li>
                      <li>• Required by law or regulatory authorities</li>
                      <li>• You fail identity verification</li>
                      <li>• Your account remains inactive for more than 24 months</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 4 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">4. INVESTMENT SERVICES</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">4.1 Nature of Services</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Gro provides:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Goal-based investment advisory services</li>
                      <li>• AI-powered portfolio construction and optimization</li>
                      <li>• Automated portfolio rebalancing</li>
                      <li>• Investment execution through our external broker partner</li>
                      <li>• Performance tracking and reporting</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">4.2 Pre-Authorization Limitations</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      As a pre-authorized entity, our services are provided in partnership with our external broker. We act as a technology platform and advisory service, while our external broker handles all regulated investment activities including trade execution, custody, and regulatory compliance.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">4.3 Investment Advice and AI Recommendations</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Our AI provides personalized investment recommendations based on:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Your stated financial goals</li>
                      <li>• Risk tolerance assessment</li>
                      <li>• Investment timeline</li>
                      <li>• Current financial situation</li>
                      <li>• Market conditions</li>
                    </ul>
                    
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">IMPORTANT RISK DISCLOSURE:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• All investments carry risk, including the potential loss of principal</li>
                        <li>• Past performance does not guarantee future results</li>
                        <li>• While our AI uses sophisticated algorithms including Black-Scholes models, Modern Portfolio Theory, Monte Carlo simulations, and Graham's value investing principles, all recommendations are based on historical data and projections that may not predict future performance</li>
                        <li>• Market conditions can change rapidly and unexpectedly</li>
                        <li>• Your actual returns may differ significantly from projections</li>
                        <li>• You could lose some or all of your invested capital</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">4.4 Goal Setting and Matching</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Our OpenAI-powered goal matching service:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Interprets your financial objectives in natural language</li>
                      <li>• Translates goals into quantitative investment strategies</li>
                      <li>• Suggests appropriate timelines and contribution amounts</li>
                      <li>• Adjusts recommendations as your goals evolve</li>
                    </ul>
                    <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        <span className="font-semibold text-black">Important:</span> Goal achievement depends on multiple factors including market performance, consistent contributions, timeline accuracy, and economic conditions—all of which are beyond our control. We cannot guarantee you will achieve your stated goals.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">4.5 Portfolio Construction</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We construct portfolios using:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Diversified equity and fixed-income securities</li>
                      <li>• Exchange-traded funds (ETFs)</li>
                      <li>• Individual stocks selected by our AI algorithms</li>
                      <li>• Cash holdings as appropriate for liquidity and risk management</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      By using the Platform, you authorize us to provide investment recommendations and, upon your approval, instruct our external broker to execute trades on your behalf within your selected portfolio strategy.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">4.6 Automatic Rebalancing</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Your portfolio will be automatically rebalanced:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• When allocations drift beyond predetermined thresholds (typically ±5%)</li>
                      <li>• When market conditions warrant strategic adjustments</li>
                      <li>• When you modify your goals or risk tolerance</li>
                      <li>• At least quarterly, or more frequently if market conditions require</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      You will receive notification of significant rebalancing events. Rebalancing may trigger taxable events.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">4.7 Investment Restrictions</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We do not currently offer:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Margin trading or leveraged positions</li>
                      <li>• Options or derivatives trading</li>
                      <li>• Cryptocurrency investments</li>
                      <li>• Individual bond purchases</li>
                      <li>• Alternative investments (hedge funds, private equity, commodities)</li>
                      <li>• Short selling</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">4.8 Minimum Investment</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      The minimum initial investment is £10. Subsequent contributions have no minimum.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">4.9 Suitability Assessment</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Before investing, you must complete a suitability questionnaire covering:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Financial situation and net worth</li>
                      <li>• Investment experience and knowledge</li>
                      <li>• Risk tolerance and capacity for loss</li>
                      <li>• Investment objectives and time horizon</li>
                      <li>• Liquidity needs</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      We reserve the right to reject investment applications if we determine our services are not suitable for your circumstances.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 5 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">5. CUSTODY AND EXECUTION</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">5.1 Third-Party Custody</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Your investments are held in custody by our external broker partner, a regulated broker-dealer authorized to provide custody and execution services.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">5.2 Segregated Accounts</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Your assets are held in your name in a segregated account and are not commingled with Gro Equity Ltd's corporate assets or operational funds.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">5.3 Investor Protection</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                      Your account with our external broker is protected by applicable investor protection schemes as required by the relevant financial regulatory authorities. Specific protection limits and terms will be provided in the external broker's account documentation.
                    </p>
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        <span className="font-semibold text-black">Important:</span> Investor protection covers losses from broker-dealer insolvency, not investment losses due to market performance.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">5.4 Trade Execution</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">All trades are executed by our external broker according to their best execution policies and procedures. Key points:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• We do not receive payment for order flow</li>
                      <li>• Trade execution typically occurs within 1-2 business days of our instruction</li>
                      <li>• Trades are subject to market hours and settlement cycles</li>
                      <li>• You may experience price variations between order submission and execution</li>
                      <li>• Execution may be delayed due to market volatility, technical issues, or regulatory requirements</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">5.5 No Ownership of Client Assets by Gro</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Gro Equity Ltd does not take ownership, custody, or possession of your investments at any time. We act solely as a technology platform and investment advisor. Your relationship with our external broker is governed by the external broker's separate terms and conditions.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">5.6 External Broker Account Agreement</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      By using the Platform, you acknowledge that you will also be bound by our external broker's customer agreement and related disclosures. You should review the external broker's terms carefully, as they govern the custody and execution of your investments. Details of our external broker partner will be provided during account opening.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 6 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">6. FEES AND CHARGES</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">6.1 Service Fee Structure</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                      We charge a 5% service fee on all investment contributions. This fee is deducted at the time of contribution before funds are invested.
                    </p>
                    <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6 mb-4">
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                        <span className="font-semibold text-black">Example:</span> If you contribute £100, £5 is retained as the service fee and £95 is invested in your portfolio.
                      </p>
                    </div>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">What the service fee funds:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Platform operations and development</li>
                      <li>• AI technology and infrastructure</li>
                      <li>• Customer support</li>
                      <li>• Tree planting initiatives (1 tree per £100 invested through Just One Tree)</li>
                      <li>• Regulatory compliance and licensing costs</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">6.2 Management Fee</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      We currently do not charge an ongoing management fee for assets under management. We reserve the right to introduce a management fee in the future with 90 days' written notice.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">6.3 Fee Reductions and Incentives</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You may earn fee reductions through our rewards program:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Contribution Streaks: Maintain consistent monthly contributions to earn fee reductions</li>
                      <li>• Referral Rewards: Receive fee reductions per successful referral</li>
                      <li>• High Balance Tier: Accounts over certain thresholds qualify for reduced fee rates</li>
                      <li>• XP Redemption: Use earned XP to offset fees</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Fee reductions are applied automatically to your account and detailed in your monthly statements.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">6.4 Third-Party Fees</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You may incur additional fees not charged by Gro Equity Ltd:</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">ETF and Fund Expenses:</h5>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Expense ratios typically range from 0.05% - 0.50% annually</li>
                          <li>• These fees are embedded in fund prices and not separately charged</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Banking Fees:</h5>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Your bank may charge fees for transfers, direct debits, or currency conversion</li>
                          <li>• We do not control or receive any portion of these fees</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">External Broker Fees:</h5>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Our external broker may charge regulatory transaction fees, wire transfer fees, or account closure fees</li>
                          <li>• Refer to the external broker's fee schedule for details</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Tax-Related Fees:</h5>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Potential capital gains taxes on investment profits</li>
                          <li>• You are responsible for all tax obligations</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">6.5 Fee Transparency and Disclosure</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You will receive clear disclosure of all fees:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• At account opening (in the account agreement)</li>
                      <li>• In your monthly account statements</li>
                      <li>• In your annual summary report</li>
                      <li>• On our website Fee Schedule page</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">6.6 Fee Changes</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      We may change our fee structure with 60 days' written notice via email and in-app notification. If you disagree with fee changes, you may close your account without penalty within 30 days of the notice.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 7 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">7. FUNDING AND WITHDRAWALS</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">7.1 Funding Methods</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You may fund your account via:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• UK bank transfer (Faster Payments Service)</li>
                      <li>• Direct debit for recurring contributions</li>
                      <li>• One-time or scheduled deposits</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">7.2 Funding Requirements and Restrictions</h4>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• All funds must originate from a UK bank account in your legal name</li>
                      <li>• We do not accept: cash, checks, money orders, third-party payments, or cryptocurrency</li>
                      <li>• Minimum initial deposit: £10</li>
                      <li>• Minimum recurring contribution: £10</li>
                      <li>• Maximum single deposit: £50,000 (higher limits available upon verification)</li>
                      <li>• Anti-money laundering (AML) checks may apply to large deposits</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">7.3 Deposit Processing Time</h4>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Faster Payments: Typically 1-3 business days</li>
                      <li>• Direct Debit: Processed according to your selected schedule (usually 3-5 business days)</li>
                      <li>• Funds must fully clear before being invested</li>
                      <li>• Market closures and holidays may delay processing</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">7.4 Investment Timing</h4>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Deposits received and cleared before 2:00 PM GMT on a business day are typically invested the same day (subject to market hours)</li>
                      <li>• Deposits after 2:00 PM GMT are invested the next business day</li>
                      <li>• Actual investment timing depends on market conditions and our external broker's execution schedule</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">7.5 Withdrawal Requests</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You may request withdrawals at any time through the Platform:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Partial withdrawals: Minimum £50</li>
                      <li>• Full withdrawals: Close your account and withdraw all funds</li>
                    </ul>
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">Processing timeline:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Request submitted by 2:00 PM GMT: Liquidation initiated same business day</li>
                        <li>• Request after 2:00 PM GMT: Liquidation initiated next business day</li>
                        <li>• Funds typically arrive in your bank account 3-7 business days after liquidation</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">7.6 Withdrawal Process</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">When you request a withdrawal:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• We instruct our external broker to liquidate the necessary positions</li>
                      <li>• Liquidation typically occurs within 1-2 business days</li>
                      <li>• Proceeds settle according to standard settlement cycles (T+2 for stocks, T+1 for ETFs)</li>
                      <li>• Funds are transferred to your registered UK bank account</li>
                      <li>• You receive confirmation at each stage</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">7.7 Withdrawal Restrictions and Delays</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Withdrawals may be delayed or restricted if:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• You have pending trades or unsettled transactions</li>
                      <li>• Your account is under review for fraud or compliance reasons</li>
                      <li>• Required by law, court order, or regulatory authority</li>
                      <li>• There are technical issues with our external broker or banking systems</li>
                      <li>• Market conditions prevent timely liquidation</li>
                      <li>• Additional identity verification is required (typically for withdrawals over £10,000)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">7.8 Tax Implications</h4>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Withdrawals may trigger capital gains tax obligations</li>
                      <li>• We do not withhold taxes automatically (except where required by law)</li>
                      <li>• You are solely responsible for reporting and paying all applicable taxes</li>
                      <li>• We provide annual tax reporting documents to assist with your tax filing</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">7.9 Dormant Accounts</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">If your account remains inactive (no logins, contributions, or withdrawals) for 24 consecutive months:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• We may classify your account as dormant</li>
                      <li>• You will receive notification via email</li>
                      <li>• Dormant accounts may be subject to account maintenance fees</li>
                      <li>• After 36 months of inactivity, we may liquidate your account and return funds to your registered bank account</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 8 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">8. GOAL TRAINING AND GAMIFICATION</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">8.1 Goal Training Courses</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Our Goal Training feature provides:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Interactive financial education modules tailored to your specific goals</li>
                      <li>• Bite-sized lessons (2-5 minutes each) designed for mobile consumption</li>
                      <li>• Personalized learning paths based on your financial objectives</li>
                      <li>• Daily check-ins to reinforce learning and track progress</li>
                      <li>• Adaptive content powered by AI that evolves with your needs</li>
                    </ul>
                    
                    <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">Available Goal Training Courses:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• First-Time Buyer: Learn strategies for saving and investing toward a house deposit</li>
                        <li>• Retirement Ready: Build knowledge for long-term wealth accumulation</li>
                        <li>• Freedom Fund: Understand paths to financial independence</li>
                        <li>• Travel Goals: Plan and invest for dream holidays and experiences</li>
                        <li>• Emergency Fund: Master the fundamentals of financial security</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">8.2 Educational Purpose Only</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Goal Training content is for educational purposes only and does not constitute:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Personalized financial advice beyond your investment portfolio recommendations</li>
                      <li>• Tax advice or tax planning services</li>
                      <li>• Legal advice</li>
                      <li>• Guarantees of investment success or goal achievement</li>
                      <li>• Professional certification or accreditation</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      You should consult with qualified professionals for specific financial, tax, or legal advice.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">8.3 XP (Experience Points)</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You earn XP by:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Completing Goal Training lessons and modules</li>
                      <li>• Maintaining investment contribution streaks</li>
                      <li>• Reaching investment milestones (first £100, £1,000, £10,000, etc.)</li>
                      <li>• Engaging with the Platform regularly (daily logins, goal updates)</li>
                      <li>• Participating in community features</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      XP accumulates in your account and can be tracked via your dashboard.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">8.4 XP Redemption</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">XP can be redeemed for:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Fractional shares of stocks from our curated list of available securities</li>
                      <li>• Bonus tree plantings beyond your standard planting allocation through Just One Tree</li>
                      <li>• Premium platform features including advanced analytics and insights</li>
                      <li>• Fee discounts on future service fees</li>
                    </ul>
                    
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">XP to Stock Conversion:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• XP values and conversion rates are displayed in the app</li>
                        <li>• Stocks purchased with XP become part of your investment portfolio</li>
                        <li>• XP-purchased stocks are subject to all the same terms as cash-funded investments</li>
                        <li>• Available stocks for XP redemption are determined by Gro and may change</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">8.5 XP Terms and Conditions</h4>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• XP has no cash value and cannot be exchanged for currency</li>
                      <li>• XP cannot be transferred between accounts or to other users</li>
                      <li>• XP expires after 24 months of account inactivity</li>
                      <li>• We reserve the right to adjust XP earning rates, redemption values, or program terms with 30 days' notice</li>
                      <li>• We may revoke XP if earned through fraudulent activity or Terms violations</li>
                      <li>• Stocks purchased with XP are subject to the same custody, execution, and withdrawal terms as all other investments</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">8.6 Achievements and Rewards</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We offer achievements to recognize your progress:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• "Investor of the Month" - Recognition for top-performing users based on consistency and engagement</li>
                      <li>• Streak Milestones - Badges for 7, 30, 90, 180, and 365-day contribution streaks</li>
                      <li>• Goal Completion - Special recognition when you reach your financial goals</li>
                      <li>• Community Leaderboard Rankings - Anonymous competition with other users</li>
                    </ul>
                    
                    <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">Achievement Terms:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Achievements are for motivational and gamification purposes only</li>
                        <li>• Achievements confer no legal rights, guaranteed benefits, or monetary value</li>
                        <li>• Recognition criteria may be adjusted at our discretion</li>
                        <li>• We reserve the right to revoke achievements obtained through fraudulent means</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">8.7 Community Features</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">The Platform may include social and community elements:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Anonymous leaderboards showing user rankings by XP, streaks, or goal progress</li>
                      <li>• Goal-sharing functionality to inspire and motivate other users</li>
                      <li>• Community forums or discussion features for financial education topics</li>
                      <li>• Achievement showcasing to celebrate milestones</li>
                    </ul>
                    
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6 mb-4">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">Community Guidelines - You agree NOT to:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Share personally identifiable information (yours or others')</li>
                        <li>• Provide investment advice or recommendations to other users</li>
                        <li>• Engage in harassment, bullying, or abusive behavior</li>
                        <li>• Post spam, promotional content, or commercial solicitations</li>
                        <li>• Impersonate other users or Gro employees</li>
                        <li>• Share false or misleading information</li>
                        <li>• Violate any applicable laws or regulations</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">We reserve the right to:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Moderate, edit, or remove user-generated content</li>
                        <li>• Suspend or ban users who violate community guidelines</li>
                        <li>• Restrict access to community features at any time</li>
                        <li>• Terminate community features entirely with 30 days' notice</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 9 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">9. TREE PLANTING PROGRAM</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.1 Program Description</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                      For every £100 you invest through Gro, we plant one tree through Just One Tree (https://www.justonetree.life/), our environmental partner organization.
                    </p>
                    
                    <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6 mb-4">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">Calculation Examples:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Invest £50 = 0.5 trees (rounded to nearest tree after multiple contributions)</li>
                        <li>• Invest £250 = 2 trees planted</li>
                        <li>• Invest £1,000 = 10 trees planted</li>
                        <li>• Invest £10,000 = 100 trees planted</li>
                      </ul>
                    </div>
                    
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Trees are tracked cumulatively across all your contributions.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.2 Tree Planting Process and Timeline</h4>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Trees are counted based on total invested amount (after service fees)</li>
                      <li>• Tree planting occurs within 6 months from your contribution date</li>
                      <li>• Trees are planted in batches to optimize logistics and align with appropriate planting seasons</li>
                      <li>• You can track your tree count and planting status via the Platform</li>
                      <li>• Tree planting is managed by Just One Tree and their global reforestation partners</li>
                      <li>• Planting locations vary based on current reforestation needs and Just One Tree's active projects worldwide</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.3 Environmental Impact Tracking</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Your Impact Dashboard displays:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Total number of trees planted from your investments</li>
                      <li>• Planting status (pending, scheduled, planted, confirmed)</li>
                      <li>• Expected planting date (within 6 months of contribution)</li>
                      <li>• Estimated CO₂ offset (in tonnes)</li>
                      <li>• Global map showing general planting regions via Just One Tree</li>
                      <li>• Cumulative environmental impact over time</li>
                      <li>• Annual impact summary reports</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.4 Environmental Impact Calculations</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">CO₂ offset and environmental impact calculations are estimates based on:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Average tree species carbon sequestration rates (typically 20-30kg CO₂ per year per tree)</li>
                      <li>• Tree survival rates and maturity projections</li>
                      <li>• Just One Tree's environmental research and data</li>
                      <li>• Regional climate and ecosystem factors</li>
                    </ul>
                    
                    <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">Important Disclaimers:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• These are good-faith estimates based on Just One Tree's methodology, not guarantees of actual environmental impact</li>
                        <li>• Actual carbon sequestration varies by species, location, climate, and tree survival</li>
                        <li>• Impact projections assume successful tree establishment and long-term growth</li>
                        <li>• We rely on Just One Tree's verification and reporting processes</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.5 Program Funding</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      The Tree Planting Program is funded exclusively from our 5% service fee on contributions. Tree planting costs are not deducted separately from your investment amount.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.6 Just One Tree Partnership</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Just One Tree is our environmental partner responsible for:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Coordinating global tree planting initiatives</li>
                      <li>• Working with verified local planting organizations</li>
                      <li>• Monitoring tree survival and growth</li>
                      <li>• Providing impact reporting and verification</li>
                      <li>• Ensuring trees are planted in areas of genuine reforestation need</li>
                      <li>• Completing tree planting within 6 months of our funding allocation</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      You can learn more about Just One Tree's mission and projects at https://www.justonetree.life/
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.7 Program Modifications and Sustainability</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We reserve the right to:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Change the tree planting ratio (currently 1 tree per £100) with 90 days' advance notice</li>
                      <li>• Extend the 6-month planting timeline in exceptional circumstances (natural disasters, extreme weather, political instability in planting regions)</li>
                      <li>• Modify or change partner organizations if Just One Tree becomes unavailable or unsuitable</li>
                      <li>• Adjust the program structure based on operational feasibility and costs</li>
                      <li>• Discontinue the program entirely with 180 days' notice (trees already committed will still be planted)</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Any changes to the program will be communicated clearly via email and in-app notifications.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.8 Planting Timeline Exceptions</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">The 6-month planting timeline may be extended in cases of:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Natural disasters affecting planting regions</li>
                      <li>• Seasonal restrictions (certain trees can only be planted during specific months)</li>
                      <li>• Political instability or safety concerns in planned planting locations</li>
                      <li>• Force majeure events beyond Just One Tree's control</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      You will be notified if your tree planting is delayed beyond 6 months, with an updated expected planting date.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.9 Tax Implications of Tree Planting</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                      The Tree Planting Program is a corporate initiative funded by Gro Equity Ltd's service fees, not your direct contributions.
                    </p>
                    
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">Important:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Trees planted on your behalf do not constitute tax-deductible charitable contributions by you</li>
                        <li>• You cannot claim tax deductions or credits for trees planted through the program</li>
                        <li>• The environmental impact is a benefit of using the platform, not a personal charitable donation</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.10 No Ownership Rights or Carbon Credits</h4>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• You do not own or have any legal interest in trees planted through the program</li>
                      <li>• Trees are planted on land owned or managed by Just One Tree or their partner organizations</li>
                      <li>• You cannot claim carbon credits or offsets for regulatory compliance purposes</li>
                      <li>• Trees cannot be transferred, sold, or assigned to third parties</li>
                      <li>• Upon account closure, your tree planting record is retained but no additional trees are planted for future contributions</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.11 Verification and Transparency</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We are committed to transparency in our Tree Planting Program:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Regular updates from Just One Tree on planting progress and locations</li>
                      <li>• Access to Just One Tree's public reporting and verification processes</li>
                      <li>• Quarterly summaries of total trees planted through Gro contributions</li>
                      <li>• Photographic evidence and project updates from planting sites</li>
                      <li>• Annual audits of tree planting fulfillment and timeline compliance</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 10 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">10. DATA PROTECTION AND PRIVACY</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">10.1 Overview</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Gro Equity Ltd is committed to protecting your personal data and respecting your privacy. We process your personal information in accordance with:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• UK General Data Protection Regulation (UK GDPR)</li>
                      <li>• Data Protection Act 2018</li>
                      <li>• Privacy and Electronic Communications Regulations (PECR)</li>
                      <li>• Other applicable data protection laws</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">10.2 Types of Data We Collect</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We collect and process various types of personal data necessary to provide our investment services:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Identity and contact information (name, date of birth, address, email, phone number, National Insurance number)</li>
                      <li>• Financial information (bank details, investment amounts, portfolio holdings, net worth, transaction history)</li>
                      <li>• Transaction data (deposits, withdrawals, trades, performance metrics)</li>
                      <li>• Usage and technical data (app interactions, device information, IP address, browser type)</li>
                      <li>• Goal Training progress (lessons completed, XP earned, achievements)</li>
                      <li>• Communications (support requests, feedback, correspondence with our team)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">10.3 How We Use Your Data</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We use your personal data to:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Provide investment advisory services and manage your account</li>
                      <li>• Execute trades through our external broker partner</li>
                      <li>• Allocate tree planting through Just One Tree</li>
                      <li>• Personalize AI recommendations and Goal Training content</li>
                      <li>• Process deposits, withdrawals, and fee calculations</li>
                      <li>• Comply with legal and regulatory obligations (AML, KYC, tax reporting)</li>
                      <li>• Prevent fraud, money laundering, and ensure platform security</li>
                      <li>• Improve our services and develop new features</li>
                      <li>• Communicate with you about your account, services, and updates</li>
                      <li>• Provide customer support and respond to inquiries</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">10.4 Legal Basis for Processing</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We process your personal data under various legal bases including:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Contract performance - to provide our investment services and fulfill our obligations to you</li>
                      <li>• Legal obligations - to comply with FCA regulations, AML laws, tax requirements, and other legal duties</li>
                      <li>• Legitimate interests - to improve our services, prevent fraud, and operate our business efficiently</li>
                      <li>• Consent - where you have given explicit consent (e.g., marketing communications, optional features)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">10.5 Data Sharing and Third Parties</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We may share your data with trusted third parties including:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Our external broker (for custody, trade execution, and regulatory compliance)</li>
                      <li>• Payment processors and banking partners (for deposits and withdrawals)</li>
                      <li>• Identity verification and AML compliance services (for KYC checks)</li>
                      <li>• AI service providers (including OpenAI for goal matching and recommendations)</li>
                      <li>• Just One Tree (anonymized data for tree planting allocation and impact reporting)</li>
                      <li>• Cloud infrastructure providers (for secure data storage and platform operations)</li>
                      <li>• Analytics and performance monitoring services (for platform improvement)</li>
                      <li>• Regulatory authorities (when required by law or regulation)</li>
                      <li>• Professional advisors (legal, compliance, audit, and tax advisors)</li>
                      <li>• Third parties in corporate transactions (in the event of merger, acquisition, or sale)</li>
                    </ul>
                    
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">Important:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• We never sell your personal data to third parties for marketing purposes</li>
                        <li>• All third-party service providers are carefully vetted and bound by contractual obligations to protect your data</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">10.6 Your Data Rights Under UK GDPR</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You have the following rights regarding your personal data:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Right of Access: Request copies of your personal data and information about how we process it</li>
                      <li>• Right to Rectification: Correct inaccurate or incomplete data</li>
                      <li>• Right to Erasure ("Right to be Forgotten"): Request deletion of your data (subject to legal retention requirements)</li>
                      <li>• Right to Restriction of Processing: Limit how we process your data in certain circumstances</li>
                      <li>• Right to Data Portability: Receive your data in a structured, machine-readable format</li>
                      <li>• Right to Object: Object to processing based on legitimate interests or for direct marketing purposes</li>
                      <li>• Right to Withdraw Consent: Stop marketing communications or withdraw consent for optional processing</li>
                      <li>• Rights Related to Automated Decision-Making: Request human review of automated decisions</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      To exercise any of these rights, please contact our Data Protection Officer at privacy@groequity.com. We will respond within one month.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">10.7 Data Retention</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We retain your personal data:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• During active account: All data is retained for service provision</li>
                      <li>• After account closure: Minimum 7 years (as required by FCA regulations and tax laws)</li>
                      <li>• Beyond 7 years: Data may be retained if required for legal proceedings or ongoing obligations</li>
                      <li>• Tree planting records: May be retained indefinitely for environmental impact tracking</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">10.8 Contact Information for Data Protection</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Data Protection Officer:</h5>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Email: privacy@groequity.com</li>
                          <li>• Address: [Address]</li>
                          <li>• Phone: [Phone Number]</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Information Commissioner's Office (ICO):</h5>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-2">
                          If you believe we have not handled your data properly, you have the right to lodge a complaint with the UK's supervisory authority:
                        </p>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Website: www.ico.org.uk</li>
                          <li>• Phone: 0303 123 1113</li>
                          <li>• Address: Information Commissioner's Office, Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 11 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">11. INTELLECTUAL PROPERTY</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">11.1 Ownership of Platform</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">The Platform, including all software, algorithms, AI models, design, graphics, text, and content, is owned by Gro Equity Ltd and protected by:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Copyright laws</li>
                      <li>• Trademark laws</li>
                      <li>• Trade secret protections</li>
                      <li>• Patent rights (where applicable)</li>
                      <li>• Database rights</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">11.2 Limited License to Use</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We grant you a limited, non-exclusive, non-transferable, revocable license to:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Access and use the Platform for personal, non-commercial purposes</li>
                      <li>• Use the mobile applications on your personal devices</li>
                      <li>• View and download content for your own investment management</li>
                      <li>• Access Goal Training materials for personal education</li>
                    </ul>
                    
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">You may NOT:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Copy, modify, or create derivative works of the Platform</li>
                        <li>• Reverse engineer, decompile, or disassemble our software or AI algorithms</li>
                        <li>• Remove or alter any copyright, trademark, or proprietary notices</li>
                        <li>• Use automated tools (bots, scrapers, crawlers) to access the Platform</li>
                        <li>• Resell, sublicense, or commercialize any part of the Platform</li>
                        <li>• Frame or mirror any part of the Platform on another website</li>
                        <li>• Use the Platform to create a competing service</li>
                        <li>• Extract or harvest data from the Platform</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">11.3 Trademarks</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                      "Gro," "Gro Equity," the Gro logo, and other marks used on the Platform are trademarks of Gro Equity Ltd. You may not use our trademarks without prior written permission.
                    </p>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Unauthorized use of our trademarks may constitute trademark infringement and unfair competition in violation of applicable laws.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">11.4 User-Generated Content</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">If you submit content to the Platform (reviews, forum posts, feedback, comments, suggestions):</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• You retain ownership of your content</li>
                      <li>• You grant us a worldwide, royalty-free, perpetual, irrevocable license to use, reproduce, modify, adapt, publish, translate, distribute, and display your content</li>
                      <li>• You represent and warrant that you own or have rights to submit the content</li>
                      <li>• The content does not violate third-party rights or any laws</li>
                      <li>• The content is accurate and not misleading</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      We may remove, edit, or refuse to post any content at our sole discretion. We are not responsible for user-generated content.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">11.5 Feedback and Suggestions</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">If you provide feedback, ideas, or suggestions about the Platform ("Feedback"):</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• We may use Feedback without any obligation to you</li>
                      <li>• You waive any rights to compensation, attribution, or royalties</li>
                      <li>• Feedback becomes our exclusive property</li>
                      <li>• We may incorporate Feedback into the Platform or future products</li>
                      <li>• You agree not to submit Feedback that is confidential or proprietary to you or third parties</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">11.6 Copyright Infringement</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We respect intellectual property rights. If you believe content on our Platform infringes your copyright, please notify our Copyright Agent with:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Identification of the copyrighted work claimed to be infringed</li>
                      <li>• Identification of the infringing material and its location on the Platform</li>
                      <li>• Your contact information (address, phone, email)</li>
                      <li>• A statement of good faith belief that use is not authorized</li>
                      <li>• A statement that the information is accurate and you are authorized to act</li>
                      <li>• Your physical or electronic signature</li>
                    </ul>
                    
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">Copyright Agent Contact:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Email: copyright@groequity.com</li>
                        <li>• Address: [Address]</li>
                      </ul>
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-3">
                        We will investigate and remove infringing content as appropriate. We may terminate accounts of users who repeatedly infringe intellectual property rights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 12 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">12. ACCEPTABLE USE POLICY</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">12.1 Prohibited Activities</h4>
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6 mb-4">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">You agree NOT to:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Use the Platform for any illegal purpose or in violation of any applicable laws</li>
                        <li>• Commit fraud, provide false information, or misrepresent your identity</li>
                        <li>• Attempt to manipulate markets or engage in insider trading</li>
                        <li>• Launder money, finance terrorism, or facilitate illegal financial activity</li>
                        <li>• Violate any applicable securities laws, regulations, or market rules</li>
                        <li>• Harass, abuse, threaten, or harm other users or Gro employees</li>
                        <li>• Upload viruses, malware, or other malicious code</li>
                        <li>• Attempt unauthorized access to our systems, servers, or networks</li>
                        <li>• Interfere with Platform operations, security measures, or other users' access</li>
                        <li>• Use the Platform if you are under 18 years of age</li>
                        <li>• Create multiple accounts to abuse promotions, rewards, or referral programs</li>
                        <li>• Share your account credentials with others or allow unauthorized account access</li>
                        <li>• Impersonate any person or entity</li>
                        <li>• Collect or harvest user information without consent</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">12.2 Market Abuse and Insider Trading</h4>
                    <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6 mb-4">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">You must not:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Trade on material non-public information (insider trading)</li>
                        <li>• Manipulate prices or create false or misleading market activity</li>
                        <li>• Engage in coordinated trading schemes to influence prices</li>
                        <li>• Use the Platform for pump-and-dump schemes</li>
                        <li>• Front-run trades or engage in other manipulative practices</li>
                        <li>• Violate UK Market Abuse Regulation or other securities laws</li>
                      </ul>
                      <p className="text-base sm:text-lg font-bold text-black mt-3">
                        Violations will be reported to the Financial Conduct Authority and other relevant authorities and may result in criminal prosecution.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">12.3 Account Security and Sharing</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Your account is personal to you. You must not:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Share your login credentials with others</li>
                      <li>• Allow others to use your account for any purpose</li>
                      <li>• Create accounts on behalf of others without proper authorization</li>
                      <li>• Transfer, sell, or assign your account to another person</li>
                      <li>• Use another person's account</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      You are fully responsible for all activities under your account, whether authorized or not.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">12.4 Abuse of Rewards and Promotions</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You must not:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Create fake accounts to claim referral bonuses</li>
                      <li>• Manipulate the XP system through fraudulent activity</li>
                      <li>• Abuse fee discount programs</li>
                      <li>• Coordinate with others to exploit promotional offers</li>
                      <li>• Use automated tools to earn rewards</li>
                      <li>• Engage in any scheme to defraud Gro or other users</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">12.5 System Integrity</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You must not:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Probe, scan, or test vulnerabilities in our systems</li>
                      <li>• Breach or circumvent security or authentication measures</li>
                      <li>• Access data not intended for you</li>
                      <li>• Overwhelm our infrastructure (denial of service attacks)</li>
                      <li>• Interfere with other users' access or enjoyment of the Platform</li>
                      <li>• Reverse engineer or attempt to extract source code</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">12.6 Consequences of Violations</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">If you violate these Terms, we may take any or all of the following actions:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Issue a warning</li>
                      <li>• Suspend your account temporarily</li>
                      <li>• Terminate your account permanently</li>
                      <li>• Forfeit any XP, rewards, achievements, or fee discounts</li>
                      <li>• Liquidate your positions and return funds (minus applicable fees and any damages)</li>
                      <li>• Report violations to regulatory authorities (FCA, National Crime Agency, police)</li>
                      <li>• Pursue legal action for damages, injunctive relief, and recovery of costs</li>
                      <li>• Ban you permanently from creating new accounts</li>
                      <li>• Cooperate with law enforcement investigations</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">12.7 Reporting Violations</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">If you become aware of violations of these Terms by other users, please report them to:</p>
                    
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Email: abuse@groequity.com</li>
                        <li>• Subject: Terms Violation Report</li>
                        <li>• Include details of the violation, supporting evidence, and your contact information</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 13 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">13. DISCLAIMERS AND LIMITATIONS OF LIABILITY</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.1 Investment Risk Disclaimer</h4>
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6 mb-4">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">IMPORTANT - PLEASE READ CAREFULLY:</p>
                      <p className="text-base sm:text-lg font-bold text-black mb-3">INVESTING INVOLVES SUBSTANTIAL RISK OF LOSS. YOU COULD LOSE SOME OR ALL OF YOUR INVESTED CAPITAL.</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Past performance does not guarantee future results</li>
                        <li>• Projections, forecasts, and estimates are not guarantees</li>
                        <li>• Market conditions can change rapidly and unpredictably</li>
                        <li>• AI recommendations are based on algorithms and historical data that may contain errors, biases, or limitations</li>
                        <li>• Diversification does not eliminate risk</li>
                        <li>• You may not achieve your stated financial goals within your desired timeframe (or at all)</li>
                        <li>• Early withdrawal may result in losses due to market conditions or liquidation costs</li>
                        <li>• Tax implications may reduce your net returns</li>
                      </ul>
                    </div>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      You acknowledge that you understand these risks and accept full responsibility for all investment decisions made through the Platform.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.2 No Guaranteed Returns</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We make no guarantees, warranties, or representations about:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Investment performance or returns</li>
                      <li>• Achievement of financial goals or target dates</li>
                      <li>• AI recommendation accuracy or suitability</li>
                      <li>• Market forecasts, projections, or predictions</li>
                      <li>• Portfolio performance relative to benchmarks or other investors</li>
                      <li>• Suitability of investments for your specific circumstances</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      All investment results depend on market performance and other factors beyond our control.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.3 Platform Availability and Performance</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We strive for high Platform availability but do not guarantee:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Uninterrupted or error-free access (maintenance, outages, technical issues may occur)</li>
                      <li>• Real-time data accuracy (market data may be delayed)</li>
                      <li>• Availability during periods of extreme market volatility or high traffic</li>
                      <li>• Compatibility with all devices or operating systems</li>
                      <li>• Performance of third-party integrations</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      We are not liable for losses caused by Platform unavailability, delays, or technical issues.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.4 Third-Party Services and Dependencies</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We rely on third-party providers (external broker, payment processors, data vendors, AI services, Just One Tree, cloud infrastructure). We are not responsible for:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Third-party service failures, errors, delays, or outages</li>
                      <li>• External broker execution quality, timing, or pricing</li>
                      <li>• Data provider inaccuracies or delays</li>
                      <li>• Banking system issues or payment processing failures</li>
                      <li>• Internet or telecommunications outages</li>
                      <li>• AI service limitations or errors (including OpenAI)</li>
                      <li>• Tree planting delays or issues caused by Just One Tree</li>
                      <li>• Cloud infrastructure failures or security breaches</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Your relationship with third-party providers is governed by their respective terms and conditions.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.5 AI and Algorithm Limitations</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Our AI services are sophisticated but not infallible:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• AI recommendations may contain errors, biases, or limitations</li>
                      <li>• Algorithms are based on historical data that may not predict future market conditions</li>
                      <li>• Natural language processing may misinterpret your goals or inputs</li>
                      <li>• AI models are updated periodically and performance may vary over time</li>
                      <li>• Unusual or unprecedented market conditions may exceed AI training data and capabilities</li>
                      <li>• AI cannot account for all personal circumstances or future life changes</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      We do not guarantee AI accuracy, completeness, or suitability for your individual needs.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.6 Goal Training Educational Content</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Goal Training content is for general educational purposes only:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Not personalized financial, tax, or legal advice</li>
                      <li>• May become outdated as laws and markets change</li>
                      <li>• Should not be relied upon as the sole basis for financial decisions</li>
                      <li>• Does not guarantee improved investment outcomes or financial literacy</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Always consult qualified professionals for personalized advice.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.7 Tree Planting Program Disclaimer</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">The Tree Planting Program is subject to:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Just One Tree's ability to fulfill planting commitments</li>
                      <li>• Environmental factors affecting tree survival and growth</li>
                      <li>• CO₂ offset calculations are estimates, not guarantees</li>
                      <li>• Planting location and timing determined by Just One Tree</li>
                      <li>• Program may be modified or discontinued (with notice)</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      We are not liable for tree planting delays, failures, or lower-than-expected environmental impact.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.8 "AS IS" and "AS AVAILABLE" Basis</h4>
                    <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">
                        THE PLATFORM AND ALL SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                      </p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Warranties of merchantability</li>
                        <li>• Fitness for a particular purpose</li>
                        <li>• Non-infringement</li>
                        <li>• Accuracy, reliability, or completeness</li>
                        <li>• Security or freedom from viruses</li>
                        <li>• Uninterrupted or error-free operation</li>
                      </ul>
                      <p className="text-base sm:text-lg font-bold text-black mt-3">
                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.9 Limitation of Liability</h4>
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6 mb-4">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Gro Equity Ltd, its directors, officers, employees, agents, affiliates, and partners are NOT liable for:</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Investment Losses:</h5>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Loss of capital, profits, or investment returns</li>
                          <li>• Failure to achieve financial goals</li>
                          <li>• Underperformance relative to benchmarks or expectations</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Indirect and Consequential Damages:</h5>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Indirect, incidental, special, consequential, or punitive damages</li>
                          <li>• Lost profits, revenue, business, opportunities, or goodwill</li>
                          <li>• Data loss, corruption, or breach</li>
                          <li>• Cost of substitute services</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Third-Party Actions:</h5>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Actions or omissions of external broker, banks, payment processors, data providers, AI services, or Just One Tree</li>
                          <li>• Third-party security breaches or data theft</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Platform Issues:</h5>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Unauthorized account access due to your failure to maintain security</li>
                          <li>• Platform unavailability, downtime, errors, or bugs</li>
                          <li>• Loss of data or content</li>
                          <li>• Inaccurate market data or delayed information</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Force Majeure:</h5>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Natural disasters, pandemics, acts of God</li>
                          <li>• War, terrorism, civil unrest, or political instability</li>
                          <li>• Government actions, regulatory changes, or sanctions</li>
                          <li>• Internet, telecommunications, or infrastructure failures</li>
                          <li>• Power outages or equipment failures</li>
                          <li>• Market closures, trading halts, or circuit breakers</li>
                          <li>• Any event beyond our reasonable control</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.10 Maximum Liability Cap</h4>
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                        Our total aggregate liability to you for all claims arising from or related to these Terms or your use of the Platform shall not exceed the greater of:
                      </p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• The total fees you paid to Gro Equity Ltd in the 12 months preceding the claim, OR</li>
                        <li>• £100 (one hundred pounds sterling)</li>
                      </ul>
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed mt-3">
                        This limitation applies regardless of the legal theory (contract, tort, negligence, strict liability, or otherwise) and even if we have been advised of the possibility of such damages.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.11 Exclusions and Statutory Rights</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Nothing in these Terms excludes or limits our liability for:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Death or personal injury caused by our negligence</li>
                      <li>• Fraud or fraudulent misrepresentation</li>
                      <li>• Breach of statutory rights that cannot be lawfully excluded</li>
                      <li>• Any other liability that cannot be lawfully excluded or limited under UK law</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      These Terms do not affect your statutory rights as a consumer under UK law.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.12 Time Limitation for Claims</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Any claim arising from these Terms or your use of the Platform must be brought within one (1) year from the date the claim arose. After this period, the claim is permanently barred.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.13 Basis of Bargain</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      You acknowledge that the disclaimers and limitations in this Section 13 are fundamental elements of the agreement between you and Gro Equity Ltd, and that we would not provide the Platform or services without these limitations.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 14 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">14. INDEMNIFICATION</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">14.1 Your Indemnification Obligations</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You agree to indemnify, defend, and hold harmless Gro Equity Ltd, its directors, officers, employees, agents, affiliates, partners, and service providers from and against any and all claims, liabilities, damages, losses, costs, expenses, and fees (including reasonable attorneys' fees) arising from or related to:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Your use or misuse of the Platform</li>
                      <li>• Your violation of these Terms</li>
                      <li>• Your violation of any laws, regulations, or third-party rights</li>
                      <li>• Your investment decisions and any resulting losses</li>
                      <li>• Content you submit to the Platform</li>
                      <li>• Your breach of representations or warranties</li>
                      <li>• Unauthorized access to your account due to your failure to maintain security</li>
                      <li>• Claims by other users or third parties related to your conduct</li>
                      <li>• Market abuse, insider trading, or other illegal trading activity</li>
                      <li>• Fraud, misrepresentation, or provision of false information</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">14.2 Indemnification Process</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">If we seek indemnification from you:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• We will provide prompt written notice of the claim</li>
                      <li>• You will have the right to control the defense with counsel of your choice (subject to our approval)</li>
                      <li>• We may participate in the defense at our own expense</li>
                      <li>• You will not settle any claim without our prior written consent</li>
                      <li>• You will cooperate fully with the defense</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">14.3 Our Right to Defend</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      We reserve the right, at our own expense, to assume exclusive defense and control of any matter subject to indemnification by you. In such case, you agree to cooperate with our defense.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 15 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">15. DISPUTE RESOLUTION</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">15.1 Governing Law</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      These Terms and any disputes arising from or related to the Platform shall be governed by and construed in accordance with the laws of England and Wales, without regard to conflict of law principles.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">15.2 Jurisdiction</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Subject to the arbitration provisions below, you irrevocably agree that the courts of England and Wales shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with these Terms or your use of the Platform.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">15.3 Informal Dispute Resolution</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Before initiating formal legal proceedings or arbitration, you agree to first attempt to resolve any dispute informally by contacting us at:</p>
                    
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6 mb-4">
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Email: disputes@groequity.com</li>
                        <li>• Address: [Address]</li>
                      </ul>
                    </div>
                    
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Provide a detailed description of the dispute and your proposed resolution. We will attempt to resolve the dispute within 30 days. If we cannot reach a resolution, either party may proceed to arbitration or court.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">15.4 Arbitration (Optional)</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">For disputes exceeding £1,000, either party may elect to resolve the dispute through binding arbitration administered by the London Court of International Arbitration:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Arbitration will be conducted in English in London</li>
                      <li>• The arbitrator's decision will be final and binding</li>
                      <li>• Each party bears its own costs unless the arbitrator decides otherwise</li>
                      <li>• Arbitration does not preclude seeking emergency injunctive relief in court</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">15.5 Class Action Waiver</h4>
                    <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">TO THE EXTENT PERMITTED BY LAW, YOU AGREE THAT:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• All disputes will be resolved on an individual basis</li>
                        <li>• You waive the right to participate in class actions, class arbitrations, or representative proceedings</li>
                        <li>• You may only seek relief (including monetary, injunctive, or declaratory relief) on an individual basis</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">15.6 Small Claims Court</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Notwithstanding the above, either party may bring an individual action in small claims court for disputes within that court's jurisdiction.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">15.7 Injunctive Relief</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Nothing in these dispute resolution provisions prevents either party from seeking emergency injunctive or equitable relief from a court to prevent irreparable harm pending resolution of the dispute.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">15.8 Time Limitation on Claims</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Except where prohibited by law, any claim or cause of action arising out of or related to your use of the Platform or these Terms must be filed within one (1) year after the claim or cause of action arose, or be permanently barred.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">15.9 Financial Ombudsman Service</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">If you have a complaint about our services that we cannot resolve to your satisfaction, you may be entitled to refer the matter to the Financial Ombudsman Service:</p>
                    
                    <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6">
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Website: www.financial-ombudsman.org.uk</li>
                        <li>• Phone: 0800 023 4567</li>
                        <li>• Address: Financial Ombudsman Service, Exchange Tower, London E14 9SR</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

                {/* SECTION 16 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">16. TERMINATION</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">16.1 Termination by You</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You may terminate your account at any time by:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Withdrawing all funds from your account</li>
                      <li>• Contacting customer support at support@groequity.com to request account closure</li>
                      <li>• Following the account closure process in the Platform settings</li>
                    </ul>
                    
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">Upon termination:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• We will liquidate all positions and return funds to your registered bank account</li>
                        <li>• Pending trades must settle before funds can be withdrawn</li>
                        <li>• You will receive final account statements and tax documents</li>
                        <li>• You remain responsible for any outstanding fees or obligations</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">16.2 Termination by Us</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We may suspend or terminate your account immediately, with or without notice, if:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• You breach these Terms or our policies</li>
                      <li>• We suspect fraudulent, illegal, or harmful activity</li>
                      <li>• Required by law, court order, or regulatory authority</li>
                      <li>• You fail identity verification or AML checks</li>
                      <li>• Your account has been dormant for more than 36 months</li>
                      <li>• We discontinue the Platform or services (with reasonable notice)</li>
                      <li>• We reasonably believe termination is necessary to protect Gro, other users, or third parties</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">16.3 Effects of Termination</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Upon termination or suspension:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Your right to access and use the Platform immediately ceases</li>
                      <li>• We will liquidate your positions (unless legally prohibited)</li>
                      <li>• Funds will be returned to your registered bank account after settlement</li>
                      <li>• You forfeit all XP, achievements, rewards, and fee discounts</li>
                      <li>• You remain liable for all obligations incurred before termination</li>
                      <li>• Provisions intended to survive termination will continue to apply</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">16.4 Survival of Terms</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">The following sections survive termination:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Section 6 (Fees and Charges) - for fees owed</li>
                      <li>• Section 10 (Data Protection and Privacy) - for data retention obligations</li>
                      <li>• Section 11 (Intellectual Property)</li>
                      <li>• Section 13 (Disclaimers and Limitations of Liability)</li>
                      <li>• Section 14 (Indemnification)</li>
                      <li>• Section 15 (Dispute Resolution)</li>
                      <li>• Section 16.4 (Survival)</li>
                      <li>• Section 17 (General Provisions)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">16.5 No Liability for Termination</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      We are not liable to you or any third party for termination or suspension of your account in accordance with these Terms.
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 17 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">17. GENERAL PROVISIONS</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.1 Entire Agreement</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and Gro Equity Ltd regarding your use of the Platform and supersede all prior agreements, understandings, and communications, whether oral or written.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.2 Amendments</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We may amend these Terms at any time. Material changes will be notified via:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Email to your registered email address</li>
                      <li>• In-app notification</li>
                      <li>• Prominent notice on the Platform</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Changes will take effect 30 days after notification (or immediately for legal/regulatory requirements). Your continued use after the effective date constitutes acceptance. If you disagree with changes, you may terminate your account without penalty before the effective date.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.3 Assignment</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You may not assign, transfer, or delegate these Terms or your account to any third party without our prior written consent.</p>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We may assign these Terms and our rights and obligations to:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• An affiliate or subsidiary</li>
                      <li>• A successor in interest through merger, acquisition, or sale</li>
                      <li>• Any third party with your consent or as permitted by law</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.4 Severability</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• That provision will be modified to the minimum extent necessary to make it valid and enforceable</li>
                      <li>• If modification is not possible, the provision will be severed</li>
                      <li>• The remaining provisions will remain in full force and effect</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.5 Waiver</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Our failure or delay in exercising any right, power, or remedy under these Terms does not constitute a waiver of that right. Any waiver must be in writing and signed by an authorized representative of Gro Equity Ltd.</p>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      A waiver of any breach does not constitute a waiver of any subsequent breach.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.6 No Third-Party Beneficiaries</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      These Terms are for the benefit of you and Gro Equity Ltd only. No third party has any right to enforce any provision of these Terms except as expressly stated (e.g., indemnified parties under Section 14).
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.7 Force Majeure</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We are not liable for any failure or delay in performance due to events beyond our reasonable control, including:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Natural disasters, pandemics, acts of God</li>
                      <li>• War, terrorism, civil unrest</li>
                      <li>• Government actions, embargoes, sanctions</li>
                      <li>• Internet or telecommunications failures</li>
                      <li>• Power outages or equipment failures</li>
                      <li>• Labor disputes or strikes</li>
                      <li>• Failures of third-party service providers</li>
                      <li>• Market closures or trading halts</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      During force majeure events, our obligations are suspended. We will use reasonable efforts to resume performance.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.8 Relationship of the Parties</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Nothing in these Terms creates a partnership, joint venture, employment, or agency relationship between you and Gro Equity Ltd. You are not authorized to make commitments on our behalf.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.9 Notices</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Notices to You:</h5>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-2">We may provide notices via:</p>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4 mb-3">
                          <li>• Email to your registered email address</li>
                          <li>• In-app notifications</li>
                          <li>• Postal mail to your registered address</li>
                          <li>• Prominent posting on the Platform</li>
                        </ul>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                          Notices are effective when sent (email/in-app) or three days after mailing (postal).
                        </p>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Notices to Us:</h5>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-2">You may contact us at:</p>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4 mb-3">
                          <li>• Email: legal@groequity.com</li>
                          <li>• Address: Gro Equity Ltd, [Address]</li>
                        </ul>
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                          Legal notices must be sent in writing to the legal email or postal address.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.10 Language</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      These Terms are drafted in English. Any translation is for convenience only. In case of conflict, the English version prevails.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.11 Electronic Communications</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You consent to receive communications from us electronically, including:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Account statements and confirmations</li>
                      <li>• Tax documents</li>
                      <li>• Regulatory disclosures</li>
                      <li>• Marketing communications (if you opt in)</li>
                    </ul>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                      Electronic communications satisfy any legal requirement for written communication.
                    </p>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      You may withdraw consent by contacting us, but this may require account closure as electronic delivery is integral to our service.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.12 Headings</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Section headings are for convenience only and do not affect interpretation of these Terms.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.13 Interpretation</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">In these Terms:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• "Including" means "including but not limited to"</li>
                      <li>• Singular includes plural and vice versa</li>
                      <li>• "You" and "your" refer to the account holder</li>
                      <li>• "We," "us," and "our" refer to Gro Equity Ltd</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.14 Contact Information</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">General Inquiries:</h5>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Email: support@groequity.com</li>
                          <li>• Address: Gro Equity Ltd, Abbey Farm Church Street, Higham, Rochester, England, ME3 7LS</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Legal Matters:</h5>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Email: legal@groequity.com</li>
                          <li>• Address: Gro Equity Ltd, Abbey Farm Church Street, Higham, Rochester, England, ME3 7LS</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Data Protection:</h5>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Email: privacy@groequity.com</li>
                          <li>• Address: Gro Equity Ltd, Abbey Farm Church Street, Higham, Rochester, England, ME3 7LS</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-base sm:text-lg font-semibold text-black mb-2">Complaints:</h5>
                        <ul className="space-y-1 text-base sm:text-lg text-gray-700 ml-4">
                          <li>• Email: complaints@groequity.com</li>
                          <li>• Address: Gro Equity Ltd, Abbey Farm Church Street, Higham, Rochester, England, ME3 7LS</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.15 Complaints Procedure</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">If you have a complaint:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                      <li>• Contact us at complaints@groequity.com with full details</li>
                      <li>• We will acknowledge your complaint within 3 business days</li>
                      <li>• We will investigate and respond within 8 weeks</li>
                      <li>• If you are not satisfied, you may refer the matter to the Financial Ombudsman Service</li>
                    </ul>
                    
                    <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6">
                      <h5 className="text-base sm:text-lg font-semibold text-black mb-3">Financial Ombudsman Service:</h5>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Website: www.financial-ombudsman.org.uk</li>
                        <li>• Phone: 0800 023 4567</li>
                        <li>• Address: Financial Ombudsman Service, Exchange Tower, London E14 9SR</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.16 Financial Services Compensation Scheme (FSCS)</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                      Depending on the circumstances of your claim, you may be entitled to compensation from the Financial Services Compensation Scheme (FSCS) if Gro Equity Ltd or our external broker cannot meet our obligations.
                    </p>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      Details available at www.fscs.org.uk or by calling 0800 678 1100.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">17.17 Regulatory Information</h4>
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Gro Equity Ltd is registered in England and Wales under company number 16762013</li>
                        <li>• Registered office: [Address]</li>
                        <li>• We are in the process of obtaining FCA authorization</li>
                        <li>• Current status and updates available at [website/regulatory]</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 18 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">18. ACCEPTANCE OF TERMS</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">18.1 Acknowledgment and Agreement</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">By creating an account, accessing, or using the Gro Platform, you acknowledge that:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• You have read and understood these Terms and Conditions</li>
                      <li>• You have read and understood our Privacy Policy and Cookie Policy</li>
                      <li>• You agree to be bound by all provisions</li>
                      <li>• You meet all eligibility requirements</li>
                      <li>• All information you provide is accurate and complete</li>
                      <li>• You accept all risks associated with investing</li>
                      <li>• You understand this is a legally binding agreement</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">18.2 Legal Capacity and Authority</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You represent and warrant that:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• You are at least 18 years of age</li>
                      <li>• You have the legal capacity to enter into binding contracts</li>
                      <li>• You have the authority to agree to these Terms</li>
                      <li>• Your agreement to these Terms has been duly authorized</li>
                      <li>• These Terms constitute valid and binding obligations</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">18.3 Informed Consent</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">You confirm that:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• You understand the nature and risks of investing</li>
                      <li>• You have had the opportunity to seek independent advice</li>
                      <li>• You are entering into this agreement voluntarily</li>
                      <li>• No representations have been made to you other than those in these Terms</li>
                      <li>• You understand your rights and obligations</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">18.4 Rejection of Terms</h4>
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">
                        If you do not agree to these Terms, you must not use the Platform.
                      </p>
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        Any use of the Platform constitutes acceptance of these Terms, regardless of whether you have explicitly indicated agreement.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">18.5 Regular Review</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      We recommend that you review these Terms periodically, as they may be updated from time to time. Your continued use of the Platform after any changes constitutes acceptance of the updated Terms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Footer */}
              <div className="text-center pt-8 sm:pt-12 border-t border-gray-200">
                <div className="space-y-2 mb-6">
                  <p className="text-base sm:text-lg text-gray-600">Last Updated: 04/10/2025</p>
                  <p className="text-base sm:text-lg text-gray-600">Effective Date: 04/10/2025</p>
                  <p className="text-base sm:text-lg text-gray-600">Version: 1.0</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-black mb-4">END OF TERMS AND CONDITIONS</p>
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

export default Terms;