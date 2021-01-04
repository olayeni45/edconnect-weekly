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
        //To validate both email and password from data array
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].email === email && this.data[i].password === password) {
                return true;
            }
        }
        return false;
    }


    getByEmail(email) {
        //To return a specified email address
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].email == email) {
                return this.data[i];
            }
        }
        return null;
    }

    getByMatricNumber(matricNumber) {
        //To return specified matric number
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].matricNumber == matricNumber) {
                return this.data[i];
            }
        }

        return null;

    }

    validate(obj) {
        //To validate all the properties
        let emptyProperties = true;
        let emailValidation = true;
        let matricValidation = true;
        let passwordLength = true;

        //Properties Validation
        if (obj.id.length == 0 && obj.firstname.length == 0 && obj.lastname.length == 0 && obj.email.length == 0 && obj.password.length == 0 && obj.matricNumber.length == 0 && obj.program.length == 0 && obj.graduationYear.length == 0) {
            emptyProperties = false;
        }
        /*
        if (obj.id != null && obj.firstname != null && obj.lastname != null && obj.email != null && obj.password != null && obj.matricNumber != null && obj.program != null && obj.graduationYear != null) {
            emptyProperties = false;
        }
        */

        //Email Validation
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].email === obj.email) {
                emailValidation = false;
                break;
            }
        }

        //Matric Validation
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].matricNumber === obj.matricNumber) {
                matricValidation = false;
                break;
            }
        }

        //Password length
        if (obj.password.length < 7) {
            passwordLength = false;
        }

        if (emptyProperties && emailValidation && matricValidation && passwordLength) {
            return true;
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