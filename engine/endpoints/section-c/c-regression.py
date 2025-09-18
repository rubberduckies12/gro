import numpy as np

def correlation(stock_returns, benchmark_returns):
    """Correlation coefficient (ρ) between stock and benchmark returns."""
    if len(stock_returns) != len(benchmark_returns):
        raise ValueError("Stock and benchmark returns must be the same length.")
    return round(float(np.corrcoef(stock_returns, benchmark_returns)[0, 1]), 6)

def regression_beta(stock_returns, benchmark_returns):
    """Regression Beta (slope)."""
    if len(stock_returns) != len(benchmark_returns):
        raise ValueError("Stock and benchmark returns must be the same length.")
    stock = np.array(stock_returns)
    bench = np.array(benchmark_returns)
    cov = np.cov(stock, bench, ddof=1)[0, 1]
    var = np.var(bench, ddof=1)
    if var == 0:
        return 0.0
    return round(float(cov / var), 6)

def alpha(stock_returns, benchmark_returns):
    """Regression Alpha (intercept)."""
    if len(stock_returns) != len(benchmark_returns):
        raise ValueError("Stock and benchmark returns must be the same length.")
    b = regression_beta(stock_returns, benchmark_returns)
    return round(float(np.mean(stock_returns) - b * np.mean(benchmark_returns)), 6)

def r_squared(stock_returns, benchmark_returns):
    """Coefficient of determination (R²)."""
    if len(stock_returns) != len(benchmark_returns):
        raise ValueError("Stock and benchmark returns must be the same length.")
    corr = np.corrcoef(stock_returns, benchmark_returns)[0, 1]
    return round(float(corr ** 2), 6)

def idiosyncratic_volatility(stock_returns, benchmark_returns):
    """Idiosyncratic volatility: std dev of regression residuals, annualized."""
    if len(stock_returns) != len(benchmark_returns):
        raise ValueError("Stock and benchmark returns must be the same length.")
    stock = np.array(stock_returns)
    bench = np.array(benchmark_returns)
    b = regression_beta(stock_returns, benchmark_returns)
    a = alpha(stock_returns, benchmark_returns)
    residuals = stock - (a + b * bench)
    return round(float(np.std(residuals, ddof=1) * np.sqrt(252)), 6)