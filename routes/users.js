const express = require('express')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
const {User, validate} = require('../models/user')

const route = express.Router()

// === REGISTER USER ===
registerUser = () => {
    route.post('/', async(req,res) => {
        const {error} = validate(req.body)
        if (error) { return res.status(400).send(error.details[0].message) }

        const user_error = await User.findOne({email: req.body.email})
        if (user_error) {return res.status(400).end(`User already registered`)}

        const user = new User(_.pick(req.body, ['name','email','password']))
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()

        const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'))
        res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']))
    })
}

registerUser()

module.exports = route