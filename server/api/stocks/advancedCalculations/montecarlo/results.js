/**
 * Monte Carlo Results Processing and Analysis Engine for Gro App
 * 
 * Processes raw simulation results into meaningful insights and statistical measures.
 * Handles result storage, retrieval, and formatting for API responses.
 */

const { v4: uuidv4 } = require('uuid');

class MonteCarloResultsProcessor {
    constructor(dbPool) {
        this.db = dbPool;
    }

    /**
     * 📊 PROCESS SIMULATION RESULTS
     * Main function to process raw Monte Carlo results into insights
     */
    async processSimulationResults(rawResults, metadata) {
        try {
            console.log(`📈 Processing ${rawResults.length} simulation results...`);

            // 1. Calculate statistical measures
            const statisticalMeasures = this.calculateStatisticalMeasures(rawResults);

            // 2. Generate probability distributions
            const probabilityDistribution = this.generateProbabilityDistribution(rawResults);

            // 3. Calculate comprehensive risk metrics
            const riskMetrics = this.calculateRiskMetrics(rawResults);

            // 4. Analyze goal achievement
            const goalAnalysis = this.analyzeGoalAchievement(rawResults, metadata.targetAmount);

            // 5. Calculate time-based projections
            const timeBasedProjections = this.calculateTimeBasedProjections(rawResults, metadata);

            // 6. Generate performance percentiles
            const performancePercentiles = this.calculatePercentiles(rawResults);

            // 7. Stress test analysis
            const stressTestSummary = this.analyzeStressTestResults(metadata.stressTestResults);

            // 8. Contribution sensitivity insights
            const contributionInsights = this.analyzeContributionSensitivity(metadata.contributionSensitivity);

            const processedResults = {
                simulationId: metadata.simulationId || uuidv4(),
                metadata: {
                    ...metadata,
                    processedAt: new Date(),
                    totalSimulations: rawResults.length
                },
                statisticalMeasures,
                probabilityDistribution,
                riskMetrics,
                goalAnalysis,
                timeBasedProjections,
                performancePercentiles,
                stressTestSummary,
                contributionInsights,
                summary: this.generateExecutiveSummary(statisticalMeasures, goalAnalysis, riskMetrics)
            };

            console.log(`✅ Results processing completed`);
            return processedResults;

        } catch (error) {
            console.error('Error processing simulation results:', error);
            throw new Error(`Results processing failed: ${error.message}`);
        }
    }

    /**
     * 📈 CALCULATE STATISTICAL MEASURES
     * Calculate comprehensive statistical measures from simulation results
     */
    calculateStatisticalMeasures(rawResults) {
        const finalValues = rawResults.map(r => r.finalRealValue || r.finalValue);
        const returns = rawResults.map(r => r.realReturn || r.totalReturn);
        const drawdowns = rawResults.map(r => r.maxDrawdown);

        const sortedValues = [...finalValues].sort((a, b) => a - b);
        const sortedReturns = [...returns].sort((a, b) => a - b);

        return {
            finalValues: {
                mean: this.calculateMean(finalValues),
                median: this.getPercentile(sortedValues, 50),
                standardDeviation: this.calculateStandardDeviation(finalValues),
                min: Math.min(...finalValues),
                max: Math.max(...finalValues),
                range: Math.max(...finalValues) - Math.min(...finalValues)
            },
            returns: {
                mean: this.calculateMean(returns),
                median: this.getPercentile(sortedReturns, 50),
                standardDeviation: this.calculateStandardDeviation(returns),
                annualized: this.calculateMean(returns) * Math.sqrt(252), // Assuming daily returns
                min: Math.min(...returns),
                max: Math.max(...returns),
                positiveReturns: returns.filter(r => r > 0).length / returns.length
            },
            drawdowns: {
                mean: this.calculateMean(drawdowns),
                median: this.getPercentile([...drawdowns].sort((a, b) => a - b), 50),
                max: Math.max(...drawdowns),
                min: Math.min(...drawdowns)
            },
            volatility: {
                realized: this.calculateStandardDeviation(returns),
                annualized: this.calculateStandardDeviation(returns) * Math.sqrt(252)
            }
        };
    }

    /**
     * 🎯 ANALYZE GOAL ACHIEVEMENT
     * Detailed analysis of goal achievement probability and scenarios
     */
    analyzeGoalAchievement(rawResults, targetAmount) {
        if (!targetAmount) {
            return { error: 'Target amount not provided for goal analysis' };
        }

        const finalValues = rawResults.map(r => r.finalRealValue || r.finalValue);
        const successfulSimulations = finalValues.filter(value => value >= targetAmount);
        const failedSimulations = finalValues.filter(value => value < targetAmount);

        const successProbability = successfulSimulations.length / finalValues.length;
        const sortedValues = [...finalValues].sort((a, b) => a - b);

        // Calculate shortfall analysis
        const shortfalls = failedSimulations.map(value => targetAmount - value);
        const shortfallProbability = failedSimulations.length / finalValues.length;

        // Calculate upside analysis
        const upsides = successfulSimulations.map(value => value - targetAmount);
        const averageUpside = upsides.length > 0 ? this.calculateMean(upsides) : 0;

        return {
            targetAmount,
            successProbability,
            failureProbability: 1 - successProbability,
            outcomes: {
                expectedValue: this.calculateMean(finalValues),
                medianValue: this.getPercentile(sortedValues, 50),
                worstCase: Math.min(...finalValues),
                bestCase: Math.max(...finalValues),
                confidenceInterval90: {
                    lower: this.getPercentile(sortedValues, 5),
                    upper: this.getPercentile(sortedValues, 95)
                },
                confidenceInterval95: {
                    lower: this.getPercentile(sortedValues, 2.5),
                    upper: this.getPercentile(sortedValues, 97.5)
                }
            },
            shortfallAnalysis: {
                probability: shortfallProbability,
                averageShortfall: shortfalls.length > 0 ? this.calculateMean(shortfalls) : 0,
                medianShortfall: shortfalls.length > 0 ? this.getPercentile([...shortfalls].sort((a, b) => a - b), 50) : 0,
                maxShortfall: shortfalls.length > 0 ? Math.max(...shortfalls) : 0
            },
            upsideAnalysis: {
                probability: successProbability,
                averageUpside,
                medianUpside: upsides.length > 0 ? this.getPercentile([...upsides].sort((a, b) => a - b), 50) : 0,
                maxUpside: upsides.length > 0 ? Math.max(...upsides) : 0
            },
            riskReward: {
                upsideDownsideRatio: averageUpside / (shortfalls.length > 0 ? this.calculateMean(shortfalls) : 1),
                probabilityWeightedReturn: successProbability * averageUpside - shortfallProbability * (shortfalls.length > 0 ? this.calculateMean(shortfalls) : 0)
            }
        };
    }

    /**
     * ⚠️ CALCULATE RISK METRICS
     * Comprehensive risk analysis from simulation paths
     */
    calculateRiskMetrics(rawResults) {
        const returns = rawResults.map(r => r.realReturn || r.totalReturn);
        const finalValues = rawResults.map(r => r.finalRealValue || r.finalValue);
        const drawdowns = rawResults.map(r => r.maxDrawdown);
        const volatilities = rawResults.map(r => r.volatility);

        const sortedReturns = [...returns].sort((a, b) => a - b);
        const sortedDrawdowns = [...drawdowns].sort((a, b) => b - a);

        const riskFreeRate = 0.02; // 2% annual risk-free rate
        const expectedReturn = this.calculateMean(returns);
        const returnVolatility = this.calculateStandardDeviation(returns);

        return {
            valueAtRisk: {
                var90: this.getPercentile(sortedReturns, 10),
                var95: this.getPercentile(sortedReturns, 5),
                var99: this.getPercentile(sortedReturns, 1)
            },
            expectedShortfall: {
                es90: this.calculateExpectedShortfall(sortedReturns, 0.10),
                es95: this.calculateExpectedShortfall(sortedReturns, 0.05),
                es99: this.calculateExpectedShortfall(sortedReturns, 0.01)
            },
            drawdownMetrics: {
                expectedMaxDrawdown: this.calculateMean(drawdowns),
                medianMaxDrawdown: this.getPercentile([...drawdowns].sort((a, b) => a - b), 50),
                worstDrawdown: Math.max(...drawdowns),
                drawdown95thPercentile: this.getPercentile(sortedDrawdowns, 95),
                drawdownVolatility: this.calculateStandardDeviation(drawdowns)
            },
            riskAdjustedReturns: {
                sharpeRatio: returnVolatility > 0 ? (expectedReturn - riskFreeRate) / returnVolatility : 0,
                sortinoRatio: this.calculateSortinoRatio(returns, riskFreeRate),
                calmarRatio: this.calculateCalmarRatio(returns, drawdowns),
                treynorRatio: this.calculateTreynorRatio(returns, riskFreeRate) // Assumes beta = 1 for portfolio
            },
            volatilityMetrics: {
                returnVolatility,
                annualizedVolatility: returnVolatility * Math.sqrt(252),
                downsideVolatility: this.calculateDownsideVolatility(returns, 0),
                upsideVolatility: this.calculateUpsideVolatility(returns, 0),
                volatilityOfVolatility: this.calculateStandardDeviation(volatilities)
            },
            tailRiskMetrics: {
                skewness: this.calculateSkewness(returns),
                kurtosis: this.calculateKurtosis(returns),
                tailRatio: this.calculateTailRatio(sortedReturns),
                leftTailMean: this.calculateExpectedShortfall(sortedReturns, 0.05),
                rightTailMean: this.calculateExpectedShortfall([...sortedReturns].reverse(), 0.05)
            },
            probabilityMetrics: {
                probabilityOfLoss: returns.filter(r => r < 0).length / returns.length,
                probabilityOfLoss10Percent: returns.filter(r => r < -0.10).length / returns.length,
                probabilityOfLoss20Percent: returns.filter(r => r < -0.20).length / returns.length,
                probabilityOfGain10Percent: returns.filter(r => r > 0.10).length / returns.length,
                probabilityOfGain20Percent: returns.filter(r => r > 0.20).length / returns.length
            }
        };
    }

    /**
     * 📊 GENERATE PROBABILITY DISTRIBUTION
     * Create probability distribution data for visualization
     */
    generateProbabilityDistribution(rawResults) {
        const finalValues = rawResults.map(r => r.finalRealValue || r.finalValue);
        const returns = rawResults.map(r => r.realReturn || r.totalReturn);

        // Create histogram bins
        const finalValueBins = this.createHistogramBins(finalValues, 50);
        const returnBins = this.createHistogramBins(returns, 50);

        return {
            finalValues: {
                bins: finalValueBins,
                statistics: {
                    mean: this.calculateMean(finalValues),
                    standardDeviation: this.calculateStandardDeviation(finalValues),
                    skewness: this.calculateSkewness(finalValues),
                    kurtosis: this.calculateKurtosis(finalValues)
                }
            },
            returns: {
                bins: returnBins,
                statistics: {
                    mean: this.calculateMean(returns),
                    standardDeviation: this.calculateStandardDeviation(returns),
                    skewness: this.calculateSkewness(returns),
                    kurtosis: this.calculateKurtosis(returns)
                }
            },
            cumulativeDistribution: this.createCumulativeDistribution(finalValues)
        };
    }

    /**
     * ⏰ CALCULATE TIME-BASED PROJECTIONS
     * Analyze portfolio evolution over time
     */
    calculateTimeBasedProjections(rawResults, metadata) {
        if (!rawResults[0].path) {
            return { error: 'Path data not available for time-based analysis' };
        }

        const timeHorizonMonths = metadata.timeHorizonMonths || 12;
        const monthlySnapshots = [];

        // Sample portfolio values at monthly intervals
        for (let month = 1; month <= timeHorizonMonths; month++) {
            const dayIndex = Math.floor((month * 30) - 1); // Approximate day for each month
            
            const monthlyValues = rawResults
                .filter(r => r.path && r.path.length > dayIndex)
                .map(r => r.path[dayIndex]);

            if (monthlyValues.length > 0) {
                const sortedValues = [...monthlyValues].sort((a, b) => a - b);
                
                monthlySnapshots.push({
                    month,
                    expectedValue: this.calculateMean(monthlyValues),
                    medianValue: this.getPercentile(sortedValues, 50),
                    percentile10: this.getPercentile(sortedValues, 10),
                    percentile25: this.getPercentile(sortedValues, 25),
                    percentile75: this.getPercentile(sortedValues, 75),
                    percentile90: this.getPercentile(sortedValues, 90),
                    volatility: this.calculateStandardDeviation(monthlyValues)
                });
            }
        }

        return {
            monthlyProjections: monthlySnapshots,
            projectionMetrics: {
                growthRate: this.calculateAverageGrowthRate(monthlySnapshots),
                volatilityTrend: this.calculateVolatilityTrend(monthlySnapshots),
                convergenceAnalysis: this.analyzeConvergence(monthlySnapshots)
            }
        };
    }

    /**
     * 📊 CALCULATE PERCENTILES
     * Generate comprehensive percentile analysis
     */
    calculatePercentiles(rawResults) {
        const finalValues = rawResults.map(r => r.finalRealValue || r.finalValue);
        const returns = rawResults.map(r => r.realReturn || r.totalReturn);
        const drawdowns = rawResults.map(r => r.maxDrawdown);

        const sortedValues = [...finalValues].sort((a, b) => a - b);
        const sortedReturns = [...returns].sort((a, b) => a - b);
        const sortedDrawdowns = [...drawdowns].sort((a, b) => a - b);

        const percentilePoints = [1, 5, 10, 25, 50, 75, 90, 95, 99];

        return {
            finalValues: percentilePoints.reduce((acc, p) => {
                acc[`p${p}`] = this.getPercentile(sortedValues, p);
                return acc;
            }, {}),
            returns: percentilePoints.reduce((acc, p) => {
                acc[`p${p}`] = this.getPercentile(sortedReturns, p);
                return acc;
            }, {}),
            drawdowns: percentilePoints.reduce((acc, p) => {
                acc[`p${p}`] = this.getPercentile(sortedDrawdowns, p);
                return acc;
            }, {})
        };
    }

    /**
     * 🧪 ANALYZE STRESS TEST RESULTS
     * Process stress test scenario results
     */
    analyzeStressTestResults(stressTestResults) {
        if (!stressTestResults) {
            return { message: 'No stress test results available' };
        }

        const scenarios = Object.keys(stressTestResults);
        const summaryMetrics = {};

        for (const scenario of scenarios) {
            const result = stressTestResults[scenario];
            summaryMetrics[scenario] = {
                goalAchievementImpact: result.goalAchievementProbability,
                expectedReturnImpact: result.expectedReturn,
                maxDrawdownImpact: result.maxDrawdown,
                riskAdjustedPerformance: result.var95,
                outcomeImpact: result.medianOutcome,
                severity: this.classifyStressSeverity(result.goalAchievementProbability)
            };
        }

        return {
            scenarioResults: summaryMetrics,
            overallRobustness: this.calculateOverallRobustness(summaryMetrics),
            recommendations: this.generateStressTestRecommendations(summaryMetrics)
        };
    }

    /**
     * 💰 ANALYZE CONTRIBUTION SENSITIVITY
     * Process contribution sensitivity analysis results
     */
    analyzeContributionSensitivity(contributionSensitivity) {
        if (!contributionSensitivity) {
            return { message: 'No contribution sensitivity data available' };
        }

        const contributions = Object.keys(contributionSensitivity);
        const elasticity = [];

        for (let i = 1; i < contributions.length; i++) {
            const prev = contributionSensitivity[contributions[i-1]];
            const curr = contributionSensitivity[contributions[i]];
            
            const contributionChange = (curr.monthlyContribution - prev.monthlyContribution) / prev.monthlyContribution;
            const probabilityChange = (curr.goalAchievementProbability - prev.goalAchievementProbability) / prev.goalAchievementProbability;
            
            elasticity.push({
                contributionLevel: contributions[i],
                elasticity: probabilityChange / contributionChange,
                marginalImpact: curr.goalAchievementProbability - prev.goalAchievementProbability
            });
        }

        return {
            sensitivityData: contributionSensitivity,
            elasticityAnalysis: elasticity,
            optimalContribution: this.findOptimalContribution(contributionSensitivity),
            recommendations: this.generateContributionRecommendations(contributionSensitivity, elasticity)
        };
    }

    /**
     * 📝 GENERATE EXECUTIVE SUMMARY
     * Create high-level summary of results
     */
    generateExecutiveSummary(statisticalMeasures, goalAnalysis, riskMetrics) {
        const expectedReturn = statisticalMeasures.returns.mean;
        const successProbability = goalAnalysis.successProbability;
        const sharpeRatio = riskMetrics.riskAdjustedReturns.sharpeRatio;
        const maxDrawdown = riskMetrics.drawdownMetrics.worstDrawdown;

        return {
            overallAssessment: this.classifyPortfolioPerformance(successProbability, sharpeRatio),
            keyMetrics: {
                goalAchievementProbability: successProbability,
                expectedAnnualReturn: expectedReturn,
                riskAdjustedReturn: sharpeRatio,
                maximumDrawdown: maxDrawdown,
                volatility: riskMetrics.volatilityMetrics.annualizedVolatility
            },
            riskLevel: this.classifyRiskLevel(riskMetrics.volatilityMetrics.annualizedVolatility, maxDrawdown),
            confidence: this.calculateConfidenceLevel(statisticalMeasures, goalAnalysis),
            primaryRecommendations: this.generatePrimaryRecommendations(goalAnalysis, riskMetrics)
        };
    }

    /**
     * 💾 SAVE SIMULATION RESULTS
     * Save processed results to database
     */
    async saveSimulationResults(simulationId, processedResults) {
        try {
            const query = `
                INSERT INTO stock_monte_carlo_analysis (
                    id, symbol, user_id, portfolio_id, simulation_date,
                    num_simulations, time_horizon_days,
                    mean_final_price, median_final_price, std_final_price,
                    price_5th_percentile, price_95th_percentile,
                    mean_return, probability_of_loss, max_simulated_loss, max_simulated_gain
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
                ON CONFLICT (id) DO UPDATE SET
                    mean_final_price = EXCLUDED.mean_final_price,
                    median_final_price = EXCLUDED.median_final_price,
                    std_final_price = EXCLUDED.std_final_price,
                    price_5th_percentile = EXCLUDED.price_5th_percentile,
                    price_95th_percentile = EXCLUDED.price_95th_percentile,
                    mean_return = EXCLUDED.mean_return,
                    probability_of_loss = EXCLUDED.probability_of_loss,
                    max_simulated_loss = EXCLUDED.max_simulated_loss,
                    max_simulated_gain = EXCLUDED.max_simulated_gain
            `;

            const values = [
                simulationId,
                'PORTFOLIO',
                processedResults.metadata.userId,
                processedResults.metadata.portfolioId,
                new Date(),
                processedResults.metadata.totalSimulations,
                processedResults.metadata.timeHorizonMonths * 30,
                processedResults.statisticalMeasures.finalValues.mean,
                processedResults.statisticalMeasures.finalValues.median,
                processedResults.statisticalMeasures.finalValues.standardDeviation,
                processedResults.performancePercentiles.finalValues.p5,
                processedResults.performancePercentiles.finalValues.p95,
                processedResults.statisticalMeasures.returns.mean,
                processedResults.riskMetrics.probabilityMetrics.probabilityOfLoss,
                processedResults.performancePercentiles.returns.p1,
                processedResults.performancePercentiles.returns.p99
            ];

            await this.db.query(query, values);

            // Also save detailed results as JSON
            const detailQuery = `
                INSERT INTO portfolio_performance (
                    portfolio_id, date, total_value, daily_return, total_return,
                    volatility_30d, sharpe_ratio, max_drawdown, var_95
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                ON CONFLICT (portfolio_id, date) DO UPDATE SET
                    total_value = EXCLUDED.total_value,
                    total_return = EXCLUDED.total_return,
                    volatility_30d = EXCLUDED.volatility_30d,
                    sharpe_ratio = EXCLUDED.sharpe_ratio,
                    max_drawdown = EXCLUDED.max_drawdown,
                    var_95 = EXCLUDED.var_95
            `;

            await this.db.query(detailQuery, [
                processedResults.metadata.portfolioId,
                new Date(),
                processedResults.statisticalMeasures.finalValues.mean,
                0, // daily return not applicable for Monte Carlo
                processedResults.statisticalMeasures.returns.mean,
                processedResults.riskMetrics.volatilityMetrics.annualizedVolatility,
                processedResults.riskMetrics.riskAdjustedReturns.sharpeRatio,
                processedResults.riskMetrics.drawdownMetrics.worstDrawdown,
                processedResults.riskMetrics.valueAtRisk.var95
            ]);

            console.log(`💾 Saved simulation results for ID: ${simulationId}`);
            return simulationId;

        } catch (error) {
            console.error('Error saving simulation results:', error);
            throw error;
        }
    }

    /**
     * 🔍 GET SIMULATION RESULTS BY ID
     * Retrieve processed results from database
     */
    async getSimulationById(simulationId) {
        try {
            const query = `
                SELECT * FROM stock_monte_carlo_analysis 
                WHERE id = $1
            `;
            
            const result = await this.db.query(query, [simulationId]);
            
            if (result.rows.length === 0) {
                throw new Error(`Simulation not found: ${simulationId}`);
            }

            return this.formatResultsForAPI(result.rows[0]);

        } catch (error) {
            console.error('Error retrieving simulation results:', error);
            throw error;
        }
    }

    /**
     * 📤 FORMAT RESULTS FOR API
     * Format processed results for API response
     */
    formatResultsForAPI(processedResults) {
        return {
            simulationId: processedResults.simulationId,
            summary: processedResults.summary,
            goalAnalysis: {
                probability: processedResults.goalAnalysis.successProbability,
                expectedOutcome: processedResults.goalAnalysis.outcomes.expectedValue,
                confidenceInterval: processedResults.goalAnalysis.outcomes.confidenceInterval95,
                shortfallRisk: processedResults.goalAnalysis.shortfallAnalysis
            },
            riskMetrics: {
                var95: processedResults.riskMetrics.valueAtRisk.var95,
                maxDrawdown: processedResults.riskMetrics.drawdownMetrics.worstDrawdown,
                sharpeRatio: processedResults.riskMetrics.riskAdjustedReturns.sharpeRatio,
                volatility: processedResults.riskMetrics.volatilityMetrics.annualizedVolatility
            },
            projections: processedResults.timeBasedProjections,
            recommendations: processedResults.summary.primaryRecommendations,
            lastUpdated: processedResults.metadata.processedAt
        };
    }

    // ===========================================
    // UTILITY FUNCTIONS
    // ===========================================

    calculateMean(values) {
        return values.reduce((sum, val) => sum + val, 0) / values.length;
    }

    calculateStandardDeviation(values) {
        const mean = this.calculateMean(values);
        const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (values.length - 1);
        return Math.sqrt(variance);
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

    calculateSortinoRatio(returns, targetReturn = 0) {
        const excessReturns = returns.map(r => r - targetReturn);
        const meanExcess = this.calculateMean(excessReturns);
        const downsideReturns = excessReturns.filter(r => r < 0);
        
        if (downsideReturns.length === 0) return Infinity;
        
        const downsideDeviation = Math.sqrt(
            downsideReturns.reduce((sum, r) => sum + r * r, 0) / downsideReturns.length
        );
        
        return downsideDeviation > 0 ? meanExcess / downsideDeviation : 0;
    }

    calculateCalmarRatio(returns, drawdowns) {
        const annualizedReturn = this.calculateMean(returns);
        const maxDD = Math.max(...drawdowns);
        return maxDD > 0 ? annualizedReturn / maxDD : 0;
    }

    calculateTreynorRatio(returns, riskFreeRate, beta = 1) {
        const excessReturn = this.calculateMean(returns) - riskFreeRate;
        return beta > 0 ? excessReturn / beta : 0;
    }

    calculateDownsideVolatility(returns, targetReturn = 0) {
        const downsideReturns = returns.filter(r => r < targetReturn);
        return downsideReturns.length > 0 ? this.calculateStandardDeviation(downsideReturns) : 0;
    }

    calculateUpsideVolatility(returns, targetReturn = 0) {
        const upsideReturns = returns.filter(r => r > targetReturn);
        return upsideReturns.length > 0 ? this.calculateStandardDeviation(upsideReturns) : 0;
    }

    calculateSkewness(values) {
        const mean = this.calculateMean(values);
        const std = this.calculateStandardDeviation(values);
        if (std === 0) return 0;
        
        return values.reduce((sum, val) => sum + Math.pow((val - mean) / std, 3), 0) / values.length;
    }

    calculateKurtosis(values) {
        const mean = this.calculateMean(values);
        const std = this.calculateStandardDeviation(values);
        if (std === 0) return 0;
        
        const kurtosis = values.reduce((sum, val) => sum + Math.pow((val - mean) / std, 4), 0) / values.length;
        return kurtosis - 3; // Excess kurtosis
    }

    calculateTailRatio(sortedReturns) {
        const p95 = this.getPercentile(sortedReturns, 95);
        const p5 = this.getPercentile(sortedReturns, 5);
        return p5 !== 0 ? Math.abs(p95 / p5) : 0;
    }

    createHistogramBins(values, numBins) {
        const min = Math.min(...values);
        const max = Math.max(...values);
        const binWidth = (max - min) / numBins;
        
        const bins = Array(numBins).fill(0);
        const binEdges = Array(numBins + 1).fill(0).map((_, i) => min + i * binWidth);
        
        values.forEach(value => {
            let binIndex = Math.floor((value - min) / binWidth);
            if (binIndex >= numBins) binIndex = numBins - 1;
            bins[binIndex]++;
        });
        
        return bins.map((count, i) => ({
            binStart: binEdges[i],
            binEnd: binEdges[i + 1],
            count,
            frequency: count / values.length
        }));
    }

    createCumulativeDistribution(values) {
        const sorted = [...values].sort((a, b) => a - b);
        return sorted.map((value, index) => ({
            value,
            cumulativeProbability: (index + 1) / sorted.length
        }));
    }

    classifyPortfolioPerformance(successProbability, sharpeRatio) {
        if (successProbability >= 0.8 && sharpeRatio >= 1.0) return 'Excellent';
        if (successProbability >= 0.7 && sharpeRatio >= 0.8) return 'Good';
        if (successProbability >= 0.6 && sharpeRatio >= 0.6) return 'Acceptable';
        if (successProbability >= 0.5) return 'Marginal';
        return 'Poor';
    }

    classifyRiskLevel(volatility, maxDrawdown) {
        if (volatility > 0.25 || maxDrawdown > 0.30) return 'High';
        if (volatility > 0.15 || maxDrawdown > 0.20) return 'Moderate';
        return 'Low';
    }

    calculateConfidenceLevel(statisticalMeasures, goalAnalysis) {
        const sampleSize = statisticalMeasures.finalValues ? 10000 : 1000; // Estimate
        const convergence = Math.min(sampleSize / 10000, 1.0);
        const consistency = 1 - Math.abs(goalAnalysis.outcomes.expectedValue - goalAnalysis.outcomes.medianValue) / goalAnalysis.outcomes.expectedValue;
        return Math.min(convergence * consistency, 0.95);
    }

    generatePrimaryRecommendations(goalAnalysis, riskMetrics) {
        const recommendations = [];
        
        if (goalAnalysis.successProbability < 0.7) {
            recommendations.push('Consider increasing monthly contributions or extending timeline');
        }
        
        if (riskMetrics.riskAdjustedReturns.sharpeRatio < 0.8) {
            recommendations.push('Portfolio efficiency could be improved through optimization');
        }
        
        if (riskMetrics.drawdownMetrics.worstDrawdown > 0.25) {
            recommendations.push('Consider reducing portfolio risk to limit potential losses');
        }
        
        return recommendations;
    }

    // Additional helper methods for complex calculations...
    calculateAverageGrowthRate(monthlySnapshots) {
        if (monthlySnapshots.length < 2) return 0;
        
        const growthRates = [];
        for (let i = 1; i < monthlySnapshots.length; i++) {
            const rate = (monthlySnapshots[i].expectedValue - monthlySnapshots[i-1].expectedValue) / monthlySnapshots[i-1].expectedValue;
            growthRates.push(rate);
        }
        
        return this.calculateMean(growthRates);
    }

    calculateVolatilityTrend(monthlySnapshots) {
        const volatilities = monthlySnapshots.map(s => s.volatility);
        return volatilities.length > 1 ? this.calculateMean(volatilities.slice(-3)) - this.calculateMean(volatilities.slice(0, 3)) : 0;
    }

    analyzeConvergence(monthlySnapshots) {
        if (monthlySnapshots.length < 3) return { status: 'insufficient_data' };
        
        const recentVol = this.calculateMean(monthlySnapshots.slice(-3).map(s => s.volatility));
        const earlyVol = this.calculateMean(monthlySnapshots.slice(0, 3).map(s => s.volatility));
        
        return {
            status: recentVol < earlyVol ? 'converging' : 'diverging',
            trend: (recentVol - earlyVol) / earlyVol
        };
    }

    classifyStressSeverity(goalAchievementProbability) {
        if (goalAchievementProbability < 0.3) return 'severe';
        if (goalAchievementProbability < 0.5) return 'moderate';
        if (goalAchievementProbability < 0.7) return 'mild';
        return 'minimal';
    }

    calculateOverallRobustness(stressResults) {
        const scenarios = Object.values(stressResults);
        const avgProbability = this.calculateMean(scenarios.map(s => s.goalAchievementImpact));
        const worstCase = Math.min(...scenarios.map(s => s.goalAchievementImpact));
        
        return {
            averagePerformance: avgProbability,
            worstCasePerformance: worstCase,
            robustnessScore: (avgProbability + worstCase) / 2
        };
    }

    generateStressTestRecommendations(stressResults) {
        const recommendations = [];
        const scenarios = Object.entries(stressResults);
        
        const severeScenarios = scenarios.filter(([_, result]) => result.severity === 'severe');
        if (severeScenarios.length > 0) {
            recommendations.push(`Portfolio shows vulnerability to: ${severeScenarios.map(([name]) => name).join(', ')}`);
        }
        
        return recommendations;
    }

    findOptimalContribution(contributionSensitivity) {
        const entries = Object.entries(contributionSensitivity);
        const marginalEfficiency = [];
        
        for (let i = 1; i < entries.length; i++) {
            const [prevLevel, prevData] = entries[i-1];
            const [currLevel, currData] = entries[i];
            
            const contributionIncrease = currData.monthlyContribution - prevData.monthlyContribution;
            const probabilityIncrease = currData.goalAchievementProbability - prevData.goalAchievementProbability;
            
            marginalEfficiency.push({
                level: currLevel,
                efficiency: probabilityIncrease / contributionIncrease,
                contribution: currData.monthlyContribution,
                probability: currData.goalAchievementProbability
            });
        }
        
        // Find the point where marginal efficiency starts declining significantly
        const maxEfficiency = Math.max(...marginalEfficiency.map(e => e.efficiency));
        const optimalPoint = marginalEfficiency.find(e => e.efficiency >= maxEfficiency * 0.8);
        
        return optimalPoint || marginalEfficiency[0];
    }

    generateContributionRecommendations(contributionSensitivity, elasticity) {
        const recommendations = [];
        const optimal = this.findOptimalContribution(contributionSensitivity);
        
        if (optimal) {
            recommendations.push(`Optimal monthly contribution appears to be around $${optimal.contribution.toFixed(0)}`);
        }
        
        const highElasticity = elasticity.filter(e => e.elasticity > 2);
        if (highElasticity.length > 0) {
            recommendations.push('Small increases in contributions could significantly improve goal achievement');
        }
        
        return recommendations;
    }
}

module.exports = MonteCarloResultsProcessor;