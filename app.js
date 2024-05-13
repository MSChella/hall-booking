const express = require("express");
const APP_SERVER = express();





const hallRouter = require('./routes/hall.routes');
const customerRouter = require('./routes/customer.routes');
const bookingRouter = require('./routes/booking.routes');

APP_SERVER.use('/api/hall', hallRouter);
APP_SERVER.use('/api/customer', customerRouter);
APP_SERVER.use('/api/booking', bookingRouter);




module.exports = APP_SERVER;