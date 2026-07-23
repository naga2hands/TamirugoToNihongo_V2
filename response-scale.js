window.addEventListener("load", () => {
    console.log("Window Width:", window.innerWidth);

    if (window.innerWidth <= 1920) {
        document.querySelector(".module-content").style.zoom = "67%";
        console.log("Applied 67% zoom");
    } else {
        document.querySelector(".module-content").style.zoom = "100%";
        console.log("Applied 100% zoom");
    }

    console.log("response-scale.js loaded");
});