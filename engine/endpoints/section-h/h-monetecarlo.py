import numpy as np

def simulate_price_paths(S0, mu, sigma, T=1, steps=252, n_paths=1000, seed=None):
    """
    Simulate n_paths stock price paths using Geometric Brownian Motion (GBM).
    Returns: numpy array of shape (n_paths, steps+1)
    """
    if seed is not None:
        np.random.seed(seed)
    dt = T / steps
    # Generate random normal shocks
    Z = np.random.normal(0, 1, (n_paths, steps))
    # Preallocate array
    paths = np.zeros((n_paths, steps + 1))
    paths[:, 0] = S0
    for t in range(1, steps + 1):
        drift = (mu - 0.5 * sigma ** 2) * dt
        shock = sigma * np.sqrt(dt) * Z[:, t - 1]
        paths[:, t] = paths[:, t - 1] * np.exp(drift + shock)
    return paths

def max_drawdown(prices):
    """
    Compute maximum drawdown for a single price path.
    Returns minimum drawdown (e.g. -0.35 for -35%).
    """
    prices = np.array(prices)
    roll_max = np.maximum.accumulate(prices)
    drawdowns = prices / roll_max - 1
    return float(np.min(drawdowns))

def summarize_simulation(paths):
    """
    Summarize Monte Carlo simulation results.
    Returns a dict with:
        - expected_return
        - median_return
        - 5th_percentile
        - 95th_percentile
        - probability_of_loss
        - average_max_drawdown
    """
    S0 = paths[:, 0]
    final_prices = paths[:, -1]
    returns = final_prices / S0 - 1
    expected_return = float(np.mean(returns))
    median_return = float(np.median(returns))
    p5 = float(np.percentile(returns, 5))
    p95 = float(np.percentile(returns, 95))
    prob_loss = float(np.mean(final_prices < S0))
    avg_max_dd = float(np.mean([max_drawdown(path) for path in paths]))
    return {
        "expected_return": expected_return,
        "median_return": median_return,
        "5th_percentile": p5,
        "95th_percentile": p95,
        "probability_of_loss": prob_loss,
        "average_max_drawdown": avg_max_dd
    }