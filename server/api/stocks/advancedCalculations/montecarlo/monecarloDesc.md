📈 stock.js
Purpose: Individual stock price simulation
What it does:

Simulates future price paths for a single stock using geometric Brownian motion
Models random price movements based on historical volatility and expected returns
Generates thousands of possible price scenarios over time

Key functions likely inside:

simulateStockPrice(symbol, timeHorizon, simulations)
geometricBrownianMotion(currentPrice, expectedReturn, volatility, timeSteps)
calculateVolatility(historicalPrices)
generatePricePaths(startPrice, drift, volatility, days, iterations)

Feeds into: Portfolio-level simulations and individual position sizing

💼 portfolio.js
Purpose: Portfolio-level Monte Carlo simulations
What it does:

Simulates entire portfolio performance over time
Combines multiple stocks with their correlations and weights
Models portfolio value evolution with contributions, rebalancing, and market scenarios
Tests goal achievement probability

Key functions likely inside:

simulatePortfolioOutcomes(holdings, timeHorizon, monthlyContributions, targetAmount)
correlatedReturns(stocks, correlationMatrix, simulations)
portfolioValueEvolution(weights, returns, contributions, rebalancing)
goalAchievementProbability(finalValues, targetAmount)
portfolioRiskMetrics(simulations) (VaR, drawdown, etc.)

Feeds into: Goal analysis, portfolio optimization validation, risk assessment

📊 results.js
Purpose: Processing and analyzing simulation results
What it does:

Stores completed simulation data
Calculates statistical measures from raw simulation outputs
Generates probability distributions and confidence intervals
Formats results for API responses and user display

Key functions likely inside:

processSimulationResults(rawResults, metadata)
calculatePercentiles(outcomes) (5th, 25th, 50th, 75th, 95th)
generateProbabilityDistribution(finalValues)
calculateRiskMetrics(portfolioPath) (max drawdown, volatility, Sharpe)
formatResultsForAPI(processedResults)
saveSimulationResults(simulationId, results)
getSimulationById(simulationId)

Feeds into: API responses, user insights, portfolio validation decisions

🔄 How They Work Together:
Simulation Flow:

stock.js → Generates individual asset price scenarios
portfolio.js → Combines stocks into portfolio simulations using correlation matrix
results.js → Processes the simulation output into meaningful statistics

API Endpoint Mapping:

POST /api/monte-carlo/stock → Uses stock.js
POST /api/monte-carlo/portfolio → Uses portfolio.js (which calls stock.js)
GET /api/monte-carlo/:simulation-id/results → Uses results.js

Stage 1 Goal Analysis Usage:

portfolio.js runs goal feasibility simulations
results.js calculates goal achievement probability
stock.js helps model individual position risks within the goal framework

This modular structure allows you to run stock-level simulations for position sizing, portfolio-level simulations for goal planning, and efficiently retrieve processed results for user display and decision making.