const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const loginEmail = document.getElementById("loginEmail").value.trim();
    const loginPassword = document.getElementById("loginPassword").value.trim();

    loginMessage.style.color = "red";
    loginMessage.textContent = "";

    if (!loginEmail || !loginPassword) {
        loginMessage.textContent = "Please fill in all fields.";
        return;
    }

    // Get registered users
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    if (registeredUsers.length === 0) {
        loginMessage.textContent = "No registered users found. Please register first.";
        return;
    }

    // Find matching user
    const validUser = registeredUsers.find(
        user =>
            user.emailAddress === loginEmail &&
            user.password === loginPassword
    );

    if (validUser) {
        localStorage.setItem("activeUser", loginEmail);

        loginMessage.style.color = "green";
        loginMessage.textContent = "Login successful! Redirecting...";

        loginForm.reset();

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1500);

    } else {
        loginMessage.textContent = "Invalid email or password.";
    }
});