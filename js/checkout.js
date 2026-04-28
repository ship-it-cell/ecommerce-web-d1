// Protect page
if (!localStorage.getItem("activeUser")) {
    window.location.href = "login.html";
}

// Return to dashboard
function returnToDashboard() {
    window.location.href = "dashboard.html";
}