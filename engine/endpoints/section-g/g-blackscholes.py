import numpy as np
from scipy.stats import norm

def d1(S, K, T, r, sigma):
    """Helper: d1 in Black-Scholes formula."""
    if T <= 0 or sigma <= 0:
        return 0.0
    return (np.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * np.sqrt(T))

def d2(S, K, T, r, sigma):
    """Helper: d2 in Black-Scholes formula."""
    return d1(S, K, T, r, sigma) - sigma * np.sqrt(T)

def call_price(S, K, T, r, sigma):
    """Black-Scholes call option price."""
    D1 = d1(S, K, T, r, sigma)
    D2 = d2(S, K, T, r, sigma)
    return float(S * norm.cdf(D1) - K * np.exp(-r * T) * norm.cdf(D2))

def put_price(S, K, T, r, sigma):
    """Black-Scholes put option price."""
    D1 = d1(S, K, T, r, sigma)
    D2 = d2(S, K, T, r, sigma)
    return float(K * np.exp(-r * T) * norm.cdf(-D2) - S * norm.cdf(-D1))