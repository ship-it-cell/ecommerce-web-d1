const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const loginEmail = document.getElementById("loginEmail").value.trim();
    const loginPassword = document.getElementById("loginPassword").value.trim();

    // Reset message
    loginMessage.style.color = "red";
    loginMessage.textContent = "";

    // Check empty fields
    if (!loginEmail || !loginPassword) {
        loginMessage.textContent = "Please fill in all fields.";
        return;
    }

    // Retrieve registered user
    const savedUser = JSON.parse(localStorage.getItem("customerProfile"));

    // Check if user exists
    if (!savedUser) {
        loginMessage.textContent = "No registered user found. Please register first.";
        return;
    }

    // Validate credentials
    if (
        loginEmail === savedUser.emailAddress &&
        loginPassword === savedUser.password
    ) {
        // Save active session
        localStorage.setItem("activeUser", loginEmail);

        loginMessage.style.color = "green";
        loginMessage.textContent = "Login successful! Redirecting...";

        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1500);

    } else {
        loginMessage.textContent = "Invalid email or password.";
    }
});