# Development Rules — TokenTrail

## 1. Collaboration
- Explain important decisions and trade-offs.
- Work in small, testable increments.
- State exactly where files belong.
- Ask focused questions when a missing decision blocks safe or correct progress.
- Do not generate the entire application in one step.
- Distinguish planned, in-progress, and completed work.

## 2. Truthfulness
- Never claim code has been implemented, tested, deployed, or pushed unless verified.
- Never invent metrics, dataset sizes, sources, or model results.
- Do not claim to have inspected the GitHub repository unless it has actually been inspected.
- Mark assumptions and unresolved decisions explicitly.

## 3. Frontend
- Begin with HTML, CSS, and vanilla JavaScript ES modules.
- Do not introduce React before the planned migration phase.
- Keep code modular and avoid unnecessary dependencies.
- Use semantic HTML, accessible labels, keyboard interactions, and responsive CSS.
- Use mock data during the first frontend phase.
- Keep API URLs/configuration out of scattered hard-coded locations when backend integration begins.

## 4. Backend
- Use FastAPI routers, Pydantic schemas, SQLAlchemy models, and service functions with clear responsibilities.
- Version product APIs under `/api/v1`.
- Validate external and user-provided input.
- Use pagination for collection endpoints.
- Return useful errors without exposing stack traces or secrets.
- Use Alembic migrations for schema changes.

## 5. Database and privacy
- Use foreign keys, constraints, and indexes where justified.
- Store password hashes only.
- Enforce authorization for user-specific data.
- Do not trust client-supplied user IDs for authorization.
- Minimize personal data collection and define retention where needed.

## 6. ML
- Establish a baseline before tuning.
- Separate training code from inference code.
- Track data versions, preprocessing, metrics, and model versions.
- Avoid duplicate/near-duplicate leakage.
- Use appropriate held-out evaluation.
- Report macro-F1 and per-class precision/recall for imbalanced classification tasks.
- Do not deploy a model based only on an attractive training score.

## 7. External services and cost
- Local or explicitly free tools are preferred.
- Ask before using anything paid or with uncertain charges.
- Do not activate web-search add-ons, online modes, paid retrieval, or paid fallback providers without explicit approval.
- Keep LLM functionality disabled by default.
- Handle missing credentials and provider outages gracefully.

## 8. Security and Git
- Use `.env` for local secrets and provide `.env.example` with placeholder values only.
- `.env`, credentials, tokens, and private datasets must not be committed.
- Never put provider secrets in frontend JavaScript.
- Review dependency additions for necessity and cost implications.
- Do not commit generated model artifacts or large datasets unless there is a clear reason.

## 9. Testing
- Add tests for meaningful backend and ML behavior.
- Test failure and edge cases, not only happy paths.
- Run relevant tests before claiming a change is complete.
- Include reproducible commands in documentation.

## 10. Change discipline
For each task, document:
1. Goal.
2. Files to create or change.
3. Implementation approach.
4. How to run it.
5. How to test it.
6. Acceptance criteria.
7. Known limitations.
