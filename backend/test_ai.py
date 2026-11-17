from app.services.ai.processor import process_article

result = process_article(
    title="Introducing a new open-source language model",
    intro="Researchers have released an open-source language model designed to improve reasoning and coding capabilities.",
    source="Hugging Face"
)

print(result)
