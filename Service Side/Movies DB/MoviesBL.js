const Movie = require("./MoviesModel")

const axios = require("axios")

let counter = 0

const SetMovies = () => {
    return new Promise(async(resolve,reject) => {
        const {data} = await axios.get("https://api.tvmaze.com/shows")
        if((await Movie.find()).length === 0 ){
            data.map((movie) => {
                let newMovie = new Movie(movie)
                newMovie.save((err) => {
                    counter++
                    if(err) {
                        reject(err)
                    }else{
                        resolve("Added Movies")
                        
                    }
                })
            })
        }
        
        
    })
} 
SetMovies()

//Get all
const getAllMovies = () => {
    return new Promise((resolve,reject) => {
        Movie.find({},(err,movies) => {
            if(err) {
                reject(err)
            }else {
                resolve(movies)
            }
        })
    })
}
//Get BY ID
const getMovieById = (id) => {
    return new Promise((resolve,reject) => {
        Movie.findById(id,(err,movie) => {
            if(err){
                reject(err)
            }else{
                resolve(movie)
            }
        })
    })
}
// Add Movie = Post
const AddMovie = (newMovie) => {
    return new Promise((resolve,reject) => {
        const newMov = new Movie(newMovie)
        newMov.save((err) => {
            if(err) {
                reject(err)
            }else{
                resolve("Added Movie Successfully!")
            }
        })
    })
}
//Update Movie = Put
const UpdateMovie= (id,UpdatedMovie) => {
    return new Promise((resolve,reject) => {
    Movie.findByIdAndUpdate(id,UpdatedMovie,(err) => {
        if(err){
            reject(err)
        }else{
            resolve("Updated Movie Successfully!")
        }
    })    
    })
}
const DeleteMovie = (id,name) => {
return new Promise((resolve,reject) => {
    Movie.findByIdAndRemove(id,(err) => {
        if(err){
            reject(err)
        }else{
            resolve("Delete Movie Succesfully!")
        }
    })
})
}
module.exports= {getAllMovies,getMovieById,AddMovie,UpdateMovie,DeleteMovie}