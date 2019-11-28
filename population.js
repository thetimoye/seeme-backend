const mongoose = require('mongoose')
const Joi = require('joi')

mongoose.connect('mongodb://localhost/movies')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to db'))

const Author = mongoose.model('Author', new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        uppercase: true,
        required: true
    },
    bio: {
        type: String,
        minlength: 2,
        maxlength: 100,
        // uppercase: true,
        required: true
    },
    website: {
        type: String,
        maxlength: 100
    }    
}))

const Course = mongoose.model('Course', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        uppercase: true
    },
    author: new mongoose.Schema({
        name: {
            type: String,
            minlength: 2,
            maxlength: 50,
            uppercase: true,
            required: true
        },
        bio: {
            type: String,
            minlength: 2,
            maxlength: 100,
            // uppercase: true,
            required: true
        },
        website: {
            type: String,
            maxlength: 100
        }    
    })
}))

// validateAuthor = (author) => {
//     const schema = {
//         name: Joi.string().min(2).max(50).required(),
//         bio: Joi.string().min(2).max(50).required(),
//         website: Joi.string().min(2).max(50).required()
//     }
//     return Joi.validate(author, schema)
// }

// === CONTROLLERS ===
createAuthor = async (name, bio, website) => {
    const author = new Author({
        name,
        bio,
        website
    })
    const result = await author.save()
    console.log(result)
}

createCourse = async (title, author) => {
    const course = new Course({
        title,
        author
    })
    const result = await course.save()
    console.log(result)
}

listCourses = async () => {
    const result = await Course.find()
    console.log(result)
}

// createAuthor('Timi', 'Nature Lover', 'thetimoye@gmail.com')
// createCourse('Mathematics', new Author({name: 'Bella', bio: 'Shoe maker'}))
// listCourses()