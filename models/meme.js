const mongoose = require('mongoose')

const memeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    publicationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Meme', memeSchema)