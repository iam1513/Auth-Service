const { where } = require("sequelize")
const { User } = require("../models")

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data)
            return user
        } catch (error) {
            console.log("Something went wrong in Repository.")
            throw (error)
        }
    }

    async destroy(userId) {
        try {
            const res = await User.destroy({
                where: {
                    id: userId
                }
            })
            return res
        } catch (error) {
            console.log("Something went wrong in Repository.")
            throw (error)
        }
    }
}

module.exports = UserRepository