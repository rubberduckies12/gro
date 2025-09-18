import numpy as np

def daily_log_returns(prices):
    """Calculate daily log returns from a list of prices."""
    prices = np.array(prices)
    log_returns = np.log(prices[1:] / prices[:-1])
    return log_returns.tolist()

def average_daily_returns(log_returns):
    """Calculate the average daily return from a list of log returns."""
    avg = np.mean(log_returns)
    return float(avg)

def annualized_return(avg_daily):
    """Annualize the average daily return using compounding (252 trading days)."""
    annualized = (1 + avg_daily) ** 252 - 1
    return float(annualized)

def annualized_volatility(log_returns):
    """Calculate annualized volatility from a list of log returns."""
    daily_vol = np.std(log_returns, ddof=1)  # sample stdev
    annualized_vol = daily_vol * np.sqrt(252)
    return float(annualized_vol)

def benchmark_forecast(benchmark_returns):
    """Annualized forecast for benchmark daily returns (compounding)."""
    avg_benchmark = np.mean(benchmark_returns)
    annualized_benchmark = (1 + avg_benchmark) ** 252 - 1
    return float(annualized_benchmark)