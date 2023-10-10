pointer = document.querySelector(".pointer")
document.addEventListener("mousemove", (e) => {
    pointer.style.setProperty("--x", `${e.pageX}px`)
    pointer.style.setProperty("--y", `${e.pageY}px`)
})