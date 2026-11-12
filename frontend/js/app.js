
const feeds = {
    repos: {
        title: "Trending repositories.",
        description: "Open-source projects worth exploring.",
        label: "TOP REPOS",
        icon: "github",
        stories: [
            ["AI AGENTS", "The next generation of AI agent frameworks", "Projects exploring autonomous agents, tools and multi-step workflows.", "Agents are how models move from answering questions to completing tasks, and the frameworks around them show which patterns are settling."],
            ["LLM DEVELOPMENT", "Run language models on your own machine", "Tools for local inference, model management and experimentation.", "Local inference keeps cost and data on your side of the network, and it shows how much capability fits in consumer hardware."],
            ["MACHINE LEARNING", "Open-source ML projects worth watching", "Projects covering training, evaluation and deployment.", "Training is only part of the work. Evaluation and deployment tooling decides whether a model survives contact with real data."],
            ["GENERATIVE AI", "Creative AI for image and video generation", "Tools for generative media and creative workflows.", "Media models are a fast-moving testbed for control, editing and how generated work fits into real production pipelines."],
            ["RAG", "New approaches to retrieval-augmented generation", "Projects exploring retrieval, indexing and context construction.", "Retrieval decides what a model gets to see, so retrieval design often matters more than the model itself."],
            ["DEVELOPER TOOLS", "Tools for building AI applications", "Libraries and utilities for AI application development.", "Most AI products are assembled from small utilities, and better glue changes what is practical to build."],
            ["MODEL TRAINING", "Experiment with efficient fine-tuning", "Projects exploring model adaptation with fewer resources.", "Efficient fine-tuning is what makes specialised models available to teams without a large GPU budget."],
            ["COMPUTER VISION", "Open-source computer vision projects", "Projects working on image understanding and visual intelligence.", "Vision is where AI meets the physical world, from inspection to medical imaging to robotics."],
            ["DATA SCIENCE", "Tools for better ML workflows", "Projects for data preparation and model evaluation.", "Models inherit the problems in their data, so the tooling around data and evaluation is where quality is decided."],
            ["AI INFRASTRUCTURE", "The infrastructure behind modern AI", "Tools for inference, orchestration and deployment.", "Serving, batching and orchestration are the difference between a demo and a system that stays up."]
        ]
    },

    industry: {
        title: "AI industry watch.",
        description: "Companies, partnerships and developments.",
        label: "AI INDUSTRY",
        icon: "industry",
        stories: [
            ["COMPANIES", "How AI companies are changing their strategies", "Explore product strategies and developments across the AI industry.", "Strategy shifts show where attention and resources are moving, often before the products land."],
            ["BUSINESS", "AI is moving into more industries", "How organisations are integrating AI into their workflows.", "Adoption patterns show which tasks AI actually improves, and which ones still need a person."],
            ["STARTUPS", "The evolving AI startup ecosystem", "Emerging startup ideas, products and business models.", "Startups are the fastest way to see which AI costs are falling and what that makes newly possible."],
            ["PARTNERSHIPS", "The partnerships shaping AI", "Collaboration across AI infrastructure and product development.", "Compute, data and distribution are rarely owned by one company, so partnerships expose the real dependencies."],
            ["OPEN SOURCE", "Open models versus closed models", "Different approaches to access, development and distribution.", "The choice between open and closed weights shapes cost, control, privacy and how fast you can build."],
            ["AI POLICY", "The changing landscape of AI regulation", "Governance, transparency and accountability in AI.", "Rules decide what can be deployed and what has to be documented, which affects design decisions early."],
            ["INVESTMENT", "Where AI investment is heading", "Areas attracting attention across the AI ecosystem.", "Funding tells you which problems are considered worth solving, and which companies are betting on them."],
            ["PRODUCTS", "How AI-powered products are evolving", "New approaches to intelligent everyday products.", "Product design is where AI either becomes useful or becomes a feature nobody asked for."],
            ["WORKFORCE", "How AI is changing the way people work", "The opportunities and challenges of AI-assisted work.", "Work changes at the task level, and knowing which tasks are affected is more useful than broad predictions."],
            ["ECOSYSTEM", "The developments shaping the AI ecosystem", "People, companies and technologies influencing AI.", "The ecosystem view connects separate announcements into a picture of where the field is heading."]
        ]
    },

    releases: {
        title: "Fresh off the frontier.",
        description: "New models, versions and AI releases.",
        label: "LATEST RELEASES",
        icon: "releases",
        stories: [
            ["LANGUAGE MODELS", "A closer look at new language models", "Explore model capabilities, context windows and performance.", "Each generation changes the trade-off between capability, latency and cost, which drives architectural choices."],
            ["MULTIMODAL AI", "Models that understand more than text", "Developments across text, images, audio and video.", "Combining modalities lets one system handle tasks that previously needed several separate pipelines."],
            ["IMAGE GENERATION", "New directions in image generation", "Explore image generation, editing and visual control.", "Control and consistency matter more than novelty once generated images have to be used deliberately."],
            ["OPEN MODELS", "New open-weight models to explore", "Models developers can download and experiment with.", "Open weights make fine-tuning, evaluation and self-hosting possible without depending on an API."],
            ["SMALL MODELS", "Intelligence in a smaller package", "Efficient models for local and resource-constrained environments.", "Smaller models cut latency and cost, and often do well when the task is narrow and well specified."],
            ["AUDIO AI", "The changing world of AI audio", "Speech recognition, synthesis and audio understanding.", "Audio is the most natural interface for many products, and quality depends on handling noise well."],
            ["AI CODING", "Models built to assist developers", "AI coding tools and software engineering capabilities.", "Coding assistants change how work is written and reviewed, not just how quickly code appears."],
            ["BENCHMARKS", "How new models are evaluated", "Benchmarks and methods for comparing model capabilities.", "A benchmark measures what it was designed to measure, so knowing its limits is part of reading the result."],
            ["INFERENCE", "Making AI inference faster", "Techniques for improving latency and efficiency.", "Inference is where AI money is spent, so throughput improvements quietly change which products are viable."],
            ["MODEL UPDATES", "What changes in a new model version?", "Improvements, limitations and compatibility.", "Version changes can alter behaviour on prompts your product already relies on, so diffs matter."]
        ]
    },

    research: {
        title: "Ideas pushing AI forward.",
        description: "Research papers, experiments and breakthroughs.",
        label: "RESEARCH",
        icon: "research",
        stories: [
            ["RETRIEVAL", "Rethinking retrieval-augmented generation", "Research into how AI systems retrieve and use external knowledge.", "How a system retrieves and attributes sources determines whether its answers can be checked."],
            ["MODEL TRAINING", "Making model training more efficient", "Techniques for improving training and resource utilisation.", "Training efficiency sets the cost of a capability, and cost decides who can build with it."],
            ["DISTILLATION", "How smaller models learn from larger models", "Research into transferring capabilities between models.", "Distillation is one route from an expensive experiment to a model that can be served affordably."],
            ["REASONING", "How models solve complex problems", "Approaches to multi-step reasoning and problem-solving.", "Reasoning research explains when a model is working through a problem and when it is producing plausible text."],
            ["COMPUTER VISION", "Advances in visual understanding", "Research in image recognition and visual reasoning.", "Visual understanding underpins inspection, robotics and accessibility tools that depend on reliable perception."],
            ["REINFORCEMENT LEARNING", "Learning through feedback and interaction", "New directions in reinforcement learning.", "Feedback-driven learning is how systems improve at tasks without a large labelled dataset."],
            ["EVALUATION", "Measuring the reliability of AI systems", "Methods for evaluating accuracy and robustness.", "Evaluation is the only way to know whether a system is safe to use, and most failures are measurement failures."],
            ["AGENTIC AI", "Research into autonomous AI agents", "Planning, memory, tool use and agent collaboration.", "Agents need memory and error recovery, and that is where most of the open research problems live."],
            ["INTERPRETABILITY", "Looking inside neural networks", "Understanding internal representations and model behaviour.", "Interpretability is how you debug a model whose reasoning you cannot read directly."],
            ["DATA EFFICIENCY", "Learning more from better datasets", "Research into data quality and efficient learning.", "Better data often beats a bigger model, and data work is where most practical gains come from."]
        ]
    },

    developers: {
        title: "Inside the ecosystem.",
        description: "Frameworks, libraries, APIs and developer updates.",
        label: "DEVELOPER UPDATES",
        icon: "developers",
        stories: [
            ["FRAMEWORKS", "What's changing in AI frameworks?", "Framework updates and their impact on application development.", "Frameworks shape how prompts, tools and state are organised, and upgrades can ripple through a codebase."],
            ["APIS", "New possibilities in AI API integration", "API capabilities, integration patterns and developer features.", "API shape decides how much orchestration you write yourself and how portable your application is."],
            ["PYTHON", "Python tools for AI development", "Libraries for experimentation, inference and applications.", "Python is where most models are trained and evaluated, so its tooling sets the pace for everything else."],
            ["VECTOR DATABASES", "The evolution of vector search", "Tools for storing and retrieving vector representations.", "Vector search is the difference between semantic retrieval that works and one that returns near-misses."],
            ["DEPLOYMENT", "New ways to deploy AI applications", "Deployment workflows, infrastructure and model serving.", "Deployment decides whether a model's quality survives contact with real traffic and latency budgets."],
            ["AI AGENTS", "Tools for building AI-powered agents", "Libraries for tool use, orchestration and agent workflows.", "Orchestration tools determine how much of an agent's behaviour you can observe and control."],
            ["LOCAL AI", "Run AI models on your own machine", "Local inference, model management and optimisation.", "Running locally is a practical answer when data cannot leave a device or an organisation."],
            ["MONITORING", "Debugging AI application performance", "Tools for tracing, testing and observing AI systems.", "AI failures are usually invisible without traces, so observability is part of correctness."],
            ["FRONTEND", "Building better AI interfaces", "Tools for interactive AI-powered experiences.", "An interface that shows progress, sources and uncertainty is often what makes AI usable at all."],
            ["WORKFLOWS", "Connecting AI tools and automation", "Projects connecting models, APIs and services.", "Most real tasks cross several services, so workflow tooling is where AI becomes routine."]
        ]
    }
};
const icons = {
    github: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5h18v14H3z"/><path d="M3 9h18M8 5v4m8-4v4"/></svg>`,
    industry: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/></svg>`,
    releases: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/></svg>`,
    research: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/></svg>`,
    developers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 8-4 4 4 4m8-8 4 4-4 4m-2-11-4 14"/></svg>`
};

const themes = ["dark", "green", "purple", "cream", "blue", "red", "paper"];
const symbols = ["⌘", "◉", "✳", "◎", "⌬", "✺", "▦", "∴", "↗", "⟳"];

const headlineList = document.querySelector("#headline-list");
const feedHeading = document.querySelector("#feed-heading");
const feedDescription = document.querySelector("#feed-description");
const feedTitleIcon = document.querySelector("#feed-title-icon");
const activeFeedLabel = document.querySelector("#active-feed-label");
const feedTotal = document.querySelector("#feed-total");
const feedButtons = document.querySelectorAll(".feed-option");

const overlay = document.querySelector("#story-overlay");
const closeButton = document.querySelector("#story-close");
const modalArtwork = document.querySelector("#modal-artwork");
const modalMeta = document.querySelector("#modal-meta");
const modalTitle = document.querySelector("#modal-title");
const modalSummary = document.querySelector("#modal-summary");
const modalOverview = document.querySelector("#modal-overview");
const modalOverviewSection = document.querySelector("#modal-overview-section");
const modalDetails = document.querySelector("#modal-details");
const modalKeyPoints = document.querySelector("#modal-key-points");
const modalKeyPointsSection = document.querySelector("#modal-key-points-section");
const modalTags = document.querySelector("#modal-tags");
const originalLink = document.querySelector("#original-link");
const modalSourceNote = document.querySelector("#modal-source-note");

let currentFeed = "repos";
let previousFocus;

function renderFeed(name) {
    const feed = feeds[name];
    if (!feed) return;

    currentFeed = name;
    feedHeading.textContent = feed.title;
    feedDescription.textContent = feed.description;
    activeFeedLabel.textContent = feed.label;
    feedTitleIcon.innerHTML = icons[feed.icon];
    feedTotal.textContent = `${feed.stories.length} SAMPLE ENTRIES`;

    feedButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.feed === name);
        button.setAttribute("aria-pressed", String(button.dataset.feed === name));
    });

    headlineList.replaceChildren();

    feed.stories.forEach((story, index) => {
        const [category, title, summary] = story;
        const theme = themes[index % themes.length];
        const symbol = symbols[index % symbols.length];

        const card = document.createElement("button");
        card.type = "button";
        card.className = `poster-card theme-${theme}${index === 0 ? " featured" : ""}`;

        card.innerHTML = `
            <span class="card-artwork" aria-hidden="true">
                <span class="art-grid"></span>
                <span class="art-orbit"></span>
                <span class="art-symbol"></span>
            </span>
            <span class="card-topline">
                <span class="card-category"></span>
                <span class="card-index">${String(index + 1).padStart(2, "0")}</span>
            </span>
            <span class="card-copy">
                <span class="card-title"></span>
                <span class="card-summary"></span>
            </span>
            <span class="card-bottomline">
                <span class="card-meta"></span>
                <span class="card-open" aria-hidden="true">↗</span>
            </span>
        `;

        card.querySelector(".art-symbol").textContent = symbol;
        card.querySelector(".card-category").textContent = category;
        card.querySelector(".card-title").textContent = title;
        card.querySelector(".card-summary").textContent = summary;
        card.querySelector(".card-meta").textContent = `TOKENTRAIL / ${feed.label}`;

        card.addEventListener("click", () => openStory(story, theme, symbol));
        headlineList.appendChild(card);
    });
}

function openStory(story, theme, symbol) {
    const [category, title, summary, why, overview, keyPoints, originalUrl] = story;

    previousFocus = document.activeElement;

    modalArtwork.className = `modal-artwork theme-${theme}`;
    modalArtwork.innerHTML = `
        <span class="art-grid" aria-hidden="true"></span>
        <span class="art-orbit" aria-hidden="true"></span>
        <span class="modal-art-label"></span>
        <span class="modal-art-symbol" aria-hidden="true"></span>
    `;

    modalArtwork.querySelector(".modal-art-label").textContent = category;
    modalArtwork.querySelector(".modal-art-symbol").textContent = symbol;

    modalMeta.textContent = `TOKENTRAIL / ${feeds[currentFeed].label}`;
    modalTitle.textContent = title;
    modalSummary.textContent = summary;
    modalDetails.textContent = why || "No additional information has been added yet.";

    modalOverview.textContent = overview || "Additional article context will appear here when verified information is available.";
    modalOverviewSection.hidden = false;

    modalKeyPoints.replaceChildren();

    if (Array.isArray(keyPoints) && keyPoints.length) {
        keyPoints.forEach(point => {
            const item = document.createElement("li");
            item.textContent = point;
            modalKeyPoints.appendChild(item);
        });

        modalKeyPointsSection.hidden = false;
    } else {
        modalKeyPointsSection.hidden = true;
    }

    modalTags.replaceChildren();

    [category, feeds[currentFeed].label].forEach(text => {
        const tag = document.createElement("span");
        tag.textContent = text;
        modalTags.appendChild(tag);
    });

    if (originalUrl && isValidUrl(originalUrl)) {
        originalLink.href = originalUrl;
        originalLink.target = "_blank";
        originalLink.rel = "noopener noreferrer";
        originalLink.classList.remove("is-disabled");
        originalLink.removeAttribute("aria-disabled");
        originalLink.removeAttribute("tabindex");
        modalSourceNote.textContent = "Continue reading at the original source.";
    } else {
        originalLink.removeAttribute("href");
        originalLink.removeAttribute("target");
        originalLink.classList.add("is-disabled");
        originalLink.setAttribute("aria-disabled", "true");
        originalLink.setAttribute("tabindex", "-1");
        modalSourceNote.textContent = "Sample entry · No original source attached.";
    }

    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("story-open");

    requestAnimationFrame(() => closeButton.focus());
}

function isValidUrl(value) {
    try {
        const url = new URL(value);
        return url.protocol === "https:" || url.protocol === "http:";
    } catch {
        return false;
    }
}

function closeStory() {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("story-open");
    previousFocus?.focus();
}

feedButtons.forEach(button => {
    button.addEventListener("click", () => renderFeed(button.dataset.feed));
});

closeButton.addEventListener("click", closeStory);

overlay.addEventListener("click", event => {
    if (event.target.matches("[data-close-story]")) closeStory();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && overlay.classList.contains("open")) {
        closeStory();
    }
});

overlay.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;

    const focusable = overlay.querySelectorAll("button:not(:disabled), a[href]");
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
});

renderFeed("repos");
