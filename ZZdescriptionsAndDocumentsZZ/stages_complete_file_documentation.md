<div align="center">

# 📁 **Complete Stages File Documentation**
### *Every Single File in src/stages/01-06*

<img src="https://img.shields.io/badge/Total_Files-109-3B82F6?style=for-the-badge&logo=folder&logoColor=white" />
<img src="https://img.shields.io/badge/Stages-6-3B82F6?style=for-the-badge&logo=layers&logoColor=white" />
<img src="https://img.shields.io/badge/Architecture-Complete-3B82F6?style=for-the-badge&logo=blueprint&logoColor=white" />

---

</div>

## 🎯 **Stage 1: Goal Analysis & Requirements Engine**
*Path: `/server/src/stages/01-goal-analysis/`*

### 📋 **User Flow Stage 1:**
1. **User Input** → `routes/goal-analysis.js` → `controllers/goal-analyser.js`
2. **Risk Assessment** → `services/risk-tolerance-mapper.js` 
3. **Timeline Analysis** → `services/timeline-analyzer.js`
4. **Monte Carlo Goal Testing** → `services/monte-carlo-goal.js`
5. **Feasibility Check** → `controllers/feasability-checker.js`
6. **Requirements Calculation** → `controllers/requirement-calculators.js`
7. **Output** → `models/portfolio-requirements.js`

---

### 🗂️ **Controllers**

#### **`controllers/feasability-checker.js`**
- **What it does**: Validates if user goals are mathematically achievable
- **Imports to use**: `../models/goal-data-model.js`, `../services/monte-carlo-goal.js`
- **What it does NOT do**: Does not modify user goals, only validates feasibility
- **User flow**: Takes calculated requirements and validates against market reality

#### **`controllers/goal-analyser.js`**
- **What it does**: Main controller that orchestrates entire goal analysis process
- **Imports to use**: `../models/goal-data-model.js`, `../services/risk-tolerance-mapper.js`, `../services/timeline-analyzer.js`
- **What it does NOT do**: Does not handle user authentication or data persistence
- **User flow**: Entry point for all goal analysis requests

#### **`controllers/requirement-calculators.js`**
- **What it does**: Calculates specific portfolio requirements from user goals
- **Imports to use**: `../models/portfolio-requirements.js`, `../services/monte-carlo-goal.js`
- **What it does NOT do**: Does not validate input data, assumes pre-validated goals
- **User flow**: Transforms user goals into specific portfolio constraints

### 🗂️ **Models**

#### **`models/goal-data-model.js`**
- **What it does**: Defines data structure for user goals and financial situation
- **Imports to use**: No external dependencies, pure data model
- **What it does NOT do**: Does not include validation logic or business rules
- **User flow**: Data container for all user goal inputs

#### **`models/portfolio-requirements.js`**
- **What it does**: Defines output structure for calculated portfolio requirements
- **Imports to use**: No external dependencies, pure data model
- **What it does NOT do**: Does not include calculation logic
- **User flow**: Data container for Stage 1 outputs

### 🗂️ **Routes**

#### **`routes/goal-analysis.js`**
- **What it does**: Defines HTTP endpoints for goal analysis functionality
- **Imports to use**: `express`, `../controllers/goal-analyser.js`, `../controllers/feasability-checker.js`
- **What it does NOT do**: Does not include business logic, only routing
- **User flow**: HTTP entry point for Stage 1 API calls

### 🗂️ **Services**

#### **`services/monte-carlo-goal.js`**
- **What it does**: Runs Monte Carlo simulations to determine required returns for goals
- **Imports to use**: `../../shared/utils/monte-carlo-utils.js`, `../models/goal-data-model.js`
- **What it does NOT do**: Does not validate portfolio construction, only goal feasibility
- **User flow**: Calculates probability of achieving goals with different return scenarios

#### **`services/risk-tolerance-mapper.js`**
- **What it does**: Maps user risk tolerance (1-10) to specific volatility limits
- **Imports to use**: `../../shared/utils/risk-calculations.js`
- **What it does NOT do**: Does not assess psychological risk tolerance, only maps numerical values
- **User flow**: Converts subjective risk tolerance to objective portfolio constraints

#### **`services/timeline-analyzer.js`**
- **What it does**: Analyzes time horizon to determine appropriate investment strategies
- **Imports to use**: `../../shared/utils/time-calculations.js`
- **What it does NOT do**: Does not account for personal circumstances, only time mathematics
- **User flow**: Determines time-based constraints for portfolio optimization

---

## 🔍 **Stage 2: Universe Screening Engine**
*Path: `/server/src/stages/02-universe-screening/`*

### 📋 **User Flow Stage 2:**
1. **Requirements Input** → `controllers/screening-pipeline.js`
2. **Fundamental Screen** → `controllers/fundamental-screener.js` → Multiple `screeners/fundamental/`
3. **Technical Screen** → `controllers/technical-screener.js` → Multiple `screeners/technical/`
4. **Risk Screen** → `controllers/risk-screener.js` → Multiple `screeners/risk/`
5. **Score Calculation** → `services/score-calculator.js`
6. **Stock Fetching** → `services/stock-fetcher.js`
7. **Output** → ~100-200 screened stocks

---

### 🗂️ **Controllers**

#### **`controllers/fundamental-screener.js`**
- **What it does**: Orchestrates all fundamental analysis screening filters
- **Imports to use**: `../screeners/fundamental/ratios-screener.js`, `../screeners/fundamental/profitability-screener.js`, etc.
- **What it does NOT do**: Does not perform actual calculations, only coordinates screeners
- **User flow**: Applies all fundamental filters to stock universe

#### **`controllers/risk-screener.js`**
- **What it does**: Orchestrates all risk-based screening filters
- **Imports to use**: `../screeners/risk/beta-screener.js`, `../screeners/risk/liquidity-screener.js`, etc.
- **What it does NOT do**: Does not calculate risk metrics, only applies thresholds
- **User flow**: Applies risk tolerance constraints from Stage 1

#### **`controllers/screening-pipeline.js`**
- **What it does**: Main controller that runs entire screening process sequentially
- **Imports to use**: `./fundamental-screener.js`, `./technical-screener.js`, `./risk-screener.js`
- **What it does NOT do**: Does not modify screening criteria, only executes pipeline
- **User flow**: Central orchestrator for all screening activities

#### **`controllers/technical-screener.js`**
- **What it does**: Orchestrates all technical analysis screening filters
- **Imports to use**: `../screeners/technical/momentum-screener.js`, `../screeners/technical/trend-screener.js`, etc.
- **What it does NOT do**: Does not generate technical indicators, only applies filters
- **User flow**: Applies technical analysis constraints to filter stocks

### 🗂️ **Routes**

#### **`routes/screening.js`**
- **What it does**: Defines HTTP endpoints for universe screening functionality
- **Imports to use**: `express`, `../controllers/screening-pipeline.js`
- **What it does NOT do**: Does not include business logic, only routing
- **User flow**: HTTP entry point for Stage 2 API calls

### 🗂️ **Screeners - Fundamental**

#### **`screeners/fundamental/graham-screener.js`**
- **What it does**: Applies Benjamin Graham value investing criteria
- **Imports to use**: `../../../shared/utils/fundamental-calculations.js`
- **What it does NOT do**: Does not fetch data, only applies Graham rules to existing data
- **User flow**: Filters stocks based on classic value investing principles

#### **`screeners/fundamental/growth-screener.js`**
- **What it does**: Filters stocks based on growth metrics (revenue, earnings growth)
- **Imports to use**: `../../../shared/utils/fundamental-calculations.js`
- **What it does NOT do**: Does not predict future growth, only screens historical growth
- **User flow**: Identifies stocks with consistent growth patterns

#### **`screeners/fundamental/profitability-screener.js`**
- **What it does**: Filters stocks based on profitability metrics (ROE, ROA, margins)
- **Imports to use**: `../../../shared/utils/fundamental-calculations.js`
- **What it does NOT do**: Does not assess future profitability, only current metrics
- **User flow**: Ensures only profitable companies pass screening

#### **`screeners/fundamental/quality-screener.js`**
- **What it does**: Applies quality indicators (Piotroski, Altman Z-Score)
- **Imports to use**: `../../../shared/utils/fundamental-calculations.js`
- **What it does NOT do**: Does not create new quality metrics, only applies established ones
- **User flow**: Filters for financially stable companies

#### **`screeners/fundamental/ratios-screener.js`**
- **What it does**: Filters stocks based on financial ratios (P/E, P/B, debt ratios)
- **Imports to use**: `../../../shared/utils/fundamental-calculations.js`
- **What it does NOT do**: Does not calculate ratios, only applies ratio-based filters
- **User flow**: Applies valuation and leverage constraints

### 🗂️ **Screeners - Risk**

#### **`screeners/risk/beta-screener.js`**
- **What it does**: Filters stocks based on beta (systematic risk) constraints
- **Imports to use**: `../../../shared/utils/risk-calculations.js`
- **What it does NOT do**: Does not calculate beta, only applies beta filters
- **User flow**: Ensures stocks match user risk tolerance from Stage 1

#### **`screeners/risk/drawdown-screener.js`**
- **What it does**: Filters stocks based on maximum historical drawdown limits
- **Imports to use**: `../../../shared/utils/risk-calculations.js`
- **What it does NOT do**: Does not predict future drawdowns, only screens historical data
- **User flow**: Removes stocks with excessive historical volatility

#### **`screeners/risk/liquidity-screener.js`**
- **What it does**: Filters stocks based on trading volume and market cap requirements
- **Imports to use**: `../../../shared/utils/market-data.js`
- **What it does NOT do**: Does not assess intraday liquidity, only daily volume metrics
- **User flow**: Ensures stocks are tradeable in required position sizes

### 🗂️ **Screeners - Technical**

#### **`screeners/technical/momentum-screener.js`**
- **What it does**: Filters stocks based on momentum indicators (RSI, MACD)
- **Imports to use**: `../../../shared/utils/technical-indicators.js`
- **What it does NOT do**: Does not generate buy/sell signals, only applies momentum filters
- **User flow**: Identifies stocks with favorable momentum characteristics

#### **`screeners/technical/trend-screener.js`**
- **What it does**: Filters stocks based on trend direction and strength
- **Imports to use**: `../../../shared/utils/technical-indicators.js`
- **What it does NOT do**: Does not predict trend changes, only identifies current trends
- **User flow**: Ensures stocks align with overall market trend requirements

#### **`screeners/technical/volatility-screener.js`**
- **What it does**: Filters stocks based on volatility constraints from Stage 1
- **Imports to use**: `../../../shared/utils/volatility-calculations.js`
- **What it does NOT do**: Does not forecast volatility, only screens historical volatility
- **User flow**: Removes stocks that exceed user volatility tolerance

#### **`screeners/technical/volume-screener.js`**
- **What it does**: Filters stocks based on trading volume patterns and consistency
- **Imports to use**: `../../../shared/utils/volume-analysis.js`
- **What it does NOT do**: Does not analyze volume-price relationships, only volume metrics
- **User flow**: Ensures consistent trading activity for portfolio execution

### 🗂️ **Services**

#### **`services/criteria-builder.js`**
- **What it does**: Builds screening criteria from Stage 1 portfolio requirements
- **Imports to use**: `../../01-goal-analysis/models/portfolio-requirements.js`
- **What it does NOT do**: Does not modify requirements, only translates to screening parameters
- **User flow**: Converts Stage 1 outputs into Stage 2 screening inputs

#### **`services/score-calculator.js`**
- **What it does**: Calculates composite scores for stocks that pass all screening filters
- **Imports to use**: `../../shared/utils/scoring-algorithms.js`
- **What it does NOT do**: Does not rank portfolios, only individual stock scores
- **User flow**: Assigns scores to screened stocks for Stage 3 prioritization

#### **`services/stock-fetcher.js`**
- **What it does**: Fetches stock data from external APIs and databases
- **Imports to use**: `../../shared/services/market-data-api.js`, `../../database/db.js`
- **What it does NOT do**: Does not cache data or handle rate limiting
- **User flow**: Provides data input for all screening operations

---

## 🤖 **Stage 3: AI-Enhanced Deep Analysis Engine**
*Path: `/server/src/stages/03-ai-analysis/`*

### 📋 **User Flow Stage 3:**
1. **Screened Stocks Input** → `controllers/stock-analyser.js`
2. **Fundamental Analysis** → Multiple `analyzers/fundamental/`
3. **Technical Analysis** → Multiple `analyzers/technical/`
4. **Risk Analysis** → Multiple `analyzers/risk/`
5. **ML Predictions** → Multiple `analyzers/ml/`
6. **Sentiment Analysis** → Multiple `analyzers/sentiment/`
7. **Composite Scoring** → `services/composite-scorer.js`
8. **Market Context** → `services/market-context.js`
9. **Peer Comparison** → `services/peer-comparitor.js`
10. **Output** → Analyzed stocks with AI scores

---

### 🗂️ **Analyzers - Fundamental**

#### **`analyzers/fundamental/cashflow-analyser.js`**
- **What it does**: Deep analysis of cash flow statements and cash generation patterns
- **Imports to use**: `../../../shared/utils/cashflow-calculations.js`, `../../../shared/services/financial-data.js`
- **What it does NOT do**: Does not forecast future cash flows, only analyzes historical patterns
- **User flow**: Provides cash flow quality scores for investment decisions

#### **`analyzers/fundamental/coverage-analyser.js`**
- **What it does**: Analyzes analyst coverage and institutional ownership patterns
- **Imports to use**: `../../../shared/services/analyst-data.js`
- **What it does NOT do**: Does not assess analyst accuracy, only coverage metrics
- **User flow**: Evaluates market attention and institutional confidence

#### **`analyzers/fundamental/efficiency-analyser.js`**
- **What it does**: Analyzes operational efficiency metrics (asset turnover, inventory management)
- **Imports to use**: `../../../shared/utils/efficiency-calculations.js`
- **What it does NOT do**: Does not compare across industries without normalization
- **User flow**: Assesses management effectiveness and operational quality

#### **`analyzers/fundamental/graham-analyser.js`**
- **What it does**: Deep Benjamin Graham analysis beyond basic screening
- **Imports to use**: `../../../shared/utils/graham-calculations.js`
- **What it does NOT do**: Does not modify Graham criteria, only applies comprehensive analysis
- **User flow**: Provides detailed value investing assessment

#### **`analyzers/fundamental/profitability-anayser.js`**
- **What it does**: Deep profitability analysis including margin trends and sustainability
- **Imports to use**: `../../../shared/utils/profitability-calculations.js`
- **What it does NOT do**: Does not predict future margins, only analyzes trends
- **User flow**: Evaluates earnings quality and sustainability

#### **`analyzers/fundamental/ratios-analyser.js`**
- **What it does**: Comprehensive ratio analysis with trend and peer comparison
- **Imports to use**: `../../../shared/utils/ratio-calculations.js`
- **What it does NOT do**: Does not weight ratios for final scoring, only provides analysis
- **User flow**: Provides detailed financial health assessment

### 🗂️ **Analyzers - ML (Machine Learning)**

#### **`analyzers/ml/earnings-predictor.js`**
- **What it does**: ML model to predict future earnings based on historical patterns
- **Imports to use**: `../../../shared/utils/ml-models.js`, `../../../shared/services/earnings-data.js`
- **What it does NOT do**: Does not guarantee accuracy, provides probabilistic predictions
- **User flow**: Generates earnings forecasts for valuation models

#### **`analyzers/ml/momentum-predictor.js`**
- **What it does**: ML model to predict price momentum and trend continuation
- **Imports to use**: `../../../shared/utils/ml-models.js`, `../../../shared/utils/momentum-calculations.js`
- **What it does NOT do**: Does not provide entry/exit signals, only momentum probabilities
- **User flow**: Assesses likelihood of continued price trends

#### **`analyzers/ml/regime-detector.js`**
- **What it does**: ML model to detect market regime changes (bull/bear/neutral)
- **Imports to use**: `../../../shared/utils/ml-models.js`, `../../../shared/services/market-data.js`
- **What it does NOT do**: Does not predict regime duration, only current regime state
- **User flow**: Provides market context for stock selection

#### **`analyzers/ml/sector-rotator.js`**
- **What it does**: ML model to predict sector rotation patterns and timing
- **Imports to use**: `../../../shared/utils/ml-models.js`, `../../../shared/services/sector-data.js`
- **What it does NOT do**: Does not provide specific stock picks, only sector preferences
- **User flow**: Informs sector allocation decisions

#### **`analyzers/ml/volatility-predictor.js`**
- **What it does**: ML model to predict future volatility based on multiple factors
- **Imports to use**: `../../../shared/utils/ml-models.js`, `../../../shared/utils/volatility-calculations.js`
- **What it does NOT do**: Does not predict specific price movements, only volatility ranges
- **User flow**: Provides volatility forecasts for risk management

### 🗂️ **Analyzers - Risk**

#### **`analyzers/risk/alpha-calculator.js`**
- **What it does**: Calculates alpha (excess return) against various benchmarks
- **Imports to use**: `../../../shared/utils/performance-calculations.js`, `../../../shared/services/benchmark-data.js`
- **What it does NOT do**: Does not predict future alpha, only analyzes historical performance
- **User flow**: Evaluates manager skill and stock selection ability

#### **`analyzers/risk/beta-calculator.js`**
- **What it does**: Deep beta analysis including rolling beta and beta stability
- **Imports to use**: `../../../shared/utils/beta-calculations.js`
- **What it does NOT do**: Does not adjust for market conditions, provides raw beta metrics
- **User flow**: Provides systematic risk assessment for portfolio construction

#### **`analyzers/risk/correlation-analyser.js`**
- **What it does**: Analyzes correlation patterns with market factors and other assets
- **Imports to use**: `../../../shared/utils/correlation-calculations.js`
- **What it does NOT do**: Does not predict correlation changes, only analyzes current patterns
- **User flow**: Provides diversification analysis for portfolio optimization

#### **`analyzers/risk/drawdown-analyser.js`**
- **What it does**: Deep drawdown analysis including frequency, duration, and recovery patterns
- **Imports to use**: `../../../shared/utils/drawdown-calculations.js`
- **What it does NOT do**: Does not predict future drawdowns, only analyzes historical patterns
- **User flow**: Evaluates downside risk characteristics

#### **`analyzers/risk/trail-risk-analyser.js`**
- **What it does**: Analyzes tail risk and extreme event exposure
- **Imports to use**: `../../../shared/utils/tail-risk-calculations.js`
- **What it does NOT do**: Does not predict black swan events, only measures historical exposure
- **User flow**: Assesses portfolio resilience to extreme events

#### **`analyzers/risk/var-calculator.js`**
- **What it does**: Calculates Value at Risk (VaR) using multiple methodologies
- **Imports to use**: `../../../shared/utils/var-calculations.js`
- **What it does NOT do**: Does not account for model risk, provides statistical VaR only
- **User flow**: Provides quantitative risk metrics for position sizing

### 🗂️ **Analyzers - Sentiment**

#### **`analyzers/sentiment/analyst-analyser.js`**
- **What it does**: Analyzes analyst recommendations, target prices, and estimate revisions
- **Imports to use**: `../../../shared/services/analyst-data.js`, `../../../shared/utils/sentiment-analysis.js`
- **What it does NOT do**: Does not weight analyst accuracy, treats all opinions equally
- **User flow**: Provides professional sentiment assessment

#### **`analyzers/sentiment/insider-analyser.js`**
- **What it does**: Analyzes insider trading patterns and ownership changes
- **Imports to use**: `../../../shared/services/insider-data.js`
- **What it does NOT do**: Does not account for insider motivations, only trading patterns
- **User flow**: Evaluates management confidence and insider sentiment

#### **`analyzers/sentiment/news-analyser.js`**
- **What it does**: NLP analysis of news sentiment and story impact
- **Imports to use**: `../../../shared/services/news-api.js`, `../../../shared/utils/nlp-processing.js`
- **What it does NOT do**: Does not verify news accuracy, only analyzes sentiment
- **User flow**: Provides real-time sentiment shifts from news flow

#### **`analyzers/sentiment/social-analyser.js`**
- **What it does**: Analyzes social media sentiment and retail investor mood
- **Imports to use**: `../../../shared/services/social-media-api.js`, `../../../shared/utils/sentiment-analysis.js`
- **What it does NOT do**: Does not filter for credible sources, analyzes all social data
- **User flow**: Captures retail investor sentiment and momentum

### 🗂️ **Analyzers - Technical**

#### **`analyzers/technical/bollinger-bands.js`**
- **What it does**: Analyzes Bollinger Band patterns and band positioning
- **Imports to use**: `../../../shared/utils/technical-indicators.js`
- **What it does NOT do**: Does not generate trading signals, only provides band analysis
- **User flow**: Evaluates price volatility and mean reversion potential

#### **`analyzers/technical/moving-averages.js`**
- **What it does**: Comprehensive moving average analysis including multiple timeframes
- **Imports to use**: `../../../shared/utils/technical-indicators.js`
- **What it does NOT do**: Does not provide specific crossover signals, only trend analysis
- **User flow**: Assesses trend strength and direction across timeframes

#### **`analyzers/technical/oscillators.js`**
- **What it does**: Analyzes momentum oscillators (RSI, Stochastic, Williams %R)
- **Imports to use**: `../../../shared/utils/technical-indicators.js`
- **What it does NOT do**: Does not provide timing signals, only momentum assessment
- **User flow**: Evaluates overbought/oversold conditions and momentum

#### **`analyzers/technical/support-resistance.js`**
- **What it does**: Identifies and analyzes key support and resistance levels
- **Imports to use**: `../../../shared/utils/support-resistance-calculations.js`
- **What it does NOT do**: Does not predict level breaks, only identifies key levels
- **User flow**: Provides technical context for entry and exit planning

#### **`analyzers/technical/trend-analyser.js`**
- **What it does**: Comprehensive trend analysis using multiple methods
- **Imports to use**: `../../../shared/utils/trend-calculations.js`
- **What it does NOT do**: Does not predict trend changes, only analyzes current trends
- **User flow**: Evaluates trend quality and sustainability

#### **`analyzers/technical/volume-analyser.js`**
- **What it does**: Analyzes volume patterns and volume-price relationships
- **Imports to use**: `../../../shared/utils/volume-analysis.js`
- **What it does NOT do**: Does not identify specific volume signals, only pattern analysis
- **User flow**: Assesses conviction behind price movements

### 🗂️ **Controllers**

#### **`controllers/batch-analyser.js`**
- **What it does**: Runs analysis on multiple stocks simultaneously for efficiency
- **Imports to use**: `./stock-analyser.js`, `../services/composite-scorer.js`
- **What it does NOT do**: Does not handle individual stock errors, processes batches only
- **User flow**: Processes screened stock lists efficiently

#### **`controllers/deep-analyser.js`**
- **What it does**: Orchestrates comprehensive analysis using all analyzer modules
- **Imports to use**: All analyzer modules, `../services/composite-scorer.js`
- **What it does NOT do**: Does not cache results, runs fresh analysis each time
- **User flow**: Provides complete analysis for high-priority stocks

#### **`controllers/stock-analyser.js`**
- **What it does**: Main controller for individual stock analysis coordination
- **Imports to use**: All analyzer categories, `../services/market-context.js`
- **What it does NOT do**: Does not store analysis results, only returns computed scores
- **User flow**: Entry point for comprehensive stock analysis

### 🗂️ **Routes**

#### **`routes/analysis.js`**
- **What it does**: Defines HTTP endpoints for AI analysis functionality
- **Imports to use**: `express`, `../controllers/stock-analyser.js`, `../controllers/batch-analyser.js`
- **What it does NOT do**: Does not include business logic, only routing
- **User flow**: HTTP entry point for Stage 3 API calls

### 🗂️ **Services**

#### **`services/composite-scorer.js`**
- **What it does**: Combines all analysis scores into unified stock rankings
- **Imports to use**: `../../shared/utils/scoring-algorithms.js`
- **What it does NOT do**: Does not modify individual analyzer scores, only weights and combines
- **User flow**: Creates final stock scores for Stage 4 optimization

#### **`services/market-context.js`**
- **What it does**: Provides market context and regime information for analysis
- **Imports to use**: `../../shared/services/market-data.js`, `../analyzers/ml/regime-detector.js`
- **What it does NOT do**: Does not adjust individual stock scores, only provides context
- **User flow**: Informs analysis with current market conditions

#### **`services/peer-comparitor.js`**
- **What it does**: Compares stocks against sector and industry peers
- **Imports to use**: `../../shared/services/peer-data.js`, `../../shared/utils/comparison-calculations.js`
- **What it does NOT do**: Does not rank stocks across sectors, only within peer groups
- **User flow**: Provides relative performance and valuation context

---

## ⚖️ **Stage 4: Portfolio Optimisation Engine**
*Path: `/server/src/stages/04-portfolio-optimisation/`*

### 📋 **User Flow Stage 4:**
1. **Analyzed Stocks Input** → `controllers/optimiser.js`
2. **Constraint Building** → `controllers/constraint-manager.js`
3. **Optimization Method Selection** → Multiple `optimisers/`
4. **Correlation Analysis** → `services/correlation-builder.js`
5. **Position Sizing** → Multiple `position-sizing/`
6. **Weight Calculation** → `services/weight-calulator.js`
7. **Diversification Check** → `services/diversification-checker.js`
8. **Constraint Validation** → `services/constraint-validator.js`
9. **Output** → Optimized portfolio allocations

---

### 🗂️ **Controllers**

#### **`controllers/allocation-builder.js`**
- **What it does**: Builds final portfolio allocations from optimization results
- **Imports to use**: `../services/weight-calulator.js`, `../services/diversification-checker.js`
- **What it does NOT do**: Does not modify optimization results, only formats allocations
- **User flow**: Converts optimization outputs into executable portfolio weights

#### **`controllers/constraint-manager.js`**
- **What it does**: Manages all portfolio constraints from user requirements and regulations
- **Imports to use**: `../../01-goal-analysis/models/portfolio-requirements.js`, `../services/constraint-validator.js`
- **What it does NOT do**: Does not create new constraints, only manages existing ones
- **User flow**: Ensures all optimizations respect user and regulatory constraints

#### **`controllers/optimiser.js`**
- **What it does**: Main controller that orchestrates portfolio optimization process
- **Imports to use**: All optimiser modules, `./constraint-manager.js`, `./allocation-builder.js`
- **What it does NOT do**: Does not perform optimization calculations, only coordinates optimizers
- **User flow**: Central orchestrator for portfolio construction

### 🗂️ **Optimisers**

#### **`optimisers/black-litterman.js`**
- **What it does**: Implements Black-Litterman optimization model with investor views
- **Imports to use**: `../../../shared/utils/matrix-calculations.js`, `../../../shared/utils/optimization-algorithms.js`
- **What it does NOT do**: Does not generate investor views, requires external view inputs
- **User flow**: Builds optimal portfolios incorporating market equilibrium and investor views

#### **`optimisers/ensemble-optimiser.js`**
- **What it does**: Combines multiple optimization methods for robust portfolio construction
- **Imports to use**: All other optimiser modules, `../../../shared/utils/ensemble-methods.js`
- **What it does NOT do**: Does not create new optimization methods, only combines existing ones
- **User flow**: Provides diversified optimization approach reducing model risk

#### **`optimisers/kelly-criterion.js`**
- **What it does**: Implements Kelly Criterion for optimal position sizing based on edge
- **Imports to use**: `../../../shared/utils/kelly-calculations.js`
- **What it does NOT do**: Does not account for correlation between positions
- **User flow**: Optimizes position sizes for maximum long-term growth

#### **`optimisers/mean-variance.js`**
- **What it does**: Implements classic Markowitz mean-variance optimization
- **Imports to use**: `../../../shared/utils/matrix-calculations.js`, `../../../shared/utils/optimization-algorithms.js`
- **What it does NOT do**: Does not account for higher moments or tail risk
- **User flow**: Builds efficient frontier portfolios based on expected returns and covariance

#### **`optimisers/risk-parity.js`**
- **What it does**: Implements risk parity optimization equalizing risk contributions
- **Imports to use**: `../../../shared/utils/risk-parity-calculations.js`
- **What it does NOT do**: Does not consider expected returns, only risk balancing
- **User flow**: Creates balanced risk portfolios independent of return forecasts

### 🗂️ **Position Sizing**

#### **`position-sizing/correlation-impact.js`**
- **What it does**: Adjusts position sizes based on correlation with existing positions
- **Imports to use**: `../services/correlation-builder.js`, `../../../shared/utils/correlation-calculations.js`
- **What it does NOT do**: Does not generate new position ideas, only sizes existing positions
- **User flow**: Ensures position sizes account for portfolio correlation effects

#### **`position-sizing/kelly.js`**
- **What it does**: Calculates Kelly optimal position sizes for individual positions
- **Imports to use**: `../../../shared/utils/kelly-calculations.js`
- **What it does NOT do**: Does not consider portfolio-level effects or correlations
- **User flow**: Provides individual position sizing recommendations

#### **`position-sizing/risk-parity.js`**
- **What it does**: Calculates position sizes to equalize risk contribution across positions
- **Imports to use**: `../../../shared/utils/risk-parity-calculations.js`
- **What it does NOT do**: Does not consider expected returns in sizing decisions
- **User flow**: Balances risk contribution across all portfolio positions

### 🗂️ **Routes**

#### **`routes/optimisation.js`**
- **What it does**: Defines HTTP endpoints for portfolio optimization functionality
- **Imports to use**: `express`, `../controllers/optimiser.js`
- **What it does NOT do**: Does not include business logic, only routing
- **User flow**: HTTP entry point for Stage 4 API calls

### 🗂️ **Services**

#### **`services/constraint-validator.js`**
- **What it does**: Validates that optimized portfolios meet all specified constraints
- **Imports to use**: `../../01-goal-analysis/models/portfolio-requirements.js`
- **What it does NOT do**: Does not fix constraint violations, only identifies them
- **User flow**: Ensures final portfolios comply with all requirements

#### **`services/correlation-builder.js`**
- **What it does**: Builds correlation matrices for optimization and risk analysis
- **Imports to use**: `../../../shared/utils/correlation-calculations.js`, `../../../shared/services/market-data.js`
- **What it does NOT do**: Does not forecast correlation changes, uses historical data
- **User flow**: Provides correlation inputs for all optimization methods

#### **`services/diversification-checker.js`**
- **What it does**: Analyzes portfolio diversification across multiple dimensions
- **Imports to use**: `../../../shared/utils/diversification-metrics.js`
- **What it does NOT do**: Does not enforce diversification rules, only measures diversification
- **User flow**: Validates portfolio diversification meets requirements

#### **`services/sector-balancer.js`**
- **What it does**: Ensures balanced sector allocation within portfolio constraints
- **Imports to use**: `../../../shared/utils/sector-analysis.js`
- **What it does NOT do**: Does not make sector allocation decisions, only balances existing allocations
- **User flow**: Adjusts portfolio weights for appropriate sector diversification

#### **`services/weight-calulator.js`**
- **What it does**: Calculates final portfolio weights from optimization results
- **Imports to use**: `../../../shared/utils/weight-calculations.js`
- **What it does NOT do**: Does not round weights or handle minimum position sizes
- **User flow**: Converts optimization outputs to implementable portfolio weights

---

## 🎲 **Stage 5: Monte Carlo Validation Engine**
*Path: `/server/src/stages/05-monte-carlo-validation/`*

### 📋 **User Flow Stage 5:**
1. **Optimized Portfolio Input** → `controllers/validator.js`
2. **Scenario Testing** → `controllers/scenario-testor.js` → Multiple `scenarios/`
3. **Monte Carlo Simulation** → `monte-carlo/portfolio.js` + `monte-carlo/stock.js`
4. **Results Processing** → `monte-carlo/results.js`
5. **Goal Validation** → `services/goal-validator.js`
6. **Stress Testing** → `services/stress-tester.js`
7. **Outcome Analysis** → `services/outcome-analyser.js`
8. **Portfolio Refinement** → `services/refinement-engine.js`
9. **Output** → Validated portfolio with probability metrics

---

### 🗂️ **Controllers**

#### **`controllers/scenario-testor.js`**
- **What it does**: Orchestrates testing portfolios against different market scenarios
- **Imports to use**: `../scenarios/market-scenarios.js`, `../scenarios/crises-scenarios.js`, `../scenarios/inflation-scenarios.js`
- **What it does NOT do**: Does not create scenarios, only executes tests against predefined scenarios
- **User flow**: Tests portfolio resilience across multiple economic scenarios

#### **`controllers/validator.js`**
- **What it does**: Main controller for portfolio validation using Monte Carlo methods
- **Imports to use**: `../monte-carlo/portfolio.js`, `../services/goal-validator.js`, `../services/outcome-analyser.js`
- **What it does NOT do**: Does not modify portfolios, only validates their performance characteristics
- **User flow**: Central orchestrator for portfolio validation process

### 🗂️ **Monte Carlo**

#### **`monte-carlo/portfolio.js`**
- **What it does**: Runs Monte Carlo simulations on complete portfolios for goal achievement
- **Imports to use**: `./stock.js`, `../../../shared/utils/monte-carlo-engines.js`, `../../../shared/utils/advanced-models.js`
- **What it does NOT do**: Does not optimize portfolios, only simulates performance
- **User flow**: Generates 10,000+ portfolio performance scenarios

#### **`monte-carlo/results.js`**
- **What it does**: Processes Monte Carlo simulation results into actionable insights
- **Imports to use**: `../../../shared/utils/statistical-analysis.js`, `../../../shared/utils/risk-metrics.js`
- **What it does NOT do**: Does not run simulations, only analyzes simulation outputs
- **User flow**: Converts simulation results into goal achievement probabilities

#### **`monte-carlo/stock.js`**
- **What it does**: Runs Monte Carlo simulations on individual stocks for portfolio inputs
- **Imports to use**: `../../../shared/utils/monte-carlo-engines.js`, `../../../shared/utils/advanced-models.js`
- **What it does NOT do**: Does not account for correlation during individual stock simulation
- **User flow**: Generates individual stock price paths for portfolio simulation

### 🗂️ **Routes**

#### **`routes/validation.js`**
- **What it does**: Defines HTTP endpoints for Monte Carlo validation functionality
- **Imports to use**: `express`, `../controllers/validator.js`, `../controllers/scenario-testor.js`
- **What it does NOT do**: Does not include business logic, only routing
- **User flow**: HTTP entry point for Stage 5 API calls

### 🗂️ **Scenarios**

#### **`scenarios/crises-scenarios.js`**
- **What it does**: Defines crisis scenarios (2008 financial crisis, COVID crash, etc.)
- **Imports to use**: `../../../shared/utils/scenario-definitions.js`
- **What it does NOT do**: Does not execute scenario tests, only provides scenario parameters
- **User flow**: Provides stress test scenarios for portfolio resilience testing

#### **`scenarios/inflation-scenarios.js`**
- **What it does**: Defines inflation scenarios (stagflation, hyperinflation, deflation)
- **Imports to use**: `../../../shared/utils/scenario-definitions.js`
- **What it does NOT do**: Does not model inflation effects, only provides scenario parameters
- **User flow**: Tests portfolio performance under different inflation environments

#### **`scenarios/market-scenarios.js`**
- **What it does**: Defines various market scenarios (bull, bear, sideways markets)
- **Imports to use**: `../../../shared/utils/scenario-definitions.js`
- **What it does NOT do**: Does not predict which scenario will occur, only defines parameters
- **User flow**: Provides market environment tests for portfolio validation

### 🗂️ **Services**

#### **`services/goal-validator.js`**
- **What it does**: Validates portfolio probability of achieving user goals from Stage 1
- **Imports to use**: `../../01-goal-analysis/models/goal-data-model.js`, `../monte-carlo/results.js`
- **What it does NOT do**: Does not modify goals, only assesses achievement probability
- **User flow**: Determines if portfolio meets user goal requirements

#### **`services/outcome-analyser.js`**
- **What it does**: Analyzes simulation outcomes for risk metrics and performance statistics
- **Imports to use**: `../monte-carlo/results.js`, `../../../shared/utils/outcome-analysis.js`
- **What it does NOT do**: Does not recommend changes, only analyzes outcomes
- **User flow**: Provides detailed analysis of portfolio simulation results

#### **`services/refinement-engine.js`**
- **What it does**: Suggests portfolio refinements based on validation results
- **Imports to use**: `./outcome-analyser.js`, `../../../shared/utils/optimization-suggestions.js`
- **What it does NOT do**: Does not implement changes, only suggests refinements
- **User flow**: Provides feedback to Stage 4 for portfolio improvement

#### **`services/stress-tester.js`**
- **What it does**: Conducts stress tests using scenario results and extreme conditions
- **Imports to use**: `../scenarios/crises-scenarios.js`, `../monte-carlo/portfolio.js`
- **What it does NOT do**: Does not define stress scenarios, only executes tests
- **User flow**: Validates portfolio resilience under extreme market conditions

---

## 📊 **Stage 6: Monitoring & Maintenance Engine**
*Path: `/server/src/stages/06-monitoring/`*

### 📋 **User Flow Stage 6:**
1. **Live Portfolio Input** → `controllers/monitor.js`
2. **Performance Monitoring** → `monitors/performance-monitor.js`
3. **Risk Monitoring** → `monitors/risk-monitor.js`
4. **Goal Progress Tracking** → `monitors/goal-progress-monitor.js`
5. **Market Monitoring** → `monitors/market-monitor.js`
6. **Correlation Monitoring** → `monitors/correlation-monitor.js`
7. **Health Checking** → `controllers/health-checker.js`
8. **Rebalancing Logic** → `controllers/rebalancer.js`
9. **AI Insights** → Multiple `ai/`
10. **Alerts & Notifications** → Multiple `services/`
11. **Output** → Continuous monitoring with actionable insights

---

### 🗂️ **AI (Artificial Intelligence)**

#### **`ai/chat-handler.js`**
- **What it does**: Handles user questions about portfolio performance and provides AI responses
- **Imports to use**: `../services/insight-generator.js`, `../../../shared/utils/nlp-processing.js`
- **What it does NOT do**: Does not provide investment advice, only explains current portfolio status
- **User flow**: Provides conversational interface for portfolio inquiries

#### **`ai/explanation-generator.js`**
- **What it does**: Generates natural language explanations for portfolio changes and performance
- **Imports to use**: `../services/insight-generator.js`, `../../../shared/utils/text-generation.js`
- **What it does NOT do**: Does not make investment decisions, only explains existing decisions
- **User flow**: Creates human-readable explanations for portfolio events

#### **`ai/insight-engine.js`**
- **What it does**: AI engine that generates actionable insights from monitoring data
- **Imports to use**: All monitor modules, `../../../shared/utils/pattern-recognition.js`
- **What it does NOT do**: Does not execute actions, only generates insights and recommendations
- **User flow**: Analyzes monitoring data to surface important insights

### 🗂️ **Controllers**

#### **`controllers/health-checker.js`**
- **What it does**: Checks overall portfolio health and system functionality
- **Imports to use**: All monitor modules, `../services/alert-generator.js`
- **What it does NOT do**: Does not fix issues, only identifies and reports health problems
- **User flow**: Provides system-wide health assessment and alerts

#### **`controllers/monitor.js`**
- **What it does**: Main controller orchestrating all monitoring activities
- **Imports to use**: All monitor modules, `../ai/insight-engine.js`
- **What it does NOT do**: Does not store monitoring data, only coordinates monitoring processes
- **User flow**: Central orchestrator for continuous portfolio monitoring

#### **`controllers/rebalancer.js`**
- **What it does**: Determines when and how to rebalance portfolios based on monitoring data
- **Imports to use**: `../services/rebalance-calculator.js`, All monitor modules
- **What it does NOT do**: Does not execute trades, only calculates rebalancing requirements
- **User flow**: Provides rebalancing recommendations based on monitoring triggers

### 🗂️ **Monitors**

#### **`monitors/correlation-monitor.js`**
- **What it does**: Monitors correlation changes between portfolio positions and market factors
- **Imports to use**: `../../../shared/utils/correlation-calculations.js`, `../../../shared/services/market-data.js`
- **What it does NOT do**: Does not predict correlation changes, only monitors current correlations
- **User flow**: Alerts when correlations shift significantly from optimization assumptions

#### **`monitors/goal-progress-monitor.js`**
- **What it does**: Tracks progress toward user goals and timeline milestones
- **Imports to use**: `../../01-goal-analysis/models/goal-data-model.js`, `../../../shared/utils/progress-calculations.js`
- **What it does NOT do**: Does not modify goals, only tracks progress against existing goals
- **User flow**: Provides goal achievement tracking and milestone alerts

#### **`monitors/market-monitor.js`**
- **What it does**: Monitors overall market conditions and regime changes
- **Imports to use**: `../../03-ai-analysis/analyzers/ml/regime-detector.js`, `../../../shared/services/market-data.js`
- **What it does NOT do**: Does not predict market changes, only monitors current market state
- **User flow**: Provides market context for portfolio performance interpretation

#### **`monitors/performance-monitor.js`**
- **What it does**: Tracks portfolio performance against benchmarks and expectations
- **Imports to use**: `../../../shared/utils/performance-calculations.js`, `../../../shared/services/benchmark-data.js`
- **What it does NOT do**: Does not adjust performance for market conditions automatically
- **User flow**: Provides ongoing performance measurement and benchmark comparison

#### **`monitors/risk-monitor.js`**
- **What it does**: Monitors portfolio risk metrics and constraint compliance
- **Imports to use**: `../../../shared/utils/risk-calculations.js`, `../../01-goal-analysis/models/portfolio-requirements.js`
- **What it does NOT do**: Does not modify risk parameters, only monitors against existing constraints
- **User flow**: Ensures portfolio risk stays within user tolerance levels

### 🗂️ **Routes**

#### **`routes/monitoring.js`**
- **What it does**: Defines HTTP endpoints for monitoring and maintenance functionality
- **Imports to use**: `express`, `../controllers/monitor.js`, `../controllers/rebalancer.js`
- **What it does NOT do**: Does not include business logic, only routing
- **User flow**: HTTP entry point for Stage 6 API calls

### 🗂️ **Services**

#### **`services/alert-generator.js`**
- **What it does**: Generates alerts based on monitoring thresholds and trigger conditions
- **Imports to use**: All monitor modules, `../../../shared/utils/alert-logic.js`
- **What it does NOT do**: Does not send alerts, only generates alert content and priorities
- **User flow**: Creates actionable alerts from monitoring data

#### **`services/insight-generator.js`**
- **What it does**: Generates insights and recommendations from monitoring and AI analysis
- **Imports to use**: `../ai/insight-engine.js`, All monitor modules
- **What it does NOT do**: Does not execute recommendations, only generates insights
- **User flow**: Provides actionable insights for portfolio management decisions

#### **`services/notification-sender.js`**
- **What it does**: Sends notifications to users via email, SMS, push notifications
- **Imports to use**: `./alert-generator.js`, `../../../shared/services/communication-apis.js`
- **What it does NOT do**: Does not generate notification content, only handles delivery
- **User flow**: Delivers alerts and insights to users through preferred channels

#### **`services/rebalance-calculator.js`**
- **What it does**: Calculates specific rebalancing trades needed to restore portfolio targets
- **Imports to use**: `../../04-portfolio-optimisation/services/weight-calulator.js`, All monitor modules
- **What it does NOT do**: Does not consider transaction costs or tax implications
- **User flow**: Provides specific trade recommendations for portfolio rebalancing

---

## 📈 **Summary Statistics**

| Stage | Controllers | Models | Routes | Services | Analyzers | Monitors | Other | Total Files |
|-------|-------------|--------|--------|----------|-----------|----------|-------|-------------|
| **Stage 1** | 3 | 2 | 1 | 3 | - | - | - | **9** |
| **Stage 2** | 4 | - | 1 | 3 | 10 | - | - | **18** |
| **Stage 3** | 3 | - | 1 | 3 | 24 | - | - | **31** |
| **Stage 4** | 3 | - | 1 | 5 | 8 | - | - | **17** |
| **Stage 5** | 2 | - | 1 | 4 | 3 | - | 3 | **13** |
| **Stage 6** | 3 | - | 1 | 4 | - | 5 | 3 | **16** |
| **TOTAL** | **18** | **2** | **6** | **22** | **45** | **5** | **6** | **109** |

---

## 🎯 **Architecture Summary**

### **🔄 Complete User Flow Through All Stages:**

1. **Stage 1**: User goals → Portfolio requirements
2. **Stage 2**: Requirements → Screened stock universe (~100-200 stocks)
3. **Stage 3**: Screened stocks → AI-analyzed stocks with scores
4. **Stage 4**: Analyzed stocks → Optimized portfolio allocations
5. **Stage 5**: Portfolio → Validated portfolio with goal achievement probability
6. **Stage 6**: Live portfolio → Continuous monitoring with insights and rebalancing

### **🏗️ File Organization Principles:**

- **Controllers**: Orchestrate business logic and coordinate other modules
- **Models**: Define data structures (only in Stage 1)
- **Routes**: HTTP API endpoints for each stage
- **Services**: Core business logic and external integrations
- **Analyzers**: Specialized analysis modules (Stage 2 & 3)
- **Monitors**: Continuous tracking modules (Stage 6)
- **AI**: Machine learning and insight generation (Stages 3 & 6)

### **📊 Import Patterns:**

- **Within Stage**: Import other files within same stage directory
- **Cross Stage**: Import from previous stages (flow dependency)
- **Shared Resources**: Import from `../../shared/` for utilities
- **Database**: Import from `../../database/` for data access
- **External APIs**: Import from `../../shared/services/` for API integrations

This architecture provides complete portfolio management from goal analysis through continuous monitoring, with 109 specialized files handling every aspect of the investment process.