
import uuid
from datetime import datetime

from sqlalchemy import String, Text, DateTime, ForeignKey, UniqueConstraint, func, Table, Column
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


auth_users = Table(
    "users",
    Base.metadata,
    Column("id", UUID(as_uuid=True), primary_key=True),
    schema="auth"
)


class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("auth.users.id"), primary_key=True)
    username: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    display_name: Mapped[str | None] = mapped_column(String)
    avatar_url: Mapped[str | None] = mapped_column(Text)
    bio: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    article_bookmarks = relationship("ArticleBookmark", back_populates="user")
    snippet_bookmarks = relationship("SnippetBookmark", back_populates="user")
    model_bookmarks = relationship("ModelBookmark", back_populates="user")
    article_views = relationship("ArticleView", back_populates="user")
    activities = relationship("UserActivity", back_populates="user")


class ArticleBookmark(Base):
    __tablename__ = "article_bookmarks"
    __table_args__ = (
        UniqueConstraint("user_id", "article_id", name="article_bookmarks_user_article_unique"),
    )

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid())
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("profiles.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    article_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("articles.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user = relationship("Profile", back_populates="article_bookmarks")
    article = relationship("Article")


class SnippetBookmark(Base):
    __tablename__ = "snippet_bookmarks"
    __table_args__ = (
        UniqueConstraint("user_id", "snippet_id", name="snippet_bookmarks_user_snippet_unique"),
    )

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid())
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("profiles.id"), nullable=False)
    snippet_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("snippets.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user = relationship("Profile", back_populates="snippet_bookmarks")
    snippet = relationship("Snippet")


class ModelBookmark(Base):
    __tablename__ = "model_bookmarks"
    __table_args__ = (
        UniqueConstraint("user_id", "model_id", name="model_bookmarks_user_model_unique"),
    )

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid())
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("profiles.id"), nullable=False)
    model_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("ai_models.id"), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user = relationship("Profile", back_populates="model_bookmarks")
    model = relationship("AIModel")
