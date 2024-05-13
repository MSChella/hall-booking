require('dotenv').config();


const Hall = require('../model/hall.model');

// Controller methods
const getAllHalls = async (req, res) => {
    try {
        const halls = await Hall.find();
        res.json(halls);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const getHallById = async (req, res) => {
    try {
        const hall = await Hall.findById(req.params.id);
        if (!hall) {
            return res.status(404).json({ message: 'Hall not found' });
        }
        res.json(hall);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const createHall = async (req, res) => {
    try {
        const newHall = new Hall(req.body);
        await newHall.save();
        res.status(201).json(newHall);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
const listRoomsWithBookedData = async (req, res) => {
    try {
        // Find all rooms with their bookings
        const roomsWithBookedData = await Hall.aggregate([
            {
                $lookup: {
                    from: 'bookings', // Name of the bookings collection
                    localField: '_id',
                    foreignField: 'hallId',
                    as: 'bookings'
                }
            },
            {
                $project: {
                    roomName: 1,
                    bookedStatus: { $cond: [{ $gt: [{ $size: '$bookings' }, 0] }, true, false] },
                    bookings: {
                        $map: {
                            input: '$bookings',
                            as: 'booking',
                            in: {
                                name: '$$booking.name',
                                date: '$$booking.date',
                                startTime: '$$booking.startTime',
                                endTime: '$$booking.endTime'
                            }
                        }
                    }
                }
            }
        ]);

        res.json(roomsWithBookedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
const listBookedRooms = async (req, res) => {
    try {
        const bookedRooms = await Hall.find({ bookedStatus: true }).populate('bookings');
        res.json(bookedRooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


const updateHall = async (req, res) => {
    try {
        const hall = await Hall.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!hall) {
            return res.status(404).json({ message: 'Hall not found' });
        }
        res.json(hall);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteHall = async (req, res) => {
    try {
        const hall = await Hall.findByIdAndDelete(req.params.id);
        if (!hall) {
            return res.status(404).json({ message: 'Hall not found' });
        }
        res.json({ message: 'Hall deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Export controller methods
module.exports = {
    getAllHalls,
    getHallById,
    createHall,
    updateHall,
    deleteHall,
    listRoomsWithBookedData,
    listBookedRooms,
};
