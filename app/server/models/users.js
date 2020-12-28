const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {

    }

    getFullName() {
        return this.firstname + " " + this.lastname;
    }
}

class Users extends DataModel {
    authenticate(email, password) {

        var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return passwordRegex.test(password);
        return emailRegex.test(email);

    }

    getByEmail(email) {

    }

    getByMatricNumber(matricNumber) {

    }

    validate(obj) {

    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};