# Decision Log and Open Questions — TokenTrail

This document separates confirmed decisions from unresolved questions. Do not silently treat an open question as a confirmed product requirement.

## Confirmed decisions
| Topic | Decision |
|---|---|
| Initial frontend | HTML, CSS, vanilla JavaScript |
| React | Later migration, not the starting point |
| Backend | FastAPI modular monolith |
| Database | PostgreSQL |
| ORM/migrations | SQLAlchemy and Alembic |
| API versioning | `/api/v1` |
| Initial ML | Classical ML; evaluate before release |
| Article classifier baseline | TF-IDF + Logistic Regression |
| Related content baseline | TF-IDF + cosine similarity |
| Learning recommendations | Rules first |
| LLM | Optional, provider-independent, disabled by default |
| Cost safety | No paid/uncertain-cost APIs or search tools without explicit approval |
| Design | Editorial tech-publication aesthetic using the documented palette |

## Questions to resolve before finalizing MVP requirements

### Q1. What is the first-release authentication scope?
- **A.** No accounts initially; frontend demo and/or public read-only browsing.
- **B.** Register/login is part of the first backend MVP.
- **C.** Build public browsing first, then add accounts before progress/bookmarks need cross-device persistence.

**Suggested default:** C. This allows the UI and article API to be built incrementally without prematurely committing to auth details.

### Q2. Which news sources should be used?
Please provide approved RSS feed URLs or name sources you want considered. If you have no preference yet, the first frontend phase should use mock data only; ingestion should wait until sources and terms are reviewed.

**No feed URLs are assumed in this plan.**

### Q3. Which product areas belong in the first MVP?
- **A.** Headlines only.
- **B.** Headlines + Snippets + basic quizzes/progress.
- **C.** All four areas, including Explore AI.

**Suggested default:** B, with Explore AI represented in navigation/design but its data catalog deferred until the core flow works.

### Q4. What should “My Progress” do before accounts exist?
- **A.** Hide/mark as coming soon.
- **B.** Store progress only in the current browser.
- **C.** Add accounts so progress persists across devices.

**Suggested default:** A during the first static frontend phase; decide persistence before implementing learning features.

### Q5. Where should snippets and quizzes come from at first?
- **A.** Manually authored/curated.
- **B.** Imported from explicitly licensed sources.
- **C.** Drafted with an optional LLM and reviewed before publication.
- **D.** A combination, with provenance recorded.

**Suggested default:** A for the first implementation. Do not enable LLM generation without explicit provider/cost approval.

### Q6. Is the design direction still correct?
Current documented direction: warm off-white `#F8F8F5`, ink `#17211F`, emerald `#287A61`, Inter + Newsreader, editorial publication style.

- **A.** Keep it.
- **B.** Change it (describe the direction).

### Q7. Development environment
Confirm whether you are developing on Windows with VS Code and whether PostgreSQL is already installed locally. This affects exact setup commands later, but it does not block the static frontend task.

## Decisions intentionally deferred
- Deployment provider and hosting costs.
- Exact authentication/session strategy.
- Exact ML category taxonomy and dataset.
- LLM provider/model.
- Whether article bodies are stored or only metadata/permitted excerpts.
- Advanced personalization, community features, and user-created content.

## How decisions are recorded
When a decision is confirmed, update the relevant document and this log. Do not keep conflicting instructions in separate files.
