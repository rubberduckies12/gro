/**
 * Requirement Calculator Controller for Gro Investment App
 * 
 * This controller converts validated user goals into specific portfolio
 * requirements and constraints that guide the optimization process.
 */

class RequirementCalculators {
    constructor() {
        // Market assumptions for calculations
        this.marketAssumptions = {
            averageMarketReturn: 0.10,     // 10% historical S&P 500
            averageMarketVolatility: 0.16, // 16% historical volatility
            riskFreeRate: 0.045,           // 4.5% Treasury rate
            inflationRate: 0.03,           // 3% inflation expectation
            marketSharpeRatio: 0.625       // (10% - 4.5%) / 16%
        };

        // Risk tolerance mapping to portfolio parameters
        this.riskToleranceMapping = {
            1: { maxVolatility: 0.08, maxDrawdown: 0.10, targetReturn: 0.05, minSharpe: 0.4 },  // Ultra Conservative
            2: { maxVolatility: 0.10, maxDrawdown: 0.12, targetReturn: 0.06, minSharpe: 0.45 }, // Very Conservative
            3: { maxVolatility: 0.12, maxDrawdown: 0.15, targetReturn: 0.07, minSharpe: 0.5 },  // Conservative
            4: { maxVolatility: 0.14, maxDrawdown: 0.18, targetReturn: 0.08, minSharpe: 0.55 }, // Moderate Conservative
            5: { maxVolatility: 0.16, maxDrawdown: 0.20, targetReturn: 0.09, minSharpe: 0.6 },  // Moderate
            6: { maxVolatility: 0.18, maxDrawdown: 0.22, targetReturn: 0.10, minSharpe: 0.65 }, // Moderate Aggressive
            7: { maxVolatility: 0.20, maxDrawdown: 0.25, targetReturn: 0.11, minSharpe: 0.7 },  // Aggressive
            8: { maxVolatility: 0.24, maxDrawdown: 0.30, targetReturn: 0.13, minSharpe: 0.75 }, // Very Aggressive
            9: { maxVolatility: 0.28, maxDrawdown: 0.35, targetReturn: 0.15, minSharpe: 0.8 },  // Ultra Aggressive
            10: { maxVolatility: 0.35, maxDrawdown: 0.40, targetReturn: 0.18, minSharpe: 0.85 } // Maximum Risk
        };

        // Timeline-based adjustments
        this.timelineAdjustments = {
            shortTerm: { months: 12, riskReduction: 0.3, liquidityRequirement: 0.2 },   // < 1 year
            mediumTerm: { months: 60, riskReduction: 0.1, liquidityRequirement: 0.1 }, // 1-5 years
            longTerm: { months: 120, riskReduction: 0, liquidityRequirement: 0.05 },   // 5-10 years
            veryLongTerm: { months: 999, riskReduction: -0.1, liquidityRequirement: 0.02 } // 10+ years
        };
    }

    /**
     * 🎯 MAIN PORTFOLIO REQUIREMENTS CALCULATION
     * Primary entry point for converting goals to portfolio constraints
     */
    async calculatePortfolioRequirements(validatedGoal, userProfile) {
        try {
            console.log('📊 Calculating portfolio requirements from validated goal...');

            // Calculate return requirements
            const returnRequirements = await this.calculateReturnRequirements(validatedGoal);

            // Set volatility and risk parameters
            const riskParameters = await this.setRiskParameters(validatedGoal, userProfile);

            // Determine portfolio constraints
            const portfolioConstraints = await this.calculatePortfolioConstraints(
                validatedGoal, 
                userProfile, 
                returnRequirements
            );

            // Set rebalancing strategy
            const rebalancingStrategy = await this.determineRebalancingStrategy(
                validatedGoal, 
                userProfile
            );

            // Calculate diversification requirements
            const diversificationRequirements = await this.calculateDiversificationRequirements(
                validatedGoal, 
                userProfile
            );

            // Generate optimization targets
            const optimizationTargets = this.generateOptimizationTargets(
                returnRequirements,
                riskParameters,
                validatedGoal
            );

            const portfolioRequirements = {
                // Core return and risk requirements
                minAnnualReturn: returnRequirements.minimumRequired,
                targetAnnualReturn: returnRequirements.targetReturn,
                maxVolatility: riskParameters.maxVolatility,
                maxDrawdown: riskParameters.maxDrawdown,
                targetSharpeRatio: riskParameters.targetSharpe,
                
                // Portfolio constraints
                constraints: portfolioConstraints,
                
                // Risk parameters
                riskParameters: riskParameters,
                
                // Rebalancing strategy
                rebalancing: rebalancingStrategy,
                
                // Diversification requirements
                diversification: diversificationRequirements,
                
                // Optimization targets for Stage 2
                optimization: optimizationTargets,
                
                // Metadata
                metadata: {
                    calculatedAt: new Date(),
                    goalId: validatedGoal.id,
                    userId: validatedGoal.userId,
                    goalType: userProfile.goalType,
                    timelineMonths: validatedGoal.timelineMonths
                }
            };

            console.log(`✅ Portfolio requirements calculated. Target return: ${(returnRequirements.targetReturn * 100).toFixed(1)}%`);

            return portfolioRequirements;

        } catch (error) {
            console.error('❌ Portfolio requirements calculation failed:', error);
            throw new Error(`Requirements calculation failed: ${error.message}`);
        }
    }

    /**
     * 💰 CALCULATE RETURN REQUIREMENTS
     * Determines minimum and target returns needed for goal achievement
     */
    async calculateReturnRequirements(validatedGoal) {
        try {
            const {
                targetAmount,
                timelineMonths,
                monthlyContribution,
                initialInvestment,
                successProbability
            } = validatedGoal;

            console.log('📈 Calculating return requirements...');

            // Adjust target for inflation
            const inflationAdjustedTarget = targetAmount * Math.pow(
                1 + this.marketAssumptions.inflationRate, 
                timelineMonths / 12
            );

            // Calculate minimum required return (deterministic scenario)
            const minimumRequired = this.calculateRequiredReturn(
                initialInvestment,
                monthlyContribution,
                inflationAdjustedTarget,
                timelineMonths
            );

            // Calculate target return with buffer for volatility
            const volatilityBuffer = this.calculateVolatilityBuffer(
                minimumRequired,
                timelineMonths,
                successProbability
            );

            const targetReturn = minimumRequired + volatilityBuffer;

            // Calculate optimal return (if goal is easily achievable)
            const optimalReturn = Math.min(
                targetReturn * 1.2, // 20% buffer max
                this.marketAssumptions.averageMarketReturn + 0.02 // Market + 2%
            );

            // Determine return confidence interval
            const returnConfidence = this.calculateReturnConfidence(
                minimumRequired,
                targetReturn,
                successProbability
            );

            return {
                minimumRequired: Math.max(0.02, minimumRequired), // Never below 2%
                targetReturn: Math.max(0.03, targetReturn),       // Never below 3%
                optimalReturn: optimalReturn,
                inflationAdjustedTarget: inflationAdjustedTarget,
                volatilityBuffer: volatilityBuffer,
                returnConfidence: returnConfidence,
                assumptions: {
                    inflationRate: this.marketAssumptions.inflationRate,
                    marketReturn: this.marketAssumptions.averageMarketReturn,
                    timelineYears: timelineMonths / 12
                }
            };

        } catch (error) {
            console.error('Error calculating return requirements:', error);
            throw new Error(`Return requirements calculation failed: ${error.message}`);
        }
    }

    /**
     * ⚖️ SET RISK PARAMETERS
     * Determines volatility, drawdown, and risk limits based on user profile
     */
    async setRiskParameters(validatedGoal, userProfile) {
        try {
            const { riskTolerance, age, investmentExperience, goalType } = userProfile;
            const { timelineMonths } = validatedGoal;

            console.log('⚖️ Setting risk parameters...');

            // Get base risk parameters from risk tolerance
            const baseRisk = this.riskToleranceMapping[riskTolerance];

            // Apply timeline adjustments
            const timelineAdjustment = this.getTimelineAdjustment(timelineMonths);
            
            // Apply age-based adjustments
            const ageAdjustment = this.calculateAgeAdjustment(age, timelineMonths);

            // Apply experience adjustments
            const experienceAdjustment = this.calculateExperienceAdjustment(investmentExperience);

            // Apply goal-type adjustments
            const goalAdjustment = this.calculateGoalTypeAdjustment(goalType);

            // Calculate final risk parameters
            const riskMultiplier = 1 + timelineAdjustment + ageAdjustment + experienceAdjustment + goalAdjustment;
            
            const maxVolatility = Math.min(0.40, Math.max(0.05, baseRisk.maxVolatility * riskMultiplier));
            const maxDrawdown = Math.min(0.50, Math.max(0.05, baseRisk.maxDrawdown * riskMultiplier));
            const targetSharpe = Math.max(0.3, baseRisk.minSharpe);

            // Calculate additional risk metrics
            const riskParameters = {
                maxVolatility: maxVolatility,
                maxDrawdown: maxDrawdown,
                targetSharpe: targetSharpe,
                
                // Beta constraints
                betaRange: this.calculateBetaRange(riskTolerance, timelineMonths),
                
                // Correlation limits
                maxCorrelation: this.calculateMaxCorrelation(riskTolerance),
                
                // Value at Risk (VaR)
                valueAtRisk95: maxVolatility * 1.645 / Math.sqrt(252), // Daily 95% VaR
                valueAtRisk99: maxVolatility * 2.326 / Math.sqrt(252), // Daily 99% VaR
                
                // Tracking error vs benchmark
                maxTrackingError: this.calculateTrackingError(riskTolerance, goalType),
                
                // Liquidity requirements
                minLiquidity: this.calculateLiquidityRequirements(validatedGoal, userProfile),
                
                // Risk adjustments applied
                adjustments: {
                    timeline: timelineAdjustment,
                    age: ageAdjustment,
                    experience: experienceAdjustment,
                    goalType: goalAdjustment,
                    finalMultiplier: riskMultiplier
                }
            };

            console.log(`📊 Risk parameters set: Max Vol: ${(maxVolatility * 100).toFixed(1)}%, Max DD: ${(maxDrawdown * 100).toFixed(1)}%`);

            return riskParameters;

        } catch (error) {
            console.error('Error setting risk parameters:', error);
            throw new Error(`Risk parameters calculation failed: ${error.message}`);
        }
    }

    /**
     * 🎯 CALCULATE PORTFOLIO CONSTRAINTS
     * Sets position limits, sector limits, and other portfolio constraints
     */
    async calculatePortfolioConstraints(validatedGoal, userProfile, returnRequirements) {
        try {
            const { riskTolerance, goalType } = userProfile;
            const { targetAmount, timelineMonths } = validatedGoal;

            console.log('🎯 Calculating portfolio constraints...');

            // Position sizing constraints
            const positionConstraints = this.calculatePositionConstraints(
                riskTolerance,
                targetAmount,
                timelineMonths
            );

            // Sector concentration limits
            const sectorConstraints = this.calculateSectorConstraints(
                riskTolerance,
                goalType,
                timelineMonths
            );

            // Geographic constraints
            const geographicConstraints = this.calculateGeographicConstraints(
                riskTolerance,
                goalType
            );

            // Liquidity constraints
            const liquidityConstraints = this.calculateLiquidityConstraints(
                validatedGoal,
                userProfile
            );

            // Market cap constraints
            const marketCapConstraints = this.calculateMarketCapConstraints(
                riskTolerance,
                targetAmount,
                timelineMonths
            );

            return {
                // Position sizing
                maxSinglePosition: positionConstraints.maxSingle,
                minSinglePosition: positionConstraints.minSingle,
                maxTopPositions: positionConstraints.maxTop5,
                
                // Sector limits
                maxSectorWeight: sectorConstraints.maxSector,
                maxIndustryWeight: sectorConstraints.maxIndustry,
                requiredSectorDiversification: sectorConstraints.minSectors,
                
                // Geographic limits
                maxCountryWeight: geographicConstraints.maxCountry,
                maxRegionWeight: geographicConstraints.maxRegion,
                minGeographicDiversification: geographicConstraints.minCountries,
                
                // Portfolio size
                minPositions: positionConstraints.minPositions,
                maxPositions: positionConstraints.maxPositions,
                
                // Liquidity requirements
                minDailyVolume: liquidityConstraints.minDailyVolume,
                minMarketCap: liquidityConstraints.minMarketCap,
                maxBidAskSpread: liquidityConstraints.maxSpread,
                
                // Market cap distribution
                marketCapDistribution: marketCapConstraints,
                
                // ESG constraints (if applicable)
                esgConstraints: this.calculateESGConstraints(userProfile),
                
                // Turnover limits
                maxAnnualTurnover: this.calculateTurnoverLimits(riskTolerance, timelineMonths)
            };

        } catch (error) {
            console.error('Error calculating portfolio constraints:', error);
            throw new Error(`Portfolio constraints calculation failed: ${error.message}`);
        }
    }

    /**
     * 🔄 DETERMINE REBALANCING STRATEGY
     * Sets rebalancing frequency, thresholds, and methodology
     */
    async determineRebalancingStrategy(validatedGoal, userProfile) {
        try {
            const { riskTolerance, goalType, age } = userProfile;
            const { timelineMonths, targetAmount } = validatedGoal;

            console.log('🔄 Determining rebalancing strategy...');

            // Calculate optimal rebalancing frequency
            const frequency = this.calculateRebalanceFrequency(
                riskTolerance,
                timelineMonths,
                targetAmount
            );

            // Calculate drift thresholds
            const driftThresholds = this.calculateDriftThresholds(
                riskTolerance,
                frequency,
                timelineMonths
            );

            // Calculate minimum trade sizes
            const tradeConstraints = this.calculateTradeConstraints(
                targetAmount,
                frequency
            );

            // Determine tax optimization strategy
            const taxOptimization = this.calculateTaxOptimization(
                goalType,
                timelineMonths,
                userProfile
            );

            return {
                // Rebalancing schedule
                frequency: frequency,
                scheduledDates: this.generateRebalanceSchedule(frequency),
                
                // Drift thresholds
                absoluteDriftThreshold: driftThresholds.absolute,
                relativeDriftThreshold: driftThresholds.relative,
                
                // Trade constraints
                minTradeSize: tradeConstraints.minSize,
                maxTradeSize: tradeConstraints.maxSize,
                minTradeValue: tradeConstraints.minValue,
                
                // Cost considerations
                maxTransactionCost: this.calculateMaxTransactionCost(targetAmount),
                
                // Tax optimization
                taxLossHarvesting: taxOptimization.harvestLosses,
                taxDelay: taxOptimization.delayTaxableGains,
                washSaleAvoidance: taxOptimization.avoidWashSales,
                
                // Market timing constraints
                blackoutPeriods: this.getBlackoutPeriods(),
                volatilityAdjustments: this.getVolatilityAdjustments(riskTolerance)
            };

        } catch (error) {
            console.error('Error determining rebalancing strategy:', error);
            throw new Error(`Rebalancing strategy calculation failed: ${error.message}`);
        }
    }

    /**
     * 🎲 CALCULATE DIVERSIFICATION REQUIREMENTS
     * Determines minimum diversification across various dimensions
     */
    async calculateDiversificationRequirements(validatedGoal, userProfile) {
        try {
            const { riskTolerance, goalType } = userProfile;
            const { targetAmount, timelineMonths } = validatedGoal;

            console.log('🎲 Calculating diversification requirements...');

            // Asset class diversification
            const assetClassDiversification = this.calculateAssetClassDiversification(
                riskTolerance,
                timelineMonths,
                goalType
            );

            // Sector diversification
            const sectorDiversification = this.calculateSectorDiversification(
                riskTolerance,
                targetAmount
            );

            // Geographic diversification
            const geographicDiversification = this.calculateGeographicDiversification(
                riskTolerance,
                goalType
            );

            // Factor diversification
            const factorDiversification = this.calculateFactorDiversification(
                riskTolerance,
                timelineMonths
            );

            return {
                // Asset classes
                assetClasses: assetClassDiversification,
                
                // Sector requirements
                sectors: sectorDiversification,
                
                // Geographic requirements
                geography: geographicDiversification,
                
                // Factor exposure
                factors: factorDiversification,
                
                // Correlation constraints
                maxPairwiseCorrelation: this.calculateMaxPairwiseCorrelation(riskTolerance),
                
                // Concentration measures
                herfindahlLimit: this.calculateHerfindahlLimit(riskTolerance),
                
                // Minimum effective positions
                effectivePositions: this.calculateEffectivePositions(targetAmount, riskTolerance)
            };

        } catch (error) {
            console.error('Error calculating diversification requirements:', error);
            throw new Error(`Diversification requirements calculation failed: ${error.message}`);
        }
    }

    /**
     * 🎯 GENERATE OPTIMIZATION TARGETS
     * Creates optimization parameters for Stage 2 portfolio construction
     */
    generateOptimizationTargets(returnRequirements, riskParameters, validatedGoal) {
        try {
            console.log('🎯 Generating optimization targets...');

            return {
                // Primary objectives
                objectives: {
                    primary: 'maximize_sharpe_ratio',
                    secondary: 'minimize_tracking_error',
                    tertiary: 'maximize_diversification'
                },
                
                // Optimization bounds
                bounds: {
                    minReturn: returnRequirements.minimumRequired,
                    targetReturn: returnRequirements.targetReturn,
                    maxVolatility: riskParameters.maxVolatility,
                    maxDrawdown: riskParameters.maxDrawdown
                },
                
                // Optimization method
                method: this.selectOptimizationMethod(validatedGoal, riskParameters),
                
                // Convergence criteria
                convergence: {
                    tolerance: 1e-6,
                    maxIterations: 1000,
                    improvementThreshold: 1e-8
                },
                
                // Risk model parameters
                riskModel: {
                    type: 'factor_model',
                    lookbackPeriod: Math.min(252 * 5, validatedGoal.timelineMonths * 21), // 5 years or timeline
                    halfLife: 60, // 60 days for volatility decay
                    eigenRiskAdjustment: true,
                    specificRiskFloor: 0.01
                },
                
                // Transaction cost model
                transactionCosts: {
                    basisPoints: this.calculateTransactionCostBps(validatedGoal.targetAmount),
                    marketImpact: true,
                    timingCosts: true
                }
            };

        } catch (error) {
            console.error('Error generating optimization targets:', error);
            throw new Error(`Optimization targets generation failed: ${error.message}`);
        }
    }

    // ===========================================
    // UTILITY AND HELPER FUNCTIONS
    // ===========================================

    /**
     * 💱 CALCULATE REQUIRED RETURN
     * Uses future value formula solved for rate
     */
    calculateRequiredReturn(presentValue, monthlyPayment, futureValue, months) {
        // Binary search for the required monthly return
        let low = -0.01; // -1% monthly
        let high = 0.05;  // 5% monthly
        const tolerance = 1e-8;

        while (high - low > tolerance) {
            const mid = (low + high) / 2;
            const calculatedFV = this.futureValueWithPayments(presentValue, monthlyPayment, mid, months);
            
            if (calculatedFV < futureValue) {
                low = mid;
            } else {
                high = mid;
            }
        }

        return (low + high) / 2 * 12; // Convert to annual
    }

    /**
     * 💰 FUTURE VALUE WITH PAYMENTS
     * Standard financial formula implementation
     */
    futureValueWithPayments(presentValue, monthlyPayment, monthlyRate, months) {
        if (monthlyRate === 0) {
            return presentValue + (monthlyPayment * months);
        }

        const futureValuePrincipal = presentValue * Math.pow(1 + monthlyRate, months);
        const futureValueAnnuity = monthlyPayment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        
        return futureValuePrincipal + futureValueAnnuity;
    }

    /**
     * 📊 CALCULATE VOLATILITY BUFFER
     * Additional return needed to account for volatility risk
     */
    calculateVolatilityBuffer(requiredReturn, timelineMonths, successProbability) {
        // Higher volatility environments need higher return buffers
        const timelineYears = timelineMonths / 12;
        const probabilityAdjustment = (0.8 - successProbability) * 0.1; // Up to 1% buffer
        const timelineAdjustment = Math.max(0, (5 - timelineYears)) * 0.005; // Shorter timeline = higher buffer
        
        return Math.min(0.03, probabilityAdjustment + timelineAdjustment); // Max 3% buffer
    }

    /**
     * ⏱️ GET TIMELINE ADJUSTMENT
     * Risk adjustments based on investment timeline
     */
    getTimelineAdjustment(timelineMonths) {
        if (timelineMonths <= this.timelineAdjustments.shortTerm.months) {
            return -this.timelineAdjustments.shortTerm.riskReduction;
        } else if (timelineMonths <= this.timelineAdjustments.mediumTerm.months) {
            return -this.timelineAdjustments.mediumTerm.riskReduction;
        } else if (timelineMonths <= this.timelineAdjustments.longTerm.months) {
            return -this.timelineAdjustments.longTerm.riskReduction;
        } else {
            return -this.timelineAdjustments.veryLongTerm.riskReduction;
        }
    }

    /**
     * 👤 CALCULATE AGE ADJUSTMENT
     * Age-based risk capacity adjustments
     */
    calculateAgeAdjustment(age, timelineMonths) {
        const timelineYears = timelineMonths / 12;
        const ageAtGoal = age + timelineYears;
        
        // Younger investors can take more risk
        if (age < 30) return 0.1;
        if (age < 40) return 0.05;
        if (age < 50) return 0;
        if (age < 60) return -0.05;
        
        // Older investors approaching retirement need less risk
        if (ageAtGoal > 65) return -0.2;
        if (ageAtGoal > 55) return -0.1;
        
        return 0;
    }

    /**
     * 🎓 CALCULATE EXPERIENCE ADJUSTMENT
     * Investment experience adjustments
     */
    calculateExperienceAdjustment(investmentExperience) {
        const adjustments = {
            'beginner': -0.1,      // Reduce risk for beginners
            'intermediate': 0,      // No adjustment
            'advanced': 0.05,      // Slight increase for experienced
            'expert': 0.1          // Higher risk for experts
        };
        
        return adjustments[investmentExperience] || 0;
    }

    /**
     * 🎯 CALCULATE GOAL TYPE ADJUSTMENT
     * Goal-specific risk adjustments
     */
    calculateGoalTypeAdjustment(goalType) {
        const adjustments = {
            'retirement': 0,        // Standard risk
            'house': -0.15,        // Lower risk for house down payment
            'education': -0.1,     // Lower risk for education
            'emergency': -0.3,     // Much lower risk for emergency fund
            'growth': 0.1,         // Higher risk for growth goals
            'income': -0.05        // Slightly lower risk for income goals
        };
        
        return adjustments[goalType] || 0;
    }

    /**
     * 📈 CALCULATE POSITION CONSTRAINTS
     * Position sizing limits based on risk and portfolio size
     */
    calculatePositionConstraints(riskTolerance, targetAmount, timelineMonths) {
        // Base constraints
        let maxSingle = 0.05; // 5% base maximum
        let minSingle = 0.01; // 1% base minimum
        
        // Risk tolerance adjustments
        maxSingle += (riskTolerance - 5) * 0.005; // ±0.5% per risk level
        
        // Portfolio size adjustments
        if (targetAmount < 100000) {
            maxSingle += 0.02; // Smaller portfolios can concentrate more
        } else if (targetAmount > 1000000) {
            maxSingle -= 0.01; // Larger portfolios should diversify more
        }
        
        // Timeline adjustments
        if (timelineMonths < 60) {
            maxSingle -= 0.01; // Shorter timeline = less concentration
        }
        
        // Calculate number of positions
        const minPositions = Math.max(10, Math.floor(1 / maxSingle));
        const maxPositions = Math.min(50, Math.floor(1 / minSingle));
        
        return {
            maxSingle: Math.min(0.10, Math.max(0.02, maxSingle)),
            minSingle: Math.max(0.005, minSingle),
            maxTop5: Math.min(0.40, maxSingle * 5),
            minPositions: minPositions,
            maxPositions: maxPositions
        };
    }

    /**
     * 🧪 TEST REQUIREMENT CALCULATOR
     * Built-in test function
     */
    static async testRequirementCalculator() {
        console.log('🧪 Testing Requirement Calculator...');

        const calculator = new RequirementCalculators();

        const testGoal = {
            id: 'test-goal-1',
            userId: 'test-user-1',
            targetAmount: 1000000,
            timelineMonths: 360,
            monthlyContribution: 2000,
            initialInvestment: 10000,
            successProbability: 0.78
        };

        const testProfile = {
            riskTolerance: 7,
            age: 35,
            investmentExperience: 'intermediate',
            goalType: 'retirement'
        };

        try {
            const requirements = await calculator.calculatePortfolioRequirements(testGoal, testProfile);
            
            console.log('✅ Test Results:');
            console.log(`Min Annual Return: ${(requirements.minAnnualReturn * 100).toFixed(1)}%`);
            console.log(`Target Annual Return: ${(requirements.targetAnnualReturn * 100).toFixed(1)}%`);
            console.log(`Max Volatility: ${(requirements.maxVolatility * 100).toFixed(1)}%`);
            console.log(`Max Drawdown: ${(requirements.maxDrawdown * 100).toFixed(1)}%`);
            console.log(`Max Single Position: ${(requirements.constraints.maxSinglePosition * 100).toFixed(1)}%`);
            console.log(`Rebalance Frequency: ${requirements.rebalancing.frequency}`);

            return requirements;

        } catch (error) {
            console.error('❌ Test failed:', error);
            throw error;
        }
    }

    // Additional helper methods would be implemented here for:
    // - calculateSectorConstraints()
    // - calculateGeographicConstraints() 
    // - calculateLiquidityConstraints()
    // - calculateMarketCapConstraints()
    // - And many more utility functions...
    
    // [Implementation continues with remaining helper methods]
}

module.exports = RequirementCalculators;

// Enable testing when run directly
if (require.main === module) {
    RequirementCalculators.testRequirementCalculator()
        .then(result => {
            console.log('🎯 Requirement Calculator test completed successfully!');
            process.exit(0);
        })
        .catch(error => {
            console.error('❌ Test failed:', error);
            process.exit(1);
        });
}
