/**
 * Enhanced Monte Carlo Results Processing and Analysis Engine for Gro App
 * 
 * Processes raw simulation results from both portfolio and stock simulations
 * into meaningful insights and statistical measures.
 * Now supports all advanced models: Jump Diffusion, Stochastic Volatility, 
 * Mean Reversion, Regime Switching, and Fat Tails.
 */

const { v4: uuidv4 } = require('uuid');

class EnhancedMonteCarloResultsProcessor {
    constructor(dbPool) {
        this.db = dbPool;
    }

    /**
     * 📊 ENHANCED PROCESS SIMULATION RESULTS
     * Main function to process both portfolio and stock Monte Carlo results
     */
    async processSimulationResults(rawResults, metadata) {
        try {
            console.log(`📈 Processing ${rawResults.length} enhanced simulation results...`);
            console.log(`🎯 Simulation type: ${metadata.simulationType || 'portfolio'}`);

            // 1. Calculate statistical measures
            const statisticalMeasures = this.calculateEnhancedStatisticalMeasures(rawResults);

            // 2. Generate probability distributions
            const probabilityDistribution = this.generateProbabilityDistribution(rawResults);

            // 3. Calculate comprehensive risk metrics
            const riskMetrics = this.calculateEnhancedRiskMetrics(rawResults, metadata.modelOptions);

            // 4. Analyze advanced model impacts
            const advancedModelAnalysis = this.analyzeAdvancedModelImpacts(rawResults, metadata.modelOptions);

            // 5. Analyze goal achievement (if applicable)
            let goalAnalysis = null;
            if (metadata.targetAmount) {
                goalAnalysis = this.analyzeGoalAchievement(rawResults, metadata.targetAmount);
            }

            // 6. Calculate time-based projections
            const timeBasedProjections = this.calculateTimeBasedProjections(rawResults, metadata);

            // 7. Generate performance percentiles
            const performancePercentiles = this.calculatePercentiles(rawResults);

            // 8. Stress test analysis
            const stressTestSummary = this.analyzeStressTestResults(metadata.stressTestResults);

            // 9. Contribution sensitivity insights (portfolio only)
            let contributionInsights = null;
            if (metadata.simulationType !== 'stock' && metadata.contributionSensitivity) {
                contributionInsights = this.analyzeContributionSensitivity(metadata.contributionSensitivity);
            }

            // 10. Model comparison analysis
            const modelComparison = this.compareModelPerformance(rawResults, metadata.modelOptions);

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
                advancedModelAnalysis,
                goalAnalysis,
                timeBasedProjections,
                performancePercentiles,
                stressTestSummary,
                contributionInsights,
                modelComparison,
                summary: this.generateEnhancedExecutiveSummary(
                    statisticalMeasures, 
                    goalAnalysis, 
                    riskMetrics, 
                    advancedModelAnalysis,
                    metadata
                )
            };

            console.log(`✅ Enhanced results processing completed`);
            return processedResults;

        } catch (error) {
            console.error('Error processing enhanced simulation results:', error);
            throw new Error(`Enhanced results processing failed: ${error.message}`);
        }
    }

    /**
     * 📈 ENHANCED STATISTICAL MEASURES
     * Calculate comprehensive statistical measures including advanced model metrics
     */
    calculateEnhancedStatisticalMeasures(rawResults) {
        const finalValues = rawResults.map(r => r.finalRealValue || r.finalValue || r.finalPrice);
        const returns = rawResults.map(r => r.realReturn || r.totalReturn);
        const drawdowns = rawResults.map(r => r.maxDrawdown);

        const sortedValues = [...finalValues].sort((a, b) => a - b);
        const sortedReturns = [...returns].sort((a, b) => a - b);

        // Base statistical measures
        const baseStats = {
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
                annualized: this.calculateMean(returns) * Math.sqrt(252),
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

        // Enhanced metrics for advanced models
        const enhancedMetrics = this.calculateAdvancedModelStatistics(rawResults);

        return {
            ...baseStats,
            enhancedMetrics
        };
    }

    /**
     * 🧪 CALCULATE ADVANCED MODEL STATISTICS
     * Extract statistics specific to advanced models
     */
    calculateAdvancedModelStatistics(rawResults) {
        const enhancedMetrics = {};

        // Check if we have advanced model data
        const hasJumpData = rawResults.some(r => r.jumpCount !== undefined);
        const hasRegimeData = rawResults.some(r => r.regimeChanges !== undefined);
        const hasTailData = rawResults.some(r => r.tailEvents !== undefined);
        const hasVolData = rawResults.some(r => r.averageVolatility !== undefined);

        if (hasJumpData) {
            const jumpCounts = rawResults.map(r => r.jumpCount || 0);
            enhancedMetrics.jumpStatistics = {
                averageJumps: this.calculateMean(jumpCounts),
                maxJumps: Math.max(...jumpCounts),
                jumpProbability: jumpCounts.filter(c => c > 0).length / jumpCounts.length,
                jumpDistribution: this.createHistogramBins(jumpCounts, 10)
            };
        }

        if (hasRegimeData) {
            const regimeChanges = rawResults.map(r => r.regimeChanges || 0);
            enhancedMetrics.regimeStatistics = {
                averageChanges: this.calculateMean(regimeChanges),
                maxChanges: Math.max(...regimeChanges),
                regimeStability: regimeChanges.filter(r => r <= 2).length / regimeChanges.length,
                changeDistribution: this.createHistogramBins(regimeChanges, 8)
            };
        }

        if (hasTailData) {
            const tailEvents = rawResults.map(r => r.tailEvents || 0);
            enhancedMetrics.tailStatistics = {
                averageTailEvents: this.calculateMean(tailEvents),
                maxTailEvents: Math.max(...tailEvents),
                tailEventProbability: tailEvents.filter(t => t > 0).length / tailEvents.length,
                extremeEventThreshold: this.getPercentile([...tailEvents].sort((a, b) => b - a), 95)
            };
        }

        if (hasVolData) {
            const avgVolatilities = rawResults.map(r => r.averageVolatility || 0);
            enhancedMetrics.volatilityStatistics = {
                averageVolatility: this.calculateMean(avgVolatilities),
                volatilityOfVolatility: this.calculateStandardDeviation(avgVolatilities),
                volatilityRange: Math.max(...avgVolatilities) - Math.min(...avgVolatilities),
                volatilityStability: this.calculateVolatilityStability(avgVolatilities)
            };
        }

        return enhancedMetrics;
    }

    /**
     * ⚠️ ENHANCED RISK METRICS
     * Comprehensive risk analysis including advanced model impacts
     */
    calculateEnhancedRiskMetrics(rawResults, modelOptions = {}) {
        const returns = rawResults.map(r => r.realReturn || r.totalReturn);
        const finalValues = rawResults.map(r => r.finalRealValue || r.finalValue || r.finalPrice);
        const drawdowns = rawResults.map(r => r.maxDrawdown);
        const volatilities = rawResults.map(r => r.volatility || this.calculateStandardDeviation(returns));

        const sortedReturns = [...returns].sort((a, b) => a - b);
        const sortedDrawdowns = [...drawdowns].sort((a, b) => b - a);

        const riskFreeRate = 0.02;
        const expectedReturn = this.calculateMean(returns);
        const returnVolatility = this.calculateStandardDeviation(returns);

        // Base risk metrics
        const baseRiskMetrics = {
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
                treynorRatio: this.calculateTreynorRatio(returns, riskFreeRate)
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

        // Enhanced risk metrics for advanced models
        const enhancedRiskMetrics = this.calculateAdvancedModelRiskMetrics(rawResults, modelOptions);

        return {
            ...baseRiskMetrics,
            ...enhancedRiskMetrics
        };
    }

    /**
     * 🧪 ADVANCED MODEL RISK METRICS
     * Calculate risk metrics specific to advanced models
     */
    calculateAdvancedModelRiskMetrics(rawResults, modelOptions) {
        const enhancedMetrics = {};

        if (modelOptions.useJumpDiffusion) {
            const jumpCounts = rawResults.map(r => r.jumpCount || 0);
            const jumpSims = rawResults.filter(r => (r.jumpCount || 0) > 0);
            const noJumpSims = rawResults.filter(r => (r.jumpCount || 0) === 0);

            enhancedMetrics.jumpRisk = {
                averageJumps: this.calculateMean(jumpCounts),
                maxJumps: Math.max(...jumpCounts),
                jumpProbability: jumpSims.length / rawResults.length,
                jumpImpactOnReturns: this.calculateJumpImpact(jumpSims, noJumpSims),
                jumpSeverity: this.classifyJumpSeverity(jumpCounts)
            };
        }

        if (modelOptions.useRegimeSwitching) {
            const regimeChanges = rawResults.map(r => r.regimeChanges || 0);
            const regimeChangeSims = rawResults.filter(r => (r.regimeChanges || 0) > 0);

            enhancedMetrics.regimeRisk = {
                averageChanges: this.calculateMean(regimeChanges),
                maxChanges: Math.max(...regimeChanges),
                regimeInstability: regimeChanges.filter(r => r > 3).length / regimeChanges.length,
                regimeVolatility: this.calculateRegimeVolatility(regimeChangeSims)
            };
        }

        if (modelOptions.useFatTails) {
            const returns = rawResults.map(r => r.realReturn || r.totalReturn);
            const tailEvents = rawResults.map(r => r.tailEvents || 0);

            enhancedMetrics.tailRisk = {
                extremeEventProbability: tailEvents.filter(t => t > 0).length / tailEvents.length,
                averageTailEvents: this.calculateMean(tailEvents),
                tailExponent: this.estimateTailExponent(returns),
                fatTailAdjustedVaR: this.calculateFatTailVaR(returns),
                tailRiskLevel: this.classifyTailRisk(tailEvents)
            };
        }

        if (modelOptions.useStochasticVolatility) {
            const avgVols = rawResults.map(r => r.averageVolatility || 0).filter(v => v > 0);
            
            if (avgVols.length > 0) {
                enhancedMetrics.volatilityRisk = {
                    averageVolatility: this.calculateMean(avgVols),
                    volatilityVolatility: this.calculateStandardDeviation(avgVols),
                    volatilityMeanReversion: this.calculateVolatilityMeanReversion(avgVols),
                    volatilityPersistence: this.calculateVolatilityPersistence(avgVols)
                };
            }
        }

        if (modelOptions.useMeanReversion) {
            const returns = rawResults.map(r => r.realReturn || r.totalReturn);
            enhancedMetrics.meanReversionRisk = {
                reversionStrength: this.calculateMeanReversionStrength(returns),
                reversionHalfLife: this.calculateReversionHalfLife(returns),
                reversionStability: this.calculateReversionStability(returns)
            };
        }

        return enhancedMetrics;
    }

    /**
     * 🧪 ANALYZE ADVANCED MODEL IMPACTS
     * Comprehensive analysis of how advanced models affect results
     */
    analyzeAdvancedModelImpacts(rawResults, modelOptions = {}) {
        const analysis = {};

        if (modelOptions.useJumpDiffusion) {
            const jumpStats = rawResults.map(r => r.jumpCount || 0);
            const jumpImpact = this.calculateJumpImpactAnalysis(rawResults);
            
            analysis.jumpDiffusionImpact = {
                description: 'Jump diffusion captures sudden market shocks and price gaps',
                frequency: `${(jumpStats.filter(j => j > 0).length / jumpStats.length * 100).toFixed(1)}% of simulations had jumps`,
                averageJumpsPerPath: this.calculateMean(jumpStats).toFixed(2),
                returnImpact: jumpImpact.averageImpact,
                riskContribution: jumpImpact.riskContribution,
                recommendation: this.generateJumpRecommendation(jumpStats, jumpImpact)
            };
        }

        if (modelOptions.useStochasticVolatility) {
            const volStats = rawResults.map(r => r.averageVolatility || 0).filter(v => v > 0);
            const volImpact = this.calculateVolatilityImpactAnalysis(volStats);
            
            analysis.stochasticVolatilityImpact = {
                description: 'Time-varying volatility creates more realistic risk patterns',
                volatilityRange: volStats.length > 0 ? `${(Math.min(...volStats) * 100).toFixed(1)}% - ${(Math.max(...volStats) * 100).toFixed(1)}%` : 'N/A',
                persistence: volImpact.persistence,
                clustering: volImpact.clustering,
                riskImprovement: volImpact.riskImprovement,
                recommendation: this.generateVolatilityRecommendation(volImpact)
            };
        }

        if (modelOptions.useMeanReversion) {
            const returns = rawResults.map(r => r.realReturn || r.totalReturn);
            const reversionImpact = this.calculateMeanReversionImpact(returns);
            
            analysis.meanReversionImpact = {
                description: 'Mean reversion reduces extreme long-term scenarios',
                reversionStrength: reversionImpact.strength,
                stabilizationEffect: reversionImpact.stabilization,
                longTermBenefit: reversionImpact.longTermBenefit,
                recommendation: this.generateMeanReversionRecommendation(reversionImpact)
            };
        }

        if (modelOptions.useRegimeSwitching) {
            const regimeStats = rawResults.map(r => r.regimeChanges || 0);
            const regimeImpact = this.calculateRegimeImpactAnalysis(rawResults);
            
            analysis.regimeSwitchingImpact = {
                description: 'Market regimes create clustering of performance periods',
                averageChanges: this.calculateMean(regimeStats).toFixed(1),
                stabilityPeriods: regimeImpact.stabilityPeriods,
                volatilityClustering: regimeImpact.volatilityClustering,
                diversificationNeed: regimeImpact.diversificationNeed,
                recommendation: this.generateRegimeRecommendation(regimeImpact)
            };
        }

        if (modelOptions.useFatTails) {
            const tailStats = rawResults.map(r => r.tailEvents || 0);
            const tailImpact = this.calculateFatTailImpactAnalysis(rawResults);
            
            analysis.fatTailsImpact = {
                description: 'Fat tails increase probability of extreme events',
                extremeEventFrequency: `${(tailStats.filter(t => t > 0).length / tailStats.length * 100).toFixed(1)}% of paths`,
                riskUnderestimation: tailImpact.riskUnderestimation,
                capitalRequirement: tailImpact.capitalRequirement,
                hedgingNeed: tailImpact.hedgingNeed,
                recommendation: this.generateFatTailRecommendation(tailImpact)
            };
        }

        return analysis;
    }

    /**
     * 📊 COMPARE MODEL PERFORMANCE
     * Analyze differences between models
     */
    compareModelPerformance(rawResults, modelOptions) {
        const comparison = {
            modelComplexity: this.assessModelComplexity(modelOptions),
            computationalImpact: this.assessComputationalImpact(modelOptions),
            riskEstimationAccuracy: this.assessRiskAccuracy(rawResults, modelOptions),
            practicalRecommendations: this.generateModelRecommendations(modelOptions)
        };

        return comparison;
    }

    /**
     * 📝 ENHANCED EXECUTIVE SUMMARY
     * Create comprehensive summary including advanced model insights
     */
    generateEnhancedExecutiveSummary(statisticalMeasures, goalAnalysis, riskMetrics, advancedModelAnalysis, metadata) {
        const expectedReturn = statisticalMeasures.returns.mean;
        const successProbability = goalAnalysis?.successProbability || null;
        const sharpeRatio = riskMetrics.riskAdjustedReturns.sharpeRatio;
        const maxDrawdown = riskMetrics.drawdownMetrics.worstDrawdown;

        // Enhanced assessment including advanced models
        const overallAssessment = this.classifyEnhancedPortfolioPerformance(
            successProbability, 
            sharpeRatio, 
            advancedModelAnalysis,
            metadata.modelOptions
        );

        const summary = {
            overallAssessment,
            keyMetrics: {
                goalAchievementProbability: successProbability,
                expectedAnnualReturn: expectedReturn,
                riskAdjustedReturn: sharpeRatio,
                maximumDrawdown: maxDrawdown,
                volatility: riskMetrics.volatilityMetrics.annualizedVolatility
            },
            advancedModelInsights: this.summarizeAdvancedModelInsights(advancedModelAnalysis),
            riskLevel: this.classifyEnhancedRiskLevel(riskMetrics, metadata.modelOptions),
            confidence: this.calculateEnhancedConfidenceLevel(statisticalMeasures, goalAnalysis, metadata.modelOptions),
            primaryRecommendations: this.generateEnhancedPrimaryRecommendations(
                goalAnalysis, 
                riskMetrics, 
                advancedModelAnalysis,
                metadata
            )
        };

        return summary;
    }

    // ===========================================
    // ENHANCED ANALYSIS HELPER FUNCTIONS
    // ===========================================

    calculateJumpImpact(jumpSims, noJumpSims) {
        if (jumpSims.length === 0 || noJumpSims.length === 0) return 0;
        
        const jumpAvgReturn = this.calculateMean(jumpSims.map(r => r.realReturn || r.totalReturn));
        const noJumpAvgReturn = this.calculateMean(noJumpSims.map(r => r.realReturn || r.totalReturn));
        
        return jumpAvgReturn - noJumpAvgReturn;
    }

    calculateJumpImpactAnalysis(rawResults) {
        const jumpSims = rawResults.filter(r => (r.jumpCount || 0) > 0);
        const noJumpSims = rawResults.filter(r => (r.jumpCount || 0) === 0);
        
        if (jumpSims.length === 0 || noJumpSims.length === 0) {
            return { averageImpact: 0, riskContribution: 0 };
        }

        const jumpReturns = jumpSims.map(r => r.realReturn || r.totalReturn);
        const noJumpReturns = noJumpSims.map(r => r.realReturn || r.totalReturn);
        
        const averageImpact = this.calculateMean(jumpReturns) - this.calculateMean(noJumpReturns);
        const riskContribution = this.calculateStandardDeviation(jumpReturns) / this.calculateStandardDeviation(noJumpReturns) - 1;
        
        return { averageImpact, riskContribution };
    }

    calculateVolatilityImpactAnalysis(volStats) {
        if (volStats.length === 0) return { persistence: 0, clustering: 0, riskImprovement: 0 };

        const persistence = this.calculateVolatilityPersistence(volStats);
        const clustering = this.calculateVolatilityClustering(volStats);
        const riskImprovement = this.calculateStandardDeviation(volStats) / this.calculateMean(volStats);

        return { persistence, clustering, riskImprovement };
    }

    calculateMeanReversionImpact(returns) {
        const strength = this.calculateMeanReversionStrength(returns);
        const stabilization = this.calculateStandardDeviation(returns);
        const longTermBenefit = Math.max(0, 1 - stabilization);

        return { strength, stabilization, longTermBenefit };
    }

    calculateRegimeImpactAnalysis(rawResults) {
        const regimeChanges = rawResults.map(r => r.regimeChanges || 0);
        const returns = rawResults.map(r => r.realReturn || r.totalReturn);
        
        const stabilityPeriods = regimeChanges.filter(r => r <= 1).length / regimeChanges.length;
        const volatilityClustering = this.calculateVolatilityClustering(returns);
        const diversificationNeed = Math.min(1, this.calculateMean(regimeChanges) / 3);

        return { stabilityPeriods, volatilityClustering, diversificationNeed };
    }

    calculateFatTailImpactAnalysis(rawResults) {
        const returns = rawResults.map(r => r.realReturn || r.totalReturn);
        const tailEvents = rawResults.map(r => r.tailEvents || 0);
        
        const normalVaR = this.getPercentile([...returns].sort((a, b) => a - b), 5);
        const fatTailVaR = this.calculateFatTailVaR(returns);
        
        const riskUnderestimation = Math.abs(fatTailVaR - normalVaR) / Math.abs(normalVaR);
        const capitalRequirement = Math.max(0, riskUnderestimation);
        const hedgingNeed = this.calculateMean(tailEvents) / Math.max(...tailEvents);

        return { riskUnderestimation, capitalRequirement, hedgingNeed };
    }

    // ===========================================
    // ADVANCED MODEL CLASSIFICATION FUNCTIONS
    // ===========================================

    classifyJumpSeverity(jumpCounts) {
        const avgJumps = this.calculateMean(jumpCounts);
        if (avgJumps > 50) return 'Very High';
        if (avgJumps > 20) return 'High';
        if (avgJumps > 10) return 'Moderate';
        if (avgJumps > 5) return 'Low';
        return 'Very Low';
    }

    classifyTailRisk(tailEvents) {
        const avgTailEvents = this.calculateMean(tailEvents);
        if (avgTailEvents > 10) return 'High';
        if (avgTailEvents > 5) return 'Medium';
        if (avgTailEvents > 2) return 'Low';
        return 'Minimal';
    }

    classifyEnhancedPortfolioPerformance(successProbability, sharpeRatio, advancedModelAnalysis, modelOptions) {
        let baseClassification = this.classifyPortfolioPerformance(successProbability, sharpeRatio);
        
        // Adjust based on advanced model impacts
        let adjustmentFactor = 0;
        
        if (modelOptions.useJumpDiffusion && advancedModelAnalysis.jumpDiffusionImpact) {
            adjustmentFactor -= 0.1; // Jumps typically worsen outlook
        }
        
        if (modelOptions.useFatTails && advancedModelAnalysis.fatTailsImpact) {
            adjustmentFactor -= 0.1; // Fat tails increase risk
        }
        
        if (modelOptions.useMeanReversion && advancedModelAnalysis.meanReversionImpact) {
            adjustmentFactor += 0.1; // Mean reversion improves long-term outlook
        }

        // Return adjusted classification
        const classifications = ['Poor', 'Marginal', 'Acceptable', 'Good', 'Excellent'];
        const currentIndex = classifications.indexOf(baseClassification);
        const adjustedIndex = Math.max(0, Math.min(4, currentIndex + Math.round(adjustmentFactor * 2)));
        
        return classifications[adjustedIndex];
    }

    classifyEnhancedRiskLevel(riskMetrics, modelOptions) {
        const baseRiskLevel = this.classifyRiskLevel(
            riskMetrics.volatilityMetrics.annualizedVolatility, 
            riskMetrics.drawdownMetrics.worstDrawdown
        );
        
        // Adjust for advanced model risks
        let riskAdjustment = 0;
        
        if (modelOptions.useJumpDiffusion && riskMetrics.jumpRisk) {
            riskAdjustment += riskMetrics.jumpRisk.jumpProbability * 0.5;
        }
        
        if (modelOptions.useFatTails && riskMetrics.tailRisk) {
            riskAdjustment += riskMetrics.tailRisk.extremeEventProbability * 0.3;
        }

        const riskLevels = ['Low', 'Moderate', 'High', 'Very High'];
        const currentIndex = riskLevels.indexOf(baseRiskLevel);
        const adjustedIndex = Math.min(3, currentIndex + Math.round(riskAdjustment * 2));
        
        return riskLevels[adjustedIndex];
    }

    // ===========================================
    // RECOMMENDATION GENERATORS
    // ===========================================

    generateJumpRecommendation(jumpStats, jumpImpact) {
        const avgJumps = this.calculateMean(jumpStats);
        if (avgJumps > 20) {
            return 'High jump frequency detected. Consider protective strategies and position sizing limits.';
        } else if (avgJumps > 10) {
            return 'Moderate jump risk. Monitor market volatility and maintain diversification.';
        }
        return 'Low jump risk. Current strategy appears appropriate for market conditions.';
    }

    generateVolatilityRecommendation(volImpact) {
        if (volImpact.persistence > 0.7) {
            return 'High volatility persistence. Consider dynamic hedging strategies.';
        } else if (volImpact.clustering > 0.5) {
            return 'Volatility clustering detected. Time diversification and tactical rebalancing recommended.';
        }
        return 'Volatility patterns normal. Continue with current risk management approach.';
    }

    generateMeanReversionRecommendation(reversionImpact) {
        if (reversionImpact.strength > 0.3) {
            return 'Strong mean reversion benefits long-term strategies. Consider extending time horizons.';
        }
        return 'Moderate mean reversion effects. Balanced approach between momentum and reversion strategies.';
    }

    generateRegimeRecommendation(regimeImpact) {
        if (regimeImpact.diversificationNeed > 0.7) {
            return 'High regime instability. Increase diversification across asset classes and strategies.';
        }
        return 'Moderate regime switching. Maintain flexible allocation with periodic reviews.';
    }

    generateFatTailRecommendation(tailImpact) {
        if (tailImpact.riskUnderestimation > 0.3) {
            return 'Significant tail risk detected. Increase capital buffers and consider tail risk hedging.';
        }
        return 'Moderate tail risk. Standard risk management practices should be sufficient.';
    }

    // ===========================================
    // ENHANCED UTILITY FUNCTIONS
    // ===========================================

    calculateVolatilityStability(volatilities) {
        if (volatilities.length < 2) return 1;
        const cv = this.calculateStandardDeviation(volatilities) / this.calculateMean(volatilities);
        return Math.max(0, 1 - cv);
    }

    calculateVolatilityPersistence(volatilities) {
        if (volatilities.length < 2) return 0;
        
        let persistence = 0;
        for (let i = 1; i < volatilities.length; i++) {
            const correlation = (volatilities[i] - this.calculateMean(volatilities)) * 
                              (volatilities[i-1] - this.calculateMean(volatilities));
            persistence += correlation;
        }
        
        return persistence / (volatilities.length - 1);
    }

    calculateVolatilityClustering(data) {
        if (data.length < 3) return 0;
        
        const absReturns = data.map(r => Math.abs(r));
        let clustering = 0;
        
        for (let i = 2; i < absReturns.length; i++) {
            if ((absReturns[i] > this.calculateMean(absReturns)) && 
                (absReturns[i-1] > this.calculateMean(absReturns))) {
                clustering++;
            }
        }
        
        return clustering / (data.length - 2);
    }

    calculateMeanReversionStrength(returns) {
        if (returns.length < 10) return 0;
        
        const mean = this.calculateMean(returns);
        let reversionSum = 0;
        
        for (let i = 1; i < returns.length; i++) {
            const deviation = returns[i-1] - mean;
            const nextMove = returns[i] - returns[i-1];
            reversionSum += -(deviation * nextMove);
        }
        
        return Math.max(0, reversionSum / (returns.length - 1));
    }

    calculateReversionHalfLife(returns) {
        const strength = this.calculateMeanReversionStrength(returns);
        return strength > 0 ? Math.log(0.5) / Math.log(1 - strength) : Infinity;
    }

    calculateReversionStability(returns) {
        const strength = this.calculateMeanReversionStrength(returns);
        return Math.min(1, strength);
    }

    calculateRegimeVolatility(regimeChangeSims) {
        if (regimeChangeSims.length === 0) return 0;
        
        const volatilities = regimeChangeSims.map(r => r.volatility || 0);
        return this.calculateMean(volatilities);
    }

    estimateTailExponent(returns) {
        const sortedReturns = [...returns].sort((a, b) => Math.abs(b) - Math.abs(a));
        const k = Math.floor(returns.length * 0.05);
        
        if (k < 2) return 3;
        
        const logReturns = sortedReturns.slice(0, k).map(r => Math.log(Math.abs(r)));
        const meanLogReturn = logReturns.reduce((sum, lr) => sum + lr, 0) / logReturns.length;
        
        return 1 / meanLogReturn;
    }

    calculateFatTailVaR(returns, alpha = 0.05) {
        const sortedReturns = [...returns].sort((a, b) => a - b);
        return this.getPercentile(sortedReturns, alpha * 100);
    }

    calculateEnhancedConfidenceLevel(statisticalMeasures, goalAnalysis, modelOptions) {
        const baseConfidence = this.calculateConfidenceLevel(statisticalMeasures, goalAnalysis);
        
        // Adjust confidence based on model sophistication
        let modelAdjustment = 0;
        const modelCount = Object.values(modelOptions || {}).filter(Boolean).length;
        modelAdjustment = Math.min(0.1, modelCount * 0.02); // Up to 10% boost for using advanced models
        
        return Math.min(0.99, baseConfidence + modelAdjustment);
    }

    summarizeAdvancedModelInsights(advancedModelAnalysis) {
        const insights = [];
        
        Object.entries(advancedModelAnalysis).forEach(([model, analysis]) => {
            if (analysis.recommendation) {
                insights.push({
                    model: model.replace('Impact', '').replace(/([A-Z])/g, ' $1').trim(),
                    keyInsight: analysis.description,
                    recommendation: analysis.recommendation
                });
            }
        });
        
        return insights;
    }

    assessModelComplexity(modelOptions) {
        const activeModels = Object.values(modelOptions || {}).filter(Boolean).length;
        if (activeModels >= 4) return 'Very High';
        if (activeModels >= 3) return 'High';
        if (activeModels >= 2) return 'Moderate';
        if (activeModels >= 1) return 'Low';
        return 'Basic';
    }

    assessComputationalImpact(modelOptions) {
        const computationalWeights = {
            useJumpDiffusion: 1,
            useStochasticVolatility: 3,
            useMeanReversion: 1,
            useRegimeSwitching: 2,
            useFatTails: 2
        };
        
        const totalWeight = Object.entries(modelOptions || {})
            .filter(([_, enabled]) => enabled)
            .reduce((sum, [model, _]) => sum + (computationalWeights[model] || 0), 0);
        
        if (totalWeight >= 8) return 'Very High';
        if (totalWeight >= 6) return 'High';
        if (totalWeight >= 4) return 'Moderate';
        if (totalWeight >= 2) return 'Low';
        return 'Minimal';
    }

    assessRiskAccuracy(rawResults, modelOptions) {
        const activeModels = Object.values(modelOptions || {}).filter(Boolean).length;
        const dataQuality = rawResults.length >= 5000 ? 'High' : rawResults.length >= 1000 ? 'Medium' : 'Low';
        
        if (activeModels >= 3 && dataQuality === 'High') return 'Excellent';
        if (activeModels >= 2 && dataQuality !== 'Low') return 'Good';
        if (activeModels >= 1) return 'Adequate';
        return 'Basic';
    }

    generateModelRecommendations(modelOptions) {
        const recommendations = [];
        
        const activeModels = Object.values(modelOptions || {}).filter(Boolean).length;
        
        if (activeModels === 0) {
            recommendations.push('Consider adding advanced models for more realistic risk assessment');
        } else if (activeModels >= 4) {
            recommendations.push('High model complexity - ensure computational resources are adequate');
        }
        
        if (modelOptions.useJumpDiffusion && modelOptions.useFatTails) {
            recommendations.push('Jump diffusion and fat tails together provide comprehensive tail risk modeling');
        }
        
        if (modelOptions.useStochasticVolatility && !modelOptions.useRegimeSwitching) {
            recommendations.push('Consider adding regime switching to complement stochastic volatility');
        }
        
        return recommendations;
    }

    generateEnhancedPrimaryRecommendations(goalAnalysis, riskMetrics, advancedModelAnalysis, metadata) {
        const recommendations = [];
        
        // Base recommendations
        if (goalAnalysis && goalAnalysis.successProbability < 0.7) {
            recommendations.push('Consider increasing monthly contributions or extending timeline');
        }
        
        if (riskMetrics.riskAdjustedReturns.sharpeRatio < 0.8) {
            recommendations.push('Portfolio efficiency could be improved through optimization');
        }
        
        if (riskMetrics.drawdownMetrics.worstDrawdown > 0.25) {
            recommendations.push('Consider reducing portfolio risk to limit potential losses');
        }
        
        // Advanced model recommendations
        if (riskMetrics.jumpRisk && riskMetrics.jumpRisk.jumpProbability > 0.3) {
            recommendations.push('High jump risk detected - consider protective strategies');
        }
        
        if (riskMetrics.tailRisk && riskMetrics.tailRisk.extremeEventProbability > 0.2) {
            recommendations.push('Significant tail risk - maintain adequate capital buffers');
        }
        
        if (riskMetrics.volatilityRisk && riskMetrics.volatilityRisk.volatilityVolatility > 0.1) {
            recommendations.push('High volatility uncertainty - consider dynamic hedging');
        }
        
        return recommendations;
    }

    // ===========================================
    // INHERITED UTILITY FUNCTIONS (keeping all existing ones)
    // ===========================================

    calculateMean(values) {
        return values.reduce((sum, val) => sum + val, 0) / values.length;
    }

    calculateStandardDeviation(values) {
        if (values.length < 2) return 0;
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

    // Include all other existing methods from the original results.js...
    generateProbabilityDistribution(rawResults) {
        const finalValues = rawResults.map(r => r.finalRealValue || r.finalValue || r.finalPrice);
        const returns = rawResults.map(r => r.realReturn || r.totalReturn);

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

    analyzeGoalAchievement(rawResults, targetAmount) {
        if (!targetAmount) {
            return { error: 'Target amount not provided for goal analysis' };
        }

        const finalValues = rawResults.map(r => r.finalRealValue || r.finalValue || r.finalPrice);
        const successfulSimulations = finalValues.filter(value => value >= targetAmount);
        const failedSimulations = finalValues.filter(value => value < targetAmount);

        const successProbability = successfulSimulations.length / finalValues.length;
        const sortedValues = [...finalValues].sort((a, b) => a - b);

        const shortfalls = failedSimulations.map(value => targetAmount - value);
        const shortfallProbability = failedSimulations.length / finalValues.length;

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

    calculateTimeBasedProjections(rawResults, metadata) {
        if (!rawResults[0].path) {
            return { error: 'Path data not available for time-based analysis' };
        }

        const timeHorizonMonths = metadata.timeHorizonMonths || metadata.timeHorizonDays / 30 || 12;
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

    calculatePercentiles(rawResults) {
        const finalValues = rawResults.map(r => r.finalRealValue || r.finalValue || r.finalPrice);
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

    // Include all remaining helper methods...
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

module.exports = EnhancedMonteCarloResultsProcessor;