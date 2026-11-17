
from uuid import UUID
from sqlalchemy.orm import Session, selectinload
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.utils.dependencies import get_current_user
from app.models.content import Snippet, Category
from app.models.users import Profile, SnippetBookmark


router = APIRouter(
    prefix="/snippets",
    tags=["Snippets"]
)


@router.post("/{snippet_id}/bookmark")
def save_snippet(
    snippet_id: UUID,
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = UUID(user["id"])

    if not db.get(Profile, user_id):
        raise HTTPException(
            status_code=404,
            detail="Profile not found. Create your profile first."
        )

    snippet = db.scalar(
        select(Snippet).where(
            Snippet.id == snippet_id,
            Snippet.is_published == True
        )
    )

    if not snippet:
        raise HTTPException(
            status_code=404,
            detail="Snippet not found"
        )

    bookmark = db.scalar(
        select(SnippetBookmark).where(
            SnippetBookmark.user_id == user_id,
            SnippetBookmark.snippet_id == snippet_id
        )
    )

    if bookmark:
        return {"message": "Snippet already saved"}

    bookmark = SnippetBookmark(
        user_id=user_id,
        snippet_id=snippet_id
    )

    db.add(bookmark)
    db.commit()

    return {"message": "Snippet saved successfully"}


@router.delete("/{snippet_id}/bookmark")
def remove_bookmark(
    snippet_id: UUID,
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = UUID(user["id"])

    bookmark = db.scalar(
        select(SnippetBookmark).where(
            SnippetBookmark.user_id == user_id,
            SnippetBookmark.snippet_id == snippet_id
        )
    )

    if not bookmark:
        return {"message": "Snippet was not saved"}

    db.delete(bookmark)
    db.commit()

    return {"message": "Snippet removed successfully"}


@router.get("/bookmarks")
def get_saved_snippets(
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = UUID(user["id"])

    results = db.execute(
        select(SnippetBookmark, Snippet, Category)
        .join(Snippet, SnippetBookmark.snippet_id == Snippet.id)
        .join(Category, Snippet.category_id == Category.id)
        .where(
            SnippetBookmark.user_id == user_id,
            Snippet.is_published == True
        )
        .order_by(SnippetBookmark.created_at.desc())
    ).all()

    return [
        {
            "id": snippet.id,
            "title": snippet.title,
            "content": snippet.content,
            "takeaway": snippet.takeaway,
            "image_url": snippet.image_url,
            "difficulty": snippet.difficulty,
            "estimated_read_time": snippet.estimated_read_time,
            "category": category.name,
            "saved_at": bookmark.created_at
        }
        for bookmark, snippet, category in results
    ]

@router.get("/")
def get_snippets(
    user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user_id = user["id"]

    snippets = db.scalars(
        select(Snippet)
        .options(selectinload(Snippet.category))
        .where(Snippet.is_published == True)
        .order_by(Snippet.created_at.desc())
    ).all()

    saved_ids = set(
        db.scalars(
            select(SnippetBookmark.snippet_id)
            .where(SnippetBookmark.user_id == user_id)
        ).all()
    )

    return {
        "items": [
            {
                "id": str(snippet.id),
                "title": snippet.title,
                "content": snippet.content,
                "takeaway": snippet.takeaway,
                "image_url": snippet.image_url,
                "difficulty": snippet.difficulty,
                "estimated_read_time": snippet.estimated_read_time,
                "category": snippet.category.name,
                "is_saved": snippet.id in saved_ids
            }
            for snippet in snippets
        ]
    }