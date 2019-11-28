const express = require('express')
const {validate, Customer} = require('../models/customer')

const router = express.Router()


// === FIND MANY ===
findCustomers = () => {
    router.get('/', async (req,res) => {
        const result = await Customer
         .find()
         .sort({name: 1})
     
         !result 
             ? res.status(404).send('No results found') 
             : res.status(200).send(result)
     })
}

// === FIND ONE ===
findCustomer = () => {
    router.get('/:id', async (req,res) => {
        const one_customer = await Customer.findById(req.params.id)
    
        !one_customer 
            ? res.status(404).send('No customer with ID found') 
            : res.status(200).send(one_customer)
    })
}

// === CREATE CUSTOMER ===
createCustomer = () => {
    router.post('/', async (req,res) => {
        const {error} = validate(req.body)
        error ? res.status(404).send(error.details[0].message) : 'Validated'
        const add_customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        })
    
        !add_customer 
            ? res.status(404).send('Unable to add')
            : await add_customer.save()
                res.status(200).send(add_customer)
        
    })
}

// === UPDATE CUSTOMER ===

updateCustomer = () => {
    router.put('/:id', async (req,res) => {
        const {error} = validate(req.body)
        error ? res.status(404).send(error.details[0].message) : 'Validated'
        const update_customer = await Customer.findByIdAndUpdate(req.params.id, {$set: {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }}, {next: true})
    
        !update_customer
            ? res.status(404).send('Unable to update')
            : res.status(200).send(update_customer)
    })
    
}

// === DELETE CUSTOMER ===

deleteCustomer = () => {
    router.delete('/:id', async (req,res) => {
        const delete_customer = await Customer.findByIdAndRemove(req.params.id)
        !delete_customer
            ? res.status(404).send('No record')
            : res.status(200).send(delete_customer)
    })
    
}

findCustomers()
findCustomer()
createCustomer()
updateCustomer()
deleteCustomer()


module.exports = router