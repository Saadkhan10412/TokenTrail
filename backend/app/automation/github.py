
import httpx
from datetime import date, timedelta


def fetch_github_repos():
    since = date.today() - timedelta(days=30)

    queries = [
        f"topic:artificial-intelligence created:>={since}",
        f"topic:machine-learning created:>={since}",
        f"topic:llm pushed:>={since}",
        f"topic:ai-agents pushed:>={since}"
    ]

    valid_topics = {
        "artificial-intelligence",
        "machine-learning",
        "llm",
        "ai-agents",
        "generative-ai",
        "deep-learning",
        "computer-vision",
        "nlp"
    }

    repos = []
    seen = set()

    with httpx.Client(timeout=20) as client:
        for query in queries:
            response = client.get(
                "https://api.github.com/search/repositories",
                params={
                    "q": f"{query} fork:false archived:false",
                    "sort": "stars",
                    "order": "desc",
                    "per_page": 30
                },
                headers={
                    "Accept": "application/vnd.github+json"
                }
            )

            response.raise_for_status()

            for repo in response.json()["items"]:
                name = repo["full_name"]

                if name in seen:
                    continue

                if not set(repo.get("topics", [])).intersection(valid_topics):
                    continue

                if repo["stargazers_count"] < 10:
                    continue

                seen.add(name)

                repos.append({
                    "name": name,
                    "description": repo.get("description"),
                    "url": repo["html_url"],
                    "stars": repo["stargazers_count"],
                    "language": repo.get("language"),
                    "created_at": repo["created_at"],
                    "topics": repo.get("topics", [])
                })

                if len(repos) == 10:
                    return repos

    return repos


if __name__ == "__main__":
    repos = fetch_github_repos()

    print(f"\nTOP REPOS: {len(repos)}")

    for repo in repos:
        print(repo)
