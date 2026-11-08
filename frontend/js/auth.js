const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");
const formTitle = document.querySelector("#form-title");
const formDescription = document.querySelector("#form-description");
const switchText = document.querySelector("#switch-text");
const switchButton = document.querySelector("#switch-auth");
const formMessage = document.querySelector("#form-message");

const previewMessage = "Accounts aren't connected in this preview. <a href=\"dashboard.html\">Continue to the dashboard →</a>";

let isLogin = true;

switchButton.addEventListener("click", () => {
    isLogin = !isLogin;
    formMessage.textContent = "";

    loginForm.hidden = !isLogin;
    signupForm.hidden = isLogin;

    formTitle.textContent = isLogin ? "Welcome back." : "Join TokenTrail.";
    formDescription.textContent = isLogin
        ? "Sign in to continue exploring TokenTrail."
        : "Create an account and start exploring AI.";
    switchText.textContent = isLogin ? "New to TokenTrail?" : "Already have an account?";
    switchButton.textContent = isLogin ? "Create an account" : "Sign in";
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

[loginForm, signupForm].forEach(form => {
    form.addEventListener("submit", event => {
        event.preventDefault();
        formMessage.innerHTML = previewMessage;
    });
});
