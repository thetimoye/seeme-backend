const express = require('express')
const {validate, Genre} = require('../models/genre')

const route = express.Router()

// === GET ALL Genres ===
getAllGenres = () => {
    route.get('/', async (req,res) => { 
        const result = await Genre.find().sort({title: 1})
        res.send(result)
    })
}

getGenresById = () => {
    route.get('/:id', async (req,res) => {
        const result = await Genre.findById(req.params.id)

        !result
            ? res.status(404).send('No result Found')
            : res.status(200).send(result)
    })
}

// === CREATE A Genre ===
createGenre = () => {
    route.post('/', async (req,res) => {
        const {error} = validate(req.body)
        const { body } = req

        // error ? res.status(404).send(error.details[0].message) : console.log('Validated')       

        if (error) {
            res.status(404).send(error.details[0].message)
        }
        else {
                    // --- DEFINE PARAMETERS NEEDED FROM CLIENT ===
        const new_genre = new Genre({
            name: body.name
        })
        // === VALIDATION ===
        try {
            await new_genre.save()
            return res.status(200).send(new_genre)
        }
        catch (ex){
            for (fields in ex.errors){ ex.errors[fields].message }
        }
        }

    })
}


// === UPDATE A Genre ===
updateGenre = () => {
    route.put('/:id', async (req,res) => {
        const {error} = validate(req.body)

        // error ? res.status(404).send(error.details[0].message) : console.log('Validated')
        if (error) {
            res.status(404).send(error.details[0].message)
        }
        else {
            const new_update = await Genre.findByIdAndUpdate(req.params.id, {$set: {
                name: req.body.name
            }}, {new: true})
            
            !new_update 
                ? res.status(404).send('Error updating Genre')
                : res.status(200).send(new_update)
        }

        }
    )
        
}


// === DELETE A Genre ===
deleteGenre = () => {
    route.delete('/:id', async (req,res) => {

        const result = await Genre.findByIdAndDelete(req.params.id)
        !result
            ? res.status(404).send('Error deleting Genre')
            : res.status(200).send(result)
    })
}

getAllGenres()
getGenresById()
createGenre()
updateGenre()
deleteGenre()



module.exports = route