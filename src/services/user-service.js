const UserRepository = require("../repository/user-repository")
const jwt = require("jsonwebtoken")
const { ServerConfig } = require("../config")
class UserService {
    constructor() {
        this.userRepository = new UserRepository()
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data)
            return user
        } catch (error) {
            console.log("Something went wrong in Service.")
            throw (error)
        }
    }

    async createToken(user) {
        try {
            const token = jwt.sign(user, ServerConfig.JWT_KEY, { expiresIn: "1h" })
            return token
        } catch (error) {
            console.log("Something went wrong in Token creation.")
            throw (error)
        }
    }

    async verifyToken(token) {
        try {
            const response = jwt.verify(token, ServerConfig.JWT_KEY)
            return response
        } catch (error) {
            console.log("Something went wrong in Token validation.")
            throw (error)
        }
    }

}

module.exports = UserService