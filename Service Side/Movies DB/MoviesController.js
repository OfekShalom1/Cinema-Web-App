const express = require("express")
const { json } = require("express/lib/response")
const MoviesBL = require("./MoviesBL")

const router = express.Router()

router.route("/").get(async(req,res) => {
    try {
        const movies = await MoviesBL.getAllMovies()
        return res.json(movies)
    } catch (error) {
        return res.json(error)
    }
})

router.route("/:_id").get(async(req,res) => {
    try {
        const id = req.params._id
        const movie = await MoviesBL.getMovieById(id)
        return res.json(movie)
    } catch (error) {
        return res.json(error)
    }
});
//Post
router.route("/").post(async(req,res) => {
    try {
        const movie = req.body
        const result = await MoviesBL.AddMovie(movie)
        return res.json(result)

    } catch (error) {
        return res.json(error)
    }
})
//PUT
router.route("/:_id").put(async(req,res) => {
    try {
        const id = req.params._id
        const movie = req.body
        const result = await MoviesBL.UpdateMovie(id,movie)
        return res.json(result)
    } catch (error) {
        return res.json(error)
    }
})
// Delete 
router.route("/:_id").delete(async(req,res) => {
    try {
        const id = req.params._id
        const name = req.params.name
        const result = await MoviesBL.DeleteMovie(id,name)
        return res.json(result)

    } catch (error) {
        return res.json(error)
    }
})
module.exports = router