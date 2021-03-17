const express = require('express');
const projectLink = require('../services/project')
const router = express.Router();
router.get('/', async (req, res) => {

    // add code to render the Home Component, and pass in the projects  
    // as a props

    const projects = await projectLink.getAll();
    const user = req.session.user;
    res.render('Home', { projects, user })
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
});

module.exports = router;