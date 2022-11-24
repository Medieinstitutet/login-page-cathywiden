// Preset user/pass combos

let accounts = [
    {
username:"janne", 
password: "test"},
    {
username:"cathy", 
password: "test"},
    {	
username: "defineinsane", 
password: "test"},
];

/*
   Set up the three different layouts with template literals:
   (1) defaultPage with user/pass input fields
   (2) loggedInPage: Welcome [user] + logout button
   (3) regPage 
*/

let defaultPage = `<p>Please log in!</p>
<label for="username">username</label>
<input type="text" id="inputUsername"> <br><br>
<label for="password">Password</label>
<input type="text" id="inputPassword"> <br><br>
<button id="loginBtn">Login</button> 
<button id="regBtn"> Register </button> <br><br>
<p id="message"></p>`;

let loggedInPage = `<P>Welcome ${localStorage.getItem('usernameKey')}! You have logged in.</p>
<button id=logoutBtn>Log out</button>`;

let regPage = `<label for="username">Register username</label>
<input type="text" id="newUser"> <br><br>
<label for="password">Enter password</label>
<input type="text" id="newPassword"> <br><br>
<label for="password">Confirm password</label>
<input type="text" id="newPasswordConfirm"> <br><br>
<button id="confirmBtn">confirm</button> <br>
<p id="regMessage"></p>`


// Check if there’s anyone logged in. If so, redirect to loggedInPage. Else, show defaultPage

if (localStorage.usernameKey) {
    content.innerHTML = loggedInPage; 

    let logoutBtn = document.getElementById("logoutBtn");
        logoutBtn.addEventListener("click", function (){
        	localStorage.removeItem("usernameKey"); 
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

        for (data in accounts){ 

            if (inputUsername.value === accounts[data].username && inputPassword.value === accounts[data].password) {
                localStorage.usernameKey = inputUsername.value;
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
        confirmBtn.addEventListener("click", function () {

            let newUser = document.getElementById("newUser");
                if (newUser.value && newPassword.value && (newPassword.value === newPasswordConfirm.value)) {

                    // Use .push to add user to [accounts]
                    accounts.push({username: newUser.value, password: newPassword.value});
                    
                    // Add newly reg. user to localStorage
                    localStorage.setItem("usernameKey", newUser.value);
                    // localStorage.setItem(("accounts"), JSON.stringify(accounts));
                    console.log(newUser.value, newPassword.value);
                    content.innerHTML = loggedInPage;
                    location.reload(); 
 
                    let logoutBtn = document.getElementById("logoutBtn");
                    logoutBtn.addEventListener("click", function (){
                        localStorage.removeItem("usernameKey");
                        content.innerHTML = defaultPage;
                        location.reload(); 
                    })
                }

                else if (newUser.value && newPassword.value && newPasswordConfirm.value && (newPassword.value !== newPasswordConfirm.value)) {
                    let regMessage = document.getElementById("regMessage");
                    regMessage.innerHTML = "Your passwords do not match. Please try again.";
                    newPasswordConfirm.style.backgroundColor = "rgb(153, 255, 204)";
                }

                else {
                    console.log("Please fill in username and password.");
                    let regMessage = document.getElementById("regMessage");
                    regMessage.innerHTML = "Please specify both a valid username and a password.";
                }    
        })
    })
    
}

