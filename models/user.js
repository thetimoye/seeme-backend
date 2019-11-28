const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')

const User = mongoose.model('User', new mongoose.Schema({
    name:{
        type: String,
        min: 5,
        max: 50,
        trim: true,
        required: true,
        uppercase: true
    },
    email: {
        type: String,
        unique: true,
        min: 5,
        max: 100,
        required: true,
        uppercase: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    }
}))

validateUser = (user) => {
    const schema = {
        name: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(user,schema)
}

exports.User = User
exports.validate = validateUser