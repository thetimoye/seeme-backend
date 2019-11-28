const mongoose = require('mongoose')
const Joi = require('joi')


// === CREATE A SCHEMA FOR YOUR DOCUMENT ===
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        uppercase: true,
        trim: true,
        required: true
    },
})
// === CREATE A GENRE MODEL AND ATTACH THE SCHEMA ===
const Genre = mongoose.model('Genre', genreSchema);


// === JOI VALIDATION ===

validateGenres = (genre) => {
    const schema = {
        name: Joi.string().min(1).max(50).required(),
    }
    return Joi.validate(genre,schema)
}

exports.genreSchema = genreSchema
exports.Genre = Genre
exports.validate = validateGenres