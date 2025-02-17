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
    Action.update(req.params.id, req.body)
    .then(updatedAction => {
        res.json(updatedAction)
    })
    .catch(next)
})

router.delete('/:id', validateUserId, async (req, res, next) => {
    try {
        await Action.remove(req.params.id)
        res.json(req.action)
    } catch(err) {
        next(err)
    }
})


module.exports = router;
