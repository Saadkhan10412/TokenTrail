
const API_URL = "http://127.0.0.1:8000";
const token = localStorage.getItem("tokentrail_access_token");

const container = document.getElementById("reel-container");
const currentCount = document.getElementById("current-count");
const totalCount = document.getElementById("total-count");
const progressFill = document.getElementById("progress-fill");
const prevButton = document.getElementById("prev-reel");
const nextButton = document.getElementById("next-reel");
const dialog = document.getElementById("snippet-dialog");

const pad = number => String(number).padStart(2, "0");

const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
})[char]);

let snippets = [];
let activeIndex = 0;

function getTheme(category) {
    const themes = {
        "Machine Learning": "red",
        "Generative AI": "cream",
        "AI Engineering": "white",
        "Neural Networks": "dark",
        "Retrieval / RAG": "dark",
        "Artificial Intelligence": "red"
    };

    return themes[category] || "white";
}

function getSymbol(category) {
    return category.split(/[\s/]+/).map(word => word[0]).join("").slice(0, 4).toUpperCase();
}

function getPreview(content) {
    const text = content.replace(/\s+/g, " ").trim();
    return text.length > 150 ? text.slice(0, 150).trim() + "..." : text;
}

async function loadSnippets() {
    if (!token) {
        container.innerHTML = '<div class="loading-state">Please log in to explore snippets.</div>';
        return;
    }

    try {
        const response = await fetch(`${API_URL}/snippets/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(response.status === 401 ? "Session expired. Please log in again." : "Could not load snippets.");
        }

        const data = await response.json();
        snippets = data.items || [];

        if (!snippets.length) {
            container.innerHTML = '<div class="loading-state">No snippets available yet. Check back soon.</div>';
            return;
        }

        snippets = snippets.sort(() => Math.random() - 0.5);

        renderSnippets();
        showReel(0);

    } catch (error) {
        container.innerHTML = `<div class="loading-state">${escapeHTML(error.message)}</div>`;
    }
}

function renderSnippets() {
    container.innerHTML = snippets.map((snippet, index) => `
        <article class="reel" data-index="${index}">
            <div class="reel-art" data-theme="${getTheme(snippet.category)}">
                <div class="art-top">
                    <span>TOKENTRAIL / SNIPPETS</span>
                    <span>${pad(index + 1)}</span>
                </div>
                <div class="art-symbol" aria-hidden="true">${escapeHTML(getSymbol(snippet.category))}</div>
                <div class="art-bottom">
                    <strong>IDEAS<br>IN MOTION.</strong>
                    <span>AI / KNOWLEDGE</span>
                </div>
            </div>

            <div class="reel-content">
                <span class="reel-category">${escapeHTML(snippet.category)}</span>
                <h2>${escapeHTML(snippet.title)}</h2>
                <p class="reel-intro">${escapeHTML(getPreview(snippet.content))}</p>

                <div class="reel-tags">
                    <span>${escapeHTML(snippet.difficulty || "AI Knowledge")}</span>
                </div>

                <button type="button" class="reel-more" data-index="${index}">Know more →</button>
            </div>

            <span class="reel-number">${pad(index + 1)} / ${pad(snippets.length)}</span>
        </article>
    `).join("");

    if (totalCount) totalCount.textContent = pad(snippets.length);
}

function showReel(index) {
    if (!snippets.length) return;

    activeIndex = Math.max(0, Math.min(index, snippets.length - 1));
    const filled = ((activeIndex + 1) / snippets.length) * 100;

    if (currentCount) currentCount.textContent = pad(activeIndex + 1);
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

    if (container.scrollHeight > container.clientHeight + 1) {
        container.scrollTo({
            top: target.offsetTop - reels[0].offsetTop,
            behavior
        });
    } else {
        target.scrollIntoView({ behavior, block: "start" });
    }
}

function openSnippet(index) {
    const snippet = snippets[index];
    if (!snippet) return;

    document.getElementById("dialog-meta").textContent =
        `SNIPPET ${pad(index + 1)} / ${pad(snippets.length)} · ${snippet.category}`;

    document.getElementById("dialog-title").textContent = snippet.title;
    document.getElementById("dialog-lead").textContent = snippet.content;
    document.getElementById("dialog-takeaway").textContent =
        snippet.takeaway || "Keep exploring to build your AI knowledge.";

    document.getElementById("dialog-detail").innerHTML = "";
    document.getElementById("dialog-related").innerHTML = "";

    dialog.showModal();
}

function syncActiveReel() {
    const reels = container.querySelectorAll(".reel");
    if (!reels.length) return;

    const stacked = container.scrollHeight <= container.clientHeight + 1;
    const reference = stacked
        ? window.innerHeight * 0.35
        : container.getBoundingClientRect().top + 8;

    let current = 0;

    reels.forEach((reel, index) => {
        if (reel.getBoundingClientRect().top <= reference + 4) {
            current = index;
        }
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

loadSnippets();
