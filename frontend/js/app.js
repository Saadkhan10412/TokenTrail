
const API_URL = "http://127.0.0.1:8000";

const feeds = {
    repos: {
        title: "Trending repositories.",
        description: "Open-source projects worth exploring.",
        label: "TOP REPOS",
        icon: "github",
        category: "Top Repos"
    },
    industry: {
        title: "AI industry watch.",
        description: "Companies, partnerships and developments.",
        label: "AI INDUSTRY",
        icon: "industry",
        category: "AI Industry"
    },
    releases: {
        title: "Fresh off the frontier.",
        description: "New models, versions and AI releases.",
        label: "LATEST RELEASES",
        icon: "releases",
        category: "Latest Releases"
    },
    research: {
        title: "Ideas pushing AI forward.",
        description: "Research papers, experiments and breakthroughs.",
        label: "RESEARCH",
        icon: "research",
        category: "Research"
    },
    developers: {
        title: "Inside the ecosystem.",
        description: "Frameworks, libraries, APIs and developer updates.",
        label: "DEVELOPER UPDATES",
        icon: "developers",
        category: "Developer Updates"
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

async function fetchFeed(name) {
    const category = feeds[name].category;

    const response = await fetch(
        `${API_URL}/articles/?feed_category=${encodeURIComponent(category)}&limit=10&page=1`
    );

    if (!response.ok) {
        throw new Error(`Failed to load ${category}`);
    }

    const data = await response.json();
    return data.items;
}

async function renderFeed(name) {
    const feed = feeds[name];
    if (!feed) return;

    currentFeed = name;

    feedHeading.textContent = feed.title;
    feedDescription.textContent = feed.description;
    activeFeedLabel.textContent = feed.label;
    feedTitleIcon.innerHTML = icons[feed.icon];

    feedButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.feed === name);
        button.setAttribute("aria-pressed", String(button.dataset.feed === name));
    });

    headlineList.replaceChildren();

    const loading = document.createElement("p");
    loading.textContent = "Loading articles...";
    headlineList.appendChild(loading);

    try {
        const articles = await fetchFeed(name);

        if (currentFeed !== name) return;

        headlineList.replaceChildren();
        feedTotal.textContent = `${articles.length} ARTICLES`;

        if (!articles.length) {
            headlineList.textContent = "No articles available in this feed yet.";
            return;
        }

        articles.forEach((article, index) => {
            const story = [
                article.category?.name || feed.label,
                article.title,
                article.summary || "No summary available.",
                article.source?.name || "TokenTrail",
                article.content || article.summary || "",
                [],
                article.original_url
            ];

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
            card.querySelector(".card-category").textContent = feed.label;
            card.querySelector(".card-title").textContent = article.title;
            card.querySelector(".card-summary").textContent = article.summary || "";
            card.querySelector(".card-meta").textContent =
                article.source?.name || `TOKENTRAIL / ${feed.label}`;

            card.addEventListener("click", () => openStory(story, theme, symbol));
            headlineList.appendChild(card);
        });

    } catch (error) {
        if (currentFeed !== name) return;

        headlineList.replaceChildren();

        const message = document.createElement("p");
        message.textContent = "Unable to load articles. Please try again.";
        headlineList.appendChild(message);

        feedTotal.textContent = "FEED UNAVAILABLE";
        console.error(error);
    }
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
    modalDetails.textContent = why || "No additional information available.";

    modalOverview.textContent = overview || "No additional article content available.";
    modalOverviewSection.hidden = true;

    modalKeyPoints.replaceChildren();
    modalKeyPointsSection.hidden = true;

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
        modalSourceNote.textContent = "No original source attached.";
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
