// ================================================================
// REYCADEMY — CHALLENGES
// Data, rendering, filtering, and the lab view foundation.
//
// Everything on this page is driven from the three plain objects
// below (DIFFICULTY / CATEGORIES / CHALLENGES). Adding a challenge,
// a category, or a difficulty level means adding one entry — no
// markup changes. The same split (static catalogue + separate
// per-user progress map) is what a real backend would replace
// later without touching the rendering code.
// ================================================================

// ---------- Difficulty: single source of truth for XP ----------
const DIFFICULTY = {
    beginner: {
        label: "Beginner",
        xp: 50,
        icon: "fa-seedling",
        order: 1
    },
    intermediate: {
        label: "Intermediate",
        xp: 100,
        icon: "fa-layer-group",
        order: 2
    },
    advanced: {
        label: "Advanced",
        xp: 200,
        icon: "fa-bolt",
        order: 3
    }
};

// ---------- Categories ----------
const CATEGORIES = {
    "it-support": { label: "IT Support", icon: "fa-headset" },
    networking: { label: "Networking", icon: "fa-network-wired" },
    "web-development": { label: "Web Development", icon: "fa-code" },
    cybersecurity: { label: "Cybersecurity", icon: "fa-shield-halved" },
    programming: { label: "Programming", icon: "fa-code-branch" }
};

// ---------- Progress states ----------
// Keyed separately from CHALLENGES on purpose: this is per-user
// data, so it is the only thing that would move to a database.
const STATUS = {
    "not-attempted": { label: "Not Attempted", icon: "fa-circle", cls: "none" },
    "in-progress": { label: "In Progress", icon: "fa-spinner", cls: "progress" },
    completed: { label: "Completed", icon: "fa-circle-check", cls: "done" }
};

// ---------- Challenge catalogue ----------
// Every scenario here is a learning exercise, not real-world
// attack guidance.
const CHALLENGES = [
    {
        slug: "pc-wont-boot",
        title: "PC Won't Boot",
        category: "it-support",
        difficulty: "beginner",
        time: "10 min",
        scenario:
            "A user's computer powers on — the fans spin and the lights come on — but Windows never finishes starting. The screen stays black, then flashes a recovery notice.",
        objectives: [
            "Identify which part of the boot process is failing",
            "Recognise the difference between a hardware and a software fault",
            "Choose the safest first action to take"
        ],
        tools: ["Event Viewer", "Safe Mode", "System Restore"],
        hint:
            "The fans spinning rules out a dead power supply. Start with the last thing that changed, not the most complex tool."
    },
    {
        slug: "find-the-network-issue",
        title: "Find the Network Issue",
        category: "networking",
        difficulty: "beginner",
        time: "15 min",
        scenario:
            "One workstation on an office network can reach the router by IP address but cannot open any website by name. Other devices on the same network work fine.",
        objectives: [
            "Separate a name-resolution fault from a connectivity fault",
            "Use ping to test each layer of the path",
            "Propose a fix and justify it"
        ],
        tools: ["ping", "ipconfig", "DNS settings"],
        hint:
            "Reaching the IP but not the name narrows this down a long way. What resolves names on a normal machine?"
    },
    {
        slug: "fix-the-broken-layout",
        title: "Fix the Broken Layout",
        category: "web-development",
        difficulty: "beginner",
        time: "20 min",
        scenario:
            "A webpage looks correct on a desktop monitor but breaks apart on a phone — content spills sideways and buttons overlap the text.",
        objectives: [
            "Find the element causing the horizontal overflow",
            "Explain why a fixed pixel width fails on small screens",
            "Apply a responsive fix"
        ],
        tools: ["DevTools device mode", "Viewport meta tag", "CSS media queries"],
        hint:
            "Look for a single element that is wider than the screen. The fix is usually one property, not a redesign."
    },
    {
        slug: "identify-the-suspicious-link",
        title: "Identify the Suspicious Link",
        category: "cybersecurity",
        difficulty: "beginner",
        time: "10 min",
        scenario:
            "Four URLs arrive in a message claiming to be a bank notification. Exactly one of them is fake. Study the addresses and decide which one gives itself away.",
        objectives: [
            "Read a URL and identify the real domain",
            "Spot the tactics fake links rely on",
            "Explain your reasoning in plain language"
        ],
        tools: ["URL structure", "Look-alike domains", "Hover preview"],
        hint:
            "Ignore the words in the link. Read only the actual domain, character by character."
    },
    {
        slug: "debug-the-script",
        title: "Debug the Script",
        category: "programming",
        difficulty: "beginner",
        time: "15 min",
        scenario:
            "A small script is meant to total the numbers in a list, but it prints the wrong result every time. Find the bug and make it output the correct sum.",
        objectives: [
            "Trace the loop by hand with a small input",
            "Locate the single faulty line",
            "Fix it without changing the intended behaviour"
        ],
        tools: ["Console output", "Hand trace", "Breakpoints"],
        hint:
            "Print the value inside the loop on each pass. The bug is visible immediately once you can see it."
    },
    {
        slug: "slow-boot-triage",
        title: "Slow Boot Triage",
        category: "it-support",
        difficulty: "intermediate",
        time: "20 min",
        scenario:
            "A machine that used to start in seconds now takes four minutes. Nothing is obviously wrong, and the user needs an answer today.",
        objectives: [
            "Work out what changed between the fast and slow states",
            "Rule out the usual suspects one at a time",
            "Deliver a fix and a prevention step"
        ],
        tools: ["Task Manager startup tab", "Disk health", "Update history"],
        hint:
            "Compare against what was running a month ago, not what is running now. Something new was added."
    },
    {
        slug: "subnetting-workshop",
        title: "Subnetting Workshop",
        category: "networking",
        difficulty: "intermediate",
        time: "30 min",
        scenario:
            "A small office needs to be split into two separate networks without replacing the existing router. Work out the addressing that makes it work.",
        objectives: [
            "Split an address range into two usable subnets",
            "Assign addresses that avoid conflicts",
            "Explain what traffic must cross between them"
        ],
        tools: ["Subnet mask", "Address table", "Router config"],
        hint:
            "Borrow the fewest bits that still give you two networks, then check how many hosts each side can hold."
    },
    {
        slug: "accessibility-audit",
        title: "Accessibility Audit",
        category: "web-development",
        difficulty: "intermediate",
        time: "25 min",
        scenario:
            "A page works fine with a mouse but is close to unusable with a keyboard or a screen reader. Find the problems that block people.",
        objectives: [
            "Identify controls that cannot be reached by keyboard",
            "Spot images and form fields missing their labels",
            "Prioritise the fixes by impact"
        ],
        tools: ["Tab order", "Semantic HTML", "Contrast check"],
        hint:
            "Unplug your mouse and try to complete the main task. Whatever you cannot do is a bug."
    },
    {
        slug: "log-triage",
        title: "Log Triage",
        category: "cybersecurity",
        difficulty: "intermediate",
        time: "30 min",
        scenario:
            "Given a week of authentication logs, decide which sign-in events deserve a closer look and which are ordinary background noise.",
        objectives: [
            "Separate routine events from suspicious ones",
            "Explain what makes an event worth investigating",
            "Summarise your findings for a non-technical reader"
        ],
        tools: ["Event log fields", "Failed login patterns", "Off-hours access"],
        hint:
            "Ordinary noise repeats on a schedule. Focus on the events that break the pattern."
    },
    {
        slug: "race-condition-hunt",
        title: "Race Condition Hunt",
        category: "programming",
        difficulty: "advanced",
        time: "35 min",
        scenario:
            "A program works perfectly when run once and fails intermittently when several run at the same time. Work out why.",
        objectives: [
            "Identify the shared state both runs depend on",
            "Explain why the failure is intermittent",
            "Propose a fix and its trade-off"
        ],
        tools: ["Thread dump", "Shared variables", "Timing"],
        hint:
            "Two runs can only disagree if they are both touching the same thing. Find that thing."
    },
    {
        slug: "intermittent-dropouts",
        title: "Intermittent Dropouts",
        category: "networking",
        difficulty: "advanced",
        time: "40 min",
        scenario:
            "A wireless network drops for a few seconds every hour, then recovers on its own. Cables and the router have already been ruled out.",
        objectives: [
            "Design a way to capture evidence during the dropout",
            "Distinguish an interference problem from a capacity one",
            "Recommend a change that reduces the impact"
        ],
        tools: ["Channel analysis", "Signal to noise ratio", "Client logs"],
        hint:
            "You cannot debug what you did not capture. Work out how to record the moment it happens."
    },
    {
        slug: "least-privilege-review",
        title: "Least Privilege Review",
        category: "cybersecurity",
        difficulty: "advanced",
        time: "30 min",
        scenario:
            "An account holds far more access than its job requires. Review the permissions and decide what should be removed — and what must stay.",
        objectives: [
            "Match each permission to a task that needs it",
            "Identify the permissions with no justification",
            "Write a short recommendation"
        ],
        tools: ["Permission list", "Role description", "Audit trail"],
        hint:
            "For every permission, ask which specific task requires it. No task, no permission."
    }
];

// ---------- Leaderboard (placeholder data, shaped for a real query) ----------
const LEADERBOARD = [
    { rank: 1, username: "marko_dev", xp: 4820, completed: 31 },
    { rank: 2, username: "jen_tech", xp: 4150, completed: 28 },
    { rank: 3, username: "rhea_codes", xp: 3760, completed: 25 },
    { rank: 4, username: "paolo_it", xp: 3120, completed: 22 },
    { rank: 5, username: "samuelnet", xp: 2840, completed: 19 },
    { rank: 6, username: "kat_dev", xp: 2310, completed: 17 },
    { rank: 7, username: "nico_sec", xp: 1940, completed: 14 },
    { rank: 8, username: "lea_prog", xp: 1520, completed: 11 }
];

// ---------- Per-user progress (placeholder for real session data) ----------
let userProgress = {
    "pc-wont-boot": "completed",
    "find-the-network-issue": "in-progress",
    "fix-the-broken-layout": "in-progress",
    "debug-the-script": "not-attempted",
    "identify-the-suspicious-link": "completed"
};

// ---------- Filter state ----------
// Search is just a third filter alongside category and difficulty,
// so it composes with them instead of sitting beside the system.
const filters = {
    query: "",
    category: "all",
    difficulty: "all",
    labSlug: null
};

// ================================================================
// Helpers
// ================================================================

// HTML-escapes a string. The entities are assembled from pieces so
// the source stays readable without tripping over literal "&" text.
const AMP = "&" + "amp;";
const LT = "&" + "lt;";
const GT = "&" + "gt;";
const QUOT = "&" + "quot;";

function esc(str) {
    return String(str)
        .replace(/&/g, AMP)
        .replace(/</g, LT)
        .replace(/>/g, GT)
        .replace(/"/g, QUOT);
}

function xpFor(challenge) {
    const d = DIFFICULTY[challenge.difficulty];
    return d ? d.xp : 0;
}

function statusOf(slug) {
    return STATUS[userProgress[slug] || "not-attempted"];
}

// Builds the lowercase haystack a challenge is searched against.
// Derived from the same data the card renders, so a new field
// only needs adding here.
//
// Objectives and tools are searched too, even though the card
// does not print them in full. Someone typing "subnet mask" or
// "tab order" is looking for the challenge that uses that thing,
// and matching on it is what they expect to happen — a field
// that silently ignores half the catalogue reads as broken.
function searchTextFor(challenge) {
    const cat = CATEGORIES[challenge.category];
    const diff = DIFFICULTY[challenge.difficulty];
    return [
        challenge.title,
        cat ? cat.label : challenge.category,
        diff ? diff.label : challenge.difficulty,
        challenge.scenario,
        (challenge.objectives || []).join(" "),
        (challenge.tools || []).join(" ")
    ]
        .join(" ")
        .toLowerCase();
}

// Keeps the in-field clear button in step with the field's value.
// It is hidden while the field is empty so it is never a dead
// control, and it is written from one place so that every path
// able to change the value — typing, Escape, the reset button —
// leaves it consistent without each one repeating the rule.
function syncSearchField() {
    const search = document.getElementById("challenge-search");
    const clearBtn = document.getElementById("search-clear");
    if (!search || !clearBtn) return;
    clearBtn.hidden = search.value === "";
}

function matchesQuery(challenge) {
    const q = filters.query.trim().toLowerCase();
    if (!q) return true;
    // Every word must appear somewhere, so extra words narrow
    // the results instead of being ignored.
    return q.split(/\s+/).every((word) => searchTextFor(challenge).includes(word));
}

function filteredChallenges() {
    return CHALLENGES.filter((c) => {
        const catOk = filters.category === "all" || c.category === filters.category;
        const diffOk =
            filters.difficulty === "all" || c.difficulty === filters.difficulty;
        return catOk && diffOk && matchesQuery(c);
    });
}

function findChallenge(slug) {
    return CHALLENGES.find((c) => c.slug === slug) || null;
}

// ================================================================
// Card rendering
// ================================================================

// Catalogue position, used as the card's reference number. This is
// the order the challenges are defined in, so it is stable and it is
// the same index the grid renders from.
function refFor(challenge) {
    const i = CHALLENGES.indexOf(challenge);
    return "RC-" + String(i + 1).padStart(2, "0");
}

// How many of the three tier ticks are filled. DIFFICULTY.order is
// already 1/2/3, so the meter cannot drift from the XP table.
function tierTicks(challenge) {
    const order = (DIFFICULTY[challenge.difficulty] || {}).order || 1;
    return [1, 2, 3].map((n) => `<i class="${n <= order ? "on" : ""}"></i>`).join("");
}

// The grid re-renders on every keystroke in the search box and on every
// filter chip. The reveal only runs on the first render: re-animating the
// cards each time would leave the whole grid flickering while the visitor
// is still typing. After that, cards are written without the class and
// simply appear.
let hasRenderedGrid = false;

function challengeCard(challenge, reveal) {
    const cat = CATEGORIES[challenge.category] || { label: challenge.category, icon: "fa-circle" };
    const diff = DIFFICULTY[challenge.difficulty] || { label: challenge.difficulty, icon: "fa-circle" };
    const st = statusOf(challenge.slug);

    // Reading order is deliberate: what it is, what the problem is,
    // how hard it is, what it costs, what you get, what to do. The
    // scenario is the reason to click, so it gets the loudest text
    // on the card and everything else steps back around it.
    return `
        <article class="challenge-card${reveal ? " animate-on-scroll" : ""}" data-slug="${esc(challenge.slug)}">
            <div class="challenge-card-top">
                <span class="challenge-ref" aria-hidden="true">${esc(refFor(challenge))}</span>
                <span class="challenge-cat">
                    <i class="fas ${esc(cat.icon)}" aria-hidden="true"></i> ${esc(cat.label)}
                </span>
            </div>

            <h3 class="challenge-title">${esc(challenge.title)}</h3>

            <p class="challenge-scenario">${esc(challenge.scenario)}</p>

            <div class="challenge-specs">
                <span class="challenge-tier tier-${esc(challenge.difficulty)}">
                    <span class="tier-meter" aria-hidden="true">${tierTicks(challenge)}</span>
                    ${esc(diff.label)}
                </span>
                <span class="challenge-effort">
                    <i class="fas fa-clock" aria-hidden="true"></i> ${esc(challenge.time)}
                </span>
                <span class="challenge-reward">
                    <i class="fas fa-bolt" aria-hidden="true"></i> ${xpFor(challenge)} XP
                </span>
            </div>

            <div class="challenge-card-foot">
                <span class="challenge-status status-${esc(st.cls)}">
                    <i class="fas ${esc(st.icon)}" aria-hidden="true"></i> ${esc(st.label)}
                </span>
                <button class="challenge-start" type="button" data-start="${esc(challenge.slug)}">
                    ${userProgress[challenge.slug] === "completed" ? "Review" : "Start Challenge"}
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
            </div>
        </article>`;
}

function renderGrid() {
    const grid = document.getElementById("challenge-grid");
    const count = document.getElementById("challenge-count");
    const empty = document.getElementById("challenge-empty");
    if (!grid) return;

    const list = filteredChallenges();
    const reveal = !hasRenderedGrid;
    hasRenderedGrid = true;

    grid.innerHTML = list.map((c) => challengeCard(c, reveal)).join("");

    if (count) {
        count.textContent =
            list.length === CHALLENGES.length
                ? `${CHALLENGES.length} challenges`
                : `${list.length} of ${CHALLENGES.length} challenges`;
    }

    if (empty) {
        empty.hidden = list.length > 0;
    }

    grid.hidden = list.length === 0;

    // These cards did not exist when scrollAnimations.js ran, so they
    // have to be handed to the observer explicitly.
    if (reveal && typeof window.revealOnScroll === "function") {
        window.revealOnScroll(grid);
    }
}

// ================================================================
// Filters
// ================================================================

function buildFilterGroup(containerId, key, entries) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = entries
        .map(
            ([value, label, icon]) => `
            <button class="filter-chip${filters[key] === value ? " active" : ""}"
                    type="button"
                    data-filter="${esc(key)}"
                    data-value="${esc(value)}"
                    aria-pressed="${filters[key] === value}">
                ${icon ? `<i class="fas ${esc(icon)}" aria-hidden="true"></i>` : ""}
                ${esc(label)}
            </button>`
        )
        .join("");
}

function buildFilters() {
    buildFilterGroup(
        "filter-categories",
        "category",
        [["all", "All", "fa-layer-group"]].concat(
            Object.keys(CATEGORIES).map((key) => [key, CATEGORIES[key].label, CATEGORIES[key].icon])
        )
    );

    buildFilterGroup(
        "filter-difficulties",
        "difficulty",
        [["all", "All", "fa-layer-group"]].concat(
            Object.keys(DIFFICULTY)
                .sort((a, b) => DIFFICULTY[a].order - DIFFICULTY[b].order)
                .map((key) => [key, DIFFICULTY[key].label, DIFFICULTY[key].icon])
        )
    );
}

function setFilter(key, value) {
    filters[key] = value;
    buildFilters();
    renderGrid();
}

function clearFilters() {
    filters.query = "";
    filters.category = "all";
    filters.difficulty = "all";

    const search = document.getElementById("challenge-search");
    if (search) search.value = "";
    syncSearchField();

    buildFilters();
    renderGrid();
}

// ================================================================
// Lab view (challenge detail foundation)
// ================================================================

function labMarkup(challenge) {
    const cat = CATEGORIES[challenge.category] || { label: challenge.category, icon: "fa-circle" };
    const diff = DIFFICULTY[challenge.difficulty] || { label: challenge.difficulty, icon: "fa-circle" };
    const st = statusOf(challenge.slug);

    return `
        <div class="lab-panel">
            <button class="lab-back" type="button" data-back>
                <i class="fas fa-arrow-left" aria-hidden="true"></i> Back to all challenges
            </button>

            <header class="lab-head">
                <!-- Same vocabulary as the card the visitor clicked, so
                     opening a challenge does not feel like a different
                     page: reference, category, then the spec row. -->
                <div class="challenge-card-top">
                    <span class="challenge-ref" aria-hidden="true">${esc(refFor(challenge))}</span>
                    <span class="challenge-cat">
                        <i class="fas ${esc(cat.icon)}" aria-hidden="true"></i> ${esc(cat.label)}
                    </span>
                </div>
                <h2 class="lab-title">${esc(challenge.title)}</h2>
                <div class="lab-rewards">
                    <span class="challenge-tier tier-${esc(challenge.difficulty)}">
                        <span class="tier-meter" aria-hidden="true">${tierTicks(challenge)}</span>
                        ${esc(diff.label)}
                    </span>
                    <span class="challenge-effort">
                        <i class="fas fa-clock" aria-hidden="true"></i> ${esc(challenge.time)}
                    </span>
                    <span class="challenge-reward">
                        <i class="fas fa-bolt" aria-hidden="true"></i> ${xpFor(challenge)} XP
                    </span>
                    <span class="challenge-status status-${esc(st.cls)}">
                        <i class="fas ${esc(st.icon)}" aria-hidden="true"></i> ${esc(st.label)}
                    </span>
                </div>
            </header>

            <div class="lab-body">
                <section class="lab-block">
                    <h3 class="lab-block-title"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> Scenario</h3>
                    <p class="lab-text">${esc(challenge.scenario)}</p>
                </section>

                <section class="lab-block">
                    <h3 class="lab-block-title"><i class="fas fa-list-check" aria-hidden="true"></i> Objectives</h3>
                    <ul class="lab-objectives">
                        ${challenge.objectives
                            .map(
                                (o) => `
                            <li><i class="fas fa-circle" aria-hidden="true"></i> ${esc(o)}</li>`
                            )
                            .join("")}
                    </ul>
                </section>

                <section class="lab-block">
                    <h3 class="lab-block-title"><i class="fas fa-toolbox" aria-hidden="true"></i> Available information</h3>
                    <div class="lab-tools">
                        ${challenge.tools
                            .map((t) => `<span class="lab-tool">${esc(t)}</span>`)
                            .join("")}
                    </div>
                </section>

                <section class="lab-block">
                    <h3 class="lab-block-title"><i class="fas fa-keyboard" aria-hidden="true"></i> Your answer</h3>
                    <label class="lab-label" for="lab-workspace">Explain your diagnosis and the steps you would take.</label>
                    <textarea id="lab-workspace" class="lab-workspace" rows="6"
                        placeholder="Write your reasoning here…"></textarea>
                    <div class="lab-actions">
                        <button class="btn primary lab-submit" type="button" data-submit>Submit Solution</button>
                        <p class="lab-feedback" data-feedback role="status" aria-live="polite"></p>
                    </div>
                </section>

                <section class="lab-block hint-block">
                    <h3 class="lab-block-title"><i class="fas fa-lightbulb" aria-hidden="true"></i> Need a nudge?</h3>
                    <button class="hint-toggle" type="button" data-hint aria-expanded="false" aria-controls="lab-hint">
                        <i class="fas fa-eye" aria-hidden="true"></i> Show one hint
                    </button>
                    <p class="hint-body" id="lab-hint" data-hint-body hidden>${esc(challenge.hint)}</p>
                </section>
            </div>
        </div>`;
}

function openLab(slug) {
    const challenge = findChallenge(slug);
    const view = document.getElementById("lab-view");
    const hub = document.getElementById("challenge-hub");
    const leaderboard = document.getElementById("leaderboard-section");
    if (!challenge || !view) return;

    filters.labSlug = slug;
    view.innerHTML = labMarkup(challenge);
    view.hidden = false;
    if (hub) hub.hidden = true;
    if (leaderboard) leaderboard.hidden = true;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function closeLab() {
    const view = document.getElementById("lab-view");
    const hub = document.getElementById("challenge-hub");
    const leaderboard = document.getElementById("leaderboard-section");

    filters.labSlug = null;
    if (view) {
        view.hidden = true;
        view.innerHTML = "";
    }
    if (hub) hub.hidden = false;
    if (leaderboard) leaderboard.hidden = false;
}

// ================================================================
// Leaderboard
// ================================================================

function renderLeaderboard() {
    const list = document.getElementById("leaderboard-list");
    if (!list) return;

    list.innerHTML = LEADERBOARD.map((row) => {
        const medal =
            row.rank === 1 ? "gold" : row.rank === 2 ? "silver" : row.rank === 3 ? "bronze" : "";
        // The avatar sits inside the user cell so every row is exactly
        // four children, matching the four-column grid at all sizes.
        return `
            <li class="lb-row${medal ? " lb-" + medal : ""} animate-on-scroll">
                <span class="lb-rank">${row.rank}</span>
                <span class="lb-user">
                    <span class="lb-avatar" aria-hidden="true">${esc(row.username.charAt(0).toUpperCase())}</span>
                    ${esc(row.username)}
                </span>
                <span class="lb-done"><i class="fas fa-circle-check" aria-hidden="true"></i> ${row.completed}</span>
                <span class="lb-xp">${row.xp.toLocaleString()} XP</span>
            </li>`;
    }).join("");

    // Rendered after scrollAnimations.js ran, so the observer needs to be
    // told about these rows too.
    if (typeof window.revealOnScroll === "function") {
        window.revealOnScroll(list);
    }
}

// ================================================================
// Events
// ================================================================

function bindEvents() {
    // One delegated listener covers filter chips, the clear button,
    // and every "Start Challenge" button — including ones rendered later.
    document.addEventListener("click", (e) => {
        const chip = e.target.closest("[data-filter]");
        if (chip) {
            setFilter(chip.dataset.filter, chip.dataset.value);
            return;
        }

        const clear = e.target.closest("[data-clear-filters]");
        if (clear) {
            clearFilters();
            return;
        }

        const start = e.target.closest("[data-start]");
        if (start) {
            openLab(start.dataset.start);
            return;
        }

        const back = e.target.closest("[data-back]");
        if (back) {
            closeLab();
            return;
        }

        const hint = e.target.closest("[data-hint]");
        if (hint) {
            const body = document.querySelector("[data-hint-body]");
            if (!body) return;
            const isOpen = !body.hidden;
            body.hidden = isOpen;
            hint.setAttribute("aria-expanded", String(!isOpen));
            hint.innerHTML = isOpen
                ? '<i class="fas fa-eye" aria-hidden="true"></i> Show one hint'
                : '<i class="fas fa-eye-slash" aria-hidden="true"></i> Hide hint';
            return;
        }

        const submit = e.target.closest("[data-submit]");
        if (submit) {
            const area = document.getElementById("lab-workspace");
            const feedback = document.querySelector("[data-feedback]");
            if (!feedback) return;

            if (!area || !area.value.trim()) {
                feedback.textContent = "Write your answer first, then submit.";
                feedback.className = "lab-feedback is-warning";
                return;
            }

            // Placeholder: the real check will come from the backend.
            feedback.textContent =
                "Answer saved. Marking and scoring aren't wired up yet — that's the next build.";
            feedback.className = "lab-feedback is-success";
        }
    });
}

// Bound separately from the click delegation: this is an "input"
// event, not a click, and the field lives outside the filter chips.
function bindSearch() {
    const search = document.getElementById("challenge-search");
    if (!search) return;

    const clearBtn = document.getElementById("search-clear");

    search.addEventListener("input", (e) => {
        filters.query = e.target.value;
        syncSearchField();
        renderGrid();
    });

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            search.value = "";
            filters.query = "";
            syncSearchField();
            renderGrid();
            // Focus is put back deliberately: clearing should
            // leave the visitor ready to type a better query
            // rather than dumped at the top of the page.
            search.focus();
        });
    }

    // Escape empties the field, and leaves it once there is
    // nothing left to clear, so it never appears to do nothing.
    search.addEventListener("keydown", (e) => {
        if (e.key !== "Escape") return;
        e.preventDefault();

        if (search.value) {
            search.value = "";
            filters.query = "";
            syncSearchField();
            renderGrid();
        } else {
            search.blur();
        }
    });

    // "/" reaches the field from anywhere on the page, the way it
    // works in most search-first interfaces. It stands down while
    // the visitor is already typing somewhere else, and while a
    // modifier is held, so browser and OS shortcuts keep working.
    document.addEventListener("keydown", (e) => {
        if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;

        const active = document.activeElement;
        const typing =
            active &&
            (active.tagName === "INPUT" ||
                active.tagName === "TEXTAREA" ||
                active.isContentEditable);
        if (typing) return;

        e.preventDefault();
        search.focus();
        // Selecting an existing query means typing over it
        // starts a new search instead of appending to it.
        search.select();
    });

    syncSearchField();
}

function openFromHash() {
    const match = window.location.hash.match(/lab=([\w-]+)/);
    if (!match) return;
    const challenge = findChallenge(match[1]);
    if (challenge) openLab(challenge.slug);
}

// ================================================================
// Init
// ================================================================

document.addEventListener("DOMContentLoaded", () => {
    buildFilters();
    renderGrid();
    renderLeaderboard();
    bindEvents();
    bindSearch();
    openFromHash();
});
