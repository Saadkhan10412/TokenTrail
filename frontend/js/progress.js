const activity = [
    { day: "MON", value: 45 },
    { day: "TUE", value: 75 },
    { day: "WED", value: 35 },
    { day: "THU", value: 90 },
    { day: "FRI", value: 55 },
    { day: "SAT", value: 100 },
    { day: "SUN", value: 65 }
];

const topics = [
    { name: "Machine Learning", progress: 78 },
    { name: "Generative AI", progress: 62 },
    { name: "Deep Learning", progress: 45 },
    { name: "Neural Networks", progress: 35 },
    { name: "Large Language Models", progress: 25 }
];

const recent = [
    { symbol: "RAG", title: "Vectorless RAG explained", category: "RETRIEVAL / RAG" },
    { symbol: "KD", title: "Knowledge distillation", category: "GENERATIVE AI" },
    { symbol: "ATTN", title: "Understanding attention", category: "NEURAL NETWORKS" },
    { symbol: "EMB", title: "How embeddings work", category: "AI ENGINEERING" }
];

const achievements = [
    { mark: "07", name: "On a roll", description: "Seven-day learning streak." },
    { mark: "25", name: "Curious mind", description: "Twenty-five snippets explored." },
    { mark: "05", name: "Knowledge seeker", description: "Five quizzes completed." },
    { mark: "10", name: "Explorer", description: "Ten AI topics discovered." }
];

document.getElementById("current-date").textContent =
    new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

document.getElementById("activity-chart").innerHTML = activity.map(day => `
    <div class="activity-day">
        <div class="activity-bar ${day.value >= 75 ? "active" : ""}"
             style="height:${day.value}%"
             aria-hidden="true"></div>
        <span>${day.day}</span>
    </div>
`).join("");

document.getElementById("topic-list").innerHTML = topics.map(topic => `
    <div class="topic-progress">
        <div class="topic-heading">
            <span>${topic.name}</span>
            <span>${topic.progress}%</span>
        </div>
        <div class="topic-track" aria-hidden="true">
            <div style="width:${topic.progress}%"></div>
        </div>
    </div>
`).join("");

document.getElementById("recent-list").innerHTML = recent.map(item => `
    <a href="snippets.html" class="recent-item">
        <span class="recent-symbol" aria-hidden="true">${item.symbol}</span>
        <span class="recent-copy">
            <span class="recent-title">${item.title}</span>
            <span class="recent-category">${item.category}</span>
        </span>
        <span class="recent-arrow" aria-hidden="true">↗</span>
    </a>
`).join("");

document.getElementById("achievement-grid").innerHTML = achievements.map(item => `
    <article class="achievement">
        <span class="achievement-mark" aria-hidden="true">${item.mark}</span>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
    </article>
`).join("");
