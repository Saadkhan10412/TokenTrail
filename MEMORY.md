# Project Memory — TokenTrail

> Update this file after meaningful implementation or product decisions. Do not treat plans as completed work.

## Product
- Name: TokenTrail.
- Tagline: “Follow the AI frontier. Understand what matters. Build knowledge that lasts.”
- Purpose: AI news discovery combined with bite-sized learning, quizzes, and progress tracking.
- Main areas: AI Headlines, AI Snippets, My Progress, Explore AI.

## Confirmed technical direction
- Start with HTML/CSS/vanilla JavaScript; React comes later.
- Backend: Python, FastAPI, Pydantic, SQLAlchemy, Alembic.
- Database: PostgreSQL.
- ML: classical ML first; TF-IDF + Logistic Regression for article classification baseline, TF-IDF + cosine similarity for related articles.
- Learning recommendations begin with rules.
- LLM features are optional and disabled by default.
- No unexpected paid services or paid web-search tools.
- Modular monolith; `/api/v1` REST prefix.

## Design
- Background: `#F8F8F5`
- Text: `#17211F`
- Accent: `#287A61`
- Typography direction: Inter and Newsreader.
- Editorial, readable, accessible; avoid generic dashboard styling and unnecessary effects.

## Known status
- Project plan and proposed architecture are described in the initial context.
- Actual repository files and implementation have not been independently verified in this task.
- Do not assume frontend, backend, database, authentication, ingestion, or ML features are implemented.

## Next action
1. Confirm the open product decisions in `DECISIONS.md`.
2. Create the static frontend shell with mock data:
   - `frontend/index.html`
   - `frontend/css/styles.css`
   - `frontend/js/main.js`
3. Test responsiveness, search/filter interactions, and browser-console output.
4. Update this file with actual results and the next concrete task.

## Update log
- Initial documentation pack drafted from the project context supplied by the user.
- No implementation or test result is claimed by this documentation update.
