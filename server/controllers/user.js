const express = require('express');
const router = express.Router();
const programList = require('../services/school').getPrograms();
const gradYears = require('../services/school').getGradYears();
const user = require('../services/user');
const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { promisify } = require('util');
const deletePicture = promisify(fs.unlink);

//Configurations for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, file.originalname);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "png" || "jpg" || "jpeg") {
        cb(null, true);
    } else {
        cb(new Error("Not an Image File"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

//Configurations for Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//ROUTES

//GET Login Route
router.get('/login', (req, res) => {
    const user = req.session.user;
    const logError = req.flash('logError')
    res.render('Login', { logError, user });
})

//POST Login Route
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
})


//GET Signup Route
router.get('/signup', (req, res) => {
    const user = req.session.user;
    const error = req.flash("error");
    res.render('Signup', { programList, gradYears, error, user });
})

//POST Signup Route
router.post('/signup', async (req, res) => {
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const matricNumber = req.body.matricNumber;
    const program = req.body.program;
    const graduationYear = req.body.graduationYear;

    const image = "Default.jpg";
    const url = process.env.DEFAULT_IMAGE;

    const formData = await user
        .create({
            firstname,
            lastname,
            email,
            password,
            matricNumber,
            program,
            graduationYear,
            image,
            url
        })
        .then((formData) => {
            if (formData[0] == true) {
                req.session.user = formData[1];
                res.redirect('/');
            }
            else {
                req.flash("error", formData[1]);
                res.redirect('/signup');
            }
        })

    // Cropping of default image
    const croppedImage = cloudinary.image(process.env.DEFAULT_IMAGE, { width: 43, height: 43, gravity: "face", radius: "max", crop: "fill", fetch_format: "auto", type: "fetch" });
    console.log("Default Image Cropped from signup", croppedImage);
})


//Profile page
router.get('/profile', async (req, res) => {

    const modifyError = req.flash('modifyError')
    const success = req.flash('success');
    const emailSession = req.session.user.email;
    const dbUser = await user.getUser(emailSession);

    req.session.reload(function (err) {
        const user = dbUser;
        res.render('Profile', { user, programList, gradYears, modifyError, success });
    });

});

//Modify Personal Details route
router.put('/profileUser', upload.single('picture'), async (req, res) => {

    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const program = req.body.program;
    const matricNumber = req.body.matricNumber;
    const graduationYear = req.body.graduationYear;

    var imageName;
    var imageUrl;

    if (req.file == undefined || null) {
        const defaultDetails = await user.getDefault(email);
        imageName = defaultDetails[0];
        imageUrl = defaultDetails[1];
    }
    else {
        const filePath = req.file.path;
        imageName = req.file.filename;
        var urlArray = new Array();

        const imageUpload = await cloudinary.uploader.upload(filePath, { folder: "Project Explorer" })
            .then((result) => {
                const image = result.url;
                urlArray.push(image);
                deletePicture(filePath);
            })
            .catch((error) => {
                console.log(error);
            });

        imageUrl = urlArray[0];
        console.log("Image URL from array[0]", imageUrl);
    }

    const userUpdate = await user
        .editFunction(email, firstName, lastName, matricNumber, program, graduationYear, imageName, imageUrl)
        .then((userUpdate) => {
            if (userUpdate[0] == true) {
                req.flash("success", userUpdate[1]);
                res.redirect("/profile");
            }
            else {
                req.flash("success", userUpdate[1]);
                res.redirect("/profile");
            }
        });

})

//Modify password
router.put('/profilePassword', async (req, res) => {

    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    const email = req.session.user.email;

    const update = await user
        .passwordChange(email, currentPassword, newPassword, confirmPassword)
        .then((update) => {
            if (update[0] == true) {
                req.flash("modifyError", update[1]);
                res.redirect("/profile");
            }
            else {
                req.flash("modifyError", update[1]);
                res.redirect("/profile");
            }
        });

})


//Forgot Password Page
router.get('/forgotPassword', (req, res) => {
    const forgotError = req.flash("forgotError");
    res.render('ForgotPassword', { forgotError });
});

router.post('/forgotPassword', async (req, res) => {
    const email = req.body.email;
    const resetForgottenPassword = await user
        .resetLink(email)
        .then((result) => {
            if (result == true) {
                req.flash("forgotError", result[1]);
                res.redirect("/forgotPassword");
            }
            else {
                req.flash("forgotError", result[1]);
                res.redirect("/forgotPassword");
            }
        })

});


//Reset Password Page
router.get('/resetPassword', (req, res) => {
    const resetPasswordError = req.flash('resetPasswordError')
    res.render('ResetPassword', { resetPasswordError });
});

router.post('/resetPassword', async (req, res) => {
    const email = req.body.email;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    const update = await user
        .resetPasswordDB(email, newPassword, confirmPassword)
        .then((update) => {
            if (update[0] == true) {
                req.flash("resetPasswordError", update[1]);
                res.redirect("/resetPassword");
            }
            else {
                req.flash("resetPasswordError", update[1]);
                res.redirect("/resetPassword");
            }
        });

});


//Passport JS Signup Authentication Routes and services
var googleArray = new Array();
var facebookArray = new Array();
var socialDetails = new Array();

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

//Signup Google auth
passport.use('google',
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost/auth/google/callback"
        },
        async function (accessToken, refreshToken, profile, done) {
            console.log("Google profile", profile);

            const firstname = profile.name.familyName;
            const lastname = profile.name.givenName;
            const email = profile.emails[0].value;
            const url = profile.photos[0].value;

            console.log("Data from Google", firstname, lastname, email, url);

            const userData = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                url: url,
                social: "Google"
            }

            googleArray.push(userData);
            socialDetails.push(userData);
            console.log("Social Data", socialDetails);
            console.log("Google array", googleArray);

            done(null, userData);

        }
    )
);

//Signup Facebook auth
passport.use('facebook',
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost/auth/facebook/edconnect",
        profileFields: ['id', 'displayName', 'name', 'photos', 'email']
    },
        function (accessToken, refreshToken, profile, done) {

            const firstname = profile.name.givenName;
            const lastname = profile.name.familyName;
            const email = profile.emails[0].value;
            const url = profile.photos[0].value;

            console.log("Details from facebook: ", firstname, lastname, email, url);

            const userData = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                url: url,
                social: "Facebook"
            }

            facebookArray.push(userData);
            socialDetails.push(userData);
            console.log("Social Data", socialDetails);
            console.log("Facebook array", facebookArray);

            done(null, userData);
        }
    ));


//GET Google Authentication API
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/callback",
    passport.authenticate("google", { successRedirect: '/Social', failureRedirect: "/signup", session: false }),
    function (req, res) {
        res.redirect("http://localhost");
    }
);


//GET Facebook Authentication API
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/edconnect',
    passport.authenticate('facebook', { failureRedirect: '/signup' }),
    function (req, res) {
        // Successful authentication, redirect to Social.jsx
        res.redirect('/Social');
    });


//Passport JS Login Authentication Routes and services
var googleLoginDetails = new Array();
var loginDetails = new Array();
var facebookLoginDetails = new Array();

//Login Google auth
passport.use('google-alt',
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost/auth/google/socialLogin"
        },
        async function (accessToken, refreshToken, profile, done) {

            const email = profile.emails[0].value;
            const userData = {
                email: email,
                social: "Google"
            }

            googleLoginDetails.push(userData);
            loginDetails.push(googleLoginDetails);
            console.log("Data from Login Google", loginDetails);

            done(null, userData);

        }
    )
);

//Login Google Routes for Passport Js
router.get("/auth/login/google", passport.authenticate('google-alt', { scope: ["profile", "email"] }));

router.get("/auth/google/socialLogin",
    passport.authenticate('google-alt', { failureRedirect: "/login", session: false }),

    async function (req, res) {
        const details = googleLoginDetails;
        const loginGoogle = await user
            .socialLogin(details[0].email)
            .then((login) => {
                if (login[0] == true) {
                    req.session.user = login[1];
                    console.log("REQ.SESSION.USER", req.session.user);
                    loginDetails.pop();
                    res.redirect('/');
                }
                else {
                    req.flash("logError", login[1]);
                    res.redirect('/login');
                }
            })

    }
);


//Login Facebook Auth
passport.use('facebook-alt',
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost/auth/facebook/socialLogin",
        profileFields: ['id', 'displayName', 'name', 'photos', 'email']
    },
        function (accessToken, refreshToken, profile, done) {

            const email = profile.emails[0].value;
            const userData = {
                email: email,
                social: "Facebook"
            }

            facebookLoginDetails.push(userData);
            loginDetails.push(facebookLoginDetails);
            console.log("Data from Login Facebook", loginDetails);

            done(null, userData);
        }
    ));



//Login for Facebook Auth   
router.get('/auth/login/facebook', passport.authenticate('facebook-alt', { scope: 'email' }));

router.get('/auth/facebook/socialLogin',
    passport.authenticate('facebook-alt', { failureRedirect: '/login' }),

    async function (req, res) {
        const details = facebookLoginDetails;
        const loginGoogle = await user
            .socialLogin(details[0].email)
            .then((login) => {
                if (login[0] == true) {
                    req.session.user = login[1];
                    console.log("REQ.SESSION.USER", req.session.user);
                    loginDetails.pop();
                    res.redirect('/');
                }
                else {
                    req.flash("logError", login[1]);
                    res.redirect('/login');
                }
            })

    }


);



//Continue Signup Page
router.get('/Social', async (req, res) => {

    var details = socialDetails;
    const error = req.flash("error");
    console.log("Error from get", error);
    console.log("Google data from /Social", details);

    res.render('Social', { details, programList, gradYears, error });
})

//Post signup page
router.post('/continue', async (req, res) => {

    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    const matricNumber = req.body.matric;
    const program = req.body.program;
    const graduationYear = req.body.year;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    var image, url;
    var details = socialDetails;

    console.log("Details from post button", details);
    if (details[0].social == "Facebook") {
        image = "Facebook Profile Picture";
    }
    else {
        image = "Google Profile Picture";
    }
    url = details[0].url;

    var account, sessionUser;
    const createAccount = await user
        .googleCreate(firstname, lastname, email, matricNumber, program, graduationYear, password, confirmPassword, image, url)
        .then((create) => {
            if (create[0] == true) {
                account = true;
                sessionUser = create[1];
                req.session.user = sessionUser;
            }
            else {
                console.log("Error from post", create[1]);
                req.flash("error", create[1]);
                res.redirect('/Social');
            }
        })

    if (account === true) {
        const imageUpload = await cloudinary.uploader.upload(url, { folder: "Project Explorer" })
            .then((result) => {
                console.log("Image upload from /Social", result.url);
                res.redirect('/');
                details.pop();
            })
            .catch((error) => {
                console.log(error);
            });
    }

});


module.exports = router;