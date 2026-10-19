# Technology Decisions — TokenTrail

## Confirmed direction
| Area | Choice | Notes |
|---|---|---|
| Initial frontend | HTML5, CSS3, vanilla JavaScript | ES modules; do not start with React |
| Frontend API calls | Fetch API | Add after the backend API exists |
| Later frontend | React + Vite | Migrate incrementally |
| Optional styling later | Tailwind CSS | Only if useful during React migration |
| Backend | Python + FastAPI | Modular monolith |
| Validation | Pydantic | Request and response schemas |
| ORM | SQLAlchemy | Database access |
| Migrations | Alembic | Versioned schema changes |
| Database | PostgreSQL | Relational persistence |
| ML | pandas, scikit-learn, joblib | Classical baseline first |
| Initial text classifier | TF-IDF + Logistic Regression | Evaluate before integration |
| Similarity | TF-IDF + cosine similarity | Content-based baseline |
| Backend tests | pytest | Unit and API/integration tests |
| Version control | Git + GitHub | Keep secrets out of repository |

## Architecture decisions
- API routes use `/api/v1`.
- ML inference begins as Python modules called by FastAPI.
- LLM integration is optional, provider-independent, and disabled by default.
- Do not introduce microservices without a demonstrated need.

## Cost policy
- Prefer local models and explicitly free services.
- Never assume a provider is free based only on the existence of a free tier.
- Do not use paid APIs, paid search, online-search add-ons, or uncertain-cost services without explicit approval.
- Never expose API keys in browser code or commit secrets.
- Core functionality must work with no LLM provider configured.

## Decisions still open
- Supported Python version.
- Dependency/version pinning policy.
- Authentication implementation and token/session strategy.
- Approved RSS feeds and/or news APIs.
- Deployment provider.
- Whether local PostgreSQL is the only development database.
- LLM provider/model, if any, after explicit cost and privacy review.
