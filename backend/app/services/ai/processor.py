from app.services.ai.client import generate_json

TOPIC_CATEGORIES = [
    "artificial-intelligence",
    "machine-learning",
    "large-language-models",
    "robotics",
    "computer-vision",
    "ai-research",
    "developer-tools"
]

FEED_CATEGORIES = [
    "AI Industry",
    "Latest Releases",
    "Research",
    "Developer Updates"
]


def process_article(title: str, intro: str, source: str):
    prompt = f"""
Analyze this article for TokenTrail.

Title: {title}
Introduction: {intro[:1200]}
Source: {source}

Return JSON only with these fields:
{{
    "is_relevant": true,
    "topic_category": "machine-learning",
    "feed_category": "Research",
    "summary": "A concise summary of the article."
}}

Rules:
- Only accept content genuinely related to AI.
- topic_category must be one of: {", ".join(TOPIC_CATEGORIES)}
- feed_category must be one of: {", ".join(FEED_CATEGORIES)}
- Summary must be 2-3 concise sentences.
- Do not invent facts.
- If irrelevant, set is_relevant to false and summary to an empty string.
"""

    result = generate_json(prompt)

    if not isinstance(result, dict):
        raise ValueError("Invalid AI response")

    if not result["is_relevant"]:
        return {
            "is_relevant": False,
            "topic_category": None,
            "feed_category": None,
            "summary": ""
        }

    topic = result.get("topic_category")
    feed = result.get("feed_category")
    summary = result.get("summary")

    if topic not in TOPIC_CATEGORIES:
        raise ValueError("Invalid topic category")

    if feed not in FEED_CATEGORIES:
        raise ValueError("Invalid feed category")

    if not isinstance(summary, str) or not summary.strip():
        raise ValueError("Invalid article summary")

    return {
        "is_relevant": True,
        "topic_category": topic,
        "feed_category": feed,
        "summary": summary.strip()[:500]
    }
