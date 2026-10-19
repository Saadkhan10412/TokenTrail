# Development Phases — TokenTrail

Statuses below are planning statuses, not claims about the repository's actual implementation.

## Phase 0 — Planning and project setup
**Status:** Planned

Tasks:
- Confirm MVP scope and open product decisions.
- Add and review project documentation.
- Establish Git hygiene, `.gitignore`, and `.env.example`.
- Agree on local development commands and supported Python version.
- Define acceptance criteria for the first frontend task.

Exit criteria:
- Scope and unresolved decisions are visible.
- Documentation does not claim unimplemented features.
- Repository can be opened and the first frontend task is clear.

## Phase 1 — Vanilla frontend shell
**Status:** Next implementation phase

Tasks:
- Create `frontend/index.html`, `frontend/css/styles.css`, and `frontend/js/main.js`.
- Implement shared header/navigation and a responsive homepage.
- Use local mock data; no live news APIs yet.
- Add article rows/cards with source, date, category, and title.
- Add basic search/filter interactions.
- Include loading/empty/error presentation patterns where applicable.

Exit criteria:
- Works in a modern browser at mobile and desktop widths.
- Search and filters work on mock data.
- No React or external service dependency.
- No browser-console errors during normal use.

## Phase 2 — Backend foundation and database
Tasks:
- Create FastAPI app and configuration.
- Configure SQLAlchemy and PostgreSQL.
- Add Alembic migrations.
- Add category/article models and schemas.
- Implement article list/detail, filtering, pagination, and health routes.
- Add pytest coverage.

Exit criteria:
- API can retrieve persisted records.
- Migrations can build the schema from a clean database.
- Core API tests pass.

## Phase 3 — News ingestion
Tasks:
- Select and approve sources.
- Implement RSS/API ingestion and normalization.
- Add URL/source-ID deduplication.
- Record ingestion runs and failures as appropriate.
- Respect source terms, rate limits, and copyright requirements.

Exit criteria:
- Repeated ingestion does not create duplicate articles.
- Failures are observable and safely retryable.
- Source attribution is retained.

## Phase 4 — Classical ML baseline
Tasks:
- Build a documented labeled dataset.
- Define class taxonomy and labeling guidance.
- Train TF-IDF + Logistic Regression baseline.
- Evaluate using held-out data, macro-F1, and per-class precision/recall.
- Save preprocessing/model artifacts reproducibly.
- Integrate inference into backend behind a clear interface.

Exit criteria:
- Evaluation is reproducible and metrics are reported honestly.
- Uncertain predictions are handled gracefully.
- Tests cover preprocessing and inference.

## Phase 5 — Snippets, quizzes, and learning progress
Tasks:
- Implement snippets, quizzes, and questions.
- Validate answers and score attempts server-side.
- Persist attempts and completion state.
- Derive topic-level progress.
- Add transparent rules-based next-topic recommendations.

Exit criteria:
- A completed quiz updates persisted progress.
- Recommendation reasons are understandable.
- User data is isolated correctly if accounts are enabled.

## Phase 6 — Related-content recommendations
Tasks:
- Start with TF-IDF vectors and cosine similarity.
- Avoid self-recommendations and near-duplicate suggestions.
- Combine topic interest/history only when reliable data exists.
- Review relevance using sample queries or human judgment.

Exit criteria:
- Recommendations are reproducible and have a documented evaluation method.

## Phase 7 — Optional LLM adapter
**Default:** Disabled

Tasks:
- Confirm a provider/model is explicitly free or obtain approval for any cost risk.
- Implement a provider-independent interface.
- Add timeouts, validation, failure handling, and source references.
- Mark generated content clearly and keep human review available.

Exit criteria:
- Core features work with LLM disabled and without provider credentials.
- No paid endpoint/search tool is activated without explicit approval.

## Phase 8 — React migration
Tasks:
- Learn React fundamentals and Vite.
- Rebuild the frontend incrementally.
- Preserve API contracts and workflows.
- Compare behavior against the vanilla implementation.

Exit criteria:
- Existing workflows work without loss of functionality.
- Backend changes are limited to justified compatibility needs.

## Phase 9 — Hardening and deployment
Tasks:
- Review authentication, authorization, input validation, and dependency security.
- Add integration tests for critical flows.
- Choose hosting after cost and data-persistence review.
- Configure secrets, backups, logging, and deployment instructions.

Exit criteria:
- Critical workflows work outside the development machine.
- Operational and recovery instructions are documented.

## Immediate next task
Build only the static vanilla frontend shell using mock data. Do not begin the backend, live ingestion, authentication, or ML model until the first frontend acceptance criteria are met.
