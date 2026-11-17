import json
import httpx

from fastapi import HTTPException
from app.config import settings

URL = "https://openrouter.ai/api/v1/chat/completions"


def parse_json(content):
    if isinstance(content, list):
        content = "".join(
            item.get("text", "") for item in content
            if isinstance(item, dict)
        )

    if not isinstance(content, str) or not content.strip():
        raise ValueError("Empty AI response")

    start = content.find("{")
    end = content.rfind("}")

    if start == -1 or end == -1:
        raise ValueError("Invalid JSON response")

    result = json.loads(content[start:end + 1])

    if not isinstance(result, dict):
        raise ValueError("AI response must be a JSON object")

    return result


def generate_json(prompt):
    if not settings.OPENROUTER_API_KEY:
        raise HTTPException(500, "OpenRouter API key is missing")

    models = [
        model.strip()
        for model in settings.OPENROUTER_MODELS.split(",")
        if model.strip().endswith(":free")
    ]

    if not models:
        raise HTTPException(500, "No free OpenRouter models configured")

    headers = {
        "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    errors = []

    with httpx.Client(timeout=45) as client:
        for model in models:
            try:
                response = client.post(
                    URL,
                    headers=headers,
                    json={
                        "model": model,
                        "messages": [{"role": "user", "content": prompt}],
                        "temperature": 0.2,
                        "max_tokens": 400
                    }
                )

                if response.is_error:
                    raise RuntimeError(
                        f"HTTP {response.status_code}: {response.text[:300]}"
                    )

                data = response.json()
                result = parse_json(
                    data["choices"][0]["message"]["content"]
                )

                print(f"AI model used: {model}")
                return result

            except (httpx.HTTPError, RuntimeError, ValueError, KeyError, IndexError) as error:
                errors.append(f"{model}: {error}")
                print(f"Model failed: {model} - {error}")

    raise HTTPException(
        status_code=503,
        detail="All configured free models failed. Retry later."
    )
