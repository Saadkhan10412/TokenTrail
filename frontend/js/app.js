
/* =========================================
   TOKENTRAIL — DASHBOARD JAVASCRIPT
========================================= */


/* =========================================
   1. NEWS DATA
   Temporary frontend mock data
========================================= */

const feeds = {

    repos: {
        title: "Trending repositories.",
        description: "Open-source projects worth exploring.",
        label: "TOP REPOS",
        articles: [
            {
                category: "AI AGENTS",
                title: "Explore the next generation of AI agent frameworks",
                summary: "Discover open-source projects building autonomous agents, tool calling and multi-step workflows."
            },
            {
                category: "LLM DEVELOPMENT",
                title: "New projects making local LLM development easier",
                summary: "Explore tools for running, managing and experimenting with language models locally."
            },
            {
                category: "MACHINE LEARNING",
                title: "Open-source machine learning projects to watch",
                summary: "A look at developer projects covering training, evaluation and deployment."
            },
            {
                category: "GENERATIVE AI",
                title: "Creative AI repositories for image and video generation",
                summary: "Explore community-built tools for generative media and creative workflows."
            },
            {
                category: "RAG",
                title: "Repositories exploring retrieval-augmented generation",
                summary: "Discover implementations of document retrieval, indexing and context-enhanced generation."
            },
            {
                category: "DEVELOPER TOOLS",
                title: "Useful tools for building and testing AI applications",
                summary: "Explore libraries and utilities that simplify AI application development."
            },
            {
                category: "MODEL TRAINING",
                title: "Projects experimenting with efficient model fine-tuning",
                summary: "Discover approaches to adapting models with fewer resources and smaller datasets."
            },
            {
                category: "COMPUTER VISION",
                title: "Open-source computer vision projects worth exploring",
                summary: "Explore repositories working on image understanding, detection and visual intelligence."
            },
            {
                category: "DATA SCIENCE",
                title: "Tools that make machine learning workflows easier",
                summary: "Discover projects for data preparation, experimentation and model evaluation."
            },
            {
                category: "AI INFRASTRUCTURE",
                title: "Projects building the infrastructure behind modern AI",
                summary: "Explore tools for inference, orchestration, monitoring and model deployment."
            }
        ]
    },


    industry: {
        title: "AI industry watch.",
        description: "Companies, partnerships and developments.",
        label: "AI INDUSTRY",
        articles: [
            {
                category: "COMPANIES",
                title: "How AI companies are changing their product strategies",
                summary: "Explore the changing approaches companies are taking to bring AI products to users."
            },
            {
                category: "BUSINESS",
                title: "The growing role of AI across different industries",
                summary: "Discover how organisations are integrating artificial intelligence into their workflows."
            },
            {
                category: "STARTUPS",
                title: "The AI startup ecosystem continues to evolve",
                summary: "Explore emerging startup ideas, business models and areas of competition."
            },
            {
                category: "PARTNERSHIPS",
                title: "Why AI partnerships are becoming increasingly important",
                summary: "Understand how collaboration can shape AI infrastructure and product development."
            },
            {
                category: "OPEN SOURCE",
                title: "The changing relationship between open and closed AI models",
                summary: "Explore the different strategies shaping access to AI models and technologies."
            },
            {
                category: "AI POLICY",
                title: "What new AI regulations could mean for developers",
                summary: "Understand the role of governance, transparency and accountability in AI."
            },
            {
                category: "INVESTMENT",
                title: "Where investment in artificial intelligence is heading",
                summary: "Explore the areas attracting attention across the AI ecosystem."
            },
            {
                category: "PRODUCTS",
                title: "How AI-powered products are evolving",
                summary: "Discover new approaches to integrating intelligent features into everyday products."
            },
            {
                category: "WORKFORCE",
                title: "How AI is changing the way people work",
                summary: "Explore the opportunities and challenges of AI-assisted work."
            },
            {
                category: "ECOSYSTEM",
                title: "The major developments shaping the AI ecosystem",
                summary: "A broader look at the people, companies and technologies influencing AI."
            }
        ]
    },


    releases: {
        title: "Fresh off the frontier.",
        description: "New models, versions and AI releases.",
        label: "LATEST RELEASES",
        articles: [
            {
                category: "LANGUAGE MODELS",
                title: "A closer look at the latest language model releases",
                summary: "Explore new model capabilities, context windows and performance improvements."
            },
            {
                category: "MULTIMODAL AI",
                title: "New developments in models that understand multiple formats",
                summary: "Discover how AI models are working with text, images, audio and video."
            },
            {
                category: "IMAGE GENERATION",
                title: "The latest developments in generative image models",
                summary: "Explore new approaches to image generation, editing and visual control."
            },
            {
                category: "OPEN MODELS",
                title: "New open-weight models entering the AI ecosystem",
                summary: "Discover models that developers can download, experiment with and deploy."
            },
            {
                category: "SMALL LANGUAGE MODELS",
                title: "Why smaller AI models are attracting attention",
                summary: "Explore efficient models designed for local and resource-constrained environments."
            },
            {
                category: "AUDIO AI",
                title: "Developments in speech and audio generation models",
                summary: "Discover new capabilities in speech recognition, synthesis and audio understanding."
            },
            {
                category: "AI CODING",
                title: "New releases designed to assist software developers",
                summary: "Explore AI coding models and tools for software engineering."
            },
            {
                category: "MODEL BENCHMARKS",
                title: "Understanding how new AI models are evaluated",
                summary: "Explore the benchmarks and evaluation methods used to compare model capabilities."
            },
            {
                category: "INFERENCE",
                title: "New approaches to faster AI model inference",
                summary: "Discover techniques that aim to improve latency and computational efficiency."
            },
            {
                category: "MODEL UPDATES",
                title: "What changes when an AI model receives a new version?",
                summary: "Understand improvements, limitations and compatibility considerations in model updates."
            }
        ]
    },


    research: {
        title: "Ideas pushing AI forward.",
        description: "Research papers, experiments and breakthroughs.",
        label: "RESEARCH",
        articles: [
            {
                category: "RETRIEVAL",
                title: "New directions in retrieval-augmented generation",
                summary: "Explore research investigating how AI systems retrieve and use external knowledge."
            },
            {
                category: "MODEL TRAINING",
                title: "Research into making model training more efficient",
                summary: "Discover techniques designed to improve training efficiency and resource utilisation."
            },
            {
                category: "KNOWLEDGE DISTILLATION",
                title: "How smaller models can learn from larger models",
                summary: "Explore research on transferring capabilities from larger models to smaller ones."
            },
            {
                category: "REASONING",
                title: "Understanding new approaches to AI reasoning",
                summary: "Explore methods for improving multi-step reasoning and problem-solving."
            },
            {
                category: "COMPUTER VISION",
                title: "Research advancing visual understanding in AI",
                summary: "Discover developments in image recognition, representation and visual reasoning."
            },
            {
                category: "REINFORCEMENT LEARNING",
                title: "New research directions in reinforcement learning",
                summary: "Explore learning systems that improve through feedback and interaction."
            },
            {
                category: "EVALUATION",
                title: "How researchers measure the reliability of AI systems",
                summary: "Understand new evaluation approaches for accuracy, robustness and reliability."
            },
            {
                category: "AGENTIC AI",
                title: "Research exploring autonomous AI agents",
                summary: "Discover approaches to planning, memory, tool use and agent collaboration."
            },
            {
                category: "INTERPRETABILITY",
                title: "Understanding what happens inside neural networks",
                summary: "Explore research into interpreting model behaviour and internal representations."
            },
            {
                category: "DATA EFFICIENCY",
                title: "Learning more from smaller and better datasets",
                summary: "Discover research into data quality, selection and efficient model learning."
            }
        ]
    },


    developers: {
        title: "Inside the developer ecosystem.",
        description: "Frameworks, libraries, APIs and developer updates.",
        label: "DEVELOPER UPDATES",
        articles: [
            {
                category: "FRAMEWORKS",
                title: "What is changing across popular AI development frameworks?",
                summary: "Explore framework updates and their impact on application development."
            },
            {
                category: "APIS",
                title: "New possibilities in AI API integration",
                summary: "Discover API capabilities, integration patterns and developer features."
            },
            {
                category: "PYTHON",
                title: "Python tools making AI development more accessible",
                summary: "Explore libraries for experimentation, inference and application development."
            },
            {
                category: "VECTOR DATABASES",
                title: "Developments in vector search and database technology",
                summary: "Understand tools for storing, indexing and retrieving vector representations."
            },
            {
                category: "DEPLOYMENT",
                title: "New approaches to deploying AI applications",
                summary: "Explore deployment workflows, infrastructure and model serving."
            },
            {
                category: "AI AGENTS",
                title: "Developer tools for building AI-powered agents",
                summary: "Discover libraries for tool use, orchestration and agent workflows."
            },
            {
                category: "LOCAL AI",
                title: "Tools for running AI models on your own machine",
                summary: "Explore local inference, model management and hardware optimisation."
            },
            {
                category: "MONITORING",
                title: "Monitoring and evaluating AI application performance",
                summary: "Discover tools for tracing, testing and observing AI systems."
            },
            {
                category: "FRONTEND",
                title: "Building better interfaces for AI-powered applications",
                summary: "Explore developer tools for interactive AI experiences."
            },
            {
                category: "WORKFLOWS",
                title: "New ways to connect AI tools and automation workflows",
                summary: "Discover tools that connect models, APIs and external services."
            }
        ]
    }

};


/* =========================================
   2. SELECT HTML ELEMENTS
========================================= */

const headlineList = document.querySelector("#headline-list");

const feedHeading = document.querySelector("#feed-heading");
const feedDescription = document.querySelector("#feed-description");

const activeFeedLabel = document.querySelector("#active-feed-label");
const feedTotal = document.querySelector("#feed-total");

const feedButtons = document.querySelectorAll(".feed-option");


/* =========================================
   3. RENDER NEWS FEED
========================================= */

function renderFeed(feedName) {

    const selectedFeed = feeds[feedName];

    if (!selectedFeed) {
        return;
    }

    // Update heading
    feedHeading.textContent = selectedFeed.title;
    feedDescription.textContent = selectedFeed.description;

    // Update active feed label
    activeFeedLabel.textContent = selectedFeed.label;

    feedTotal.textContent =
        String(selectedFeed.articles.length).padStart(2, "0") +
        " DISCOVERIES";


    // Clear previous articles
    headlineList.innerHTML = "";


    // Generate new article cards
    selectedFeed.articles.forEach(function (article, index) {

        const articleCard = document.createElement("article");

        articleCard.className = "headline-card";

        articleCard.innerHTML = `
            <span class="headline-number">
                ${String(index + 1).padStart(2, "0")}
            </span>

            <div class="headline-content">

                <p class="headline-category">
                    ${article.category}
                </p>

                <h3>${article.title}</h3>

                <p class="headline-summary">
                    ${article.summary}
                </p>

                <a href="#" class="read-more">
                    Read more ↗
                </a>

            </div>
        `;

        headlineList.appendChild(articleCard);

    });

}


/* =========================================
   4. SWITCH BETWEEN NEWS CATEGORIES
========================================= */

feedButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedFeed = button.dataset.feed;

        // Update active button
        feedButtons.forEach(function (item) {

            item.classList.remove("active");
            item.setAttribute("aria-pressed", "false");

        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        // Render selected category
        renderFeed(selectedFeed);

    });

});


/* =========================================
   5. LOAD DEFAULT FEED
========================================= */

renderFeed("repos");


/* =========================================
   6. MOBILE NAVIGATION
========================================= */

const mobileMenuButton =
    document.querySelector("#mobile-menu-button");

const appHeader =
    document.querySelector("#app-header");

if (mobileMenuButton && appHeader) {

    mobileMenuButton.addEventListener("click", function () {

        const isOpen = appHeader.classList.toggle("menu-open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        mobileMenuButton.textContent = isOpen ? "×" : "☰";

    });

}


/* =========================================
   7. FEATURE CARD SCROLL ANIMATION
========================================= */

const featureCards =
    document.querySelectorAll(".discovery-card");

if ("IntersectionObserver" in window) {

    document.documentElement.classList.add("js-ready");

    const cardObserver = new IntersectionObserver(

        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.15
        }

    );

    featureCards.forEach(function (card) {

        cardObserver.observe(card);

    });

}
