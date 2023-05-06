const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: Array,
        required: true,
    }
})

const Books = mongoose.model('Books', bookSchema)

module.exports = Books