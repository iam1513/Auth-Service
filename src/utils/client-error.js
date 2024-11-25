const AppError = require("./error-handler")
const StatusCodes = require("http-status-codes")


class ClientError extends AppError {


    constructor(name, message, explanation, statuCode) {

        super(
            name, message, explanation, statuCode
        )
    }
}

module.exports = ClientError