/**
 * Monte Carlo Goal Simulation Service for Gro Investment App
 * 
 * This service performs lightweight Monte Carlo simulations to test the feasibility
 * of user investment goals before proceeding to full portfolio construction.
 */

const crypto = require('crypto');

class MonteCarloGoalSimulation {
    constructor() {
        this.defaultSimulations = 5000;
        this.tradingDaysPerYear = 252;
        this.monthsPerYear = 12;
        
        // Performance tracking
        this.performanceMetrics = {
            simulationsRun: 0,
            averageExecutionTime: 0,
            lastExecutionTime: 0
        };

        // Predefined crisis scenarios for stress testing
        this.crisisScenarios = {
            crisis2008: {
                name: 'Financial Crisis 2008',
                duration: 18, // months
                marketDrop: -0.37, // 37% drop
                recoveryMonths: 22,
                volatilityMultiplier: 2.5
            },
            covidCrash: {
                name: 'COVID-19 Crash 2020',
                duration: 2, // months
                marketDrop: -0.34, // 34% drop
                recoveryMonths: 6,
                volatilityMultiplier: 3.0
            },
            dotComBubble: {
                name: 'Dot-com Bubble 2000',
                duration: 30, // months
                marketDrop: -0.49, // 49% drop
                recoveryMonths: 36,
                volatilityMultiplier: 2.0
            },
            greatDepression: {
                name: 'Great Depression Scenario',
                duration: 36, // months
                marketDrop: -0.85, // 85% drop
                recoveryMonths: 120,
                volatilityMultiplier: 4.0
            }
        };
    }

    /**
     * 🎯 MAIN GOAL SIMULATION FUNCTION
     * Primary entry point for goal feasibility analysis
     */
    async simulateGoalAchievement(goalParams, marketParams = {}) {
        const startTime = Date.now();
        
        try {
            console.log('🎲 Starting Monte Carlo goal simulation...');

            // Validate input parameters
            const validatedGoalParams = this.validateGoalParameters(goalParams);
            const validatedMarketParams = this.validateMarketParameters(marketParams);

            // Calculate required return for baseline comparison
            const requiredReturn = this.calculateRequiredReturn(validatedGoalParams);

            // Run main Monte Carlo simulation
            const mainSimulationResults = await this.runMonteCarloSimulation(
                validatedGoalParams,
                validatedMarketParams,
                this.defaultSimulations
            );

            // Test various market scenarios
            const scenarioResults = await this.testMarketScenarios(
                validatedGoalParams,
                validatedMarketParams
            );

            // Run stress tests
            const stressTestResults = await this.runStressTests(
                validatedGoalParams,
                validatedMarketParams
            );

            // Calculate confidence metrics
            const confidenceMetrics = this.calculateConfidenceMetrics(
                mainSimulationResults,
                requiredReturn,
                validatedMarketParams
            );

            // Determine overall feasibility
            const feasibilityAssessment = this.assessGoalFeasibility(
                mainSimulationResults,
                scenarioResults,
                stressTestResults,
                confidenceMetrics
            );

            // Performance tracking
            const executionTime = Date.now() - startTime;
            this.updatePerformanceMetrics(executionTime);

            console.log(`✅ Goal simulation completed in ${executionTime}ms`);
            console.log(`📊 Success probability: ${(feasibilityAssessment.successProbability * 100).toFixed(1)}%`);

            return {
                isGoalFeasible: feasibilityAssessment.isGoalFeasible,
                successProbability: feasibilityAssessment.successProbability,
                requiredAnnualReturn: requiredReturn,
                confidenceLevel: feasibilityAssessment.confidenceLevel,
                scenarioResults: scenarioResults,
                stressTestResults: stressTestResults,
                simulationMetrics: {
                    simulationsRun: this.defaultSimulations,
                    executionTimeMs: executionTime,
                    averagePathValue: mainSimulationResults.averageFinalValue,
                    volatilityObserved: mainSimulationResults.observedVolatility
                },
                recommendations: this.generateRecommendations(
                    feasibilityAssessment,
                    validatedGoalParams,
                    requiredReturn
                ),
                metadata: {
                    simulationDate: new Date(),
                    goalParams: validatedGoalParams,
                    marketParams: validatedMarketParams
                }
            };

        } catch (error) {
            console.error('❌ Monte Carlo simulation failed:', error);
            throw new Error(`Goal simulation failed: ${error.message}`);
        }
    }

    /**
     * 🎲 RUN MONTE CARLO SIMULATION
     * Core simulation engine using geometric Brownian motion
     */
    async runMonteCarloSimulation(goalParams, marketParams, numSimulations) {
        const {
            targetAmount,
            timelineMonths,
            monthlyContribution,
            initialInvestment,
            inflationRate
        } = goalParams;

        const {
            expectedReturn,
            volatility,
            riskFreeRate
        } = marketParams;

        const results = [];
        const monthlyReturn = expectedReturn / this.monthsPerYear;
        const monthlyVolatility = volatility / Math.sqrt(this.monthsPerYear);
        const monthlyInflation = inflationRate / this.monthsPerYear;

        // Pre-calculate contribution schedule for efficiency
        const contributionSchedule = this.modelContributionSchedule(
            monthlyContribution,
            timelineMonths,
            inflationRate
        );

        for (let sim = 0; sim < numSimulations; sim++) {
            const simulationResult = this.runSingleSimulation(
                initialInvestment,
                targetAmount,
                timelineMonths,
                monthlyReturn,
                monthlyVolatility,
                contributionSchedule,
                monthlyInflation
            );

            results.push(simulationResult);
        }

        return this.analyzeSimulationResults(results, targetAmount);
    }

    /**
     * 📈 RUN SINGLE SIMULATION
     * Individual simulation path using geometric Brownian motion
     */
    runSingleSimulation(initialValue, targetAmount, timelineMonths, monthlyReturn, monthlyVolatility, contributionSchedule, monthlyInflation) {
        let portfolioValue = initialValue;
        let totalContributions = initialValue;
        let maxDrawdown = 0;
        let peak = portfolioValue;
        const monthlyValues = [portfolioValue];
        const monthlyReturns = [];

        for (let month = 1; month <= timelineMonths; month++) {
            // Add monthly contribution (inflation-adjusted)
            const contribution = contributionSchedule[month - 1];
            portfolioValue += contribution;
            totalContributions += contribution;

            // Generate random return using geometric Brownian motion
            const randomShock = this.generateNormalRandom();
            const monthlyReturnRealized = monthlyReturn + (monthlyVolatility * randomShock);
            monthlyReturns.push(monthlyReturnRealized);

            // Apply return to portfolio
            portfolioValue *= (1 + monthlyReturnRealized);

            // Adjust for inflation impact on purchasing power
            const realValue = portfolioValue / Math.pow(1 + monthlyInflation, month);

            // Track drawdown
            if (portfolioValue > peak) {
                peak = portfolioValue;
            } else {
                const currentDrawdown = (peak - portfolioValue) / peak;
                maxDrawdown = Math.max(maxDrawdown, currentDrawdown);
            }

            monthlyValues.push(portfolioValue);
        }

        // Calculate final metrics
        const finalRealValue = portfolioValue / Math.pow(1 + monthlyInflation, timelineMonths);
        const totalReturn = (portfolioValue - totalContributions) / totalContributions;
        const annualizedReturn = Math.pow(portfolioValue / initialValue, 1 / (timelineMonths / 12)) - 1;
        const goalAchieved = finalRealValue >= targetAmount;

        return {
            finalNominalValue: portfolioValue,
            finalRealValue: finalRealValue,
            totalContributions: totalContributions,
            totalReturn: totalReturn,
            annualizedReturn: annualizedReturn,
            maxDrawdown: maxDrawdown,
            goalAchieved: goalAchieved,
            shortfall: goalAchieved ? 0 : targetAmount - finalRealValue,
            monthlyValues: monthlyValues,
            monthlyReturns: monthlyReturns,
            volatilityRealized: this.calculateStandardDeviation(monthlyReturns) * Math.sqrt(12)
        };
    }

    /**
     * 📊 MODEL CONTRIBUTION SCHEDULE
     * Creates inflation-adjusted contribution schedule
     */
    modelContributionSchedule(monthlyAmount, timelineMonths, inflationRate) {
        const monthlyInflation = inflationRate / this.monthsPerYear;
        const schedule = [];

        for (let month = 0; month < timelineMonths; month++) {
            // Contributions increase with inflation to maintain real purchasing power
            const inflationAdjustedContribution = monthlyAmount * Math.pow(1 + monthlyInflation, month);
            schedule.push(inflationAdjustedContribution);
        }

        return schedule;
    }

    /**
     * 🎯 TEST MARKET SCENARIOS
     * Tests goal against various market conditions
     */
    async testMarketScenarios(goalParams, baseMarketParams) {
        const scenarios = {
            optimistic: {
                name: 'Bull Market',
                expectedReturn: baseMarketParams.expectedReturn * 1.5,
                volatility: baseMarketParams.volatility * 0.8,
                probability: 0.15
            },
            expected: {
                name: 'Normal Market',
                expectedReturn: baseMarketParams.expectedReturn,
                volatility: baseMarketParams.volatility,
                probability: 0.60
            },
            pessimistic: {
                name: 'Bear Market',
                expectedReturn: baseMarketParams.expectedReturn * 0.3,
                volatility: baseMarketParams.volatility * 1.4,
                probability: 0.20
            },
            stagnant: {
                name: 'Stagnant Market',
                expectedReturn: baseMarketParams.riskFreeRate,
                volatility: baseMarketParams.volatility * 0.6,
                probability: 0.05
            }
        };

        const scenarioResults = {};

        for (const [scenarioName, scenarioParams] of Object.entries(scenarios)) {
            const marketParams = {
                ...baseMarketParams,
                expectedReturn: scenarioParams.expectedReturn,
                volatility: scenarioParams.volatility
            };

            const results = await this.runMonteCarloSimulation(
                goalParams,
                marketParams,
                1000 // Fewer simulations for scenario testing
            );

            scenarioResults[scenarioName] = {
                finalValue: results.averageFinalValue,
                successProbability: results.successProbability,
                probability: scenarioParams.probability,
                description: scenarioParams.name
            };
        }

        return scenarioResults;
    }

    /**
     * ⚡ RUN STRESS TESTS
     * Tests goal resilience against historical crisis scenarios
     */
    async runStressTests(goalParams, marketParams) {
        const stressResults = {};

        for (const [crisisName, crisis] of Object.entries(this.crisisScenarios)) {
            // Simulate crisis impact
            const crisisImpact = await this.simulateCrisisScenario(
                goalParams,
                marketParams,
                crisis
            );

            stressResults[crisisName] = {
                impactOnGoal: crisisImpact.goalImpactPercent,
                recoveryMonths: crisis.recoveryMonths,
                survivabilityScore: crisisImpact.survivabilityScore,
                description: crisis.name,
                worstCaseShortfall: crisisImpact.worstCaseShortfall
            };
        }

        return stressResults;
    }

    /**
     * 🔥 SIMULATE CRISIS SCENARIO
     * Models specific crisis impact on goal achievement
     */
    async simulateCrisisScenario(goalParams, marketParams, crisis) {
        const { timelineMonths } = goalParams;
        
        // Randomly place crisis within timeline
        const crisisStartMonth = Math.floor(Math.random() * (timelineMonths - crisis.duration));
        
        // Modify market parameters for crisis period
        const crisisMarketParams = {
            ...marketParams,
            expectedReturn: marketParams.expectedReturn, // Keep base return
            volatility: marketParams.volatility * crisis.volatilityMultiplier
        };

        // Run simulation with crisis injection
        const results = await this.runMonteCarloSimulationWithCrisis(
            goalParams,
            crisisMarketParams,
            crisis,
            crisisStartMonth,
            500 // Reduced simulations for stress testing
        );

        const normalResults = await this.runMonteCarloSimulation(
            goalParams,
            marketParams,
            500
        );

        const goalImpactPercent = ((results.successProbability - normalResults.successProbability) / normalResults.successProbability) * 100;
        
        return {
            goalImpactPercent: Math.round(goalImpactPercent),
            survivabilityScore: this.calculateSurvivabilityScore(results.successProbability),
            worstCaseShortfall: results.averageShortfall,
            crisisStartMonth: crisisStartMonth
        };
    }

    /**
     * 💥 RUN SIMULATION WITH CRISIS
     * Monte Carlo simulation with injected crisis scenario
     */
    async runMonteCarloSimulationWithCrisis(goalParams, marketParams, crisis, crisisStartMonth, numSimulations) {
        const results = [];

        for (let sim = 0; sim < numSimulations; sim++) {
            const result = this.runSingleSimulationWithCrisis(
                goalParams,
                marketParams,
                crisis,
                crisisStartMonth
            );
            results.push(result);
        }

        return this.analyzeSimulationResults(results, goalParams.targetAmount);
    }

    /**
     * 📈 SINGLE SIMULATION WITH CRISIS
     * Individual simulation path with crisis injection
     */
    runSingleSimulationWithCrisis(goalParams, marketParams, crisis, crisisStartMonth) {
        const {
            initialInvestment,
            targetAmount,
            timelineMonths,
            monthlyContribution,
            inflationRate
        } = goalParams;

        const {
            expectedReturn,
            volatility
        } = marketParams;

        let portfolioValue = initialInvestment;
        let totalContributions = initialInvestment;
        let maxDrawdown = 0;
        let peak = portfolioValue;

        const monthlyReturn = expectedReturn / this.monthsPerYear;
        const monthlyVolatility = volatility / Math.sqrt(this.monthsPerYear);
        const monthlyInflation = inflationRate / this.monthsPerYear;

        // Apply initial crisis drop if crisis starts immediately
        if (crisisStartMonth === 0) {
            portfolioValue *= (1 + crisis.marketDrop);
            peak = portfolioValue;
        }

        for (let month = 1; month <= timelineMonths; month++) {
            // Add monthly contribution
            portfolioValue += monthlyContribution;
            totalContributions += monthlyContribution;

            // Check if we're in crisis period
            const inCrisis = month >= crisisStartMonth && month < (crisisStartMonth + crisis.duration);
            
            let monthlyReturnRealized;
            if (inCrisis) {
                // Crisis return: spread the drop over crisis duration
                const crisisMonthlyDrop = crisis.marketDrop / crisis.duration;
                const crisisVolatility = monthlyVolatility * crisis.volatilityMultiplier;
                const randomShock = this.generateNormalRandom();
                monthlyReturnRealized = crisisMonthlyDrop + (crisisVolatility * randomShock);
            } else {
                // Normal return
                const randomShock = this.generateNormalRandom();
                monthlyReturnRealized = monthlyReturn + (monthlyVolatility * randomShock);
            }

            // Apply return
            portfolioValue *= (1 + monthlyReturnRealized);

            // Track drawdown
            if (portfolioValue > peak) {
                peak = portfolioValue;
            } else {
                const currentDrawdown = (peak - portfolioValue) / peak;
                maxDrawdown = Math.max(maxDrawdown, currentDrawdown);
            }
        }

        // Calculate final metrics with inflation adjustment
        const finalRealValue = portfolioValue / Math.pow(1 + monthlyInflation, timelineMonths);
        const goalAchieved = finalRealValue >= targetAmount;

        return {
            finalRealValue: finalRealValue,
            totalContributions: totalContributions,
            maxDrawdown: maxDrawdown,
            goalAchieved: goalAchieved,
            shortfall: goalAchieved ? 0 : targetAmount - finalRealValue
        };
    }

    /**
     * 💰 CALCULATE REQUIRED RETURN
     * Mathematical calculation of return needed to reach goal
     */
    calculateRequiredReturn(goalParams) {
        const {
            targetAmount,
            timelineMonths,
            monthlyContribution,
            initialInvestment,
            inflationRate
        } = goalParams;

        // Adjust target for inflation
        const inflationAdjustedTarget = targetAmount * Math.pow(1 + inflationRate, timelineMonths / 12);

        // Binary search for required return
        let lowReturn = -0.10; // -10% annual
        let highReturn = 0.50;  // 50% annual
        const tolerance = 0.0001;
        let iterations = 0;
        const maxIterations = 100;

        while (highReturn - lowReturn > tolerance && iterations < maxIterations) {
            const midReturn = (lowReturn + highReturn) / 2;
            const monthlyReturn = midReturn / this.monthsPerYear;

            // Calculate future value with this return
            const futureValue = this.calculateFutureValueWithContributions(
                initialInvestment,
                monthlyContribution,
                monthlyReturn,
                timelineMonths
            );

            if (futureValue < inflationAdjustedTarget) {
                lowReturn = midReturn;
            } else {
                highReturn = midReturn;
            }

            iterations++;
        }

        return (lowReturn + highReturn) / 2;
    }

    /**
     * 💵 CALCULATE FUTURE VALUE WITH CONTRIBUTIONS
     * Future value formula: FV = PV(1+r)^n + PMT[((1+r)^n - 1)/r]
     */
    calculateFutureValueWithContributions(presentValue, payment, monthlyRate, periods) {
        if (monthlyRate === 0) {
            return presentValue + (payment * periods);
        }

        const futureValuePrincipal = presentValue * Math.pow(1 + monthlyRate, periods);
        const futureValueAnnuity = payment * ((Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate);
        
        return futureValuePrincipal + futureValueAnnuity;
    }

    /**
     * 📊 ANALYZE SIMULATION RESULTS
     * Statistical analysis of simulation outcomes
     */
    analyzeSimulationResults(results, targetAmount) {
        const finalValues = results.map(r => r.finalRealValue);
        const shortfalls = results.map(r => r.shortfall);
        const successfulResults = results.filter(r => r.goalAchieved);
        const successProbability = successfulResults.length / results.length;

        const sortedValues = [...finalValues].sort((a, b) => a - b);

        return {
            successProbability: successProbability,
            averageFinalValue: this.calculateMean(finalValues),
            medianFinalValue: this.getPercentile(sortedValues, 50),
            confidenceIntervals: {
                ci90: {
                    lower: this.getPercentile(sortedValues, 5),
                    upper: this.getPercentile(sortedValues, 95)
                },
                ci95: {
                    lower: this.getPercentile(sortedValues, 2.5),
                    upper: this.getPercentile(sortedValues, 97.5)
                }
            },
            averageShortfall: this.calculateMean(shortfalls.filter(s => s > 0)),
            worstCase: Math.min(...finalValues),
            bestCase: Math.max(...finalValues),
            observedVolatility: this.calculateStandardDeviation(finalValues) / this.calculateMean(finalValues)
        };
    }

    /**
     * 🎯 ASSESS GOAL FEASIBILITY
     * Determines overall feasibility based on all analyses
     */
    assessGoalFeasibility(mainResults, scenarioResults, stressResults, confidenceMetrics) {
        const successProbability = mainResults.successProbability;
        
        // Calculate weighted scenario probability
        const weightedScenarioProbability = Object.values(scenarioResults).reduce((sum, scenario) => {
            return sum + (scenario.successProbability * scenario.probability);
        }, 0);

        // Calculate stress test survivability
        const averageStressSurvivability = Object.values(stressResults).reduce((sum, stress) => {
            return sum + stress.survivabilityScore;
        }, 0) / Object.keys(stressResults).length;

        // Determine confidence level
        let confidenceLevel;
        if (successProbability >= 0.85 && averageStressSurvivability >= 0.7) {
            confidenceLevel = 'high';
        } else if (successProbability >= 0.70 && averageStressSurvivability >= 0.5) {
            confidenceLevel = 'medium';
        } else {
            confidenceLevel = 'low';
        }

        // Overall feasibility decision
        const isGoalFeasible = successProbability >= 0.70 && weightedScenarioProbability >= 0.60;

        return {
            isGoalFeasible,
            successProbability,
            weightedScenarioProbability,
            confidenceLevel,
            averageStressSurvivability,
            overallScore: (successProbability * 0.5) + (weightedScenarioProbability * 0.3) + (averageStressSurvivability * 0.2)
        };
    }

    /**
     * 📈 CALCULATE CONFIDENCE METRICS
     * Statistical confidence measures
     */
    calculateConfidenceMetrics(results, requiredReturn, marketParams) {
        const returnBuffer = marketParams.expectedReturn - requiredReturn;
        const volatilityRisk = marketParams.volatility / marketParams.expectedReturn;
        
        return {
            returnBuffer: returnBuffer,
            volatilityRisk: volatilityRisk,
            riskAdjustedBuffer: returnBuffer / marketParams.volatility,
            confidenceScore: Math.max(0, Math.min(1, (returnBuffer + 0.02) / 0.1)) // Scale 0-1
        };
    }

    /**
     * 💡 GENERATE RECOMMENDATIONS
     * Actionable recommendations based on analysis
     */
    generateRecommendations(feasibilityAssessment, goalParams, requiredReturn) {
        const recommendations = [];
        const { successProbability, confidenceLevel } = feasibilityAssessment;
        const { timelineMonths, monthlyContribution } = goalParams;

        if (successProbability < 0.70) {
            if (requiredReturn > 0.12) {
                recommendations.push({
                    type: 'INCREASE_CONTRIBUTIONS',
                    priority: 'HIGH',
                    message: `Consider increasing monthly contributions by ${Math.round(((requiredReturn / 0.10) - 1) * monthlyContribution)}`
                });
            }

            if (timelineMonths < 120) {
                recommendations.push({
                    type: 'EXTEND_TIMELINE',
                    priority: 'HIGH',
                    message: 'Consider extending your investment timeline for better compound growth'
                });
            }

            recommendations.push({
                type: 'RISK_ADJUSTMENT',
                priority: 'MEDIUM',
                message: 'Goal may require higher-risk investments. Consider your risk tolerance.'
            });
        }

        if (confidenceLevel === 'low') {
            recommendations.push({
                type: 'STRESS_TEST_REVIEW',
                priority: 'MEDIUM',
                message: 'Goal is vulnerable to market downturns. Consider building larger cash reserves.'
            });
        }

        if (successProbability > 0.90) {
            recommendations.push({
                type: 'OPTIMIZE_STRATEGY',
                priority: 'LOW',
                message: 'Goal is highly achievable. Consider lower-risk investments or additional goals.'
            });
        }

        return recommendations;
    }

    // ===========================================
    // VALIDATION AND UTILITY FUNCTIONS
    // ===========================================

    /**
     * ✅ VALIDATE GOAL PARAMETERS
     */
    validateGoalParameters(goalParams) {
        const {
            targetAmount,
            timelineMonths,
            monthlyContribution,
            initialInvestment = 0,
            inflationRate = 0.03
        } = goalParams;

        // Validation checks
        if (!targetAmount || targetAmount <= 0) {
            throw new Error('Target amount must be positive');
        }

        if (!timelineMonths || timelineMonths < 12 || timelineMonths > 600) {
            throw new Error('Timeline must be between 12 and 600 months');
        }

        if (!monthlyContribution || monthlyContribution < 0) {
            throw new Error('Monthly contribution must be non-negative');
        }

        if (initialInvestment < 0) {
            throw new Error('Initial investment cannot be negative');
        }

        if (inflationRate < 0 || inflationRate > 0.15) {
            throw new Error('Inflation rate must be between 0% and 15%');
        }

        // Reasonableness checks
        const totalContributions = initialInvestment + (monthlyContribution * timelineMonths);
        if (targetAmount > totalContributions * 10) {
            throw new Error('Target amount appears unrealistic given contributions');
        }

        return {
            targetAmount: parseFloat(targetAmount),
            timelineMonths: parseInt(timelineMonths),
            monthlyContribution: parseFloat(monthlyContribution),
            initialInvestment: parseFloat(initialInvestment),
            inflationRate: parseFloat(inflationRate)
        };
    }

    /**
     * ✅ VALIDATE MARKET PARAMETERS
     */
    validateMarketParameters(marketParams) {
        const {
            expectedReturn = 0.10,      // 10% historical average
            volatility = 0.16,          // 16% historical volatility
            riskFreeRate = 0.045        // 4.5% treasury rate
        } = marketParams;

        if (expectedReturn < -0.20 || expectedReturn > 0.50) {
            throw new Error('Expected return must be between -20% and 50%');
        }

        if (volatility < 0 || volatility > 1.0) {
            throw new Error('Volatility must be between 0% and 100%');
        }

        if (riskFreeRate < 0 || riskFreeRate > 0.15) {
            throw new Error('Risk-free rate must be between 0% and 15%');
        }

        return {
            expectedReturn: parseFloat(expectedReturn),
            volatility: parseFloat(volatility),
            riskFreeRate: parseFloat(riskFreeRate)
        };
    }

    /**
     * 🎲 GENERATE NORMAL RANDOM
     * Box-Muller transformation for normal distribution
     */
    generateNormalRandom() {
        if (this.hasSpareRandom) {
            this.hasSpareRandom = false;
            return this.spareRandom;
        }

        this.hasSpareRandom = true;
        const u = Math.random();
        const v = Math.random();
        const mag = Math.sqrt(-2.0 * Math.log(u));
        this.spareRandom = mag * Math.cos(2.0 * Math.PI * v);
        return mag * Math.sin(2.0 * Math.PI * v);
    }

    /**
     * 📊 CALCULATE SURVIVABILITY SCORE
     */
    calculateSurvivabilityScore(successProbability) {
        // Non-linear scoring: heavily penalize low probabilities
        if (successProbability >= 0.8) return 1.0;
        if (successProbability >= 0.6) return 0.8;
        if (successProbability >= 0.4) return 0.5;
        if (successProbability >= 0.2) return 0.2;
        return 0.0;
    }

    /**
     * ⚡ UPDATE PERFORMANCE METRICS
     */
    updatePerformanceMetrics(executionTime) {
        this.performanceMetrics.simulationsRun++;
        this.performanceMetrics.lastExecutionTime = executionTime;
        
        // Rolling average
        const weight = 0.1;
        this.performanceMetrics.averageExecutionTime = 
            (this.performanceMetrics.averageExecutionTime * (1 - weight)) + 
            (executionTime * weight);
    }

    /**
     * 📊 STATISTICAL UTILITY FUNCTIONS
     */
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

    /**
     * 🧪 PERFORMANCE TEST
     * Built-in performance and accuracy testing
     */
    static async runPerformanceTest() {
        console.log('🧪 Running Monte Carlo performance test...');
        
        const simulator = new MonteCarloGoalSimulation();
        
        const testGoal = {
            targetAmount: 1000000,
            timelineMonths: 360,        // 30 years
            monthlyContribution: 2000,
            initialInvestment: 10000,
            inflationRate: 0.03
        };

        const testMarket = {
            expectedReturn: 0.10,
            volatility: 0.16,
            riskFreeRate: 0.045
        };

        try {
            const startTime = Date.now();
            const result = await simulator.simulateGoalAchievement(testGoal, testMarket);
            const endTime = Date.now();

            console.log('✅ Performance Test Results:');
            console.log(`Execution Time: ${endTime - startTime}ms`);
            console.log(`Success Probability: ${(result.successProbability * 100).toFixed(1)}%`);
            console.log(`Required Return: ${(result.requiredAnnualReturn * 100).toFixed(1)}%`);
            console.log(`Confidence Level: ${result.confidenceLevel}`);
            console.log(`Simulations: ${result.simulationMetrics.simulationsRun}`);

            // Verify performance requirement (under 2 seconds)
            if (endTime - startTime < 2000) {
                console.log('✅ Performance requirement met');
            } else {
                console.log('⚠️  Performance requirement not met');
            }

            return result;

        } catch (error) {
            console.error('❌ Performance test failed:', error);
            throw error;
        }
    }
}

module.exports = MonteCarloGoalSimulation;

// Enable performance testing when run directly
if (require.main === module) {
    MonteCarloGoalSimulation.runPerformanceTest()
        .then(result => {
            console.log('🎯 Test completed successfully!');
            process.exit(0);
        })
        .catch(error => {
            console.error('❌ Test failed:', error);
            process.exit(1);
        });
}