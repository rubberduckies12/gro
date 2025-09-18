import numpy as np

def excess_return(stock_returns, risk_free):
    """Excess returns: stock - risk-free rate."""
    return [float(r - risk_free) for r in stock_returns]

def downside_deviation(returns, threshold=0.0):
    """Downside deviation: sqrt of downside variance below threshold."""
    returns = np.array(returns)
    downside = returns[returns < threshold]
    if len(downside) == 0:
        return 0.0
    downside_var = np.mean((downside - threshold) ** 2)
    return float(np.sqrt(downside_var))

def sharpe_ratio(returns, risk_free):
    """Sharpe Ratio: (mean return - risk-free) / std dev of returns."""
    returns = np.array(returns)
    avg = np.mean(returns)
    std = np.std(returns, ddof=1)
    if std == 0:
        return 0.0
    return float((avg - risk_free) / std)

def sortino_ratio(returns, risk_free, threshold=0.0):
    """Sortino Ratio: (mean return - risk-free) / downside deviation."""
    returns = np.array(returns)
    avg = np.mean(returns)
    dd = downside_deviation(returns, threshold)
    if dd == 0:
        return 0.0
    return float((avg - risk_free) / dd)

def tracking_error(stock_returns, benchmark_returns, annualize=True):
    """Tracking Error: std dev of (stock - benchmark) returns, annualized by default."""
    diff = np.array(stock_returns) - np.array(benchmark_returns)
    te = np.std(diff, ddof=1)
    if annualize:
        te *= np.sqrt(252)
    return float(te)

def beta(stock_returns, benchmark_returns):
    """Beta: Cov(stock, benchmark) / Var(benchmark)."""
    stock = np.array(stock_returns)
    bench = np.array(benchmark_returns)
    cov = np.cov(stock, bench, ddof=1)[0, 1]
    var = np.var(bench, ddof=1)
    if var == 0:
        return 0.0
    return float(cov / var)

def treynor_ratio(returns, risk_free, beta_value):
    """Treynor Ratio: (mean return - risk-free) / beta."""
    avg = np.mean(returns)
    if beta_value == 0:
        return 0.0
    return float((avg - risk_free) / beta_value)

def annual_active_return(stock_returns, benchmark_returns):
    """Annual Active Return: annualized difference between stock and benchmark mean returns."""
    avg_stock = np.mean(stock_returns)
    avg_bench = np.mean(benchmark_returns)
    return float((avg_stock - avg_bench) * 252)

def information_ratio(stock_returns, benchmark_returns, annualize=True):
    """Information Ratio: mean(active return) / std dev(active return), annualized by default."""
    active = np.array(stock_returns) - np.array(benchmark_returns)
    avg_active = np.mean(active)
    std_active = np.std(active, ddof=1)
    if std_active == 0:
        return 0.0
    ir = avg_active / std_active
    if annualize:
        ir *= np.sqrt(252)
    return float(ir)