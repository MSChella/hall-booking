require('dotenv').config();

const Booking = require('../model/booking.model');
const Customer = require('../model/customer.model');

// Controller methods
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createCustomer = async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ message: 'Customer deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
const listCustomersWithBookedData = async (req, res) => {
    try {
        // Find all bookings with customer names and room details
        const customersWithBookedData = await Booking.aggregate([
            {
                $lookup: {
                    from: 'halls', // Name of the rooms collection
                    localField: 'hallId',
                    foreignField: '_id',
                    as: 'room'
                }
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    roomName: '$room.hallName',
                    date: 1,
                    startTime: 1,
                    endTime: 1
                }
            }
        ]);

        res.json(customersWithBookedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const listCustomerBookingCounts = async (req, res) => {
    try {
        // Group bookings by customer name and count the occurrences
        const customerBookingCounts = await Booking.aggregate([
            {
                $group: {
                    _id: '$name',
                    roomName: { $addToSet: '$hallId' },
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(customerBookingCounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


// Export controller methods
module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    listCustomersWithBookedData,
    listCustomerBookingCounts
};
