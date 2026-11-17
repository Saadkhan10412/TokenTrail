
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.content import Source


router = APIRouter(
    prefix="/sources",
    tags=["Sources"]
)


@router.get("/")
def get_sources(db: Session = Depends(get_db)):
    return db.scalars(
        select(Source)
        .where(Source.is_active == True)
        .order_by(Source.name)
    ).all()
