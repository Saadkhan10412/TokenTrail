
const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");
const formTitle = document.querySelector("#form-title");
const formDescription = document.querySelector("#form-description");
const switchText = document.querySelector("#switch-text");
const switchButton = document.querySelector("#switch-auth");
const formMessage = document.querySelector("#form-message");
let isLogin = true;
loginForm.hidden = false;
signupForm.hidden = true;
switchButton.addEventListener("click", function () {
    isLogin = !isLogin;
    formMessage.textContent = "";
    if (isLogin) {
        loginForm.hidden = false;
        signupForm.hidden = true;
        formTitle.textContent = "Welcome back.";
        formDescription.textContent =
            "Sign in to continue exploring TokenTrail.";
        switchText.textContent = "New to TokenTrail?";
        switchButton.textContent = "Create an account";
    } else {
        loginForm.hidden = true;
        signupForm.hidden = false;
        formTitle.textContent = "Join TokenTrail.";
        formDescription.textContent =
            "Create an account and start exploring AI.";
        switchText.textContent = "Already have an account?";
        switchButton.textContent = "Sign in";
    }
});
const passwordButtons = document.querySelectorAll(".password-toggle");
passwordButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const inputId = button.dataset.target;
        const passwordInput = document.querySelector("#" + inputId);
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            button.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            button.textContent = "Show";
        }
    });
});
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value;
    if (!email || !password) {
        formMessage.textContent = "Please fill in all fields.";
        return;
    }
    formMessage.textContent = "Frontend validation passed! Backend authentication is not connected yet.";
    console.log("Login email:", email);
});
signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.querySelector("#signup-name").value.trim();
    const email = document.querySelector("#signup-email").value.trim();
    const password = document.querySelector("#signup-password").value;
    if (!name || !email || !password) {
        formMessage.textContent = "Please fill in all fields.";
        return;
    }
    if (password.length < 8) {
        formMessage.textContent = "Password must contain at least 8 characters.";
        return;
    }
    formMessage.textContent = "Frontend validation passed! Registration backend is not connected yet.";
    console.log("Signup name:", name);
    console.log("Signup email:", email);
});
