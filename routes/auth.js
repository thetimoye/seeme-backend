const express = require('express')
const config = require('config')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/user')

const route = express.Router()

validateUser = (user) => {
    const schema = {
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(user,schema)
}

authUser = () => {
    route.post('/', async(req,res) => {
        const { error } = validateUser(req.body)
        if (error) {return (res.status(400).send(error.details[0].message))}

        let user = await User.findOne({email: req.body.email})
        if(!user) {return res.status(400).send('User does not exist')}

        let validatePwd = await bcrypt.compare(req.body.password, user.password)
        if (!validatePwd) {return res.status(400).send('Invalid username or password')}

        const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'))

        res.send(token)
    })
}

authUser()

module.exports = route