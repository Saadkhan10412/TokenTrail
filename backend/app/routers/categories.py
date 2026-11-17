
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.content import Category


router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.get("/")
def get_categories(db: Session = Depends(get_db)):
    return db.scalars(
        select(Category).order_by(Category.name)
    ).all()
