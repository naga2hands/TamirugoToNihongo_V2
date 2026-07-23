window.addEventListener("load", () => {
    console.log("Window Width:", window.innerWidth);

    if (window.innerWidth <= 1920) {
        document.querySelector(".module-content").style.zoom = "67%";
        console.log("Applied 67% zoom1");
                    "--sidebar-min-width",
                    "140px"
    } else {
        document.querySelector(".module-content").style.zoom = "100%";
        console.log("Applied 100% zoom1");
                    "--sidebar-max-width",
                    "180px"
    }

    console.log("response-scale.js loaded");
});