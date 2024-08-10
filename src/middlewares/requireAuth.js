const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const User = mongoose.model("User")

module.exports = (request, response, next) => {
    const { authorization } = request.headers

    if(!authorization){
        return response
            .status(401)
            .send({error: "You must be logged in."})
    }

    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, "MY_SECRET_KEY", async (error, payload) => {
        if(error){
            return response
                .status(401)
                .send({error: "You must be logged in."})
        }

        const { userID } = payload

        const user = await User.findById(userID)

        request.user = user
        next()
    })
}