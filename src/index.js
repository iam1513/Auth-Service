const express = require("express")
const { ServerConfig } = require("./config")
const app = express()
const bodyParser = require("body-parser")
const apiRoutes = require("./routes")

// const UserService = require("./services/user-service")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', apiRoutes)


function startServer() {
    app.listen(ServerConfig.PORT, async () => {
        console.log(`Server started on ${ServerConfig.PORT}`)

        // const userService = new UserService()
        // const token = await userService.createToken({ email: "om3@gmail.com", id: 6 })

        // console.log("new token : ", token)
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9tM0BnbWFpbC5jb20iLCJpZCI6NiwiaWF0IjoxNzMyMjE2OTA5LCJleHAiOjE3MzIyMjA1MDl9.GOVLJ9HLwtXpr77Mla1O3Yd-wug_H99PUYIOBP0PzcA"
        // const res = await userService.verifyToken(token, ServerConfig.JWT_KEY)
        // console.log(res)
    })
}

startServer()