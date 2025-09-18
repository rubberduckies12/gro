from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to your Python FastAPI backend!"}

@app.get("/status")
def read_status():
    return {"status": "ok"}