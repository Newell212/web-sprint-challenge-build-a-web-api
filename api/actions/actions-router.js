const express = require('express')
const {validateUserId} = require('./actions-middlware')

const Action = require('./actions-model')

const router = express.Router()

router.get('/', (req, res, next) => {
    Action.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(next)
})


module.exports = router;
