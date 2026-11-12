
from fastapi import FastAPI, HTTPException
from sqlalchemy import text
from app.database import engine

app = FastAPI(
    title="TokenTrail API",
    description="Backend API for TokenTrail",
    version="1.0.0"
)

@app.get("/")
def home():
    return {"message": "TokenTrail API is running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/db-check")
def db_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {"database": "connected"}
    except Exception:
        raise HTTPException(
            status_code=503,
            detail="Database connection failed"
        )
