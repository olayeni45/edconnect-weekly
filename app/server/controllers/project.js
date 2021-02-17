const express = require('express');
const router = express.Router();
const project = require('../services/project');
const userService = require('../services/user');

router.get('/projects/submit', (req, res) => {
    const user = req.session.user;
    console.log(user);
    const createErr = req.flash('createErr')
    res.render('CreateProject', { createErr, user });
    if (user == undefined) {
        res.redirect('/login');
    }
})

router.post('/projects/submit', (req, res) => {
    const createdBy = req.session.user.id;
    const name = req.body.name;
    const abstract = req.body.abstract;
    const authArr = req.body.authors;
    const authors = authArr.split(",");
    const tagArr = req.body.tags;
    const tags = tagArr.split(",");

    const createData = project.create({
        name,
        abstract,
        authors,
        tags,
        createdBy
    });

    if (createData[0] == true) {
        res.redirect('/');
    }
    else {
        req.flash("createErr", createData[1]);
        res.redirect('/projects/submit');
    }

})

router.get('/project/:id', (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const projectsOfId = project.getById(id);
    console.log(projectsOfId.createdBy);
    const userOfId = userService.getById(projectsOfId.createdBy);
    res.render('Project', { projectsOfId, userOfId, id, user });
})

module.exports = router; 