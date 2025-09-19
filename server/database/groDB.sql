-- Loop (Gro) Database Schema - Portfolio-centric

-- Users & Auth
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    first_name TEXT,
    last_name TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    kyc_status TEXT CHECK (kyc_status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
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

-- Payment & Subscription
CREATE TABLE plans (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,                   -- Essential, Advanced, Pro, Lifetime
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
    status TEXT CHECK (status IN ('active', 'trial', 'cancelled', 'expired')) DEFAULT 'active',
    is_trial BOOLEAN DEFAULT FALSE,
    apple_receipt TEXT,
    google_receipt TEXT
);

-- Portfolios (user can have multiple)
CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,                  -- e.g. "Retirement", "Growth"
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Recommended Allocations (per portfolio, before user confirms)
CREATE TABLE portfolio_allocations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    symbol TEXT NOT NULL,
    weight NUMERIC CHECK (weight >= 0 AND weight <= 1),
    confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Executed Holdings (per portfolio)
CREATE TABLE portfolio_holdings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    symbol TEXT NOT NULL,
    qty NUMERIC CHECK (qty > 0),
    avg_price NUMERIC CHECK (avg_price > 0),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Transaction History (per portfolio, buy/sell)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
    symbol TEXT NOT NULL,
    side TEXT CHECK (side IN ('buy','sell')),
    qty NUMERIC CHECK (qty > 0),
    price NUMERIC CHECK (price > 0),
    executed_at TIMESTAMP DEFAULT NOW()
);

-- Market Data (global, not user-specific)
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

-- Fundamentals
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

-- Options Data
CREATE TABLE options_data (
    id BIGSERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    strike_price NUMERIC CHECK (strike_price > 0),
    expiry DATE NOT NULL,
    option_type TEXT CHECK (option_type IN ('call','put')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Risk-free Rates
CREATE TABLE risk_free_rates (
    id SERIAL PRIMARY KEY,
    country TEXT NOT NULL,
    rate NUMERIC CHECK (rate >= 0),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_stock_data_symbol_date ON stock_data(symbol, date);
CREATE INDEX idx_fundamentals_symbol ON fundamentals(symbol);
CREATE INDEX idx_options_data_symbol_expiry ON options_data(symbol, expiry);
CREATE INDEX idx_portfolio_allocations_portfolio_id ON portfolio_allocations(portfolio_id);
CREATE INDEX idx_portfolio_holdings_portfolio_id ON portfolio_holdings(portfolio_id);
CREATE INDEX idx_transactions_portfolio_id ON transactions(portfolio_id);