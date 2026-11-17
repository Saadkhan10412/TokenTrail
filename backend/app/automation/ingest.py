
from datetime import datetime

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from app.database import SessionLocal
from app.models.content import Article, Category, Source
from app.automation.feeds import fetch_feeds
from app.services.ai.processor import process_article


AI_SUMMARY_CATEGORIES = {
    "AI Industry",
    "Developer Updates"
}


def ingest_articles():
    results = fetch_feeds()
    db = SessionLocal()

    inserted = 0
    skipped = 0
    failed = 0
    ai_calls = 0

    try:
        categories = {
            category.slug: category.id
            for category in db.scalars(select(Category)).all()
        }

        sources = {
            source.name: source.id
            for source in db.scalars(select(Source)).all()
        }

        seen = set()

        for articles in results.values():
            for item in articles:
                url = item["url"]

                if url in seen:
                    continue

                seen.add(url)

                try:
                    existing = db.scalar(
                        select(Article.id).where(
                            Article.original_url == url
                        )
                    )

                    if existing:
                        skipped += 1
                        print(f"Already exists: {item['title']}")
                        continue

                    print(f"\nProcessing: {item['title']}")

                    if item.get("category") in AI_SUMMARY_CATEGORIES:
                        if not item["summary"].strip():
                            skipped += 1
                            print("Skipped: No article description")
                            continue

                        ai = process_article(
                            title=item["title"],
                            intro=item["summary"],
                            source=item["source"]
                        )

                        ai_calls += 1

                        if not ai["is_relevant"]:
                            skipped += 1
                            print("Skipped: Not AI-related")
                            continue

                        summary = ai["summary"]
                        feed_category = ai["feed_category"]
                        topic_category = ai["topic_category"]

                    else:
                        summary = item["summary"]
                        feed_category = item["category"]
                        topic_category = "artificial-intelligence"

                    category_id = categories.get(topic_category)

                    if not category_id:
                        skipped += 1
                        print("Skipped: Category not found")
                        continue

                    article = Article(
                        source_id=sources.get(item["source"]),
                        category_id=category_id,
                        title=item["title"],
                        summary=summary,
                        content=item["summary"],
                        original_url=url,
                        published_at=datetime.fromisoformat(
                            item["published"]
                        ),
                        feed_category=feed_category
                    )

                    db.add(article)
                    db.commit()

                    inserted += 1
                    print("Saved:", feed_category)

                except IntegrityError:
                    db.rollback()
                    skipped += 1
                    print("Skipped: Duplicate article")

                except Exception as error:
                    db.rollback()
                    failed += 1
                    print(f"Failed: {item['title']} - {error}")

        print("\nIngestion complete")
        print(f"Saved: {inserted}")
        print(f"Skipped: {skipped}")
        print(f"Failed: {failed}")
        print(f"AI requests: {ai_calls}")

    finally:
        db.close()


if __name__ == "__main__":
    ingest_articles()
