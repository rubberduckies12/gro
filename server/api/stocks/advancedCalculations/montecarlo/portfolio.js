/**
 * Enhanced Monte Carlo Portfolio Simulation Engine for Gro App
 * 
 * Now includes advanced models:
 * - Jump Diffusion (Merton Model)
 * - Stochastic Volatility (Heston Model) 
 * - Mean Reversion (Ornstein-Uhlenbeck)
 * - Regime Switching (Markov Models)
 * - Fat Tails (Student t-distribution)
 */

const { v4: uuidv4 } = require('uuid');

class AdvancedPortfolioMonteCarloEngine {
    constructor(dbPool) {
        this.db = dbPool;
        this.defaultSimulations = 10000;
        this.tradingDaysPerYear = 252;
        this.riskFreeRate = 0.02;
        
        // Model parameters
        this.jumpParams = {
            jumpIntensity: 0.1,    // 10% probability per year
            jumpMean: -0.05,       // Average jump size -5%
            jumpVolatility: 0.15   // Jump volatility 15%
        };
        
        this.hestonParams = {
            kappa: 2.0,            // Mean reversion speed
            theta: 0.04,           // Long-term variance (20% vol)
            sigma: 0.3,            // Volatility of volatility
            rho: -0.7              // Correlation between price and vol
        };
        
        this.regimeSwitchingParams = {
            regimes: [
                { meanReturn: 0.12, volatility: 0.15, name: 'Bull Market' },
                { meanReturn: 0.08, volatility: 0.20, name: 'Normal Market' },
                { meanReturn: -0.10, volatility: 0.35, name: 'Bear Market' }
            ],
            transitionMatrix: [
                [0.85, 0.12, 0.03],  // Bull -> Bull, Normal, Bear
                [0.10, 0.80, 0.10],  // Normal -> Bull, Normal, Bear  
                [0.05, 0.25, 0.70]   // Bear -> Bull, Normal, Bear
            ]
        };
        
        this.fatTailParams = {
            degreesOfFreedom: 5    // Student t-distribution df (lower = fatter tails)
        };
    }

    /**
     * 🎯 ENHANCED MAIN SIMULATION FUNCTION
     * Now with advanced model options
     */
    async simulatePortfolioGoal(params) {
        const {
            userId,
            portfolioId,
            holdings,
            correlationMatrix,
            timeHorizonMonths,
            initialInvestment,
            monthlyContribution,
            targetAmount,
            rebalanceFrequency = 'quarterly',
            inflationRate = 0.025,
            simulations = this.defaultSimulations,
            stressTestScenarios = true,
            // NEW: Advanced model options
            modelOptions = {
                useJumpDiffusion: false,
                useStochasticVolatility: false,
                useMeanReversion: false,
                useRegimeSwitching: false,
                useFatTails: false
            }
        } = params;

        console.log(`🎲 Starting enhanced portfolio simulation with advanced models...`);
        console.log(`📊 Models enabled: ${Object.entries(modelOptions).filter(([k,v]) => v).map(([k]) => k).join(', ')}`);

        try {
            // 1. Validate inputs
            this.validateSimulationInputs(params);

            // 2. Initialize regime state if using regime switching
            let regimeState = null;
            if (modelOptions.useRegimeSwitching) {
                regimeState = this.initializeRegimeState();
            }

            // 3. Calculate rebalancing frequency
            const rebalanceDays = this.getRebalanceFrequency(rebalanceFrequency);

            // 4. Run enhanced Monte Carlo simulation
            const baseSimulationResults = await this.runAdvancedPortfolioSimulations({
                holdings,
                correlationMatrix,
                timeHorizonMonths,
                initialInvestment,
                monthlyContribution,
                targetAmount,
                rebalanceDays,
                inflationRate,
                simulations,
                modelOptions,
                regimeState
            });

            // 5. Calculate enhanced metrics
            const goalProbability = this.calculateGoalProbability(baseSimulationResults, targetAmount);
            const riskMetrics = this.calculateEnhancedRiskMetrics(baseSimulationResults, modelOptions);
            
            // 6. Model-specific analysis
            const modelAnalysis = this.analyzeAdvancedModels(baseSimulationResults, modelOptions);

            // 7. Rest of analysis (contribution sensitivity, stress tests, etc.)
            const contributionSensitivity = await this.analyzeContributionSensitivity({
                holdings, correlationMatrix, timeHorizonMonths,
                initialInvestment, monthlyContribution, targetAmount,
                rebalanceDays, inflationRate, modelOptions
            });

            let stressTestResults = null;
            if (stressTestScenarios) {
                stressTestResults = await this.stressTestAdvancedScenarios({
                    holdings, correlationMatrix, timeHorizonMonths,
                    initialInvestment, monthlyContribution, targetAmount,
                    rebalanceDays, inflationRate, modelOptions
                });
            }

            const timeToGoal = this.calculateTimeToGoal(baseSimulationResults, targetAmount);

            // 8. Save enhanced results
            const simulationId = await this.saveEnhancedSimulationResults({
                userId, portfolioId, baseSimulationResults, goalProbability,
                riskMetrics, contributionSensitivity, stressTestResults,
                timeToGoal, modelAnalysis, parameters: params
            });

            console.log(`✅ Enhanced portfolio simulation completed. Goal probability: ${(goalProbability.successProbability * 100).toFixed(1)}%`);

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
                    var95: riskMetrics.var95,
                    tailRisk: riskMetrics.tailRisk,
                    jumpRisk: riskMetrics.jumpRisk
                },
                modelAnalysis,
                timeToGoal,
                contributionSensitivity,
                stressTestResults,
                inflationAdjustedTarget: targetAmount * Math.pow(1 + inflationRate, timeHorizonMonths / 12)
            };

        } catch (error) {
            console.error('Enhanced portfolio Monte Carlo simulation failed:', error);
            throw new Error(`Simulation failed: ${error.message}`);
        }
    }

    /**
     * 🚀 ADVANCED PORTFOLIO SIMULATIONS
     * Enhanced simulation runner with advanced models
     */
    async runAdvancedPortfolioSimulations(params) {
        const {
            holdings, correlationMatrix, timeHorizonMonths,
            initialInvestment, monthlyContribution, rebalanceDays,
            inflationRate, simulations, modelOptions, regimeState
        } = params;

        const totalDays = timeHorizonMonths * 30;
        const contributionFrequency = 30;
        const results = [];

        console.log(`📊 Running ${simulations} advanced portfolio simulations...`);

        for (let sim = 0; sim < simulations; sim++) {
            const portfolioPath = await this.advancedPortfolioValueEvolution({
                holdings, correlationMatrix, totalDays,
                initialInvestment, monthlyContribution, contributionFrequency,
                rebalanceDays, inflationRate, modelOptions, regimeState
            });

            results.push({
                simulation: sim,
                finalValue: portfolioPath.finalValue,
                finalRealValue: portfolioPath.finalRealValue,
                totalReturn: portfolioPath.totalReturn,
                realReturn: portfolioPath.realReturn,
                maxDrawdown: portfolioPath.maxDrawdown,
                volatility: portfolioPath.volatility,
                totalContributions: portfolioPath.totalContributions,
                path: portfolioPath.dailyValues,
                // Enhanced metrics
                jumpCount: portfolioPath.jumpCount || 0,
                regimeChanges: portfolioPath.regimeChanges || 0,
                averageVolatility: portfolioPath.averageVolatility,
                tailEvents: portfolioPath.tailEvents || 0
            });

            if (sim % 1000 === 0 && sim > 0) {
                console.log(`📈 Completed ${sim}/${simulations} advanced simulations`);
            }
        }

        return results;
    }

    /**
     * 💼 ADVANCED PORTFOLIO PATH EVOLUTION
     * Enhanced path simulation with all advanced models
     */
    async advancedPortfolioValueEvolution(params) {
        const {
            holdings, correlationMatrix, totalDays,
            initialInvestment, monthlyContribution, contributionFrequency,
            rebalanceDays, inflationRate, modelOptions
        } = params;

        let portfolioValue = initialInvestment;
        let totalContributions = initialInvestment;
        let maxValue = portfolioValue;
        let maxDrawdown = 0;
        const dailyValues = [portfolioValue];
        const dailyReturns = [];

        // Enhanced tracking
        let jumpCount = 0;
        let regimeChanges = 0;
        let tailEvents = 0;
        let currentRegime = 1; // Start in normal market
        const volatilityPath = [];

        // Initialize stochastic volatility if enabled
        let currentVolatilities = holdings.map(h => h.volatility / Math.sqrt(252));
        if (modelOptions.useStochasticVolatility) {
            currentVolatilities = holdings.map(h => Math.sqrt(this.hestonParams.theta));
        }

        // Track current weights
        let currentWeights = [...holdings];

        for (let day = 1; day <= totalDays; day++) {
            // 1. REGIME SWITCHING MODEL
            if (modelOptions.useRegimeSwitching && day % 30 === 0) { // Check monthly
                const newRegime = this.simulateRegimeSwitch(currentRegime);
                if (newRegime !== currentRegime) {
                    regimeChanges++;
                    currentRegime = newRegime;
                    console.log(`📊 Regime change on day ${day}: ${this.regimeSwitchingParams.regimes[currentRegime].name}`);
                }
            }

            // 2. STOCHASTIC VOLATILITY (HESTON MODEL)
            if (modelOptions.useStochasticVolatility) {
                currentVolatilities = this.simulateHestonVolatility(currentVolatilities, holdings.length);
            }

            // 3. Generate correlated returns with enhanced models
            const correlatedReturns = this.generateAdvancedCorrelatedReturns({
                holdings,
                correlationMatrix,
                day: day - 1,
                modelOptions,
                currentRegime,
                currentVolatilities
            });

            // 4. Calculate portfolio return
            let portfolioReturn = 0;
            let dayJumps = 0;
            let dayTailEvents = 0;

            for (let i = 0; i < currentWeights.length; i++) {
                let assetReturn = correlatedReturns.returns[i];

                // 5. JUMP DIFFUSION
                if (modelOptions.useJumpDiffusion && correlatedReturns.jumps[i]) {
                    const jumpSize = this.generateJumpSize();
                    assetReturn += jumpSize;
                    dayJumps++;
                }

                // 6. MEAN REVERSION
                if (modelOptions.useMeanReversion) {
                    assetReturn = this.applyMeanReversion(assetReturn, holdings[i].expectedReturn / 252);
                }

                // 7. Check for tail events
                if (Math.abs(assetReturn) > 3 * currentVolatilities[i]) {
                    dayTailEvents++;
                }

                portfolioReturn += currentWeights[i].weight * assetReturn;
            }

            jumpCount += dayJumps;
            tailEvents += dayTailEvents;
            volatilityPath.push(Math.sqrt(currentVolatilities.reduce((sum, v) => sum + v*v, 0) / currentVolatilities.length));

            // 8. Apply return to portfolio
            portfolioValue *= (1 + portfolioReturn);
            dailyReturns.push(portfolioReturn);

            // 9. Add monthly contribution
            if (day % contributionFrequency === 0 && day > 0) {
                portfolioValue += monthlyContribution;
                totalContributions += monthlyContribution;
            }

            // 10. Rebalance portfolio
            if (day % rebalanceDays === 0 && day > 0) {
                currentWeights = this.rebalancePortfolio(currentWeights, holdings);
            }

            // 11. Track drawdown
            if (portfolioValue > maxValue) {
                maxValue = portfolioValue;
            } else {
                const currentDrawdown = (maxValue - portfolioValue) / maxValue;
                maxDrawdown = Math.max(maxDrawdown, currentDrawdown);
            }

            dailyValues.push(portfolioValue);
        }

        // Calculate final metrics
        const totalReturn = (portfolioValue - totalContributions) / totalContributions;
        const inflationAdjustment = Math.pow(1 + inflationRate, totalDays / 365);
        const finalRealValue = portfolioValue / inflationAdjustment;
        const realReturn = (finalRealValue - totalContributions) / totalContributions;
        const volatility = this.calculateVolatility(dailyReturns);
        const averageVolatility = volatilityPath.reduce((sum, v) => sum + v, 0) / volatilityPath.length;

        return {
            finalValue: portfolioValue,
            finalRealValue,
            totalReturn,
            realReturn,
            maxDrawdown,
            volatility,
            totalContributions,
            dailyValues,
            jumpCount,
            regimeChanges,
            averageVolatility,
            tailEvents
        };
    }

    /**
     * 🔗 ADVANCED CORRELATED RETURNS GENERATION
     * Enhanced returns with all advanced models
     */
    generateAdvancedCorrelatedReturns(params) {
        const { holdings, correlationMatrix, day, modelOptions, currentRegime, currentVolatilities } = params;
        const numAssets = holdings.length;

        // Base expected returns (possibly regime-adjusted)
        let expectedReturns = holdings.map(h => h.expectedReturn / 252);
        if (modelOptions.useRegimeSwitching && currentRegime !== undefined) {
            const regimeData = this.regimeSwitchingParams.regimes[currentRegime];
            expectedReturns = expectedReturns.map(r => regimeData.meanReturn / 252);
        }

        // Volatilities (possibly stochastic)
        const volatilities = modelOptions.useStochasticVolatility ? 
            currentVolatilities : 
            holdings.map(h => h.volatility / Math.sqrt(252));

        // Build correlation matrix
        const corrMatrix = this.buildCorrelationMatrix(holdings, correlationMatrix);
        const cholesky = this.choleskyDecomposition(corrMatrix);

        // Generate base random variables
        let independentRandom;
        if (modelOptions.useFatTails) {
            independentRandom = Array(numAssets).fill().map(() => this.randomStudentT(this.fatTailParams.degreesOfFreedom));
        } else {
            independentRandom = Array(numAssets).fill().map(() => this.randomNormal());
        }

        // Apply Cholesky transformation
        const correlatedRandom = Array(numAssets).fill(0);
        for (let i = 0; i < numAssets; i++) {
            for (let j = 0; j <= i; j++) {
                correlatedRandom[i] += cholesky[i][j] * independentRandom[j];
            }
        }

        // Generate returns
        const returns = [];
        const jumps = [];

        for (let i = 0; i < numAssets; i++) {
            const return_ = expectedReturns[i] + volatilities[i] * correlatedRandom[i];
            returns.push(return_);

            // Check for jumps
            const jumpOccurred = modelOptions.useJumpDiffusion && 
                Math.random() < (this.jumpParams.jumpIntensity / 252);
            jumps.push(jumpOccurred);
        }

        return { returns, jumps };
    }

    /**
     * 🌊 HESTON STOCHASTIC VOLATILITY MODEL
     * Simulates volatility using Heston model
     */
    simulateHestonVolatility(currentVolatilities, numAssets) {
        const dt = 1 / 252; // Daily time step
        const { kappa, theta, sigma, rho } = this.hestonParams;

        return currentVolatilities.map(vol => {
            const currentVariance = vol * vol;
            
            // Correlated Brownian motions
            const z1 = this.randomNormal();
            const z2 = rho * z1 + Math.sqrt(1 - rho * rho) * this.randomNormal();

            // Heston variance process with Feller condition
            const dv = kappa * (theta - currentVariance) * dt + sigma * Math.sqrt(Math.max(currentVariance, 0)) * Math.sqrt(dt) * z2;
            const newVariance = Math.max(currentVariance + dv, 0.0001); // Floor at 1% vol
            
            return Math.sqrt(newVariance);
        });
    }

    /**
     * 🦘 JUMP DIFFUSION MODEL
     * Generates jump sizes using Merton model
     */
    generateJumpSize() {
        const { jumpMean, jumpVolatility } = this.jumpParams;
        return jumpMean + jumpVolatility * this.randomNormal();
    }

    /**
     * ⚖️ MEAN REVERSION MODEL
     * Applies Ornstein-Uhlenbeck mean reversion
     */
    applyMeanReversion(currentReturn, longTermMean, meanReversionSpeed = 0.5) {
        const dt = 1 / 252;
        const adjustment = meanReversionSpeed * (longTermMean - currentReturn) * dt;
        return currentReturn + adjustment;
    }

    /**
     * 🔄 REGIME SWITCHING MODEL
     * Simulates regime changes using Markov chain
     */
    simulateRegimeSwitch(currentRegime) {
        const transitionProbs = this.regimeSwitchingParams.transitionMatrix[currentRegime];
        const random = Math.random();
        
        let cumulativeProb = 0;
        for (let i = 0; i < transitionProbs.length; i++) {
            cumulativeProb += transitionProbs[i];
            if (random < cumulativeProb) {
                return i;
            }
        }
        
        return currentRegime; // Fallback
    }

    /**
     * 📊 STUDENT T-DISTRIBUTION RANDOM GENERATOR
     * Generates fat-tailed random variables
     */
    randomStudentT(degreesOfFreedom) {
        if (degreesOfFreedom <= 2) {
            throw new Error('Degrees of freedom must be > 2');
        }
        
        // Use Box-Muller + Gamma for Student t
        const normal = this.randomNormal();
        const chi2 = this.randomGamma(degreesOfFreedom / 2, 2);
        
        return normal / Math.sqrt(chi2 / degreesOfFreedom);
    }

    /**
     * 🎲 GAMMA DISTRIBUTION RANDOM GENERATOR
     * Helper for Student t-distribution
     */
    randomGamma(shape, scale) {
        // Marsaglia and Tsang method for Gamma distribution
        if (shape < 1) {
            return this.randomGamma(1 + shape, scale) * Math.pow(Math.random(), 1 / shape);
        }
        
        const d = shape - 1/3;
        const c = 1 / Math.sqrt(9 * d);
        
        while (true) {
            let x, v;
            do {
                x = this.randomNormal();
                v = 1 + c * x;
            } while (v <= 0);
            
            v = v * v * v;
            const u = Math.random();
            
            if (u < 1 - 0.0331 * x * x * x * x) {
                return d * v * scale;
            }
            
            if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) {
                return d * v * scale;
            }
        }
    }

    /**
     * 📈 ENHANCED RISK METRICS CALCULATION
     * Includes metrics for advanced models
     */
    calculateEnhancedRiskMetrics(simulationResults, modelOptions) {
        const baseMetrics = this.portfolioRiskMetrics(simulationResults);
        
        const enhancedMetrics = {
            ...baseMetrics,
            jumpRisk: null,
            regimeRisk: null,
            tailRisk: null,
            volatilityRisk: null
        };

        if (modelOptions.useJumpDiffusion) {
            const jumpCounts = simulationResults.map(r => r.jumpCount);
            enhancedMetrics.jumpRisk = {
                averageJumps: this.calculateMean(jumpCounts),
                maxJumps: Math.max(...jumpCounts),
                jumpProbability: jumpCounts.filter(c => c > 0).length / jumpCounts.length
            };
        }

        if (modelOptions.useRegimeSwitching) {
            const regimeChanges = simulationResults.map(r => r.regimeChanges);
            enhancedMetrics.regimeRisk = {
                averageChanges: this.calculateMean(regimeChanges),
                maxChanges: Math.max(...regimeChanges)
            };
        }

        if (modelOptions.useFatTails) {
            const returns = simulationResults.map(r => r.totalReturn);
            const tailEvents = simulationResults.map(r => r.tailEvents);
            enhancedMetrics.tailRisk = {
                extremeEventProbability: tailEvents.filter(t => t > 0).length / tailEvents.length,
                averageTailEvents: this.calculateMean(tailEvents),
                tailExponent: this.estimateTailExponent(returns)
            };
        }

        if (modelOptions.useStochasticVolatility) {
            const avgVols = simulationResults.map(r => r.averageVolatility);
            enhancedMetrics.volatilityRisk = {
                averageVolatility: this.calculateMean(avgVols),
                volatilityVolatility: this.calculateStandardDeviation(avgVols)
            };
        }

        return enhancedMetrics;
    }

    /**
     * 🧪 ADVANCED MODEL ANALYSIS
     * Analyze the impact of advanced models
     */
    analyzeAdvancedModels(simulationResults, modelOptions) {
        const analysis = {};

        if (modelOptions.useJumpDiffusion) {
            analysis.jumpAnalysis = {
                description: 'Jump diffusion captures sudden market shocks',
                impact: 'Increases tail risk and reduces predictability',
                recommendation: 'Consider protective strategies during volatile periods'
            };
        }

        if (modelOptions.useStochasticVolatility) {
            analysis.stochasticVolAnalysis = {
                description: 'Volatility clustering and mean reversion effects',
                impact: 'More realistic volatility patterns and risk estimates',
                recommendation: 'Monitor volatility regime for rebalancing timing'
            };
        }

        if (modelOptions.useMeanReversion) {
            analysis.meanReversionAnalysis = {
                description: 'Assets tend to revert to long-term trends',
                impact: 'Reduces extreme scenarios over long horizons',
                recommendation: 'Benefits long-term buy-and-hold strategies'
            };
        }

        if (modelOptions.useRegimeSwitching) {
            analysis.regimeSwitchingAnalysis = {
                description: 'Markets alternate between bull, normal, and bear phases',
                impact: 'Creates clustering of good and bad periods',
                recommendation: 'Diversification becomes more critical'
            };
        }

        if (modelOptions.useFatTails) {
            analysis.fatTailsAnalysis = {
                description: 'Higher probability of extreme events than normal distribution',
                impact: 'Increases risk estimates, especially for shorter horizons',
                recommendation: 'Maintain larger cash buffers and stress test regularly'
            };
        }

        return analysis;
    }

    // ===========================================
    // ENHANCED UTILITY FUNCTIONS
    // ===========================================

    initializeRegimeState() {
        return 1; // Start in normal market regime
    }

    estimateTailExponent(returns) {
        // Simple Hill estimator for tail exponent
        const sortedReturns = [...returns].sort((a, b) => Math.abs(b) - Math.abs(a));
        const k = Math.floor(returns.length * 0.05); // Top 5%
        
        if (k < 2) return 3; // Default
        
        const logReturns = sortedReturns.slice(0, k).map(r => Math.log(Math.abs(r)));
        const meanLogReturn = logReturns.reduce((sum, lr) => sum + lr, 0) / logReturns.length;
        
        return 1 / meanLogReturn;
    }

    async stressTestAdvancedScenarios(params) {
        // Enhanced stress tests that consider advanced models
        const stressScenarios = [
            { 
                name: '2008 Financial Crisis + Jumps', 
                returnShock: -0.37, 
                volatilityMultiplier: 2.0,
                modelOverrides: { useJumpDiffusion: true, useFatTails: true }
            },
            { 
                name: 'Flash Crash Scenario', 
                returnShock: -0.15, 
                volatilityMultiplier: 4.0,
                modelOverrides: { useJumpDiffusion: true, jumpIntensity: 0.5 }
            },
            { 
                name: 'Prolonged Bear Market', 
                returnShock: -0.20, 
                volatilityMultiplier: 1.5,
                modelOverrides: { useRegimeSwitching: true, forceRegime: 2 }
            }
        ];

        const stressResults = {};

        for (const scenario of stressScenarios) {
            console.log(`🧪 Running advanced stress test: ${scenario.name}`);
            
            const enhancedParams = {
                ...params,
                modelOptions: { ...params.modelOptions, ...scenario.modelOverrides }
            };

            // Modify holdings for stress scenario  
            const stressedHoldings = params.holdings.map(holding => ({
                ...holding,
                expectedReturn: holding.expectedReturn + scenario.returnShock,
                volatility: holding.volatility * scenario.volatilityMultiplier
            }));

            const stressSimResults = await this.runAdvancedPortfolioSimulations({
                ...enhancedParams,
                holdings: stressedHoldings,
                simulations: 1000
            });

            const stressGoalProb = this.calculateGoalProbability(stressSimResults, params.targetAmount);
            const stressRiskMetrics = this.calculateEnhancedRiskMetrics(stressSimResults, enhancedParams.modelOptions);

            stressResults[scenario.name] = {
                goalAchievementProbability: stressGoalProb.successProbability,
                expectedReturn: stressRiskMetrics.expectedReturn,
                maxDrawdown: stressRiskMetrics.maxDrawdown.expected,
                var95: stressRiskMetrics.var95,
                jumpRisk: stressRiskMetrics.jumpRisk,
                tailRisk: stressRiskMetrics.tailRisk,
                medianOutcome: stressGoalProb.outcomes.median
            };
        }

        return stressResults;
    }

    async saveEnhancedSimulationResults(data) {
        // Enhanced save function that stores advanced model results
        const simulationId = await this.saveSimulationResults(data);
        
        // Additional storage for advanced model metrics could go here
        // e.g., separate table for jump statistics, regime histories, etc.
        
        return simulationId;
    }

    // Inherit all existing utility functions
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
                return correlationMatrix[symbol1]?.[symbol2] || 0.3;
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

    // Include all other existing methods...
    calculateGoalProbability(simulationResults, targetAmount) {
        const finalValues = simulationResults.map(r => r.finalRealValue);
        const successfulSims = finalValues.filter(v => v >= targetAmount).length;
        const successProbability = successfulSims / simulationResults.length;

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

    portfolioRiskMetrics(simulationResults) {
        const returns = simulationResults.map(r => r.realReturn);
        const maxDrawdowns = simulationResults.map(r => r.maxDrawdown);

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
        const mean = this.calculateMean(returns);
        const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
        const std = Math.sqrt(variance);
        
        if (std === 0) return 0;
        
        return returns.reduce((sum, r) => sum + Math.pow((r - mean) / std, 3), 0) / returns.length;
    }

    calculateKurtosis(returns) {
        const mean = this.calculateMean(returns);
        const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
        const std = Math.sqrt(variance);
        
        if (std === 0) return 0;
        
        const kurtosis = returns.reduce((sum, r) => sum + Math.pow((r - mean) / std, 4), 0) / returns.length;
        return kurtosis - 3;
    }

    rebalancePortfolio(currentWeights, targetWeights) {
        return targetWeights.map(target => ({
            symbol: target.symbol,
            weight: target.weight,
            expectedReturn: target.expectedReturn,
            volatility: target.volatility
        }));
    }

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
                    timesToGoal.push(i / 30);
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

    async analyzeContributionSensitivity(params) {
        const { monthlyContribution } = params;
        const contributionVariations = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
        const sensitivity = {};

        for (const multiplier of contributionVariations) {
            const adjustedContribution = monthlyContribution * multiplier;
            
            const simResults = await this.runAdvancedPortfolioSimulations({
                ...params,
                monthlyContribution: adjustedContribution,
                simulations: 2000
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

    inflationAdjustedReturns(nominalReturns, inflationRate, timeHorizonYears) {
        return nominalReturns.map(nominalReturn => {
            const realReturn = (1 + nominalReturn) / Math.pow(1 + inflationRate, timeHorizonYears) - 1;
            return realReturn;
        });
    }

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
                'PORTFOLIO',
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

            console.log(`💾 Saved enhanced simulation results with ID: ${simulationId}`);
            return simulationId;

        } catch (error) {
            console.error('Error saving enhanced simulation results:', error);
            throw error;
        }
    }
}

module.exports = AdvancedPortfolioMonteCarloEngine;