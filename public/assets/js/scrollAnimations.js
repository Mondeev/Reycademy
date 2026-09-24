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

    // ===== Scroll spy: auto-switch active sidebar menu item =====
    // Maps data-route values to the section IDs they point to
    const routeToSection = {
        home: "hero",
        about: null,         // external page (about.html)
        why: "video-introduction",
        features: "why-features",
        videos: "videos",
        paths: null,         // placeholder, no section yet
        challenges: null,    // placeholder, no section yet
        faq: "faq",
    };

    const sidebarItems = document.querySelectorAll(".sidebar-nav .menu-item");
    const sections = Array.from(sidebarItems)
        .map((item) => {
            const route = item.getAttribute("data-route");
            const sectionId = routeToSection[route];
            return sectionId ? document.getElementById(sectionId) : null;
        })
        .filter(Boolean);

    function updateActiveByScroll() {
        const scrollY = window.scrollY + window.innerHeight / 3;
        let current = null;

        for (const section of sections) {
            if (section.offsetTop <= scrollY) {
                current = section;
            } else {
                break;
            }
        }

        if (current) {
            const targetId = current.id;
            const route = Object.keys(routeToSection).find(
                (key) => routeToSection[key] === targetId
            );
            if (route) {
                sidebarItems.forEach((item) => {
                    item.classList.toggle("active", item.getAttribute("data-route") === route);
                });
                // Mirror the active state onto the matching nav-link in the header bar
                const navLink = document.querySelector(
                    `.nav-link[data-route="${route}"]`
                );
                document.querySelectorAll(".nav-link").forEach((nl) => {
                    nl.classList.toggle("active", nl === navLink);
                });
            }
        } else {
            // Scrolled past all tracked sections — clear active state
            sidebarItems.forEach((item) => item.classList.remove("active"));
            document.querySelectorAll(".nav-link").forEach((nl) => nl.classList.remove("active"));
        }
    }

    window.addEventListener("scroll", updateActiveByScroll, { passive: true });
});