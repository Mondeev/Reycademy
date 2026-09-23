// ===== Scroll Animation Observer =====
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    // Safety net: if IntersectionObserver is unavailable or fails to fire
    // within 2.5 seconds, force everything visible so content is never hidden.
    const safetyTimer = setTimeout(() => {
        animatedElements.forEach((el) => {
            el.classList.add("visible");
            el.style.opacity = "1";
            el.style.transform = "none";
        });
    }, 2500);

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        animatedElements.forEach((el) => observer.observe(el));
    } else {
        // Browser doesn't support IntersectionObserver — show everything immediately
        animatedElements.forEach((el) => el.classList.add("visible"));
    }

    // Clear the safety timer once an animation has fired for at least one element
    const firstVisible = () => {
        clearTimeout(safetyTimer);
        document.removeEventListener("animationstart", firstVisible);
    };
    document.addEventListener("animationstart", firstVisible);

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
});