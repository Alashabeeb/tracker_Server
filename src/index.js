require("./models/User")
require("./models/Track")
const express = require("express")
const mongoose =  require("mongoose")
const authRoutes = require("./routes/authRoutes")
const trackRoutes = require("./routes/trackRoutes")
const bodyParser = require("body-parser")
const requireAuth = require("./middlewares/requireAuth")


const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoURI = `mongodb+srv://alas:mp5glj9hvuEu6IdU@alas.1hbfi.mongodb.net/?retryWrites=true&w=majority&appName=Alas`
mongoose.connect(mongoURI, {})
mongoose.connection.on("connected", () => {
    console.log("Connected to mongo instance")
})
mongoose.connection.on("error", (error) => {
    console.log("Error connecting to mongo", error)
})

app.get("/", requireAuth, (request, response, next) => {
    response.send(`Your email: ${request.user.email}`)
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})