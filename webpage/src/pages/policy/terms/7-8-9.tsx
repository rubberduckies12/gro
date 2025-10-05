'use client';
import React from 'react';

const TermsSections789 = () => {
  return (
    <>
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
              <li>• Actual investment timing depends on market conditions and our external broker&apos;s execution schedule</li>
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
              <li>• We reserve the right to adjust XP earning rates, redemption values, or program terms with 30 days&apos; notice</li>
              <li>• We may revoke XP if earned through fraudulent activity or Terms violations</li>
              <li>• Stocks purchased with XP are subject to the same custody, execution, and withdrawal terms as all other investments</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">8.6 Achievements and Rewards</h4>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We offer achievements to recognize your progress:</p>
            <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
              <li>• &quot;Investor of the Month&quot; - Recognition for top-performing users based on consistency and engagement</li>
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
                <li>• Share personally identifiable information (yours or others&apos;)</li>
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
                <li>• Terminate community features entirely with 30 days&apos; notice</li>
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
              <li>• Planting locations vary based on current reforestation needs and Just One Tree&apos;s active projects worldwide</li>
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
              <li>• Just One Tree&apos;s environmental research and data</li>
              <li>• Regional climate and ecosystem factors</li>
            </ul>
            
            <div className="bg-yellow-50 rounded-2xl p-4 sm:p-6">
              <h5 className="text-base sm:text-lg font-semibold text-black mb-3">Important Disclaimers:</h5>
              <ul className="space-y-2 text-base sm:text-lg text-gray-700">
                <li>• These are good-faith estimates based on Just One Tree&apos;s methodology, not guarantees of actual environmental impact</li>
                <li>• Actual carbon sequestration varies by species, location, climate, and tree survival</li>
                <li>• Impact projections assume successful tree establishment and long-term growth</li>
                <li>• We rely on Just One Tree&apos;s verification and reporting processes</li>
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
              You can learn more about Just One Tree&apos;s mission and projects at https://www.justonetree.life/
            </p>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.7 Program Modifications and Sustainability</h4>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-3">We reserve the right to:</p>
            <ul className="space-y-2 text-base sm:text-lg text-gray-700 ml-4 mb-4">
              <li>• Change the tree planting ratio (currently 1 tree per £100) with 90 days&apos; advance notice</li>
              <li>• Extend the 6-month planting timeline in exceptional circumstances (natural disasters, extreme weather, political instability in planting regions)</li>
              <li>• Modify or change partner organizations if Just One Tree becomes unavailable or unsuitable</li>
              <li>• Adjust the program structure based on operational feasibility and costs</li>
              <li>• Discontinue the program entirely with 180 days&apos; notice (trees already committed will still be planted)</li>
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
              <li>• Force majeure events beyond Just One Tree&apos;s control</li>
            </ul>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              You will be notified if your tree planting is delayed beyond 6 months, with an updated expected planting date.
            </p>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-semibold text-black mb-3">9.9 Tax Implications of Tree Planting</h4>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
              The Tree Planting Program is a corporate initiative funded by Gro Equity Ltd&apos;s service fees, not your direct contributions.
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
              <li>• Access to Just One Tree&apos;s public reporting and verification processes</li>
              <li>• Quarterly summaries of total trees planted through Gro contributions</li>
              <li>• Photographic evidence and project updates from planting sites</li>
              <li>• Annual audits of tree planting fulfillment and timeline compliance</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsSections789;