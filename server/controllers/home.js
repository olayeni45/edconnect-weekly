const express = require('express');
const projectLink = require('../services/project')
const userService = require('../services/user');
const router = express.Router();
router.get('/', async (req, res) => {

    //const user = req.session.user;
    var user;
    const projects = await projectLink.getAll();

    if (req.session.user != undefined || null) {
        const email = req.session.user.email;
        const dbUser = await userService.getUser(email);
        user = dbUser;
    }
    else {
        user = req.session.user
    }

    res.render('Home', { projects, user })
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
});

module.exports = router;