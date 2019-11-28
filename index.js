const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')
const logger = require('./middleware/logger')


if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: JWT KEY NOT DEFINED')
    process.exit(1)
}

// === CONNECT DATABASE ===
mongoose.connect('mongodb://localhost/movies')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to db'))

const app = express()
app.use(express.json()) // Accept json texts in request bodies
app.use(express.urlencoded()) 
app.use(express.static('public')) // Declears the public page of the app
app.use('/genres', genres)
app.use('/customers', customers)
app.use('/movies', movies)
app.use('/rentals', rentals)
app.use('/users', users)
app.use('/auth', auth)
app.use('/logger',logger)


// CONFIGURATION DETAILS
console.log('=================================================')
console.log(`Env. Config details: ${config.get('name')}`)
console.log(`                   : ${config.get('mail.server')}`)
console.log('=================================================')

// GET THE ENVIRONMENT VARIABLE
const env = app.get('env')
console.log(`Your environment: ${env}`)
console.log('=================================================')

// === PORT TO LISTEN ON ===
port = process.env.PORT || 3000
app.listen(port, () => {console.log(`You are using port ${port}`)})