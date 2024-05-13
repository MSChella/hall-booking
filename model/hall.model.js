const mongoose = require('mongoose');

// Define the hall schema
const hallSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
    },
    seatcapacity: {
        type: Number,
        required: true,
    },
    amenities: {
        type: String,
        required: true,
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
    bookedStatus: {
        type: Boolean,
        required: true,
    },

});

// Create the Hall model
const Hall = mongoose.model('Hall', hallSchema, 'halls');

// Export the Hall model
module.exports = Hall;
