!function () { const e = ["nexos20lv.github.io", "localhost", "127.0.0.1"]; if (!e.some((e => window.location.hostname.includes(e)))) throw new Error("Auth failed") }();

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader-hidden");
    loader.addEventListener("transitionend", () => {
        loader.remove();
        window.dispatchEvent(new Event("loaderFinished"));
    });
});