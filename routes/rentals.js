const express = require('express')
const Fawn = require('fawn')
const mongoose = require('mongoose')
const {Movie} = require('../models/movie')
const {Customer} = require('../models/customer')
const {Rental, validate} = require('../models/rental')
const auth = require('../middleware/auth')


const route = express.Router()
Fawn.init(mongoose)

getRentals = () => {
    route.get('/', auth, async(req,res) => {
        const result = await Rental.find()
        res.status(200).send(result)
    })
}

createRental = () => {
    route.post('/', auth, async(req,res) => {
        const {error} = validate(req.body)
        if (error) { res.status(400).send(error.details[0].message) }
        else {
            const movie = await Movie.findById(req.body.movieId)
            if (!movie) { req.status(404).send('Movie not found') }

            const customer = await Customer.findById(req.body.customerId)
            if (!customer) { req.status(404).send('Invalid customer ID') }

            const rental = new Rental({
                customer: customer,
                movie: movie
            })
            // const result = await rental.save()
            // movie.numberInStock--
            // movie.save()
            try {
                new Fawn.Task()
                    .save('rentals', rental)
                    .update('movies', {_id: movie._id}, {
                        $inc: {numberInStock: -1}
                    })
                    .run();
                    res.status(200).send(rental)
            }
            catch(ex){
                res.status(500).send(ex)
            }
            
        }
    })
}
createRental()
getRentals()

module.exports = route