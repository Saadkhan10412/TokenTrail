# Machine Learning Plan — TokenTrail

## Principles
- Use ML only where it solves a real product problem.
- Start with interpretable, measurable baselines.
- Do not invent performance metrics.
- Keep training and inference reproducible.
- Keep optional LLM functionality separate from classical ML.

## Model 1 — Article topic classification
**Purpose:** Assign a topic/category to an article based on its headline and available permitted text.

### Baseline
- Text features: TF-IDF.
- Classifier: Logistic Regression.
- Libraries: pandas, scikit-learn, joblib.
- Output: predicted class and a confidence/score representation, with appropriate caution about probability calibration.

### Evaluation
- Create a documented class taxonomy and labeling guide.
- Use train/validation/test splits and consider temporal splits for time-dependent news.
- Prevent duplicate and near-duplicate articles from leaking across splits.
- Report macro-F1, per-class precision/recall, and confusion matrix.
- Compare with a simple majority-class baseline.
- Decide a low-confidence handling strategy based on validation results.

### Artifacts and reproducibility
Record dataset version, preprocessing, random seed where applicable, library versions, model version, metrics, and training command. Keep large/private datasets and generated artifacts out of Git where appropriate.

## Model 2 — Related articles
**Purpose:** Find articles with similar content.

### Baseline
- TF-IDF document vectors.
- Cosine similarity.
- Exclude the current article and duplicates.
- Apply category or recency constraints only if product testing supports them.

### Evaluation
- Inspect recommendation lists for representative articles.
- Use human relevance judgments or a small documented evaluation set.
- Do not claim recommendation quality merely because a similarity score is computed.

## Model 3 — Learning recommendations
**Initial approach:** Rules, not a trained model.
- Consider prerequisite topics.
- Consider completed snippets and quiz performance.
- Explain why a next topic is suggested.
- Avoid recommending only what the user already knows.

A trained recommender should wait until enough trustworthy interaction data exists and an evaluation plan is defined.

## Optional LLM use
Potential uses:
- Article summaries.
- Beginner-friendly explanations.
- Draft educational snippets.
- Draft quiz questions.

Controls:
- Disabled by default.
- Provider-independent adapter.
- Explicit approval before any paid service or service with uncertain charges.
- No web-search add-ons, online modes, or paid retrieval features without explicit approval.
- Validate output and retain source references.
- Label generated content and do not present generated statements as verified facts without checks.
- Core product must work without LLM credentials.

## Suggested module boundaries
- `ml/training/`: dataset preparation and training scripts.
- `ml/evaluation/`: evaluation scripts and reports.
- `ml/artifacts/`: model artifacts, excluded from Git when large.
- `backend/app/ml/`: loading, preprocessing, and inference interface.

## Not yet decided
- Exact category taxonomy.
- Dataset source and licensing.
- Minimum data volume and labeling workflow.
- Whether confidence calibration is needed.
- Model performance thresholds for release.

These decisions must be based on the actual dataset and validation results.
