const express = require('express');
const router = express.Router();
const customerController = require('../controller/customer.controller');

// Routes for Customers
router.get('/customerbookingcounts', customerController.listCustomerBookingCounts);
router.get('/customerbookedstatus', customerController.listCustomersWithBookedData);

router.get('/', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.post('/', customerController.createCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);


module.exports = router;
