// PRESET USER/PASS
let loginData = [
    {userName:"janne", password: "test"},
    {userName:"cathy", password: "test"},
    {userName:"test", password: "test"},
];

// LAYOUTS
/* Set up the three different layouts with JS (let):


   (1) default view with user/pass input fields



   (2) view when logged in: Welcome [user] + logout option
   On logout: clear [user] data from localStorage!



   (3) registration view 
*/






// LOGIN
/* Check localStorage if there's any active login already:

   If so, redirect to logged-in view

   } else {

   redirect to default view: 
   Check input data against [loginData] with a loop
   If login matches, redirect to logged-in view, welcome [user], and add [user] to localStorage 

   } else {
   Wrong username or password, try again
*/


// REGISTER NEW USER
/* 
   Use .push to add user to pre-set [loginData]
   add newly reg. user to localStorage
   Display logged in view and logout option
   On logout, remove from localStorage

   Do it with an if statement --> empty password: error message
*/