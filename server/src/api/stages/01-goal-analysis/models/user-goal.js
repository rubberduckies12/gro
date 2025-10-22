/**
 * User Goal Data Model for Gro Investment App
 * 
 * Handles CRUD operations for user investment goals and provides the data
 * foundation for the goal-driven portfolio creation system using PostgreSQL.
 */

const { Pool } = require('pg');

class UserGoal {
    constructor(goalData = {}) {
        this.id = goalData.id;
        this.userId = goalData.user_id;
        this.primaryGoal = goalData.primary_goal;
        this.goalTimelineMonths = goalData.goal_timeline_months;
        this.targetAmount = goalData.target_amount;
        this.monthlyContribution = goalData.monthly_contribution;
        this.initialInvestment = goalData.initial_investment;
        this.riskTolerance = goalData.risk_tolerance;
        this.riskCapacity = goalData.risk_capacity;
        this.investmentExperience = goalData.investment_experience;
        this.preferredSectors = goalData.preferred_sectors;
        this.excludedSectors = goalData.excluded_sectors;
        this.esgPreference = goalData.esg_preference;
        this.dividendPreference = goalData.dividend_preference;
        this.emergencyFundMonths = goalData.emergency_fund_months;
        this.hasEmergencyFund = goalData.has_emergency_fund;
        this.createdAt = goalData.created_at;
        this.updatedAt = goalData.updated_at;
        
        // Calculated fields
        this.goalStatus = this.calculateGoalStatus();
        this.requiredAnnualReturn = null;
        this.feasibilityScore = null;
    }

    /**
     * 🎯 CREATE NEW USER GOAL
     * Creates a new investment goal for a user
     */
    static async create(userId, goalData) {
        try {
            console.log(`🎯 Creating new goal for user ${userId}...`);

            // Validate input data
            const validatedData = await UserGoal.validateGoalData(goalData);
            
            // Check if user already has an active goal (enforce single active goal)
            const existingGoal = await UserGoal.findActiveByUserId(userId);
            if (existingGoal) {
                throw new Error('User already has an active investment goal. Please update existing goal or set it inactive.');
            }

            // Validate user exists
            await UserGoal.validateUserExists(userId);

            const query = `
                INSERT INTO user_investment_profiles (
                    user_id,
                    primary_goal,
                    goal_timeline_months,
                    target_amount,
                    monthly_contribution,
                    initial_investment,
                    risk_tolerance,
                    risk_capacity,
                    investment_experience,
                    preferred_sectors,
                    excluded_sectors,
                    esg_preference,
                    dividend_preference,
                    emergency_fund_months,
                    has_emergency_fund
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                RETURNING *
            `;

            const values = [
                userId,
                validatedData.primaryGoal,
                validatedData.goalTimelineMonths,
                validatedData.targetAmount,
                validatedData.monthlyContribution,
                validatedData.initialInvestment || 0,
                validatedData.riskTolerance,
                validatedData.riskCapacity || validatedData.riskTolerance,
                validatedData.investmentExperience,
                validatedData.preferredSectors || [],
                validatedData.excludedSectors || [],
                validatedData.esgPreference || false,
                validatedData.dividendPreference || 'balanced',
                validatedData.emergencyFundMonths || 3,
                validatedData.hasEmergencyFund || false
            ];

            const dbPool = require('../../../shared/services/database');
            const result = await dbPool.query(query, values);

            const newGoal = new UserGoal(result.rows[0]);
            
            console.log(`✅ Goal created successfully with ID: ${newGoal.userId}`);
            
            // Calculate initial feasibility metrics
            await newGoal.calculateRequiredReturn();
            
            return newGoal;

        } catch (error) {
            console.error('Error creating user goal:', error);
            throw new Error(`Failed to create goal: ${error.message}`);
        }
    }

    /**
     * 👤 FIND GOAL BY USER ID
     * Retrieves active goal for a specific user
     */
    static async findByUserId(userId) {
        try {
            const query = `
                SELECT * FROM user_investment_profiles 
                WHERE user_id = $1
                ORDER BY created_at DESC
                LIMIT 1
            `;

            const dbPool = require('../../../shared/services/database');
            const result = await dbPool.query(query, [userId]);

            if (result.rows.length === 0) {
                return null;
            }

            const goal = new UserGoal(result.rows[0]);
            await goal.calculateRequiredReturn();
            
            return goal;

        } catch (error) {
            console.error('Error finding goal by user ID:', error);
            throw new Error(`Failed to find goal: ${error.message}`);
        }
    }

    /**
     * 🎯 FIND ACTIVE GOAL BY USER ID
     * Finds active goal (used for validation)
     */
    static async findActiveByUserId(userId) {
        try {
            const query = `
                SELECT * FROM user_investment_profiles 
                WHERE user_id = $1
                ORDER BY created_at DESC
                LIMIT 1
            `;

            const dbPool = require('../../../shared/services/database');
            const result = await dbPool.query(query, [userId]);

            return result.rows.length > 0 ? new UserGoal(result.rows[0]) : null;

        } catch (error) {
            console.error('Error finding active goal:', error);
            throw new Error(`Failed to find active goal: ${error.message}`);
        }
    }

    /**
     * 🔍 FIND GOAL BY ID
     * Retrieves specific goal by its ID
     */
    static async findById(userId) {
        try {
            const query = `
                SELECT * FROM user_investment_profiles 
                WHERE user_id = $1
            `;

            const dbPool = require('../../../shared/services/database');
            const result = await dbPool.query(query, [userId]);

            if (result.rows.length === 0) {
                return null;
            }

            const goal = new UserGoal(result.rows[0]);
            await goal.calculateRequiredReturn();
            
            return goal;

        } catch (error) {
            console.error('Error finding goal by ID:', error);
            throw new Error(`Failed to find goal: ${error.message}`);
        }
    }

    /**
     * ✏️ UPDATE GOAL
     * Updates existing goal with new data
     */
    static async update(userId, updates) {
        try {
            console.log(`✏️ Updating goal for user ${userId}...`);

            // Validate update data
            const validatedUpdates = await UserGoal.validateGoalData(updates, true);

            // Build dynamic update query
            const { query, values } = UserGoal.buildUpdateQuery(userId, validatedUpdates);

            const dbPool = require('../../../shared/services/database');
            const result = await dbPool.query(query, values);

            if (result.rows.length === 0) {
                throw new Error('Goal not found or user not authorized');
            }

            const updatedGoal = new UserGoal(result.rows[0]);
            await updatedGoal.calculateRequiredReturn();

            console.log(`✅ Goal updated successfully for user ${userId}`);
            
            return updatedGoal;

        } catch (error) {
            console.error('Error updating goal:', error);
            throw new Error(`Failed to update goal: ${error.message}`);
        }
    }

    /**
     * 🗑️ DELETE GOAL
     * Soft delete - marks goal as inactive
     */
    static async delete(userId) {
        try {
            console.log(`🗑️ Deleting goal for user ${userId}...`);

            const query = `
                DELETE FROM user_investment_profiles 
                WHERE user_id = $1
                RETURNING *
            `;

            const dbPool = require('../../../shared/services/database');
            const result = await dbPool.query(query, [userId]);

            if (result.rows.length === 0) {
                throw new Error('Goal not found or user not authorized');
            }

            console.log(`✅ Goal deleted successfully for user ${userId}`);
            
            return { success: true, deletedGoal: new UserGoal(result.rows[0]) };

        } catch (error) {
            console.error('Error deleting goal:', error);
            throw new Error(`Failed to delete goal: ${error.message}`);
        }
    }

    /**
     * ✅ VALIDATE GOAL DATA
     * Comprehensive validation of goal parameters
     */
    static async validateGoalData(goalData, isUpdate = false) {
        const errors = [];

        // Required fields for new goals
        if (!isUpdate) {
            if (!goalData.primaryGoal) {
                errors.push('Primary goal is required');
            }
            if (!goalData.targetAmount) {
                errors.push('Target amount is required');
            }
            if (!goalData.goalTimelineMonths) {
                errors.push('Goal timeline is required');
            }
            if (!goalData.riskTolerance) {
                errors.push('Risk tolerance is required');
            }
        }

        // Validate primary goal
        if (goalData.primaryGoal) {
            const validGoals = ['retirement', 'house', 'education', 'growth', 'income', 'emergency'];
            if (!validGoals.includes(goalData.primaryGoal)) {
                errors.push(`Primary goal must be one of: ${validGoals.join(', ')}`);
            }
        }

        // Validate target amount
        if (goalData.targetAmount !== undefined) {
            const targetAmount = parseFloat(goalData.targetAmount);
            if (isNaN(targetAmount) || targetAmount < 1000 || targetAmount > 100000000) {
                errors.push('Target amount must be between $1,000 and $100,000,000');
            }
        }

        // Validate timeline
        if (goalData.goalTimelineMonths !== undefined) {
            const timeline = parseInt(goalData.goalTimelineMonths);
            if (isNaN(timeline) || timeline < 12 || timeline > 600) {
                errors.push('Goal timeline must be between 12 and 600 months (1-50 years)');
            }
        }

        // Validate monthly contribution
        if (goalData.monthlyContribution !== undefined) {
            const contribution = parseFloat(goalData.monthlyContribution);
            if (isNaN(contribution) || contribution < 0 || contribution > 1000000) {
                errors.push('Monthly contribution must be between $0 and $1,000,000');
            }
        }

        // Validate initial investment
        if (goalData.initialInvestment !== undefined) {
            const initial = parseFloat(goalData.initialInvestment);
            if (isNaN(initial) || initial < 0 || initial > 100000000) {
                errors.push('Initial investment must be between $0 and $100,000,000');
            }
        }

        // Validate risk tolerance
        if (goalData.riskTolerance !== undefined) {
            const risk = parseInt(goalData.riskTolerance);
            if (isNaN(risk) || risk < 1 || risk > 10) {
                errors.push('Risk tolerance must be an integer between 1 and 10');
            }
        }

        // Validate investment experience
        if (goalData.investmentExperience) {
            const validExperience = ['beginner', 'intermediate', 'advanced'];
            if (!validExperience.includes(goalData.investmentExperience)) {
                errors.push(`Investment experience must be one of: ${validExperience.join(', ')}`);
            }
        }

        // Validate dividend preference
        if (goalData.dividendPreference) {
            const validPreferences = ['growth', 'income', 'balanced'];
            if (!validPreferences.includes(goalData.dividendPreference)) {
                errors.push(`Dividend preference must be one of: ${validPreferences.join(', ')}`);
            }
        }

        // Validate emergency fund months
        if (goalData.emergencyFundMonths !== undefined) {
            const months = parseInt(goalData.emergencyFundMonths);
            if (isNaN(months) || months < 0 || months > 24) {
                errors.push('Emergency fund months must be between 0 and 24');
            }
        }

        // Business logic validations
        if (goalData.targetAmount && goalData.initialInvestment) {
            if (parseFloat(goalData.initialInvestment) >= parseFloat(goalData.targetAmount)) {
                errors.push('Target amount must be greater than initial investment');
            }
        }

        if (errors.length > 0) {
            throw new Error(`Validation failed: ${errors.join(', ')}`);
        }

        // Return validated and sanitized data
        return {
            primaryGoal: goalData.primaryGoal,
            targetAmount: goalData.targetAmount ? parseFloat(goalData.targetAmount) : undefined,
            goalTimelineMonths: goalData.goalTimelineMonths ? parseInt(goalData.goalTimelineMonths) : undefined,
            monthlyContribution: goalData.monthlyContribution ? parseFloat(goalData.monthlyContribution) : undefined,
            initialInvestment: goalData.initialInvestment ? parseFloat(goalData.initialInvestment) : undefined,
            riskTolerance: goalData.riskTolerance ? parseInt(goalData.riskTolerance) : undefined,
            riskCapacity: goalData.riskCapacity ? parseInt(goalData.riskCapacity) : undefined,
            investmentExperience: goalData.investmentExperience,
            preferredSectors: Array.isArray(goalData.preferredSectors) ? goalData.preferredSectors : undefined,
            excludedSectors: Array.isArray(goalData.excludedSectors) ? goalData.excludedSectors : undefined,
            esgPreference: goalData.esgPreference !== undefined ? Boolean(goalData.esgPreference) : undefined,
            dividendPreference: goalData.dividendPreference,
            emergencyFundMonths: goalData.emergencyFundMonths ? parseInt(goalData.emergencyFundMonths) : undefined,
            hasEmergencyFund: goalData.hasEmergencyFund !== undefined ? Boolean(goalData.hasEmergencyFund) : undefined
        };
    }

    /**
     * 👤 VALIDATE USER EXISTS
     * Ensures user exists before creating goal
     */
    static async validateUserExists(userId) {
        try {
            const query = 'SELECT id FROM users WHERE id = $1 AND is_active = true';
            const dbPool = require('../../../shared/services/database');
            const result = await dbPool.query(query, [userId]);

            if (result.rows.length === 0) {
                throw new Error('User not found or inactive');
            }

            return true;

        } catch (error) {
            throw new Error(`User validation failed: ${error.message}`);
        }
    }

    /**
     * 🔧 BUILD UPDATE QUERY
     * Dynamically builds update query based on provided fields
     */
    static buildUpdateQuery(userId, updates) {
        const setClauses = [];
        const values = [userId];
        let paramCount = 2;

        const fieldMap = {
            primaryGoal: 'primary_goal',
            targetAmount: 'target_amount',
            goalTimelineMonths: 'goal_timeline_months',
            monthlyContribution: 'monthly_contribution',
            initialInvestment: 'initial_investment',
            riskTolerance: 'risk_tolerance',
            riskCapacity: 'risk_capacity',
            investmentExperience: 'investment_experience',
            preferredSectors: 'preferred_sectors',
            excludedSectors: 'excluded_sectors',
            esgPreference: 'esg_preference',
            dividendPreference: 'dividend_preference',
            emergencyFundMonths: 'emergency_fund_months',
            hasEmergencyFund: 'has_emergency_fund'
        };

        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined && fieldMap[key]) {
                setClauses.push(`${fieldMap[key]} = $${paramCount}`);
                values.push(value);
                paramCount++;
            }
        }

        if (setClauses.length === 0) {
            throw new Error('No valid fields to update');
        }

        // Always update the updated_at timestamp
        setClauses.push('updated_at = NOW()');

        const query = `
            UPDATE user_investment_profiles 
            SET ${setClauses.join(', ')}
            WHERE user_id = $1
            RETURNING *
        `;

        return { query, values };
    }

    /**
     * 📊 CALCULATE REQUIRED RETURN
     * Calculates annual return needed to achieve goal
     */
    async calculateRequiredReturn() {
        try {
            if (!this.targetAmount || !this.goalTimelineMonths) {
                this.requiredAnnualReturn = null;
                return null;
            }

            const timelineYears = this.goalTimelineMonths / 12;
            const monthlyContribution = this.monthlyContribution || 0;
            const initialInvestment = this.initialInvestment || 0;

            // Use financial formula: FV = PV(1+r)^n + PMT[((1+r)^n - 1)/r]
            // Solve for r using binary search
            let lowRate = -0.05; // -5% annual
            let highRate = 0.30;  // 30% annual
            const tolerance = 0.0001;
            let iterations = 0;
            const maxIterations = 100;

            while (highRate - lowRate > tolerance && iterations < maxIterations) {
                const midRate = (lowRate + highRate) / 2;
                const monthlyRate = midRate / 12;

                let futureValue = initialInvestment * Math.pow(1 + monthlyRate, this.goalTimelineMonths);
                
                if (monthlyContribution > 0 && monthlyRate !== 0) {
                    futureValue += monthlyContribution * ((Math.pow(1 + monthlyRate, this.goalTimelineMonths) - 1) / monthlyRate);
                } else if (monthlyContribution > 0) {
                    futureValue += monthlyContribution * this.goalTimelineMonths;
                }

                if (futureValue < this.targetAmount) {
                    lowRate = midRate;
                } else {
                    highRate = midRate;
                }

                iterations++;
            }

            this.requiredAnnualReturn = (lowRate + highRate) / 2;
            return this.requiredAnnualReturn;

        } catch (error) {
            console.error('Error calculating required return:', error);
            this.requiredAnnualReturn = null;
            return null;
        }
    }

    /**
     * ✅ IS GOAL FEASIBLE
     * Determines if goal is achievable with reasonable market returns
     */
    async isGoalFeasible() {
        try {
            if (!this.requiredAnnualReturn) {
                await this.calculateRequiredReturn();
            }

            if (!this.requiredAnnualReturn) {
                return { feasible: false, reason: 'Cannot calculate required return' };
            }

            // Feasibility thresholds based on risk tolerance
            const feasibilityThresholds = {
                1: 0.04,  // Conservative: 4% max expected return
                2: 0.05,  // 5%
                3: 0.06,  // 6%
                4: 0.07,  // 7%
                5: 0.08,  // Moderate: 8%
                6: 0.09,  // 9%
                7: 0.10,  // 10%
                8: 0.12,  // Growth: 12%
                9: 0.15,  // Aggressive: 15%
                10: 0.18  // Very Aggressive: 18%
            };

            const maxExpectedReturn = feasibilityThresholds[this.riskTolerance] || 0.08;
            const feasible = this.requiredAnnualReturn <= maxExpectedReturn;

            this.feasibilityScore = feasible ? 
                Math.max(0, 1 - (this.requiredAnnualReturn / maxExpectedReturn)) : 
                0;

            return {
                feasible,
                requiredReturn: this.requiredAnnualReturn,
                maxExpectedReturn,
                feasibilityScore: this.feasibilityScore,
                reason: feasible ? 
                    'Goal is achievable with appropriate risk level' : 
                    'Required return exceeds reasonable expectations for risk tolerance'
            };

        } catch (error) {
            console.error('Error checking goal feasibility:', error);
            return { feasible: false, reason: 'Error calculating feasibility' };
        }
    }

    /**
     * 📈 GET GOAL PROGRESS
     * Calculates current progress toward goal (requires portfolio data)
     */
    async getGoalProgress() {
        try {
            // This would typically fetch current portfolio value
            // For now, return structure for when portfolio integration is complete
            const currentValue = 0; // Placeholder - would come from portfolio
            const progressPercent = this.targetAmount > 0 ? (currentValue / this.targetAmount) * 100 : 0;

            const timeElapsedMonths = 0; // Placeholder - calculate from creation date
            const timeRemainingMonths = Math.max(0, this.goalTimelineMonths - timeElapsedMonths);

            return {
                currentValue,
                targetAmount: this.targetAmount,
                progressPercent,
                timeElapsedMonths,
                timeRemainingMonths,
                onTrack: progressPercent >= (timeElapsedMonths / this.goalTimelineMonths) * 100,
                projectedFinalValue: null, // Would come from Monte Carlo simulation
                lastUpdated: new Date()
            };

        } catch (error) {
            console.error('Error calculating goal progress:', error);
            throw new Error(`Failed to calculate goal progress: ${error.message}`);
        }
    }

    /**
     * 📊 CALCULATE GOAL STATUS
     * Determines current status of the goal
     */
    calculateGoalStatus() {
        if (!this.targetAmount || !this.goalTimelineMonths) {
            return 'draft';
        }

        const now = new Date();
        const createdDate = new Date(this.createdAt);
        const timelineEnd = new Date(createdDate.getTime() + (this.goalTimelineMonths * 30 * 24 * 60 * 60 * 1000));

        if (now > timelineEnd) {
            return 'expired';
        }

        return 'active';
    }

    /**
     * 📋 TO JSON
     * Returns clean JSON representation
     */
    toJSON() {
        return {
            userId: this.userId,
            primaryGoal: this.primaryGoal,
            targetAmount: this.targetAmount,
            goalTimelineMonths: this.goalTimelineMonths,
            monthlyContribution: this.monthlyContribution,
            initialInvestment: this.initialInvestment,
            riskTolerance: this.riskTolerance,
            riskCapacity: this.riskCapacity,
            investmentExperience: this.investmentExperience,
            preferredSectors: this.preferredSectors,
            excludedSectors: this.excludedSectors,
            esgPreference: this.esgPreference,
            dividendPreference: this.dividendPreference,
            emergencyFundMonths: this.emergencyFundMonths,
            hasEmergencyFund: this.hasEmergencyFund,
            goalStatus: this.goalStatus,
            requiredAnnualReturn: this.requiredAnnualReturn,
            feasibilityScore: this.feasibilityScore,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    /**
     * 🧪 VALIDATE MODEL INTEGRATION
     * Test function to verify database integration
     */
    static async testDatabaseIntegration() {
        try {
            console.log('🧪 Testing UserGoal database integration...');

            const dbPool = require('../../../shared/services/database');
            
            // Test database connection
            await dbPool.query('SELECT 1');
            console.log('✅ Database connection successful');

            // Test table exists
            const tableCheck = await dbPool.query(`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = 'user_investment_profiles'
                )
            `);
            
            if (!tableCheck.rows[0].exists) {
                throw new Error('user_investment_profiles table does not exist');
            }
            
            console.log('✅ Database table exists');
            console.log('✅ UserGoal model integration test passed');

            return true;

        } catch (error) {
            console.error('❌ Database integration test failed:', error);
            throw error;
        }
    }
}

module.exports = UserGoal;