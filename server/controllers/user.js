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


//GET Google Authentication API
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/callback",
    passport.authenticate("google", { successRedirect: '/continueSignup', failureRedirect: "/signup", session: false }),
    function (req, res) {
        res.redirect("http://localhost");
    }
);


//Passport Google Login
var googleArray = new Array();

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(
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
                url: url
            }

            googleArray.push(userData);

            done(null, userData);

        }
    )
);



//Continue Signup Page
router.get('/continueSignup', async (req, res) => {

    const details = googleArray;
    const error = req.flash("error");
    console.log("Error from get", error);
    console.log("Google data from /continueSignup", details);

    res.render('ContinueSignup', { details, programList, gradYears, error });
})

//Post signup page
router.post('/continue', async (req, res) => {

    const details = googleArray;

    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    const matricNumber = req.body.matric;
    const program = req.body.program;
    const graduationYear = req.body.year;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const image = "Google Profile picture";
    const url = details[0].url;

    var createdAccount;

    const createAccount = await user
        .googleCreate(firstname, lastname, email, matricNumber, program, graduationYear, password, confirmPassword, image, url)
        .then((create) => {
            if (create[0] == true) {
                req.session.user = create[1];
                console.log("req.session.user", create[1]);
                createdAccount = create[0];

            }
            else {
                console.log("Error from post", create[1]);
                req.flash("error", create[1]);
                res.redirect('/continueSignup');
            }

        })

    console.log("Created account", createdAccount);
    if (createdAccount === true) {
        const imageUpload = await cloudinary.uploader.upload(url, { folder: "Project Explorer" })
            .then((result) => {
                console.log("Image upload from /continueSignup", result.url)
            })
            .catch((error) => {
                console.log(error);
            });

        res.redirect('/');

    }

})



module.exports = router;


/*
//Passport Facebook Login
passport.use(new FacebookStrategy({
    clientID: process.env.CLIENT_ID_FB,
    clientSecret: process.env.CLIENT_SECRET_FB,
    callbackURL: "http://localhost/auth/facebook/edconnect",
    profileFields: ['id', 'displayName', 'name', 'picture.type(small)', 'email']
},
    function (accessToken, refreshToken, profile, cb) {

        console.log(profile);
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
             return cb(err, user);
         });
    }
));
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/edconnect',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        console.log(res);
        // Successful authentication, redirect home.
        res.redirect('/');
    });

*/