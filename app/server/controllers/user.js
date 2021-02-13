const express = require('express');
const router = express.Router();
const programList = require('../services/school').getPrograms();
const gradYears = require('../services/school').getGradYears();
const user = require('../services/user');

router.get('/login', (req, res) => {
    const user = req.session.user;
    const logError = req.flash('logError')
    res.render('Login', { logError, user });
    console.log(logError);
})

router.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const loginData = user.authenticate(email, password);
    console.log(loginData[0], loginData[1]);

    if (loginData[0] == true) {
        req.session.user = loginData[1];
        res.redirect('/');
    }
    else {
        req.flash("logError", loginData[1]);
        console.log(loginData[1]);
        console.log(loginData[0]);
        res.redirect('/login');
    }
})

router.get('/signup', (req, res) => {
    const user = req.session.user;
    const error = req.flash("error");
    res.render('Signup', { programList, gradYears, error, user });

})

router.post('/signup', (req, res) => {

    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const matricNumber = req.body.matricNumber;
    const program = req.body.program;
    const graduationYear = req.body.graduationYear;

    const formData = user.create({
        firstname,
        lastname,
        email,
        password,
        matricNumber,
        program,
        graduationYear,
    })

    console.log(formData);

    if (formData[0] == true) {
        req.session.user = formData[1];
        res.redirect('/');
    }
    else {
        req.flash("error", formData[1]);
        console.log(formData[1]);
        console.log(formData[0]);
        res.redirect('/signup');
    }


})
module.exports = router; 