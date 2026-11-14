
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.utils.dependencies import get_current_user
from app.schemas.profile import (
    ProfileCreate,
    ProfileUpdate,
    ProfileResponse
)
from app.services.profile import (
    create_profile,
    get_profile,
    update_profile
)


router = APIRouter(
    prefix="/profiles",
    tags=["Profiles"]
)


@router.post(
    "/me",
    response_model=ProfileResponse,
    status_code=status.HTTP_201_CREATED
)
def create_my_profile(
    data: ProfileCreate,
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return create_profile(
        db,
        user["id"],
        data.username
    )


@router.get("/me", response_model=ProfileResponse)
def get_my_profile(
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return get_profile(db, user["id"])


@router.patch("/me", response_model=ProfileResponse)
def update_my_profile(
    data: ProfileUpdate,
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return update_profile(
        db,
        user["id"],
        data.model_dump(exclude_unset=True)
    )
