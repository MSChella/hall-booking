const express = require('express');
const router = express.Router();
const hallController = require('../controller/hall.controller');

// Routes for Halls
router.get('/allroomstatus', hallController.listRoomsWithBookedData);
router.get('/bookedrooms', hallController.listBookedRooms);
router.get('/', hallController.getAllHalls);
router.get('/:id', hallController.getHallById);
router.post('/', hallController.createHall);
router.put('/:id', hallController.updateHall);
router.delete('/:id', hallController.deleteHall);


module.exports = router;
