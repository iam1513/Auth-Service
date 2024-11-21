const UserRepository = require("../repository/user-repository")

class UserService {
    constructor() {
        this.userRepository = new UserRepository()
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data)
            return user
        } catch (error) {
            console.log("Something went wrong in Repository.")
            throw (error)
        }
    }

    async destroy(userId) {
        try {
            const res = await this.userRepository.destroy(userId)
            return res
        } catch (error) {
            console.log("Something went wrong in Repository.")
            throw (error)
        }
    }
}

module.exports = UserService