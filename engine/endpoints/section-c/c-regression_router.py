from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from .c-regression import (
    correlation,
    regression_beta,
    alpha,
    r_squared,
    idiosyncratic_volatility,
)

router = APIRouter()

class RegressionRequest(BaseModel):
    stock_returns: List[float]
    benchmark_returns: List[float]

@router.post("/regression/correlation")
def correlation_endpoint(request: RegressionRequest):
    value = correlation(request.stock_returns, request.benchmark_returns)
    return {"correlation": value}

@router.post("/regression/beta")
def beta_endpoint(request: RegressionRequest):
    value = regression_beta(request.stock_returns, request.benchmark_returns)
    return {"beta": value}

@router.post("/regression/alpha")
def alpha_endpoint(request: RegressionRequest):
    value = alpha(request.stock_returns, request.benchmark_returns)
    return {"alpha": value}

@router.post("/regression/r_squared")
def r_squared_endpoint(request: RegressionRequest):
    value = r_squared(request.stock_returns, request.benchmark_returns)
    return {"r_squared": value}

@router.post("/regression/idiosyncratic_volatility")
def idiosyncratic_volatility_endpoint(request: RegressionRequest):
    value = idiosyncratic_volatility(request.stock_returns, request.benchmark_returns)
    return {"idiosyncratic_volatility": value}