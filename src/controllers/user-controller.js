const UserService = require("../services/user-service")

const userService = new UserService()

const create = async (req, res) => {
    try {
        const user = await userService.create({
            email: req.body.email,
            password: req.body.password
        })
        return res.status(500).json({
            data: user,
            success: true,
            message: "Successfully created an user.",
            error: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong while creating an user.",
            error: error
        })
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password)
        return res.status(500).json({
            data: response,
            success: true,
            message: "Successfully signed in",
            error: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong while creating an user.",
            error: error
        })
    }
}

module.exports = {
    create, signIn
}