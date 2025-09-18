from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import Optional
import numpy as np

from .h-monetecarlo import simulate_price_paths, summarize_simulation

router = APIRouter()

class MonteCarloRequest(BaseModel):
    S0: float
    mu: float
    sigma: float
    T: float = 1
    steps: int = 252
    n_paths: int = 1000
    seed: Optional[int] = None

@router.post("/montecarlo/simulate")
def montecarlo_simulate(request: MonteCarloRequest):
    paths = simulate_price_paths(
        S0=request.S0,
        mu=request.mu,
        sigma=request.sigma,
        T=request.T,
        steps=request.steps,
        n_paths=request.n_paths,
        seed=request.seed
    )
    # Return only the first 5 paths for preview (to avoid huge payloads)
    preview = paths[:5].tolist()
    return {"preview_paths": preview, "shape": list(paths.shape)}

@router.post("/montecarlo/summary")
def montecarlo_summary(request: MonteCarloRequest):
    paths = simulate_price_paths(
        S0=request.S0,
        mu=request.mu,
        sigma=request.sigma,
        T=request.T,
        steps=request.steps,
        n_paths=request.n_paths,
        seed=request.seed
    )
    summary = summarize_simulation(paths)
    return summary