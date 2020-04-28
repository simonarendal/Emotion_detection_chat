const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

var roomName = 'green';

// When the login button is clicked, the following code is executed
loginButton.addEventListener("click", (e) => {
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    //const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (password === roomName) {
        // If the credentials are valid, show an alert box and reload the page
        alert("I agree to the terms");
        location.replace("https://leonorabryndum.dk/tokbox/" + roomName)  
    } else {
        // Otherwise, make the login error message show (change its oppacity)
        loginErrorMsg.style.opacity = 1;
    }
})