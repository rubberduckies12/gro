'use client';
import React from 'react';
import Header from '../../../../components/header';
import Footer from '../../../../components/footer';

const FinancialConduct = () => {
  return (
    <div className="min-h-screen bg-emerald-50">
      <Header />
      
      {/* Hero Section - Fixed padding for mobile header overlap */}
      <section className="relative px-4 sm:px-6 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-8 lg:pb-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8 leading-tight">
              Financial Conduct Policy
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto px-2">
              Our standards of behavior and ethical conduct for all team members and representatives.
            </p>
          </div>
        </div>
      </section>

      {/* Financial Conduct Content */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-gray-100">
            
            {/* Document Header */}
            <div className="text-center mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-gray-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">GRO EQUITY LTD - FINANCIAL CONDUCT POLICY</h2>
              <p className="text-base sm:text-lg text-gray-600">Effective Date: 04/10/2025</p>
              <p className="text-base sm:text-lg text-gray-600">Version: 1.0</p>
            </div>

            {/* Financial Conduct Content */}
            <div className="prose prose-gray max-w-none space-y-8 sm:space-y-12">
              
              {/* SECTION 1 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">1. PURPOSE AND SCOPE</h3>
                
                <div className="space-y-6">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    This Financial Conduct Policy establishes the standards of behavior and ethical conduct expected of all employees, directors, contractors, and representatives of Gro Equity Ltd (&quot;Gro,&quot; &quot;the Company&quot;).
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">Scope:</h4>
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed">This policy applies to all team members in all locations and covers all business activities.</p>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">Objectives:</h4>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                        <li>• Maintain the highest standards of integrity and professionalism</li>
                        <li>• Comply with all applicable laws, regulations, and FCA requirements</li>
                        <li>• Protect client interests and maintain trust</li>
                        <li>• Prevent conflicts of interest, fraud, and market abuse</li>
                        <li>• Foster a culture of ethical conduct</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">2. REGULATORY COMPLIANCE</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">2.1 FCA Principles</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                      All team members must comply with FCA Principles for Businesses:
                    </p>
                    
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <ol className="space-y-2 text-base sm:text-lg text-gray-700 list-decimal ml-4">
                        <li><strong>Integrity</strong> - conduct business with integrity</li>
                        <li><strong>Skill, care and diligence</strong> - conduct business with due skill, care, and diligence</li>
                        <li><strong>Management and control</strong> - organize and control affairs responsibly</li>
                        <li><strong>Financial prudence</strong> - maintain adequate financial resources</li>
                        <li><strong>Market conduct</strong> - observe proper standards of market conduct</li>
                        <li><strong>Customers&apos; interests</strong> - pay due regard to customers&apos; interests and treat them fairly</li>
                        <li><strong>Communications</strong> - pay due regard to information needs and communicate clearly</li>
                        <li><strong>Conflicts of interest</strong> - manage conflicts of interest fairly</li>
                        <li><strong>Customers: relationships of trust</strong> - ensure suitability of advice and discretionary decisions</li>
                        <li><strong>Clients&apos; assets</strong> - arrange adequate protection for clients&apos; assets</li>
                        <li><strong>Relations with regulators</strong> - deal with regulators in an open and cooperative way</li>
                      </ol>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">2.2 Treating Customers Fairly (TCF)</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We are committed to:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Providing clear, fair, and not misleading information</li>
                      <li>• Offering products and services that meet customer needs</li>
                      <li>• Providing suitable advice and investment recommendations</li>
                      <li>• Avoiding unnecessary barriers to customer complaints</li>
                      <li>• Meeting customer expectations throughout their journey</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 3 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">3. CONFLICTS OF INTEREST</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">3.1 Identification and Management</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Team members must:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Identify and disclose any actual or potential conflicts of interest</li>
                      <li>• Not place personal interests above those of clients or the Company</li>
                      <li>• Report conflicts to the Compliance Officer immediately</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">3.2 Common Conflicts</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Examples include:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Personal trading in securities we recommend to clients</li>
                      <li>• Accepting gifts or hospitality that could influence decisions</li>
                      <li>• Using non-public client information for personal gain</li>
                      <li>• Having financial interests in companies we recommend</li>
                      <li>• Relationships with suppliers, competitors, or clients that could impair objectivity</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">3.3 Resolution</h4>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Conflicts must be disclosed in writing</li>
                      <li>• Avoid the conflict where possible</li>
                      <li>• Manage through appropriate controls and disclosure</li>
                      <li>• In serious cases, recuse yourself from the decision</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 4 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">4. PERSONAL ACCOUNT DEALING</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">4.1 Pre-Approval Requirement</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Team members must:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Obtain written approval before opening any investment account</li>
                      <li>• Disclose all personal trading accounts</li>
                      <li>• Provide copies of statements when requested</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">4.2 Restrictions</h4>
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Team members must NOT:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Trade ahead of client orders (front-running)</li>
                        <li>• Use non-public information gained through work</li>
                        <li>• Trade in securities covered by our AI recommendations without pre-clearance</li>
                        <li>• Engage in short-term speculation that could create conflicts</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">4.3 Permitted Activities</h4>
                    <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">With disclosure and approval:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Long-term investments in diversified funds/ETFs</li>
                        <li>• ISAs and pension contributions</li>
                        <li>• Property purchases for personal use</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 5 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">5. ANTI-MONEY LAUNDERING (AML) AND COUNTER-TERRORIST FINANCING (CTF)</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">5.1 Know Your Customer (KYC)</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">All team members involved in onboarding must:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Verify client identity using approved methods</li>
                      <li>• Understand the source of client funds</li>
                      <li>• Assess and document client risk profiles</li>
                      <li>• Keep KYC records up to date</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">5.2 Suspicious Activity</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Team members must report:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Unusual transaction patterns</li>
                      <li>• Requests to bypass compliance procedures</li>
                      <li>• Inconsistent client information</li>
                      <li>• Transactions with no apparent economic purpose</li>
                      <li>• Clients from high-risk jurisdictions</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">5.3 Reporting</h4>
                    <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                        Report suspicious activity to the Money Laundering Reporting Officer (MLRO) immediately. <strong>Do NOT inform the client.</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 6 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">6. MARKET ABUSE AND INSIDER DEALING</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">6.1 Prohibited Activities</h4>
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Team members must NEVER:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Trade on inside information (material non-public information)</li>
                        <li>• Share inside information with others (&quot;tipping&quot;)</li>
                        <li>• Manipulate market prices or create false impressions</li>
                        <li>• Engage in coordinated trading to influence prices</li>
                        <li>• Front-run client orders</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">6.2 Inside Information Defined</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Information that:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Is not publicly available</li>
                      <li>• Relates to specific securities or issuers</li>
                      <li>• Would likely affect the price if made public</li>
                      <li>• A reasonable investor would consider relevant</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">6.3 Penalties</h4>
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Violations can result in:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Unlimited fines</li>
                        <li>• Up to 7 years imprisonment</li>
                        <li>• Dismissal from Gro</li>
                        <li>• Industry ban</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 7 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">7. GIFTS, HOSPITALITY, AND INDUCEMENTS</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">7.1 Acceptable Standards</h4>
                    <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Team members may:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Accept modest gifts (under £100 value) if properly disclosed</li>
                        <li>• Attend reasonable business meals and events</li>
                        <li>• Accept promotional items of nominal value</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">7.2 Prohibited Conduct</h4>
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Team members must NOT:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Accept cash or cash equivalents</li>
                        <li>• Accept gifts/hospitality that could influence decisions</li>
                        <li>• Accept anything from clients without disclosure</li>
                        <li>• Provide inducements to gain unfair advantage</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">7.3 Disclosure</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">All gifts and hospitality over £50 must be:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Disclosed in the Gifts &amp; Hospitality Register</li>
                      <li>• Approved by line manager</li>
                      <li>• Documented with date, provider, value, and purpose</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 8 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">8. DATA PROTECTION AND CONFIDENTIALITY</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">8.1 Client Information</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Team members must:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Only access client data on a need-to-know basis</li>
                      <li>• Never share client information externally without consent</li>
                      <li>• Protect client data using approved security measures</li>
                      <li>• Report data breaches immediately</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">8.2 Inside Information</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Team members must:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Maintain confidentiality of non-public business information</li>
                      <li>• Not use confidential information for personal benefit</li>
                      <li>• Follow information barrier procedures</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">8.3 Consequences</h4>
                    <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Breaches may result in:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Disciplinary action up to dismissal</li>
                        <li>• Regulatory sanctions</li>
                        <li>• Criminal prosecution under GDPR</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 9 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">9. RECORD KEEPING</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.1 Requirements</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Team members must:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Maintain accurate records of all client interactions</li>
                      <li>• Document investment recommendations and rationale</li>
                      <li>• Retain records for minimum 7 years (or as required by regulation)</li>
                      <li>• Ensure records are accessible for audit and regulatory review</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.2 Communication Records</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">All business communications must be:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Conducted through approved channels</li>
                      <li>• Archived appropriately</li>
                      <li>• Professional and compliant</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.3 Personal Devices</h4>
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Team members must NOT:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Use personal email for client communications</li>
                        <li>• Use WhatsApp, Signal, or other encrypted apps for business</li>
                        <li>• Delete business communications</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 10 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">10. WHISTLEBLOWING</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">10.1 Reporting Concerns</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Team members are encouraged to report:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Breaches of this policy</li>
                      <li>• Regulatory violations</li>
                      <li>• Fraud or dishonest conduct</li>
                      <li>• Risks to clients or the Company</li>
                      <li>• Pressure to act unethically</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">10.2 Protection</h4>
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Gro provides:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Confidential reporting channels</li>
                        <li>• Protection from retaliation</li>
                        <li>• Anonymous reporting options (where appropriate)</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">10.3 Reporting Channels</h4>
                    <ol className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 list-decimal">
                      <li>Direct manager or Compliance Officer</li>
                      <li>Designated whistleblowing email: whistleblowing@groequity.com</li>
                      <li>External: FCA Whistleblowing Team (020 7066 9200)</li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* SECTION 11 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">11. TRAINING AND COMPETENCE</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">11.1 Mandatory Training</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">All team members must complete:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Initial induction training on this policy</li>
                      <li>• Annual refresher training</li>
                      <li>• Role-specific compliance training</li>
                      <li>• FCA regulations and updates training</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">11.2 Competence</h4>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">Team members must:</p>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Maintain knowledge relevant to their role</li>
                      <li>• Pursue relevant qualifications and certifications</li>
                      <li>• Stay informed of regulatory changes</li>
                      <li>• Demonstrate ethical judgment</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 12 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">12. CONSEQUENCES OF NON-COMPLIANCE</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">12.1 Internal Disciplinary Action</h4>
                    <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Violations may result in:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Written warning</li>
                        <li>• Suspension without pay</li>
                        <li>• Demotion or role change</li>
                        <li>• Dismissal for gross misconduct</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">12.2 Regulatory Action</h4>
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">The FCA may impose:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Fines</li>
                        <li>• Public censure</li>
                        <li>• Prohibition from working in financial services</li>
                        <li>• Criminal prosecution (for serious violations)</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">12.3 Personal Liability</h4>
                    <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                      <p className="text-base sm:text-lg font-bold text-black mb-3">Team members may be personally liable for:</p>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Fines and penalties</li>
                        <li>• Legal costs</li>
                        <li>• Reputational damage</li>
                        <li>• Criminal records</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 13 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">13. ROLES AND RESPONSIBILITIES</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.1 All Team Members</h4>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Read, understand, and comply with this policy</li>
                      <li>• Complete mandatory training</li>
                      <li>• Report concerns and violations</li>
                      <li>• Act with integrity at all times</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.2 Managers</h4>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Ensure team compliance</li>
                      <li>• Lead by example</li>
                      <li>• Address violations promptly</li>
                      <li>• Support whistleblowers</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.3 Compliance Officer</h4>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Oversee policy implementation</li>
                      <li>• Provide guidance and training</li>
                      <li>• Investigate violations</li>
                      <li>• Report to senior management and FCA</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">13.4 Senior Management</h4>
                    <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4">
                      <li>• Set tone from the top</li>
                      <li>• Ensure adequate resources for compliance</li>
                      <li>• Review policy effectiveness</li>
                      <li>• Report to the Board</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* SECTION 14 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">14. POLICY REVIEW AND UPDATES</h3>
                
                <div className="space-y-6">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                    This policy will be reviewed:
                  </p>
                  <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                    <li>• Annually at minimum</li>
                    <li>• Following regulatory changes</li>
                    <li>• After significant incidents</li>
                    <li>• Based on audit findings</li>
                  </ul>

                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Team members will be notified of updates and required to acknowledge receipt.
                  </p>
                </div>
              </div>

              {/* SECTION 15 */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">15. ACKNOWLEDGMENT</h3>
                
                <div className="space-y-6">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">
                    All team members must sign and return the acknowledgment form confirming they have:
                  </p>
                  <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
                    <li>• Read and understood this policy</li>
                    <li>• Agree to comply with all requirements</li>
                    <li>• Understand the consequences of violations</li>
                    <li>• Know how to report concerns</li>
                  </ul>

                  <div className="bg-red-50 rounded-2xl p-4 sm:p-6">
                    <p className="text-base sm:text-lg font-bold text-black">
                      Failure to acknowledge this policy may result in disciplinary action.
                    </p>
                  </div>
                </div>
              </div>

              {/* CONTACT INFORMATION */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">CONTACT INFORMATION</h3>
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg font-semibold text-black mb-3">Compliance Officer:</h4>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Address: Gro Equity Ltd, Abbey Farm Church Street, Higham, Rochester, England, ME3 7LS</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg font-semibold text-black mb-3">Whistleblowing:</h4>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Confidential Hotline: 07496097968</li>
                      </ul>
                    </div>

                    <div className="bg-emerald-50 rounded-2xl p-4 sm:p-6">
                      <h4 className="text-lg font-semibold text-black mb-3">Money Laundering Reporting Officer (MLRO):</h4>
                      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                        <li>• Address: Gro Equity Ltd, Abbey Farm Church Street, Higham, Rochester, England, ME3 7LS</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            
              {/* Document Footer */}
              <div className="text-center pt-8 sm:pt-12 border-t border-gray-200">
                <div className="space-y-2 mb-6">
                  <p className="text-base sm:text-lg text-gray-600">Approved by: Tommy Rowe, Technical Co-founder </p>
                  <p className="text-base sm:text-lg text-gray-600">Date: 04/10/2025</p>
                  <p className="text-base sm:text-lg text-gray-600">Next Review: 04/10/2026</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-black mb-4">END OF FINANCIAL CONDUCT POLICY</p>
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

export default FinancialConduct;