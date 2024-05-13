const mongoose = require('mongoose');

// Define the booking schema
const bookingSchema = new mongoose.Schema({

    name: { type: String, required: true },
    // customerId: {
    //     type: mongoose.Types.ObjectId,
    //     required: true,
    //     ref: "customer",
    // },
    date: { type: Date, },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    hallId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "hall",
    },
    // status: {
    //     type: String,
    //     required: true,
    // },
});

// Create the Booking model
const Booking = mongoose.model('Booking', bookingSchema, 'bookings');

// Export the Booking model
module.exports = Booking;
