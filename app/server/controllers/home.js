const express = require('express');
const projects = require('../services/project').getAll();
const router = express.Router();

router.get('/', (req, res) => {

    // add code to render the Home Component, and pass in the projects  
    // as a props
    var user;
    const userObject = req.session.user;
    if (userObject != undefined) {
        const firstname = userObject.firstname;
        user = firstname;
    }
    console.log("home.js: " + user);
    res.render('Home', { projects, user })
});

module.exports = router;