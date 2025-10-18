/**
 * Individual Stock Monte Carlo Simulation Engine for Gro App
 * 
 * Handles single stock price simulations using geometric Brownian motion.
 * Generates price paths for individual stocks used in portfolio-level analysis.
 */

const { v4: uuidv4 } = require('uuid');

class StockMonteCarloEngine {
    constructor(dbPool) {
        this.db = dbPool;
        this.defaultSimulations = 10000;
        this.tradingDaysPerYear = 252;
    }

    /**
     * 🎯 MAIN STOCK SIMULATION FUNCTION
     * Simulates future price paths for a single stock
     */
    async simulateStockPrice(params) {
        const {
            symbol,
            userId,
            portfolioId,
            timeHorizonDays,
            initialPrice,
            expectedReturn,     // Annual expected return
            volatility,         // Annual volatility
            simulations = this.defaultSimulations,
            includeJumps = false, // Include jump diffusion
            dividendYield = 0   // Annual dividend yield
        } = params;

        console.log(`🎲 Starting Monte Carlo simulation for ${symbol} over ${timeHorizonDays} days...`);

        try {
            // 1. Validate inputs
            this.validateSimulationInputs(params);

            // 2. Get current stock data if not provided
            const stockData = await this.getStockData(symbol, initialPrice, expectedReturn, volatility);

            // 3. Convert annual parameters to daily
            const dailyDrift = this.calculateDailyDrift(stockData.expectedReturn, stockData.volatility);
            const dailyVolatility = stockData.volatility / Math.sqrt(this.tradingDaysPerYear);

            // 4. Run Monte Carlo simulation
            const simulationResults = await this.runStockSimulation({
                symbol,
                initialPrice: stockData.currentPrice,
                dailyDrift,
                dailyVolatility,
                timeHorizonDays,
                simulations,
                dividendYield,
                includeJumps
            });

            // 5. Calculate simulation statistics
            const statistics = this.calculateSimulationStatistics(simulationResults, stockData.currentPrice);

            // 6. Analyze price probabilities
            const probabilityAnalysis = this.analyzePriceProbabilities(simulationResults, stockData.currentPrice);

            // 7. Calculate risk metrics
            const riskMetrics = this.calculateStockRiskMetrics(simulationResults);

            // 8. Save simulation results
            const simulationId = await this.saveStockSimulation({
                userId,
                portfolioId,
                symbol,
                simulationResults,
                statistics,
                probabilityAnalysis,
                riskMetrics,
                parameters: params
            });

            console.log(`✅ Stock simulation completed for ${symbol}`);

            return {
                simulationId,
                symbol,
                statistics,
                probabilityAnalysis,
                riskMetrics,
                scenarioCount: simulations,
                timeHorizon: timeHorizonDays
            };

        } catch (error) {
            console.error(`Stock Monte Carlo simulation failed for ${symbol}:`, error);
            throw new Error(`Simulation failed: ${error.message}`);
        }
    }

    /**
     * 📈 RUN STOCK SIMULATION
     * Core simulation engine using geometric Brownian motion
     */
    async runStockSimulation(params) {
        const {
            symbol,
            initialPrice,
            dailyDrift,
            dailyVolatility,
            timeHorizonDays,
            simulations,
            dividendYield,
            includeJumps
        } = params;

        const results = [];

        console.log(`📊 Running ${simulations} price path simulations...`);

        for (let sim = 0; sim < simulations; sim++) {
            const pricePath = this.generatePricePath({
                initialPrice,
                dailyDrift,
                dailyVolatility,
                timeHorizonDays,
                dividendYield,
                includeJumps
            });

            results.push({
                simulation: sim,
                finalPrice: pricePath.finalPrice,
                maxPrice: pricePath.maxPrice,
                minPrice: pricePath.minPrice,
                maxDrawdown: pricePath.maxDrawdown,
                totalReturn: pricePath.totalReturn,
                volatility: pricePath.realizedVolatility,
                path: pricePath.dailyPrices,
                jumpCount: pricePath.jumpCount || 0
            });

            // Progress logging
            if (sim % 1000 === 0 && sim > 0) {
                console.log(`📈 Completed ${sim}/${simulations} simulations`);
            }
        }

        return results;
    }

    /**
     * 📊 GENERATE SINGLE PRICE PATH
     * Creates one possible price path using geometric Brownian motion
     */
    generatePricePath(params) {
        const {
            initialPrice,
            dailyDrift,
            dailyVolatility,
            timeHorizonDays,
            dividendYield = 0,
            includeJumps = false
        } = params;

        let currentPrice = initialPrice;
        let maxPrice = initialPrice;
        let minPrice = initialPrice;
        let maxDrawdown = 0;
        let jumpCount = 0;

        const dailyPrices = [initialPrice];
        const dailyReturns = [];

        // Dividend adjustment (continuous dividend yield)
        const adjustedDrift = dailyDrift - (dividendYield / this.tradingDaysPerYear);

        for (let day = 1; day <= timeHorizonDays; day++) {
            // Generate random normal variable
            const randomShock = this.randomNormal();

            // Geometric Brownian Motion calculation
            const drift = adjustedDrift - (0.5 * dailyVolatility * dailyVolatility);
            const diffusion = dailyVolatility * randomShock;
            
            // Calculate return
            let dailyReturn = drift + diffusion;

            // Add jump component if enabled
            if (includeJumps && Math.random() < 0.02) { // 2% chance of jump per day
                const jumpSize = this.randomNormal() * 0.05; // 5% jump volatility
                dailyReturn += jumpSize;
                jumpCount++;
            }

            // Apply return to price
            currentPrice = currentPrice * Math.exp(dailyReturn);
            dailyReturns.push(dailyReturn);
            dailyPrices.push(currentPrice);

            // Track extremes
            if (currentPrice > maxPrice) {
                maxPrice = currentPrice;
            }
            if (currentPrice < minPrice) {
                minPrice = currentPrice;
            }

            // Calculate drawdown from peak
            const drawdownFromPeak = (maxPrice - currentPrice) / maxPrice;
            if (drawdownFromPeak > maxDrawdown) {
                maxDrawdown = drawdownFromPeak;
            }
        }

        // Calculate final metrics
        const totalReturn = (currentPrice - initialPrice) / initialPrice;
        const realizedVolatility = this.calculateVolatility(dailyReturns);

        return {
            finalPrice: currentPrice,
            maxPrice,
            minPrice,
            maxDrawdown,
            totalReturn,
            realizedVolatility,
            dailyPrices,
            jumpCount
        };
    }

    /**
     * 📊 CALCULATE SIMULATION STATISTICS
     * Extract statistical measures from all simulation paths
     */
    calculateSimulationStatistics(simulationResults, initialPrice) {
        const finalPrices = simulationResults.map(r => r.finalPrice);
        const totalReturns = simulationResults.map(r => r.totalReturn);
        const maxDrawdowns = simulationResults.map(r => r.maxDrawdown);

        const sortedPrices = [...finalPrices].sort((a, b) => a - b);
        const sortedReturns = [...totalReturns].sort((a, b) => a - b);

        return {
            initialPrice,
            finalPrices: {
                mean: this.calculateMean(finalPrices),
                median: this.getPercentile(sortedPrices, 50),
                standardDeviation: this.calculateStandardDeviation(finalPrices),
                min: Math.min(...finalPrices),
                max: Math.max(...finalPrices),
                percentiles: {
                    p5: this.getPercentile(sortedPrices, 5),
                    p10: this.getPercentile(sortedPrices, 10),
                    p25: this.getPercentile(sortedPrices, 25),
                    p75: this.getPercentile(sortedPrices, 75),
                    p90: this.getPercentile(sortedPrices, 90),
                    p95: this.getPercentile(sortedPrices, 95)
                }
            },
            returns: {
                mean: this.calculateMean(totalReturns),
                median: this.getPercentile(sortedReturns, 50),
                standardDeviation: this.calculateStandardDeviation(totalReturns),
                min: Math.min(...totalReturns),
                max: Math.max(...totalReturns),
                positiveReturns: totalReturns.filter(r => r > 0).length / totalReturns.length
            },
            drawdowns: {
                mean: this.calculateMean(maxDrawdowns),
                max: Math.max(...maxDrawdowns),
                percentile95: this.getPercentile([...maxDrawdowns].sort((a, b) => b - a), 95)
            }
        };
    }

    /**
     * 🎯 ANALYZE PRICE PROBABILITIES
     * Calculate probability of reaching various price levels
     */
    analyzePriceProbabilities(simulationResults, initialPrice) {
        const finalPrices = simulationResults.map(r => r.finalPrice);
        const totalSimulations = finalPrices.length;

        // Common probability thresholds
        const priceTargets = [
            { label: '10% gain', price: initialPrice * 1.10 },
            { label: '20% gain', price: initialPrice * 1.20 },
            { label: '50% gain', price: initialPrice * 1.50 },
            { label: '100% gain', price: initialPrice * 2.00 },
            { label: '10% loss', price: initialPrice * 0.90 },
            { label: '20% loss', price: initialPrice * 0.80 },
            { label: '50% loss', price: initialPrice * 0.50 }
        ];

        const probabilities = {};

        for (const target of priceTargets) {
            const countAboveTarget = finalPrices.filter(price => price >= target.price).length;
            probabilities[target.label] = countAboveTarget / totalSimulations;
        }

        // Probability of loss
        const lossCount = finalPrices.filter(price => price < initialPrice).length;
        probabilities['any_loss'] = lossCount / totalSimulations;

        // Probability of doubling
        const doublingCount = finalPrices.filter(price => price >= initialPrice * 2).length;
        probabilities['doubling'] = doublingCount / totalSimulations;

        return {
            probabilities,
            confidenceIntervals: {
                '90%': {
                    lower: this.getPercentile([...finalPrices].sort((a, b) => a - b), 5),
                    upper: this.getPercentile([...finalPrices].sort((a, b) => a - b), 95)
                },
                '95%': {
                    lower: this.getPercentile([...finalPrices].sort((a, b) => a - b), 2.5),
                    upper: this.getPercentile([...finalPrices].sort((a, b) => a - b), 97.5)
                }
            }
        };
    }

    /**
     * ⚠️ CALCULATE STOCK RISK METRICS
     * Extract risk statistics from simulation results
     */
    calculateStockRiskMetrics(simulationResults) {
        const returns = simulationResults.map(r => r.totalReturn);
        const drawdowns = simulationResults.map(r => r.maxDrawdown);
        const volatilities = simulationResults.map(r => r.volatility);

        const sortedReturns = [...returns].sort((a, b) => a - b);
        const expectedReturn = this.calculateMean(returns);
        const returnVolatility = this.calculateStandardDeviation(returns);

        return {
            valueAtRisk: {
                var90: this.getPercentile(sortedReturns, 10),
                var95: this.getPercentile(sortedReturns, 5),
                var99: this.getPercentile(sortedReturns, 1)
            },
            expectedShortfall: {
                es95: this.calculateExpectedShortfall(sortedReturns, 0.05),
                es99: this.calculateExpectedShortfall(sortedReturns, 0.01)
            },
            drawdownRisk: {
                expectedMaxDrawdown: this.calculateMean(drawdowns),
                worstDrawdown: Math.max(...drawdowns),
                drawdown95: this.getPercentile([...drawdowns].sort((a, b) => b - a), 95)
            },
            volatilityMetrics: {
                expectedVolatility: this.calculateMean(volatilities),
                volatilityOfVolatility: this.calculateStandardDeviation(volatilities),
                annualizedVolatility: returnVolatility * Math.sqrt(this.tradingDaysPerYear)
            },
            tailRisk: {
                skewness: this.calculateSkewness(returns),
                kurtosis: this.calculateKurtosis(returns),
                leftTailMean: this.calculateExpectedShortfall(sortedReturns, 0.05),
                rightTailMean: this.calculateExpectedShortfall([...sortedReturns].reverse(), 0.05)
            }
        };
    }

    /**
     * 📊 GET STOCK DATA
     * Retrieve current stock data or use provided parameters
     */
    async getStockData(symbol, providedPrice, providedReturn, providedVolatility) {
        try {
            // Get current price if not provided
            let currentPrice = providedPrice;
            if (!currentPrice) {
                const priceQuery = `
                    SELECT price FROM stock_quotes 
                    WHERE symbol = $1
                `;
                const priceResult = await this.db.query(priceQuery, [symbol]);
                currentPrice = priceResult.rows[0]?.price || 100; // Default if not found
            }

            // Get historical data for return/volatility calculation if not provided
            let expectedReturn = providedReturn;
            let volatility = providedVolatility;

            if (!expectedReturn || !volatility) {
                const historicalQuery = `
                    SELECT daily_return 
                    FROM stock_prices 
                    WHERE symbol = $1 
                    AND date >= CURRENT_DATE - INTERVAL '1 year'
                    AND daily_return IS NOT NULL
                    ORDER BY date DESC
                    LIMIT 252
                `;
                
                const historicalResult = await this.db.query(historicalQuery, [symbol]);
                
                if (historicalResult.rows.length >= 50) {
                    const returns = historicalResult.rows.map(row => parseFloat(row.daily_return));
                    
                    if (!expectedReturn) {
                        expectedReturn = this.calculateMean(returns) * this.tradingDaysPerYear;
                    }
                    
                    if (!volatility) {
                        volatility = this.calculateStandardDeviation(returns) * Math.sqrt(this.tradingDaysPerYear);
                    }
                } else {
                    // Use market defaults if insufficient data
                    expectedReturn = expectedReturn || 0.10; // 10% annual return
                    volatility = volatility || 0.20; // 20% annual volatility
                }
            }

            return {
                currentPrice,
                expectedReturn,
                volatility
            };

        } catch (error) {
            console.error(`Error getting stock data for ${symbol}:`, error);
            // Return defaults
            return {
                currentPrice: providedPrice || 100,
                expectedReturn: providedReturn || 0.10,
                volatility: providedVolatility || 0.20
            };
        }
    }

    /**
     * 💾 SAVE STOCK SIMULATION
     * Save simulation results to database
     */
    async saveStockSimulation(data) {
        const simulationId = uuidv4();
        
        try {
            const query = `
                INSERT INTO stock_monte_carlo_analysis (
                    id, symbol, user_id, portfolio_id, simulation_date,
                    num_simulations, time_horizon_days, initial_price, drift, volatility,
                    mean_final_price, median_final_price, std_final_price,
                    price_5th_percentile, price_95th_percentile,
                    mean_return, probability_of_loss, max_simulated_loss, max_simulated_gain
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
            `;

            await this.db.query(query, [
                simulationId,
                data.symbol,
                data.userId,
                data.portfolioId,
                new Date(),
                data.simulationResults.length,
                data.parameters.timeHorizonDays,
                data.statistics.initialPrice,
                data.parameters.expectedReturn,
                data.parameters.volatility,
                data.statistics.finalPrices.mean,
                data.statistics.finalPrices.median,
                data.statistics.finalPrices.standardDeviation,
                data.statistics.finalPrices.percentiles.p5,
                data.statistics.finalPrices.percentiles.p95,
                data.statistics.returns.mean,
                data.probabilityAnalysis.probabilities.any_loss,
                data.statistics.returns.min,
                data.statistics.returns.max
            ]);

            console.log(`💾 Saved stock simulation results for ${data.symbol} with ID: ${simulationId}`);
            return simulationId;

        } catch (error) {
            console.error('Error saving stock simulation results:', error);
            throw error;
        }
    }

    // ===========================================
    // UTILITY FUNCTIONS
    // ===========================================

    validateSimulationInputs(params) {
        const required = ['symbol', 'timeHorizonDays'];
        for (const field of required) {
            if (!params[field]) {
                throw new Error(`Missing required parameter: ${field}`);
            }
        }

        if (params.timeHorizonDays < 1 || params.timeHorizonDays > 3650) {
            throw new Error('Time horizon must be between 1 and 3650 days');
        }

        if (params.simulations && (params.simulations < 100 || params.simulations > 50000)) {
            throw new Error('Simulations must be between 100 and 50,000');
        }
    }

    calculateDailyDrift(annualReturn, annualVolatility) {
        // Convert annual expected return to daily drift
        // Accounts for volatility drag: μ_daily = (μ_annual - 0.5 * σ²_annual) / 252
        return (annualReturn - 0.5 * annualVolatility * annualVolatility) / this.tradingDaysPerYear;
    }

    randomNormal() {
        // Box-Muller transformation for normal distribution
        let u = 0, v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    calculateMean(values) {
        return values.reduce((sum, val) => sum + val, 0) / values.length;
    }

    calculateStandardDeviation(values) {
        if (values.length < 2) return 0;
        const mean = this.calculateMean(values);
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (values.length - 1);
        return Math.sqrt(variance);
    }

    calculateVolatility(returns) {
        return this.calculateStandardDeviation(returns);
    }

    getPercentile(sortedArray, percentile) {
        const index = (percentile / 100) * (sortedArray.length - 1);
        const lower = Math.floor(index);
        const upper = Math.ceil(index);
        const weight = index - lower;
        
        if (upper >= sortedArray.length) return sortedArray[sortedArray.length - 1];
        return sortedArray[lower] * (1 - weight) + sortedArray[upper] * weight;
    }

    calculateExpectedShortfall(sortedReturns, alpha) {
        const cutoff = Math.floor(sortedReturns.length * alpha);
        const tailReturns = sortedReturns.slice(0, cutoff);
        return tailReturns.reduce((sum, r) => sum + r, 0) / tailReturns.length;
    }

    calculateSkewness(returns) {
        const mean = this.calculateMean(returns);
        const std = this.calculateStandardDeviation(returns);
        if (std === 0) return 0;
        
        return returns.reduce((sum, r) => sum + Math.pow((r - mean) / std, 3), 0) / returns.length;
    }

    calculateKurtosis(returns) {
        const mean = this.calculateMean(returns);
        const std = this.calculateStandardDeviation(returns);
        if (std === 0) return 0;
        
        const kurtosis = returns.reduce((sum, r) => sum + Math.pow((r - mean) / std, 4), 0) / returns.length;
        return kurtosis - 3; // Excess kurtosis
    }
}

module.exports = StockMonteCarloEngine;