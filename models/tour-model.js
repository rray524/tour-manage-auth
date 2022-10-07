const { mongoose } = require("mongoose");

const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please name the tour'],
        unique: [true, "This tour name is already in use"],
        trim: true,
        minLength: [4, "Minimum length is 4 characters"]
    },
    description: {
        type: String,
        required: [true, 'Please description the tour'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Please price the tour'],
        min: [0, "price can not be negative"]
    },
    schedule: {
        type: Date,
        default: Date.now(),
    },
    counter: {
        type: Number,
        required: [true, 'Please insert pageview number as "counter":1'],
        default: 1
    }
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]
}, {
    timestamps: true
})

// SCHEMA --> MODEL -->

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour;