const models = [
    {name:"Llama 3.3 70B",provider:"Meta",access:"free",category:"Chat",quality:88,speed:65,context:"128K",description:"Open-weight language model for general chat, reasoning and instruction following.",tags:["Open weights","Chat","Reasoning"],tradeoff:"Free access depends on the hosting provider. Large model with higher hardware demands."},
    {name:"DeepSeek R1",provider:"DeepSeek",access:"free",category:"Reasoning",quality:91,speed:55,context:"64K",description:"Reasoning-focused model designed for complex problems and multi-step thinking.",tags:["Reasoning","Math","Open weights"],tradeoff:"Detailed reasoning can increase response time and token usage."},
    {name:"Qwen2.5 Coder 7B",provider:"Alibaba",access:"free",category:"Coding",quality:82,speed:88,context:"32K",description:"Code-focused model for programming assistance, debugging and code generation.",tags:["Coding","Open weights","7B"],tradeoff:"Smaller model; complex coding tasks may need a more capable model."},
    {name:"Gemma 3 4B",provider:"Google",access:"free",category:"Multimodal",quality:78,speed:91,context:"128K",description:"Compact model with text and image understanding capabilities.",tags:["Multimodal","Compact","Open weights"],tradeoff:"Smaller capacity than larger models, but easier to run locally."},
    {name:"Mistral Small",provider:"Mistral",access:"free",category:"Chat",quality:81,speed:84,context:"128K",description:"Efficient model for everyday assistant tasks and structured responses.",tags:["Chat","Efficiency","Open weights"],tradeoff:"Performance varies by task and serving provider."},
    {name:"Stable Diffusion 3.5",provider:"Stability AI",access:"free",category:"Image",quality:80,speed:68,context:"—",description:"Image generation model for creating visuals from text prompts.",tags:["Image","Generative AI","Open weights"],tradeoff:"Generation quality depends on settings, hardware and workflow."},
    {name:"GPT-4.1",provider:"OpenAI",access:"paid",category:"Chat",quality:95,speed:87,context:"1M",description:"General-purpose model for complex instructions, analysis and long-context tasks.",tags:["Chat","Long context","Reasoning"],tradeoff:"API usage is billed. Cost depends on input and output tokens."},
    {name:"Claude Sonnet 4",provider:"Anthropic",access:"paid",category:"Coding",quality:96,speed:83,context:"200K",description:"Capable model for coding, writing, analysis and complex workflows.",tags:["Coding","Analysis","Writing"],tradeoff:"Paid usage; availability and pricing depend on the selected plan."},
    {name:"Gemini 2.5 Pro",provider:"Google",access:"paid",category:"Reasoning",quality:96,speed:78,context:"1M",description:"Advanced reasoning and multimodal capabilities for demanding tasks.",tags:["Reasoning","Multimodal","Long context"],tradeoff:"Higher capability can come with higher cost and latency."},
    {name:"GPT-4.1 mini",provider:"OpenAI",access:"paid",category:"Chat",quality:87,speed:96,context:"1M",description:"A faster, smaller model for everyday tasks and high-volume applications.",tags:["Fast","Chat","Efficient"],tradeoff:"Less capable than larger models on some complex tasks."},
    {name:"Claude Opus 4",provider:"Anthropic",access:"paid",category:"Coding",quality:98,speed:68,context:"200K",description:"High-capability model for demanding coding and reasoning workflows.",tags:["Advanced reasoning","Coding","Analysis"],tradeoff:"Premium pricing and potentially higher response latency."},
    {name:"FLUX.1 Pro",provider:"Black Forest Labs",access:"paid",category:"Image",quality:94,speed:75,context:"—",description:"High-quality image generation model for detailed visual creation.",tags:["Image","Generation","Visuals"],tradeoff:"Paid generation; cost varies by provider and resolution."}
];

const localModels = [
    {name:"Llama 3.2 1B",size:2,ram:4,vram:2,description:"Very compact model for basic chat and simple text tasks.",tags:["1B","Chat"]},
    {name:"Qwen2.5 3B",size:3,ram:5,vram:3,description:"Small model for general assistance, summaries and simple coding.",tags:["3B","Chat","Coding"]},
    {name:"Gemma 3 4B",size:4,ram:7,vram:4,description:"Compact multimodal model for everyday local AI tasks.",tags:["4B","Multimodal"]},
    {name:"Llama 3.1 8B",size:5,ram:10,vram:6,description:"General-purpose model for chat, summarization and basic reasoning.",tags:["8B","Chat"]},
    {name:"Qwen2.5 Coder 7B",size:5,ram:10,vram:6,description:"Coding-focused model for code generation and debugging.",tags:["7B","Coding"]},
    {name:"DeepSeek R1 Distill 14B",size:9,ram:18,vram:12,description:"Distilled reasoning model for more involved problem-solving tasks.",tags:["14B","Reasoning"]},
    {name:"Qwen2.5 32B",size:19,ram:38,vram:24,description:"Larger model for more capable reasoning and instruction following.",tags:["32B","Reasoning"]}
];

const modeContent = {
    free: {
        eyebrow: "ZERO-COST ACCESS",
        title: "Free models.",
        description: "Explore capable models without a subscription."
    },
    paid: {
        eyebrow: "PREMIUM ACCESS",
        title: "Paid models.",
        description: "Compare premium models and their capability trade-offs."
    },
    local: {
        eyebrow: "RUN IT YOURSELF",
        title: "Local models.",
        description: "Estimate which models may fit your own hardware."
    }
};

const MAX_COMPARE = 3;

const modeButtons = document.querySelectorAll(".mode-button");
const modelGrid = document.getElementById("model-grid");
const modelSearch = document.getElementById("model-search");
const categoryFilter = document.getElementById("category-filter");
const sortModels = document.getElementById("sort-models");
const localConfig = document.getElementById("local-config");
const directory = document.getElementById("directory");
const emptyState = document.getElementById("empty-state");
const comparePanel = document.getElementById("compare-panel");
const compareButton = document.getElementById("compare-button");
const compareCount = document.getElementById("compare-count");
const compareStatus = document.getElementById("compare-status");
const modelCount = document.getElementById("model-count");
const hardwareForm = document.getElementById("hardware-form");
const hardwareResults = document.getElementById("hardware-results");
const hardwareSummary = document.getElementById("hardware-summary");
const localModelList = document.getElementById("local-model-list");

let currentMode = "free";
let selectedModels = [];

const pad = number => String(number).padStart(2, "0");

function setStatus(message) {
    compareStatus.textContent = message;
}

function updateCompare() {
    compareCount.textContent = selectedModels.length;
    compareButton.disabled = selectedModels.length < 2;
}

function setMode(mode) {
    currentMode = mode;
    selectedModels = [];
    updateCompare();
    setStatus("");
    comparePanel.hidden = true;

    modeButtons.forEach(button => {
        button.setAttribute("aria-pressed", String(button.dataset.mode === mode));
    });

    const content = modeContent[mode];
    document.getElementById("directory-eyebrow").textContent = content.eyebrow;
    document.getElementById("directory-title").textContent = content.title;
    document.getElementById("directory-description").textContent = content.description;

    localConfig.hidden = mode !== "local";
    directory.hidden = mode === "local";

    if (mode === "local") {
        modelCount.textContent = `${pad(localModels.length)} SAMPLE MODELS`;
        hardwareResults.hidden = true;
        hardwareForm.hidden = false;
        return;
    }

    renderModels();
}

function renderModels() {
    const query = modelSearch.value.toLowerCase().trim();
    const category = categoryFilter.value;

    const filtered = models.filter(model => {
        const matchesMode = model.access === currentMode;
        const matchesCategory = category === "all" || model.category === category;
        const matchesSearch = [
            model.name,
            model.provider,
            model.category,
            model.description,
            ...model.tags
        ].join(" ").toLowerCase().includes(query);

        return matchesMode && matchesCategory && matchesSearch;
    });

    if (sortModels.value === "quality") {
        filtered.sort((a, b) => b.quality - a.quality);
    }

    if (sortModels.value === "speed") {
        filtered.sort((a, b) => b.speed - a.speed);
    }

    modelCount.textContent = `${pad(filtered.length)} MODELS`;

    modelGrid.innerHTML = filtered.map(model => {
        const selected = selectedModels.includes(model.name);

        return `
            <article class="model-card">
                <div class="model-card-top">
                    <span class="model-provider">${model.provider}</span>
                    <span class="model-category">${model.category}</span>
                </div>
                <h3>${model.name}</h3>
                <p class="model-card-description">${model.description}</p>
                <div class="model-tags">
                    ${model.tags.map(tag => `<span>${tag}</span>`).join("")}
                </div>
                <dl class="model-metrics">
                    <div>
                        <dt>Quality*</dt>
                        <dd>${model.quality}/100</dd>
                    </div>
                    <div>
                        <dt>Speed*</dt>
                        <dd>${model.speed}/100</dd>
                    </div>
                    <div>
                        <dt>Context</dt>
                        <dd>${model.context}</dd>
                    </div>
                </dl>
                <p class="model-tradeoff"><strong>Trade-off:</strong> ${model.tradeoff}</p>
                <div class="model-card-actions">
                    <button type="button" class="compare-toggle" data-model="${model.name}" aria-pressed="${selected}">
                        ${selected ? "Selected ✓" : "Compare"}
                    </button>
                </div>
            </article>
        `;
    }).join("");

    emptyState.hidden = filtered.length !== 0;
}

function toggleCompare(name) {
    if (selectedModels.includes(name)) {
        selectedModels = selectedModels.filter(item => item !== name);
    } else if (selectedModels.length === MAX_COMPARE) {
        setStatus(`Compare holds up to ${MAX_COMPARE} models. Remove one to add another.`);
        return;
    } else {
        selectedModels.push(name);
    }

    setStatus("");
    updateCompare();
    renderModels();
}

function renderComparison() {
    if (selectedModels.length < 2) return;

    const selected = models.filter(model => selectedModels.includes(model.name));

    document.getElementById("comparison-content").innerHTML = `
        <table class="comparison-table">
            <caption class="visually-hidden">Comparison of selected models</caption>
            <thead>
                <tr>
                    <th scope="col">Specification</th>
                    ${selected.map(model => `<th scope="col">${model.name}</th>`).join("")}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Provider</th>
                    ${selected.map(model => `<td>${model.provider}</td>`).join("")}
                </tr>
                <tr>
                    <th scope="row">Access</th>
                    ${selected.map(model => `<td>${model.access}</td>`).join("")}
                </tr>
                <tr>
                    <th scope="row">Category</th>
                    ${selected.map(model => `<td>${model.category}</td>`).join("")}
                </tr>
                <tr>
                    <th scope="row">Quality*</th>
                    ${selected.map(model => `<td>${model.quality}/100</td>`).join("")}
                </tr>
                <tr>
                    <th scope="row">Speed*</th>
                    ${selected.map(model => `<td>${model.speed}/100</td>`).join("")}
                </tr>
                <tr>
                    <th scope="row">Context</th>
                    ${selected.map(model => `<td>${model.context}</td>`).join("")}
                </tr>
                <tr>
                    <th scope="row">Trade-off</th>
                    ${selected.map(model => `<td>${model.tradeoff}</td>`).join("")}
                </tr>
            </tbody>
        </table>
        <p class="comparison-note">*Illustrative scores from the sample catalogue, not verified benchmark results.</p>
    `;

    comparePanel.hidden = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    comparePanel.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

function findLocalModels(event) {
    event.preventDefault();

    const os = document.getElementById("os").value;
    const cpu = document.getElementById("cpu").value.trim();
    const ram = Number(document.getElementById("ram").value);
    const gpu = document.getElementById("gpu").value.trim();
    const vram = Number(document.getElementById("vram").value);
    const storage = Number(document.getElementById("storage").value);

    const results = localModels.map(model => {
        if (ram < model.ram || storage < model.size) return null;

        const limited = vram < model.vram;

        return {
            ...model,
            limited,
            status: limited ? "May run slowly" : "Estimated fit",
            reason: limited
                ? "Not enough GPU memory for the full model. Expect CPU offload and slower responses."
                : "Within the memory you entered. Quantisation and runtime settings still affect real performance."
        };
    }).filter(Boolean);

    localModelList.innerHTML = results.length
        ? results.map(model => `
            <article class="local-result">
                <span class="compatibility ${model.limited ? "limited" : ""}">${model.status}</span>
                <h3>${model.name}</h3>
                <p>${model.description}</p>
                <p class="local-reason">${model.reason}</p>
                <div class="model-tags">
                    ${model.tags.map(tag => `<span>${tag}</span>`).join("")}
                </div>
                <p class="model-requirements">EST. RAM ${model.ram} GB · EST. VRAM ${model.vram} GB · EST. STORAGE ${model.size} GB</p>
            </article>
        `).join("")
        : `<p class="empty-state">Nothing in this sample catalogue fits those values. Try more RAM or free storage.</p>`;

    const details = [
        os,
        cpu,
        gpu,
        `${ram} GB RAM`,
        vram ? `${vram} GB VRAM` : "no dedicated GPU",
        `${storage} GB free storage`
    ].filter(Boolean);

    hardwareSummary.textContent = `Based on ${details.join(" · ")}. Estimates only.`;

    hardwareForm.hidden = true;
    hardwareResults.hidden = false;
    modelCount.textContent = `${pad(results.length)} MATCHES`;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelector(".results-heading").scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "nearest"
    });
}

modeButtons.forEach(button => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
});

modelSearch.addEventListener("input", renderModels);
categoryFilter.addEventListener("change", renderModels);
sortModels.addEventListener("change", renderModels);

modelGrid.addEventListener("click", event => {
    const button = event.target.closest(".compare-toggle");
    if (button) toggleCompare(button.dataset.model);
});

compareButton.addEventListener("click", renderComparison);

document.getElementById("close-compare").addEventListener("click", () => {
    comparePanel.hidden = true;
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !comparePanel.hidden) {
        comparePanel.hidden = true;
    }
});

hardwareForm.addEventListener("submit", findLocalModels);

document.getElementById("edit-hardware").addEventListener("click", () => {
    hardwareResults.hidden = true;
    hardwareForm.hidden = false;
});

setMode("free");
