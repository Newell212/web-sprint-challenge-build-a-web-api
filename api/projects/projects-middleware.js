const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
        const project = await Project.get(req.params.id)
        if(!project) {
            res.status(404).json({
                message: 'project not found'
            })
        } else {
            req.project = project
            next()
        }

    } catch(err) {
        res.status(500).json({
            message: 'unable to find projects'
        })
    }
}

function validateInfo(req, res, next) {
    const { name, description } = req.body
    if(!name || !description) {
        res.status(400).json({
            message: "please supply all fields"
        })
    } else {
        req.name = name
        req.description = description
        next()
    }
}


module.exports = {
    validateProjectId,
    validateInfo
}
