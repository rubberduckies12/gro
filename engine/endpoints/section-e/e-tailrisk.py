import numpy as np
from scipy.stats import norm

def historical_var(returns, alpha=0.05):
    """Historical VaR at given alpha (default 5%)."""
    returns = np.array(returns)
    return float(np.percentile(returns, 100 * alpha))

def parametric_var(returns, alpha=0.05, annualize=False):
    """Parametric (normal) VaR at given alpha (default 5%)."""
    returns = np.array(returns)
    mu = np.mean(returns)
    sigma = np.std(returns, ddof=1)
    if annualize:
        sigma *= np.sqrt(252)
    z = norm.ppf(alpha)  # z-value for left tail
    return float(mu + z * sigma)

def cvar(returns, alpha=0.05):
    """Conditional VaR (Expected Shortfall) at given alpha (default 5%)."""
    returns = np.array(returns)
    var_level = historical_var(returns, alpha)
    tail_losses = returns[returns <= var_level]
    if len(tail_losses) == 0:
        return 0.0
    return float(np.mean(tail_losses))