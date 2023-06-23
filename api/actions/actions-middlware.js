const Action = require('./actions-model')

async function validateUserId(req, res, next) {
    try {
        const action = await Action.get(req.params.id)
        if(!action) {
            res.status(404).json({
                message: 'action not found'
            })
        } else {
            req.action = action
            next()
        }
    } catch(err) {
        res.status(500).json({
            message: 'problem finding action'
        })
    }
}


module.exports = {
    validateUserId
}
