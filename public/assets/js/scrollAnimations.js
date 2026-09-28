// ===== Scroll Animation Observer =====
document.addEventListener("DOMContentLoaded", () => {
    // The observer is reusable rather than a one-shot scan. Most pages are
    // fully written before this file runs, but the challenge grid and the
    // leaderboard are rendered from data, so that markup only exists after
    // this handler has already finished. Those pages call
    // window.revealOnScroll() once they have injected it.
    const observed = new WeakSet();
    let observer = null;

    if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(
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
    }

    // Reveals everything still hidden inside `root`, defaulting to the whole
    // document. Safe to call more than once: elements that are already
    // revealed, or already being watched, are skipped — so a list that
    // re-renders does not re-animate every card on each keystroke.
    function revealOnScroll(root) {
        const scope = root || document;
        const pending = [];

        scope.querySelectorAll(".animate-on-scroll:not(.visible)").forEach((el) => {
            if (!observed.has(el)) {
                observed.add(el);
                pending.push(el);
            }
        });

        if (pending.length === 0) return;

        // Browser doesn't support IntersectionObserver — show everything now.
        if (!observer) {
            pending.forEach((el) => el.classList.add("visible"));
            return;
        }

        pending.forEach((el) => observer.observe(el));

        // Safety net: if the observer never fires — the element is never
        // scrolled into view, or the page is too short to scroll at all —
        // the content must not be left sitting at opacity 0.
        setTimeout(() => {
            pending.forEach((el) => {
                if (!el.classList.contains("visible")) {
                    el.classList.add("visible");
                    observer.unobserve(el);
                }
            });
        }, 2500);
    }

    // Exposed for pages that render their own markup.
    window.revealOnScroll = revealOnScroll;

    revealOnScroll();

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
        paths: null,         // own page (/paths), not a section
        challenges: null,    // own page (/challenges), not a section
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

    // Standalone pages (e.g. /paths) have no in-page sections to spy on.
    // Without this guard the function would run, find nothing, and strip the
    // active state off whatever nav item the server already marked as current.
    if (sections.length > 0) {
        window.addEventListener("scroll", updateActiveByScroll, { passive: true });
    }
});
