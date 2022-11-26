// Preset user/pass combos

let accounts = [
    {
        username: "janne",
        password: "test"
    },
    {
        username: "cathy",
        password: "test"
    },
    {
        username: "defineinsane",
        password: "test"
    },
];


/*
   Set up the three different layouts with template literals:
   (1) defaultPage with user/pass input fields
   (2) conflictPage: when the user attempts to register already existing username, an embedded login window opens "if you are janne, log in here"
   (3) loggedInPage: Welcome [user] + logout button
   (4) regPage 
*/

let defaultPage = `<p>Please log in!</p>
<label for="username">username</label>
<input type="text" id="inputUsername"><br><br>
<label for="password">Password</label>
<input type="text" id="inputPassword"><br><br>
<button id="loginBtn">Login</button> 
<button id="regBtn"> Register </button><br><br>
<p id="message"></p>`;

let conflictPage = `<br><br><label for="username">username</label>
<input type="text" id="inputUsername"><br><br>
<label for="password">Password</label>
<input type="text" id="inputPassword">
<p><button id="loginBtn">Login</button></p>
<p id="message"></p>`;

let loggedInPage = `<P>Welcome ${localStorage.getItem('loggedInUser')}! You have logged in.</p>
<button id=logoutBtn>Log out</button>`;

let regPage = `<label for="username">Register username</label>
<input type="text" id="newUser"> <br><br>
<label for="password">Enter password</label>
<input type="text" id="newPassword"> <br><br>
<label for="password">Confirm password</label>
<input type="text" id="newPasswordConfirm"> <br><br>
<button id="confirmBtn">confirm</button> <br>
<p id="regMessage"></p>`

function logIn() {
    console.log("Logged in");
    
    let loginBtn = document.getElementById("loginBtn");

    loginBtn.addEventListener("click", function () {
        let inputUsername = document.getElementById("inputUsername");
        let inputPassword = document.getElementById("inputPassword");

        // Check if user exists
        for (data in accounts) {
            //console.log(accounts[data].username);

            if (inputUsername.value === accounts[data].username && inputPassword.value === accounts[data].password) {
                localStorage.loggedInUser = inputUsername.value;
                content.innerHTML = loggedInPage;
                location.reload();
            }

            else {
                let message = document.getElementById("message");
                message.innerHTML = "Wrong credentials. Try again?";

            }
        }
    });
}
// Check if there’s anyone logged in. If so, redirect to loggedInPage. Else, show defaultPage

if (localStorage.loggedInUser) {
    content.innerHTML = loggedInPage;

    let logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        content.innerHTML = defaultPage;
        location.reload();
    })
}

else {
    content.innerHTML = defaultPage;

    let loginBtn = document.getElementById("loginBtn");

    loginBtn.addEventListener("click", function () {
        let inputUsername = document.getElementById("inputUsername");
        let inputPassword = document.getElementById("inputPassword");

        // Check if user exists
        for (data in accounts) {
            //console.log(accounts[data].username);

            if (inputUsername.value === accounts[data].username && inputPassword.value === accounts[data].password) {
                localStorage.loggedInUser = inputUsername.value;
                content.innerHTML = loggedInPage;
                location.reload();
            }

            else {
                let message = document.getElementById("message");
                message.innerHTML = "Wrong credentials. Try again?";

            }
        }
    });

    // Register new user
    let regBtn = document.getElementById("regBtn");


    regBtn.addEventListener("click", function () {

        content.innerHTML = regPage;


        // Confirm registration

        let confirmBtn = document.getElementById("confirmBtn");
        let newUser = document.getElementById("newUser");
        let newPassword = document.getElementById("newPassword");
        let newPasswordConfirm = document.getElementById("newPasswordConfirm");
        let regMessage = document.getElementById("regMessage");

        newUser.addEventListener("input", () => {
            for (data in accounts) {
                console.log(newUser.value);

                // Disallow registration with existing
                if (newUser.value === accounts[data].username) {
                    regMessage.innerHTML = `This username already exists. Pick another. <br><p> If you <strong>are</strong> "${newUser.value}", log in here: <p><button id="loginBtn"><innerHTML = "${conflictPage}</a></button>`;

                    newUser.style.backgroundColor = "yellow";
                    let button = document.querySelector("confirmBtn");
                    button.setAttribute("disabled", true);

                    if (content.innerHTML = conflictPage) {
                        console.log("test");
                        // run login()
                        // Re-write login() so it can be run here also
                    }
                }
               else {
                    newUser.style.backgroundColor = "white";
                    regMessage.innerHTML = "";
                    //button.disabled = false;
                    //.push
                }
            }
        }
        )


        confirmBtn.addEventListener("click", () => {

            // new username correctly given, and passwords match
            if ((newUser.value !== accounts[data].username) && newPassword.value && (newPassword.value === newPasswordConfirm.value)) {

                accounts.push({ username: newUser.value, password: newPassword.value });

                //console.log(accounts[data]);
                //localStorage.clear();
                localStorage.loggedInUser = newUser.value;

                localStorage.setItem("loggedInUser", newUser.value);
                localStorage.setItem(("accounts"), JSON.stringify(accounts));

                //console.log(newUser.value);
                //console.log(accounts);

                content.innerHTML = loggedInPage;
                location.reload();


                let logoutBtn = document.getElementById("logoutBtn");
                logoutBtn.addEventListener("click", function () {
                    localStorage.removeItem("loggedInUser");
                    content.innerHTML = defaultPage;
                    //location.reload();
                })
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


        }



        )
    })
}