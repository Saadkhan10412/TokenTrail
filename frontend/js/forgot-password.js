
const API_URL = "http://127.0.0.1:8000";

const form = document.querySelector("#forgot-password-form");
const emailInput = document.querySelector("#forgot-email");
const formMessage = document.querySelector("#form-message");

form.addEventListener("submit", async event => {
    event.preventDefault();

    const button = form.querySelector('[type="submit"]');

    button.disabled = true;
    button.style.opacity = "0.6";
    formMessage.style.color = "var(--muted)";
    formMessage.textContent = "Sending recovery link...";

    try {
        const response = await fetch(`${API_URL}/auth/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailInput.value.trim()
            })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.detail || "Unable to send recovery email. Please try again."
            );
        }

        formMessage.textContent = result.message;
        formMessage.style.color = "var(--ink)";
        form.reset();

    } catch (error) {
        formMessage.textContent = error.message;
        formMessage.style.color = "var(--red)";
    } finally {
        button.disabled = false;
        button.style.opacity = "1";
    }
});
