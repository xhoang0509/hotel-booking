const writeLog = require('../logger');
const users = require('../models').users;
const bookings = require('../models').bookings;
const locations = require('../models').locations;
const rooms = require('../models').rooms;

async function getAnalytic(req, res) {
    let code = 200;
    const result = {
        status: false,
        message: '',
    };
    try {
        const data = {};
        const countUser = await users.count();
        const countBooking = await bookings.count();
        const countLocation = await locations.count();
        const countRoom = await rooms.count();
        const revenue = await bookings.sum('price');
        data.user = countUser;
        data.booking = countBooking;
        data.location = countLocation;
        data.room = countRoom;
        data.revenue = revenue;
        result.status = true;
        result.message = 'OK';
        result.payload = data;
    } catch (e) {
        writeLog(__filename, 'getAnalytic', e.message, 'FAILED');
        code = 500;
        result.status = true;
        result.message = e.message;
    } finally {
        res.status(code).json(result);
    }
}

module.exports = {
    getAnalytic,
};
