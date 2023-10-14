elements = document.querySelectorAll(".wrapper a")
elements.forEach(element => {
    element.addEventListener("mousemove", (e) => {
        element.style.setProperty("--x", `${e.offsetX}px`)
        element.style.setProperty("--y", `${e.offsetY}px`)
    })
});