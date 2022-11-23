// Preset user/pass combos

let presetUsers = [
    {
userName:"janne", 
password: "test"},
    {
userName:"cathy", 
password: "test"},
    {	
userName:"defineinsane", 
password: "test"},
];

/*
   Set up the three different layouts with JS (let):
   (1) defaultPage with user/pass input fields
   (2) loggedInPage: Welcome [user] + logout button
   (3) regPage 
*/

let defaultPage =`<p>Please log in!</p>
<label for="username">Username</label>
<input type="text" id="inputUsername"> <br><br>
<label for="password">Password</label>
<input type="text" id="inputPassword"> <br><br>
<button id="loginBtn">Login</button> 
<button id="regBtn"> Register </button> <br><br>
<p id="message"></p>`;

let loggedInPage = `<P>Welcome ${localStorage.getItem('usernameKey')}! You have logged in.</p>
<button id=logoutBtn>Log out</button>`;

let regPage =`<label for="userName">Register desired username</label>
<input type="text" id="newUser"> <br><br>
<label for="password">Enter new password</label>
<input type="text" id="newPassword"> <br><br>
<label for="password">Confirm new password</label>
<input type="text" id="newPasswordConfirm"> <br><br>
<button id="confirmBtn">confirm</button> <br>
<p id="regMessage"></p>`


// Check if there’s anyone logged in. If so, redirect to loggedInPage. Else, show defaultPage

if (localStorage.usernameKey) {

    content.innerHTML = loggedInPage; 

    let logoutBtn = document.getElementById("logoutBtn");

        logoutBtn.addEventListener("click", function (){
        	localStorage.removeItem("usernameKey");
        	content.innerHTML= defaultPage;
        	location.reload(); 
    })
}

else {
       content.innerHTML= defaultPage;
    
    let loginBtn = document.getElementById("loginBtn");

        loginBtn.addEventListener("click", function () { 
            let inputUsername = document.getElementById("inputUsername");
            let inputPassword = document.getElementById("inputPassword");
            
        
            inputPassword.style.backgroundColor = 'green';
              

     // Check if user exists: compare both entered username and pass with preset list in [presetUsers]

        for (data in presetUsers){ 

            if (inputUsername.value === presetUsers[data].userName && inputPassword.value === presetUsers[data].password) {
          
                localStorage.usernameKey = inputUsername.value;
                content.innerHTML = loggedInPage
                location.reload();             
            }
            
            else {
                let message = document.getElementById("message");
                message.innerHTML="Username or password is wrong. Please try again.";
            }   
        }    
    });
 
// Register new user

    let regBtn=document.getElementById("regBtn");
    regBtn.addEventListener("click", function () {
        content.innerHTML= regPage;

         // Confirm registration

        let confirmBtn = document.getElementById("confirmBtn");

        confirmBtn.addEventListener("click", function () {

            let newUser=document.getElementById("newUser");
                if (newUser.value && newPassword.value && (newPassword.value === newPasswordConfirm.value)) {

                    // Use .push to add user to [presetUsers]
                 
                    presetUsers.push({userName: newUser.value, password: newPassword.value});

                    // Add newly reg. user to localStorage

                    localStorage.setItem(("presetUsers"), JSON.stringify(presetUsers));
                    let getPresetUsers = JSON.parse(localStorage.getItem("presetUsers"));  

                    content.innerHTML=loggedInPage;

                    let logoutBtn = document.getElementById("logoutBtn");
                    logoutBtn.addEventListener("click", function (){
                        localStorage.removeItem("presetUsers");
                        content.innerHTML= defaultPage;
                        location.reload(); 
                    })
                }
                else {
                    console.log("Please fill in username and password.");
                    let regMessage = document.getElementById("regMessage");
                    regMessage.innerHTML=" Please specify both a valid username and a password. Make sure the passwords match.";
                }    
        })
    })
    
}


