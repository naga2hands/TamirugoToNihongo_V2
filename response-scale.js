window.addEventListener("load", () => {
    console.log("Window Width:", window.innerWidth);

    if (window.innerWidth <= 1920) {
        document.querySelector(".module-content").style.zoom = "67%";
        document.querySelector(".sidebar").style.fontSize = "85%";
        console.log("Applied 67% zoom2");
    } else {
        document.querySelector(".module-content").style.zoom = "100%";
        document.querySelector(".sidebar").style.fontSize = "100%";    }
        console.log("Applied 100% zoom2");
    console.log("response-scale.js loaded");
});