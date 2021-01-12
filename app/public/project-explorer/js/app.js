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
var bottomFooter = document.querySelector(".bottomFooter");

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


//POST Request for the signup form 
if (signUpForm) {

    signUpForm.addEventListener("submit", (event) => {
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
                    bottomFooter.className = "displayFooter";

                }

            })
            .catch((error) => {
                console.log("Error: ", error);
            });
    })

}

//NavBar from index.html 
window.onload = () => {

    //To check if there is a value for the uid cookie
    let uid = document.cookie.split(';').find(row => row.startsWith('uid')).split('=')[1];

    let personalCookieUri = usersUri + "/" + uid;

    if (uid != " ") {

        fetch(personalCookieUri,
            {
                "method": "GET"
            })
            .then(async (response) => {
                var data = await response.json();
                console.log(data);

                //Defining new navLinks
                let signUpLink = document.querySelector('a[href = "register.html"]');
                let loginLink = document.querySelector('a[href = "login.html"]');
                let firstAppend = document.querySelector(".changedDiv");
                let secondAppend = document.querySelector(".innerChangedDiv");
                let ulLinks = document.querySelector(".changedLinks");

                signUpLink.style.display = "none";
                loginLink.style.display = "none";

                let logoutLi = document.createElement("li");
                logoutLi.className = "nav-item";
                let logoutBtn = document.createElement("a");
                logoutBtn.className = "nav-link";
                logoutBtn.setAttribute("href", "#");
                logoutBtn.setAttribute("id", "logout");
                logoutBtn.innerHTML = "Logout";
                logoutLi.appendChild(logoutBtn);

                let userNameLi = document.createElement("li");
                userNameLi.className = "nav-item";
                let userNameLink = document.createElement("a");
                userNameLink.className = "nav-link";
                userNameLink.setAttribute("href", "#");
                userNameLink.setAttribute("id", "username");
                userNameLink.innerHTML = `Hi, ${data.firstname}`;
                userNameLi.appendChild(userNameLink);

                firstAppend.appendChild(logoutLi);
                secondAppend.appendChild(userNameLi);
                ulLinks.append(firstAppend, secondAppend);

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

};

//Login.html
if (loginForm) {
    buttonLogin.addEventListener("click", (event) => {
        console.log("Clicked");
        event.preventDefault();

        var loginEmail = document.getElementById("email").value;
        var loginPassword = document.getElementById("password").value;

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
}


//CreateProject.html
if (createProjectForm) {

    createProjectForm.addEventListener("submit", (event) => {
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

}
//Restricting Project Submission
document.addEventListener("DOMContentLoaded", () => {

    let uid = document.cookie.split(';').find(row => row.startsWith('uid')).split('=')[1];

    if (uid == " ") {
        window.location.href = window.location.origin + "/project-explorer/login.html";
    }

})

//Updating the projects
fetch(createProjectUri,
    {
        method: "GET",
        headers: { 'Content-type': 'application/json' }
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        var returnedProjects = data;

        for (var i = 0; i < returnedProjects.length; i++) {

        }

    })
    .catch((error) => {
        console.log("Error: " + error);
    });
