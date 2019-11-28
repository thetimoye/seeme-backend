const express = require('express')

// const router = express.router()

const logger = (req,res,next) => {
    console.log('Loading...')
    next()
}

module.exports = logger