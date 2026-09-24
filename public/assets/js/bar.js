// ===== Side Bar Show | Hide (right-side full-height panel) =====
const hideSideBar = document.querySelector("#hide-sideBar");
const sideBar = document.querySelector("#sidebar");
const sidebarOverlay = document.querySelector("#sidebar-overlay");
const hamburgerBar = document.querySelector("#hamburger-icon");
const navBar = document.querySelector("#main-nav ul");
const profile = document.querySelector("#profile");

function openSidebar() {
    sideBar.classList.add("show");
    if (sidebarOverlay) sidebarOverlay.classList.add("show");
    // Close the header dropdown if it's open
    if (navBar) navBar.classList.remove("show");
    if (hamburgerBar) {
        hamburgerBar.classList.add("active");
        hamburgerBar.setAttribute("aria-expanded", "true");
    }
}

function closeSidebar() {
    sideBar.classList.remove("show");
    if (sidebarOverlay) sidebarOverlay.classList.remove("show");
    if (hamburgerBar) {
        hamburgerBar.classList.remove("active");
        hamburgerBar.setAttribute("aria-expanded", "false");
    }
}

// Profile avatar opens the right-side sidebar
if (profile) {
    profile.addEventListener("click", (e) => {
        e.preventDefault();
        openSidebar();
    });
}

// Hamburger also opens the right-side sidebar (mobile)
if (hamburgerBar) {
    hamburgerBar.addEventListener("click", (e) => {
        e.preventDefault();
        if (sideBar.classList.contains("show")) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
}

// Close button inside the sidebar
if (hideSideBar) {
    hideSideBar.addEventListener("click", closeSidebar);
}

// Clicking the backdrop closes the sidebar
if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
}

// Close sidebar on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sideBar.classList.contains("show")) {
        closeSidebar();
    }
});

// ===== Active menu item switching =====
// Clicking a menu item moves the `active` class to that item only
const sidebarMenuItems = document.querySelectorAll(".sidebar-nav .menu-item");
sidebarMenuItems.forEach((item) => {
    item.addEventListener("click", () => {
        sidebarMenuItems.forEach((mi) => mi.classList.remove("active"));
        item.classList.add("active");
        // Mirror the active state onto the matching nav-link in the header bar
        const route = item.getAttribute("data-route");
        if (route) {
            const navLink = document.querySelector(
                `.nav-link[data-route="${route}"]`
            );
            document.querySelectorAll(".nav-link").forEach((nl) => {
                nl.classList.toggle("active", nl === navLink);
            });
        }
        // Auto-close sidebar after clicking an internal hash link
        const href = item.getAttribute("href") || "";
        if (href.startsWith("#")) {
            closeSidebar();
        }
    });
});

// ===== Active nav-link switching (header bar) =====
// Clicking a nav-link moves the `active` class to that link only,
// and mirrors the state onto the matching sidebar menu-item
const navLinks = document.querySelectorAll(".nav-link[data-route]");
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.forEach((nl) => nl.classList.remove("active"));
        link.classList.add("active");
        // Mirror the active state onto the matching sidebar menu-item
        const route = link.getAttribute("data-route");
        if (route) {
            sidebarMenuItems.forEach((mi) => {
                mi.classList.toggle("active", mi.getAttribute("data-route") === route);
            });
        }
    });
});