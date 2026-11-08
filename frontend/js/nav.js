const header = document.querySelector(".app-header");
const menuButton = document.querySelector(".mobile-menu-button");

if (header && menuButton) {
    const setMenu = open => {
        header.classList.toggle("menu-open", open);
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        menuButton.textContent = open ? "×" : "☰";
    };

    menuButton.addEventListener("click", () => {
        setMenu(!header.classList.contains("menu-open"));
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && header.classList.contains("menu-open")) {
            setMenu(false);
            menuButton.focus();
        }
    });
}
