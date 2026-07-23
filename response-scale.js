window.addEventListener("load", () => {
    console.log("Window Width:", window.innerWidth);

    if (window.innerWidth <= 1920) {
        document.querySelector(".module-content").style.zoom = "67%";
        console.log("Applied 67% zoom1");
        document.querySelector(".sidebar").style.fontSize = "85%";
    } else {
        document.querySelector(".module-content").style.zoom = "100%";
        console.log("Applied 100% zoom1");
        document.querySelector(".sidebar").style.fontSize = "100%";    }

    console.log("response-scale.js loaded");
});