//Defining the URIs
const programListUri = "/api/programs";
const gradYearsUri = "/api/graduationYears";
const registerUri = "/api/register";
const usersUri = "/api/users";
const loginUri = "/api/login";
const createProjectUri = "/api/projects";

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

//Register.html
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
            programSelect[i].innerHTML = data[i];
        }
    })
    .catch((error) => {
        console.log("Error: ", error);
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
            graduationList[i].innerHTML = data[i];
        }
    })
    .catch((error) => {
        console.log("Error: ", error);
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
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formData),
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

            if (data.status === "ok") {
                let key = "uid";
                let value = data.data.id;
                document.cookie = `${key}=${value};path=/;`;
                window.location.href = window.location.origin + "/project-explorer/index.html";
            }
            else {
                var alertDiv = document.createElement("div");
                alertDiv.className = "alert";
                alertDiv.classList.add("alert-danger");

                var errorMessages = new Array();
                errorMessages = data.errors;

                for (var i = 0; i < errorMessages.length; i++) {
                    var alerts = document.createElement("p");
                    alerts.innerHTML = errorMessages[i];
                    alertDiv.appendChild(alerts);
                }

                signUpForm.prepend(alertDiv);

            }

        })
        .catch((error) => {
            console.log("Error: ", error);
        });
})


//NavBar from index.html 
document.addEventListener('DOMContentLoaded', () => {
    //To check if there is a value for the uid cookie
    let uid = document.cookie.split(';').find(row => row.startsWith('uid')).split('=')[1];

    /*
        var storedCookie = new Array();
        storedCookie = document.cookie.split("=");
        var userCookie = storedCookie[1];
        console.log(userCookie);
        
        userCookie != null
    */
    let personalCookieUri = usersUri + "/" + uid;

    if (uid != null) {

        fetch(personalCookieUri,
            {
                "method": "GET"
            })
            .then((response) => {
                return response.json();
            })
            .then(() => {

                //Defining new navLinks
                let signUpLink = document.querySelector('a[href = "register.html"]');
                let loginLink = document.querySelector('a[href = "login.html"]');
                let firstAppend = document.querySelector(".changedDiv");
                let secondAppend = document.querySelector(".innerChangedDiv");

                signUpLink.style.display = "none";
                loginLink.style.display = "none";

                let logoutLi = document.createElement("li");
                logoutLi.className = "nav-item";
                let logoutBtn = document.createElement("a");
                logoutBtn.className = "nav-link";
                logoutBtn.setAttribute("href", "#");
                logoutBtn.setAttribute("id", "logout");

                let userNameLi = document.createElement("li");
                userNameLi.className = "nav-item";
                let userNameLink = document.createElement("a");
                userNameLink.className = "nav-link";
                userNameLink.setAttribute("href", "#");
                userNameLink.setAttribute("id", "username");
                userNameLink.innerHTML = `Hi, {data.firstname}`;
                userNameLi.appendChild(userNameLink);

                firstAppend.appendChild(logoutLi);
                secondAppend.appendChild(userNameLi);

                function logout() {
                    document.cookie = "uid=; expires= Thu, 21 Aug 2014 20:00:00 UTC; path=/";
                    window.location.href = window.location.origin + "/project-explorer/index.html";
                }

                logoutBtn.addEventListener("click", logout);

            })
            .catch((error) => {
                console.log("Error: ", error);
            });

    }

})

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
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(loginData)
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status === "ok") {
                let key = "uid";
                let value = data.data.id;
                document.cookie = `${key}=${value};path=/;`;
                window.location.href = window.location.origin + "/project-explorer/index.html";
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
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(createProjectData)
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status === "ok") {
                window.location.href = window.location.origin + "/project-explorer/index.html";
            }
            else {
                var createAlertDiv = document.createElement("div");
                createAlertDiv.className = "alert";
                createAlertDiv.classList.add("alert-danger");

                var errorMessages = new Array();
                errorMessages = data.errors;

                for (var i = 0; i < errorMessages.length; i++) {
                    var alerts = document.createElement("p");
                    alerts.innerHTML = errorMessages[i];
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
document.addEventListener("DOMContentLoaded", () => {

    let uid = document.cookie.split(';').find(row => row.startsWith('uid')).split('=')[1];

    if (uid == null) {
        window.location.href = window.location.origin + "/project-explorer/login.html";
    }

})