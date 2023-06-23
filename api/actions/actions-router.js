const express = require('express')
const {validateUserId, validateInfo} = require('./actions-middlware')

const Action = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Action.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(next)
})

router.get('/:id', validateUserId, (req, res) => {
    res.json(req.action)
})

router.post('/', validateInfo, (req, res, next) => {
    Action.insert({description: req.description, notes: req.notes, project_id: req.project_id})
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(next)
})

router.put('/:id', validateUserId, validateInfo, (req, res, next) => {
    Action.update(req.params.id, {description: req.description, notes: req.notes, project_id: req.project_id})
    .then(updatedAction => {
        res.json(updatedAction)
    })
    .catch(next)
})


module.exports = router;
