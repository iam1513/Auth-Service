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

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers["x-access-token"]
        const response = await userService.isAuthenticated(token)
        return res.status(200).json({
            data: response,
            success: true,
            message: "User authenticated. Token is Valid",
            err: {}

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong while verification of token.",
            error: error
        })
    }
}

module.exports = {
    create, signIn, isAuthenticated
}