from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

# Import quant modules
from . import (
    a_returns as returns,
    b-risk as risk,
    c_regression as regression,
    d_drawdowns as drawdowns,
    e_tailrisk as tailrisk,
    f_graham as graham,
    g_blackscholes as blackscholes,
    h_montecarlo as montecarlo,
)

router = APIRouter()

class AnalysisRequest(BaseModel):
    prices: List[float]
    benchmark: Optional[List[float]] = []
    eps: Optional[float] = None
    bvps: Optional[float] = None
    growth_rate: Optional[float] = None
    bond_yield: Optional[float] = None
    S0: Optional[float] = None
    mu: Optional[float] = None
    sigma: Optional[float] = None
    T: float = 1
    n_paths: int = 1000

@router.post("/run")
def run_full_analysis(req: AnalysisRequest):
    # Section A – Returns
    daily = returns.daily_log_returns(req.prices)
    avg_daily = returns.average_daily_returns(daily)
    ann_return = returns.annualized_return(avg_daily)
    ann_vol = returns.annualized_volatility(daily)

    # Section B – Risk
    sharpe = risk.sharpe_ratio(daily, 0.02/252)
    sortino = risk.sortino_ratio(daily, 0.02/252)

    # Section C – Regression
    alpha_val = regression.alpha(req.prices, req.benchmark) if req.benchmark else None
    r2_val = regression.r_squared(req.prices, req.benchmark) if req.benchmark else None

    # Section D – Drawdowns
    mdd = drawdowns.maximum_drawdown(req.prices)
    cagr_val = drawdowns.cagr(req.prices[0], req.prices[-1], req.T)

    # Section E – Tail Risk
    var_5 = tailrisk.historical_var(daily)
    cvar_5 = tailrisk.cvar(daily)

    # Section F – Graham
    graham_num = graham.grahams_number(req.eps, req.bvps) if req.eps and req.bvps else None
    intrinsic_val = (
        graham.intrinsic_value(req.eps, req.growth_rate, req.bond_yield)
        if req.eps and req.growth_rate and req.bond_yield
        else None
    )

    # Section G – Black-Scholes
    call = (
        blackscholes.call_price(req.S0, req.S0, req.T, 0.02, req.sigma)
        if req.S0 and req.sigma
        else None
    )
    put = (
        blackscholes.put_price(req.S0, req.S0, req.T, 0.02, req.sigma)
        if req.S0 and req.sigma
        else None
    )

    # Section H – Monte Carlo
    montecarlo_summary = (
        montecarlo.summarize_simulation(
            montecarlo.simulate_price_paths(req.S0, req.mu, req.sigma, req.T, 252, req.n_paths)
        )
        if req.S0 and req.mu and req.sigma
        else None
    )

    return {
        "returns": {
            "average_daily": avg_daily,
            "annualized": ann_return,
            "volatility": ann_vol
        },
        "risk": {
            "sharpe": sharpe,
            "sortino": sortino
        },
        "regression": {
            "alpha": alpha_val,
            "r2": r2_val
        },
        "drawdowns": {
            "max_drawdown": mdd,
            "cagr": cagr_val
        },
        "tailrisk": {
            "VaR_5": var_5,
            "CVaR_5": cvar_5
        },
        "graham": {
            "grahams_number": graham_num,
            "intrinsic_value": intrinsic_val
        },
        "blackscholes": {
            "call": call,
            "put": put
        },
        "montecarlo": montecarlo_summary
    }