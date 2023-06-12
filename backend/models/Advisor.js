const mongoose = require('mongoose')

const advisorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name to the advisor'],
        unique: true
    },
    reviews: {
        type: Number,
        required: [true, 'Please provide reviews number of the advisor'],
    },
    status: {
        type: Boolean,
        required: [true, 'Please provide online status of the advisor'],
    },
    language: {
        type: String,
        required: [true, 'Please provide language of the advisor'],
    }
})

const Advisor = mongoose.model('Advisor', advisorSchema)

module.exports = Advisor