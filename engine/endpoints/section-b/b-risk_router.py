from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

from .b-risk import (
    excess_return,
    downside_deviation,
    sharpe_ratio,
    sortino_ratio,
    tracking_error,
    beta,
    treynor_ratio,
    annual_active_return,
    information_ratio,
)

router = APIRouter()

class ExcessReturnRequest(BaseModel):
    stock_returns: List[float]
    risk_free: float

class DownsideDeviationRequest(BaseModel):
    returns: List[float]
    threshold: Optional[float] = 0.0

class SharpeRatioRequest(BaseModel):
    returns: List[float]
    risk_free: float

class SortinoRatioRequest(BaseModel):
    returns: List[float]
    risk_free: float
    threshold: Optional[float] = 0.0

class TrackingErrorRequest(BaseModel):
    stock_returns: List[float]
    benchmark_returns: List[float]
    annualize: Optional[bool] = True

class BetaRequest(BaseModel):
    stock_returns: List[float]
    benchmark_returns: List[float]

class TreynorRatioRequest(BaseModel):
    returns: List[float]
    risk_free: float
    beta_value: float

class AnnualActiveReturnRequest(BaseModel):
    stock_returns: List[float]
    benchmark_returns: List[float]

class InformationRatioRequest(BaseModel):
    stock_returns: List[float]
    benchmark_returns: List[float]
    annualize: Optional[bool] = True

@router.post("/risk/excess_return")
def excess_return_endpoint(request: ExcessReturnRequest):
    value = excess_return(request.stock_returns, request.risk_free)
    return {"excess_return": value}

@router.post("/risk/downside_deviation")
def downside_deviation_endpoint(request: DownsideDeviationRequest):
    value = downside_deviation(request.returns, request.threshold)
    return {"downside_deviation": value}

@router.post("/risk/sharpe_ratio")
def sharpe_ratio_endpoint(request: SharpeRatioRequest):
    value = sharpe_ratio(request.returns, request.risk_free)
    return {"sharpe_ratio": value}

@router.post("/risk/sortino_ratio")
def sortino_ratio_endpoint(request: SortinoRatioRequest):
    value = sortino_ratio(request.returns, request.risk_free, request.threshold)
    return {"sortino_ratio": value}

@router.post("/risk/tracking_error")
def tracking_error_endpoint(request: TrackingErrorRequest):
    value = tracking_error(request.stock_returns, request.benchmark_returns, request.annualize)
    return {"tracking_error": value}

@router.post("/risk/beta")
def beta_endpoint(request: BetaRequest):
    value = beta(request.stock_returns, request.benchmark_returns)
    return {"beta": value}

@router.post("/risk/treynor_ratio")
def treynor_ratio_endpoint(request: TreynorRatioRequest):
    value = treynor_ratio(request.returns, request.risk_free, request.beta_value)
    return {"treynor_ratio": value}

@router.post("/risk/annual_active_return")
def annual_active_return_endpoint(request: AnnualActiveReturnRequest):
    value = annual_active_return(request.stock_returns, request.benchmark_returns)
    return {"annual_active_return": value}

@router.post("/risk/information_ratio")
def information_ratio_endpoint(request: InformationRatioRequest):
    value = information_ratio(request.stock_returns, request.benchmark_returns, request.annualize)
    return {"information_ratio": value}