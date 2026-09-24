document.addEventListener("DOMContentLoaded", () => {
  const nameDisplay = document.querySelector("#username-display");
  const logInButton = document.querySelector("#login-button");
  const profile = document.querySelector("#profile-container");
  const logoutBtn = document.getElementById("logout");

  if (logInButton) logInButton.classList.add("show");
  // Nav CTA buttons are controlled by CSS (hidden on mobile/tablet, shown at 900px+)
  if (profile) profile.classList.remove("show");

  function popUp() {
    const popUp = document.getElementById("cookie-consent");
    const popUpButton = document.getElementById("pop-up-button");

    popUp.style.display = "flex";

    popUpButton.addEventListener("click", async () => {
      try {
        const res = await fetch('https://reycademy.onrender.com/accept-terms', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include'
        });
        const result = await res.json();
        if (result.success) {
          popUp.style.display = "none";
        } 
      } catch (err) {
        console.log("Fetch error:", err);
      }
    });
  }

  async function UpdateUI() {
    try {
      const res = await fetch("https://reycademy.onrender.com/session", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include"
      });

      const result = await res.json();

      if (result.loggedIn) {
        const initial = (result.username.charAt(0) || "R").toUpperCase();
        nameDisplay.textContent = result.username;
        // Sidebar avatar fallback (uses the profile image if present, else the
        // gradient badge with the username initial)
        const sidebarAvatar = document.querySelector("#sidebar-avatar");
        if (sidebarAvatar) {
          sidebarAvatar.textContent = initial;
        }
        const sidebarSmall = document.querySelector("#sidebar-username small");
        if (sidebarSmall) {
          sidebarSmall.textContent = "@" + result.username;
        }
        logInButton.classList.remove("show");
        // Nav CTA buttons hidden when logged in (CSS controls mobile/tablet visibility)
        profile.classList.add("show");

        if (!result.termsAccepted) {
          popUp()
        };
      } else {
        // Not logged in — CSS controls nav CTA visibility (mobile/tablet hidden, desktop shown)
        if (logInButton) logInButton.classList.add("show");
        if (profile) profile.classList.remove("show");
      }
    } catch (err) {
      console.log("Something went wrong :(", err);
    }
  }

  async function logOut() {
    try {
      const res = await fetch("https://reycademy.onrender.com/logout", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include"
      });
      const result = await res.json();
      console.log(result.message);
      UpdateUI();
    } catch (err) {
      console.log("Something went wrong :(", err);
    }
  }

  if (logoutBtn) logoutBtn.addEventListener("click", logOut);
  UpdateUI();
});
