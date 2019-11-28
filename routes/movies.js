const express = require('express')
const {validate, Movie} = require('../models/movie')
const {Genre} = require('../models/genre')

const route = express.Router()


getMovies = () => {
    route.get('/',async (req,res) => {
        const result = await Movie.find()
        res.status(200).send(result)
    })
}

getMovie = () => {
    route.get('/:id',async (req,res) => {
        const result = await Movie.findById(req.params.id)
        res.status(202).send(result)
    })
}

createMovie = () => {
    route.post('/',async (req,res) => {
        const {error} = validate(req.body)
        if (error) {
            res.status(404).send(error.details[0].message)
        }
        else {
            const genre = await Genre.findById(req.body.genreId)
            if (!genre) { res.status(404).send('Genre not found')}
            const movie = new Movie({
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    name: genre.name
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate
            })
            await movie.save()
            
            res.status(200).send(movie)
        }
    })
}

updateMovie = () => {
    route.put('/:id', async (req,res) => {
        const {error} = validate(req.body)
        if(error) {
            res.status(404).send(error.details[0].message)
        }
        else {
            // === SEE SPECIFIED GENRE EXISTS
            const genre = await Genre.findById(req.body.genreId)
            if (!genre) { res.status(404).send('Genre not found') }


            const movie = await Movie.findByIdAndUpdate(req.params.id, {$set:{
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    name: genre.name
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate
            }}, {new: true})
            res.status(200).send(movie)
        }
    })
}
deleteMovie = () => {
    route.delete('/:id', async (req,res) => {
        const result = await Movie.findByIdAndRemove(req.params.id)
        res.status(200).send(result)
    })
}


getMovies()
getMovie()
createMovie()
updateMovie()
deleteMovie()

module.exports = route