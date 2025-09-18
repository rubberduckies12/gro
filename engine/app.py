from fastapi import FastAPI

# Import all routers
from endpoints.section-a.a-returns_router import router as returns_router
from endpoints.section-b.b-risk_router import router as risk_router
from endpoints.section-c.c-regression_router import router as regression_router
from endpoints.section-d.d-drawdowns_router import router as drawdowns_router
from endpoints.section-e.e-tailrisk_router import router as tailrisk_router
from endpoints.section-f.f-graham_router import router as graham_router
from endpoints.section-g.g-blackscholes_router import router as blackscholes_router
from endpoints.section-h.h-montecarlo_router import router as montecarlo_router

app = FastAPI()

# Register routers
app.include_router(returns_router)
app.include_router(risk_router)
app.include_router(regression_router)
app.include_router(drawdowns_router)
app.include_router(tailrisk_router)
app.include_router(graham_router)
app.include_router(blackscholes_router)
app.include_router(montecarlo_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to your Python FastAPI backend!"}

@app.get("/status")
def read_status():
    return {"status": "ok"}