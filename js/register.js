const registerForm = document.getElementById("registerForm");
const formMessage = document.getElementById("formMessage");

registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const emailAddress = document.getElementById("emailAddress").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Reset message
    formMessage.style.color = "red";
    formMessage.textContent = "";

    // Validation checks
    if (!fullName || !emailAddress || !password || !confirmPassword) {
        formMessage.textContent = "Please fill in all fields.";
        return;
    }

    // Email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailAddress.match(emailPattern)) {
        formMessage.textContent = "Please enter a valid email address.";
        return;
    }

    // Password length
    if (password.length < 6) {
        formMessage.textContent = "Password must be at least 6 characters.";
        return;
    }

    // Password match
    if (password !== confirmPassword) {
        formMessage.textContent = "Passwords do not match.";
        return;
    }

    // User object
    const customerProfile = {
        fullName,
        emailAddress,
        password
    };

    // Save user data
    localStorage.setItem("customerProfile", JSON.stringify(customerProfile));
    //console.log(localStorage.getItem("customerProfile"));

    // Success message
    formMessage.style.color = "green";
    formMessage.textContent = "Registration successful!";
    registerForm.reset();

    // Redirect after short delay
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
});