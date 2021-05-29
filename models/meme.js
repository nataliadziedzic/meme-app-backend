const mongoose = require('mongoose')

const memeSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        required: true,
        default: 0
    },
    downvotes: {
        type: Number,
        required: true,
        default: 0
    },
    publicationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Meme', memeSchema)