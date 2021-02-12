const express = require('express');
const router = express.Router();
const project = require('../services/project');
const user = require('../services/user');

router.get('/projects/submit', (req, res) => {
    const createErr = req.flash('createErr')
    res.render('CreateProject', { createErr });
    console.log(req.session.user);
    if (req.session.user == undefined) {
        res.redirect('/login');
    }
})

router.post('/projects/submit', (req, res) => {
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
    });

    if (createData[0] == true) {
        res.redirect('/');
    }
    else {
        req.flash("createErr", createData[1]);
        console.log(createData[1]);
        console.log(createData[0]);
        res.redirect('/projects/submit');
    }

})

router.get('/project/:id', (req, res) => {
    const id = req.params.id;
    const projectsOfId = project.getById(id);
    const userOfId = user.getById(projectsOfId.createdBy);
    res.render('Project', { projectsOfId, userOfId, id });
})

module.exports = router; 