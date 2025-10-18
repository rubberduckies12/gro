/**
 * Monte Carlo Portfolio Simulation Engine for Gro App
 * 
 * Handles portfolio-level Monte Carlo simulations for goal-driven investing.
 * Calculates probability of achieving investment goals with different allocations.
 */

const { v4: uuidv4 } = require('uuid');

class PortfolioMonteCarloEngine {
    constructor(dbPool) {
        this.db = dbPool;
        this.defaultSimulations = 10000;
        this.tradingDaysPerYear = 252;
        this.riskFreeRate = 0.02; // 2% annual risk-free rate
    }

    /**
     * 🎯 MAIN GOAL SIMULATION FUNCTION
     * Core goal achievement simulation for Stage 1 analysis
     */
    async simulatePortfolioGoal(params) {
        const {
            userId,
            portfolioId,
            holdings,              // Array of {symbol, weight, expectedReturn, volatility}
            correlationMatrix,     // Stock correlation matrix
            timeHorizonMonths,     // Investment timeline
            initialInvestment,     // Starting portfolio value
            monthlyContribution,   // Regular monthly additions
            targetAmount,          // Goal amount to achieve
            rebalanceFrequency = 'quarterly', // 'monthly', 'quarterly', 'annual'
            inflationRate = 0.025, // Expected annual inflation
            simulations = this.defaultSimulations,
            stressTestScenarios = true
        } = params;

        console.log(`🎲 Starting portfolio goal simulation for ${timeHorizonMonths} months...`);

        try {
            // 1. Validate inputs
            this.validateSimulationInputs(params);

            // 2. Calculate rebalancing frequency in days
            const rebalanceDays = this.getRebalanceFrequency(rebalanceFrequency);

            // 3. Run main Monte Carlo simulation
            const baseSimulationResults = await this.runPortfolioSimulations({
                holdings,
                correlationMatrix,
                timeHorizonMonths,
                initialInvestment,
                monthlyContribution,
                targetAmount,
                rebalanceDays,
                inflationRate,
                simulations
            });

            // 4. Calculate goal achievement probability
            const goalProbability = this.calculateGoalProbability(baseSimulationResults, targetAmount);

            // 5. Extract portfolio risk metrics
            const riskMetrics = this.portfolioRiskMetrics(baseSimulationResults);

            // 6. Calculate contribution sensitivity analysis
            const contributionSensitivity = await this.analyzeContributionSensitivity({
                holdings,
                correlationMatrix,
                timeHorizonMonths,
                initialInvestment,
                monthlyContribution,
                targetAmount,
                rebalanceDays,
                inflationRate
            });

            // 7. Run stress test scenarios if requested
            let stressTestResults = null;
            if (stressTestScenarios) {
                stressTestResults = await this.stressTestScenarios({
                    holdings,
                    correlationMatrix,
                    timeHorizonMonths,
                    initialInvestment,
                    monthlyContribution,
                    targetAmount,
                    rebalanceDays,
                    inflationRate
                });
            }

            // 8. Calculate time to goal estimates
            const timeToGoal = this.calculateTimeToGoal(baseSimulationResults, targetAmount);

            // 9. Save simulation results to database
            const simulationId = await this.saveSimulationResults({
                userId,
                portfolioId,
                baseSimulationResults,
                goalProbability,
                riskMetrics,
                contributionSensitivity,
                stressTestResults,
                timeToGoal,
                parameters: params
            });

            console.log(`✅ Portfolio simulation completed. Goal probability: ${(goalProbability.successProbability * 100).toFixed(1)}%`);

            return {
                simulationId,
                goalAchievementProbability: goalProbability.successProbability,
                outcomes: {
                    median: goalProbability.outcomes.median,
                    mean: goalProbability.outcomes.mean,
                    percentile_5: goalProbability.outcomes.p5,
                    percentile_95: goalProbability.outcomes.p95
                },
                riskMetrics: {
                    maxDrawdown: riskMetrics.maxDrawdown.expected,
                    volatility: riskMetrics.volatility,
                    sharpeRatio: riskMetrics.sharpeRatio,
                    var95: riskMetrics.var95
                },
                timeToGoal: timeToGoal,
                contributionSensitivity: contributionSensitivity,
                stressTestResults: stressTestResults,
                inflationAdjustedTarget: targetAmount * Math.pow(1 + inflationRate, timeHorizonMonths / 12)
            };

        } catch (error) {
            console.error('Portfolio Monte Carlo simulation failed:', error);
            throw new Error(`Simulation failed: ${error.message}`);
        }
    }

    /**
     * 📈 PORTFOLIO VALUE EVOLUTION
     * Calculate portfolio value over time with contributions and rebalancing
     */
    async runPortfolioSimulations(params) {
        const {
            holdings,
            correlationMatrix,
            timeHorizonMonths,
            initialInvestment,
            monthlyContribution,
            rebalanceDays,
            inflationRate,
            simulations
        } = params;

        const totalDays = timeHorizonMonths * 30; // Approximate days
        const contributionFrequency = 30; // Monthly contributions
        const results = [];

        console.log(`📊 Running ${simulations} portfolio simulations...`);

        for (let sim = 0; sim < simulations; sim++) {
            const portfolioPath = await this.portfolioValueEvolution({
                holdings,
                correlationMatrix,
                totalDays,
                initialInvestment,
                monthlyContribution,
                contributionFrequency,
                rebalanceDays,
                inflationRate
            });

            results.push({
                simulation: sim,
                finalValue: portfolioPath.finalValue,
                finalRealValue: portfolioPath.finalRealValue, // Inflation-adjusted
                totalReturn: portfolioPath.totalReturn,
                realReturn: portfolioPath.realReturn,
                maxDrawdown: portfolioPath.maxDrawdown,
                volatility: portfolioPath.volatility,
                totalContributions: portfolioPath.totalContributions,
                path: portfolioPath.dailyValues
            });

            // Progress logging
            if (sim % 1000 === 0 && sim > 0) {
                console.log(`📈 Completed ${sim}/${simulations} simulations`);
            }
        }

        return results;
    }

    /**
     * 💼 SINGLE PORTFOLIO PATH EVOLUTION
     * Simulates one portfolio path with rebalancing and contributions
     */
    async portfolioValueEvolution(params) {
        const {
            holdings,
            correlationMatrix,
            totalDays,
            initialInvestment,
            monthlyContribution,
            contributionFrequency,
            rebalanceDays,
            inflationRate
        } = params;

        let portfolioValue = initialInvestment;
        let totalContributions = initialInvestment;
        let maxValue = portfolioValue;
        let maxDrawdown = 0;
        const dailyValues = [portfolioValue];
        const dailyReturns = [];

        // Generate correlated returns for all holdings
        const correlatedReturns = this.correlatedStockReturns(
            holdings,
            correlationMatrix,
            totalDays
        );

        // Track current weights (start with target weights)
        let currentWeights = [...holdings];

        for (let day = 1; day <= totalDays; day++) {
            // Calculate portfolio return for this day
            let portfolioReturn = 0;
            
            for (let i = 0; i < currentWeights.length; i++) {
                const assetReturn = correlatedReturns[i][day - 1];
                portfolioReturn += currentWeights[i].weight * assetReturn;
            }

            // Apply return to portfolio
            portfolioValue *= (1 + portfolioReturn);
            dailyReturns.push(portfolioReturn);

            // Add monthly contribution
            if (day % contributionFrequency === 0 && day > 0) {
                portfolioValue += monthlyContribution;
                totalContributions += monthlyContribution;
            }

            // Rebalance portfolio if needed
            if (day % rebalanceDays === 0 && day > 0) {
                currentWeights = this.rebalancePortfolio(currentWeights, holdings);
            }

            // Track drawdown
            if (portfolioValue > maxValue) {
                maxValue = portfolioValue;
            } else {
                const currentDrawdown = (maxValue - portfolioValue) / maxValue;
                maxDrawdown = Math.max(maxDrawdown, currentDrawdown);
            }

            dailyValues.push(portfolioValue);
        }

        // Calculate metrics
        const totalReturn = (portfolioValue - totalContributions) / totalContributions;
        const inflationAdjustment = Math.pow(1 + inflationRate, totalDays / 365);
        const finalRealValue = portfolioValue / inflationAdjustment;
        const realReturn = (finalRealValue - totalContributions) / totalContributions;
        const volatility = this.calculateVolatility(dailyReturns);

        return {
            finalValue: portfolioValue,
            finalRealValue,
            totalReturn,
            realReturn,
            maxDrawdown,
            volatility,
            totalContributions,
            dailyValues
        };
    }

    /**
     * 🔗 CORRELATED STOCK RETURNS
     * Generate correlated returns for multiple stocks using Cholesky decomposition
     */
    correlatedStockReturns(holdings, correlationMatrix, days) {
        const numAssets = holdings.length;
        
        // Extract expected returns and volatilities (convert annual to daily)
        const expectedReturns = holdings.map(h => h.expectedReturn / 252);
        const volatilities = holdings.map(h => h.volatility / Math.sqrt(252));

        // Build correlation matrix as 2D array
        const corrMatrix = this.buildCorrelationMatrix(holdings, correlationMatrix);

        // Cholesky decomposition
        const cholesky = this.choleskyDecomposition(corrMatrix);

        // Generate correlated returns
        const correlatedReturns = Array(numAssets).fill().map(() => []);

        for (let day = 0; day < days; day++) {
            // Generate independent random normal variables
            const independentRandom = Array(numAssets).fill().map(() => this.randomNormal());

            // Apply Cholesky transformation
            const correlatedRandom = Array(numAssets).fill(0);
            for (let i = 0; i < numAssets; i++) {
                for (let j = 0; j <= i; j++) {
                    correlatedRandom[i] += cholesky[i][j] * independentRandom[j];
                }
            }

            // Convert to returns using expected return and volatility
            for (let i = 0; i < numAssets; i++) {
                const return_ = expectedReturns[i] + volatilities[i] * correlatedRandom[i];
                correlatedReturns[i].push(return_);
            }
        }

        return correlatedReturns;
    }

    /**
     * ⚖️ REBALANCE PORTFOLIO
     * Reset portfolio weights to target allocations
     */
    rebalancePortfolio(currentWeights, targetWeights) {
        // Simple rebalancing: return to target weights
        // In practice, this would include transaction costs and tax considerations
        return targetWeights.map(target => ({
            symbol: target.symbol,
            weight: target.weight,
            expectedReturn: target.expectedReturn,
            volatility: target.volatility
        }));
    }

    /**
     * 🎯 CALCULATE GOAL PROBABILITY
     * Determine likelihood of reaching target amount
     */
    calculateGoalProbability(simulationResults, targetAmount) {
        const finalValues = simulationResults.map(r => r.finalRealValue); // Use inflation-adjusted values
        const successfulSims = finalValues.filter(v => v >= targetAmount).length;
        const successProbability = successfulSims / simulationResults.length;

        // Calculate outcome percentiles
        const sortedValues = [...finalValues].sort((a, b) => a - b);
        
        return {
            successProbability,
            outcomes: {
                mean: finalValues.reduce((sum, v) => sum + v, 0) / finalValues.length,
                median: this.getPercentile(sortedValues, 50),
                p5: this.getPercentile(sortedValues, 5),
                p10: this.getPercentile(sortedValues, 10),
                p25: this.getPercentile(sortedValues, 25),
                p75: this.getPercentile(sortedValues, 75),
                p90: this.getPercentile(sortedValues, 90),
                p95: this.getPercentile(sortedValues, 95)
            },
            shortfall: Math.max(0, targetAmount - this.getPercentile(sortedValues, 5)),
            upside: Math.max(0, this.getPercentile(sortedValues, 95) - targetAmount)
        };
    }

    /**
     * ⚠️ PORTFOLIO RISK METRICS
     * Extract comprehensive risk statistics from simulation results
     */
    portfolioRiskMetrics(simulationResults) {
        const returns = simulationResults.map(r => r.realReturn); // Use real returns
        const maxDrawdowns = simulationResults.map(r => r.maxDrawdown);
        const volatilities = simulationResults.map(r => r.volatility);

        const sortedReturns = [...returns].sort((a, b) => a - b);
        const sortedDrawdowns = [...maxDrawdowns].sort((a, b) => b - a);

        const expectedReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
        const volatility = this.calculateVolatility(returns);
        const sharpeRatio = volatility > 0 ? (expectedReturn - this.riskFreeRate) / volatility : 0;

        return {
            expectedReturn,
            volatility,
            sharpeRatio,
            sortinoRatio: this.calculateSortinoRatio(returns),
            maxDrawdown: {
                expected: maxDrawdowns.reduce((sum, d) => sum + d, 0) / maxDrawdowns.length,
                worst: Math.max(...maxDrawdowns),
                percentile95: this.getPercentile(sortedDrawdowns, 95)
            },
            var95: this.getPercentile(sortedReturns, 5),
            var99: this.getPercentile(sortedReturns, 1),
            expectedShortfall95: this.calculateExpectedShortfall(sortedReturns, 0.05),
            skewness: this.calculateSkewness(returns),
            kurtosis: this.calculateKurtosis(returns)
        };
    }

    /**
     * 🧪 STRESS TEST SCENARIOS
     * Test portfolio under various crisis conditions
     */
    async stressTestScenarios(params) {
        const stressScenarios = [
            { name: '2008 Financial Crisis', returnShock: -0.37, volatilityMultiplier: 2.0 },
            { name: '2020 COVID Crash', returnShock: -0.34, volatilityMultiplier: 3.0 },
            { name: '2000 Dot-com Crash', returnShock: -0.49, volatilityMultiplier: 1.8 },
            { name: 'Stagflation Scenario', returnShock: -0.15, volatilityMultiplier: 1.5 },
            { name: 'Interest Rate Shock', returnShock: -0.20, volatilityMultiplier: 1.3 }
        ];

        const stressResults = {};

        for (const scenario of stressScenarios) {
            console.log(`🧪 Running stress test: ${scenario.name}`);
            
            // Modify holdings for stress scenario
            const stressedHoldings = params.holdings.map(holding => ({
                ...holding,
                expectedReturn: holding.expectedReturn + scenario.returnShock,
                volatility: holding.volatility * scenario.volatilityMultiplier
            }));

            // Run reduced simulation for stress test (1000 iterations)
            const stressSimResults = await this.runPortfolioSimulations({
                ...params,
                holdings: stressedHoldings,
                simulations: 1000
            });

            const stressGoalProb = this.calculateGoalProbability(stressSimResults, params.targetAmount);
            const stressRiskMetrics = this.portfolioRiskMetrics(stressSimResults);

            stressResults[scenario.name] = {
                goalAchievementProbability: stressGoalProb.successProbability,
                expectedReturn: stressRiskMetrics.expectedReturn,
                maxDrawdown: stressRiskMetrics.maxDrawdown.expected,
                var95: stressRiskMetrics.var95,
                medianOutcome: stressGoalProb.outcomes.median
            };
        }

        return stressResults;
    }

    /**
     * 💰 CONTRIBUTION SENSITIVITY ANALYSIS
     * Analyze how changing contributions affects success rate
     */
    async analyzeContributionSensitivity(params) {
        const { monthlyContribution } = params;
        const contributionVariations = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0]; // Multipliers
        const sensitivity = {};

        for (const multiplier of contributionVariations) {
            const adjustedContribution = monthlyContribution * multiplier;
            
            // Run quick simulation with adjusted contribution
            const simResults = await this.runPortfolioSimulations({
                ...params,
                monthlyContribution: adjustedContribution,
                simulations: 2000 // Reduced for speed
            });

            const goalProb = this.calculateGoalProbability(simResults, params.targetAmount);
            
            sensitivity[`${Math.round(multiplier * 100)}%`] = {
                monthlyContribution: adjustedContribution,
                goalAchievementProbability: goalProb.successProbability,
                medianOutcome: goalProb.outcomes.median
            };
        }

        return sensitivity;
    }

    /**
     * ⏰ CALCULATE TIME TO GOAL
     * Estimate expected time to reach target amount
     */
    calculateTimeToGoal(simulationResults, targetAmount) {
        const successfulPaths = simulationResults
            .filter(r => r.finalValue >= targetAmount)
            .map(r => r.path);

        if (successfulPaths.length === 0) {
            return { expectedMonths: null, probability: 0 };
        }

        const timesToGoal = [];
        
        for (const path of successfulPaths) {
            for (let i = 0; i < path.length; i++) {
                if (path[i] >= targetAmount) {
                    timesToGoal.push(i / 30); // Convert days to months
                    break;
                }
            }
        }

        const averageTimeMonths = timesToGoal.reduce((sum, t) => sum + t, 0) / timesToGoal.length;
        const medianTimeMonths = this.getPercentile(timesToGoal.sort((a, b) => a - b), 50);

        return {
            expectedMonths: averageTimeMonths,
            medianMonths: medianTimeMonths,
            probability: successfulPaths.length / simulationResults.length,
            percentile25: this.getPercentile(timesToGoal, 25),
            percentile75: this.getPercentile(timesToGoal, 75)
        };
    }

    /**
     * 🏦 INFLATION ADJUSTED RETURNS
     * Account for inflation impact on real returns
     */
    inflationAdjustedReturns(nominalReturns, inflationRate, timeHorizonYears) {
        return nominalReturns.map(nominalReturn => {
            const realReturn = (1 + nominalReturn) / Math.pow(1 + inflationRate, timeHorizonYears) - 1;
            return realReturn;
        });
    }

    /**
     * 💾 SAVE SIMULATION RESULTS
     * Store simulation results in database
     */
    async saveSimulationResults(data) {
        const simulationId = uuidv4();
        
        try {
            const query = `
                INSERT INTO stock_monte_carlo_analysis (
                    id, symbol, user_id, portfolio_id, simulation_date,
                    num_simulations, time_horizon_days,
                    mean_final_price, median_final_price, std_final_price,
                    price_5th_percentile, price_95th_percentile,
                    mean_return, probability_of_loss, max_simulated_loss, max_simulated_gain
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            `;

            await this.db.query(query, [
                simulationId,
                'PORTFOLIO', // Special symbol for portfolio simulations
                data.userId,
                data.portfolioId,
                new Date(),
                data.baseSimulationResults.length,
                data.parameters.timeHorizonMonths * 30,
                data.goalProbability.outcomes.mean,
                data.goalProbability.outcomes.median,
                data.riskMetrics.volatility,
                data.goalProbability.outcomes.p5,
                data.goalProbability.outcomes.p95,
                data.riskMetrics.expectedReturn,
                1 - data.goalProbability.successProbability,
                data.riskMetrics.var95,
                data.goalProbability.upside
            ]);

            console.log(`💾 Saved simulation results with ID: ${simulationId}`);
            return simulationId;

        } catch (error) {
            console.error('Error saving simulation results:', error);
            throw error;
        }
    }

    // ===========================================
    // UTILITY FUNCTIONS
    // ===========================================

    validateSimulationInputs(params) {
        const required = ['holdings', 'timeHorizonMonths', 'initialInvestment', 'targetAmount'];
        for (const field of required) {
            if (!params[field]) {
                throw new Error(`Missing required parameter: ${field}`);
            }
        }

        if (params.timeHorizonMonths < 1 || params.timeHorizonMonths > 600) {
            throw new Error('Time horizon must be between 1 and 600 months');
        }

        if (params.targetAmount <= params.initialInvestment) {
            throw new Error('Target amount must be greater than initial investment');
        }
    }

    getRebalanceFrequency(frequency) {
        const frequencies = {
            'monthly': 30,
            'quarterly': 90,
            'semiannual': 180,
            'annual': 365
        };
        return frequencies[frequency] || 90;
    }

    buildCorrelationMatrix(holdings, correlationMatrix) {
        const symbols = holdings.map(h => h.symbol);
        return symbols.map(symbol1 => 
            symbols.map(symbol2 => {
                if (symbol1 === symbol2) return 1.0;
                return correlationMatrix[symbol1]?.[symbol2] || 0.3; // Default correlation
            })
        );
    }

    choleskyDecomposition(matrix) {
        const n = matrix.length;
        const L = Array(n).fill().map(() => Array(n).fill(0));
        
        for (let i = 0; i < n; i++) {
            for (let j = 0; j <= i; j++) {
                if (i === j) {
                    let sum = 0;
                    for (let k = 0; k < j; k++) {
                        sum += L[j][k] * L[j][k];
                    }
                    L[j][j] = Math.sqrt(Math.max(0, matrix[j][j] - sum));
                } else {
                    let sum = 0;
                    for (let k = 0; k < j; k++) {
                        sum += L[i][k] * L[j][k];
                    }
                    L[i][j] = L[j][j] !== 0 ? (matrix[i][j] - sum) / L[j][j] : 0;
                }
            }
        }
        
        return L;
    }

    randomNormal() {
        // Box-Muller transformation
        let u = 0, v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    calculateVolatility(returns) {
        if (returns.length < 2) return 0;
        const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
        const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / (returns.length - 1);
        return Math.sqrt(variance);
    }

    calculateSortinoRatio(returns, targetReturn = 0) {
        const excessReturns = returns.map(r => r - targetReturn);
        const meanExcess = excessReturns.reduce((sum, r) => sum + r, 0) / excessReturns.length;
        const downsideReturns = excessReturns.filter(r => r < 0);
        
        if (downsideReturns.length === 0) return Infinity;
        
        const downsideDeviation = Math.sqrt(
            downsideReturns.reduce((sum, r) => sum + r * r, 0) / downsideReturns.length
        );
        
        return downsideDeviation > 0 ? meanExcess / downsideDeviation : 0;
    }

    calculateExpectedShortfall(sortedReturns, alpha) {
        const cutoff = Math.floor(sortedReturns.length * alpha);
        const tailReturns = sortedReturns.slice(0, cutoff);
        return tailReturns.reduce((sum, r) => sum + r, 0) / tailReturns.length;
    }

    calculateSkewness(returns) {
        const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
        const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
        const std = Math.sqrt(variance);
        
        if (std === 0) return 0;
        
        return returns.reduce((sum, r) => sum + Math.pow((r - mean) / std, 3), 0) / returns.length;
    }

    calculateKurtosis(returns) {
        const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
        const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
        const std = Math.sqrt(variance);
        
        if (std === 0) return 0;
        
        const kurtosis = returns.reduce((sum, r) => sum + Math.pow((r - mean) / std, 4), 0) / returns.length;
        return kurtosis - 3; // Excess kurtosis
    }

    getPercentile(sortedArray, percentile) {
        const index = (percentile / 100) * (sortedArray.length - 1);
        const lower = Math.floor(index);
        const upper = Math.ceil(index);
        const weight = index - lower;
        
        if (upper >= sortedArray.length) return sortedArray[sortedArray.length - 1];
        return sortedArray[lower] * (1 - weight) + sortedArray[upper] * weight;
    }
}

module.exports = PortfolioMonteCarloEngine;