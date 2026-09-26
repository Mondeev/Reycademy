// Sign Up
const signup = document.querySelector("#signup");

if (signup) {
    signup.addEventListener("submit", async(e) => {
        e.preventDefault();

        const data = {
            firstName : signup.firstname.value,
            lastName : signup.lastname.value,
            username : signup.username.value,
            password : signup.password.value,
            confirmPassword : signup.confirmpassword.value
        }
        
        try {
            const result = await fetch("https://reycademy.onrender.com/register", {
                method : "POST",
                headers : {"Content-Type":"application/json"},
                body : JSON.stringify(data),
                credentials: "include"
            });
            
            const a = await result.json();

            if (a.registered) {
                window.location.href = "/login";
            } else {
                const err = document.querySelector("#error");
                const text = err.textContent = a.message;


                signup.password.value = "";
                signup.confirmpassword.value = "";
                err.innerHTML = "";
                err.append(text);
            };

        } catch (err) {
            console.log("Something went wrong");
            console.log(err);
        };
    });
}

// Login
const form = document.querySelector("#login-form");

if (form) {
    const authMessage = document.querySelector("#auth-message");
    const submitBtn = document.querySelector("#login-btn");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const usernameInput = form.username;
        const passwordInput = form.password;

        // Clear previous errors
        usernameInput.classList.remove("error");
        passwordInput.classList.remove("error");
        authMessage.classList.remove("show", "error", "success");
        authMessage.textContent = "";

        const data = {
            username: usernameInput.value,
            password: passwordInput.value
        };

        // Disable submit button during request
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i><span>Signing in...</span>';
        }

        try {
            const res = await fetch("https://reycademy.onrender.com/submit", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(data),
                credentials: "include"
            });

            const result = await res.json();
            console.log(result);

            if (result.success) {
                // Show success message briefly then redirect
                authMessage.textContent = result.message || "Welcome back!";
                authMessage.classList.add("show", "success");
                setTimeout(() => {
                    window.location.href = "/";
                }, 800);
            } else {
                // Show error message
                authMessage.textContent = result.message || "Invalid username or password";
                authMessage.classList.add("show", "error");

                // Add error styling to inputs
                usernameInput.classList.add("error");
                passwordInput.classList.add("error");

                // Clear password for security
                passwordInput.value = "";
            }
        } catch (err) {
            console.error(err);
            authMessage.textContent = "Something went wrong. Please try again.";
            authMessage.classList.add("show", "error");
        } finally {
            // Re-enable submit button
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-sign-in-alt" aria-hidden="true"></i><span>Sign In</span>';
            }
        }
    });
}

// Password toggle functionality
const passwordToggles = document.querySelectorAll(".password-toggle");
passwordToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
        const input = toggle.previousElementSibling;
        const icon = toggle.querySelector("i");
        const isPassword = input.type === "password";

        input.type = isPassword ? "text" : "password";
        icon.classList.toggle("fa-eye", !isPassword);
        icon.classList.toggle("fa-eye-slash", isPassword);
        toggle.setAttribute("aria-pressed", isPassword);
        toggle.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
    });
});