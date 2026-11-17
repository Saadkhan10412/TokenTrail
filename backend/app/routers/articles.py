
from uuid import UUID
from math import ceil

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, func
from sqlalchemy.orm import Session, selectinload

from app.database import get_db
from app.models.content import Article
from app.schemas.article import ArticleResponse, ArticleListResponse


router = APIRouter(
    prefix="/articles",
    tags=["Articles"]
)


@router.get("/", response_model=ArticleListResponse)
def get_articles(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=50),
    category: str | None = None,
    feed_category: str | None = None,
    source_id: UUID | None = None,
    db: Session = Depends(get_db)
):
    query = select(Article).options(
        selectinload(Article.source),
        selectinload(Article.category)
    )

    total_query = select(func.count()).select_from(Article)

    if category:
        query = query.join(Article.category).where(
            Article.category.has(slug=category)
        )
        total_query = total_query.join(Article.category).where(
            Article.category.has(slug=category)
        )

    if feed_category:
        query = query.where(Article.feed_category == feed_category)
        total_query = total_query.where(
            Article.feed_category == feed_category
        )

    if source_id:
        query = query.where(Article.source_id == source_id)
        total_query = total_query.where(
            Article.source_id == source_id
        )

    total = db.scalar(total_query)

    articles = db.scalars(
        query
        .order_by(
            Article.published_at.desc().nulls_last(),
            Article.created_at.desc()
        )
        .offset((page - 1) * limit)
        .limit(limit)
    ).all()

    return {
        "items": articles,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": ceil(total / limit) if total else 0
    }


@router.get("/{article_id}", response_model=ArticleResponse)
def get_article(
    article_id: UUID,
    db: Session = Depends(get_db)
):
    article = db.scalar(
        select(Article)
        .options(
            selectinload(Article.source),
            selectinload(Article.category)
        )
        .where(Article.id == article_id)
    )

    if not article:
        raise HTTPException(
            status_code=404,
            detail="Article not found"
        )

    return article
