
import uuid
from datetime import datetime, date

from sqlalchemy import BigInteger, Boolean, Date, DateTime, ForeignKey, UniqueConstraint, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base


class ArticleView(Base):
    __tablename__ = "article_views"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid())
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("profiles.id"), nullable=False)
    article_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("articles.id"), nullable=False)
    viewed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    read_duration: Mapped[int] = mapped_column(BigInteger, server_default="0", nullable=False)
    is_completed: Mapped[bool] = mapped_column(Boolean, server_default="false", nullable=False)

    user = relationship("Profile", back_populates="article_views")
    article = relationship("Article")


class UserActivity(Base):
    __tablename__ = "user_activity"
    __table_args__ = (
        UniqueConstraint("user_id", "activity_date", name="user_activity_user_date_unique"),
    )

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid())
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("profiles.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    activity_date: Mapped[date] = mapped_column(Date, nullable=False)
    articles_read: Mapped[int] = mapped_column(BigInteger, server_default="0", nullable=False)
    snippets_viewed: Mapped[int] = mapped_column(BigInteger, server_default="0", nullable=False)
    models_explored: Mapped[int] = mapped_column(BigInteger, server_default="0", nullable=False)
    total_read_time: Mapped[int] = mapped_column(BigInteger, server_default="0", nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user = relationship("Profile", back_populates="activities")
