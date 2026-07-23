window.addEventListener("load", () => {
  const mc = document.querySelector(".module-content");
  const sb = document.querySelector(".sidebar");
  const w = window.innerWidth;
  const dpr = window.devicePixelRatio || 1;

  console.log("innerWidth:", w);
  console.log("devicePixelRatio:", dpr);
  console.log("screen.width:", window.screen.width);

  if (mc && sb) {
    if (w <= 1366 || dpr >= 1.25) {
      mc.style.zoom = "67%";
      sb.style.zoom = "80%";
      console.log("Applied laptop scale");
    } else {
      mc.style.zoom = "100%";
      sb.style.zoom = "90%";
      console.log("Applied normal scale1");
    }
  }
});