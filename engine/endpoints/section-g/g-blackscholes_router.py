from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

from .g-blackscholes import call_price, put_price

router = APIRouter()

class BlackScholesRequest(BaseModel):
    S: float
    K: float
    T: float
    r: float
    sigma: float

@router.post("/blackscholes/call")
def blackscholes_call(request: BlackScholesRequest):
    price = call_price(
        S=request.S,
        K=request.K,
        T=request.T,
        r=request.r,
        sigma=request.sigma
    )
    return {"call_price": price}

@router.post("/blackscholes/put")
def blackscholes_put(request: BlackScholesRequest):
    price = put_price(
        S=request.S,
        K=request.K,
        T=request.T,
        r=request.r,
        sigma=request.sigma
    )
    return {"put_price": price}