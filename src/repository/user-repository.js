const { where } = require("sequelize")
const { User, Role } = require("../models")
const ValidationError = require("../utils/validation-error")
const ClientError = require("../utils/client-error")
const { StatusCodes } = require("http-status-codes")

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data)
            return user
        } catch (error) {

            if (error.name == "SequelizeValidationError") {
                throw new ValidationError(error)
            }

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

    async getById(userId) {
        try {
            // Don't want to use password
            const user = await User.findByPk(userId, {
                attributes: ["email", "id"]
            })
            return user
        } catch (error) {
            console.log("Something went wrong in Repository while getting user.")
            throw (error)
        }
    }

    async getByEmail(email) {
        try {
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                throw new ClientError(
                    "AttributeNotFound",
                    "Invalid email sent in the request",
                    "Please check the email as no record found in database",
                    StatusCodes.NOT_FOUND
                )
            }
            return user
        } catch (error) {
            console.log("Something went wrong in Repository.")
            throw (error)
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId)
            const AdminRole = await Role.findOne({
                where: {
                    name: "ADMIN"
                }
            })
            return user.hasRole(AdminRole)
        } catch (error) {
            console.log("Something went wrong in Repository.")
            throw (error)
        }
    }
}

module.exports = UserRepository