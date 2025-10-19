/**
 * Enhanced Individual Stock Monte Carlo Simulation Engine for Gro App
 * 
 * Now includes advanced models consistent with portfolio.js:
 * - Jump Diffusion (Merton Model)
 * - Stochastic Volatility (Heston Model) 
 * - Mean Reversion (Ornstein-Uhlenbeck)
 * - Regime Switching (Markov Models)
 * - Fat Tails (Student t-distribution)
 */

const { v4: uuidv4 } = require('uuid');

class EnhancedStockMonteCarloEngine {
    constructor(dbPool) {
        this.db = dbPool;
        this.defaultSimulations = 10000;
        this.tradingDaysPerYear = 252;
        this.riskFreeRate = 0.02;
        
        // Advanced model parameters (consistent with portfolio.js)
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
        
        this.meanReversionParams = {
            speed: 0.5,            // Mean reversion speed
            longTermMean: 0.10     // Long-term expected return
        };
    }

    /**
     * 🎯 ENHANCED MAIN STOCK SIMULATION FUNCTION
     * Now with advanced model options consistent with portfolio.js
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
            dividendYield = 0,  // Annual dividend yield
            // NEW: Advanced model options (consistent with portfolio.js)
            modelOptions = {
                useJumpDiffusion: false,
                useStochasticVolatility: false,
                useMeanReversion: false,
                useRegimeSwitching: false,
                useFatTails: false
            }
        } = params;

        console.log(`🎲 Starting enhanced Monte Carlo simulation for ${symbol} over ${timeHorizonDays} days...`);
        console.log(`📊 Models enabled: ${Object.entries(modelOptions).filter(([k,v]) => v).map(([k]) => k).join(', ')}`);

        try {
            // 1. Validate inputs
            this.validateSimulationInputs(params);

            // 2. Get current stock data if not provided
            const stockData = await this.getStockData(symbol, initialPrice, expectedReturn, volatility);

            // 3. Initialize regime state if using regime switching
            let regimeState = null;
            if (modelOptions.useRegimeSwitching) {
                regimeState = this.initializeRegimeState();
            }

            // 4. Convert annual parameters to daily
            const dailyDrift = this.calculateDailyDrift(stockData.expectedReturn, stockData.volatility);
            const dailyVolatility = stockData.volatility / Math.sqrt(this.tradingDaysPerYear);

            // 5. Run enhanced Monte Carlo simulation
            const simulationResults = await this.runEnhancedStockSimulation({
                symbol,
                initialPrice: stockData.currentPrice,
                dailyDrift,
                dailyVolatility,
                expectedReturn: stockData.expectedReturn,
                timeHorizonDays,
                simulations,
                dividendYield,
                modelOptions,
                regimeState
            });

            // 6. Calculate enhanced statistics
            const statistics = this.calculateEnhancedSimulationStatistics(simulationResults, stockData.currentPrice);

            // 7. Analyze price probabilities
            const probabilityAnalysis = this.analyzePriceProbabilities(simulationResults, stockData.currentPrice);

            // 8. Calculate enhanced risk metrics
            const riskMetrics = this.calculateEnhancedStockRiskMetrics(simulationResults, modelOptions);

            // 9. Model-specific analysis
            const modelAnalysis = this.analyzeAdvancedModels(simulationResults, modelOptions);

            // 10. Save enhanced simulation results
            const simulationId = await this.saveEnhancedStockSimulation({
                userId,
                portfolioId,
                symbol,
                simulationResults,
                statistics,
                probabilityAnalysis,
                riskMetrics,
                modelAnalysis,
                parameters: params
            });

            console.log(`✅ Enhanced stock simulation completed for ${symbol}`);

            return {
                simulationId,
                symbol,
                statistics,
                probabilityAnalysis,
                riskMetrics: {
                    ...riskMetrics,
                    jumpRisk: riskMetrics.jumpRisk,
                    regimeRisk: riskMetrics.regimeRisk,
                    tailRisk: riskMetrics.tailRisk,
                    volatilityRisk: riskMetrics.volatilityRisk
                },
                modelAnalysis,
                scenarioCount: simulations,
                timeHorizon: timeHorizonDays
            };

        } catch (error) {
            console.error(`Enhanced stock Monte Carlo simulation failed for ${symbol}:`, error);
            throw new Error(`Simulation failed: ${error.message}`);
        }
    }

    /**
     * 📈 ENHANCED STOCK SIMULATION RUNNER
     * Core simulation engine with advanced models
     */
    async runEnhancedStockSimulation(params) {
        const {
            symbol, initialPrice, dailyDrift, dailyVolatility,
            expectedReturn, timeHorizonDays, simulations,
            dividendYield, modelOptions, regimeState
        } = params;

        const results = [];

        console.log(`📊 Running ${simulations} enhanced price path simulations...`);

        for (let sim = 0; sim < simulations; sim++) {
            const pricePath = this.generateEnhancedPricePath({
                initialPrice,
                dailyDrift,
                dailyVolatility,
                expectedReturn,
                timeHorizonDays,
                dividendYield,
                modelOptions,
                regimeState
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
                // Enhanced metrics
                jumpCount: pricePath.jumpCount || 0,
                regimeChanges: pricePath.regimeChanges || 0,
                averageVolatility: pricePath.averageVolatility,
                tailEvents: pricePath.tailEvents || 0
            });

            // Progress logging
            if (sim % 1000 === 0 && sim > 0) {
                console.log(`📈 Completed ${sim}/${simulations} enhanced simulations`);
            }
        }

        return results;
    }

    /**
     * 📊 ENHANCED PRICE PATH GENERATION
     * Creates one possible price path with all advanced models
     */
    generateEnhancedPricePath(params) {
        const {
            initialPrice, dailyDrift, dailyVolatility, expectedReturn,
            timeHorizonDays, dividendYield = 0, modelOptions
        } = params;

        let currentPrice = initialPrice;
        let maxPrice = initialPrice;
        let minPrice = initialPrice;
        let maxDrawdown = 0;
        let jumpCount = 0;
        let regimeChanges = 0;
        let tailEvents = 0;
        let currentRegime = 1; // Start in normal market

        const dailyPrices = [initialPrice];
        const dailyReturns = [];
        const volatilityPath = [];

        // Initialize stochastic volatility if enabled
        let currentVolatility = dailyVolatility;
        if (modelOptions.useStochasticVolatility) {
            currentVolatility = Math.sqrt(this.hestonParams.theta);
        }

        // Dividend adjustment (continuous dividend yield)
        let adjustedDrift = dailyDrift - (dividendYield / this.tradingDaysPerYear);

        for (let day = 1; day <= timeHorizonDays; day++) {
            // 1. REGIME SWITCHING MODEL
            if (modelOptions.useRegimeSwitching && day % 30 === 0) { // Check monthly
                const newRegime = this.simulateRegimeSwitch(currentRegime);
                if (newRegime !== currentRegime) {
                    regimeChanges++;
                    currentRegime = newRegime;
                    
                    // Update drift based on new regime
                    const regimeData = this.regimeSwitchingParams.regimes[currentRegime];
                    adjustedDrift = (regimeData.meanReturn / this.tradingDaysPerYear) - (dividendYield / this.tradingDaysPerYear);
                    
                    console.log(`📊 ${day}: Regime change to ${regimeData.name}`);
                }
            }

            // 2. STOCHASTIC VOLATILITY (HESTON MODEL)
            if (modelOptions.useStochasticVolatility) {
                currentVolatility = this.simulateHestonVolatility(currentVolatility);
            } else if (modelOptions.useRegimeSwitching) {
                // Use regime-based volatility
                const regimeData = this.regimeSwitchingParams.regimes[currentRegime];
                currentVolatility = regimeData.volatility / Math.sqrt(this.tradingDaysPerYear);
            }

            volatilityPath.push(currentVolatility);

            // 3. Generate random shock
            let randomShock;
            if (modelOptions.useFatTails) {
                randomShock = this.randomStudentT(this.fatTailParams.degreesOfFreedom);
            } else {
                randomShock = this.randomNormal();
            }

            // 4. Geometric Brownian Motion calculation
            const drift = adjustedDrift - (0.5 * currentVolatility * currentVolatility);
            const diffusion = currentVolatility * randomShock;
            
            // Calculate base return
            let dailyReturn = drift + diffusion;

            // 5. JUMP DIFFUSION
            let jumpOccurred = false;
            if (modelOptions.useJumpDiffusion && Math.random() < (this.jumpParams.jumpIntensity / this.tradingDaysPerYear)) {
                const jumpSize = this.generateJumpSize();
                dailyReturn += jumpSize;
                jumpCount++;
                jumpOccurred = true;
            }

            // 6. MEAN REVERSION
            if (modelOptions.useMeanReversion) {
                dailyReturn = this.applyMeanReversion(dailyReturn, expectedReturn / this.tradingDaysPerYear);
            }

            // 7. Check for tail events
            if (Math.abs(dailyReturn) > 3 * currentVolatility) {
                tailEvents++;
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
        const averageVolatility = volatilityPath.reduce((sum, v) => sum + v, 0) / volatilityPath.length;

        return {
            finalPrice: currentPrice,
            maxPrice,
            minPrice,
            maxDrawdown,
            totalReturn,
            realizedVolatility,
            dailyPrices,
            jumpCount,
            regimeChanges,
            averageVolatility,
            tailEvents
        };
    }

    /**
     * 📊 ENHANCED SIMULATION STATISTICS
     * Enhanced statistics including advanced model metrics
     */
    calculateEnhancedSimulationStatistics(simulationResults, initialPrice) {
        const baseStats = this.calculateSimulationStatistics(simulationResults, initialPrice);
        
        // Add enhanced metrics
        const jumpCounts = simulationResults.map(r => r.jumpCount);
        const regimeChanges = simulationResults.map(r => r.regimeChanges);
        const tailEvents = simulationResults.map(r => r.tailEvents);
        const avgVolatilities = simulationResults.map(r => r.averageVolatility);

        return {
            ...baseStats,
            enhancedMetrics: {
                jumpStatistics: {
                    averageJumps: this.calculateMean(jumpCounts),
                    maxJumps: Math.max(...jumpCounts),
                    jumpProbability: jumpCounts.filter(c => c > 0).length / jumpCounts.length
                },
                regimeStatistics: {
                    averageChanges: this.calculateMean(regimeChanges),
                    maxChanges: Math.max(...regimeChanges)
                },
                tailStatistics: {
                    averageTailEvents: this.calculateMean(tailEvents),
                    maxTailEvents: Math.max(...tailEvents),
                    tailEventProbability: tailEvents.filter(t => t > 0).length / tailEvents.length
                },
                volatilityStatistics: {
                    averageVolatility: this.calculateMean(avgVolatilities),
                    volatilityOfVolatility: this.calculateStandardDeviation(avgVolatilities)
                }
            }
        };
    }

    /**
     * ⚠️ ENHANCED STOCK RISK METRICS
     * Enhanced risk statistics including advanced model metrics
     */
    calculateEnhancedStockRiskMetrics(simulationResults, modelOptions) {
        const baseMetrics = this.calculateStockRiskMetrics(simulationResults);
        
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
                jumpProbability: jumpCounts.filter(c => c > 0).length / jumpCounts.length,
                jumpImpactOnReturns: this.calculateJumpImpact(simulationResults)
            };
        }

        if (modelOptions.useRegimeSwitching) {
            const regimeChanges = simulationResults.map(r => r.regimeChanges);
            enhancedMetrics.regimeRisk = {
                averageChanges: this.calculateMean(regimeChanges),
                maxChanges: Math.max(...regimeChanges),
                regimeVolatility: this.calculateRegimeVolatility(simulationResults)
            };
        }

        if (modelOptions.useFatTails) {
            const returns = simulationResults.map(r => r.totalReturn);
            const tailEvents = simulationResults.map(r => r.tailEvents);
            enhancedMetrics.tailRisk = {
                extremeEventProbability: tailEvents.filter(t => t > 0).length / tailEvents.length,
                averageTailEvents: this.calculateMean(tailEvents),
                tailExponent: this.estimateTailExponent(returns),
                fatTailAdjustedVaR: this.calculateFatTailVaR(returns)
            };
        }

        if (modelOptions.useStochasticVolatility) {
            const avgVols = simulationResults.map(r => r.averageVolatility);
            enhancedMetrics.volatilityRisk = {
                averageVolatility: this.calculateMean(avgVols),
                volatilityVolatility: this.calculateStandardDeviation(avgVols),
                volatilityMeanReversion: this.calculateVolatilityMeanReversion(avgVols)
            };
        }

        return enhancedMetrics;
    }

    /**
     * 🧪 ADVANCED MODEL ANALYSIS (consistent with portfolio.js)
     * Analyze the impact of advanced models
     */
    analyzeAdvancedModels(simulationResults, modelOptions) {
        const analysis = {};

        if (modelOptions.useJumpDiffusion) {
            const jumpStats = simulationResults.map(r => r.jumpCount);
            analysis.jumpAnalysis = {
                description: 'Jump diffusion captures sudden price shocks and gaps',
                impact: `Average ${this.calculateMean(jumpStats).toFixed(1)} jumps per simulation`,
                recommendation: 'Consider protective strategies during high volatility periods',
                jumpFrequency: jumpStats.filter(j => j > 0).length / jumpStats.length
            };
        }

        if (modelOptions.useStochasticVolatility) {
            analysis.stochasticVolAnalysis = {
                description: 'Volatility clustering creates more realistic price patterns',
                impact: 'Improved risk estimates through time-varying volatility',
                recommendation: 'Monitor volatility regime changes for position sizing',
                volatilityPersistence: this.calculateVolatilityPersistence(simulationResults)
            };
        }

        if (modelOptions.useMeanReversion) {
            analysis.meanReversionAnalysis = {
                description: 'Price tends to revert to long-term fundamental value',
                impact: 'Reduces probability of extreme long-term scenarios',
                recommendation: 'Favors buy-and-hold strategies for fundamentally sound stocks',
                reversionStrength: this.meanReversionParams.speed
            };
        }

        if (modelOptions.useRegimeSwitching) {
            const regimeStats = simulationResults.map(r => r.regimeChanges);
            analysis.regimeSwitchingAnalysis = {
                description: 'Markets cycle through bull, normal, and bear phases',
                impact: `Average ${this.calculateMean(regimeStats).toFixed(1)} regime changes per simulation`,
                recommendation: 'Adapt strategy based on current market regime',
                regimeStability: this.calculateRegimeStability(regimeStats)
            };
        }

        if (modelOptions.useFatTails) {
            const tailStats = simulationResults.map(r => r.tailEvents);
            analysis.fatTailsAnalysis = {
                description: 'Higher probability of extreme price movements',
                impact: `${(tailStats.filter(t => t > 0).length / tailStats.length * 100).toFixed(1)}% of paths had extreme events`,
                recommendation: 'Use wider stop-losses and maintain adequate position sizing',
                tailRiskLevel: this.classifyTailRisk(tailStats)
            };
        }

        return analysis;
    }

    // ===========================================
    // ENHANCED ADVANCED MODEL FUNCTIONS (consistent with portfolio.js)
    // ===========================================

    /**
     * 🌊 HESTON STOCHASTIC VOLATILITY MODEL
     */
    simulateHestonVolatility(currentVolatility) {
        const dt = 1 / this.tradingDaysPerYear;
        const { kappa, theta, sigma, rho } = this.hestonParams;
        
        const currentVariance = currentVolatility * currentVolatility;
        
        // Correlated Brownian motions
        const z1 = this.randomNormal();
        const z2 = rho * z1 + Math.sqrt(1 - rho * rho) * this.randomNormal();

        // Heston variance process with Feller condition
        const dv = kappa * (theta - currentVariance) * dt + 
                   sigma * Math.sqrt(Math.max(currentVariance, 0)) * Math.sqrt(dt) * z2;
        const newVariance = Math.max(currentVariance + dv, 0.0001); // Floor at 1% vol
        
        return Math.sqrt(newVariance);
    }

    /**
     * 🦘 JUMP DIFFUSION MODEL
     */
    generateJumpSize() {
        const { jumpMean, jumpVolatility } = this.jumpParams;
        return jumpMean + jumpVolatility * this.randomNormal();
    }

    /**
     * ⚖️ MEAN REVERSION MODEL
     */
    applyMeanReversion(currentReturn, longTermMean) {
        const dt = 1 / this.tradingDaysPerYear;
        const { speed } = this.meanReversionParams;
        const adjustment = speed * (longTermMean - currentReturn) * dt;
        return currentReturn + adjustment;
    }

    /**
     * 🔄 REGIME SWITCHING MODEL
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

    // ===========================================
    // ENHANCED ANALYSIS FUNCTIONS
    // ===========================================

    calculateJumpImpact(simulationResults) {
        const jumpSims = simulationResults.filter(r => r.jumpCount > 0);
        const noJumpSims = simulationResults.filter(r => r.jumpCount === 0);
        
        if (jumpSims.length === 0 || noJumpSims.length === 0) return 0;
        
        const jumpAvgReturn = this.calculateMean(jumpSims.map(r => r.totalReturn));
        const noJumpAvgReturn = this.calculateMean(noJumpSims.map(r => r.totalReturn));
        
        return jumpAvgReturn - noJumpAvgReturn;
    }

    calculateRegimeVolatility(simulationResults) {
        const regimeChangeSims = simulationResults.filter(r => r.regimeChanges > 0);
        if (regimeChangeSims.length === 0) return 0;
        
        const volatilities = regimeChangeSims.map(r => r.volatility);
        return this.calculateMean(volatilities);
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

    calculateFatTailVaR(returns, alpha = 0.05) {
        const sortedReturns = [...returns].sort((a, b) => a - b);
        return this.getPercentile(sortedReturns, alpha * 100);
    }

    calculateVolatilityMeanReversion(avgVols) {
        if (avgVols.length < 10) return 0;
        
        const longTermVol = this.calculateMean(avgVols);
        let reversionStrength = 0;
        
        for (let i = 1; i < avgVols.length; i++) {
            const deviation = avgVols[i-1] - longTermVol;
            const change = avgVols[i] - avgVols[i-1];
            if (deviation !== 0) {
                reversionStrength += -change / deviation;
            }
        }
        
        return reversionStrength / (avgVols.length - 1);
    }

    calculateVolatilityPersistence(simulationResults) {
        const volatilities = simulationResults.map(r => r.averageVolatility);
        if (volatilities.length < 2) return 0;
        
        let persistence = 0;
        for (let i = 1; i < volatilities.length; i++) {
            persistence += Math.abs(volatilities[i] - volatilities[i-1]);
        }
        
        return 1 - (persistence / (volatilities.length - 1));
    }

    calculateRegimeStability(regimeStats) {
        const stablePaths = regimeStats.filter(r => r <= 2).length;
        return stablePaths / regimeStats.length;
    }

    classifyTailRisk(tailStats) {
        const avgTailEvents = this.calculateMean(tailStats);
        if (avgTailEvents > 10) return 'High';
        if (avgTailEvents > 5) return 'Medium';
        if (avgTailEvents > 2) return 'Low';
        return 'Minimal';
    }

    initializeRegimeState() {
        return 1; // Start in normal market regime
    }

    /**
     * 💾 ENHANCED SAVE STOCK SIMULATION
     */
    async saveEnhancedStockSimulation(data) {
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
                data.parameters.expectedReturn || 0.10,
                data.parameters.volatility || 0.20,
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

            console.log(`💾 Saved enhanced stock simulation results for ${data.symbol} with ID: ${simulationId}`);
            return simulationId;

        } catch (error) {
            console.error('Error saving enhanced stock simulation results:', error);
            throw error;
        }
    }

    // ===========================================
    // EXISTING UTILITY FUNCTIONS (unchanged)
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
        return (annualReturn - 0.5 * annualVolatility * annualVolatility) / this.tradingDaysPerYear;
    }

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

    analyzePriceProbabilities(simulationResults, initialPrice) {
        const finalPrices = simulationResults.map(r => r.finalPrice);
        const totalSimulations = finalPrices.length;

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

        const lossCount = finalPrices.filter(price => price < initialPrice).length;
        probabilities['any_loss'] = lossCount / totalSimulations;

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

    async getStockData(symbol, providedPrice, providedReturn, providedVolatility) {
        try {
            let currentPrice = providedPrice;
            if (!currentPrice) {
                const priceQuery = `SELECT price FROM stock_quotes WHERE symbol = $1`;
                const priceResult = await this.db.query(priceQuery, [symbol]);
                currentPrice = priceResult.rows[0]?.price || 100;
            }

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
                    expectedReturn = expectedReturn || 0.10;
                    volatility = volatility || 0.20;
                }
            }

            return { currentPrice, expectedReturn, volatility };

        } catch (error) {
            console.error(`Error getting stock data for ${symbol}:`, error);
            return {
                currentPrice: providedPrice || 100,
                expectedReturn: providedReturn || 0.10,
                volatility: providedVolatility || 0.20
            };
        }
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
        return kurtosis - 3;
    }
}

module.exports = EnhancedStockMonteCarloEngine;