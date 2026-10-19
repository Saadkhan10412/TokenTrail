# Database Plan — TokenTrail

## 1. Database choice
PostgreSQL is the planned relational database. SQLAlchemy will map tables, and Alembic will manage schema migrations.

This document describes a proposed schema. It is not evidence that tables already exist.

## 2. Proposed entities
- `users`: account identity and password hash if authentication is in scope.
- `categories`: controlled topic/category list.
- `articles`: article metadata, source, canonical URL, publication time, and optional stored text/summary.
- `snippets`: educational content, topic, difficulty, and source references.
- `quizzes`: quiz metadata and relationship to a snippet or topic.
- `questions`: question text, answer choices, correct answer representation, and explanation.
- `quiz_attempts`: user/session reference, submitted answers or score summary, score, and timestamp.
- `bookmarks`: user reference and bookmarked resource reference.
- `user_interests`: explicit topic preferences.
- `recommendation_events`: optional record of recommendations shown/clicked for later evaluation.

## 3. Relationship outline
- A category can have many articles.
- A category can have many snippets.
- A snippet can have zero or more quizzes, depending on product decisions.
- A quiz has many questions.
- A user can have many quiz attempts and bookmarks.
- A user can have many topic interests.
- Recommendation events can reference a user and recommended resource when tracking is justified.

## 4. Important design choices
- Use primary keys and foreign keys.
- Use timezone-aware timestamps stored consistently (prefer UTC in persistence).
- Add `created_at` and `updated_at` where useful.
- Enforce uniqueness for canonical article URLs or a suitable source identifier.
- Index common filters such as publication timestamp, category, and source.
- Define delete behavior deliberately to avoid accidental loss of learning history.
- Store password hashes only, never plaintext passwords.
- Do not store full article bodies unless source terms and the product's need permit it.
- Use Alembic migrations rather than manually changing production schema.

## 5. Article fields (candidate)
- `id`
- `title`
- `canonical_url`
- `source_name`
- `source_url` (where useful)
- `published_at`
- `fetched_at`
- `category_id` (nullable until classification/labeling)
- `excerpt` or permitted text field
- `summary` (optional; provenance should be recorded)
- `classification_label` and `classifier_version` (optional)
- `created_at`, `updated_at`

Exact SQL types, constraints, and index definitions should be decided when implementing the first migration.

## 6. Open schema decisions
- Authentication in MVP: yes/no.
- Anonymous progress: local-only, session-based, or not supported.
- Can an article have multiple categories? If yes, use a many-to-many join table.
- Are snippets editor-authored, imported, generated, or a combination?
- Should article content be stored, or only metadata and permitted excerpts?
- Which resource types can be bookmarked: articles only, or articles and snippets/tools?
- Should `recommendation_events` be part of MVP or deferred until there is an evaluation use case?

Do not finalize migrations until the relevant product decisions are resolved.
