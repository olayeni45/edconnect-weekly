const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.matricNumber = matricNumber;
        this.program = program;
        this.graduationYear = graduationYear;
    }

    getFullName() {
        return this.firstname + " " + this.lastname;
    }
}

class Users extends DataModel {

    authenticate(email, password) {

        var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        if (emailRegex.test(this.email)) {

            if (passwordRegex.test(this.password)) {
                return true;
            }
        }

        else {

            return false;
        }
    }


    getByEmail(email) {

        if (this.email != null) {
            return this.email;
        }
        else {
            return null;
        }

    }

    getByMatricNumber(matricNumber) {

        if (this.matricNumber != null) {
            return this.matricNumber;
        }

        else {
            return null;
        }

    }

    validate(obj) {

        if (obj.id != null && obj.firstname != null && obj.lastname != null && obj.email != null && obj.password != null && obj.matricNumber != null && obj.program != null && obj.graduationYear != null) {

            for (let i = 0; i < this.data.length; i++) {
                var emailCheck = this.data[i];

                if (emailCheck != obj.email) {
                    for (let j = 0; j < this.data.length; j++) {
                        var matricCheck = this.data[j];

                        if (matricCheck != obj.matricNumber) {
                            var leastPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{7,}$/;
                            if (leastPassword.test(obj.email)) {
                                return true;
                            }

                        }
                    }

                }

            }


        }

        else {
            return false;
        }


    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};