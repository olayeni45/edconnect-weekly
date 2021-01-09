//Register.html

//Defining the URIs
const programListUri = '/api/programs';
const gradYearsUri = '/api/graduationYears';
const registerUri = '/api/register';
const usersUri = '/api/users';
const loginUri = '/api/login';
const createProjectUri = '/api/projects';

//Defining DOM Variables
//register.html
var programSelect = document.getElementById("program");
var graduationList = document.getElementById("graduation");
var signUpForm = document.getElementById("signupForm");
var signUpButton = document.getElementById("signUp");

//index.html
var signUpNav = document.getElementById("navSignUp");
var loginNav = document.getElementById("navLogin");

//login.html
var loginForm = document.getElementById("loginForm");
var buttonLogin = document.getElementById("loginBtn");

//CreateProject.html
var createProjectForm = document.getElementById("createProjectForm");
var createProjectBtn = document.getElementById("createProjectBtn");

//GET Requests for the Programs and Graduation Years
fetch(programListUri,
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for (var i = 0; i < data.length; i++) {
            programSelect[i].value = data[i];
            programSelect[i].textContent = data[i];
        }
    })
    .catch((error) => {
        console.log("Error: " + error);
    });

fetch(gradYearsUri,
    {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for (var i = 0; i < data.length; i++) {
            graduationList[i].value = data[i];
            graduationList[i].textContent = data[i];
        }
    })
    .catch((error) => {
        console.log("Error: " + error);
    })


//POST Request from the form 
signUpButton.addEventListener("click", function (event) {
    event.preventDefault();

    let firstname = document.getElementById("fName").value;
    let lastname = document.getElementById("lName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let matricNumber = document.getElementById("matric").value;
    let program = document.getElementById("program").value;
    let graduationYear = document.getElementById("graduation").value;

    var formData = {
        "firstname": firstname,
        "lastname": lastname,
        "email": email,
        "password": password,
        "matricNumber": matricNumber,
        "program": program,
        "graduationYear": graduationYear
    };

    fetch(registerUri,
        {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-type': 'application/json' }
        })
        .then((response) => {
            response.json();
        })
        .then((data) => {
            if (data.status === "ok") {
                let key = "uid";
                let value = data.data.id;
                document.cookie = `${key}=${value};path=/;`;
                window.Location.href = "project-explorer/index.html";
            }
            else {
                var alertDiv = document.createElement("div");
                alertDiv.className = "alert";
                alertDiv.classList.add("alert-danger");

                for (var i = 0; i < data.error.length; i++) {
                    var alerts = document.createElement("p");
                    alerts.textContent = data.error[i];
                    alertDiv.appendChild(alerts);
                }

                signUpForm.prepend(alertDiv);

            }
        })
        .catch((error) => {
            console.log("Error: " + error);
        });
})

console.log(window.location.href);

/*NavBar from index.html 
document.addEventListener('DOMContentLoaded', (ev) => {
    //To check if there is a value for the uid cookie
    //let uidCookie = document.cookie.split(';').filter(item => item.trim().startsWith('uid')).split("=");
    let userCookieUri = usersUri + "/" + uidCookie;

    if (uidCookie) {

        fetch(userCookieUri,
            {
                "method": "GET"
            })
            .then((response) => {
                return response.json();
            })
            .then(() => {
                signUpNav.style.display = "hidden";
                loginNav.style.display = "hidden";

                var logoutDiv = document.createElement("a");
                logoutDiv.textContent = "Logout";
                logoutDiv.className = ("nav-link");


            })



    } else {

    }
    ev.stopPropagation();
});
*/


//Login.html
buttonLogin.addEventListener("click", (event) => {
    event.preventDefault();

    var loginEmail = document.getElementById("loginEmail").value;
    var loginPassword = document.getElementById("loginPassword").value;
    var loginData = {
        "email": loginEmail,
        "password": loginPassword
    };

    fetch(loginUri,
        {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: { 'Content-type': 'application/json' }
        })
        .then((response) => {
            response.json();
        })
        .then((data) => {
            if (data.status === "ok") {
                let key = "uid";
                let value = data.data.id;
                document.cookie = `${key}=${value};path=/;`;
                window.Location.href = "project-explorer/index.html";
            }
            else {
                var loginAlertDiv = document.createElement("div");
                loginAlertDiv.className = "alert";
                loginAlertDiv.classList.add("alert-danger");
                loginAlertDiv.innerHTML = "Invalid email/password";
                loginForm.prepend(loginAlertDiv);

            }
        })
        .catch((error) => {
            console.log("Error: " + error);
        });
});


//CreateProject.html
createProjectBtn.addEventListener("click", (event) => {
    event.preventDefault();

    var projectName = document.getElementById("projectName").value;
    var projectAbstract = document.getElementById("projectAbstract").value;
    var author = document.getElementById("author").value;
    var tag = document.getElementById("tag").value;

    var createProjectData = {
        "name": projectName,
        "abstract": projectAbstract,
        "authors": [author],
        "tags": [tag]
    }

    fetch(createProjectUri,
        {
            method: "POST",
            body: JSON.stringify(createProjectData),
            headers: { 'Content-type': 'application/json' }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status === "ok") {
                window.Location.href = "project-explorer/index.html";
            }
            else {
                var createAlertDiv = document.createElement("div");
                createAlertDiv.className = "alert";
                createAlertDiv.classList.add("alert-danger");

                for (var i = 0; i < data.error.length; i++) {
                    var alerts = document.createElement("p");
                    alerts.textContent = data.error[i];
                    createAlertDiv.appendChild(alerts);
                }

                createProjectForm.prepend(createAlertDiv);

            }
        })
        .catch((error) => {
            console.log("Error: " + error);
        });

});

//Restricting Project Submission
