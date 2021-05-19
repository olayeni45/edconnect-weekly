const express = require('express');
const router = express.Router();
const programList = require('../services/school').getPrograms();
const gradYears = require('../services/school').getGradYears();
const user = require('../services/user');
const userModel = require('../models/user');

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

//Profile page
router.get('/profile', async (req, res) => {

    const modifyError = req.flash('modifyError')
    const success = req.flash('success');
    const emailSession = req.session.user.email;
    const dbUser = await user.getUser(emailSession);
    /* const userDetails = dbUser;
    res.render('Profile', { userDetails, programList, gradYears, modifyError, success }); */
    req.session.reload(function (err) {
        const userDetails = dbUser;
        res.render('Profile', { userDetails, programList, gradYears, modifyError, success });
    });

});


//Modify personal details
router.put('/profileUser', async (req, res) => {
    console.log(req.body);

    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const program = req.body.program;
    const matricNumber = req.body.matricNumber;
    const graduationYear = req.body.graduationYear;

    const userUpdate = await user
        .editFunction(email, firstName, lastName, matricNumber, program, graduationYear)
        .then((userUpdate) => {
            if (userUpdate[0] == true) {
                req.flash("success", userUpdate[1]);
                console.log(userUpdate[1]);
                res.redirect("/profile");
            }
        });

})


//Modify password
router.put('/profilePassword', async (req, res) => {
    console.log(req.body);

    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    const email = req.session.user.email;

    const update = await user
        .passwordChange(email, currentPassword, newPassword, confirmPassword)
        .then((update) => {
            if (update[0] == true) {
                console.log(update[1]);
                req.flash("modifyError", update[1]);
                res.redirect("/profile");
            }
            else {
                req.flash("modifyError", update[1]);
                console.log(update[1]);
                res.redirect("/profile");
            }
        });

})

/* 
router.put('/profile', upload.single('image'), async(req, res, next) => {

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});
 */
module.exports = router;