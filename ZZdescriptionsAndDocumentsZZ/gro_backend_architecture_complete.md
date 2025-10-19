# 🌱 **Gro Backend Architecture: Complete Implementation Guide**

*A comprehensive breakdown of every file, function, and data flow in the Gro stock portfolio creation engine*

---

## 📋 **Table of Contents**

1. [System Overview](#system-overview)
2. [Project Structure](#project-structure)
3. [User Flow Journey](#user-flow-journey)
4. [Stage-by-Stage File Breakdown](#stage-by-stage-file-breakdown)
5. [Shared Services & Utilities](#shared-services--utilities)
6. [Calculations Library](#calculations-library)
7. [Database Layer](#database-layer)
8. [File Interactions & Dependencies](#file-interactions--dependencies)
9. [Copilot Implementation Prompts](#copilot-implementation-prompts)

---

## 🏗️ **System Overview**

The Gro backend is organized into 6 distinct processing stages that transform user goals into optimized investment portfolios. Each stage has specific responsibilities and produces outputs that feed into the next stage.

**Core Philosophy:** Goal-driven portfolio creation using AI, advanced financial modeling, and continuous optimization.

**Technology Stack:** Node.js, Express.js, PostgreSQL, Redis, JWT Authentication, external market data APIs.

---

## 📂 **Project Structure**

```
gro-backend/
├── src/
│   ├── stages/                 # 6 core processing stages
│   │   ├── 01-goal-analysis/
│   │   ├── 02-universe-screening/
│   │   ├── 03-ai-analysis/
│   │   ├── 04-portfolio-optimization/
│   │   ├── 05-monte-carlo-validation/
│   │   └── 06-monitoring/
│   ├── shared/                 # Cross-stage utilities
│   │   ├── services/
│   │   ├── models/
│   │   ├── utils/
│   │   └── middleware/
│   ├── calculations/           # Mathematical & financial functions
│   │   ├── returns/
│   │   ├── options/
│   │   ├── comparative/
│   │   └── calendar/
│   ├── database/              # PostgreSQL connection & queries
│   │   ├── connection.js
│   │   ├── migrations/
│   │   └── seeds/
│   └── server.js              # Main Express application
├── package.json
├── db.sql                     # PostgreSQL schema
└── README.md
```

---

## 👤 **User Flow Journey**

### **Step 1: User Authentication**
**File:** `src/shared/middleware/auth.js`
- User logs in via mobile app
- JWT token generated and stored securely
- Token validates all subsequent API requests

### **Step 2: Goal Input**
**File:** `src/stages/01-goal-analysis/controllers/goal-analyzer.js`
- User inputs: retirement goal, $1M target, 30-year timeline, $2K monthly
- System analyzes feasibility and calculates requirements

### **Step 3: Universe Screening**
**File:** `src/stages/02-universe-screening/controllers/screening-pipeline.js`
- System screens 10,000+ stocks through fundamental, technical, and risk filters
- Output: ~100-200 candidate stocks

### **Step 4: Deep Analysis**
**File:** `src/stages/03-ai-analysis/controllers/deep-analyzer.js`
- AI analyzes each candidate using multiple models
- Sentiment, ML predictions, peer comparisons
- Output: Scored and ranked stocks

### **Step 5: Portfolio Construction**
**File:** `src/stages/04-portfolio-optimization/controllers/optimizer.js`
- Multiple optimization algorithms create ideal allocation
- Diversification, risk management, goal alignment
- Output: Optimized portfolio weights

### **Step 6: Monte Carlo Validation**
**File:** `src/stages/05-monte-carlo-validation/controllers/validator.js`
- Simulates portfolio performance across thousands of scenarios
- Validates goal achievement probability
- Output: Validated portfolio or refinement recommendations

### **Step 7: Continuous Monitoring**
**File:** `src/stages/06-monitoring/controllers/monitor.js`
- Daily portfolio health checks
- Rebalancing recommendations
- AI-powered insights and alerts

---

## 🎯 **Stage 1: Goal Analysis & Requirements**

### **📁 controllers/goal-analyzer.js**

**Purpose:** Main orchestrator for goal analysis process

**What Goes In:**
- User goal data: target amount, timeline, monthly contributions, risk tolerance
- User profile: age, income, investment experience
- Current market conditions

**What It Does:**
- Validates goal feasibility using Monte Carlo simulations
- Calculates required annual returns to achieve goal
- Determines acceptable risk parameters
- Sets portfolio constraints based on timeline and risk tolerance

**What It Does NOT Do:**
- Stock analysis or selection
- Portfolio optimization
- Market data fetching (delegates to shared services)

**Key Functions:**
```javascript
async analyzeUserGoal(goalData, userProfile)
async calculateRequiredReturn(targetAmount, timeline, contributions)
async setRiskParameters(riskTolerance, timeline)
async validateGoalFeasibility(requirements)
```

**Imports:**
```javascript
const MonteCarloGoal = require('../services/monte-carlo-goal');
const RiskToleranceMapper = require('../services/risk-tolerance-mapper');
const TimelineAnalyzer = require('../services/timeline-analyzer');
const { UserGoal, PortfolioRequirements } = require('../../shared/models');
```

**Outputs To:** Stage 2 screening criteria

---

### **📁 controllers/feasibility-checker.js**

**Purpose:** Determines if user goals are mathematically achievable

**What Goes In:**
- Target amount and timeline
- Monthly contribution capacity
- Market return expectations
- Risk tolerance levels

**What It Does:**
- Runs quick Monte Carlo simulations for goal probability
- Compares required returns vs historical market performance
- Identifies unrealistic expectations
- Suggests adjustments to make goals achievable

**What It Does NOT Do:**
- Detailed portfolio analysis
- Stock selection
- Full Monte Carlo validation (that's Stage 5)

**Key Functions:**
```javascript
async checkGoalFeasibility(goalParams)
async calculateSuccessProbability(requiredReturn, timeline)
async suggestGoalAdjustments(unfeasibleGoal)
async compareToMarketReturns(requiredReturn)
```

**Imports:**
```javascript
const MonteCarloGoal = require('../services/monte-carlo-goal');
const { calculateAnnualizedReturn } = require('../../calculations/returns/returns');
const MarketData = require('../../shared/services/market-data');
```

---

### **📁 controllers/requirement-calculator.js**

**Purpose:** Calculates specific portfolio requirements from user goals

**What Goes In:**
- Validated user goals
- Risk tolerance mapping
- Timeline constraints
- Market conditions

**What It Does:**
- Calculates minimum required annual return
- Sets maximum acceptable volatility
- Determines drawdown limits
- Establishes rebalancing frequency
- Sets sector and position concentration limits

**What It Does NOT Do:**
- Asset selection
- Portfolio construction
- Risk assessment of individual stocks

**Key Functions:**
```javascript
async calculateReturnRequirements(goal)
async setVolatilityLimits(riskTolerance, timeline)
async determineDrawdownLimits(userProfile)
async setConcentrationLimits(timeline, riskLevel)
```

**Imports:**
```javascript
const RiskToleranceMapper = require('../services/risk-tolerance-mapper');
const TimelineAnalyzer = require('../services/timeline-analyzer');
const { PortfolioRequirements } = require('../../shared/models');
```

---

### **📁 services/monte-carlo-goal.js**

**Purpose:** Goal-specific Monte Carlo simulations for feasibility testing

**What Goes In:**
- Goal parameters (amount, timeline, contributions)
- Expected market returns and volatility
- Various market scenarios

**What It Does:**
- Runs lightweight Monte Carlo simulations for goal testing
- Models contribution schedules over time
- Tests goal achievement under different market conditions
- Calculates probability distributions for outcomes

**What It Does NOT Do:**
- Full portfolio simulations (that's Stage 5)
- Individual stock modeling
- Complex correlation analysis

**Key Functions:**
```javascript
async simulateGoalAchievement(goalParams)
async modelContributionSchedule(monthlyAmount, timeline)
async testMarketScenarios(goalParams, scenarios)
async calculateGoalProbability(simResults, targetAmount)
```

**Imports:**
```javascript
const { calculateCompoundReturn } = require('../../calculations/returns/returns');
const MarketData = require('../../shared/services/market-data');
const Database = require('../../shared/services/database');
```

---

## 🔍 **Stage 2: Universe Screening**

### **📁 controllers/screening-pipeline.js**

**Purpose:** Main orchestrator for the stock screening process

**What Goes In:**
- Portfolio requirements from Stage 1
- Universe of 10,000+ stocks
- Current market conditions
- Screening configuration

**What It Does:**
- Orchestrates multi-layer screening process
- Coordinates fundamental, technical, and risk screeners
- Manages screening workflow and progress tracking
- Combines screening results and applies final filters
- Ranks candidates by composite scores

**What It Does NOT Do:**
- Individual stock analysis (delegates to screeners)
- Portfolio construction
- Deep AI analysis (that's Stage 3)

**Key Functions:**
```javascript
async executeScreeningPipeline(requirements, config)
async runFundamentalScreening(universe, criteria)
async runTechnicalScreening(fundamentalPassed, criteria)
async runRiskScreening(technicalPassed, criteria)
async combineScreeningResults(screeningResults)
async rankCandidates(candidates)
```

**Imports:**
```javascript
const FundamentalScreener = require('./fundamental-screener');
const TechnicalScreener = require('./technical-screener');
const RiskScreener = require('./risk-screener');
const StockFetcher = require('../services/stock-fetcher');
const CriteriaBuilder = require('../services/criteria-builder');
const ScoreCalculator = require('../services/score-calculator');
```

**Outputs To:** Stage 3 for deep analysis

---

### **📁 screeners/fundamental/graham-screener.js**

**Purpose:** Screens stocks using Benjamin Graham's value investing criteria

**What Goes In:**
- Financial statement and ratio data
- Graham criteria parameters
- Market and bond yield data

**What It Does:**
- Applies Graham's P/E ratio limits
- Checks debt-to-equity requirements
- Evaluates earnings stability
- Calculates Graham intrinsic value
- Scores value attractiveness

**What It Does NOT Do:**
- Modern valuation methods
- Growth investing analysis
- Market timing considerations

**Key Functions:**
```javascript
async applyGrahamPECriteria(stocks)
async checkDebtRequirements(stocks)
async evaluateEarningsStability(stock, periods)
async calculateGrahamIntrinsicValue(stock, bondYield)
async scoreValueAttractiveness(grahamMetrics)
```

**Imports:**
```javascript
const { FinancialRatios, FinancialStatements } = require('../../../shared/models');
const { calculateGrahamValue } = require('../../../calculations/comparative/graham-analysis');
```

---

## 🤖 **Stage 3: AI-Enhanced Deep Analysis**

### **📁 controllers/deep-analyzer.js**

**Purpose:** Main orchestrator for comprehensive stock analysis using AI and advanced analytics

**What Goes In:**
- Candidate stocks from Stage 2 screening
- Market context and conditions
- Analysis configuration parameters
- User preferences and constraints

**What It Does:**
- Orchestrates multi-dimensional stock analysis
- Coordinates fundamental, technical, risk, and sentiment analyzers
- Integrates ML predictions and forecasts
- Manages analysis workflow and progress
- Combines all analysis results into composite scores
- Ranks stocks by overall attractiveness

**What It Does NOT Do:**
- Individual analysis calculations (delegates to specialized analyzers)
- Portfolio construction decisions
- Trading recommendations

**Key Functions:**
```javascript
async executeDeepAnalysis(candidateStocks, analysisConfig)
async runFundamentalAnalysis(stocks)
async runTechnicalAnalysis(stocks)
async runRiskAnalysis(stocks)
async runSentimentAnalysis(stocks)
async runMLPredictions(stocks)
async combineAnalysisResults(analysisResults)
async rankByCompositeScore(analyzedStocks)
```

**Imports:**
```javascript
const StockAnalyzer = require('./stock-analyzer');
const BatchAnalyzer = require('./batch-analyzer');
const CompositeScorer = require('../services/composite-scorer');
const PeerComparator = require('../services/peer-comparator');
const MarketContext = require('../services/market-context');
```

**Outputs To:** Stage 4 for portfolio optimization

---

## ⚖️ **Stage 4: Portfolio Optimization**

### **📁 controllers/optimizer.js**

**Purpose:** Main orchestrator for portfolio optimization using multiple algorithms

**What Goes In:**
- Analyzed and scored stocks from Stage 3
- Portfolio requirements from Stage 1
- Risk parameters and constraints
- Optimization preferences

**What It Does:**
- Orchestrates multiple optimization algorithms
- Manages optimization workflow and constraints
- Combines optimization results using ensemble methods
- Validates optimization outputs
- Produces final portfolio allocations

**What It Does NOT Do:**
- Individual optimization calculations (delegates to optimizers)
- Stock analysis or selection
- Risk assessment calculations

**Key Functions:**
```javascript
async optimizePortfolio(stocks, requirements, constraints)
async runMultipleOptimizers(stocks, requirements)
async combineOptimizationResults(optimizerOutputs)
async validateOptimizationOutput(portfolio)
async generateFinalAllocation(optimizedWeights)
```

**Imports:**
```javascript
const MeanVarianceOptimizer = require('../optimizers/mean-variance');
const RiskParityOptimizer = require('../optimizers/risk-parity');
const KellyCriterionOptimizer = require('../optimizers/kelly-criterion');
const BlackLittermanOptimizer = require('../optimizers/black-litterman');
const EnsembleOptimizer = require('../optimizers/ensemble-optimizer');
const ConstraintManager = require('./constraint-manager');
```

**Outputs To:** Stage 5 for Monte Carlo validation

---

## 🎲 **Stage 5: Monte Carlo Validation**

### **📁 controllers/validator.js**

**Purpose:** Main validation controller for portfolio Monte Carlo testing

**What Goes In:**
- Optimized portfolio from Stage 4
- Goal requirements from Stage 1
- Market scenarios and stress tests
- Validation parameters

**What It Does:**
- Orchestrates comprehensive Monte Carlo simulations
- Tests portfolio against user goals
- Runs stress testing scenarios
- Validates goal achievement probability
- Triggers refinement if needed

**What It Does NOT Do:**
- Individual Monte Carlo calculations
- Portfolio optimization
- Goal analysis

**Key Functions:**
```javascript
async validatePortfolio(portfolio, goalRequirements)
async runGoalAchievementTest(portfolio, goal)
async executeStressTesting(portfolio, scenarios)
async evaluateValidationResults(results)
async triggerRefinement(failedValidation)
```

**Imports:**
```javascript
const PortfolioMonteCarlo = require('../monte-carlo/portfolio');
const ScenarioTester = require('./scenario-tester');
const GoalValidator = require('../services/goal-validator');
const StressTester = require('../services/stress-tester');
```

---

### **📁 monte-carlo/portfolio.js**

**Purpose:** Core portfolio Monte Carlo simulation engine

**What Goes In:**
- Portfolio holdings with weights
- Expected returns and correlation matrix
- Time horizon and contribution schedule
- Market scenarios and parameters

**What It Does:**
- Runs thousands of portfolio simulations
- Models correlated stock returns
- Handles monthly contributions and rebalancing
- Calculates goal achievement probability
- Generates risk metrics and outcome distributions

**What It Does NOT Do:**
- Individual stock simulations (delegates to stock.js)
- Goal feasibility analysis (that's Stage 1)
- Portfolio optimization

**Key Functions:**
```javascript
async simulatePortfolioOutcomes(holdings, timeHorizon, contributions, targetAmount)
async generateCorrelatedReturns(stocks, correlationMatrix, simulations)
async modelPortfolioEvolution(weights, returns, contributions, rebalancing)
async calculateGoalAchievementProbability(finalValues, targetAmount)
async generateRiskMetrics(simulationPaths)
```

**Imports:**
```javascript
const StockMonteCarlo = require('./stock');
const ResultsProcessor = require('./results');
const { calculatePortfolioReturn, calculatePortfolioVolatility } = require('../../calculations/returns/returns');
```

---

### **📁 monte-carlo/stock.js**

**Purpose:** Individual stock price simulation using stochastic models

**What Goes In:**
- Stock price data and parameters
- Expected return and volatility
- Time horizon and number of simulations
- Correlation with other stocks

**What It Does:**
- Simulates stock price paths using geometric Brownian motion
- Generates random price movements
- Handles dividend payments and stock splits
- Provides price paths for portfolio simulations

**What It Does NOT Do:**
- Portfolio-level calculations
- Goal achievement testing
- Risk metric calculations

**Key Functions:**
```javascript
async simulateStockPrice(symbol, currentPrice, expectedReturn, volatility, timeHorizon, simulations)
async geometricBrownianMotion(S0, mu, sigma, T, steps, paths)
async generateRandomReturns(expectedReturn, volatility, timeSteps)
async applyDividends(pricePath, dividendSchedule)
async handleStockSplits(pricePath, splitEvents)
```

**Imports:**
```javascript
const { generateNormalRandom, calculateDrift } = require('../../shared/utils/random');
const { StockPrices, CorporateActions } = require('../../shared/models');
```

---

### **📁 monte-carlo/results.js**

**Purpose:** Processes and analyzes Monte Carlo simulation results

**What Goes In:**
- Raw simulation output data
- Metadata about simulation parameters
- Goal achievement criteria

**What It Does:**
- Calculates statistical measures from simulation results
- Generates probability distributions
- Computes percentiles and confidence intervals
- Formats results for API responses and storage
- Manages result persistence and retrieval

**What It Does NOT Do:**
- Run simulations (that's portfolio.js and stock.js)
- Interpret results for business decisions
- Trigger refinement processes

**Key Functions:**
```javascript
async processSimulationResults(rawResults, metadata)
async calculateStatistics(outcomes)
async generateProbabilityDistribution(finalValues)
async computePercentiles(data, percentiles)
async formatForAPI(processedResults)
async saveResults(simulationId, results)
async getResults(simulationId)
```

**Imports:**
```javascript
const Database = require('../../shared/services/database');
const { calculatePercentile, calculateConfidenceInterval } = require('../../shared/utils/statistics');
```

---

## 🔄 **Stage 6: Continuous Monitoring**

### **📁 controllers/monitor.js**

**Purpose:** Main monitoring controller for ongoing portfolio management

**What Goes In:**
- Live portfolio data
- Real-time market conditions
- User goal updates
- Performance metrics

**What It Does:**
- Orchestrates daily portfolio health checks
- Monitors performance vs goals
- Triggers rebalancing recommendations
- Generates user insights and alerts
- Manages notification delivery

**What It Does NOT Do:**
- Trade execution
- Portfolio optimization
- Market data collection

**Key Functions:**
```javascript
async monitorPortfolio(portfolioId)
async checkPortfolioHealth(portfolio)
async evaluateRebalancingNeeds(portfolio)
async generateInsights(portfolio, market)
async sendAlerts(alerts, userId)
```

**Imports:**
```javascript
const HealthChecker = require('./health-checker');
const Rebalancer = require('./rebalancer');
const InsightGenerator = require('../ai/insight-engine');
const AlertGenerator = require('../services/alert-generator');
```

---

## 🔗 **Shared Services & Utilities**

### **📁 shared/services/market-data.js**

**Purpose:** Central service for all market data operations

**What Goes In:**
- API requests for market data
- Data refresh schedules
- Caching parameters

**What It Does:**
- Fetches real-time and historical market data
- Manages data caching and refresh cycles
- Handles multiple data provider APIs
- Validates data quality and completeness
- Provides standardized data interface

**What It Does NOT Do:**
- Data analysis or interpretation
- Trading decisions
- Portfolio calculations

**Key Functions:**
```javascript
async getStockPrice(symbol)
async getHistoricalPrices(symbol, period)
async getMarketData(symbols)
async refreshMarketData()
async validateDataQuality(data)
```

**Used By:** All stages that need market data

---

### **📁 shared/services/database.js**

**Purpose:** Central database connection and query management

**What Goes In:**
- Database connection parameters
- SQL queries and parameters
- Transaction management

**What It Does:**
- Manages PostgreSQL connections
- Executes queries with proper error handling
- Handles connection pooling
- Manages database transactions
- Provides query logging and monitoring

**What It Does NOT Do:**
- Business logic
- Data validation
- ORM functionality

**Key Functions:**
```javascript
async query(sql, params)
async transaction(queries)
async getConnection()
async closeConnections()
async healthCheck()
```

**Used By:** All models and data access layers

---

### **📁 shared/models/user.js**

**Purpose:** User data model and database operations

**What Goes In:**
- User registration data
- Authentication credentials
- Profile updates

**What It Does:**
- Manages user CRUD operations
- Handles password hashing and validation
- Manages user sessions
- Provides user profile operations
- Handles user preferences

**What It Does NOT Do:**
- Authentication logic (middleware handles this)
- Portfolio management
- Goal analysis

**Key Properties:**
```javascript
{
  id: UUID,
  email: String,
  mobile: String,
  firstName: String,
  lastName: String,
  passwordHash: String,
  subscriptionTier: String,
  isActive: Boolean
}
```

**Key Functions:**
```javascript
static async create(userData)
static async findByEmail(email)
static async updateProfile(userId, updates)
static async validatePassword(userId, password)
static async deactivate(userId)
```

**Used By:** Authentication, user management, all user-related operations

---

## 📊 **Calculations Library**

The calculations folder contains pure mathematical functions that are used across all stages. **IMPORTANT:** These are utility functions, NOT API endpoints. They power your API endpoints but are separate from them.

### **📁 calculations/returns/returns.js**

**Purpose:** Core return calculation functions used across the system

**What Goes In:**
- Price data arrays
- Return calculation parameters
- Time period specifications

**What It Does:**
- Calculates daily, weekly, monthly, annual returns
- Computes return statistics (mean, std dev, skewness, kurtosis)
- Handles different return calculation methods
- Calculates rolling returns and statistics
- Provides return distribution analysis

**What It Does NOT Do:**
- Risk-adjusted return calculations (separate file)
- Portfolio-level return calculations
- Benchmark comparisons

**Key Functions:**
```javascript
calculateDailyReturns(prices)
calculateAnnualizedReturn(returns)
calculateRollingReturns(returns, window)
calculateReturnStatistics(returns)
calculateCompoundReturn(returns)
```

**Used By:** 
- `/api/stocks/:symbol/returns` endpoint
- All stages for return analysis
- Monte Carlo simulations

---

### **📁 calculations/returns/risk-adjusted-returns.js**

**Purpose:** Risk-adjusted performance metrics and ratios

**What Goes In:**
- Return data
- Risk-free rates
- Benchmark returns
- Beta calculations

**What It Does:**
- Calculates Sharpe, Sortino, Calmar ratios
- Computes alpha and beta
- Calculates Value at Risk (VaR)
- Determines maximum drawdown
- Analyzes risk-adjusted performance

**What It Does NOT Do:**
- Basic return calculations
- Portfolio optimization
- Options pricing

**Key Functions:**
```javascript
calculateSharpeRatio(returns, riskFreeRate)
calculateSortinoRatio(returns, riskFreeRate)
calculateCalmarRatio(returns, maxDrawdown)
calculateBeta(stockReturns, marketReturns)
calculateAlpha(returns, marketReturns, beta, riskFreeRate)
calculateVaR(returns, confidenceLevel)
```

**Used By:**
- `/api/stocks/:symbol/risk-adjusted-returns` endpoint
- Risk analysis in Stage 3
- Portfolio optimization in Stage 4
- Validation in Stage 5

---

### **📁 calculations/options/black-scholes.js**

**Purpose:** Black-Scholes options pricing and Greeks calculations

**What Goes In:**
- Stock price
- Strike price
- Time to expiration
- Volatility
- Risk-free rate

**What It Does:**
- Calculates theoretical option prices
- Computes option Greeks (Delta, Gamma, Theta, Vega, Rho)
- Handles both calls and puts
- Provides sensitivity analysis
- Validates input parameters

**What It Does NOT Do:**
- Implied volatility calculations (separate function)
- Options trading strategies
- Portfolio-level options analysis

**Key Functions:**
```javascript
blackScholesCall(S, K, T, r, sigma)
blackScholesPut(S, K, T, r, sigma)
calculateDelta(S, K, T, r, sigma, optionType)
calculateGamma(S, K, T, r, sigma)
calculateTheta(S, K, T, r, sigma, optionType)
calculateVega(S, K, T, r, sigma)
calculateRho(S, K, T, r, sigma, optionType)
```

**Used By:**
- `/api/options/black-scholes` endpoint
- `/api/options/:symbol/greeks` endpoint
- Volatility analysis in Stage 3

---

### **📁 calculations/comparative/graham-analysis.js**

**Purpose:** Benjamin Graham value investing calculations

**What Goes In:**
- Financial statement data
- Current stock price
- Bond yield data
- Earnings history

**What It Does:**
- Calculates Graham intrinsic value
- Applies Graham investment criteria
- Evaluates earnings stability
- Determines margin of safety
- Scores value attractiveness

**What It Does NOT Do:**
- Modern valuation methods
- Growth stock analysis
- Technical analysis

**Key Functions:**
```javascript
calculateGrahamIntrinsicValue(eps, bondYield, growthRate)
applyGrahamCriteria(financialData)
evaluateEarningsStability(earningsHistory)
calculateMarginOfSafety(marketPrice, intrinsicValue)
scoreValueAttractiveness(grahamMetrics)
```

**Used By:**
- `/api/stocks/:symbol/graham-score` endpoint
- `/api/stocks/:symbol/intrinsic-value` endpoint
- Graham screener in Stage 2
- Fundamental analysis in Stage 3

---

## 🗄️ **Database Layer**

### **📁 database/connection.js**

**Purpose:** PostgreSQL connection management and configuration

**What Goes In:**
- Database connection parameters
- Connection pool settings
- SSL configuration

**What It Does:**
- Establishes PostgreSQL connections
- Manages connection pooling
- Handles connection failures and retries
- Provides connection health monitoring
- Manages SSL certificates

**What It Does NOT Do:**
- Query execution
- Data validation
- Business logic

**Key Functions:**
```javascript
establishConnection()
createPool()
checkHealth()
closeConnections()
handleReconnection()
```

**Used By:** Database service, all data access operations

---

### **Your db.sql Schema Integration:**

Your comprehensive PostgreSQL schema (db.sql) provides the foundation for all data operations. The models files are JavaScript wrappers that make it easier to work with your PostgreSQL tables:

```javascript
// models/user.js works with your users table from db.sql
class User {
  static async create(userData) {
    return await db.query(`
      INSERT INTO users (email, mobile, first_name, last_name, password_hash)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [userData.email, userData.mobile, userData.firstName, userData.lastName, userData.passwordHash]);
  }
}
```

---

## 🔄 **File Interactions & Dependencies**

### **Critical Data Flow Paths:**

**1. Goal Analysis → Screening:**
- `goal-analyzer.js` produces portfolio requirements
- `screening-pipeline.js` consumes requirements to set screening criteria
- `criteria-builder.js` translates requirements into specific filters

**2. Screening → Analysis:**
- `screening-pipeline.js` outputs candidate stock list
- `deep-analyzer.js` receives candidates for comprehensive analysis
- `composite-scorer.js` combines all analysis scores

**3. Analysis → Optimization:**
- `deep-analyzer.js` provides scored stocks
- `optimizer.js` uses scores and constraints for portfolio construction
- Multiple optimizer files work together for ensemble approach

**4. Optimization → Validation:**
- `optimizer.js` produces portfolio weights
- `validator.js` tests portfolio against goals
- `portfolio.js` (Monte Carlo) simulates portfolio performance

**5. Validation → Monitoring:**
- `validator.js` approves portfolio for live management
- `monitor.js` continuously tracks performance
- `health-checker.js` identifies rebalancing needs

### **Cross-Stage Dependencies:**

**Shared Services Used By All Stages:**
- `market-data.js` - Real-time and historical data
- `database.js` - All data persistence
- `cache.js` - Performance optimization
- `auth.js` - User authentication

**Calculations Library Usage:**
- **Stage 1:** `returns.js` for goal feasibility
- **Stage 2:** All calculation files for screening
- **Stage 3:** All files for comprehensive analysis
- **Stage 4:** `risk-adjusted-returns.js` for optimization
- **Stage 5:** `returns.js` and Monte Carlo for validation
- **Stage 6:** All files for performance monitoring

**Models Used Across Stages:**
- `user.js` - User data (all stages)
- `portfolio.js` - Portfolio data (Stages 4-6)
- `stock.js` - Stock data (Stages 2-6)
- `trade.js` - Trading data (Stage 6)

---

## 🤖 **Copilot Implementation Prompts**

### **Stage 1 Goal Analysis Prompt:**
```javascript
/**
 * Goal Analysis Controller for Gro Investment App
 * 
 * This controller handles the initial analysis of user investment goals
 * and converts them into concrete portfolio requirements.
 * 
 * CONTEXT:
 * - Users input goals like "retire with $1M in 30 years"
 * - System must determine if goal is achievable
 * - Calculate required returns and acceptable risk levels
 * - Output feeds into stock screening process
 * 
 * REQUIREMENTS:
 * - Validate goal feasibility using Monte Carlo
 * - Calculate required annual return rate
 * - Set risk parameters based on timeline and tolerance
 * - Handle edge cases (unrealistic goals, short timelines)
 * - Integrate with PostgreSQL database using db.sql schema
 * 
 * INPUT: User goal object with target amount, timeline, monthly contributions
 * OUTPUT: Portfolio requirements object for screening
 * 
 * DATABASE TABLES USED:
 * - users (from db.sql)
 * - user_investment_profiles (from db.sql) 
 * - portfolios (from db.sql)
 * 
 * IMPORTS NEEDED:
 * - MonteCarloGoal service for feasibility testing
 * - RiskToleranceMapper for risk parameter conversion
 * - Database service for PostgreSQL operations
 * 
 * Please implement the goal-analyzer.js controller with all required functions.
 */
```

### **Stage 2 Screening Pipeline Prompt:**
```javascript
/**
 * Screening Pipeline Controller for Gro Stock Engine
 * 
 * This controller orchestrates the multi-stage screening of 10,000+ stocks
 * to identify candidates suitable for goal-driven portfolio construction.
 * 
 * CONTEXT:
 * - Receives portfolio requirements from Stage 1 goal analysis
 * - Must filter universe through fundamental, technical, and risk screens
 * - Benjamin Graham criteria are part of fundamental screening
 * - Output feeds into AI-enhanced deep analysis in Stage 3
 * 
 * SCREENING STAGES:
 * 1. Fundamental: P/E ratios, debt levels, profitability, Graham criteria
 * 2. Technical: Trend direction, momentum, volume, volatility
 * 3. Risk: Beta ranges, drawdown limits, liquidity requirements
 * 
 * PERFORMANCE REQUIREMENTS:
 * - Process 10,000+ stocks efficiently using PostgreSQL
 * - Use indexes from db.sql for optimal performance
 * - Implement parallel processing where possible
 * - Cache results for repeated screenings
 * 
 * DATABASE TABLES USED:
 * - companies (from db.sql)
 * - stock_prices (partitioned table from db.sql)
 * - financial_ratios (from db.sql)
 * - technical_indicators (from db.sql)
 * - risk_metrics (from db.sql)
 * 
 * IMPORTS NEEDED:
 * - FundamentalScreener, TechnicalScreener, RiskScreener
 * - StockFetcher for universe management
 * - CriteriaBuilder for requirement translation
 * - Graham screening functions from calculations/comparative/
 * 
 * Please implement screening-pipeline.js with all orchestration functions.
 */
```

### **Stage 3 Deep Analysis Prompt:**
```javascript
/**
 * Deep Analysis Controller for Gro AI Stock Engine
 * 
 * This controller orchestrates comprehensive AI-enhanced analysis of stocks
 * that passed the screening pipeline, preparing them for optimization.
 * 
 * CONTEXT:
 * - Receives ~100-200 candidate stocks from screening pipeline
 * - Performs multi-dimensional analysis using AI and ML models
 * - Combines fundamental, technical, risk, sentiment, and ML predictions
 * - Output feeds into portfolio optimization algorithms
 * 
 * ANALYSIS DIMENSIONS:
 * - Fundamental: Ratios, cash flow, profitability, Graham analysis
 * - Technical: Moving averages, oscillators, support/resistance
 * - Risk: Beta, VaR, drawdown, tail risk, correlations
 * - Sentiment: News analysis, social media, analyst recommendations
 * - ML: Earnings predictions, momentum forecasting, volatility prediction
 * 
 * AI/ML INTEGRATION:
 * - Use TensorFlow.js for client-side ML models
 * - Integrate with external AI APIs for sentiment analysis
 * - Combine multiple ML predictions using ensemble methods
 * - Generate confidence scores for all predictions
 * 
 * DATABASE TABLES USED:
 * - All tables from previous stages plus:
 * - sentiment_scores (from db.sql)
 * - ml_predictions (from db.sql)
 * - support_resistance (from db.sql)
 * 
 * CALCULATIONS INTEGRATION:
 * - Import from calculations/returns/ for return analysis
 * - Import from calculations/options/ for volatility metrics
 * - Import from calculations/comparative/ for peer analysis
 * 
 * Please implement deep-analyzer.js with comprehensive AI analysis.
 */
```

### **Stage 4 Portfolio Optimization Prompt:**
```javascript
/**
 * Portfolio Optimization Controller for Gro Investment Engine
 * 
 * This controller implements multiple optimization algorithms and combines
 * them using ensemble methods to create goal-aligned portfolios.
 * 
 * CONTEXT:
 * - Receives analyzed and scored stocks from Stage 3
 * - Uses portfolio requirements from Stage 1 as constraints
 * - Implements multiple optimization methods for robustness
 * - Output feeds into Monte Carlo validation
 * 
 * OPTIMIZATION METHODS:
 * - Mean-Variance Optimization (Markowitz)
 * - Risk Parity (equal risk contribution)
 * - Kelly Criterion (optimal position sizing)
 * - Black-Litterman (with ML views)
 * - Ensemble combination of above methods
 * 
 * CONSTRAINTS MANAGEMENT:
 * - Maximum position size (typically 8%)
 * - Sector concentration limits (max 25% per sector)
 * - Minimum number of positions (15-25 stocks)
 * - Risk limits from user goals (volatility, drawdown)
 * - Liquidity requirements for trading
 * 
 * MATHEMATICAL REQUIREMENTS:
 * - Implement quadratic programming for mean-variance
 * - Handle correlation matrices and ensure positive definiteness
 * - Use numerical optimization libraries
 * - Validate constraint feasibility
 * 
 * DATABASE TABLES USED:
 * - portfolios (from db.sql)
 * - portfolio_holdings (from db.sql)
 * - correlation matrices calculated in real-time
 * 
 * CALCULATIONS INTEGRATION:
 * - Risk-adjusted returns for Sharpe ratio optimization
 * - Correlation calculations for diversification
 * - Kelly criterion from position sizing utilities
 * 
 * Please implement optimizer.js with multi-algorithm ensemble approach.
 */
```

### **Stage 5 Monte Carlo Validation Prompt:**
```javascript
/**
 * Monte Carlo Portfolio Validation Engine for Gro
 * 
 * This system validates optimized portfolios by simulating thousands of
 * market scenarios to test goal achievement probability.
 * 
 * CONTEXT:
 * - Receives optimized portfolio from Stage 4
 * - Tests against user goals from Stage 1
 * - Must achieve >70% goal success probability to pass
 * - If failed, triggers portfolio refinement
 * 
 * SIMULATION REQUIREMENTS:
 * - Run 10,000+ Monte Carlo simulations
 * - Model 5-40 year investment periods
 * - Handle monthly contributions and rebalancing
 * - Use correlated stock returns (correlation matrices)
 * - Test multiple market scenarios (bull, bear, crisis)
 * 
 * RISK SCENARIOS:
 * - Normal market conditions
 * - 2008 financial crisis conditions
 * - COVID-19 crash scenarios
 * - High inflation periods
 * - Prolonged bear markets
 * 
 * OUTPUT METRICS:
 * - Goal achievement probability (target: >70%)
 * - Expected portfolio value distribution
 * - Maximum expected drawdown
 * - Value at Risk (95% and 99% confidence)
 * - Time to goal analysis
 * - Stress test results
 * 
 * MATHEMATICAL MODELS:
 * - Geometric Brownian Motion for stock prices
 * - Multivariate normal distribution for correlations
 * - Historical simulation for crisis scenarios
 * - Bootstrap resampling for robustness
 * 
 * FILES TO IMPLEMENT:
 * - portfolio.js: Main portfolio simulation engine
 * - stock.js: Individual stock price simulation
 * - results.js: Process and analyze simulation output
 * 
 * DATABASE INTEGRATION:
 * - Save simulation results for future reference
 * - Use historical data for parameter estimation
 * - Store goal achievement probabilities
 * 
 * Please implement the complete Monte Carlo validation system.
 */
```

### **Stage 6 Monitoring Prompt:**
```javascript
/**
 * Continuous Portfolio Monitoring System for Gro
 * 
 * This system provides ongoing monitoring, rebalancing, and AI-powered
 * insights for live portfolios after they've been approved and funded.
 * 
 * CONTEXT:
 * - Monitors live portfolios daily for health and performance
 * - Tracks progress toward user goals
 * - Generates rebalancing recommendations
 * - Provides AI-powered insights and explanations
 * - Sends alerts and notifications to users
 * 
 * MONITORING FUNCTIONS:
 * - Daily portfolio value and performance tracking
 * - Goal progress monitoring and projection
 * - Risk metric monitoring (VaR, drawdown, volatility)
 * - Correlation drift detection
 * - Market regime change detection
 * 
 * REBALANCING TRIGGERS:
 * - Weight drift beyond thresholds (typically 5%)
 * - Risk characteristics changed significantly
 * - New opportunities identified by screening
 * - User goal timeline adjustments
 * - Market regime changes
 * 
 * AI INSIGHTS GENERATION:
 * - Daily portfolio health summaries
 * - Weekly performance explanations
 * - Market impact analysis on portfolio
 * - Rebalancing recommendations with reasoning
 * - Goal achievement probability updates
 * 
 * NOTIFICATION SYSTEM:
 * - Push notifications for urgent alerts
 * - Email summaries for weekly updates
 * - In-app insights and explanations
 * - Risk alerts when thresholds breached
 * 
 * DATABASE TABLES USED:
 * - portfolio_performance (daily tracking from db.sql)
 * - portfolio_rebalancing (rebalancing history from db.sql)
 * - user_insights (AI-generated insights from db.sql)
 * - notifications (user alerts from db.sql)
 * 
 * REAL-TIME REQUIREMENTS:
 * - Process market data updates efficiently
 * - Calculate portfolio metrics in real-time
 * - Handle thousands of portfolios simultaneously
 * - Maintain low latency for user requests
 * 
 * Please implement the complete monitoring and insights system.
 */
```

### **Calculations Library Prompts:**

#### **Returns Calculation Prompt:**
```javascript
/**
 * Core Returns Calculation Library for Gro Financial Engine
 * 
 * This library provides fundamental return calculation functions used
 * throughout the Gro backend for analysis and optimization.
 * 
 * CONTEXT:
 * - Pure mathematical functions, no API endpoints
 * - Used by all stages for return analysis
 * - Feeds the /api/stocks/:symbol/returns endpoint
 * - Essential for Monte Carlo simulations
 * 
 * CALCULATION TYPES:
 * - Daily, weekly, monthly, annual returns
 * - Logarithmic vs arithmetic returns
 * - Rolling returns over time windows
 * - Compound annual growth rate (CAGR)
 * - Return statistics (mean, std dev, skewness, kurtosis)
 * 
 * INPUT FORMATS:
 * - Price arrays: [100, 102, 98, 105, ...]
 * - Date-price objects: [{date: '2024-01-01', price: 100}, ...]
 * - OHLCV data for comprehensive analysis
 * 
 * PERFORMANCE REQUIREMENTS:
 * - Handle large datasets efficiently (1000+ data points)
 * - Optimize for repeated calculations
 * - Handle missing data gracefully
 * - Validate input data quality
 * 
 * ERROR HANDLING:
 * - Handle division by zero
 * - Manage missing or invalid price data
 * - Validate date sequences
 * - Handle negative prices appropriately
 * 
 * FUNCTIONS TO IMPLEMENT:
 * - calculateDailyReturns(prices)
 * - calculateLogReturns(prices)
 * - calculateRollingReturns(returns, window)
 * - calculateAnnualizedReturn(returns, frequency)
 * - calculateReturnStatistics(returns)
 * - calculateCompoundReturn(returns)
 * - calculateVolatility(returns, annualize=true)
 * 
 * Please implement comprehensive returns calculation library.
 */
```

#### **Risk-Adjusted Returns Prompt:**
```javascript
/**
 * Risk-Adjusted Returns Calculation Library for Gro
 * 
 * This library calculates risk-adjusted performance metrics essential
 * for portfolio optimization and risk management.
 * 
 * CONTEXT:
 * - Builds on basic returns calculations
 * - Feeds /api/stocks/:symbol/risk-adjusted-returns endpoint
 * - Critical for Stage 4 optimization algorithms
 * - Used in Monte Carlo validation
 * 
 * METRICS TO CALCULATE:
 * - Sharpe Ratio: (Return - RiskFree) / Volatility
 * - Sortino Ratio: (Return - RiskFree) / DownsideVolatility
 * - Calmar Ratio: AnnualReturn / MaxDrawdown
 * - Treynor Ratio: (Return - RiskFree) / Beta
 * - Information Ratio: ExcessReturn / TrackingError
 * - Alpha: Actual return - Expected return (CAPM)
 * - Beta: Covariance(stock, market) / Variance(market)
 * 
 * RISK METRICS:
 * - Value at Risk (VaR) at 95% and 99% confidence
 * - Expected Shortfall (Conditional VaR)
 * - Maximum Drawdown and recovery time
 * - Downside deviation and volatility
 * - Tail ratio and extreme value analysis
 * 
 * MATHEMATICAL MODELS:
 * - Historical simulation for VaR
 * - Parametric VaR using normal distribution
 * - Monte Carlo VaR for complex portfolios
 * - GARCH models for volatility clustering
 * 
 * BENCHMARK INTEGRATION:
 * - S&P 500 as default market benchmark
 * - Sector-specific benchmarks
 * - Risk-free rate (Treasury bills)
 * - Custom benchmark comparisons
 * 
 * PERFORMANCE CONSIDERATIONS:
 * - Efficient correlation calculations
 * - Optimized matrix operations
 * - Parallel processing for complex metrics
 * - Caching of intermediate results
 * 
 * Please implement comprehensive risk-adjusted returns library.
 */
```

---

## 🔚 **Final Implementation Notes**

### **Key Success Factors:**

1. **Stage Independence:** Each stage should be self-contained with clear inputs/outputs
2. **Database Integration:** All stages use your PostgreSQL schema from db.sql
3. **Calculations Library:** Pure functions separate from API endpoints
4. **Error Handling:** Robust error handling throughout the pipeline
5. **Performance:** Optimized for handling thousands of users and stocks
6. **Monitoring:** Comprehensive logging and performance tracking

### **Development Order Recommendation:**

1. **Start with shared services** (database, models, market data)
2. **Implement calculations library** (returns, risk-adjusted returns)
3. **Build Stage 1** (goal analysis) - foundation for everything
4. **Build Stage 2** (screening) - reduces data volume for testing
5. **Build Stage 3** (analysis) - can test with small stock sets
6. **Build Stage 4** (optimization) - mathematical complexity
7. **Build Stage 5** (Monte Carlo) - computationally intensive
8. **Build Stage 6** (monitoring) - requires live data integration

### **Testing Strategy:**

- **Unit tests** for all calculation functions
- **Integration tests** for stage-to-stage data flow
- **Performance tests** with realistic data volumes
- **Stress tests** for Monte Carlo simulations
- **User acceptance tests** for complete goal-to-portfolio flow

This architecture guide provides everything you need to implement your Gro backend with clear responsibilities, proper separation of concerns, and optimal performance for goal-driven portfolio creation at scale.