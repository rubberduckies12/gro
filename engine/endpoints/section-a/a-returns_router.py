from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from .a-returns import (
    daily_log_returns,
    average_daily_returns,
    annualized_return,
    annualized_volatility,
    benchmark_forecast,
)

router = APIRouter()

class PricesRequest(BaseModel):
    prices: List[float]

class LogReturnsRequest(BaseModel):
    log_returns: List[float]

class AvgDailyRequest(BaseModel):
    avg_daily: float

class BenchmarkForecastRequest(BaseModel):
    benchmark_returns: List[float]

@router.post("/returns/daily_log_returns")
def daily_log_returns_endpoint(request: PricesRequest):
    value = daily_log_returns(request.prices)
    return {"daily_log_returns": value}

@router.post("/returns/average_daily_returns")
def average_daily_returns_endpoint(request: LogReturnsRequest):
    value = average_daily_returns(request.log_returns)
    return {"average_daily_return": value}

@router.post("/returns/annualized_return")
def annualized_return_endpoint(request: AvgDailyRequest):
    value = annualized_return(request.avg_daily)
    return {"annualized_return": value}

@router.post("/returns/annualized_volatility")
def annualized_volatility_endpoint(request: LogReturnsRequest):
    value = annualized_volatility(request.log_returns)
    return {"annualized_volatility": value}

@router.post("/returns/benchmark_forecast")
def benchmark_forecast_endpoint(request: BenchmarkForecastRequest):
    value = benchmark_forecast(request.benchmark_returns)
    return {"benchmark_forecast": value}