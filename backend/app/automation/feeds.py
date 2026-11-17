
import feedparser
import httpx
import re
from datetime import datetime, timedelta, timezone
from html.parser import HTMLParser

from sqlalchemy import select

from app.automation.github import fetch_github_repos
from app.database import SessionLocal
from app.models.content import Source


LIMIT = 10
DAYS = 30
HF_MODELS_URL = "https://huggingface.co/api/models"


class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
        self.buffer = []
        self.skip_depth = 0
        self.container_depth = 0
        self.current_tag = None
        self.article_parts = []
        self.fallback_parts = []

    def handle_starttag(self, tag, attrs):
        if tag in {"script", "style", "noscript", "svg", "iframe"}:
            self.skip_depth += 1
            return

        if self.skip_depth:
            return

        if tag in {"article", "main"}:
            self.container_depth += 1

        if tag in {"p", "h1", "h2", "h3"}:
            self.current_tag = tag
            self.buffer = []

    def handle_data(self, data):
        if self.skip_depth or not self.current_tag:
            return

        text = data.strip()

        if text:
            self.buffer.append(text)

    def handle_endtag(self, tag):
        if tag in {"script", "style", "noscript", "svg", "iframe"}:
            if self.skip_depth:
                self.skip_depth -= 1
            return

        if self.skip_depth:
            return

        if tag == self.current_tag:
            text = " ".join(self.buffer).strip()

            if text:
                self.fallback_parts.append(text)

                if self.container_depth:
                    self.article_parts.append(text)

            self.buffer = []
            self.current_tag = None

        if tag in {"article", "main"}:
            self.container_depth = max(0, self.container_depth - 1)

    def get_text(self):
        parts = self.article_parts or self.fallback_parts
        return re.sub(r"\s+", " ", " ".join(parts)).strip()


def clean_html(value):
    parser = TextExtractor()
    parser.feed(value or "")
    return parser.get_text()


def clean_model_card(value):
    value = re.sub(r"(?s)```.*?```", " ", value)
    value = re.sub(r"<[^>]+>", " ", value)
    value = re.sub(r"!\[.*?\]\(.*?\)", " ", value)
    value = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", value)
    value = re.sub(r"(?m)^#+\s*", "", value)
    value = re.sub(r"(?m)^\|.*\|$", " ", value)
    value = re.sub(r"[*_`>#]", "", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def get_published_date(entry):
    parsed = (
        entry.get("published_parsed")
        or entry.get("updated_parsed")
    )

    if not parsed:
        return None

    return datetime(*parsed[:6], tzinfo=timezone.utc)


def classify_entry(source, entry):
    source_name = source.name.lower()

    if "arxiv" in source_name or "google research" in source_name:
        return "Research"

    if "hugging face" in source_name:
        return "Developer Updates"

    if "industry" in source_name or "techcrunch ai" in source_name:
        return "AI Industry"

    return None


def fetch_article_text(client, url):
    try:
        response = client.get(url)
        response.raise_for_status()
        return clean_html(response.text)[:5000]

    except httpx.HTTPError as error:
        print(f"Could not fetch article: {error}")
        return ""


def fetch_latest_models():
    articles = []

    organizations = [
        "google",
        "meta-llama",
        "microsoft",
        "nvidia",
        "Qwen",
        "deepseek-ai",
        "mistralai",
        "openai",
        "cohere",
        "allenai",
        "01-ai",
        "stabilityai",
        "black-forest-labs"
    ]

    excluded_words = [
        "lora", "adapter", "checkpoint", "gguf",
        "quantized", "merged", "finetune", "fine-tune"
    ]

    seen = set()
    cutoff = datetime.now(timezone.utc) - timedelta(days=DAYS)

    try:
        with httpx.Client(timeout=20) as client:
            for organization in organizations:
                response = client.get(
                    HF_MODELS_URL,
                    params={
                        "author": organization,
                        "sort": "createdAt",
                        "direction": "-1",
                        "limit": 10,
                        "cardData": "true"
                    }
                )

                response.raise_for_status()

                for model in response.json():
                    model_id = model.get("id")

                    if not model_id or model_id in seen:
                        continue

                    name = model_id.split("/")[-1].lower()

                    if any(word in name for word in excluded_words):
                        continue

                    created = model.get("createdAt")

                    if not created:
                        continue

                    published = datetime.fromisoformat(
                        created.replace("Z", "+00:00")
                    )

                    if published < cutoff:
                        continue

                    seen.add(model_id)

                    card_url = (
                        f"https://huggingface.co/{model_id}/raw/main/README.md"
                    )

                    description = ""

                    try:
                        card_response = client.get(card_url)

                        if card_response.status_code == 200:
                            readme = card_response.text

                            if readme.startswith("---"):
                                parts = readme.split("---", 2)

                                if len(parts) == 3:
                                    readme = parts[2]

                            lines = []

                            for line in readme.splitlines():
                                line = line.strip()

                                if not line or line.startswith("```"):
                                    continue

                                if line.startswith("!["):
                                    continue

                                lines.append(line)

                            description = clean_model_card(
                                " ".join(lines)
                            )[:1200]

                    except httpx.HTTPError:
                        pass

                    if not description:
                        task = model.get("pipeline_tag")

                        description = (
                            f"AI model for {task.replace('-', ' ')}."
                            if task
                            else "Model details are available on its Hugging Face page."
                        )

                    articles.append({
                        "title": model_id,
                        "url": f"https://huggingface.co/{model_id}",
                        "summary": description,
                        "published": published.isoformat(),
                        "source": "Hugging Face Blog",
                        "category": "Latest Releases"
                    })

        articles.sort(
            key=lambda item: item["published"],
            reverse=True
        )

        print(f"\nCurated Hugging Face releases: {len(articles[:LIMIT])}")

    except (httpx.HTTPError, ValueError) as error:
        print(f"Could not fetch Hugging Face models: {error}")

    return articles[:LIMIT]


def fetch_feeds():
    db = SessionLocal()

    results = {
        "AI Industry": [],
        "Latest Releases": [],
        "Research": [],
        "Developer Updates": [],
        "Top Repos": []
    }

    seen = {
        category: set() for category in results
    }

    cutoff = datetime.now(timezone.utc) - timedelta(days=DAYS)

    try:
        sources = db.scalars(
            select(Source).where(
                Source.is_active.is_(True)
            )
        ).all()

        with httpx.Client(
            timeout=20,
            follow_redirects=True,
            headers={"User-Agent": "TokenTrail/1.0"}
        ) as client:

            for source in sources:
                if not source.feed_url:
                    continue

                if source.name.lower() == "github blog":
                    continue

                print(f"\nFetching: {source.name}")

                feed = feedparser.parse(source.feed_url)

                if feed.bozo and not feed.entries:
                    print("Feed could not be parsed")
                    continue

                for entry in feed.entries:
                    category = classify_entry(source, entry)

                    if not category:
                        continue

                    if len(results[category]) >= LIMIT:
                        continue

                    url = entry.get("link")

                    if not url or url in seen[category]:
                        continue

                    published = get_published_date(entry)

                    if not published or published < cutoff:
                        continue

                    seen[category].add(url)

                    description = clean_html(
                        entry.get("summary", "")
                    )

                    if not description:
                        print(
                            f"Fetching article: {entry.get('title', '')}"
                        )

                        description = fetch_article_text(
                            client,
                            url
                        )

                    results[category].append({
                        "title": entry.get("title", ""),
                        "url": url,
                        "summary": description,
                        "published": published.isoformat(),
                        "source": source.name,
                        "category": category
                    })

            results["Latest Releases"] = fetch_latest_models()

            results["Top Repos"] = [
                {
                    "title": repo["name"],
                    "url": repo["url"],
                    "summary": repo["description"] or "No description available.",
                    "published": datetime.fromisoformat(
                        repo["created_at"].replace("Z", "+00:00")
                    ).isoformat(),
                    "source": "GitHub",
                    "category": "Top Repos"
                }
                for repo in fetch_github_repos()
            ]

        for category in results:
            results[category].sort(
                key=lambda item: item["published"],
                reverse=True
            )

            results[category] = results[category][:LIMIT]

            print(
                f"\n{category.upper()} — "
                f"{len(results[category])} articles"
            )

            for article in results[category]:
                print({
                    "title": article["title"],
                    "url": article["url"],
                    "published": article["published"],
                    "source": article["source"],
                    "description_length": len(article["summary"])
                })

        return results

    finally:
        db.close()


if __name__ == "__main__":
    fetch_feeds()
