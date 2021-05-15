const express = require('express');
const router = express.Router();
const programList = require('../services/school').getPrograms();
const gradYears = require('../services/school').getGradYears();
const user = require('../services/user');

router.get('/login', (req, res) => {
    const user = req.session.user;
    const logError = req.flash('logError')
    res.render('Login', { logError, user });
})

router.post('/login', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const loginData = await user
        .authenticate(email, password)
        .then((loginData) => {
            if (loginData[0] == true) {
                req.session.user = loginData[1];
                res.redirect('/');
            }
            else {
                req.flash("logError", loginData[1]);
                res.redirect('/login');
            }
        });

    console.log(loginData);


})

router.get('/signup', (req, res) => {
    const user = req.session.user;
    const error = req.flash("error");
    res.render('Signup', { programList, gradYears, error, user });

})

router.post('/signup', async (req, res) => {

    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const matricNumber = req.body.matricNumber;
    const program = req.body.program;
    const graduationYear = req.body.graduationYear;

    const formData = await user
        .create({
            firstname,
            lastname,
            email,
            password,
            matricNumber,
            program,
            graduationYear
        })
        .then((formData) => {
            console.log(formData);
            if (formData[0] == true) {
                req.session.user = formData[1];
                res.redirect('/');
            }
            else {
                req.flash("error", formData[1]);
                res.redirect('/signup');
            }
        })

    console.log("Form data", formData);

})
module.exports = router;