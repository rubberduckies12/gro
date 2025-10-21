-- ==========================================
-- COMPLETE DATABASE SCHEMA FOR GRO
-- Supports all API routes from routes.md
-- ==========================================

-- ==========================================
-- 1. USER MANAGEMENT & AUTHENTICATION
-- ==========================================

-- Users table with all required fields
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    mobile_verified BOOLEAN DEFAULT FALSE,
    kyc_status VARCHAR(20) DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected')),
    subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'monthly', 'lifetime')),
    subscription_expires_at TIMESTAMPTZ,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE
);

-- User sessions for JWT management
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    device_type VARCHAR(50), -- 'ios', 'android', 'web'
    device_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_used TIMESTAMPTZ DEFAULT NOW()
);

-- User investment profile (goal-driven)
CREATE TABLE user_investment_profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    
    -- Goal-driven inputs
    primary_goal VARCHAR(50) NOT NULL, -- 'retirement', 'house', 'growth', 'income'
    goal_timeline_months INTEGER NOT NULL,
    target_amount DECIMAL(15,2),
    monthly_contribution DECIMAL(10,2),
    initial_investment DECIMAL(15,2),
    
    -- Risk assessment
    risk_tolerance INTEGER CHECK (risk_tolerance BETWEEN 1 AND 10),
    risk_capacity INTEGER CHECK (risk_capacity BETWEEN 1 AND 10),
    investment_experience VARCHAR(50), -- 'beginner', 'intermediate', 'advanced'
    
    -- Preferences
    preferred_sectors TEXT[], -- ['technology', 'healthcare', 'finance']
    excluded_sectors TEXT[], -- ['tobacco', 'gambling']
    esg_preference BOOLEAN DEFAULT FALSE,
    dividend_preference VARCHAR(20), -- 'growth', 'income', 'balanced'
    
    -- Emergency fund
    emergency_fund_months INTEGER DEFAULT 3,
    has_emergency_fund BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscription management
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_type VARCHAR(20) NOT NULL, -- 'free', 'monthly', 'lifetime'
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'cancelled', 'expired'
    amount_paid DECIMAL(10,2),
    payment_method VARCHAR(50),
    stripe_subscription_id VARCHAR(255),
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. CORE MARKET DATA
-- ==========================================

-- Companies master data with sector/industry
CREATE TABLE companies (
    symbol VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sector VARCHAR(100),
    industry VARCHAR(150),
    sub_industry VARCHAR(200),
    country VARCHAR(2) DEFAULT 'US',
    currency VARCHAR(3) DEFAULT 'USD',
    exchange VARCHAR(10),
    
    -- Company metrics
    market_cap BIGINT,
    shares_outstanding BIGINT,
    float_shares BIGINT,
    employees INTEGER,
    founded_year INTEGER,
    
    -- Additional info
    website VARCHAR(255),
    logo_url VARCHAR(500),
    headquarters VARCHAR(255),
    ceo VARCHAR(255),
    
    -- Trading info
    is_active BOOLEAN DEFAULT TRUE,
    is_etf BOOLEAN DEFAULT FALSE,
    dividend_yield DECIMAL(8,4),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stock prices (partitioned by date for scale)
CREATE TABLE stock_prices (
    symbol VARCHAR(10) REFERENCES companies(symbol),
    date DATE NOT NULL,
    open DECIMAL(12,4) NOT NULL,
    high DECIMAL(12,4) NOT NULL,
    low DECIMAL(12,4) NOT NULL,
    close DECIMAL(12,4) NOT NULL,
    adjusted_close DECIMAL(12,4),
    volume BIGINT NOT NULL,
    
    -- Calculated fields
    daily_return DECIMAL(10,6),
    volatility_20d DECIMAL(8,4),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (symbol, date)
) PARTITION BY RANGE (date);

-- Create partitions for stock_prices (quarterly partitions)
CREATE TABLE stock_prices_2024_q1 PARTITION OF stock_prices
    FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');
CREATE TABLE stock_prices_2024_q2 PARTITION OF stock_prices
    FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');
CREATE TABLE stock_prices_2024_q3 PARTITION OF stock_prices
    FOR VALUES FROM ('2024-07-01') TO ('2024-10-01');
CREATE TABLE stock_prices_2024_q4 PARTITION OF stock_prices
    FOR VALUES FROM ('2024-10-01') TO ('2025-01-01');
CREATE TABLE stock_prices_2025_q1 PARTITION OF stock_prices
    FOR VALUES FROM ('2025-01-01') TO ('2025-04-01');
-- Add more partitions as needed

-- Real-time quotes (frequently updated)
CREATE TABLE stock_quotes (
    symbol VARCHAR(10) PRIMARY KEY REFERENCES companies(symbol),
    price DECIMAL(12,4) NOT NULL,
    bid DECIMAL(12,4),
    ask DECIMAL(12,4),
    bid_size INTEGER,
    ask_size INTEGER,
    volume BIGINT,
    change_amount DECIMAL(10,4),
    change_percent DECIMAL(8,4),
    day_high DECIMAL(12,4),
    day_low DECIMAL(12,4),
    week_52_high DECIMAL(12,4),
    week_52_low DECIMAL(12,4),
    market_cap BIGINT,
    pe_ratio DECIMAL(8,4),
    last_trade_time TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stock splits and dividends
CREATE TABLE corporate_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(10) REFERENCES companies(symbol),
    action_type VARCHAR(20) NOT NULL, -- 'split', 'dividend', 'spinoff'
    ex_date DATE NOT NULL,
    record_date DATE,
    payment_date DATE,
    
    -- Split data
    split_ratio DECIMAL(10,6), -- 2.0 for 2:1 split
    
    -- Dividend data
    dividend_amount DECIMAL(10,4),
    dividend_type VARCHAR(20), -- 'regular', 'special', 'return_of_capital'
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. FINANCIAL ANALYSIS DATA
-- ==========================================

-- Comprehensive financial statements
CREATE TABLE financial_statements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(10) REFERENCES companies(symbol),
    period_end DATE NOT NULL,
    period_type VARCHAR(10) CHECK (period_type IN ('quarterly', 'annual')),
    fiscal_year INTEGER,
    fiscal_quarter INTEGER,
    
    -- Income Statement (in thousands)
    revenue BIGINT,
    cost_of_revenue BIGINT,
    gross_profit BIGINT,
    operating_expenses BIGINT,
    operating_income BIGINT,
    interest_expense BIGINT,
    pretax_income BIGINT,
    tax_expense BIGINT,
    net_income BIGINT,
    eps_basic DECIMAL(10,4),
    eps_diluted DECIMAL(10,4),
    shares_basic BIGINT,
    shares_diluted BIGINT,
    
    -- Balance Sheet (in thousands)
    total_assets BIGINT,
    current_assets BIGINT,
    cash_and_equivalents BIGINT,
    short_term_investments BIGINT,
    accounts_receivable BIGINT,
    inventory BIGINT,
    total_liabilities BIGINT,
    current_liabilities BIGINT,
    short_term_debt BIGINT,
    long_term_debt BIGINT,
    shareholders_equity BIGINT,
    retained_earnings BIGINT,
    
    -- Cash Flow Statement (in thousands)
    operating_cash_flow BIGINT,
    investing_cash_flow BIGINT,
    financing_cash_flow BIGINT,
    free_cash_flow BIGINT,
    capital_expenditures BIGINT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(symbol, period_end, period_type)
);

-- Pre-calculated financial ratios (for speed)
CREATE TABLE financial_ratios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(10) REFERENCES companies(symbol),
    date DATE NOT NULL,
    
    -- Valuation ratios
    pe_ratio DECIMAL(10,4),
    pe_ratio_forward DECIMAL(10,4),
    peg_ratio DECIMAL(10,4),
    pb_ratio DECIMAL(10,4),
    ps_ratio DECIMAL(10,4),
    ev_revenue DECIMAL(10,4),
    ev_ebitda DECIMAL(10,4),
    
    -- Profitability ratios
    roe DECIMAL(10,4), -- Return on Equity
    roa DECIMAL(10,4), -- Return on Assets
    roic DECIMAL(10,4), -- Return on Invested Capital
    gross_margin DECIMAL(10,4),
    operating_margin DECIMAL(10,4),
    net_margin DECIMAL(10,4),
    
    -- Liquidity ratios
    current_ratio DECIMAL(10,4),
    quick_ratio DECIMAL(10,4),
    cash_ratio DECIMAL(10,4),
    
    -- Leverage ratios
    debt_to_equity DECIMAL(10,4),
    debt_to_assets DECIMAL(10,4),
    interest_coverage DECIMAL(10,4),
    
    -- Efficiency ratios
    asset_turnover DECIMAL(10,4),
    inventory_turnover DECIMAL(10,4),
    receivables_turnover DECIMAL(10,4),
    
    -- Growth rates (YoY)
    revenue_growth_1y DECIMAL(10,4),
    revenue_growth_3y DECIMAL(10,4),
    earnings_growth_1y DECIMAL(10,4),
    earnings_growth_3y DECIMAL(10,4),
    
    -- Quality scores
    piotroski_score INTEGER CHECK (piotroski_score BETWEEN 0 AND 9),
    altman_z_score DECIMAL(10,4),
    
    -- Graham analysis
    graham_number DECIMAL(12,4),
    graham_score INTEGER CHECK (graham_score BETWEEN 0 AND 7),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(symbol, date)
);

-- ==========================================
-- 4. TECHNICAL ANALYSIS & RISK METRICS
-- ==========================================

-- Technical indicators (daily calculations)
CREATE TABLE technical_indicators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(10) REFERENCES companies(symbol),
    date DATE NOT NULL,
    
    -- Moving averages
    sma_20 DECIMAL(12,4),
    sma_50 DECIMAL(12,4),
    sma_200 DECIMAL(12,4),
    ema_12 DECIMAL(12,4),
    ema_26 DECIMAL(12,4),
    
    -- Momentum oscillators
    rsi_14 DECIMAL(8,4),
    macd_line DECIMAL(10,6),
    macd_signal DECIMAL(10,6),
    macd_histogram DECIMAL(10,6),
    stochastic_k DECIMAL(8,4),
    stochastic_d DECIMAL(8,4),
    williams_r DECIMAL(8,4),
    
    -- Bollinger Bands
    bb_upper DECIMAL(12,4),
    bb_middle DECIMAL(12,4),
    bb_lower DECIMAL(12,4),
    bb_width DECIMAL(10,4),
    bb_percent DECIMAL(8,4),
    
    -- Volume indicators
    obv BIGINT, -- On Balance Volume
    ad_line DECIMAL(15,4), -- Accumulation/Distribution
    chaikin_mf DECIMAL(8,4), -- Chaikin Money Flow
    volume_sma_20 BIGINT,
    
    -- Volatility indicators
    atr_14 DECIMAL(10,4), -- Average True Range
    volatility_parkinson DECIMAL(8,4),
    volatility_garman_klass DECIMAL(8,4),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(symbol, date)
);

-- Risk metrics and performance analytics
CREATE TABLE risk_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(10) REFERENCES companies(symbol),
    calculation_date DATE NOT NULL,
    
    -- Market risk metrics
    beta_1y DECIMAL(8,4),
    beta_3y DECIMAL(8,4),
    alpha_1y DECIMAL(8,4),
    correlation_sp500 DECIMAL(8,4),
    correlation_sector DECIMAL(8,4),
    
    -- Volatility measures
    volatility_30d DECIMAL(8,4),
    volatility_90d DECIMAL(8,4),
    volatility_1y DECIMAL(8,4),
    downside_volatility DECIMAL(8,4),
    
    -- Risk-adjusted returns
    sharpe_ratio_1y DECIMAL(8,4),
    sortino_ratio_1y DECIMAL(8,4),
    calmar_ratio_1y DECIMAL(8,4),
    treynor_ratio_1y DECIMAL(8,4),
    
    -- Drawdown analysis
    max_drawdown_1y DECIMAL(8,4),
    max_drawdown_3y DECIMAL(8,4),
    drawdown_duration_days INTEGER,
    current_drawdown DECIMAL(8,4),
    
    -- Value at Risk
    var_95_1d DECIMAL(8,4),
    var_99_1d DECIMAL(8,4),
    expected_shortfall_95 DECIMAL(8,4),
    
    -- Tail risk
    skewness_1y DECIMAL(8,4),
    kurtosis_1y DECIMAL(8,4),
    tail_ratio DECIMAL(8,4),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(symbol, calculation_date)
);

-- ==========================================
-- 5. PORTFOLIO MANAGEMENT (GOAL-DRIVEN)
-- ==========================================

-- User portfolios with goal tracking
CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Portfolio identification
    name VARCHAR(255) NOT NULL DEFAULT 'My Portfolio',
    description TEXT,
    is_primary BOOLEAN DEFAULT TRUE,
    
    -- Goal-based configuration
    goal_type VARCHAR(50) NOT NULL, -- matches user profile
    target_date DATE,
    target_amount DECIMAL(15,2),
    monthly_contribution DECIMAL(10,2),
    
    -- Strategy configuration
    optimization_method VARCHAR(50) DEFAULT 'mean_variance', -- 'mean_variance', 'risk_parity', 'kelly'
    rebalancing_frequency VARCHAR(20) DEFAULT 'quarterly', -- 'monthly', 'quarterly', 'semiannual'
    
    -- Risk parameters
    target_return DECIMAL(8,4),
    max_volatility DECIMAL(8,4),
    max_drawdown DECIMAL(8,4),
    
    -- Current status
    total_value DECIMAL(15,2) DEFAULT 0,
    cash_balance DECIMAL(15,2) DEFAULT 0,
    invested_amount DECIMAL(15,2) DEFAULT 0,
    unrealized_pnl DECIMAL(15,2) DEFAULT 0,
    
    -- Portfolio health
    is_active BOOLEAN DEFAULT TRUE,
    needs_rebalancing BOOLEAN DEFAULT FALSE,
    last_rebalanced DATE,
    
    -- Broker integration
    alpaca_account_id VARCHAR(255),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio holdings with target vs actual weights
CREATE TABLE portfolio_holdings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    symbol VARCHAR(10) REFERENCES companies(symbol),
    
    -- Position details
    shares DECIMAL(15,6) DEFAULT 0,
    average_cost DECIMAL(12,4),
    current_price DECIMAL(12,4),
    market_value DECIMAL(15,2),
    
    -- Weight management
    target_weight DECIMAL(8,4) NOT NULL, -- 0.05 = 5%
    actual_weight DECIMAL(8,4),
    weight_drift DECIMAL(8,4), -- actual - target
    
    -- Performance tracking
    total_return DECIMAL(10,4),
    daily_pnl DECIMAL(12,2),
    unrealized_pnl DECIMAL(12,2),
    realized_pnl DECIMAL(12,2),
    
    -- Risk contribution
    risk_contribution DECIMAL(8,4), -- % of portfolio risk
    beta_to_portfolio DECIMAL(8,4),
    
    -- Trade tracking
    last_trade_date DATE,
    last_rebalance_date DATE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(portfolio_id, symbol)
);

-- Daily portfolio performance tracking
CREATE TABLE portfolio_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    
    -- Portfolio values
    total_value DECIMAL(15,2) NOT NULL,
    cash_value DECIMAL(15,2),
    invested_value DECIMAL(15,2),
    
    -- Returns
    daily_return DECIMAL(10,6),
    total_return DECIMAL(10,4),
    annualized_return DECIMAL(10,4),
    
    -- Benchmark comparison
    benchmark_return DECIMAL(10,6), -- S&P 500 daily return
    excess_return DECIMAL(10,6), -- vs benchmark
    
    -- Risk metrics
    volatility_30d DECIMAL(8,4),
    sharpe_ratio DECIMAL(8,4),
    max_drawdown DECIMAL(8,4),
    var_95 DECIMAL(8,4),
    
    -- Goal progress
    goal_progress_percent DECIMAL(8,4), -- % toward goal
    on_track_for_goal BOOLEAN,
    projected_goal_date DATE,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(portfolio_id, date)
);

-- Portfolio rebalancing history
CREATE TABLE portfolio_rebalancing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    rebalance_date DATE NOT NULL,
    
    -- Rebalancing trigger
    trigger_type VARCHAR(50), -- 'scheduled', 'drift', 'user_initiated'
    trigger_reason TEXT,
    
    -- Pre-rebalance state
    pre_rebalance_value DECIMAL(15,2),
    pre_rebalance_weights JSONB, -- {symbol: weight}
    
    -- Post-rebalance state  
    post_rebalance_value DECIMAL(15,2),
    post_rebalance_weights JSONB,
    
    -- Transaction costs
    total_transaction_cost DECIMAL(10,2),
    estimated_tax_impact DECIMAL(10,2),
    
    -- Performance impact
    estimated_improvement DECIMAL(8,4), -- expected Sharpe improvement
    
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'executed', 'failed'
    executed_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 6. TRADING & BROKER INTEGRATION
-- ==========================================

-- Trade orders (Alpaca integration)
CREATE TABLE trade_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    
    -- Order details
    symbol VARCHAR(10) REFERENCES companies(symbol),
    side VARCHAR(10) NOT NULL CHECK (side IN ('buy', 'sell')),
    order_type VARCHAR(20) DEFAULT 'market', -- 'market', 'limit', 'stop', 'stop_limit'
    time_in_force VARCHAR(10) DEFAULT 'day', -- 'day', 'gtc', 'ioc', 'fok'
    
    -- Quantities and prices
    quantity DECIMAL(15,6) NOT NULL,
    limit_price DECIMAL(12,4),
    stop_price DECIMAL(12,4),
    filled_quantity DECIMAL(15,6) DEFAULT 0,
    average_fill_price DECIMAL(12,4),
    
    -- Order status
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'submitted', 'filled', 'cancelled', 'rejected'
    
    -- Broker integration
    alpaca_order_id VARCHAR(255),
    broker_status VARCHAR(50),
    
    -- Order context
    order_purpose VARCHAR(50), -- 'initial_investment', 'rebalancing', 'goal_change', 'emergency_sell'
    parent_rebalance_id UUID REFERENCES portfolio_rebalancing(id),
    
    -- Timestamps
    submitted_at TIMESTAMPTZ,
    filled_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trade executions (fills)
CREATE TABLE trade_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES trade_orders(id) ON DELETE CASCADE,
    
    -- Execution details
    execution_id VARCHAR(255), -- from broker
    quantity DECIMAL(15,6) NOT NULL,
    price DECIMAL(12,4) NOT NULL,
    commission DECIMAL(8,4),
    fees DECIMAL(8,4),
    
    -- Settlement
    trade_date DATE NOT NULL,
    settlement_date DATE NOT NULL,
    
    executed_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Emergency sell tracking
CREATE TABLE emergency_sells (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    portfolio_id UUID REFERENCES portfolios(id),
    
    -- Emergency sell details
    reason TEXT,
    total_value_before DECIMAL(15,2),
    estimated_proceeds DECIMAL(15,2),
    actual_proceeds DECIMAL(15,2),
    
    -- Execution tracking
    orders_submitted INTEGER,
    orders_filled INTEGER,
    total_fees DECIMAL(10,2),
    
    status VARCHAR(20) DEFAULT 'initiated', -- 'initiated', 'executing', 'completed', 'failed'
    
    initiated_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- ==========================================
-- 7. AI CHAT & INSIGHTS
-- ==========================================

-- AI chat conversations
CREATE TABLE chat_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Conversation metadata
    title VARCHAR(255),
    topic VARCHAR(100), -- 'portfolio', 'stock_analysis', 'market_news', 'education'
    
    -- Conversation state
    is_active BOOLEAN DEFAULT TRUE,
    message_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Individual chat messages
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES chat_conversations(id) ON DELETE CASCADE,
    
    -- Message details
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    
    -- AI context
    model_used VARCHAR(50), -- 'gpt-4', 'gpt-3.5-turbo'
    tokens_used INTEGER,
    processing_time_ms INTEGER,
    
    -- Message metadata
    contains_portfolio_data BOOLEAN DEFAULT FALSE,
    contains_market_data BOOLEAN DEFAULT FALSE,
    sentiment VARCHAR(20), -- 'positive', 'neutral', 'negative', 'concerned'
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI-generated insights for users
CREATE TABLE user_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    portfolio_id UUID REFERENCES portfolios(id),
    
    -- Insight details
    insight_type VARCHAR(50), -- 'performance', 'risk_alert', 'rebalancing', 'goal_progress', 'market_update'
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    summary VARCHAR(500),
    
    -- Insight priority and action
    priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'urgent'
    requires_action BOOLEAN DEFAULT FALSE,
    action_taken BOOLEAN DEFAULT FALSE,
    
    -- Engagement tracking
    viewed BOOLEAN DEFAULT FALSE,
    viewed_at TIMESTAMPTZ,
    dismissed BOOLEAN DEFAULT FALSE,
    dismissed_at TIMESTAMPTZ,
    
    -- Insight metadata
    generated_by VARCHAR(50) DEFAULT 'gpt-4',
    confidence_score DECIMAL(5,4),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- ==========================================
-- 8. NOTIFICATIONS & COMMUNICATION
-- ==========================================

-- Push notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Notification content
    type VARCHAR(50) NOT NULL, -- 'portfolio_alert', 'goal_progress', 'market_update', 'rebalancing', 'trade_executed'
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    
    -- Notification targeting
    channel VARCHAR(20) NOT NULL, -- 'push', 'email', 'sms', 'in_app'
    priority VARCHAR(20) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
    
    -- Delivery tracking
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'sent', 'delivered', 'failed'
    sent_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    opened_at TIMESTAMPTZ,
    clicked_at TIMESTAMPTZ,
    
    -- Notification metadata
    related_portfolio_id UUID REFERENCES portfolios(id),
    deep_link_url VARCHAR(500),
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User notification preferences
CREATE TABLE notification_preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    
    -- Channel preferences
    push_enabled BOOLEAN DEFAULT TRUE,
    email_enabled BOOLEAN DEFAULT TRUE,
    sms_enabled BOOLEAN DEFAULT FALSE,
    
    -- Notification type preferences
    portfolio_alerts BOOLEAN DEFAULT TRUE,
    goal_progress_updates BOOLEAN DEFAULT TRUE,
    market_updates BOOLEAN DEFAULT TRUE,
    rebalancing_notifications BOOLEAN DEFAULT TRUE,
    trade_confirmations BOOLEAN DEFAULT TRUE,
    weekly_summaries BOOLEAN DEFAULT TRUE,
    educational_content BOOLEAN DEFAULT FALSE,
    
    -- Frequency settings
    max_daily_notifications INTEGER DEFAULT 5,
    quiet_hours_start TIME,
    quiet_hours_end TIME,
    timezone VARCHAR(50) DEFAULT 'UTC',
    
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 9. ENHANCED STOCK ANALYSIS STORAGE
-- ==========================================

-- Comprehensive technical analysis storage
CREATE TABLE stock_technical_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(10) REFERENCES companies(symbol),
    user_id UUID REFERENCES users(id), -- Track user-specific analysis
    portfolio_id UUID REFERENCES portfolios(id), -- Link to portfolio holdings
    analysis_date DATE NOT NULL,
    
    -- Price Action Analysis
    trend_direction VARCHAR(20), -- 'bullish', 'bearish', 'sideways'
    trend_strength DECIMAL(5,2), -- 0-100 scale
    support_levels DECIMAL(12,4)[],
    resistance_levels DECIMAL(12,4)[],
    relative_strength_score DECIMAL(8,4),
    
    -- Moving Averages (all periods)
    sma_5 DECIMAL(12,4),
    sma_10 DECIMAL(12,4),
    sma_20 DECIMAL(12,4),
    sma_50 DECIMAL(12,4),
    sma_100 DECIMAL(12,4),
    sma_200 DECIMAL(12,4),
    ema_5 DECIMAL(12,4),
    ema_10 DECIMAL(12,4),
    ema_12 DECIMAL(12,4),
    ema_20 DECIMAL(12,4),
    ema_26 DECIMAL(12,4),
    ema_50 DECIMAL(12,4),
    ema_200 DECIMAL(12,4),
    
    -- Technical Oscillators
    rsi_14 DECIMAL(8,4),
    rsi_21 DECIMAL(8,4),
    macd_line DECIMAL(10,6),
    macd_signal DECIMAL(10,6),
    macd_histogram DECIMAL(10,6),
    stochastic_k DECIMAL(8,4),
    stochastic_d DECIMAL(8,4),
    williams_r DECIMAL(8,4),
    cci DECIMAL(8,4), -- Commodity Channel Index
    momentum DECIMAL(8,4),
    roc DECIMAL(8,4), -- Rate of Change
    
    -- Bollinger Bands
    bb_upper DECIMAL(12,4),
    bb_middle DECIMAL(12,4),
    bb_lower DECIMAL(12,4),
    bb_width DECIMAL(10,4),
    bb_percent DECIMAL(8,4),
    bb_squeeze BOOLEAN,
    
    -- Volume Analysis
    obv BIGINT,
    ad_line DECIMAL(15,4),
    chaikin_mf DECIMAL(8,4),
    volume_sma_20 BIGINT,
    volume_weighted_price DECIMAL(12,4),
    price_volume_trend DECIMAL(15,4),
    
    -- Volatility Indicators
    atr_14 DECIMAL(10,4),
    atr_21 DECIMAL(10,4),
    volatility_parkinson DECIMAL(8,4),
    volatility_garman_klass DECIMAL(8,4),
    volatility_yang_zhang DECIMAL(8,4),
    
    -- Pattern Recognition
    detected_patterns TEXT[], -- ['head_and_shoulders', 'double_top', 'triangle']
    pattern_confidence DECIMAL(5,2),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(symbol, user_id, analysis_date)
);

-- Advanced risk analysis for individual stocks
CREATE TABLE stock_risk_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(10) REFERENCES companies(symbol),
    user_id UUID REFERENCES users(id),
    portfolio_id UUID REFERENCES portfolios(id),
    analysis_date DATE NOT NULL,
    
    -- Market Risk Metrics
    beta_1m DECIMAL(8,4),
    beta_3m DECIMAL(8,4),
    beta_6m DECIMAL(8,4),
    beta_1y DECIMAL(8,4),
    beta_2y DECIMAL(8,4),
    beta_3y DECIMAL(8,4),
    beta_5y DECIMAL(8,4),
    
    -- Alpha Analysis
    alpha_1m DECIMAL(8,4),
    alpha_3m DECIMAL(8,4),
    alpha_6m DECIMAL(8,4),
    alpha_1y DECIMAL(8,4),
    alpha_2y DECIMAL(8,4),
    alpha_3y DECIMAL(8,4),
    
    -- Correlation Analysis
    correlation_sp500 DECIMAL(8,4),
    correlation_nasdaq DECIMAL(8,4),
    correlation_sector DECIMAL(8,4),
    correlation_peers JSONB, -- {symbol: correlation}
    
    -- Volatility Measures
    realized_volatility_30d DECIMAL(8,4),
    realized_volatility_60d DECIMAL(8,4),
    realized_volatility_90d DECIMAL(8,4),
    realized_volatility_1y DECIMAL(8,4),
    implied_volatility DECIMAL(8,4),
    volatility_smile JSONB, -- strike: implied_vol
    downside_volatility_30d DECIMAL(8,4),
    upside_volatility_30d DECIMAL(8,4),
    
    -- Drawdown Analysis
    current_drawdown DECIMAL(8,4),
    max_drawdown_1m DECIMAL(8,4),
    max_drawdown_3m DECIMAL(8,4),
    max_drawdown_6m DECIMAL(8,4),
    max_drawdown_1y DECIMAL(8,4),
    max_drawdown_3y DECIMAL(8,4),
    max_drawdown_5y DECIMAL(8,4),
    drawdown_duration_days INTEGER,
    recovery_time_days INTEGER,
    
    -- Value at Risk
    var_95_1d DECIMAL(8,4),
    var_99_1d DECIMAL(8,4),
    var_95_1w DECIMAL(8,4),
    var_99_1w DECIMAL(8,4),
    var_95_1m DECIMAL(8,4),
    var_99_1m DECIMAL(8,4),
    
    -- Expected Shortfall (Conditional VaR)
    es_95_1d DECIMAL(8,4),
    es_99_1d DECIMAL(8,4),
    es_95_1w DECIMAL(8,4),
    es_99_1w DECIMAL(8,4),
    
    -- Tail Risk Metrics
    skewness_30d DECIMAL(8,4),
    skewness_90d DECIMAL(8,4),
    skewness_1y DECIMAL(8,4),
    kurtosis_30d DECIMAL(8,4),
    kurtosis_90d DECIMAL(8,4),
    kurtosis_1y DECIMAL(8,4),
    tail_ratio DECIMAL(8,4),
    
    -- Risk-Adjusted Returns
    sharpe_ratio_1m DECIMAL(8,4),
    sharpe_ratio_3m DECIMAL(8,4),
    sharpe_ratio_6m DECIMAL(8,4),
    sharpe_ratio_1y DECIMAL(8,4),
    sharpe_ratio_3y DECIMAL(8,4),
    sortino_ratio_1m DECIMAL(8,4),
    sortino_ratio_3m DECIMAL(8,4),
    sortino_ratio_1y DECIMAL(8,4),
    calmar_ratio_1y DECIMAL(8,4),
    treynor_ratio_1y DECIMAL(8,4),
    
    -- Specific Risk Categories
    sector_concentration_risk DECIMAL(8,4),
    geographic_risk_score DECIMAL(8,4),
    currency_exposure_risk DECIMAL(8,4),
    liquidity_risk_score DECIMAL(8,4),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(symbol, user_id, analysis_date)
);

-- Monte Carlo simulation results for individual stocks
CREATE TABLE stock_monte_carlo_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(10) REFERENCES companies(symbol),
    user_id UUID REFERENCES users(id),
    portfolio_id UUID REFERENCES portfolios(id),
    simulation_date DATE NOT NULL,
    
    -- Simulation Parameters
    num_simulations INTEGER DEFAULT 10000,
    time_horizon_days INTEGER, -- 30, 90, 252, 1260 (1m, 3m, 1y, 5y)
    initial_price DECIMAL(12,4),
    drift DECIMAL(8,6),
    volatility DECIMAL(8,4),
    
    -- Simulation Results - Price Projections
    mean_final_price DECIMAL(12,4),
    median_final_price DECIMAL(12,4),
    std_final_price DECIMAL(12,4),
    
    -- Percentile Analysis
    price_5th_percentile DECIMAL(12,4),
    price_10th_percentile DECIMAL(12,4),
    price_25th_percentile DECIMAL(12,4),
    price_75th_percentile DECIMAL(12,4),
    price_90th_percentile DECIMAL(12,4),
    price_95th_percentile DECIMAL(12,4),
    
    -- Return Analysis
    mean_return DECIMAL(8,4),
    std_return DECIMAL(8,4),
    return_5th_percentile DECIMAL(8,4),
    return_95th_percentile DECIMAL(8,4),
    
    -- Risk Metrics from Simulation
    probability_of_loss DECIMAL(8,4),
    probability_of_10pct_loss DECIMAL(8,4),
    probability_of_20pct_loss DECIMAL(8,4),
    max_simulated_loss DECIMAL(8,4),
    max_simulated_gain DECIMAL(8,4),
    
    -- Simulation Path Analysis
    max_drawdown_simulation DECIMAL(8,4),
    time_to_max_drawdown INTEGER,
    recovery_probability DECIMAL(8,4),
    
    -- Goal-Based Analysis
    probability_beat_sp500 DECIMAL(8,4),
    probability_beat_inflation DECIMAL(8,4),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(symbol, user_id, simulation_date, time_horizon_days)
);

-- Black-Scholes and Options Analysis
CREATE TABLE stock_options_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(10) REFERENCES companies(symbol),
    user_id UUID REFERENCES users(id),
    portfolio_id UUID REFERENCES portfolios(id),
    analysis_date DATE NOT NULL,
    
    -- Current Market Data
    spot_price DECIMAL(12,4),
    risk_free_rate DECIMAL(8,6),
    dividend_yield DECIMAL(8,4),
    
    -- Options Chain Analysis (for multiple strikes/expirations)
    options_data JSONB, -- Complex structure for full options chain
    
    -- Implied Volatility Analysis
    iv_30d DECIMAL(8,4),
    iv_60d DECIMAL(8,4),
    iv_90d DECIMAL(8,4),
    iv_rank DECIMAL(8,4), -- percentile rank of current IV
    iv_percentile DECIMAL(8,4),
    
    -- Greeks for ATM options
    atm_call_delta DECIMAL(8,6),
    atm_call_gamma DECIMAL(8,6),
    atm_call_theta DECIMAL(8,6),
    atm_call_vega DECIMAL(8,6),
    atm_call_rho DECIMAL(8,6),
    
    atm_put_delta DECIMAL(8,6),
    atm_put_gamma DECIMAL(8,6),
    atm_put_theta DECIMAL(8,6),
    atm_put_vega DECIMAL(8,6),
    atm_put_rho DECIMAL(8,6),
    
    -- Theoretical Prices
    atm_call_theoretical DECIMAL(10,4),
    atm_put_theoretical DECIMAL(10,4),
    
    -- Portfolio Hedging Suggestions
    protective_put_strike DECIMAL(12,4),
    covered_call_strike DECIMAL(12,4),
    collar_put_strike DECIMAL(12,4),
    collar_call_strike DECIMAL(12,4),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(symbol, user_id, analysis_date)
);

-- Sentiment and Alternative Data
CREATE TABLE stock_sentiment_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(10) REFERENCES companies(symbol),
    user_id UUID REFERENCES users(id),
    portfolio_id UUID REFERENCES portfolios(id),
    analysis_date DATE NOT NULL,
    
    -- News Sentiment
    news_sentiment_score DECIMAL(5,4), -- -1 to 1
    news_article_count INTEGER,
    news_sources TEXT[],
    news_keywords TEXT[],
    news_summary TEXT,
    
    -- Social Media Sentiment
    social_sentiment_score DECIMAL(5,4),
    social_mention_count INTEGER,
    social_platforms TEXT[], -- ['twitter', 'reddit', 'stocktwits']
    trending_hashtags TEXT[],
    social_volume_trend DECIMAL(8,4),
    
    -- Analyst Sentiment
    analyst_rating_avg DECIMAL(5,2), -- 1-5 scale
    analyst_count INTEGER,
    recent_upgrades INTEGER,
    recent_downgrades INTEGER,
    price_target_avg DECIMAL(12,4),
    price_target_high DECIMAL(12,4),
    price_target_low DECIMAL(12,4),
    
    -- Insider Trading Activity
    insider_buy_transactions INTEGER,
    insider_sell_transactions INTEGER,
    insider_net_shares BIGINT,
    insider_net_value DECIMAL(15,2),
    insider_sentiment_score DECIMAL(5,4),
    
    -- ESG Sentiment
    esg_score DECIMAL(5,2), -- 0-100
    environmental_score DECIMAL(5,2),
    social_score DECIMAL(5,2),
    governance_score DECIMAL(5,2),
    controversy_score DECIMAL(5,2),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(symbol, user_id, analysis_date)
);

-- ML Predictions and Model Results
CREATE TABLE stock_ml_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(10) REFERENCES companies(symbol),
    user_id UUID REFERENCES users(id),
    portfolio_id UUID REFERENCES portfolios(id),
    prediction_date DATE NOT NULL,
    
    -- Price Predictions
    price_1d_pred DECIMAL(12,4),
    price_7d_pred DECIMAL(12,4),
    price_30d_pred DECIMAL(12,4),
    price_90d_pred DECIMAL(12,4),
    
    -- Confidence Intervals
    price_1d_conf_low DECIMAL(12,4),
    price_1d_conf_high DECIMAL(12,4),
    price_7d_conf_low DECIMAL(12,4),
    price_7d_conf_high DECIMAL(12,4),
    price_30d_conf_low DECIMAL(12,4),
    price_30d_conf_high DECIMAL(12,4),
    
    -- Earnings Predictions
    next_earnings_surprise_pred DECIMAL(8,4),
    earnings_surprise_confidence DECIMAL(5,4),
    
    -- Momentum Forecasts
    momentum_1w DECIMAL(8,4),
    momentum_1m DECIMAL(8,4),
    momentum_3m DECIMAL(8,4),
    momentum_confidence DECIMAL(5,4),
    
    -- Volatility Predictions
    volatility_1w_pred DECIMAL(8,4),
    volatility_1m_pred DECIMAL(8,4),
    volatility_3m_pred DECIMAL(8,4),
    volatility_regime VARCHAR(20), -- 'low', 'normal', 'high', 'extreme'
    
    -- Market Regime Classification
    market_regime VARCHAR(20), -- 'bull', 'bear', 'sideways', 'volatile'
    regime_confidence DECIMAL(5,4),
    regime_probability_bull DECIMAL(5,4),
    regime_probability_bear DECIMAL(5,4),
    regime_probability_sideways DECIMAL(5,4),
    
    -- Sector Rotation Signals
    sector_rotation_signal VARCHAR(20), -- 'buy', 'hold', 'sell', 'rotate_out'
    sector_momentum_score DECIMAL(8,4),
    sector_relative_strength DECIMAL(8,4),
    
    -- Model Performance Tracking
    model_versions JSONB, -- Track which models generated predictions
    feature_importance JSONB, -- Most important features for this prediction
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(symbol, user_id, prediction_date)
);

-- Comparative and Sector Analysis
CREATE TABLE stock_comparative_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(10) REFERENCES companies(symbol),
    user_id UUID REFERENCES users(id),
    portfolio_id UUID REFERENCES portfolios(id),
    analysis_date DATE NOT NULL,
    
    -- Peer Comparison Data
    peer_symbols TEXT[],
    peer_ranking INTEGER, -- 1-N ranking within peer group
    
    -- Performance vs Peers
    performance_1m_vs_peers DECIMAL(8,4),
    performance_3m_vs_peers DECIMAL(8,4),
    performance_6m_vs_peers DECIMAL(8,4),
    performance_1y_vs_peers DECIMAL(8,4),
    performance_percentile DECIMAL(5,2),
    
    -- Valuation vs Peers
    pe_vs_peer_median DECIMAL(8,4),
    pb_vs_peer_median DECIMAL(8,4),
    ps_vs_peer_median DECIMAL(8,4),
    ev_ebitda_vs_peer_median DECIMAL(8,4),
    valuation_percentile DECIMAL(5,2),
    
    -- Quality vs Peers
    roe_vs_peer_median DECIMAL(8,4),
    roa_vs_peer_median DECIMAL(8,4),
    debt_equity_vs_peer_median DECIMAL(8,4),
    quality_percentile DECIMAL(5,2),
    
    -- Sector Performance
    sector_performance_1m DECIMAL(8,4),
    sector_performance_3m DECIMAL(8,4),
    sector_performance_1y DECIMAL(8,4),
    sector_vs_market_1m DECIMAL(8,4),
    sector_vs_market_3m DECIMAL(8,4),
    sector_vs_market_1y DECIMAL(8,4),
    
    -- Industry KPIs (varies by industry)
    industry_kpis JSONB, -- Flexible structure for industry-specific metrics
    kpi_rankings JSONB, -- Rankings for each KPI vs peers
    
    -- Macro Sensitivity
    interest_rate_sensitivity DECIMAL(8,4),
    inflation_sensitivity DECIMAL(8,4),
    gdp_sensitivity DECIMAL(8,4),
    dollar_sensitivity DECIMAL(8,4),
    commodity_sensitivity DECIMAL(8,4),
    
    -- Economic Cycle Analysis
    cycle_position VARCHAR(20), -- 'early', 'mid', 'late', 'recession'
    cycle_sensitivity DECIMAL(8,4),
    inflation_hedge_score DECIMAL(8,4),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(symbol, user_id, analysis_date)
);

-- Calendar Events and Earnings
CREATE TABLE stock_calendar_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(10) REFERENCES companies(symbol),
    user_id UUID REFERENCES users(id),
    portfolio_id UUID REFERENCES portfolios(id),
    
    -- Event Details
    event_type VARCHAR(50), -- 'earnings', 'dividend', 'split', 'spinoff', 'conference'
    event_date DATE NOT NULL,
    event_time TIME,
    
    -- Earnings Specific
    fiscal_quarter INTEGER,
    fiscal_year INTEGER,
    earnings_estimate DECIMAL(10,4),
    revenue_estimate DECIMAL(15,2),
    earnings_whisper DECIMAL(10,4), -- Unofficial estimate
    
    -- Historical Context
    last_surprise_pct DECIMAL(8,4),
    avg_surprise_4q DECIMAL(8,4),
    beat_rate_4q DECIMAL(5,4),
    
    -- Price Impact Analysis
    avg_price_move_1d DECIMAL(8,4),
    avg_price_move_1w DECIMAL(8,4),
    implied_move DECIMAL(8,4), -- From options
    
    -- Dividend Events
    dividend_amount DECIMAL(10,4),
    dividend_yield DECIMAL(8,4),
    ex_date DATE,
    payment_date DATE,
    
    -- Seasonal Patterns
    seasonal_trend VARCHAR(20), -- 'positive', 'negative', 'neutral'
    seasonal_strength DECIMAL(5,4),
    monthly_performance JSONB, -- Historical monthly returns
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stock Screening Results (for users)
CREATE TABLE user_stock_screens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Screen Configuration
    screen_name VARCHAR(255),
    screen_type VARCHAR(50), -- 'fundamental', 'technical', 'custom'
    criteria JSONB, -- Screen criteria and thresholds
    
    -- Results
    matching_symbols TEXT[],
    result_count INTEGER,
    screen_date DATE,
    
    -- Performance Tracking
    is_saved BOOLEAN DEFAULT FALSE,
    is_watchlist BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 10. PERFORMANCE OPTIMIZATION INDEXES
-- ==========================================

-- Critical indexes for scale
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY idx_users_mobile ON users(mobile);
CREATE INDEX CONCURRENTLY idx_user_sessions_token ON user_sessions(token_hash);
CREATE INDEX CONCURRENTLY idx_user_sessions_user_expires ON user_sessions(user_id, expires_at);

-- Stock data indexes
CREATE INDEX CONCURRENTLY idx_stock_prices_symbol_date ON stock_prices(symbol, date DESC);
CREATE INDEX CONCURRENTLY idx_stock_quotes_updated ON stock_quotes(updated_at DESC);
CREATE INDEX CONCURRENTLY idx_financial_ratios_symbol_date ON financial_ratios(symbol, date DESC);
CREATE INDEX CONCURRENTLY idx_technical_indicators_symbol_date ON technical_indicators(symbol, date DESC);

-- Portfolio indexes
CREATE INDEX CONCURRENTLY idx_portfolios_user_active ON portfolios(user_id, is_active);
CREATE INDEX CONCURRENTLY idx_portfolio_holdings_portfolio ON portfolio_holdings(portfolio_id);
CREATE INDEX CONCURRENTLY idx_portfolio_performance_portfolio_date ON portfolio_performance(portfolio_id, date DESC);

-- Trading indexes
CREATE INDEX CONCURRENTLY idx_trade_orders_portfolio_status ON trade_orders(portfolio_id, status);
CREATE INDEX CONCURRENTLY idx_trade_orders_user_created ON trade_orders(user_id, created_at DESC);

-- Chat indexes
CREATE INDEX CONCURRENTLY idx_chat_conversations_user_active ON chat_conversations(user_id, is_active);
CREATE INDEX CONCURRENTLY idx_chat_messages_conversation_created ON chat_messages(conversation_id, created_at);

-- Notifications indexes
CREATE INDEX CONCURRENTLY idx_notifications_user_status ON notifications(user_id, status);
CREATE INDEX CONCURRENTLY idx_notifications_created ON notifications(created_at DESC);

-- Composite indexes for complex queries
CREATE INDEX CONCURRENTLY idx_portfolio_holdings_symbol_weight ON portfolio_holdings(symbol, target_weight DESC);
CREATE INDEX CONCURRENTLY idx_financial_ratios_pe_market_cap ON financial_ratios(pe_ratio, date) WHERE pe_ratio > 0;

-- Stock analysis indexes
CREATE INDEX CONCURRENTLY idx_stock_technical_user_symbol ON stock_technical_analysis(user_id, symbol, analysis_date DESC);
CREATE INDEX CONCURRENTLY idx_stock_risk_user_symbol ON stock_risk_analysis(user_id, symbol, analysis_date DESC);
CREATE INDEX CONCURRENTLY idx_stock_monte_carlo_user_symbol ON stock_monte_carlo_analysis(user_id, symbol, simulation_date DESC);
CREATE INDEX CONCURRENTLY idx_stock_sentiment_user_symbol ON stock_sentiment_analysis(user_id, symbol, analysis_date DESC);
CREATE INDEX CONCURRENTLY idx_stock_ml_user_symbol ON stock_ml_predictions(user_id, symbol, prediction_date DESC);

-- Portfolio-specific indexes
CREATE INDEX CONCURRENTLY idx_stock_analysis_portfolio ON stock_technical_analysis(portfolio_id, analysis_date DESC);
CREATE INDEX CONCURRENTLY idx_stock_risk_portfolio ON stock_risk_analysis(portfolio_id, analysis_date DESC);

-- Multi-column indexes for complex queries
CREATE INDEX CONCURRENTLY idx_technical_analysis_symbol_date ON stock_technical_analysis(symbol, analysis_date DESC, trend_direction);
CREATE INDEX CONCURRENTLY idx_sentiment_symbol_date_score ON stock_sentiment_analysis(symbol, analysis_date DESC, news_sentiment_score DESC);

-- ==========================================
-- 11. DATABASE FUNCTIONS & TRIGGERS
-- ==========================================

-- Update timestamps trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to relevant tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolios_updated_at BEFORE UPDATE ON portfolios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolio_holdings_updated_at BEFORE UPDATE ON portfolio_holdings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_investment_profiles_updated_at BEFORE UPDATE ON user_investment_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trade_orders_updated_at BEFORE UPDATE ON trade_orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chat_conversations_updated_at BEFORE UPDATE ON chat_conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notification_preferences_updated_at BEFORE UPDATE ON notification_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Calculate portfolio weight automatically
CREATE OR REPLACE FUNCTION calculate_portfolio_weights()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE portfolio_holdings 
    SET actual_weight = market_value / (
        SELECT SUM(market_value) 
        FROM portfolio_holdings 
        WHERE portfolio_id = NEW.portfolio_id
    )
    WHERE portfolio_id = NEW.portfolio_id;
    
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_portfolio_weights 
    AFTER INSERT OR UPDATE OF market_value ON portfolio_holdings
    FOR EACH ROW EXECUTE FUNCTION calculate_portfolio_weights();

-- Function to calculate technical indicators
CREATE OR REPLACE FUNCTION calculate_stock_technicals(p_symbol VARCHAR, p_user_id UUID, p_date DATE)
RETURNS VOID AS $$
BEGIN
    -- This would contain logic to calculate all technical indicators
    -- and insert into stock_technical_analysis table
    -- Implementation would use historical price data
    
    INSERT INTO stock_technical_analysis (symbol, user_id, analysis_date, rsi_14, sma_20, sma_50)
    SELECT 
        p_symbol,
        p_user_id,
        p_date,
        -- RSI calculation logic here
        0.0, -- placeholder
        -- SMA calculations here
        0.0, 0.0
    ON CONFLICT (symbol, user_id, analysis_date) 
    DO UPDATE SET updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to update portfolio stock analysis
CREATE OR REPLACE FUNCTION update_portfolio_stock_analysis()
RETURNS TRIGGER AS $$
BEGIN
    -- When portfolio holdings change, trigger analysis updates
    PERFORM calculate_stock_technicals(NEW.symbol, 
        (SELECT user_id FROM portfolios WHERE id = NEW.portfolio_id), 
        CURRENT_DATE);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_portfolio_analysis 
    AFTER INSERT OR UPDATE ON portfolio_holdings
    FOR EACH ROW EXECUTE FUNCTION update_portfolio_stock_analysis();

-- ==========================================
-- 12. VIEWS FOR COMPREHENSIVE STOCK DATA
-- ==========================================

CREATE VIEW user_stock_dashboard AS
SELECT 
    ph.portfolio_id,
    ph.symbol,
    c.name as company_name,
    c.sector,
    
    -- Holdings
    ph.shares,
    ph.market_value,
    ph.actual_weight,
    ph.target_weight,
    ph.unrealized_pnl,
    
    -- Latest quotes
    sq.price as current_price,
    sq.change_percent as daily_change,
    
    -- Technical analysis
    sta.trend_direction,
    sta.rsi_14,
    sta.sma_50,
    sta.sma_200,
    
    -- Risk metrics
    sra.beta_1y,
    sra.volatility_30d,
    sra.sharpe_ratio_1y,
    sra.max_drawdown_1y,
    
    -- Sentiment
    ssa.news_sentiment_score,
    ssa.analyst_rating_avg,
    
    -- ML predictions
    smp.price_30d_pred,
    smp.momentum_1m,
    
    -- Last analysis dates
    sta.analysis_date as tech_analysis_date,
    sra.analysis_date as risk_analysis_date
    
FROM portfolio_holdings ph
JOIN companies c ON ph.symbol = c.symbol
LEFT JOIN stock_quotes sq ON ph.symbol = sq.symbol
LEFT JOIN LATERAL (
    SELECT * FROM stock_technical_analysis 
    WHERE symbol = ph.symbol AND user_id = (SELECT user_id FROM portfolios WHERE id = ph.portfolio_id)
    ORDER BY analysis_date DESC LIMIT 1
) sta ON true
LEFT JOIN LATERAL (
    SELECT * FROM stock_risk_analysis 
    WHERE symbol = ph.symbol AND user_id = (SELECT user_id FROM portfolios WHERE id = ph.portfolio_id)
    ORDER BY analysis_date DESC LIMIT 1
) sra ON true
LEFT JOIN LATERAL (
    SELECT * FROM stock_sentiment_analysis 
    WHERE symbol = ph.symbol AND user_id = (SELECT user_id FROM portfolios WHERE id = ph.portfolio_id)
    ORDER BY analysis_date DESC LIMIT 1
) ssa ON true
LEFT JOIN LATERAL (
    SELECT * FROM stock_ml_predictions 
    WHERE symbol = ph.symbol AND user_id = (SELECT user_id FROM portfolios WHERE id = ph.portfolio_id)
    ORDER BY prediction_date DESC LIMIT 1
) smp ON true;

-- ==========================================
-- 13. MATERIALIZED VIEWS FOR PERFORMANCE
-- ==========================================

CREATE MATERIALIZED VIEW stock_analysis_summary AS
SELECT 
    symbol,
    analysis_date,
    
    -- Technical Summary
    trend_direction,
    rsi_14,
    CASE 
        WHEN rsi_14 > 70 THEN 'overbought'
        WHEN rsi_14 < 30 THEN 'oversold'
        ELSE 'neutral'
    END as rsi_signal,
    
    -- Risk Summary
    beta_1y,
    volatility_30d,
    max_drawdown_1y,
    
    -- Sentiment Summary
    news_sentiment_score,
    social_sentiment_score,
    analyst_rating_avg,
    
    -- Overall scores
    (COALESCE(news_sentiment_score, 0) + COALESCE(social_sentiment_score, 0)) / 2 as avg_sentiment,
    
    created_at
FROM stock_technical_analysis sta
LEFT JOIN stock_risk_analysis sra USING (symbol, analysis_date)
LEFT JOIN stock_sentiment_analysis ssa USING (symbol, analysis_date);

CREATE UNIQUE INDEX ON stock_analysis_summary (symbol, analysis_date);

-- Refresh function for materialized view
CREATE OR REPLACE FUNCTION refresh_stock_analysis_summary()
RETURNS VOID AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY stock_analysis_summary;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- END OF SCHEMA
-- ==========================================