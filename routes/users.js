const express = require('express')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
const {User, validate} = require('../models/user')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

const route = express.Router()

// === GET CURRENT USER ===
getMe = () => {
    route.get('/me', auth, async(req,res) => {
        const me = await User.findById(req.user._id).select('-password')
        return res.status(200).send(me)
    })
}

// === GET USERS
getUsers = () => {
    route.get('/', auth, async(req,res) => {
        const users = await User.find()        
        return res.status(200).send(users)
    })
}

// === REGISTER USER ===
registerUser = () => {
    route.post('/', [auth, admin],async(req,res) => {
        const {error} = validate(req.body)
        if (error) { return res.status(400).send(error.details[0].message) }

        // === CHECK IF EMAIL ALREADY EXISTS ===
        const email_exists = await User.findOne({email: req.body.email})
        if (email_exists) {return res.status(400).end(`User already registered`)}

        const user = new User(_.pick(req.body, ['name','email','password', 'isAdmin']))
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()

        const token = jwt.sign({_id: user._id, isAdmin: user.isAdmin }, config.get('jwtPrivateKey'))
        res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']))
    })
}

deleteUser = () => {
    route.delete('/:id', [auth, admin], async(req,res) => {
        const result = await User.findByIdAndRemove(req.params.id)
        res.status(200).send(result)
    })
}

getMe()
getUsers()
registerUser()
deleteUser()

module.exports = route