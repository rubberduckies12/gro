 Stage 1: Goal Analysis & Requirements Engine - Available Endpoints

 🎲 Monte Carlo Simulation Endpoints
(For calculating goal feasibility and required returns)
EndpointPurpose in Goal AnalysisPOST /api/monte-carlo/portfolioCalculate probability of reaching target amount with given contributionsPOST /api/monte-carlo/stockModel individual asset behavior for goal planningGET /api/monte-carlo/:simulation-id/resultsRetrieve goal achievement probabilities and outcome distributions
💹 Returns Analysis Endpoints
(For establishing performance requirements)
EndpointPurpose in Goal AnalysisGET /api/stocks/:symbol/returnsAnalyze historical return patterns for market expectationsGET /api/stocks/:symbol/risk-adjusted-returnsCalculate required Sharpe ratios and risk-adjusted targets
⚠️ Risk Assessment Endpoints
(For determining acceptable risk levels)
EndpointPurpose in Goal AnalysisGET /api/stocks/:symbol/varEstablish Value at Risk thresholds for portfolioGET /api/stocks/:symbol/drawdownSet maximum acceptable drawdown limitsGET /api/stocks/:symbol/stress-testTest goal feasibility under crisis scenariosGET /api/stocks/:symbol/tail-riskAssess extreme downside risk tolerance
💼 Portfolio Management Endpoints
(For goal-specific portfolio parameters)
EndpointPurpose in Goal AnalysisPOST /api/portfolios/createInitial goal-based portfolio framework creationGET /api/portfolios/:id/analysisAnalyze existing goals and requirements
📅 Calendar & Events Endpoints
(For timeline and goal scheduling)
EndpointPurpose in Goal AnalysisGET /api/calendar/economic-eventsFactor economic cycles into goal timelineGET /api/patterns/:symbol/seasonalUnderstand seasonal patterns affecting goal achievement
🤖 ML & Predictive Endpoints
(For market condition forecasting)
EndpointPurpose in Goal AnalysisGET /api/ml/market-regimeIdentify current market conditions for goal calibrationGET /api/ml/sector-rotationForecast market cycles affecting goal timeline

🔄 How These Endpoints Work Together in Stage 1:
Step 1: Goal Feasibility Check

POST /api/monte-carlo/portfolio → Runs simulations with user's target amount, timeline, and contributions
GET /api/monte-carlo/:simulation-id/results → Returns probability of success and required return rates

Step 2: Risk Tolerance Calibration

GET /api/stocks/SPY/var → Establishes market-level VaR as baseline
GET /api/stocks/SPY/drawdown → Sets realistic drawdown expectations
GET /api/stocks/SPY/stress-test → Tests goal under various crisis scenarios

Step 3: Return Requirements

GET /api/stocks/SPY/returns → Analyzes market return distributions
GET /api/stocks/SPY/risk-adjusted-returns → Calculates required Sharpe ratio for goal

Step 4: Market Context

GET /api/ml/market-regime → Adjusts expectations based on current market cycle
GET /api/calendar/economic-events → Factors upcoming economic events into timeline

Step 5: Portfolio Framework

POST /api/portfolios/create → Creates initial goal-based structure with constraints


📊 What Stage 1 Produces for Stage 2:
From these endpoints, Stage 1 generates:

Required Annual Return: Based on Monte Carlo simulations
Maximum Volatility: Derived from risk tolerance and VaR analysis
Drawdown Limits: From stress testing and user comfort level
Time Horizon: Direct from user input
Contribution Schedule: User-defined monthly/quarterly amounts
Market Regime Adjustments: From ML market analysis
Portfolio Constraints: Risk limits, sector limits, position size limits

These become the screening criteria that feed into Stage 2's universe filtering process.