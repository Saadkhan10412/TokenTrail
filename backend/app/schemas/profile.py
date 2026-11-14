
from pydantic import BaseModel, Field


class ProfileCreate(BaseModel):
    username: str = Field(
        min_length=3,
        max_length=30,
        pattern=r"^[a-zA-Z0-9_]+$"
    )


class ProfileUpdate(BaseModel):
    username: str | None = Field(
        default=None,
        min_length=3,
        max_length=30,
        pattern=r"^[a-zA-Z0-9_]+$"
    )
    display_name: str | None = Field(default=None, max_length=50)
    avatar_url: str | None = None
    bio: str | None = Field(default=None, max_length=250)


from datetime import datetime
from uuid import UUID


class ProfileResponse(BaseModel):
    id: UUID
    username: str
    display_name: str | None
    avatar_url: str | None
    bio: str | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
