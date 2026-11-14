
from uuid import UUID

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.models.users import Profile


def create_profile(db: Session, user_id: UUID, username: str):
    existing = db.scalar(
        select(Profile).where(Profile.id == user_id)
    )

    if existing:
        raise HTTPException(
            status_code=409,
            detail="Profile already exists"
        )

    existing_username = db.scalar(
        select(Profile).where(Profile.username == username)
    )

    if existing_username:
        raise HTTPException(
            status_code=409,
            detail="Username already taken"
        )

    profile = Profile(
        id=user_id,
        username=username
    )

    try:
        db.add(profile)
        db.commit()
        db.refresh(profile)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Username already taken"
        )

    return profile


def get_profile(db: Session, user_id: UUID):
    profile = db.get(Profile, user_id)

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return profile


def update_profile(db: Session, user_id: UUID, data: dict):
    profile = get_profile(db, user_id)

    for field, value in data.items():
        if value is not None:
            setattr(profile, field, value)

    try:
        db.commit()
        db.refresh(profile)
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Username already taken"
        )

    return profile
