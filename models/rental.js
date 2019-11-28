const mongoose = require('mongoose')
const Joi = require('joi')

const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                min: 1,
                max: 80,
                required: true,
                uppercase: true
            },
            phone: {
                type: String,
                minlength: 9,
                maxlength: 13,
                required: true
            },
            isGold: Boolean
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                minlength: 2,
                maxlength: 50,
                required: true
            },
            dailyRentalRate: {
                type: Number,
                required: true
            },
            
        }),
        required: true
    },
    dateOfPurchase: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: Date,
    rentalFee: {
        type: Number,
        min: 0
    }
}))

validateRental = (rental) => {
    const schema = {
        movieId: Joi.objectId().required(),
        customerId: Joi.objectId().required()
    }
    return Joi.validate(rental, schema)
}

exports.validate = validateRental
exports.Rental = Rental