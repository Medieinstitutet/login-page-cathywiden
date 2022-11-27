// Preset user/pass combos

let predefinedAccounts = [
    { username: "janne", password: "test" },
    { username: "cathy", password: "test" },
    { username: "defineinsane", password: "test" },
];

if (localStorage.getItem("accounts") === null) {
    localStorage.setItem(("accounts"), JSON.stringify(predefinedAccounts));
}

// defaultPage with user/pass input fields
let defaultPage = `<p>Please log in!</p>
<label for="username">Username</label>
<input type="text" id="inputUsername"><br><br>
<label for="password">Password</label>
<input type="text" id="inputPassword"><br><br>
<button id="loginBtn">Login</button> 
<button id="regBtn"> Register </button><br><br>
<p id="message"></p>`;

// conflictPage: when the user attempts to register already existing username, an embedded login window opens -- "if you are ${newUser.value}, log in here"
let conflictPage = `<br><br>
<label for="password">Password</label>
<input type="text" id="inputPassword">
<p><button id="conflictBtn">Login</button></p>
<p id="message"></p>`;

// regPage
let regPage = `<label for="username">Register username</label>
<input type="text" id="newUser"> <br><br>
<label for="password">Enter password</label>
<input type="text" id="newPassword"> <br><br>
<label for="password">Confirm password</label>
<input type="text" id="newPasswordConfirm"> <br><br>
<button id="confirmBtn">Confirm</button> <br>
<p id="regMessage"></p>`

// loggedInPage: Welcome [user] + logout button
let loggedInPage = `<p id>Welcome ${localStorage.getItem("loggedInUser")}! You have logged in.</p>
<p id="loggedInMessage"></p>
<button id=logoutBtn>Log out</button>`;

// Check if there’s anyone logged in. If so, redirect to loggedInPage. Else, show defaultPage
if (localStorage.loggedInUser) {

    content.innerHTML = loggedInPage;

    let logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        content.innerHTML = defaultPage;
        location.reload();
    })
}

else {
    logIn(defaultPage);
    loggedInPage = "";
};

// Register new user
let regBtn = document.getElementById("regBtn");

regBtn.addEventListener("click", () => {

    content.innerHTML = regPage;
    document.getElementById("headertext").innerHTML = "Register here";

    // Confirm registration
    let confirmBtn = document.getElementById("confirmBtn");
    let newUser = document.getElementById("newUser");
    let newPassword = document.getElementById("newPassword");
    let newPasswordConfirm = document.getElementById("newPasswordConfirm");
    let regMessage = document.getElementById("regMessage");

    newUser.addEventListener("input", () => {
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        for (data in accounts) {
            console.log(newUser.value);

            // Block registration with existing credentials
            if (newUser.value === accounts[data].username) {
                regMessage.innerHTML = `This username already exists. Pick another.
                <br><p> If you <strong>are</strong> "${newUser.value}", you can log in here:
                <br><innerHTML = "${conflictPage}</a>`;
                newUser.style.backgroundColor = "yellow";
                

                let confirmBtn = document.querySelector("confirmBtn");
                confirmBtn.remove();

                let conflictBtn = document.getElementById("conflictBtn");
                conflictBtn.addEventListener("click", () => {
                    let inputUsername = document.getElementById("newUser");
                    let inputPassword = document.getElementById("inputPassword");
                    let accounts = JSON.parse(localStorage.getItem("accounts"));

                    for (data in accounts) {
                        if (inputUsername.value === accounts[data].username && inputPassword.value === accounts[data].password) {
                            localStorage.setItem("loggedInUser", inputUsername.value);
                            content.innerHTML = loggedInPage;
                            location.reload();
                            break;
                        }

                        else {
                            let message = document.getElementById("message");
                            message.innerHTML = "Wrong credentials. Try again?";
                        }
                    }
                });
            }

            else {
                newUser.style.backgroundColor = "white";
                regMessage.innerHTML = "";
            }
        }
    });

    confirmBtn.addEventListener("click", () => {
        let accounts = JSON.parse(localStorage.getItem("accounts"));

        // new username correctly given, and passwords match
        if (newUser.value && (newUser.value !== accounts[data].username) && newPassword.value && (newPassword.value === newPasswordConfirm.value)) {

            content.innerHTML = loggedInPage;

            accounts.push({ username: newUser.value, password: newPassword.value });
            localStorage.setItem("loggedInUser", newUser.value);
            localStorage.setItem(("accounts"), JSON.stringify(accounts));
            location.reload();

            let logoutBtn = document.getElementById("logoutBtn");
            logoutBtn.addEventListener("click", function () {
                localStorage.removeItem("loggedInUser");
                content.innerHTML = defaultPage;
                location.reload();
            });
        }

        // passwords don't match
        else if (newUser.value && newPassword.value && newPasswordConfirm.value && (newPassword.value !== newPasswordConfirm.value)) {
            regMessage.innerHTML = "Your passwords do not match. Please try again.";
            newPasswordConfirm.style.backgroundColor = "yellow";
        }

        // user didn't fill in some field(s)
        else {
            console.log("Please fill in username and password.");
            regMessage.innerHTML = "Please specify both a valid username and a password.";
            newPasswordConfirm.style.backgroundColor = "white";
        }
    });
});


function logIn(defaultPage) {

    content.innerHTML = defaultPage;

    let loginBtn = document.getElementById("loginBtn");

    loginBtn.addEventListener("click", () => {
        let inputUsername = document.getElementById("inputUsername");
        let inputPassword = document.getElementById("inputPassword");
        let accounts = JSON.parse(localStorage.getItem("accounts"));

        // Check if user with such credentials exists
        for (data in accounts) {  //rewrite? 

            if (inputUsername.value === accounts[data].username && inputPassword.value === accounts[data].password) {

                localStorage.setItem("loggedInUser", inputUsername.value);
                content.innerHTML = loggedInPage;
                console.log("Logged in");
                console.log(localStorage.getItem("loggedInUser"));
                location.reload();
                break;
            }

            else {
                let message = document.getElementById("message");
                message.innerHTML = "Wrong credentials. Try again?";
            }
        }

    });
}