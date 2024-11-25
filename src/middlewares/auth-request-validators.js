const validateUserAuth = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            data: {},
            success: false,
            message: "Something went wrong.",
            error: "Email or Password is missing"
        })

    }
    next()
}

const validateIsAdminrequest = (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({
            data: {},
            success: false,
            message: "Something went wrong.",
            error: "User id missing"
        })
    }
    next()
}

module.exports = {
    validateUserAuth,
    validateIsAdminrequest
}