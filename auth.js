document.getElementById("registerLink").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("registrationContainer").style.display = "block";
});

document.getElementById("loginLink").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("registrationContainer").style.display = "none";
    document.getElementById("loginContainer").style.display = "block";
});

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (localStorage.getItem(username)) {
        alert("Username already exists. Please choose a different one.");
        return;
    }

    // Hash and salt the password
    const hashedPassword = hashPassword(password);
    localStorage.setItem(username, hashedPassword);
    alert("Registration successful!");
    document.getElementById("registrationContainer").style.display = "none";
    document.getElementById("loginContainer").style.display = "block";
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const loginUsername = document.getElementById("loginUsername").value;
    const loginPassword = document.getElementById("loginPassword").value;

    const hashedPassword = localStorage.getItem(loginUsername);
    if (hashedPassword && verifyPassword(loginPassword, hashedPassword)) {
        alert("Login successful!");
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("securedPage").style.display = "block";
        document.getElementById("welcomeMessage").innerText = "Welcome, " + loginUsername + "!";
    } else {
        alert("Invalid username or password.");
    }
});

function hashPassword(password) {
    // Use proper hashing algorithm
    const hashedPassword = CryptoJS.SHA256(password).toString();
    return hashedPassword;
}

function verifyPassword(password, hashedPassword) {
    // Compare the entered password with the stored hashed password
    const enteredHashedPassword = hashPassword(password);
    return enteredHashedPassword === hashedPassword;
}


