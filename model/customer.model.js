const mongoose = require('mongoose');

// Define the book schema
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    // contact: {
    //     type: Number,
    //     required: true,
    // },
    // email: {
    //     type: String,
    //     required: true,
    // },
    // address: {
    //     type: String,
    //     required: true,
    // },
});

// Create the Book model
const Customer = mongoose.model('Customer', customerSchema);

// Export the Book model
module.exports = Customer;
