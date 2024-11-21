const UserRepository = require("../repository/user-repository")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
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

    async signIn(email, plainPassword) {
        try {
            // S1 ==> Fetch user using email
            const user = await this.userRepository.getByEmail(email)
            // S2 ==> Compare incoming password with stored one
            const password = this.checkPassword(plainPassword, user.password)
            if (!password) {
                console.log("Password dont match")
                throw { error: "Incorrect Password" }
            }
            // S3 ==> If pass match, create and send the token 
            const newJwt = this.createToken({ email: user.email, id: user.id })
            return newJwt
        } catch (error) {
            console.log("Something went wrong in while signing in.")
            throw (error)
        }
    }

    async isAuthenticated(token) {
        try {
            const response = await this.verifyToken(token)
            if (!response) {
                throw { error: "Invalid Token" }
            }
            const user = await this.userRepository.getById(response.id)
            if (!user) {
                throw { error: "No user with token exists" }

            }

            return user.id
        } catch (error) {
            console.log("Something went wrong in Authentication.")
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

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword)
        } catch (error) {
            console.log("Something went wrong in Password comparison.")
            throw (error)
        }
    }
}

module.exports = UserService