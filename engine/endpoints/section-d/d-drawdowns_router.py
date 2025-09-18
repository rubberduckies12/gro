from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

from .d-drawdowns import (
    capm_expected_return,
    historical_expected_return,
    cumulative_log_returns,
    rolling_maximum,
    maximum_drawdown,
    cumulative_return,
    calmar_ratio,
    jensens_alpha,
    capm_forecast,
    cagr,
)

router = APIRouter()

class CAPMRequest(BaseModel):
    beta: float
    risk_free: float
    market_return: float

class HistoricalExpectedReturnRequest(BaseModel):
    returns: List[float]

class CumulativeLogReturnsRequest(BaseModel):
    log_returns: List[float]

class RollingMaximumRequest(BaseModel):
    values: List[float]

class MaximumDrawdownRequest(BaseModel):
    values: List[float]
    absolute: Optional[bool] = False

class CumulativeReturnRequest(BaseModel):
    prices: List[float]

class CalmarRatioRequest(BaseModel):
    cagr: float
    max_drawdown: float

class JensensAlphaRequest(BaseModel):
    portfolio_returns: List[float]
    risk_free: float
    beta: float
    market_returns: List[float]
    annualize: Optional[bool] = True

class CAPMForecastRequest(BaseModel):
    beta: float
    risk_free: float
    expected_market_return: float

class CAGRRequest(BaseModel):
    start_value: float
    end_value: float
    years: float

@router.post("/drawdowns/capm_expected_return")
def capm_expected_return_endpoint(request: CAPMRequest):
    value = capm_expected_return(request.beta, request.risk_free, request.market_return)
    return {"capm_expected_return": value}

@router.post("/drawdowns/historical_expected_return")
def historical_expected_return_endpoint(request: HistoricalExpectedReturnRequest):
    value = historical_expected_return(request.returns)
    return {"historical_expected_return": value}

@router.post("/drawdowns/cumulative_log_returns")
def cumulative_log_returns_endpoint(request: CumulativeLogReturnsRequest):
    value = cumulative_log_returns(request.log_returns)
    return {"cumulative_log_returns": value}

@router.post("/drawdowns/rolling_maximum")
def rolling_maximum_endpoint(request: RollingMaximumRequest):
    value = rolling_maximum(request.values)
    return {"rolling_maximum": value}

@router.post("/drawdowns/maximum_drawdown")
def maximum_drawdown_endpoint(request: MaximumDrawdownRequest):
    value = maximum_drawdown(request.values, request.absolute)
    return {"maximum_drawdown": value}

@router.post("/drawdowns/cumulative_return")
def cumulative_return_endpoint(request: CumulativeReturnRequest):
    value = cumulative_return(request.prices)
    return {"cumulative_return": value}

@router.post("/drawdowns/calmar_ratio")
def calmar_ratio_endpoint(request: CalmarRatioRequest):
    value = calmar_ratio(request.cagr, request.max_drawdown)
    return {"calmar_ratio": value}

@router.post("/drawdowns/jensens_alpha")
def jensens_alpha_endpoint(request: JensensAlphaRequest):
    value = jensens_alpha(
        request.portfolio_returns,
        request.risk_free,
        request.beta,
        request.market_returns,
        request.annualize,
    )
    return {"jensens_alpha": value}

@router.post("/drawdowns/capm_forecast")
def capm_forecast_endpoint(request: CAPMForecastRequest):
    value = capm_forecast(request.beta, request.risk_free, request.expected_market_return)
    return {"capm_forecast": value}

@router.post("/drawdowns/cagr")
def cagr_endpoint(request: CAGRRequest):
    value = cagr(request.start_value, request.end_value, request.years)
    return {"cagr": value}