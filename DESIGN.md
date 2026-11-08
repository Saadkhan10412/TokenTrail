# TokenTrail --- Design & Product Specification

**Document type:** Product and UI/UX design specification\
**Project:** TokenTrail\
**Status:** Frontend-first implementation; mock data currently used\
**Last updated:** November 2026

------------------------------------------------------------------------

## 1. Product overview

TokenTrail is an AI discovery and learning platform. It helps people
follow developments in artificial intelligence, understand new concepts,
discover AI models, and keep track of their learning.

**Tagline:** Follow the AI frontier. Understand what matters. Build
knowledge that lasts.

The product has five main experiences:

1.  **AI Headlines** --- discover AI news and developments.
2.  **Snippets** --- learn small AI concepts through a vertical,
    reel-style feed.
3.  **Explore AI** --- discover and compare AI models, including free,
    paid, and locally runnable options.
4.  **Know AI** --- a planned structured learning experience for AI
    fundamentals and concepts.
5.  **My Progress** --- view learning activity, explored content, topic
    progress, and achievements.

TokenTrail should feel like an editorial technology publication combined
with a practical AI learning and discovery tool. It should not look like
a generic SaaS admin dashboard.

## 2. Product principles

### Editorial, not generic SaaS

Use strong typography, deliberate spacing, clear hierarchy, and
purposeful visual compositions. Pages should feel like parts of one
technology publication rather than unrelated dashboard templates.

### Useful information before decoration

Every visual element should communicate something or support navigation.
Avoid decorative panels, excessive badges, unnecessary gradients,
generic illustrations, and filler text.

### Consistent design system

All pages should share the same palette, typography, navigation
conventions, borders, spacing logic, and interaction style.

### Frontend first

The current implementation phase is frontend-only. Use local JavaScript
data arrays and mock content to build and test the complete experience
before integrating the backend.

Do not introduce live API calls, database access, authentication logic,
real hardware detection, or external paid services into the current
frontend implementation unless explicitly requested.

### Honest data presentation

Mock data must be treated as mock data. Do not present illustrative
model scores, compatibility estimates, learning statistics, or news as
verified live information.

### Minimal, maintainable implementation

Prefer simple HTML, CSS, and JavaScript. Avoid unnecessary abstractions,
duplicated styles, excessive comments, repeated overrides, and
dependencies that do not materially improve the experience.

## 3. Visual identity

### Core palette

  Token    Value       Purpose
  -------- ----------- --------------------------------------------
  Ink      `#111111`   Primary text, dark panels, strong contrast
  Paper    `#F7F5EF`   Main page background
  Red      `#E63936`   Accent, active states, key emphasis
  White    `#FFFFFF`   Cards, content surfaces
  Muted    `#65615C`   Secondary text
  Border   `#D8D2C8`   Dividers, card outlines, form borders

Use the palette consistently. Red is an accent, not a background colour
for every section. Use dark panels selectively to create contrast.

### Typography

  -----------------------------------------------------------------------
  Font                                Role
  ----------------------------------- -----------------------------------
  Archivo Black                       Large display headings, major
                                      numbers, strong card titles

  Space Grotesk                       Body text, navigation, labels,
                                      controls

  IBM Plex Mono                       Eyebrows, metadata, technical
                                      labels, counters, category
                                      identifiers
  -----------------------------------------------------------------------

### General layout

-   Maximum content width: approximately `1440px`.
-   Desktop page gutters: approximately `5.5vw`, with sensible minimum
    and maximum values.
-   Use thin, muted borders instead of heavy shadows.
-   Prefer square or minimally rounded corners.
-   Keep content aligned to a consistent page grid.
-   Use responsive layouts rather than fixed desktop dimensions.
-   Use motion sparingly and only when it improves feedback or
    orientation.

### Shared navigation

The current navigation is a horizontal header containing:

-   TokenTrail logo linking to `dashboard.html`.
-   Headlines → `dashboard.html`
-   Snippets → `snippets.html`
-   Explore AI → `explore.html`
-   Know AI → `know-ai.html`
-   My Progress → `progress.html`
-   My Profile link, currently pointing to the progress page.

The active page link uses the red accent. Navigation should remain
consistent across pages.

The current pages use desktop horizontal navigation and responsive
mobile navigation that can wrap or scroll horizontally. Do not introduce
a sidebar unless the product direction changes.

## 4. Information architecture

``` text
TokenTrail
│
├── Headlines
│   └── AI news and discovery feeds
│
├── Snippets
│   └── Vertical, scroll-snapping learning feed
│
├── Explore AI
│   ├── Free models
│   ├── Paid models
│   ├── Local models
│   ├── Hardware configuration
│   └── Model comparison
│
├── Know AI
│   └── Planned structured learning experience
│
└── My Progress
    ├── Profile and learning level
    ├── Learning statistics
    ├── Weekly activity
    ├── Topic progress
    ├── Recently explored content
    └── Achievements
```

## 5. Page specifications

## 5.1 Headlines --- `dashboard.html`

### Purpose

The main discovery page introduces users to current AI developments and
gives them a central place to browse different AI-related feeds.

### Main layout

-   Shared navigation header.
-   Discovery heading and description.
-   Main feed area.
-   Feed selector on the right.
-   Feature discovery section linking to the other TokenTrail
    experiences.
-   Story detail overlay.
-   Footer.

### Feed selector

The current feed categories are:

1.  Top Repositories
2.  AI Industry
3.  Latest Releases
4.  Research
5.  Developer Updates

The default feed is Top Repositories.

### Feed cards

The feed uses a poster-style grid rather than traditional blog rows.
Cards should use varied but coordinated visual treatments, strong
typography, concise summaries, and category information.

Use `.poster-card` for feed cards and `.discovery-card` for the separate
feature tiles. These classes have different purposes and should not be
merged.

### Story overlay

Selecting a story opens a detail overlay containing the story category,
title, summary, details, and tags. A source link should only be shown
when a real URL is available.

### Current implementation status

The existing dashboard implementation uses JavaScript sample data. It is
not connected to a live news source. Do not describe sample headlines as
live or verified news.

## 5.2 Snippets --- `snippets.html`

### Purpose

Snippets presents short AI explanations in a vertical feed inspired by
the interaction pattern of short-form video platforms.

### Layout

-   Shared navigation header.
-   Introductory heading: **AI, in seconds.**
-   Snippet counter.
-   Large vertical reel container.
-   Narrow navigation/progress controls.
-   Footer.

### Reel template

Each reel contains: - A visual artwork panel. - Category label. - Main
concept or headline. - Short explanation. - A concise "The Takeaway"
section. - Topic tags. - Reel position indicator.

The visual panel is generated using CSS and typography rather than
requiring a stock image for every snippet.

### Interaction

-   The reel container scrolls vertically.
-   CSS `scroll-snap-type: y mandatory` aligns each reel to the
    viewport.
-   Touch scrolling and mouse-wheel scrolling should work naturally.
-   Previous and next controls navigate between reels.
-   Up and down arrow keys navigate between reels.
-   The current reel counter and progress indicator update as the user
    scrolls.
-   There is no automatic progression or autoplay.

### Content architecture

JavaScript renders the reel template from a snippets data array. Adding
a new snippet should require adding a data object, not duplicating HTML.

### Current implementation status

The page currently uses a small set of sample snippets. The content is
local mock data and is not yet supplied by an API.

## 5.3 Explore AI --- `explore.html`

### Purpose

Explore AI is a directory for discovering and comparing AI models. Users
can browse models based on how they want to access them.

### Main heading

**Find your next AI model.**

### Three access modes

#### Free

Shows models with free access or free usage options. The interface
should communicate that free access can involve trade-offs such as usage
limits, rate limits, model availability, or reduced capability depending
on the provider.

#### Paid

Shows premium models and their capabilities. The interface should make
cost and capability trade-offs understandable. Do not imply that a paid
model is automatically better for every task.

#### Local

Helps users find models that may fit their own computer hardware.

The user manually enters: - Operating system - Processor - System RAM -
GPU - GPU VRAM - Available storage

The current frontend uses these values to filter a local mock model
catalogue and display estimated compatibility categories.

### Model cards

Model cards currently include: - Model name - Provider - Access type -
Category - Short description - Tags - Illustrative quality score -
Illustrative speed score - Context window - Trade-off explanation -
Compare selection

### Filters and sorting

The directory includes: - Search by model, provider, task, or tags. -
Category filter. - Featured sorting. - Quality sorting. - Speed sorting.

Current category options include Chat, Coding, Reasoning, Multimodal,
and Image generation.

### Model comparison

Users can select up to three models and open a comparison table. The
table compares provider, category, quality score, speed score, context
window, and trade-off.

### Local hardware results

The Local mode provides a hardware form and a result area. The current
recommendation logic is a frontend demonstration only.

Compatibility labels should be described as estimates, not guarantees.
The browser is not detecting the user's actual hardware or benchmarking
model performance.

### Data accuracy

The current model catalogue and its scores are illustrative
placeholders. They are not verified current benchmarks, pricing, context
specifications, or hardware guarantees.

When real data is added, each model should have appropriately sourced
specifications and a last-verified date. Do not silently turn demo
values into factual claims.

## 5.4 Know AI --- `know-ai.html`

### Purpose

Know AI is intended to become the structured learning area of
TokenTrail. It will help users understand AI concepts, from foundational
machine learning to modern generative AI.

### Current design

The current page is a coming-soon page, not a functioning learning
module.

It includes: - Headline: **Understand AI. Not just use it.** - Short
description of the future learning experience. - Learning-map visual. -
Topic labels for Machine Learning, Neural Networks, Deep Learning,
Generative AI, and Large Language Models. - Link to Explore AI. - Link
back to Headlines.

The visual is built with CSS shapes and typography.

### Future direction

The exact lesson structure, learning paths, quizzes, exercises, and
completion rules have not yet been finalized. Do not invent these as
implemented features.

## 5.5 My Progress --- `progress.html`

### Purpose

My Progress is the personal learning dashboard. It should help users
understand what they have explored, how consistently they are learning,
and which topics they are progressing through.

### Current sections

**Profile and learning level:** Displays a profile initial, user name,
short profile description, current level, and progress toward the next
level.

**Statistics:** Current demo statistics include total XP, learning
streak, snippets explored, and quizzes completed. These are placeholder
values until user activity is connected.

**Weekly activity:** A seven-day activity chart displays learning
activity across the week.

**Topic progress:** Progress bars show illustrative progress across
Machine Learning, Generative AI, Deep Learning, Neural Networks, and
Large Language Models.

**Recently explored:** A list of recently explored concepts links back
to Snippets.

**Achievements:** Achievement cards currently show examples such as On a
roll, Curious mind, Knowledge seeker, and Explorer.

### Current implementation status

The page renders its content from local JavaScript arrays. The current
values are static mock data, not actual tracked user progress. No
persistence or user activity tracking is implemented yet.

## 6. Interaction and component conventions

### Buttons and links

-   Use links for navigation.
-   Use buttons for actions that change the current page state.
-   Provide visible hover and focus states.
-   Keep action labels short and specific.
-   Avoid controls that look interactive but do nothing.

### Forms

-   Associate labels with their inputs.
-   Use appropriate input types.
-   Provide sensible defaults only where they are safe and clear.
-   Do not silently fill in missing user data.
-   Keep validation understandable.

### Overlays and panels

-   Overlays should have a clear close action.
-   Avoid opening multiple competing overlays.
-   Keep content readable on mobile.
-   Preserve keyboard accessibility where practical.

### Scroll interactions

The Snippets feed uses native browser scrolling and CSS scroll snapping.
Do not replace this with a custom scrolling system without a clear
reason.

### Responsive behavior

At minimum, test wide desktop, laptop, tablet, and mobile layouts.

On smaller screens: - Navigation may scroll horizontally. - Multi-column
grids should collapse. - Form fields should remain usable. - Text should
not overflow. - Controls should remain reachable. - Cards should not
become cramped.

## 7. Current frontend file structure

``` text
frontend/
├── index.html
├── pages/
│   ├── dashboard.html
│   ├── snippets.html
│   ├── explore.html
│   ├── know-ai.html
│   └── progress.html
│
├── css/
│   ├── styles.css
│   ├── auth.css
│   ├── app.css
│   ├── snippets.css
│   ├── explore.css
│   ├── know-ai.css
│   └── progress.css
│
├── js/
│   ├── main.js
│   ├── auth.js
│   ├── app.js
│   ├── snippets.js
│   ├── explore.js
│   └── progress.js
│
└── assets/
    └── github.png
```

This reflects the files established during the current frontend work.
Other files may exist in the repository and should not be deleted or
renamed without checking their usage.

### Page asset paths

Pages are inside `frontend/pages/`, so shared resources are referenced
one directory up:

``` html
<link rel="stylesheet" href="../css/page-name.css">
<script src="../js/page-name.js" defer></script>
```

Page-to-page navigation uses relative links such as `dashboard.html`,
`snippets.html`, `explore.html`, `know-ai.html`, and `progress.html`.

## 8. Frontend technology and implementation constraints

### Current frontend

-   HTML
-   CSS
-   Vanilla JavaScript
-   Local JavaScript arrays for mock data
-   CSS for layout, visual effects, and scroll snapping

The current phase does not require React. A future migration may be
considered, but it is not a requirement for completing the current
frontend.

### Do not add without approval

-   Paid APIs or services
-   Paid model inference
-   Hosted search services
-   Unrequested analytics or tracking
-   Backend dependencies in frontend pages
-   Direct database connections from browser code
-   Unnecessary UI libraries or animation packages

The current frontend should remain usable with mock data and without a
backend.

## 9. Future architecture --- planned, not currently implemented

The intended backend direction is Python, FastAPI, Pydantic, SQLAlchemy,
Alembic, and PostgreSQL.

Intended architecture:

``` text
Browser
  │
  │ HTML / CSS / JavaScript
  ▼
FastAPI REST API
  │
  ├── Application logic
  ├── Authentication
  ├── Content and user activity
  └── ML services
        │
        ▼
    PostgreSQL
```

The browser should communicate with FastAPI through HTTP APIs. It should
not connect directly to PostgreSQL.

### Possible future API areas

The following are planned areas, not confirmed implemented endpoints: -
Articles - Snippets - Categories - Recommendations - Learning progress -
Bookmarks - Quiz attempts - Authentication

An API version prefix such as `/api/v1` is the intended convention.

### Possible future data entities

Potential entities discussed for the platform include users, articles,
categories, snippets, quizzes, questions, quiz attempts, bookmarks, user
interests, and recommendation events.

The final schema and relationships still need to be designed before
implementation.

### Future ML direction

Potential initial ML functionality includes: - Article classification
using TF-IDF and Logistic Regression. - Related article discovery using
cosine similarity. - Transparent content-based recommendations.

Any model evaluation should use suitable metrics and avoid data leakage.
These capabilities are planned and are not part of the current frontend
implementation.

## 10. Content and data rules

### Mock data

Mock data is allowed for frontend development. It should be realistic
enough to test layout and interactions, but it must not be presented as
verified live information.

### Model specifications

Do not invent real-world pricing, benchmarks, model context limits,
release status, or hardware requirements and present them as verified
facts.

### Local model compatibility

The Local tab currently uses manually entered specifications and demo
estimates. A future implementation will need a more carefully sourced
model catalogue and documented estimation assumptions.

### Learning progress

XP, streaks, completion counts, achievements, and topic progress are
currently examples. They should eventually be derived from actual user
activity rather than arbitrary hardcoded values.

### News

Sample headlines must not be presented as current news. A future news
ingestion process should retain source information and publication
timestamps.

## 11. Accessibility and usability

-   Use semantic HTML elements.
-   Provide descriptive page titles.
-   Use meaningful link text.
-   Give icon-only buttons accessible labels.
-   Preserve keyboard access to controls.
-   Use visible focus indicators.
-   Maintain readable contrast.
-   Do not communicate state through colour alone.
-   Respect reduced-motion preferences when adding non-essential motion.
-   Ensure forms have visible labels and understandable defaults.

## 12. Quality checklist

### Visual consistency

-   [ ] Uses the TokenTrail palette.
-   [ ] Uses the shared font system.
-   [ ] Uses consistent navigation.
-   [ ] Uses consistent borders and spacing.
-   [ ] Avoids generic SaaS styling and unnecessary decoration.

### Functionality

-   [ ] All navigation links point to the correct pages.
-   [ ] Buttons perform their stated actions.
-   [ ] Search and filters work where present.
-   [ ] Empty states are handled.
-   [ ] No broken images or missing assets.
-   [ ] No console errors.

### Responsive behavior

-   [ ] Desktop layout works.
-   [ ] Tablet layout works.
-   [ ] Mobile layout works.
-   [ ] No horizontal overflow.
-   [ ] Forms and controls remain usable.

### Data integrity

-   [ ] Mock data is not described as live data.
-   [ ] Illustrative scores are labelled appropriately.
-   [ ] Estimates are not presented as guarantees.
-   [ ] Missing information is not fabricated.

### Code quality

-   [ ] No unnecessary dependencies.
-   [ ] No duplicate CSS overrides.
-   [ ] No unused code.
-   [ ] No unnecessary comments or blank lines.
-   [ ] JavaScript remains understandable and maintainable.

## 13. Current status summary

  -----------------------------------------------------------------------
  Area                                Current status
  ----------------------------------- -----------------------------------
  Headlines                           Frontend layout and mock feed

  Snippets                            Frontend vertical snap feed with
                                      mock content

  Explore AI                          Frontend directory, filters,
                                      comparison, and demo local
                                      recommendations

  Know AI                             Coming-soon page

  My Progress                         Frontend dashboard with static demo
                                      statistics

  Backend                             Planned

  PostgreSQL                          Planned

  Authentication                      Separate frontend work / backend
                                      integration pending

  ML services                         Planned

  Live content                        Not connected
  -----------------------------------------------------------------------

## 14. Guiding design statement

TokenTrail should make the fast-moving world of AI easier to follow and
understand.

Its interface should be editorial, clear, technically credible, and
enjoyable to explore. Every page should help users discover something,
understand something, or make progress.

**Keep the product focused. Keep the interface intentional. Do not add
complexity just to make it look more advanced.**
