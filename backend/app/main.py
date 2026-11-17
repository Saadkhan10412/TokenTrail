from app.routers.snippets import router as snippets_router
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.routers.users import router as users_router
from app.routers.profiles import router as profiles_router
from app.database import engine
from app.routers.articles import router as articles_router
from app.routers.categories import router as categories_router
from app.routers.sources import router as sources_router

app = FastAPI(
    title="TokenTrail API",
    description="Backend API for TokenTrail",
    version="1.0.0"
)

app.include_router(users_router)
app.include_router(profiles_router)
app.include_router(articles_router)
app.include_router(categories_router)
app.include_router(sources_router)
app.include_router(snippets_router)

origins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
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
