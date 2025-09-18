from fastapi import APIRouter
from pydantic import BaseModel

from .f-graham import grahams_number, intrinsic_value

router = APIRouter()

class GrahamNumberRequest(BaseModel):
    eps: float
    bvps: float

class IntrinsicValueRequest(BaseModel):
    eps: float
    growth_rate: float
    bond_yield: float

@router.post("/graham/number")
def graham_number_endpoint(request: GrahamNumberRequest):
    value = grahams_number(request.eps, request.bvps)
    return {"grahams_number": value}

@router.post("/graham/intrinsic")
def intrinsic_value_endpoint(request: IntrinsicValueRequest):
    value = intrinsic_value(request.eps, request.growth_rate, request.bond_yield)
    return {"intrinsic_value": value}