const express = require('express');
const projects = require('../services/project').getAll();
const router = express.Router();

router.get('/', (req, res) => {

    // add code to render the Home Component, and pass in the projects  
    // as a props
    const user = req.session.user;
    res.render('Home', { projects, user })
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
});

module.exports = router;