const mongoose = require('mongoose')
const Joi = require('joi')


// === CREATE NEW MODEL & SCHEMA ===
const Customer = mongoose.model('Customer', new mongoose.Schema({
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
}))

validateCustomer = (customer) => {
    const schema = {
        name: Joi.string().min(2).max(50).required(),
        phone: Joi.string().min(9).max(13).required(),
        isGold: Joi.boolean().required()
    }
    return Joi.validate(customer,schema)
}

exports.validate = validateCustomer
exports.Customer = Customer