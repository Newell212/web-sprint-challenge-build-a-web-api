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
    Project.insert({name: req.name, description: req.description, completed: req.completed})
    .then(newProj => {
        res.status(201).json(newProj)
    })
    .catch(next)
})

router.put('/:id', validateProjectId, validateInfo, async (req, res, next) => {
   try {
  const updatedProj = await Project.update(req.params.id, {completed: req.completed, description: req.description, name: req.name})
    res.json(updatedProj)
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Project.remove(req.params.id)
        res.json(req.project)
    } catch(err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const result = await Project.getProjectActions(req.params.id)
        res.json(result)
    } catch(err) {
        next(err)
    }
})


module.exports = router;
