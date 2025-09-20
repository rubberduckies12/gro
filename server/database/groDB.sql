-- ================================
-- USERS & AUTHENTICATION
-- ================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    kyc_status TEXT CHECK (kyc_status IN ('pending','approved','rejected')) DEFAULT 'pending',
    aml_flag BOOLEAN DEFAULT FALSE,
    provider TEXT DEFAULT 'email',
    external_id TEXT
);

CREATE TABLE oauth_identities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider TEXT NOT NULL,
    external_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(provider, external_id)
);

-- ================================
-- PAYMENTS & SUBSCRIPTIONS
-- ================================
CREATE TABLE plans (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    monthly_price NUMERIC(10,2) CHECK (monthly_price >= 0),
    yearly_price NUMERIC(10,2) CHECK (yearly_price >= 0),
    lifetime_price NUMERIC(10,2) CHECK (lifetime_price >= 0),
    features JSONB
);

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_id INT REFERENCES plans(id),
    start_date TIMESTAMP DEFAULT NOW(),
    end_date TIMESTAMP,
    status TEXT CHECK (status IN ('active','trial','cancelled','expired')) DEFAULT 'active',
    is_trial BOOLEAN DEFAULT FALSE,
    apple_receipt TEXT,
    google_receipt TEXT
);

-- ================================
-- MARKET DATA
-- ================================
CREATE TABLE stock_data (
    id BIGSERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    date DATE NOT NULL,
    open NUMERIC CHECK (open >= 0),
    high NUMERIC CHECK (high >= 0),
    low NUMERIC CHECK (low >= 0),
    close NUMERIC CHECK (close >= 0),
    adj_close NUMERIC CHECK (adj_close >= 0),
    volume BIGINT CHECK (volume >= 0),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(symbol, date)
);

CREATE TABLE fundamentals (
    id BIGSERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    eps NUMERIC CHECK (eps >= 0),
    bvps NUMERIC CHECK (bvps >= 0),
    growth_rate NUMERIC CHECK (growth_rate >= 0),
    bond_yield NUMERIC CHECK (bond_yield >= 0),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(symbol)
);

CREATE TABLE options_data (
    id BIGSERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    strike_price NUMERIC CHECK (strike_price > 0),
    expiry DATE NOT NULL,
    option_type TEXT CHECK (option_type IN ('call','put')),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE risk_free_rates (
    id SERIAL PRIMARY KEY,
    country TEXT NOT NULL,
    rate NUMERIC CHECK (rate >= 0),
    created_at TIMESTAMP DEFAULT NOW()
);

-- ================================
-- GOALS & PORTFOLIOS
-- ================================
CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID UNIQUE,
    name TEXT NOT NULL,
    target_amount NUMERIC CHECK (target_amount >= 0),
    target_date DATE NOT NULL,
    risk_tolerance TEXT CHECK (risk_tolerance IN ('low','medium','high')),
    contribution_amount NUMERIC CHECK (contribution_amount >= 0),
    contribution_frequency TEXT CHECK (contribution_frequency IN ('monthly','quarterly','yearly')),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    goal_id UUID UNIQUE NOT NULL,
    name TEXT NOT NULL,
    amount_invested NUMERIC CHECK (amount_invested >= 0) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_goal FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE CASCADE
);

-- Fixed stock allocations decided by AI at portfolio creation
CREATE TABLE portfolio_allocations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    symbol TEXT NOT NULL,
    target_weight NUMERIC CHECK (target_weight >= 0 AND target_weight <= 1),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Current executed stock holdings (auto-updated as deposits flow in)
CREATE TABLE portfolio_holdings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    symbol TEXT NOT NULL,
    qty NUMERIC CHECK (qty >= 0),                -- shares held
    avg_price NUMERIC CHECK (avg_price >= 0),    -- average purchase price
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Portfolio-level transactions (user deposits/withdrawals only)
CREATE TABLE portfolio_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('deposit','withdraw')),
    amount NUMERIC CHECK (amount > 0),           -- contribution/withdrawal amount
    executed_at TIMESTAMP DEFAULT NOW()
);

-- ================================
-- INDEXES
-- ================================
CREATE INDEX idx_stock_data_symbol_date ON stock_data(symbol, date);
CREATE INDEX idx_fundamentals_symbol ON fundamentals(symbol);
CREATE INDEX idx_options_data_symbol_expiry ON options_data(symbol, expiry);
CREATE INDEX idx_portfolio_allocations_portfolio_id ON portfolio_allocations(portfolio_id);
CREATE INDEX idx_portfolio_holdings_portfolio_id ON portfolio_holdings(portfolio_id);
CREATE INDEX idx_portfolio_transactions_portfolio_id ON portfolio_transactions(portfolio_id);
