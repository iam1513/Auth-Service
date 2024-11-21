const express = require("express")
const { ServerConfig } = require("./config")
const app = express()
const bodyParser = require("body-parser")
const apiRoutes = require("./routes")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', apiRoutes)

app.listen(ServerConfig.PORT, () => {
    console.log(`Server started on ${ServerConfig.PORT}`)
})