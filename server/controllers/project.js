const express = require('express');
const router = express.Router();
const project = require('../services/project');
const userService = require('../services/user');

router.get('/projects/submit', async (req, res) => {

    const createErr = req.flash('createErr');

    var user;
    if (req.session.user != undefined || null) {
        const email = req.session.user.email;
        const dbUser = await userService.getUser(email);
        user = dbUser;
    }
    else {
        user = req.session.user;
    }

    res.render('CreateProject', { createErr, user });

    if (user == undefined) {
        res.redirect('/login');
    }
})

router.post('/projects/submit', async (req, res) => {
    const createdBy = req.session.user._id;
    console.log(createdBy);
    const name = req.body.name;
    const abstract = req.body.abstract;
    const authArr = req.body.authors;
    const authors = authArr.split(",");
    const tagArr = req.body.tags;
    const tags = tagArr.split(",");

    const createData = await project.create({
        name,
        abstract,
        authors,
        tags,
        createdBy
    }).then((createdData) => {
        if (createdData[0] == true) {
            res.redirect('/');
        }
        else {
            req.flash("createErr", createdData[1]);
            res.redirect('/projects/submit');
        }
    });
    console.log(createData);


})

router.get('/project/:id', async (req, res) => {

    var user;
    if (req.session.user != undefined || null) {
        const email = req.session.user.email;
        const dbUser = await userService.getUser(email);
        user = dbUser;
    }
    else {
        user = req.session.user;
    }
    //const user = await req.session.user;

    const id = req.params.id;
    const projectsOfId = await project.getById(id);
    const userOfId = await userService.getById(projectsOfId.createdBy);

    res.render('Project', { projectsOfId, userOfId, id, user });
})

module.exports = router;