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
                //console.log(data);

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
    if (document.cookie != "") {

        let uid = document.cookie.split(';').find(row => row.startsWith('uid')).split('=')[1];

        let personalCookieUri = usersUri + "/" + uid;

        if (uid != " ") {

            fetch(personalCookieUri,
                {
                    "method": "GET"
                })
                .then(async (response) => {
                    var data = await response.json();

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
    }

};

//Login.html
if (loginForm) {
    buttonLogin.addEventListener("click", (event) => {
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
    createProjectBtn.addEventListener("click", (event) => {
        event.preventDefault();

        var projectName = document.getElementById("projectName").value;
        var projectAbstract = document.getElementById("projectAbstract").value;
        var author = document.getElementById("author").value.split(',');
        var tag = document.getElementById("tag").value.split(',');

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
                    //console.log(createProjectData);
                }
                else {
                    var createAlertDiv = document.createElement("div");
                    createAlertDiv.className = "alert";
                    createAlertDiv.classList.add("alert-danger");

                    var errorMessages = new Array();
                    errorMessages = data.errors;
                    //console.log(errorMessages);

                    if (errorMessages == "Unauthorized Access") {
                        var oneAlert = document.createElement("p");
                        oneAlert.innerHTML = errorMessages;
                        createAlertDiv.appendChild(oneAlert);
                    }
                    else {
                        for (var i = 0; i < errorMessages.length; i++) {
                            var alerts = document.createElement("p");
                            alerts.innerHTML = errorMessages[i];
                            createAlertDiv.appendChild(alerts);
                        }
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

window.onload = () => {
    if (window.location.href.includes("create")) {

        if (document.cookie = " ") {
            window.location.href = window.location.origin + "/project-explorer/login.html";
        }

    }
}


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
        for (var i = 0; i <= 3; i++) {

            //Assigning Project names and links
            var first = document.querySelector(".first");
            first.innerHTML = " ";
            var firstHeader = document.createElement("h5");
            var firstLink = document.createElement("a");
            firstLink.innerHTML = returnedProjects[0].name;
            firstLink.href = window.location.origin + `/project-explorer/viewProject.html?id=${returnedProjects[0].id}`;
            firstHeader.appendChild(firstLink);

            var second = document.querySelector(".second");
            second.innerHTML = " ";
            var secondHeader = document.createElement("h5");
            var secondLink = document.createElement("a");
            secondLink.innerHTML = returnedProjects[1].name;
            secondLink.href = window.location.origin + `/project-explorer/viewProject.html?id=${returnedProjects[1].id}`;
            secondHeader.appendChild(secondLink);

            var third = document.querySelector(".third");
            third.innerHTML = " ";
            var thirdHeader = document.createElement("h5");
            var thirdLink = document.createElement("a");
            thirdLink.innerHTML = returnedProjects[2].name;
            thirdLink.href = window.location.origin + `/project-explorer/viewProject.html?id=${returnedProjects[2].id}`;
            thirdHeader.appendChild(thirdLink);

            var fourth = document.querySelector(".fourth");
            fourth.innerHTML = " ";
            var fourthHeader = document.createElement("h5");
            var fourthLink = document.createElement("a");
            fourthLink.innerHTML = returnedProjects[3].name;
            fourthLink.href = window.location.origin + `/project-explorer/viewProject.html?id=${returnedProjects[3].id}`;
            fourthHeader.appendChild(fourthLink);

            //Assigning Authors
            var authorsA = document.querySelector(".authorsA");
            authorsA.innerHTML = " ";
            var authorsADiv = document.createElement("div");
            var authorsAList = document.createElement("p");
            authorsAList.innerHTML = returnedProjects[0].authors;
            authorsADiv.appendChild(authorsAList);

            var authorsB = document.querySelector(".authorsB");
            authorsB.innerHTML = " ";
            var authorsBDiv = document.createElement("div");
            var authorsBList = document.createElement("p");
            authorsBList.innerHTML = returnedProjects[1].authors;
            authorsBDiv.appendChild(authorsBList);

            var authorsC = document.querySelector(".authorsC");
            authorsC.innerHTML = " ";
            var authorsCDiv = document.createElement("div");
            var authorsCList = document.createElement("p");
            authorsCList.innerHTML = returnedProjects[2].authors;
            authorsCDiv.appendChild(authorsCList);

            var authorsD = document.querySelector(".authorsD");
            authorsD.innerHTML = " ";
            var authorsDDiv = document.createElement("div");
            var authorsDList = document.createElement("p");
            authorsDList.innerHTML = returnedProjects[3].authors;
            authorsDDiv.appendChild(authorsDList);

            //Assigning Abstracts
            var abstractA = document.querySelector(".abstractA");
            abstractA.innerHTML = " ";
            var abstractADiv = document.createElement("div");
            var abstractAP = document.createElement("p");
            abstractAP.innerHTML = returnedProjects[0].abstract;
            abstractADiv.appendChild(abstractAP);

            var abstractB = document.querySelector(".abstractB");
            abstractB.innerHTML = " ";
            var abstractBDiv = document.createElement("div");
            var abstractBP = document.createElement("p");
            abstractBP.innerHTML = returnedProjects[1].abstract;
            abstractBDiv.appendChild(abstractBP);

            var abstractC = document.querySelector(".abstractC");
            abstractC.innerHTML = " ";
            var abstractCDiv = document.createElement("div");
            var abstractCP = document.createElement("p");
            abstractCP.innerHTML = returnedProjects[2].abstract;
            abstractCDiv.appendChild(abstractCP);

            var abstractD = document.querySelector(".abstractD");
            abstractD.innerHTML = " ";
            var abstractDDiv = document.createElement("div");
            var abstractDP = document.createElement("p");
            abstractDP.innerHTML = returnedProjects[3].abstract;
            abstractDDiv.appendChild(abstractDP);

            //Tag Names
            var tagsA = document.querySelector(".tagsA");
            tagsA.innerHTML = " ";
            var tagsADiv = document.createElement("div");
            var tagsAList = document.createElement("p");
            tagsAList.innerHTML = returnedProjects[0].tags;
            tagsADiv.appendChild(tagsAList);

            var tagsB = document.querySelector(".tagsB");
            tagsB.innerHTML = " ";
            var tagsBDiv = document.createElement("div");
            var tagsBList = document.createElement("p");
            tagsBList.innerHTML = returnedProjects[1].tags;
            tagsBDiv.appendChild(tagsBList);

            var tagsC = document.querySelector(".tagsC");
            tagsC.innerHTML = " ";
            var tagsCDiv = document.createElement("div");
            var tagsCList = document.createElement("p");
            tagsCList.innerHTML = returnedProjects[2].tags;
            tagsCDiv.appendChild(tagsCList);

            var tagsD = document.querySelector(".tagsD");
            tagsD.innerHTML = " ";
            var tagsDDiv = document.createElement("div");
            var tagsDList = document.createElement("p");
            tagsDList.innerHTML = returnedProjects[3].tags;
            tagsDDiv.appendChild(tagsDList);

        }

        //Project Names
        first.appendChild(firstHeader);
        second.appendChild(secondHeader);
        third.appendChild(thirdHeader);
        fourth.appendChild(fourthHeader);

        //Authors
        authorsA.appendChild(authorsADiv);
        authorsB.appendChild(authorsBDiv);
        authorsC.appendChild(authorsCDiv);
        authorsD.appendChild(authorsDDiv);

        //Abstracts
        abstractA.appendChild(abstractADiv);
        abstractB.appendChild(abstractBDiv);
        abstractC.appendChild(abstractCDiv);
        abstractD.appendChild(abstractDDiv);

        //Tags
        tagsA.appendChild(tagsADiv);
        tagsB.appendChild(tagsBDiv);
        tagsC.appendChild(tagsCDiv);
        tagsD.appendChild(tagsDDiv);
    })
    .catch((error) => {
        console.log("Error: ", error);
    });


//Update ViewProject Page  
if (window.location.href.includes("?")) {

    var projectID = window.location.href.split('=')[1];
    var viewProjectUri = createProjectUri + "/" + projectID;

    fetch(viewProjectUri,
        {
            method: "GET"
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            var viewProjects = data;

            //Updating Project Name
            var projectName = document.querySelector(".projectName");
            projectName.innerHTML = " ";
            var projectNameDiv = document.createElement("div");
            var returnedProjectName = document.createElement("p");
            returnedProjectName.setAttribute("id", "project_name");
            returnedProjectName.innerHTML = viewProjects.name;
            projectNameDiv.appendChild(returnedProjectName);
            projectName.appendChild(projectNameDiv);

            //Updating Project Abstract
            var abstractDiv = document.querySelector(".abstractDiv");
            abstractDiv.innerHTML = " ";
            var absDiv = document.createElement("div");
            var absText = document.createElement("p");
            absText.setAttribute("id", "project_abstract");
            absText.innerHTML = viewProjects.abstract;
            absDiv.appendChild(absText);
            abstractDiv.appendChild(absDiv);

            //Updating Authors
            authorA = document.querySelector(".authorA");
            authorA.innerHTML = " ";
            authorADiv = document.createElement("div");
            authorAP = document.createElement("p");
            authorAP.setAttribute("id", "project_authors");

            authorB = document.querySelector(".authorB");
            authorB.innerHTML = " ";
            authorBDiv = document.createElement("div");
            authorBP = document.createElement("p");
            authorBP.setAttribute("id", "project_authors");

            var authorArray;
            authorArray = viewProjects.authors;

            if (authorArray[0].includes(",")) {
                var authorSplit = authorArray[0].split(",");
                authorAP.innerHTML = authorSplit[0];
                authorBP.innerHTML = authorSplit[1];
            }

            else if (authorArray[0][0].length > 1) {
                authorAP.innerHTML = authorArray[0][0];
                authorBP.innerHTML = authorArray[0][1];
            }
            else {
                for (var i = 0; i < authorArray.length; i++) {
                    authorAP.innerHTML = authorArray[0];
                    authorBP.innerHTML = authorArray[1];
                }
            }

            authorADiv.appendChild(authorAP);
            authorA.appendChild(authorADiv);
            authorBDiv.appendChild(authorBP);
            authorB.appendChild(authorBDiv);

            //Updating project Tags
            var tags = document.querySelector(".card-footer");
            tags.innerHTML = " ";
            var tagDiv = document.createElement("div");
            var tagP = document.createElement("p");
            tagP.innerHTML = viewProjects.tags;
            tagDiv.appendChild(tagP);
            tags.appendChild(tagDiv);


            //Updating CreatedBy
            var createdID = viewProjects.createdBy
            var createdByUri = usersUri + "/" + createdID;

            fetch(createdByUri,
                {
                    method: "GET"
                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    var createdBy = document.querySelector(".createdBy");
                    createdBy.innerHTML = " ";
                    var createdByDiv = document.createElement("div");
                    var createdByText = document.createElement("p");
                    createdByText.setAttribute("id", "project_author");
                    createdByText.innerHTML = data.firstname + " " + data.lastname;
                    createdByDiv.appendChild(createdByText);
                    createdBy.appendChild(createdByDiv);
                })

        })
        .catch((error) => {
            console.log("Error", error);
        })

}    