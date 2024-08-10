const express = require("express")
const mongoose = require("mongoose")
const requireAuth = require("../middlewares/requireAuth")

const Track = mongoose.model("Track")

const router = express.Router()

router.use(requireAuth)

router.get("/tracks", async (request, response, next) => {
    const tracks = await Track.find({userID: request.user._id})

    response.send(tracks)
})

router.post("/tracks", async (request, response, next) => {
    const { name, locations } = request.body

    if(!name || !locations){
        return response
            .status(422)
            .send({error: "You must provide a name and locations"})
    }

    try{
        const track = new Track({name: name, locations: locations, userID: request.user._id})
        await track.save()
        response.send(track)
    }catch(error){
        response
            .status(422)
            .send({error: error.message})
    }
})

module.exports = router