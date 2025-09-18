from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

from .e-tailrisk import historical_var, parametric_var, cvar

router = APIRouter()

class TailRiskRequest(BaseModel):
    returns: List[float]
    alpha: Optional[float] = 0.05
    annualize: Optional[bool] = False

@router.post("/tailrisk/historical_var")
def historical_var_endpoint(request: TailRiskRequest):
    value = historical_var(request.returns, request.alpha)
    return {"historical_var": value}

@router.post("/tailrisk/parametric_var")
def parametric_var_endpoint(request: TailRiskRequest):
    value = parametric_var(request.returns, request.alpha, request.annualize)
    return {"parametric_var": value}

@router.post("/tailrisk/cvar")
def cvar_endpoint(request: TailRiskRequest):
    value = cvar(request.returns, request.alpha)
    return {"cvar": value}