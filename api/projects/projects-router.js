const express = require('express');
const {validateProjectId, validateInfo} = require('./projects-middleware');

const Project = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {
    Project.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project)
})

router.post('/', validateInfo, (req, res, next) => {
    Project.insert({name: req.name, description: req.description})
    .then(newProj => {
        res.status(201).json(newProj)
    })
    .catch(next)
})


module.exports = router;
