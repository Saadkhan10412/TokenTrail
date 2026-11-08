const snippets = [
    {
        category: "Retrieval / RAG",
        title: "What if your RAG system didn't need a vector database?",
        intro: "Vectorless RAG keeps retrieval but replaces the embedding index.",
        description: "Traditional RAG systems convert documents into embeddings and retrieve relevant chunks through similarity search. Vectorless RAG explores alternatives that use structured representations, keyword retrieval and language models to find relevant information.",
        takeaway: "The goal isn't always more embeddings. It's better retrieval with less complexity.",
        tags: ["RAG", "Retrieval", "LLMs"],
        symbol: "RAG",
        theme: "dark",
        detail: [
            "Retrieval-augmented generation has two moving parts: a retriever that finds relevant passages, and a model that answers using them. Most implementations build the retriever on an embedding index — text becomes vectors, vectors are stored, and search means comparing them by similarity.",
            "Vectorless variants keep the retrieval step but replace the index. Keyword scoring such as BM25, structured records, page summaries or model-driven filtering can find the right passage without maintaining an embedding store. The trade-off is real: dense vectors handle paraphrase well, while lexical methods handle exact names, codes and rare terms well."
        ],
        related: ["BM25", "Hybrid search", "Chunking"]
    },
    {
        category: "Machine Learning",
        title: "Your model can learn without starting from scratch.",
        intro: "Reuse what a large model already learned instead of retraining.",
        description: "Transfer learning lets a model reuse knowledge learned from a large dataset. Instead of training everything again, you adapt an existing pretrained model to a new task using a smaller dataset.",
        takeaway: "Reuse learned representations to save training time and data.",
        tags: ["Transfer Learning", "Deep Learning"],
        symbol: "TL",
        theme: "red",
        detail: [
            "In practice a pretrained model supplies general representations, and you replace or retrain a small part of it — the final layers, an adapter, or a task-specific head — on your own labelled data.",
            "How much of the network you freeze matters. Freezing everything is cheap but limits adaptation; unfreezing more layers needs more data and compute. This is why small teams can ship vision and language models without pretraining from scratch."
        ],
        related: ["Fine-tuning", "Feature extraction", "Domain shift"]
    },
    {
        category: "Generative AI",
        title: "Distillation: a smaller model, a similar skillset.",
        intro: "A smaller model trained to imitate a larger one's behaviour.",
        description: "Knowledge distillation trains a smaller student model to reproduce the behaviour of a larger teacher model. The student learns from the teacher's outputs or internal representations.",
        takeaway: "You can reduce model size and inference cost while retaining useful capabilities.",
        tags: ["Distillation", "LLMs", "Optimization"],
        symbol: "KD",
        theme: "cream",
        detail: [
            "The teacher's output is a probability distribution over classes or tokens, not just a single label. That soft distribution carries information about which wrong answers are close, which the student can learn from.",
            "Distillation is usually combined with the original training objective, and it appears in production when a model must run with lower latency or less memory than the teacher. It is not compression by magic: a student cannot reliably exceed what its teacher knows."
        ],
        related: ["Teacher-student training", "Quantization", "Model compression"]
    },
    {
        category: "AI Engineering",
        title: "Embeddings turn meaning into numbers.",
        intro: "Text becomes vectors, and closeness starts to mean similarity.",
        description: "An embedding model maps text, images or other data into numerical vectors. Items with similar meanings often end up close together in the vector space, making semantic search and recommendations possible.",
        takeaway: "Embeddings help machines compare meaning beyond exact keyword matches.",
        tags: ["Embeddings", "Vector Search"],
        symbol: "010",
        theme: "white",
        detail: [
            "A vector has no meaning on its own; meaning comes from the space. Similar items land near each other, so a distance function such as cosine similarity becomes a relevance score.",
            "Embedding dimensions, the training objective and the data domain all shape that space. A model trained on general web text may place legal or medical terms poorly, which is why domain-specific embedding models exist."
        ],
        related: ["Cosine similarity", "Vector database", "Semantic search"]
    },
    {
        category: "Neural Networks",
        title: "Attention helps models decide what matters.",
        intro: "Each token weighs which other tokens matter to it.",
        description: "The attention mechanism lets a model weigh the importance of different tokens when processing a sequence. Transformers use self-attention to build context-aware representations.",
        takeaway: "Attention helps a model connect relevant information across a sequence.",
        tags: ["Transformers", "Attention"],
        symbol: "ATTN",
        theme: "dark",
        detail: [
            "Each token produces a query, a key and a value. The query is compared with every key to produce weights, and those weights combine the values — so a token's representation is built from the parts of the sequence it finds relevant.",
            "Multiple attention heads run in parallel and can capture different relationships. Cost grows with sequence length, which is why long-context models invest heavily in attention efficiency."
        ],
        related: ["Self-attention", "Multi-head attention", "Context window"]
    },
    {
        category: "Machine Learning",
        title: "Overfitting: when memorizing becomes a problem.",
        intro: "Memorising the training data instead of the pattern behind it.",
        description: "A model overfits when it learns the training data too closely, including noise and accidental patterns. It may perform well on training examples but poorly on unseen data.",
        takeaway: "A model should generalize to new data, not simply memorize old examples.",
        tags: ["Overfitting", "Model Evaluation"],
        symbol: "FIT",
        theme: "red",
        detail: [
            "Overfitting shows up as a widening gap between training performance and validation performance. The model has fit the noise in the sample rather than the pattern behind it.",
            "Mitigations include more or better data, augmentation, regularisation, early stopping and simpler models. A held-out test set is what tells you whether a fix actually worked."
        ],
        related: ["Regularisation", "Validation split", "Bias-variance trade-off"]
    }
];

const container = document.getElementById("reel-container");
const currentCount = document.getElementById("current-count");
const totalCount = document.getElementById("total-count");
const progressFill = document.getElementById("progress-fill");
const prevButton = document.getElementById("prev-reel");
const nextButton = document.getElementById("next-reel");
const dialog = document.getElementById("snippet-dialog");

const pad = number => String(number).padStart(2, "0");
let activeIndex = 0;

function renderSnippets() {
    container.innerHTML = snippets.map((snippet, index) => `
        <article class="reel" data-index="${index}">
            <div class="reel-art" data-theme="${snippet.theme}">
                <div class="art-top">
                    <span>TOKENTRAIL / SNIPPETS</span>
                    <span>${pad(index + 1)}</span>
                </div>
                <div class="art-symbol" aria-hidden="true">${snippet.symbol}</div>
                <div class="art-bottom">
                    <strong>IDEAS<br>IN MOTION.</strong>
                    <span>AI / KNOWLEDGE</span>
                </div>
            </div>

            <div class="reel-content">
                <span class="reel-category">${snippet.category}</span>
                <h2>${snippet.title}</h2>
                <p class="reel-intro">${snippet.intro}</p>

                <div class="reel-tags">
                    ${snippet.tags.map(tag => `<span>#${tag}</span>`).join("")}
                </div>

                <button type="button" class="reel-more" data-index="${index}">Know more →</button>
            </div>

            <span class="reel-number">${pad(index + 1)} / ${pad(snippets.length)}</span>
        </article>
    `).join("");

    totalCount.textContent = pad(snippets.length);
}

function showReel(index) {
    activeIndex = Math.max(0, Math.min(index, snippets.length - 1));
    const filled = ((activeIndex + 1) / snippets.length) * 100;

    currentCount.textContent = pad(activeIndex + 1);
    progressFill.style.height = `${filled}%`;
    prevButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === snippets.length - 1;
}

function goToReel(index) {
    const reels = container.querySelectorAll(".reel");
    const target = reels[Math.max(0, Math.min(index, reels.length - 1))];
    if (!target) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior = reducedMotion ? "auto" : "smooth";

    // Desktop uses the snap container; on stacked mobile layouts the page scrolls instead.
    if (container.scrollHeight > container.clientHeight + 1) {
        container.scrollTo({ top: target.offsetTop - reels[0].offsetTop, behavior });
    } else {
        target.scrollIntoView({ behavior, block: "start" });
    }
}

function openSnippet(index) {
    const snippet = snippets[index];
    if (!snippet) return;

    document.getElementById("dialog-meta").textContent = `SNIPPET ${pad(index + 1)} / ${pad(snippets.length)} · ${snippet.category}`;
    document.getElementById("dialog-title").textContent = snippet.title;
    document.getElementById("dialog-lead").textContent = snippet.description;
    document.getElementById("dialog-takeaway").textContent = snippet.takeaway;
    document.getElementById("dialog-detail").innerHTML = snippet.detail.map(paragraph => `<p>${paragraph}</p>`).join("");
    document.getElementById("dialog-related").innerHTML = snippet.related.map(topic => `<span>${topic}</span>`).join("");

    dialog.showModal();
}

function syncActiveReel() {
    const reels = container.querySelectorAll(".reel");
    const stacked = container.scrollHeight <= container.clientHeight + 1;
    const reference = stacked ? window.innerHeight * 0.35 : container.getBoundingClientRect().top + 8;
    let current = 0;

    reels.forEach((reel, index) => {
        if (reel.getBoundingClientRect().top <= reference + 4) current = index;
    });

    showReel(current);
}

let syncScheduled = false;

function scheduleSync() {
    if (syncScheduled) return;
    syncScheduled = true;

    requestAnimationFrame(() => {
        syncScheduled = false;
        syncActiveReel();
    });
}

renderSnippets();
showReel(0);

container.addEventListener("scroll", scheduleSync, { passive: true });
window.addEventListener("scroll", scheduleSync, { passive: true });
window.addEventListener("resize", scheduleSync);

prevButton.addEventListener("click", () => goToReel(activeIndex - 1));
nextButton.addEventListener("click", () => goToReel(activeIndex + 1));

container.addEventListener("click", event => {
    const trigger = event.target.closest(".reel-more");
    if (trigger) openSnippet(Number(trigger.dataset.index));
});

document.getElementById("dialog-close").addEventListener("click", () => dialog.close());

document.addEventListener("keydown", event => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (dialog.open) return;

    const active = document.activeElement;
    if (["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName)) return;

    if (event.key === "ArrowDown") {
        event.preventDefault();
        goToReel(activeIndex + 1);
    }

    if (event.key === "ArrowUp") {
        event.preventDefault();
        goToReel(activeIndex - 1);
    }
});
