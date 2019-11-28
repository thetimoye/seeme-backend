const mongoose = require('mongoose')
const Joi = require('joi')
const {genreSchema} = require('./genre')

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    genre: [{
        type: genreSchema,
        required: true
    }],
    numberInStock: {
        type: Number,
        required: true
    },
    dailyRentalRate: {
        type: Number,
        required: true
    }
})

const Movie = mongoose.model('Movie',moviesSchema)

validateMovies = (movie) => {
    const schema = {
        title: Joi.string().min(2).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    }
    return Joi.validate(movie,schema)
}

exports.Movie = Movie
exports.moviesSchema = moviesSchema
exports.validate = validateMovies