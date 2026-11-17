
const API_URL = "http://127.0.0.1:8000";

const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");
const formTitle = document.querySelector("#form-title");
const formDescription = document.querySelector("#form-description");
const switchText = document.querySelector("#switch-text");
const switchButton = document.querySelector("#switch-auth");
const formMessage = document.querySelector("#form-message");

const ACCESS_KEY = "tokentrail_access_token";
const REFRESH_KEY = "tokentrail_refresh_token";

let isLogin = true;

function showMessage(message, success = false) {
    formMessage.textContent = message;
    formMessage.style.color = success ? "green" : "red";
}

function setLoading(form, loading) {
    const button = form.querySelector('[type="submit"]');
    button.disabled = loading;
    button.style.opacity = loading ? "0.6" : "1";
}

function getUsername(name) {
    return name
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, "")
        .slice(0, 30);
}

async function apiRequest(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
        const detail = result.detail;
        const message = Array.isArray(detail)
            ? detail.map(error => error.msg).join(", ")
            : detail || "Something went wrong.";

        throw new Error(message);
    }

    return result;
}

function saveSession(data) {
    if (!data.access_token || !data.refresh_token) {
        throw new Error("Invalid authentication response.");
    }

    localStorage.setItem(ACCESS_KEY, data.access_token);
    localStorage.setItem(REFRESH_KEY, data.refresh_token);
}

function clearSession() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
}

async function refreshSession() {
    const refreshToken = localStorage.getItem(REFRESH_KEY);

    if (!refreshToken) {
        clearSession();
        return false;
    }

    try {
        const result = await apiRequest("/auth/refresh", {
            refresh_token: refreshToken
        });

        saveSession(result);
        return true;

    } catch (error) {
        if (
            error.message.includes("Invalid or expired refresh token") ||
            error.message.includes("refresh token")
        ) {
            clearSession();
            return false;
        }

        throw error;
    }
}

async function verifySession() {
    const token = localStorage.getItem(ACCESS_KEY);

    if (!token) return false;

    const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (response.ok) return true;

    if (response.status !== 401) {
        throw new Error("Unable to verify your session.");
    }

    return await refreshSession();
}

switchButton.addEventListener("click", () => {
    isLogin = !isLogin;

    formMessage.textContent = "";

    loginForm.hidden = !isLogin;
    signupForm.hidden = isLogin;

    formTitle.textContent = isLogin
        ? "Welcome back."
        : "Join TokenTrail.";

    formDescription.textContent = isLogin
        ? "Sign in to continue exploring TokenTrail."
        : "Create an account and start exploring AI.";

    switchText.textContent = isLogin
        ? "New to TokenTrail?"
        : "Already have an account?";

    switchButton.textContent = isLogin
        ? "Create an account"
        : "Sign in";
});

document.querySelectorAll(".password-toggle").forEach(button => {
    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.target);
        const reveal = input.type === "password";

        input.type = reveal ? "text" : "password";
        button.textContent = reveal ? "Hide" : "Show";
        button.setAttribute("aria-pressed", String(reveal));
    });
});

loginForm.addEventListener("submit", async event => {
    event.preventDefault();

    setLoading(loginForm, true);
    showMessage("Signing in...", true);

    try {
        const result = await apiRequest("/auth/login", {
            email: document.querySelector("#login-email").value.trim(),
            password: document.querySelector("#login-password").value
        });

        saveSession(result);

        showMessage("Login successful. Redirecting...", true);

        window.location.href = "dashboard.html";

    } catch (error) {
        showMessage(error.message);
    } finally {
        setLoading(loginForm, false);
    }
});

signupForm.addEventListener("submit", async event => {
    event.preventDefault();

    setLoading(signupForm, true);
    showMessage("Creating your account...", true);

    try {
        const name = document.querySelector("#signup-name").value.trim();
        const username = getUsername(name);

        if (username.length < 3) {
            throw new Error(
                "Your name must produce a username with at least 3 characters."
            );
        }

        const result = await apiRequest("/auth/register", {
            username,
            email: document.querySelector("#signup-email").value.trim(),
            password: document.querySelector("#signup-password").value
        });

        showMessage(
            result.message + " Please sign in to continue.",
            true
        );

        signupForm.reset();
        switchButton.click();

    } catch (error) {
        showMessage(error.message);
    } finally {
        setLoading(signupForm, false);
    }
});

(async function initializeAuth() {
    try {
        const authenticated = await verifySession();

        if (authenticated) {
            window.location.href = "dashboard.html";
        }
    } catch (error) {
        console.error("Session verification failed:", error);
    }
})();
