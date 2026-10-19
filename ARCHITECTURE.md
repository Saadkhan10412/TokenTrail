# Architecture — TokenTrail

## 1. Architectural principles
- Start with a modular monolith.
- Keep the frontend framework-independent until the planned React migration.
- Keep ML inference in Python modules called by the backend.
- Keep LLM functionality optional and isolated behind an adapter.
- Use versioned REST APIs.
- Prefer the simplest design that meets current needs.

## 2. High-level architecture

```text
Browser
  └── HTML / CSS / vanilla JavaScript (ES modules)
        └── Fetch API over HTTP
              └── FastAPI application (/api/v1)
                    ├── Routers and request validation
                    ├── Application/service layer
                    ├── SQLAlchemy data access
                    ├── News ingestion and normalization
                    ├── ML classification/recommendation modules
                    └── Optional LLM adapter (disabled by default)
                          └── PostgreSQL
```

## 3. Proposed repository layout

```text
TokenTrail/
├── frontend/
│   ├── index.html
│   ├── pages/
│   ├── css/
│   ├── js/
│   └── assets/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   ├── services/
│   │   └── ml/
│   ├── tests/
│   ├── alembic/
│   └── requirements.txt
├── ml/
│   ├── training/
│   ├── evaluation/
│   └── artifacts/
├── data/
├── docs/
├── .env.example
├── .gitignore
└── README.md
```

Create directories when needed rather than generating empty scaffolding for every future feature.

## 4. Backend module responsibilities
- `main.py`: create FastAPI app, configure middleware, register routers, expose health endpoint.
- `config.py`: validated environment-based settings.
- `database.py`: engine/session lifecycle and database dependency.
- `models/`: SQLAlchemy table mappings.
- `schemas/`: Pydantic request/response models.
- `routers/`: HTTP routes, authentication dependencies, request/response handling.
- `services/`: business rules and orchestration.
- `ml/`: model loading, preprocessing, inference, similarity search.
- `alembic/`: versioned schema migrations.
- `tests/`: unit and API/integration tests.

## 5. API conventions
- Prefix all product endpoints with `/api/v1`.
- Use plural resource names where practical.
- Validate request and query parameters.
- Paginate collection endpoints.
- Use appropriate HTTP status codes and consistent error shapes.
- Do not expose database internals, secrets, stack traces, or private user data.
- Treat proposed routes as plans until implemented and tested.

Initial candidates:
- `GET /api/v1/articles`
- `GET /api/v1/articles/{id}`
- `GET /api/v1/snippets`
- `GET /api/v1/categories`
- `GET /api/v1/recommendations`
- `GET /api/v1/progress`
- `POST /api/v1/bookmarks`
- `POST /api/v1/quiz-attempts`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

## 6. Data flow
### Article ingestion
1. Read from explicitly approved RSS feeds or permitted APIs.
2. Normalize source metadata and canonical URL.
3. Validate required fields.
4. Deduplicate using canonical URL and/or a stable source identifier.
5. Store article and ingestion metadata.
6. Log failures without leaking credentials.
7. Apply classification only when a model is available and record its version.

### Article browsing
1. Browser calls the article API using Fetch.
2. FastAPI validates query parameters.
3. Service layer applies search/category/pagination rules.
4. SQLAlchemy queries PostgreSQL.
5. Pydantic serializes a stable response schema.

### Learning progress
1. User submits a quiz attempt.
2. API validates answers and calculates score server-side.
3. Attempt is persisted against the user/session model approved for the MVP.
4. Progress is derived from stored attempts and completion events.
5. Recommendation rules suggest the next learning action.

## 7. Security boundaries
- Database credentials and provider keys stay on the server.
- Never put secrets in frontend JavaScript or commit `.env`.
- If authentication is enabled, enforce authorization on every user-specific route.
- Do not trust user IDs supplied by the browser; derive identity from the authenticated principal.
- Validate external URLs and ingestion inputs.
- Apply sensible request limits and timeouts to external sources.
- Use HTTPS in deployment.
- Avoid logging passwords, tokens, or private user content.

## 8. Error handling and resilience
- Provide useful client-facing errors without internal stack traces.
- Time out external requests.
- Retry ingestion only when safe and bounded.
- Keep LLM failures isolated from core product flows.
- Record enough operational information to debug ingestion and model failures.

## 9. React migration boundary
React/Vite may replace the static frontend later. Keep the API contract and backend behavior stable so the migration does not require an unnecessary backend rewrite.

## 10. Deployment architecture
Deployment provider and topology are undecided. Do not choose paid infrastructure until requirements, free-tier constraints, data persistence, and costs have been reviewed.
