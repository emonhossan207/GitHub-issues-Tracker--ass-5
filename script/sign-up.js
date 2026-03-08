// Login button
const loginButton = document.getElementById("sign-in-button");

function loginSystem() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");

    if(username === "admin" && password === "admin123") {
        errorMsg.classList.add("hidden");
        // Set session to allow home page access
        sessionStorage.setItem("loggedIn", "true");
        window.location.href = "home.html";
    } else {
        errorMsg.classList.remove("hidden");
    }
}

loginButton.addEventListener("click", loginSystem);

// Enter key login
document.addEventListener("keydown", function(event){
    if(event.key === "Enter") loginSystem();
});