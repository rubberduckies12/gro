import numpy as np

def capm_expected_return(beta, risk_free, market_return):
    """CAPM expected return (single period)."""
    return float(risk_free + beta * (market_return - risk_free))

def historical_expected_return(returns):
    """Historical average expected return (pass returns, not prices)."""
    return float(np.mean(returns))

def cumulative_log_returns(log_returns):
    """Cumulative log return series (pass log returns)."""
    return np.cumsum(log_returns).tolist()

def rolling_maximum(values):
    """Rolling maximum (peak so far) of a series (pass prices or cumulative returns)."""
    return np.maximum.accumulate(values).tolist()

def maximum_drawdown(values, absolute=False):
    """
    Maximum drawdown from a series of values.
    Returns the minimum drawdown (e.g. -0.35 for -35%).
    If absolute=True, returns abs(min_drawdown).
    """
    values = np.array(values)
    roll_max = np.maximum.accumulate(values)
    drawdowns = values / roll_max - 1
    min_drawdown = float(np.min(drawdowns))
    return abs(min_drawdown) if absolute else min_drawdown

def cumulative_return(prices):
    """Cumulative return from start to end (pass prices)."""
    prices = np.array(prices)
    return float(prices[-1] / prices[0] - 1)

def calmar_ratio(cagr, max_drawdown):
    """Calmar Ratio: CAGR / |MDD|."""
    if max_drawdown == 0:
        return 0.0
    return float(cagr / abs(max_drawdown))

def jensens_alpha(portfolio_returns, risk_free, beta, market_returns, annualize=True):
    """
    Jensen's Alpha (annualized by default).
    Pass lists of returns for portfolio and market.
    """
    avg_portfolio = np.mean(portfolio_returns)
    avg_market = np.mean(market_returns)
    expected = risk_free + beta * (avg_market - risk_free)
    alpha = avg_portfolio - expected
    if annualize:
        alpha *= 252
    return float(alpha)

def capm_forecast(beta, risk_free, expected_market_return):
    """Forward-looking CAPM forecast (single period)."""
    return float(risk_free + beta * (expected_market_return - risk_free))

def cagr(start_value, end_value, years):
    """Compounded Annual Growth Rate (CAGR). Pass prices and years."""
    if start_value <= 0 or end_value <= 0 or years <= 0:
        return 0.0
    return float((end_value / start_value) ** (1 / years) - 1)