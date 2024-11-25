const express = require("express")
const { ServerConfig } = require("./config")
const app = express()
const bodyParser = require("body-parser")
const apiRoutes = require("./routes")

// const UserService = require("./services/user-service")
const db = require("./models")
const { User, Role } = require("./models")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', apiRoutes)


function startServer() {
    app.listen(ServerConfig.PORT, async () => {
        console.log(`Server started on ${ServerConfig.PORT}`)

        if (process.env.DB_SYNC) {
            db.sequelize.sync({ alter: true })
        }

    })
}

startServer()