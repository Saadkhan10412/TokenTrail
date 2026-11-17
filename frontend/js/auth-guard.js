
(() => {
    const API_URL = "http://127.0.0.1:8000";
    const ACCESS_KEY = "tokentrail_access_token";
    const REFRESH_KEY = "tokentrail_refresh_token";

    function clearSession() {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem(REFRESH_KEY);
    }

    async function refreshSession() {
        const refreshToken = localStorage.getItem(REFRESH_KEY);

        if (!refreshToken) return false;

        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                refresh_token: refreshToken
            })
        });

        if (response.status === 401) {
            clearSession();
            return false;
        }

        if (!response.ok) {
            throw new Error("Unable to refresh your session.");
        }

        const result = await response.json();

        if (!result.access_token || !result.refresh_token) {
            throw new Error("Invalid authentication response.");
        }

        localStorage.setItem(ACCESS_KEY, result.access_token);
        localStorage.setItem(REFRESH_KEY, result.refresh_token);

        return true;
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

    async function initializePage() {
        try {
            const authenticated = await verifySession();

            if (!authenticated) {
                clearSession();
                window.location.replace("login.html");
                return;
            }

            document.body.style.visibility = "visible";

        } catch (error) {
            console.error("Authentication check failed:", error);

            document.body.style.visibility = "visible";

            document.body.innerHTML = `
                <main style="min-height:100vh;display:grid;place-content:center;text-align:center;padding:2rem;font-family:Arial,sans-serif">
                    <h2>Unable to verify your session</h2>
                    <p>Please check your connection and try again.</p>
                    <button onclick="location.reload()">Retry</button>
                    <a href="login.html" style="margin-top:1rem">Back to sign in</a>
                </main>
            `;
        }
    }

    document.addEventListener("click", event => {
        const logoutButton = event.target.closest("#logout-button");

        if (!logoutButton) return;

        event.preventDefault();
        clearSession();
        window.location.replace("login.html");
    }, true);

    initializePage();
})();
