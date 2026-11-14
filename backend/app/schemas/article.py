
from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class SourceSummary(BaseModel):
    id: UUID
    name: str
    website_url: str | None

    model_config = ConfigDict(from_attributes=True)


class CategorySummary(BaseModel):
    id: UUID
    name: str
    slug: str

    model_config = ConfigDict(from_attributes=True)


class ArticleResponse(BaseModel):
    id: UUID
    title: str
    summary: str | None
    content: str | None
    original_url: str | None
    image_url: str | None
    author: str | None
    published_at: datetime | None
    created_at: datetime
    source: SourceSummary | None
    category: CategorySummary | None

    model_config = ConfigDict(from_attributes=True)


class ArticleListResponse(BaseModel):
    items: list[ArticleResponse]
    total: int
    page: int
    limit: int
    pages: int
