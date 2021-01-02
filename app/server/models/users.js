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
            if (this.data[i].email == email && this.data[i] == password) {
                return true;
            }

        }

        return false;

    }


    getByEmail(email) {
        //To return a specified email address
        for (let j = 0; j < this.data.length; j++) {
            if (this.data[j].email == email) {
                return this.data[j];
            }

        }

        return null;

    }

    getByMatricNumber(matricNumber) {
        //To return specified matric number
        for (let j = 0; j < this.data.length; j++) {
            if (this.data[j].matricNumber == matricNumber) {
                return this.data[j];
            }
        }

        return null;

    }

    validate(obj) {
        //To validate all the properties
        let propertiesValidation = false, emailValidation = false, matricValidation = false;
        let passwordLength = false;

        //Properties Validation
        if (obj.id != null && obj.firstname != null && obj.lastname != null && obj.email != null && obj.password != null && obj.matricNumber != null && obj.program != null && obj.graduationYear != null) {
            propertiesValidation = true;
        }

        //Email Validation
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].email != obj.email) {
                emailValidation = true;
                break;
            }
        }

        //Matric Validation
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].matricNumber != obj.matricNumber) {
                matricValidation = true;
                break;
            }
        }

        //Password length
        if (obj.password.length >= 7) {
            passwordLength = true;
        }

        if (propertiesValidation == true) {
            if (emailValidation == true) {
                if (matricValidation == true) {
                    if (passwordLength == true) {
                        return true;
                    }
                }
            }
        }

        else {
            return false;
        }

        /*
        if (propertiesValidation && emailValidation && matricValidation && passwordLength) {
            return true;
        }

        else {
            return false;
        }
        */


    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};