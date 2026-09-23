// ===== Footer Year (auto-update) =====
document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("footer-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

// ===== FAQ Accordion =====
document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const btn = item.querySelector(".faq-question");

        btn.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");

            // Close all other items
            faqItems.forEach((other) => other.classList.remove("open"));

            // Toggle current item (only open if it wasn't already open)
            if (!isOpen) {
                item.classList.add("open");
            }
        });
    });
});