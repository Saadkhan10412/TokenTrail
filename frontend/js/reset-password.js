
const API_URL = "http://127.0.0.1:8000";

const form = document.querySelector("#reset-password-form");
const passwordInput = document.querySelector("#new-password");
const confirmInput = document.querySelector("#confirm-password");
const formMessage = document.querySelector("#form-message");

const params = new URLSearchParams(window.location.hash.substring(1));

const accessToken = params.get("access_token");
const recoveryType = params.get("type");
const recoveryError = params.get("error_description");

history.replaceState(null, "", window.location.pathname + window.location.search);

function showMessage(message, success = false) {
    formMessage.textContent = message;
    formMessage.style.color = success ? "var(--ink)" : "var(--red)";
}

if (recoveryError) {
    showMessage("This recovery link is invalid or has expired. Request a new one.");
    form.querySelector('[type="submit"]').disabled = true;
} else if (!accessToken || recoveryType !== "recovery") {
    showMessage("Invalid recovery link. Please request a new password reset email.");
    form.querySelector('[type="submit"]').disabled = true;
}

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

form.addEventListener("submit", async event => {
    event.preventDefault();

    if (!accessToken || recoveryType !== "recovery") {
        showMessage("Invalid or expired recovery link.");
        return;
    }

    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    if (password.length < 8) {
        showMessage("Password must contain at least 8 characters.");
        return;
    }

    if (password !== confirmPassword) {
        showMessage("Passwords do not match.");
        return;
    }

    const button = form.querySelector('[type="submit"]');

    button.disabled = true;
    button.style.opacity = "0.6";
    showMessage("Updating your password...", true);

    try {
        const response = await fetch(`${API_URL}/auth/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                access_token: accessToken,
                password
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.detail || "Unable to update password. Request a new recovery link."
            );
        }

        form.reset();
        showMessage("Password updated successfully. Redirecting to sign in...", true);

        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);

    } catch (error) {
        showMessage(error.message);
        button.disabled = false;
        button.style.opacity = "1";
    }
});
