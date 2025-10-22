/**
 * Feasibility Checker Controller for Gro Investment App
 * 
 * This controller determines if user investment goals are mathematically
 * achievable given market realities and their financial constraints.
 */

const MonteCarloGoalSimulation = require('../services/monte-carlo-goal');

class FeasibilityChecker {
    constructor() {
        this.marketData = {
            historicalAverageReturn: 0.10,    // 10% S&P 500 historical average
            historicalVolatility: 0.16,       // 16% historical volatility
            riskFreeRate: 0.045,               // 4.5% Treasury rate
            inflationRate: 0.03                // 3% average inflation
        };

        this.feasibilityThresholds = {
            minimumSuccessProbability: 0.70,   // 70% minimum for feasible
            maximumReasonableReturn: 0.18,     // 18% max reasonable expectation
            minimumTimelineMonths: 12,         // 1 year minimum
            maximumTimelineMonths: 600         // 50 years maximum
        };

        // Risk tolerance to expected return mapping
        this.riskReturnMapping = {
            1: { expectedReturn: 0.04, maxVolatility: 0.08 },  // Conservative
            2: { expectedReturn: 0.05, maxVolatility: 0.10 },  // Very Low Risk
            3: { expectedReturn: 0.06, maxVolatility: 0.12 },  // Low Risk
            4: { expectedReturn: 0.07, maxVolatility: 0.14 },  // Below Average
            5: { expectedReturn: 0.08, maxVolatility: 0.16 },  // Average
            6: { expectedReturn: 0.09, maxVolatility: 0.18 },  // Above Average
            7: { expectedReturn: 0.10, maxVolatility: 0.20 },  // Moderate Risk
            8: { expectedReturn: 0.12, maxVolatility: 0.24 },  // High Risk
            9: { expectedReturn: 0.15, maxVolatility: 0.28 },  // Very High Risk
            10: { expectedReturn: 0.18, maxVolatility: 0.32 }  // Aggressive
        };
    }

    /**
     * 🎯 MAIN FEASIBILITY CHECK
     * Primary entry point for goal feasibility analysis
     */
    async checkGoalFeasibility(goalParams, userProfile = {}) {
        try {
            console.log('🔍 Starting comprehensive goal feasibility analysis...');

            // Validate input parameters
            const validatedParams = await this.validateInputParameters(goalParams);
            const validatedProfile = this.validateUserProfile(userProfile);

            // Calculate required annual return
            const requiredReturn = await this.calculateRequiredReturn(validatedParams);

            // Compare against market reality
            const marketComparison = await this.compareToMarketReturns(
                requiredReturn, 
                validatedParams.riskTolerance
            );

            // Run Monte Carlo simulation for success probability
            const simulationResults = await this.runFeasibilitySimulation(validatedParams);

            // Assess risk alignment
            const riskAssessment = await this.assessRiskAlignment(
                requiredReturn,
                validatedParams.riskTolerance,
                validatedProfile
            );

            // Determine overall feasibility
            const feasibilityDecision = this.determineFeasibility(
                requiredReturn,
                simulationResults,
                marketComparison,
                riskAssessment
            );

            // Generate actionable recommendations
            const recommendations = await this.generateRecommendations(
                feasibilityDecision,
                validatedParams,
                simulationResults,
                marketComparison
            );

            // Calculate confidence level
            const confidenceLevel = this.calculateConfidenceLevel(
                simulationResults,
                marketComparison,
                riskAssessment
            );

            console.log(`✅ Feasibility analysis completed. Goal is ${feasibilityDecision.isFeasible ? 'FEASIBLE' : 'NOT FEASIBLE'}`);

            return {
                isFeasible: feasibilityDecision.isFeasible,
                successProbability: simulationResults.successProbability,
                requiredAnnualReturn: requiredReturn,
                marketAverageReturn: this.marketData.historicalAverageReturn,
                confidenceLevel: confidenceLevel,
                riskAssessment: riskAssessment,
                simulationResults: {
                    totalSimulations: simulationResults.simulationMetrics?.simulationsRun || 0,
                    averageFinalValue: simulationResults.simulationMetrics?.averagePathValue || 0,
                    worstCase: simulationResults.scenarioResults?.pessimistic?.finalValue || 0,
                    bestCase: simulationResults.scenarioResults?.optimistic?.finalValue || 0
                },
                marketComparison: marketComparison,
                feasibilityScore: feasibilityDecision.score,
                recommendations: recommendations,
                metadata: {
                    analysisDate: new Date(),
                    goalParams: validatedParams,
                    userProfile: validatedProfile
                }
            };

        } catch (error) {
            console.error('❌ Feasibility check failed:', error);
            throw new Error(`Goal feasibility analysis failed: ${error.message}`);
        }
    }

    /**
     * 💰 CALCULATE REQUIRED RETURN
     * Determines annual return needed to achieve goal
     */
    async calculateRequiredReturn(goalParams) {
        try {
            const {
                targetAmount,
                timelineMonths,
                monthlyContribution,
                initialInvestment
            } = goalParams;

            console.log('📊 Calculating required annual return...');

            // Adjust target for inflation
            const inflationAdjustedTarget = targetAmount * Math.pow(
                1 + this.marketData.inflationRate, 
                timelineMonths / 12
            );

            // Binary search for required return
            let lowReturn = -0.05; // -5% annual
            let highReturn = 0.30;  // 30% annual
            const tolerance = 0.0001;
            let iterations = 0;
            const maxIterations = 100;

            while (highReturn - lowReturn > tolerance && iterations < maxIterations) {
                const midReturn = (lowReturn + highReturn) / 2;
                const monthlyReturn = midReturn / 12;

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

            const requiredReturn = (lowReturn + highReturn) / 2;

            console.log(`📈 Required annual return: ${(requiredReturn * 100).toFixed(2)}%`);
            
            return requiredReturn;

        } catch (error) {
            console.error('Error calculating required return:', error);
            throw new Error(`Required return calculation failed: ${error.message}`);
        }
    }

    /**
     * 📊 COMPARE TO MARKET RETURNS
     * Compares required return against historical market performance
     */
    async compareToMarketReturns(requiredReturn, riskTolerance) {
        try {
            const userRiskProfile = this.riskReturnMapping[riskTolerance];
            const marketAverage = this.marketData.historicalAverageReturn;
            
            const returnGap = requiredReturn - userRiskProfile.expectedReturn;
            const marketGap = requiredReturn - marketAverage;

            return {
                requiredReturn: requiredReturn,
                userExpectedReturn: userRiskProfile.expectedReturn,
                marketAverageReturn: marketAverage,
                returnGap: returnGap,
                marketGap: marketGap,
                isReasonable: requiredReturn <= userRiskProfile.expectedReturn + 0.02, // 2% buffer
                isAchievable: requiredReturn <= this.feasibilityThresholds.maximumReasonableReturn,
                riskAdjustedAssessment: this.assessReturnReasonableness(requiredReturn, riskTolerance)
            };

        } catch (error) {
            console.error('Error comparing to market returns:', error);
            throw new Error(`Market comparison failed: ${error.message}`);
        }
    }

    /**
     * 🎲 RUN FEASIBILITY SIMULATION
     * Runs Monte Carlo simulation to determine goal achievement probability
     */
    async runFeasibilitySimulation(goalParams) {
        try {
            console.log('🎲 Running Monte Carlo feasibility simulation...');

            const simulator = new MonteCarloGoalSimulation();

            // Prepare simulation parameters
            const simulationParams = {
                targetAmount: goalParams.targetAmount,
                timelineMonths: goalParams.timelineMonths,
                monthlyContribution: goalParams.monthlyContribution,
                initialInvestment: goalParams.initialInvestment,
                inflationRate: this.marketData.inflationRate
            };

            const marketParams = {
                expectedReturn: this.riskReturnMapping[goalParams.riskTolerance].expectedReturn,
                volatility: this.riskReturnMapping[goalParams.riskTolerance].maxVolatility,
                riskFreeRate: this.marketData.riskFreeRate
            };

            // Run the simulation
            const simulationResults = await simulator.simulateGoalAchievement(
                simulationParams,
                marketParams
            );

            console.log(`📊 Simulation completed. Success probability: ${(simulationResults.successProbability * 100).toFixed(1)}%`);

            return simulationResults;

        } catch (error) {
            console.error('Error running feasibility simulation:', error);
            throw new Error(`Monte Carlo simulation failed: ${error.message}`);
        }
    }

    /**
     * ⚖️ ASSESS RISK ALIGNMENT
     * Determines if required risk level matches user's risk tolerance
     */
    async assessRiskAlignment(requiredReturn, riskTolerance, userProfile) {
        try {
            const userRiskProfile = this.riskReturnMapping[riskTolerance];
            const requiredVolatility = this.estimateRequiredVolatility(requiredReturn);

            // Risk capacity assessment based on user profile
            const riskCapacityAdjustments = this.calculateRiskCapacityAdjustments(userProfile);
            const adjustedRiskTolerance = Math.min(10, Math.max(1, riskTolerance + riskCapacityAdjustments));

            const riskMatch = this.determineRiskMatch(
                requiredReturn,
                requiredVolatility,
                riskTolerance,
                adjustedRiskTolerance
            );

            return {
                requiredVolatility: requiredVolatility,
                userRiskTolerance: riskTolerance,
                adjustedRiskTolerance: adjustedRiskTolerance,
                userRiskCapacity: userRiskProfile.maxVolatility,
                riskMatch: riskMatch,
                riskCapacityFactors: riskCapacityAdjustments,
                recommendation: this.getRiskRecommendation(riskMatch, requiredReturn, riskTolerance)
            };

        } catch (error) {
            console.error('Error assessing risk alignment:', error);
            throw new Error(`Risk assessment failed: ${error.message}`);
        }
    }

    /**
     * ✅ DETERMINE FEASIBILITY
     * Makes final feasibility decision based on all factors
     */
    determineFeasibility(requiredReturn, simulationResults, marketComparison, riskAssessment) {
        let score = 0;
        let feasibilityFactors = [];

        // Success probability factor (40% weight)
        if (simulationResults.successProbability >= 0.80) {
            score += 40;
            feasibilityFactors.push('High success probability');
        } else if (simulationResults.successProbability >= 0.70) {
            score += 30;
            feasibilityFactors.push('Adequate success probability');
        } else if (simulationResults.successProbability >= 0.50) {
            score += 15;
            feasibilityFactors.push('Moderate success probability');
        } else {
            feasibilityFactors.push('Low success probability');
        }

        // Return reasonableness factor (30% weight)
        if (marketComparison.isReasonable) {
            score += 30;
            feasibilityFactors.push('Reasonable return expectations');
        } else if (marketComparison.isAchievable) {
            score += 20;
            feasibilityFactors.push('Achievable but aggressive returns');
        } else {
            feasibilityFactors.push('Unrealistic return expectations');
        }

        // Risk alignment factor (20% weight)
        if (riskAssessment.riskMatch === 'excellent') {
            score += 20;
            feasibilityFactors.push('Excellent risk alignment');
        } else if (riskAssessment.riskMatch === 'good') {
            score += 15;
            feasibilityFactors.push('Good risk alignment');
        } else if (riskAssessment.riskMatch === 'fair') {
            score += 10;
            feasibilityFactors.push('Fair risk alignment');
        } else {
            feasibilityFactors.push('Poor risk alignment');
        }

        // Market comparison factor (10% weight)
        if (marketComparison.marketGap <= 0.02) {
            score += 10;
            feasibilityFactors.push('Aligned with market history');
        } else if (marketComparison.marketGap <= 0.05) {
            score += 5;
            feasibilityFactors.push('Slightly above market average');
        } else {
            feasibilityFactors.push('Significantly above market average');
        }

        const isFeasible = score >= 70 && simulationResults.successProbability >= this.feasibilityThresholds.minimumSuccessProbability;

        return {
            isFeasible,
            score,
            feasibilityFactors,
            primaryConcerns: feasibilityFactors.filter(f => 
                f.includes('Low') || f.includes('Poor') || f.includes('Unrealistic')
            )
        };
    }

    /**
     * 💡 GENERATE RECOMMENDATIONS
     * Creates actionable recommendations for goal improvement
     */
    async generateRecommendations(feasibilityDecision, goalParams, simulationResults, marketComparison) {
        const recommendations = [];

        if (!feasibilityDecision.isFeasible) {
            // Timeline extension recommendations
            if (goalParams.timelineMonths < 240) { // Less than 20 years
                const newTimeline = Math.min(360, goalParams.timelineMonths + 60); // Add 5 years, max 30
                const timelineImpact = await this.calculateTimelineImpact(goalParams, newTimeline);
                
                recommendations.push({
                    type: 'extend_timeline',
                    priority: 'HIGH',
                    currentValue: `${Math.round(goalParams.timelineMonths / 12)} years`,
                    suggestedValue: `${Math.round(newTimeline / 12)} years`,
                    impact: `+${Math.round(timelineImpact.successProbabilityIncrease * 100)}% success rate`,
                    reasoning: 'Longer timeline allows for more compound growth and reduces required annual return',
                    implementation: 'Consider extending your investment timeline to improve feasibility'
                });
            }

            // Contribution increase recommendations
            if (simulationResults.successProbability < 0.70) {
                const suggestedIncrease = Math.round(goalParams.monthlyContribution * 0.3);
                const newContribution = goalParams.monthlyContribution + suggestedIncrease;
                
                recommendations.push({
                    type: 'increase_contributions',
                    priority: 'HIGH',
                    currentValue: `$${goalParams.monthlyContribution.toLocaleString()}/month`,
                    suggestedValue: `$${newContribution.toLocaleString()}/month`,
                    impact: 'Significantly improves success probability',
                    reasoning: 'Higher contributions reduce dependence on investment returns',
                    implementation: `Consider increasing monthly contributions by $${suggestedIncrease.toLocaleString()}`
                });
            }

            // Target amount adjustment
            if (marketComparison.marketGap > 0.05) {
                const reducedTarget = Math.round(goalParams.targetAmount * 0.8);
                
                recommendations.push({
                    type: 'reduce_target',
                    priority: 'MEDIUM',
                    currentValue: `$${goalParams.targetAmount.toLocaleString()}`,
                    suggestedValue: `$${reducedTarget.toLocaleString()}`,
                    impact: 'Makes goal more achievable with current parameters',
                    reasoning: 'Reduces required return to more reasonable levels',
                    implementation: 'Consider adjusting target amount to be more realistic'
                });
            }

            // Risk tolerance education
            if (marketComparison.requiredReturn > this.riskReturnMapping[goalParams.riskTolerance].expectedReturn) {
                recommendations.push({
                    type: 'risk_education',
                    priority: 'MEDIUM',
                    currentValue: `Risk tolerance: ${goalParams.riskTolerance}/10`,
                    suggestedValue: 'Consider risk education and assessment',
                    impact: 'May allow for higher expected returns',
                    reasoning: 'Required returns may necessitate higher risk investments',
                    implementation: 'Learn about long-term investing and risk-return tradeoffs'
                });
            }
        } else {
            // Optimization recommendations for feasible goals
            if (simulationResults.successProbability > 0.90) {
                recommendations.push({
                    type: 'optimize_strategy',
                    priority: 'LOW',
                    currentValue: `${Math.round(simulationResults.successProbability * 100)}% success rate`,
                    suggestedValue: 'Consider lower-risk investments',
                    impact: 'Reduce portfolio volatility while maintaining goal achievement',
                    reasoning: 'Goal is highly achievable, allowing for more conservative approach',
                    implementation: 'You may be able to take less risk while still achieving your goal'
                });
            }

            if (marketComparison.marketGap < -0.02) {
                recommendations.push({
                    type: 'additional_goals',
                    priority: 'LOW',
                    currentValue: 'Single investment goal',
                    suggestedValue: 'Consider additional financial goals',
                    impact: 'Maximize financial potential',
                    reasoning: 'Current goal is very achievable with room for additional objectives',
                    implementation: 'Consider setting additional investment goals or increasing target amount'
                });
            }
        }

        // Emergency fund recommendation
        if (!goalParams.hasEmergencyFund) {
            recommendations.push({
                type: 'emergency_fund',
                priority: 'HIGH',
                currentValue: 'No emergency fund',
                suggestedValue: '3-6 months of expenses',
                impact: 'Protects investment plan from unexpected expenses',
                reasoning: 'Emergency fund prevents need to withdraw from investments during market downturns',
                implementation: 'Build emergency fund before increasing investment contributions'
            });
        }

        return recommendations.sort((a, b) => {
            const priorityOrder = { 'HIGH': 1, 'MEDIUM': 2, 'LOW': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }

    /**
     * 📊 CALCULATE CONFIDENCE LEVEL
     * Determines confidence in the feasibility assessment
     */
    calculateConfidenceLevel(simulationResults, marketComparison, riskAssessment) {
        let confidenceScore = 0;

        // Simulation reliability
        if (simulationResults.simulationMetrics?.simulationsRun >= 5000) {
            confidenceScore += 25;
        } else if (simulationResults.simulationMetrics?.simulationsRun >= 1000) {
            confidenceScore += 15;
        }

        // Market data reliability
        if (marketComparison.isReasonable) {
            confidenceScore += 25;
        } else if (marketComparison.isAchievable) {
            confidenceScore += 15;
        }

        // Risk assessment clarity
        if (riskAssessment.riskMatch === 'excellent' || riskAssessment.riskMatch === 'good') {
            confidenceScore += 25;
        } else if (riskAssessment.riskMatch === 'fair') {
            confidenceScore += 15;
        }

        // Success probability clarity
        if (simulationResults.successProbability >= 0.80 || simulationResults.successProbability <= 0.40) {
            confidenceScore += 25; // Clear positive or negative result
        } else {
            confidenceScore += 10; // Borderline results have lower confidence
        }

        if (confidenceScore >= 80) return 'high';
        if (confidenceScore >= 60) return 'medium';
        return 'low';
    }

    // ===========================================
    // UTILITY AND HELPER FUNCTIONS
    // ===========================================

    /**
     * ✅ VALIDATE INPUT PARAMETERS
     */
    async validateInputParameters(goalParams) {
        const errors = [];

        // Required parameters
        if (!goalParams.targetAmount || goalParams.targetAmount <= 0) {
            errors.push('Target amount must be positive');
        }

        if (!goalParams.timelineMonths || goalParams.timelineMonths < this.feasibilityThresholds.minimumTimelineMonths) {
            errors.push(`Timeline must be at least ${this.feasibilityThresholds.minimumTimelineMonths} months`);
        }

        if (goalParams.timelineMonths > this.feasibilityThresholds.maximumTimelineMonths) {
            errors.push(`Timeline cannot exceed ${this.feasibilityThresholds.maximumTimelineMonths} months`);
        }

        if (!goalParams.riskTolerance || goalParams.riskTolerance < 1 || goalParams.riskTolerance > 10) {
            errors.push('Risk tolerance must be between 1 and 10');
        }

        if (goalParams.monthlyContribution < 0) {
            errors.push('Monthly contribution cannot be negative');
        }

        if (goalParams.initialInvestment < 0) {
            errors.push('Initial investment cannot be negative');
        }

        // Business logic validations
        if (goalParams.initialInvestment >= goalParams.targetAmount) {
            errors.push('Target amount must be greater than initial investment');
        }

        if (errors.length > 0) {
            throw new Error(`Parameter validation failed: ${errors.join(', ')}`);
        }

        return {
            targetAmount: parseFloat(goalParams.targetAmount),
            timelineMonths: parseInt(goalParams.timelineMonths),
            monthlyContribution: parseFloat(goalParams.monthlyContribution) || 0,
            initialInvestment: parseFloat(goalParams.initialInvestment) || 0,
            riskTolerance: parseInt(goalParams.riskTolerance),
            hasEmergencyFund: Boolean(goalParams.hasEmergencyFund)
        };
    }

    /**
     * 👤 VALIDATE USER PROFILE
     */
    validateUserProfile(userProfile) {
        return {
            age: userProfile.age || 35,
            investmentExperience: userProfile.investmentExperience || 'intermediate',
            hasEmergencyFund: Boolean(userProfile.hasEmergencyFund),
            currentIncome: userProfile.currentIncome || null,
            dependents: userProfile.dependents || 0
        };
    }

    /**
     * 💵 CALCULATE FUTURE VALUE WITH CONTRIBUTIONS
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
     * 📊 ASSESS RETURN REASONABLENESS
     */
    assessReturnReasonableness(requiredReturn, riskTolerance) {
        const userExpectedReturn = this.riskReturnMapping[riskTolerance].expectedReturn;
        const gap = requiredReturn - userExpectedReturn;

        if (gap <= 0.01) return 'very_reasonable';
        if (gap <= 0.03) return 'reasonable';
        if (gap <= 0.05) return 'aggressive';
        if (gap <= 0.08) return 'very_aggressive';
        return 'unrealistic';
    }

    /**
     * 📈 ESTIMATE REQUIRED VOLATILITY
     */
    estimateRequiredVolatility(requiredReturn) {
        // Simple linear relationship between return and volatility
        // Based on historical market data: Volatility ≈ Return * 1.6
        return Math.min(0.40, Math.max(0.05, requiredReturn * 1.6));
    }

    /**
     * ⚖️ CALCULATE RISK CAPACITY ADJUSTMENTS
     */
    calculateRiskCapacityAdjustments(userProfile) {
        let adjustments = 0;

        // Age-based adjustments
        if (userProfile.age < 30) adjustments += 1;
        else if (userProfile.age > 50) adjustments -= 1;

        // Experience-based adjustments
        if (userProfile.investmentExperience === 'advanced') adjustments += 1;
        else if (userProfile.investmentExperience === 'beginner') adjustments -= 1;

        // Financial stability adjustments
        if (!userProfile.hasEmergencyFund) adjustments -= 1;
        if (userProfile.dependents > 2) adjustments -= 1;

        return adjustments;
    }

    /**
     * 🎯 DETERMINE RISK MATCH
     */
    determineRiskMatch(requiredReturn, requiredVolatility, riskTolerance, adjustedRiskTolerance) {
        const userExpectedReturn = this.riskReturnMapping[riskTolerance].expectedReturn;
        const userMaxVolatility = this.riskReturnMapping[riskTolerance].maxVolatility;

        const returnGap = requiredReturn - userExpectedReturn;
        const volatilityGap = requiredVolatility - userMaxVolatility;

        if (returnGap <= 0.01 && volatilityGap <= 0.02) return 'excellent';
        if (returnGap <= 0.03 && volatilityGap <= 0.04) return 'good';
        if (returnGap <= 0.05 && volatilityGap <= 0.06) return 'fair';
        return 'poor';
    }

    /**
     * 💡 GET RISK RECOMMENDATION
     */
    getRiskRecommendation(riskMatch, requiredReturn, riskTolerance) {
        if (riskMatch === 'excellent' || riskMatch === 'good') {
            return 'Risk tolerance aligns well with goal requirements';
        }

        if (riskMatch === 'fair') {
            return 'Goal may require slightly higher risk than current tolerance';
        }

        return 'Goal requires significantly higher risk than current tolerance. Consider goal adjustments or risk education.';
    }

    /**
     * ⏱️ CALCULATE TIMELINE IMPACT
     */
    async calculateTimelineImpact(originalParams, newTimeline) {
        try {
            // Quick simulation with extended timeline
            const extendedParams = { ...originalParams, timelineMonths: newTimeline };
            const simulator = new MonteCarloGoalSimulation();
            
            const originalSimulation = await simulator.simulateGoalAchievement(originalParams);
            const extendedSimulation = await simulator.simulateGoalAchievement(extendedParams);

            return {
                successProbabilityIncrease: extendedSimulation.successProbability - originalSimulation.successProbability,
                requiredReturnReduction: originalSimulation.requiredAnnualReturn - extendedSimulation.requiredAnnualReturn
            };

        } catch (error) {
            console.error('Error calculating timeline impact:', error);
            return { successProbabilityIncrease: 0.15, requiredReturnReduction: 0.02 }; // Default estimates
        }
    }

    /**
     * 🧪 TEST FEASIBILITY CHECKER
     * Built-in test function
     */
    static async testFeasibilityChecker() {
        console.log('🧪 Testing Feasibility Checker...');

        const checker = new FeasibilityChecker();

        const testGoal = {
            targetAmount: 1000000,
            timelineMonths: 360,      // 30 years
            monthlyContribution: 2000,
            initialInvestment: 10000,
            riskTolerance: 7,
            hasEmergencyFund: true
        };

        const testProfile = {
            age: 35,
            investmentExperience: 'intermediate',
            hasEmergencyFund: true
        };

        try {
            const result = await checker.checkGoalFeasibility(testGoal, testProfile);
            
            console.log('✅ Test Results:');
            console.log(`Is Feasible: ${result.isFeasible}`);
            console.log(`Success Probability: ${(result.successProbability * 100).toFixed(1)}%`);
            console.log(`Required Return: ${(result.requiredAnnualReturn * 100).toFixed(1)}%`);
            console.log(`Confidence Level: ${result.confidenceLevel}`);
            console.log(`Recommendations: ${result.recommendations.length}`);

            return result;

        } catch (error) {
            console.error('❌ Test failed:', error);
            throw error;
        }
    }
}

module.exports = FeasibilityChecker;

// Enable testing when run directly
if (require.main === module) {
    FeasibilityChecker.testFeasibilityChecker()
        .then(result => {
            console.log('🎯 Feasibility Checker test completed successfully!');
            process.exit(0);
        })
        .catch(error => {
            console.error('❌ Test failed:', error);
            process.exit(1);
        });
}
