# Product Requirements Document — TokenTrail

## 1. Product summary
TokenTrail helps people keep up with artificial intelligence and steadily build useful AI knowledge. It combines AI news discovery with bite-sized learning, quizzes, and progress tracking.

## 2. Problem
AI developments are published across many sources and can be difficult to understand in context. A simple news feed does not necessarily help a reader understand concepts, retain knowledge, or decide what to learn next.

## 3. Product goals
1. Make relevant AI developments easy to discover.
2. Explain why selected stories matter.
3. Connect news to short educational explanations and quizzes.
4. Help users see learning activity and topic-level progress.
5. Recommend relevant articles and next learning steps transparently.

## 4. Intended users
The initial audience is people who want to follow AI developments and learn AI concepts. Specific personas, age range, and experience levels have not yet been validated.

## 5. Core product areas
### AI Headlines
- List articles with title, source, publication time, category, and canonical URL.
- Search and filter articles.
- View an article detail page or detail panel.
- Bookmark articles when user identity/persistence is implemented.
- Display a concise explanation of why a story matters when reliable content is available.
- Classify articles using an evaluated classical ML model when the model is ready.

### AI Snippets
- Display short explanations of AI concepts or developments.
- Show topic tags and difficulty.
- Link snippets to quizzes where available.
- Clearly label generated or draft content and retain source references where relevant.

### My Progress
- Show completed snippets, quiz attempts, scores, and topic-level progress.
- Retain learning history and bookmarks for an authenticated user.
- Recommend a next topic using understandable rules at first.

### Explore AI
- Browse tools, technologies, resources, and concepts.
- Filter by category, use case, and difficulty.
- Link relevant resources to articles and snippets.

## 6. Proposed MVP
This is a **proposed first release**, not a claim that these features already exist.

### Include
- Responsive vanilla-JavaScript frontend.
- Homepage and shared navigation.
- AI Headlines list with search and category filters.
- Article detail view with source and original-link attribution.
- AI Snippets list and snippet detail.
- Basic quiz flow and result display.
- PostgreSQL-backed articles, categories, snippets, quizzes, questions, and quiz attempts.
- FastAPI REST API under `/api/v1`.
- A small, documented news-ingestion process from approved RSS feeds or permitted APIs.
- Classical article categorization baseline only after a labeled dataset and evaluation process exist.
- Loading, empty, and error states.
- Tests for core backend and ML behavior.

### Defer until the core workflow is stable
- React migration and Tailwind CSS.
- Advanced personalization or adaptive-learning models.
- Community features and user-created snippets.
- Multi-agent workflows or microservices.
- Paid APIs and paid search services.
- LLM-generated content in the default configuration.
- Production-scale deployment and complex observability.

### MVP scope decisions requiring confirmation
- Whether account registration/login is required in the first public MVP or can follow a local/demo phase.
- Which news sources/RSS feeds are approved.
- Whether bookmarks and progress must sync across devices in the first MVP.
- Whether “Explore AI” is part of the first release or a subsequent phase.

## 7. Functional requirements
- FR-01: A visitor can browse available articles.
- FR-02: A visitor can search and filter articles.
- FR-03: An article shows source attribution and its original URL.
- FR-04: A visitor can browse snippets and see topic/difficulty metadata.
- FR-05: A user can submit a quiz attempt and see the result.
- FR-06: The system can persist quiz attempts when database integration is available.
- FR-07: The system can show learning progress based on stored attempts and completions.
- FR-08: The system can suggest related articles using a transparent content-based baseline.
- FR-09: The system handles empty results, validation failures, unavailable services, and ingestion errors gracefully.
- FR-10: Optional LLM features do not prevent core product use when disabled.

## 8. Non-functional requirements
- Responsive layouts for mobile, tablet, and desktop.
- Keyboard-accessible interactions and readable contrast.
- Input validation and safe error responses.
- Secrets stored in environment variables, never in frontend source or Git.
- Passwords hashed using a suitable password-hashing implementation if authentication is enabled.
- Database changes managed with migrations.
- Reproducible ML preprocessing, training, and evaluation.
- Source attribution and respect for feed/API terms and copyright constraints.

## 9. Success measures
Do not set numeric targets until a baseline and testing method are agreed. Candidate measures:
- Article ingestion success and duplicate rate.
- Search/filter task completion.
- Quiz completion rate and score distribution.
- Return learning activity.
- Classification macro-F1 and per-class precision/recall.
- Human-reviewed relevance of related-article recommendations.

## 10. Out of scope
- Claiming that all AI news can be collected.
- Republishing full copyrighted articles without permission.
- Unverified claims about model accuracy or user outcomes.
- Paid external services without explicit approval.

## 11. MVP acceptance criteria
- Main frontend pages are usable and responsive with realistic mock data before backend integration.
- API contracts are documented and validated.
- Articles can be stored, retrieved, filtered, and paginated.
- Duplicate ingestion is prevented using a documented strategy.
- Quiz submissions can be stored and reflected in progress.
- Tests cover critical API validation, persistence, and ML evaluation paths.
- The application remains usable with all optional LLM features disabled.
