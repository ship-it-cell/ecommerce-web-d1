const registerForm = document.getElementById("registerForm");
const formMessage = document.getElementById("formMessage");

registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const emailAddress = document.getElementById("emailAddress").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    formMessage.style.color = "red";
    formMessage.textContent = "";

    if (!fullName || !emailAddress || !password || !confirmPassword) {
        formMessage.textContent = "Please fill in all fields.";
        return;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailAddress.match(emailPattern)) {
        formMessage.textContent = "Please enter a valid email address.";
        return;
    }

    if (password.length < 6) {
        formMessage.textContent = "Password must be at least 6 characters.";
        return;
    }

    if (password !== confirmPassword) {
        formMessage.textContent = "Passwords do not match.";
        return;
    }

    // Get existing users
    let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Check duplicate email
    const existingUser = registeredUsers.find(
        user => user.emailAddress === emailAddress
    );

    if (existingUser) {
        formMessage.textContent = "Email already registered. Please login.";
        return;
    }

    // New user
    const customerProfile = {
        fullName,
        emailAddress,
        password
    };

    // Save new user
    registeredUsers.push(customerProfile);

    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    formMessage.style.color = "green";
    formMessage.textContent = "Registration successful!";
    registerForm.reset();

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
});